const modal=document.getElementById('modal');
const open=()=>modal.classList.remove('hidden');
const close=()=>modal.classList.add('hidden');
document.getElementById('newCaseBtn').onclick=open;
document.getElementById('demoBtn').onclick=()=>alert('Демо: AI нашёл 3 потенциальных противоречия, 7 вопросов для проверки и 28 релевантных фрагментов. В реальной версии каждый вывод будет связан с источником.');
document.getElementById('closeBtn').onclick=close;
document.getElementById('createBtn').onclick=()=>{
  const name=document.getElementById('caseName').value.trim()||'Новое дело';
  const type=document.getElementById('caseType').value;
  document.getElementById('cases').insertAdjacentHTML('afterbegin',
    `<article class="case-card"><div class="case-icon">⚖</div><div class="case-info"><h3>${name.replace(/[<>]/g,'')}</h3><p>0 документов · ${type}</p><span class="status">Готово к загрузке документов</span></div></article>`
  );
  document.getElementById('caseName').value='';
  close();
};
modal.addEventListener('click',e=>{if(e.target===modal)close()});
