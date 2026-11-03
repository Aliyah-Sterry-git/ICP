(() => {
  const key='icp-hero-art-version';
  let selected='new';
  try { const saved=localStorage.getItem(key);if(['new','original'].includes(saved))selected=saved; } catch {}
  document.documentElement.dataset.heroArt=selected;
  function init(){
    const toggle=document.querySelector('#hero-dev-toggle');
    const panel=document.querySelector('#hero-dev-panel');
    if(!toggle||!panel)return;
    const radios=[...panel.querySelectorAll('input[name="hero-art"]')];
    function sync(){
      document.documentElement.dataset.heroArt=selected;
      radios.forEach(radio=>{radio.checked=radio.value===selected});
      document.querySelector('.hero-original').setAttribute('aria-hidden',String(selected!=='original'));
      document.querySelector('.hero-new').setAttribute('aria-hidden',String(selected!=='new'));
    }
    sync();
    function open(value,restoreFocus=false){panel.hidden=!value;toggle.setAttribute('aria-expanded',String(value));if(value)radios.find(r=>r.checked).focus();else if(restoreFocus)toggle.focus()}
    toggle.addEventListener('click',()=>open(panel.hidden));
    panel.querySelector('.hero-dev-close').addEventListener('click',()=>open(false,true));
    radios.forEach(radio=>radio.addEventListener('change',()=>{if(!radio.checked)return;selected=radio.value;sync();try{localStorage.setItem(key,selected)}catch{}}));
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden)open(false,true)});
    document.addEventListener('click',event=>{if(!panel.hidden&&!event.target.closest('.hero-design-lab'))open(false)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
