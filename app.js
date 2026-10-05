(function(){
  var KEY='balotario-scrum-v1';
  function get(k,d){try{var v=localStorage.getItem(KEY+':'+k);return v===null?d:JSON.parse(v)}catch(e){return d}}
  function set(k,v){try{localStorage.setItem(KEY+':'+k,JSON.stringify(v))}catch(e){}}
  var root=document.documentElement;
  var th=get('theme','auto');
  function applyTheme(){ if(th==='auto'){root.removeAttribute('data-theme')} else {root.setAttribute('data-theme',th)} var b=document.getElementById('themeBtn'); if(b){b.textContent=th==='auto'?'Tema: auto':(th==='dark'?'Tema: oscuro':'Tema: claro')}}
  applyTheme();
  var tb=document.getElementById('themeBtn');
  if(tb)tb.addEventListener('click',function(){th=th==='auto'?'dark':(th==='dark'?'light':'auto');set('theme',th);applyTheme()});

  var cards=[].slice.call(document.querySelectorAll('.card'));
  if(!cards.length)return;
  var setId=document.body.getAttribute('data-set')||'x';
  var done=get('done-'+setId,{});
  var count=document.getElementById('pcount'),bar=document.getElementById('pbar');
  function refresh(){
    var n=0;
    cards.forEach(function(c){var id=c.id;var d=!!done[id];if(d)n++;
      var cb=c.querySelector('.dn input');if(cb)cb.checked=d;
      var a=document.querySelector('.pgrid a[href="#'+id+'"]');if(a)a.classList.toggle('done',d)});
    if(count)count.textContent=n+' / '+cards.length+' repasados';
    if(bar)bar.style.width=(100*n/cards.length)+'%';
  }
  cards.forEach(function(c){var cb=c.querySelector('.dn input');if(cb)cb.addEventListener('change',function(){done[c.id]=cb.checked;set('done-'+setId,done);refresh()});
    var rv=c.querySelector('.reveal');if(rv)rv.addEventListener('click',function(){c.classList.add('open')});});
  refresh();
  var pm=document.getElementById('practiceBtn');
  var practice=get('practice',false);
  function applyPractice(){document.body.classList.toggle('practice',practice);if(pm)pm.setAttribute('aria-pressed',practice?'true':'false')}
  applyPractice();
  if(pm)pm.addEventListener('click',function(){practice=!practice;set('practice',practice);cards.forEach(function(c){c.classList.remove('open')});applyPractice()});
  var rs=document.getElementById('resetBtn');
  if(rs)rs.addEventListener('click',function(){done={};set('done-'+setId,done);refresh()});
  // filtros
  var q=document.getElementById('q'),active=null;
  var chips=[].slice.call(document.querySelectorAll('button.chip[data-t]'));
  function filt(){
    var s=(q&&q.value||'').toLowerCase().trim();
    cards.forEach(function(c){
      var okT=!active||(' '+c.getAttribute('data-t')+' ').indexOf(' '+active+' ')>-1;
      var okS=!s||c.textContent.toLowerCase().indexOf(s)>-1;
      c.classList.toggle('hide',!(okT&&okS));
    });
  }
  if(q)q.addEventListener('input',filt);
  chips.forEach(function(b){b.addEventListener('click',function(){var t=b.getAttribute('data-t');active=(active===t)?null:t;chips.forEach(function(x){x.setAttribute('aria-pressed',x.getAttribute('data-t')===active?'true':'false')});filt()})});
})();
(function(){
  var cards=[].slice.call(document.querySelectorAll('.card.q'));
  if(!cards.length)return;
  cards.forEach(function(c){
    var opts=[].slice.call(c.querySelectorAll('.opt'));
    opts.forEach(function(o){
      o.addEventListener('click',function(){
        var was=o.classList.contains('sel');
        opts.forEach(function(x){x.classList.remove('sel')});
        if(!was)o.classList.add('sel');
      });
    });
  });
})();
