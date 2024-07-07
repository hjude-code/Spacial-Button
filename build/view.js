/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
const spacialContainers = document.querySelectorAll('.wp-block-spc-btn-spacial-button');
const setDimentions = parent => {
  let innerContainer = parent.childNodes[1].getBoundingClientRect();
  let parentContainer = parent.getBoundingClientRect();
  return {
    outer: {
      width: `${parentContainer.width}px`,
      height: `${parentContainer.height}px`
    },
    inner: {
      width: `${innerContainer.width}px`,
      height: `${innerContainer.height}px`
    }
  };
};
const setBoxPositionRel = e => {
  let containerBox = e.target.getBoundingClientRect();
  let containerXPos = containerBox.x;
  let containerYPos = containerBox.y;
  let relXPos = e.x - containerXPos;
  let relYPos = e.y - containerYPos;
  let xPercent = Math.floor(relXPos / containerBox.width * 1000) / 1000;
  let yPercent = Math.floor(relYPos / containerBox.height * 1000) / 1000;
  e.target.style.setProperty('--percentX', xPercent);
  e.target.style.setProperty('--percentY', yPercent);
};
const setAllDimentions = containers => {
  containers.forEach(container => {
    let containerDimentions = setDimentions(container);
    container.style.setProperty('--outerWidth', containerDimentions.outer.width);
    container.style.setProperty('--outerHeight', containerDimentions.outer.height);
    container.style.setProperty('--innerWidth', containerDimentions.inner.width);
    container.style.setProperty('--innerHeight', containerDimentions.inner.height);
  });
};
window.onload = () => {
  setAllDimentions(spacialContainers);
  spacialContainers.forEach(container => {
    container.addEventListener("mousemove", setBoxPositionRel);
  });
};
window.addEventListener('resize', () => {
  setAllDimentions(spacialContainers);
});
/******/ })()
;
//# sourceMappingURL=view.js.map