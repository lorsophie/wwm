/* =========================================================
   Sound-Katalog + Abspiel-Engine
   Wird von index.html (Spiel) und soundboard.html genutzt.
   Schlüssel = Dateiname in sounds/ (ohne .mp3).
========================================================= */
const SOUND_GROUPS = [
  { title:'Show', sounds:[
    { key:'Intro',        label:'Intro',            icon:'🎬', dur:'0:31' },
    { key:'Begruessung',  label:'Begrüßung',        icon:'👋', dur:'0:54' },
    { key:'Theme',        label:'Theme',            icon:'🎵', dur:'0:36' },
    { key:'Outro',        label:'Outro',            icon:'🌙', dur:'0:28' },
  ]},
  { title:'Auswahlrunde', sounds:[
    { key:'Auswahlrunde',      label:'Auswahlrunde',      icon:'⚡', dur:'1:34' },
    { key:'Auswahlrunde_Ende', label:'Auswahlrunde Ende', icon:'🏁', dur:'0:11' },
  ]},
  { title:'Runde 1 · Fragen 1–5 · 50–500 €', sounds:[
    { key:'Runde1_Frage',   label:'Fragemusik',       icon:'❓', dur:'2:46' },
    { key:'Spannung1',      label:'Spannung 1',       icon:'🎼', dur:'0:59' },
    { key:'Runde1_Richtig', label:'Richtig',          icon:'✔', dur:'0:02', tone:'good' },
    { key:'Runde1_Falsch',  label:'Falsch',           icon:'✘', dur:'0:01', tone:'bad' },
  ]},
  { title:'Runde 2 · Fragen 6–10 · 1.000–16.000 €', sounds:[
    { key:'Runde2_Frage',   label:'Fragemusik',       icon:'❓', dur:'2:39' },
    { key:'Spannung2',      label:'Spannung 2',       icon:'🎼', dur:'1:52' },
    { key:'Runde2_Richtig', label:'Richtig',          icon:'✔', dur:'0:02', tone:'good' },
    { key:'Runde2_Falsch',  label:'Falsch',           icon:'✘', dur:'0:04', tone:'bad' },
  ]},
  { title:'Runde 3 · Fragen 11–14 · 32.000–500.000 €', sounds:[
    { key:'Runde3_Frage',   label:'Fragemusik',       icon:'❓', dur:'2:39' },
    { key:'Spannung3',      label:'Spannung 3',       icon:'🎼', dur:'1:53' },
    { key:'Runde3_Richtig', label:'Richtig',          icon:'✔', dur:'0:03', tone:'good' },
    { key:'Runde3_Falsch',  label:'Falsch',           icon:'✘', dur:'0:03', tone:'bad' },
  ]},
  { title:'Runde 4 · Millionenfrage', sounds:[
    { key:'Runde4_Frage',   label:'Fragemusik',       icon:'❓', dur:'2:40' },
    { key:'Spannung4',      label:'Spannung 4',       icon:'🎼', dur:'1:37' },
    { key:'Runde4_Richtig', label:'Million gewonnen', icon:'💰', dur:'0:23', tone:'good' },
    { key:'Runde4_Falsch',  label:'Falsch',           icon:'✘', dur:'0:07', tone:'bad' },
  ]},
  { title:'Einloggen, Sicherheitsstufen & Übergänge', sounds:[
    { key:'Einloggen',                  label:'Antwort einloggen',    icon:'🔒', dur:'0:36' },
    { key:'Sicherheitsstufe1',          label:'Sicherheitsstufe 1',   icon:'🛡', dur:'0:08', tone:'good' },
    { key:'Sicherheitsstufe2',          label:'Sicherheitsstufe 2',   icon:'🛡', dur:'0:07', tone:'good' },
    { key:'Gewinnstufe',                label:'Gewinnstufe',          icon:'📈', dur:'0:10' },
    { key:'Uebergang_Richtig',          label:'Nach richtiger Antwort', icon:'➡', dur:'0:02' },
    { key:'Uebergang_Sicherheitsstufe', label:'Nach Sicherheitsstufe', icon:'➡', dur:'0:04' },
  ]},
  { title:'Joker', sounds:[
    { key:'FuenfzigFuenfzig',      label:'50:50',                 icon:'➗', dur:'0:01' },
    { key:'Telefonjoker',          label:'Telefonjoker',          icon:'📞', dur:'0:48' },
    { key:'Telefonjoker_Original', label:'Telefonjoker (Original)', icon:'☎', dur:'0:38' },
    { key:'Publikumsjoker',        label:'Publikumsjoker',        icon:'🙋', dur:'0:16' },
    { key:'Personenjoker',         label:'Personenjoker',         icon:'🎯', dur:'6:00' },
  ]},
  { title:'Spielende', sounds:[
    { key:'Spielende_Gewinn1', label:'Gewinn mitnehmen', icon:'🏆', dur:'0:08', tone:'good' },
    { key:'Spielende_Gewinn2', label:'Gewinner-Fanfare', icon:'🎉', dur:'0:07', tone:'good' },
  ]},
];

function soundSrc(key){ return `sounds/${key}.mp3`; }

function loadSetting(name, fallback){
  try{ const v = localStorage.getItem('wwm-' + name); return v === null ? fallback : JSON.parse(v); }
  catch(e){ return fallback; }
}
function saveSetting(name, value){
  try{ localStorage.setItem('wwm-' + name, JSON.stringify(value)); }catch(e){}
}

const SoundEngine = (() => {
  const playing = new Map(); // key -> Audio
  let volume = loadSetting('volume', 0.8);
  let muted = loadSetting('muted', false);
  let exclusive = true;      // true: immer nur ein Sound gleichzeitig
  const listeners = [];

  function effVolume(){ return muted ? 0 : volume; }

  function notify(){
    sync();
    listeners.forEach(fn => fn());
  }

  // Markiert alle Elemente mit data-sound="<key>", deren Sound gerade läuft.
  function sync(root){
    (root || document).querySelectorAll('[data-sound]').forEach(el => {
      el.classList.toggle('playing', playing.has(el.dataset.sound));
    });
  }

  function stop(key){
    const a = playing.get(key);
    if(!a) return;
    a.pause();
    playing.delete(key);
    notify();
  }

  function stopAll(){
    playing.forEach(a => a.pause());
    playing.clear();
    notify();
  }

  function play(key){
    if(exclusive) { playing.forEach(a => a.pause()); playing.clear(); }
    else if(playing.has(key)) { playing.get(key).pause(); playing.delete(key); }
    const a = new Audio(soundSrc(key));
    a.volume = effVolume();
    a.addEventListener('ended', () => {
      if(playing.get(key) === a){ playing.delete(key); notify(); }
    });
    a.play().catch(err => {
      console.warn(`Sound "${key}" konnte nicht abgespielt werden:`, err);
      if(playing.get(key) === a){ playing.delete(key); notify(); }
    });
    playing.set(key, a);
    notify();
    return a;
  }

  // Startet den Sound oder stoppt ihn, falls er schon läuft. Gibt true zurück, wenn er jetzt spielt.
  function toggle(key){
    if(playing.has(key)){ stop(key); return false; }
    play(key);
    return true;
  }

  function applyVolume(){ playing.forEach(a => { a.volume = effVolume(); }); }

  return {
    play, stop, stopAll, toggle, sync,
    isPlaying: key => playing.has(key),
    anyPlaying: () => playing.size > 0,
    getAudio: key => playing.get(key),
    playingKeys: () => [...playing.keys()],
    getVolume: () => volume,
    isMuted: () => muted,
    setVolume(v){ volume = v; saveSetting('volume', v); applyVolume(); },
    setMuted(m){ muted = m; saveSetting('muted', m); applyVolume(); },
    setExclusive(x){ exclusive = x; },
    onChange(fn){ listeners.push(fn); },
  };
})();
