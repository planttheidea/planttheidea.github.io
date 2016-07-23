const raf = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function requestAnimationFrame(fn) {
    window.setTimeout(fn, 1000 / 60);
  }
);

export {raf};

export default {
  raf
};
