(function(){
  const CONFIG = window.SCANNER_CONFIG || {};
  const els = {
    home: document.getElementById('homeScreen'),
    scan: document.getElementById('scanScreen'),
    done: document.getElementById('doneScreen'),
    error: document.getElementById('errorScreen'),
    homeStatus: document.getElementById('homeStatus'),
    moveBtn: document.getElementById('moveBtn'),
    doneMoveBtn: document.getElementById('doneMoveBtn'),
    backBtn: document.getElementById('backBtn'),
    stateText: document.getElementById('stateText'),
    hintText: document.getElementById('hintText'),
    scanValue: document.getElementById('scanValue'),
    doneText: document.getElementById('doneText'),
    errorText: document.getElementById('errorText')
  };
  const state = {scanner:null,currentStep:'idle',cardId:'',listId:'',lastText:'',lastAt:0};
  function show(screen){
    els.home.classList.add('hidden'); els.scan.classList.add('hidden'); els.done.classList.add('hidden'); els.error.classList.add('hidden');
    screen.classList.remove('hidden');
  }
  async function stopScanner(){
    if(!state.scanner) return;
    try{ await state.scanner.stop(); await state.scanner.clear(); }catch(e){}
    state.scanner = null;
  }
  function setError(msg){
    stopScanner();
    els.errorText.textContent = msg;
    show(els.error);
  }
  function resetFlow(){
    state.currentStep='idle'; state.cardId=''; state.listId=''; state.lastText=''; state.lastAt=0;
    els.scanValue.textContent='';
    show(els.home);
  }
  function doneFlow(msg){
    stopScanner();
    els.doneText.textContent = msg;
    show(els.done);
    if(navigator.vibrate){ navigator.vibrate(120); }
  }
  async function moveCard(){
    await stopScanner();
    if(!CONFIG.apiKey || !CONFIG.token){ throw new Error('Missing apiKey or token in scanner-config.js'); }
    const url = new URL('https://api.trello.com/1/cards/' + encodeURIComponent(state.cardId));
    url.searchParams.set('idList', state.listId);
    url.searchParams.set('key', CONFIG.apiKey);
    url.searchParams.set('token', CONFIG.token);
    const res = await fetch(url.toString(), {method:'PUT'});
    if(!res.ok){ const txt = await res.text(); throw new Error('Move failed: ' + res.status + ' ' + txt); }
    doneFlow('Card moved successfully');
  }
  function processScan(text){
    const now = Date.now();
    if(text===state.lastText && now-state.lastAt<1500) return;
    state.lastText=text; state.lastAt=now;
    const code = String(text||'').trim();
    if(!code) return;
    if(state.currentStep==='scanCard'){
      if(!code.startsWith('CARD:')) return;
      state.cardId = code.substring(5);
      els.scanValue.textContent = code;
      state.currentStep='scanList';
      els.stateText.textContent='Scan List';
      els.hintText.textContent='Point the camera at a list QR';
      return;
    }
    if(state.currentStep==='scanList'){
      if(!code.startsWith('LIST:')) return;
      state.listId = code.substring(5);
      els.scanValue.textContent = code;
      moveCard().catch(err => setError(err.message));
    }
  }
  async function startScanner(){
    if(state.scanner) return;
    state.scanner = new Html5Qrcode('reader');
    await state.scanner.start({facingMode:'environment'},{fps:10, qrbox:{width:250,height:250}},processScan);
  }
  async function beginFlow(){
    try{
      state.currentStep='scanCard'; state.cardId=''; state.listId=''; state.lastText=''; state.lastAt=0;
      els.scanValue.textContent='';
      els.stateText.textContent='Scan Card';
      els.hintText.textContent='Point the camera at a card QR';
      show(els.scan);
      await startScanner();
    }catch(err){ setError(err.message||String(err)); }
  }
  els.moveBtn.addEventListener('click', beginFlow);
  if (els.doneMoveBtn) els.doneMoveBtn.addEventListener('click', beginFlow);
  els.backBtn.addEventListener('click', resetFlow);
  els.homeStatus.textContent = 'Ready';
})();
