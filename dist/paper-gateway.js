(() => {
  const originalTrigger = document.querySelector('.sculpture-paper.paper-trigger');
  const dialog = document.querySelector('#paper-dialog');
  if (!originalTrigger || !dialog) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const sheet = dialog.querySelector('.paper-sheet');
  const copy = dialog.querySelector('.paper-document-copy');
  const frameStops = [0, .25, .58, 1];
  let active = null, flight = null, closing = false, suppressFocus = false;

  const triggers = [...document.querySelectorAll('.paper-trigger')];

  function context(visual, button = null) {
    return { visual, button, frames: [...visual.querySelectorAll('.paper-frame')], progress: 0, raf: null, settle: null, returning: false };
  }
  const contexts = triggers.map(button => context(button.querySelector('.paper-preview'), button));
  const modal = context(dialog.querySelector('.paper-dialog-art'));

  function render(ctx, progress) {
    ctx.progress = Math.max(0, Math.min(1, progress));
    ctx.visual.dataset.paperProgress = ctx.progress.toFixed(4);
    let lower = frameStops.findIndex((stop, index) => index < frameStops.length - 1 && ctx.progress <= frameStops[index + 1]);
    if (lower < 0) lower = frameStops.length - 2;
    let mix = (ctx.progress - frameStops[lower]) / (frameStops[lower + 1] - frameStops[lower]);
    mix = mix * mix * (3 - 2 * mix);
    ctx.frames.forEach((frame, index) => {
      frame.style.opacity = index === lower ? 1 - mix : index === lower + 1 ? mix : 0;
    });
    if (ctx.button) {
      ctx.visual.style.transform = `rotate(${-ctx.progress * 3}deg) scale(${1 + ctx.progress * .28})`;
    }
  }

  function stop(ctx) {
    if (ctx.raf !== null) cancelAnimationFrame(ctx.raf);
    ctx.raf = null;
    ctx.settle?.(false);
    ctx.settle = null;
  }

  function tween(ctx, target, duration) {
    stop(ctx);
    ctx.visual.dataset.paperTarget = String(target);
    if (reducedMotion.matches || duration === 0) {
      render(ctx, target);
      return Promise.resolve(true);
    }
    const start = ctx.progress;
    const started = performance.now();
    return new Promise(resolve => {
      ctx.settle = resolve;
      function step(now) {
        const elapsed = reducedMotion.matches ? 1 : Math.min(1, (now - started) / duration);
        const eased = elapsed * elapsed * (3 - 2 * elapsed);
        render(ctx, start + (target - start) * eased);
        if (elapsed < 1) ctx.raf = requestAnimationFrame(step);
        else { ctx.raf = null; ctx.settle = null; resolve(true); }
      }
      ctx.raf = requestAnimationFrame(step);
    });
  }

  function preview(ctx, loosen) {
    if (active) return;
    ctx.button.classList.toggle('is-previewing', loosen);
    tween(ctx, loosen ? .58 : 0, loosen ? 1450 : 1050);
  }

  function transformTo(rect, base) {
    return `translate(${rect.left - base.left}px, ${rect.top - base.top}px) scale(${rect.width / base.width}, ${rect.height / base.height})`;
  }

  async function open(ctx) {
    if (dialog.open || active) return;
    stop(ctx);
    active = ctx;
    closing = false;
    const source = ctx.button.getBoundingClientRect();
    render(modal, ctx.progress);
    dialog.classList.remove('is-ready', 'is-closing');
    copy.inert = true;
    ctx.button.classList.add('is-expanded');
    ctx.button.classList.remove('is-previewing');
    ctx.button.setAttribute('aria-expanded', 'true');
    document.body.classList.add('paper-dialog-open');
    dialog.showModal();
    const destination = sheet.getBoundingClientRect();
    const duration = reducedMotion.matches ? 0 : 1050;
    flight = sheet.animate([{ transform: transformTo(source, destination) }, { transform: 'none' }], {
      duration, easing: 'cubic-bezier(.22,.75,.2,1)', fill: 'both'
    });
    await Promise.all([tween(modal, 1, duration), flight.finished.catch(() => {})]);
    if (!dialog.open || closing) return;
    copy.inert = false;
    dialog.classList.add('is-ready');
  }

  async function close() {
    if (!dialog.open || closing || !active) return;
    closing = true;
    const ctx = active;
    const currentTransform = getComputedStyle(sheet).transform;
    flight?.cancel();
    dialog.classList.remove('is-ready');
    dialog.classList.add('is-closing');
    copy.inert = true;
    const base = sheet.getBoundingClientRect();
    const target = ctx.button.getBoundingClientRect();
    const duration = reducedMotion.matches || target.width === 0 ? 0 : 650;
    flight = sheet.animate([{ transform: currentTransform }, { transform: transformTo(target, base) }], {
      duration, easing: 'cubic-bezier(.4,0,.3,1)', fill: 'both'
    });
    await Promise.all([tween(modal, 0, duration), flight.finished.catch(() => {})]);
    ctx.returning = true;
    dialog.close();
    flight.cancel();
    flight = null;
    document.body.classList.remove('paper-dialog-open');
    for (const item of contexts) {
      stop(item);
      render(item, 0);
      item.button.classList.remove('is-expanded', 'is-previewing');
      item.button.setAttribute('aria-expanded', 'false');
    }
    active = null;
    closing = false;
    suppressFocus = true;
    ctx.button.focus({ preventScroll: true });
    queueMicrotask(() => { suppressFocus = false; });
  }

  for (const ctx of contexts) {
    render(ctx, 0);
    ctx.button.addEventListener('pointerenter', event => {
      if (!ctx.returning && finePointer.matches && event.pointerType !== 'touch') preview(ctx, true);
    });
    ctx.button.addEventListener('pointermove', event => {
      if (ctx.returning && finePointer.matches && event.pointerType !== 'touch') {
        ctx.returning = false;
        preview(ctx, true);
      }
    });
    ctx.button.addEventListener('pointerleave', () => { ctx.returning = false; preview(ctx, false); });
    ctx.button.addEventListener('pointercancel', () => preview(ctx, false));
    ctx.button.addEventListener('focus', () => {
      if (!suppressFocus && !ctx.returning && ctx.button.matches(':focus-visible')) preview(ctx, true);
    });
    ctx.button.addEventListener('blur', () => { ctx.returning = false; preview(ctx, false); });
    ctx.button.addEventListener('click', () => open(ctx));
  }
  render(modal, 0);
  dialog.querySelector('.paper-close').addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = sheet.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  });
  function resetPreviews() {
    if (active) return;
    contexts.forEach(ctx => { ctx.button.classList.remove('is-previewing'); tween(ctx, 0, 0); });
  }
  window.addEventListener('blur', resetPreviews);
  document.addEventListener('visibilitychange', () => { if (document.hidden) resetPreviews(); });
  document.addEventListener('hero-art-change', () => { if (active) close(); else resetPreviews(); });
  finePointer.addEventListener('change', resetPreviews);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) flight?.finish();
    resetPreviews();
  });
})();
