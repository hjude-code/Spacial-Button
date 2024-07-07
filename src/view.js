/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
const spacialContainers = document.querySelectorAll('.wp-block-spc-btn-spacial-button')

const setInnerContainer = (parent) =>{
    let innerContainer = parent.childNodes[1].getBoundingClientRect()
    return {
        width:`${innerContainer.width}px`,
        height:`${innerContainer.height}px`
    }
}

const setBoxPosition = (e) =>{
    let containerBox = e.target.getBoundingClientRect()

    let containerXPos = containerBox.x
    let containerYPos = containerBox.y

    let relXPos = e.x - containerXPos
    let relYPos = e.y - containerYPos

    let xPercent = Math.floor((relXPos / containerBox.width)*100)
    let yPercent = Math.floor((relYPos / containerBox.height)*100)

    e.target.style.setProperty('--left', `${relXPos}px`)
    e.target.style.setProperty('--top', `${relYPos}px`)
}

spacialContainers.forEach((container)=>{

    let innerContainer = setInnerContainer(container)

    container.style.setProperty('--innerWidth', innerContainer.width)
    container.style.setProperty('--innerHeight', innerContainer.height)

    container.addEventListener("mousemove", setBoxPosition)
})



/* eslint-enable no-console */
