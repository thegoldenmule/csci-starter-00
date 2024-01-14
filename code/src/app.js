let _canvas;
let _lastFrameTime;
let _hasInited = false;

const loop = (time) => {
  if (!_lastFrameTime) {
    _lastFrameTime = time;
  }

  const dt = time - _lastFrameTime;
  _lastFrameTime = time;

  if (_canvas) {
    _canvas.width = _canvas.clientWidth
    _canvas.height = _canvas.clientHeight;
  }

  if (!_hasInited) {
    if (window.init) {
      _hasInited = true;
      
      window.init(_canvas);
    }
  }

  if (window.loop) {
    window.loop(dt, _canvas);
  }

  window.requestAnimationFrame(loop);
};

const attachScript = () => {
  const url = `./src/solution.js`;
  const scriptTag = document.createElement('script');
  scriptTag.src = url;
  document.head.appendChild(scriptTag);
  document.title = `Homework Solution`;
};

// Add a listener for the page load.
// See: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
window.onload = () => {
  _canvas = document.getElementById('canvas');

  attachScript();

  // start loop
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  window.requestAnimationFrame(loop);
};
