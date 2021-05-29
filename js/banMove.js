// 本来想禁止拖拽一个元素导致整个页面拖拽，但是封装成函数就有点问题，也没时间检查了
function banMove(dom) {
    let startX = 0;
    document.body.removeEventListener('touchmove', e => e.preventDefault(), {
        passive: false
    })
    dom.addEventListener('touchstart', (e) => {
        startX = e.targetTouches[0].pageX;
        document.body.removeEventListener('touchmove', e => e.preventDefault(), {
            passive: false
        })
    }, true)

    dom.addEventListener('touchmove', function (e) {
        let scrollDistance = this.scrollLeft - e.targetTouches[0].pageX + startX
        if (scrollDistance < 0 || scrollDistance + this.offsetWidth >= this.scrollWidth) {
            document.body.addEventListener('touchmove', e => e.preventDefault(), {
                passive: false
            })
        }
    }, true)

    dom.addEventListener('touchend', function () {
        document.body.addEventListener('touchmove', e => e.preventDefault(), {
            passive: false
        })
    }, true)
}

export {
    banMove
}