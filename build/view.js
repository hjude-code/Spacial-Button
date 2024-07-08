/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
const spacialContainers = document.querySelectorAll('.wp-block-spc-btn-spacial-button');
function calculateContainerBox(container) {
  const containerBox = container.getBoundingClientRect();
  const innerContainerBox = container.childNodes[1].getBoundingClientRect();
  let values = {
    outer: {
      x: containerBox.x,
      y: containerBox.y,
      w: containerBox.width,
      h: containerBox.height
    }
  };
  return values;
}
function calculateSpacialRel(container, event) {
  const containerBox = calculateContainerBox(container);
  const mX = event.x;
  const mY = event.y;
  const mRelX = mX - containerBox.outer.x;
  const mRelY = mY - containerBox.outer.y;
  let precision = 1000;
  let percentW = Math.floor(mRelX / containerBox.outer.w * precision) / precision;
  let percentH = Math.floor(mRelY / containerBox.outer.w * precision) / precision;
  let posX = percentW * containerBox.outer.w;
  let posY = percentH * containerBox.outer.h;
  container.style.setProperty('--posX', `${posX}px`);
  container.style.setProperty('--posY', `${posY}px`);
}
function calculateSpacialAbs(container) {}
window.onload = () => {
  setAllDimentions(spacialContainers);
  spacialContainers.forEach(container => {
    container.addEventListener("mousemove", e => {
      calculateSpacialRel(container, e);
    });
  });
};

// window.addEventListener('resize', ()=>{
//     setAllDimentions(spacialContainers)
//     document.body.style.setProperty('--spacial-left-global', `50svw`);
//     document.body.style.setProperty('--spacial-top-global', `50svh`);
// })

// const observeScrolling = () =>{
//     visibleSpacial.forEach((container)=>{
//         setContainerLocation(container)
//     })
// }

// let visibleSpacial = []
// const spacialObserver = new IntersectionObserver((entries)=>{
//     entries.forEach(entry=>{
//         if(entry.isIntersecting){
//             visibleSpacial.push(entry.target)
//         }else{
//             const index = visibleSpacial.indexOf(entry.target);
//             if (index !== -1) {
//                 visibleSpacial.splice(index, 1);
//             }
//         }
//     })

//     if(visibleSpacial.length > 0){
//         window.addEventListener('scroll', observeScrolling)
//     }else if(visibleSpacial.length <= 0){
//         window.removeEventListener('scroll', observeScrolling)
//     }
// }, {
//     threshold:0
// })

// spacialContainers.forEach((container)=>{
//     spacialObserver.observe(container)
// })
/******/ })()
;
//# sourceMappingURL=view.js.map