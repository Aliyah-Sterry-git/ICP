(() => {
  function init(){
    const button=document.querySelector('.profile-button');
    if(!button)return;
    let dialog;
    button.addEventListener('click',()=>{
      if(!dialog){
        dialog=document.createElement('dialog');
        dialog.className='account-modal';
        dialog.id='account-dialog';
        dialog.setAttribute('aria-labelledby','account-title');
        dialog.innerHTML='<button class="account-close" type="button" aria-label="Close account panel">×</button><img alt="" width="88" height="88"><h2 id="account-title">Your learning space</h2><p>You’re exploring as a guest.</p><p class="account-status">Account sign-in is coming soon.</p><a class="account-explore">Keep exploring the principles ↗</a>';
        dialog.querySelector('img').src=button.querySelector('img').src;
        dialog.querySelector('.account-explore').href=button.dataset.modulesHref;
        dialog.querySelector('.account-close').addEventListener('click',()=>dialog.close());
        dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
        document.body.append(dialog);
      }
      dialog.showModal();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
