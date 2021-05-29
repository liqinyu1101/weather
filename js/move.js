let move = (target) => {
    let startX = 0;
    let moveX = 0;
    let index = 0
    const baseW = window.screen.width;
    const baseH = window.screen.height;
    target.addEventListener('touchstart', (e) => {
        startX = e.targetTouches[0].pageX;

    })
    target.addEventListener('touchmove', (e) => {
        moveX = e.targetTouches[0].pageX - startX;
        let translateX = -(index) * 100 + moveX * 100 / baseW;
        console.log(translateX)
        target.style.transition = 'none'
        target.style.transform = `translate(${translateX}vw)`;
    })
    target.addEventListener('touchend', (e) => {
        if (Math.abs(moveX * 100 / baseW) > 10) {
            if (moveX > 0) {
                index--
            } else {
                index++
            }
            target.style.transform = `translate(-${index * 100}vw)`;
        }
    })
}

export {
    move
};