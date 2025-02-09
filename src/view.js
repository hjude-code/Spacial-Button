const spacialContainers = document.querySelectorAll('.wp-block-spc-btn-spacial-button')
let windowScrollTopBase = window.scrollY
let mousePos = {
    x:0,
    y:0
}

function calculateContainerBox(container){
    const containerBox = container.getBoundingClientRect()
    const innerContainerBox = container.childNodes[1].getBoundingClientRect()

    let values = {
        outer:{
            x:containerBox.x,
            y:containerBox.y,
            w:containerBox.width,
            h:containerBox.height
        },
        inner:{
            x:innerContainerBox.x,
            y:innerContainerBox.y,
            w:innerContainerBox.width,
            h:innerContainerBox.height
        }
    }

    return values
}

function calculateInnerBoxSize(container){
    const containerBox = calculateContainerBox(container)
    container.style.setProperty('--innerW', `${Math.round(containerBox.inner.w)}px`)
    container.style.setProperty('--innerH', `${Math.round(containerBox.inner.h)}px`)
}

function calculateSpacialRel(container, event){
    
    const containerBox = calculateContainerBox(container)
    const mX = event.x
    const mY = event.y

    const mRelX = mX - containerBox.outer.x
    const mRelY = mY - containerBox.outer.y

    let precision = 1000

    let percentW = Math.floor((mRelX / containerBox.outer.w)*precision)/precision
    let percentH = Math.floor((mRelY / containerBox.outer.h)*precision)/precision

    let posX = Math.round(percentW * containerBox.outer.w)
    let posY = Math.round(percentH * containerBox.outer.h)

    container.style.setProperty('--posX', `${posX}px`)
    container.style.setProperty('--posY', `${posY}px`)

}

function updatePosOnScroll(container, scrollAmount){
    let containerStyles = window.getComputedStyle(container)
    let containerPosYStyle = containerStyles.getPropertyValue('--posY')
    let oldContainerY = parseInt(containerPosYStyle)

    let newContainerY = Math.round(oldContainerY - scrollAmount)

    container.style.setProperty('--posY', `${newContainerY}px`)
    
}


window.onload = () =>{
        spacialContainers.forEach((container)=>{

            calculateInnerBoxSize(container)

            if(container.classList.contains('is-local')){
                container.addEventListener("mousemove", (e)=>{
                    calculateSpacialRel(container, e)
                })
            }
        })
}

window.addEventListener('resize', ()=>{
    spacialContainers.forEach((container)=>{
        calculateInnerBoxSize(container)
    }) 
})





const updateGlobalContainers = (e) =>{

    mousePos.x = e.x
    mousePos.y = e.y
    console.log(mousePos)

    visibleSpacial.forEach((container)=>{
        if(container.classList.contains('is-global')){
            calculateSpacialRel(container, mousePos)
        }
    })

}
function updateGlobalContainersOnScroll(e){
    let newScrollTop = window.scrollY
    let scrollAmount = windowScrollTopBase - newScrollTop
    visibleSpacial.forEach((container=>{
        if(container.classList.contains('is-global')){
            updatePosOnScroll(container, scrollAmount)
            calculateSpacialRel(container, mousePos)
        }
    }))
    windowScrollTopBase = newScrollTop
}


let visibleSpacial = []

const spacialObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            visibleSpacial.push(entry.target)
        }else{
            const index = visibleSpacial.indexOf(entry.target);
            if (index !== -1) {
                visibleSpacial.splice(index, 1);
            }
        }
    })

    if(visibleSpacial.length > 0){
        window.addEventListener('mousemove', updateGlobalContainers)
        window.addEventListener('scroll', updateGlobalContainersOnScroll)
    }else if(visibleSpacial.length <= 0){
        window.removeEventListener('mousemove', updateGlobalContainers)
        window.removeEventListener('scroll', updateGlobalContainersOnScroll)
    }
}, {
    threshold:0
})

spacialContainers.forEach((container)=>{
    if(container.classList.contains('is-global')){
        spacialObserver.observe(container)
    }
})