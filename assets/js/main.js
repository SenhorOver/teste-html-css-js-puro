const Main = {

    init(){
        this.selectors()
        this.bindEvents()
    },

    selectors(){
        this.infoBtn = document.querySelector('#info-btn')
        this.shareBtn = document.querySelector('#share-btn')
        this.mpBtn = document.querySelector('#mp-btn')
    },

    bindEvents(){
        this.infoBtn.onclick = this.Events.click_thanksMsg
        this.shareBtn.onclick = this.Events.click_thanksMsg
    },


    Events: {
        click_thanksMsg(e){
            e.preventDefault()
            const el = e.target
            const parentEl = el.parentElement.parentElement
            const thanksMsg = parentEl.nextElementSibling

            parentEl.classList.add('none')
            thanksMsg.classList.remove('none')
        }
    }
}

Main.init()