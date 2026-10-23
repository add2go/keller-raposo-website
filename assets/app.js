(() => {
  'use strict';
  const one = (s,root=document) => root.querySelector(s);
  const all = (s,root=document) => [...root.querySelectorAll(s)];
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  const toggle=one('.menu-toggle'), mobile=one('#mobile-nav');
  function closeMenu(restore=true) {
    if(!toggle || !mobile)return;
    toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');
    mobile.hidden=true;document.body.classList.remove('menu-open');
    if(restore)toggle.focus();
  }
  if(toggle && mobile) {
    toggle.addEventListener('click',()=>{
      if(toggle.getAttribute('aria-expanded')==='true'){closeMenu();return;}
      toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Fechar menu');
      mobile.hidden=false;document.body.classList.add('menu-open');one('a',mobile)?.focus();
    });
    document.addEventListener('keydown',event=>{
      if(toggle.getAttribute('aria-expanded')!=='true')return;
      if(event.key==='Escape'){event.preventDefault();closeMenu();}
      if(event.key==='Tab') {
        const items=[toggle,...all('a',mobile)];
        if(event.shiftKey && document.activeElement===items[0]){event.preventDefault();items.at(-1).focus();}
        else if(!event.shiftKey && document.activeElement===items.at(-1)){event.preventDefault();items[0].focus();}
      }
    });
    const media=matchMedia('(min-width:981px)');
    media.addEventListener('change',e=>{if(e.matches)closeMenu(false);});
  }

  const tabs=all('[data-practice-tab]');
  function selectTab(tab,focus=false){
    tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});
    if(focus)tab.focus();
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>selectTab(tab));
    tab.addEventListener('keydown',event=>{
      let next=index;
      if(['ArrowDown','ArrowRight'].includes(event.key))next=(index+1)%tabs.length;
      else if(['ArrowUp','ArrowLeft'].includes(event.key))next=(index-1+tabs.length)%tabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();selectTab(tabs[next],true);
    });
  });

  const search=one('#article-search'), filters=all('[data-filter]'), cards=all('[data-article]');
  if(search){
    let category='all', page=1;
    const perPage=3, pagination=one('#article-pagination'), count=one('#results-count'), empty=one('#empty-state');
    function update(scroll=false){
      const query=normalize(search.value.trim());
      const matching=cards.filter(card=>(category==='all'||card.dataset.category===category)&&normalize(card.dataset.title).includes(query));
      const total=Math.ceil(matching.length/perPage);page=Math.max(1,Math.min(page,total||1));
      cards.forEach(card=>{card.hidden=true;});
      matching.slice((page-1)*perPage,page*perPage).forEach(card=>{card.hidden=false;});
      count.textContent=matching.length===1?'1 publicação demonstrativa':`${matching.length} publicações demonstrativas`;
      empty.hidden=matching.length>0;pagination.replaceChildren();
      if(total>1)for(let n=1;n<=total;n++){
        const button=document.createElement('button');button.type='button';button.textContent=n;
        button.setAttribute('aria-label',`Página ${n} de publicações`);
        if(n===page)button.setAttribute('aria-current','page');
        button.addEventListener('click',()=>{page=n;update(true);one('[aria-current="page"]',pagination)?.focus({preventScroll:true});});
        pagination.append(button);
      }
      if(scroll)count.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
    }
    filters.forEach(filter=>filter.addEventListener('click',()=>{
      category=filter.dataset.filter;page=1;
      filters.forEach(f=>{f.classList.toggle('active',f===filter);f.setAttribute('aria-pressed',String(f===filter));});update();
    }));
    search.addEventListener('input',()=>{page=1;update();});
    one('[data-reset-search]')?.addEventListener('click',()=>{search.value='';category='all';page=1;filters.forEach(f=>{f.classList.toggle('active',f.dataset.filter==='all');f.setAttribute('aria-pressed',String(f.dataset.filter==='all'));});update();search.focus();});
    update();
  }

  const form=one('#contact-form');
  if(form){
    const messages={name:'Informe seu nome, com pelo menos 2 caracteres.',email:'Informe um e-mail válido.',subject:'Selecione um assunto.',message:'Escreva uma mensagem com pelo menos 10 caracteres.',privacy:'Confirme que leu o aviso desta prévia.'};
    function validate(field){
      const error=one(`#${field.id}-error`);if(!error)return true;
      let valid=field.checkValidity();
      if(['name','message'].includes(field.id))valid=valid && field.value.trim().length>=(field.id==='name'?2:10);
      field.setAttribute('aria-invalid',String(!valid));
      if(!valid){field.setAttribute('aria-describedby',error.id);error.textContent=messages[field.id];}
      else{field.removeAttribute('aria-describedby');error.textContent='';}
      return valid;
    }
    all('[required]',form).forEach(field=>{
      field.addEventListener('blur',()=>validate(field));
      field.addEventListener(field.type==='checkbox'?'change':'input',()=>{if(field.getAttribute('aria-invalid')==='true')validate(field);});
    });
    form.addEventListener('submit',event=>{
      event.preventDefault();const fields=all('[required]',form);const results=fields.map(validate);
      const result=one('#form-result');result.hidden=true;
      if(results.some(x=>!x)){fields[results.indexOf(false)].focus();return;}
      result.textContent='Simulação concluída. Os campos foram validados, mas nenhuma mensagem foi enviada. Na versão definitiva, o envio será conectado ao canal aprovado pelo escritório.';
      result.hidden=false;
      form.reset();fields.forEach(f=>{f.removeAttribute('aria-invalid');f.removeAttribute('aria-describedby');});
      result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'nearest'});
    });
  }

  let toastTimer;
  const toast=message=>{const el=one('#toast');if(!el)return;clearTimeout(toastTimer);el.textContent=message;el.hidden=false;toastTimer=setTimeout(()=>{el.hidden=true;},4500);};
  one('[data-copy-link]')?.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(location.href);toast('Link da publicação copiado.');}
    catch{toast('Não foi possível copiar. Você pode usar o endereço do navegador.');}
  });
  const reviewFrame=one('#review-frame'), reviewPage=one('#review-page');
  if(reviewFrame&&reviewPage){
    reviewPage.addEventListener('change',()=>{reviewFrame.src=reviewPage.value;one('#review-open').href=reviewPage.value;});
    all('[data-review-width]').forEach(button=>button.addEventListener('click',()=>{
      reviewFrame.style.width=button.dataset.reviewWidth==='full'?'100%':`${button.dataset.reviewWidth}px`;
      all('[data-review-width]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
      one('.review-stage').style.justifyContent=button.dataset.reviewWidth==='full'?'flex-start':'center';
    }));
  }
})();
