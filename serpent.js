/* A lazy-loaded, skippable introduction. No video requests before entry. */
(() => {
  'use strict';
  const shell = document.getElementById('serpent-shell');
  const dialog = document.getElementById('serpent-trailer');
  const video = document.getElementById('serpent-video');
  const message = document.getElementById('serpent-trailer-message');
  const status = document.getElementById('serpent-trailer-status');
  const retry = document.getElementById('serpent-trailer-retry');
  const toggle = document.getElementById('serpent-trailer-toggle');
  const skip = document.getElementById('serpent-trailer-skip');
  const volume = document.getElementById('serpent-trailer-volume');
  const volumeLabel = document.getElementById('serpent-trailer-volume-label');
  const time = document.getElementById('serpent-trailer-time');
  const title = document.getElementById('serpent-title');
  let attempt = 0;
  let waitTimer = null;
  let returnTarget = title;
  let trailerVolume = .5;
  let lastTime = '';
  const stamp = n => `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}`;

  function playbackLabel() {
    const label = video.paused ? 'Play' : 'Pause';
    toggle.textContent = label;
    toggle.setAttribute('aria-label', `${label} trailer`);
  }
  function notice(text, buttonText) {
    message.hidden = false;
    status.textContent = text;
    retry.hidden = !buttonText;
    if (buttonText) retry.textContent = buttonText;
  }
  function clearWait() {
    window.clearTimeout(waitTimer);
    waitTimer = null;
  }
  function release() {
    attempt++;
    clearWait();
    video.pause();
    video.removeAttribute('src');
    video.load(); // Cancel pending downloads and release the decoder on exit.
  }
  function close(restoreFocus = true) {
    if (!dialog.open) return;
    release();
    dialog.close();
    document.body.classList.remove('serpent-trailer-open');
    if (restoreFocus && !shell.hidden) returnTarget.focus({ preventScroll: true });
  }
  function play() {
    const id = ++attempt;
    clearWait();
    notice('Loading trailer…');
    waitTimer = window.setTimeout(() => {
      if (dialog.open && id === attempt) notice('The trailer is taking a little longer to load. You can skip ahead at any time.', 'Try again');
    }, 15000);
    // Called directly from the chronicle/replay click to retain user activation.
    const result = video.play();
    if (result && typeof result.catch === 'function') result.catch(error => {
      if (id !== attempt || !dialog.open) return;
      clearWait();
      playbackLabel();
      notice(error.name === 'NotAllowedError' ? 'Press Play to begin the trailer.' : 'The trailer could not play. Try again, or skip to the chronicle.', 'Play trailer');
    });
  }
  function open(target = title) {
    if (dialog.open) return;
    returnTarget = target;
    video.src = 'assets/serpent/trailer.mp4';
    video.volume = trailerVolume;
    video.muted = false;
    time.textContent = '0:00 / 1:43';
    lastTime = '';
    dialog.showModal();
    document.body.classList.add('serpent-trailer-open');
    skip.focus({ preventScroll: true });
    play();
  }
  skip.addEventListener('click', () => close());
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  video.addEventListener('ended', () => close());
  video.addEventListener('playing', () => { if (!dialog.open) return; clearWait(); message.hidden = true; playbackLabel(); });
  video.addEventListener('pause', playbackLabel);
  video.addEventListener('waiting', () => { if (dialog.open) notice('Loading trailer…'); });
  video.addEventListener('error', () => {
    if (!dialog.open || !video.hasAttribute('src')) return;
    clearWait(); notice('The trailer could not load. Try again, or skip to the chronicle.', 'Try again');
  });
  video.addEventListener('timeupdate', () => {
    if (!dialog.open) return;
    const length = Number.isFinite(video.duration) ? video.duration : 103;
    const value = `${stamp(video.currentTime || 0)} / ${stamp(length)}`;
    if (value !== lastTime) { time.textContent = value; lastTime = value; }
  });
  retry.addEventListener('click', () => { if (video.error) video.load(); play(); });
  toggle.addEventListener('click', () => {
    if (video.paused) { if (video.error) video.load(); play(); }
    else { ++attempt; clearWait(); video.pause(); message.hidden = true; }
  });
  volume.addEventListener('input', () => {
    trailerVolume = Number(volume.value) / 100;
    video.volume = trailerVolume;
    volumeLabel.textContent = `${volume.value}%`;
  });
  shell.querySelectorAll('[data-serpent-replay]').forEach(button => button.addEventListener('click', () => open(button)));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && dialog.open) { ++attempt; clearWait(); video.pause(); message.hidden = true; }
  });
  window.SerpentChronicle = {
    enter() {
      history.replaceState(null, '', '#/serpent/premise');
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      open();
    },
    leave() { close(false); },
    renderFromHash() { history.replaceState(null, '', '#/serpent/premise'); }
  };
})();
