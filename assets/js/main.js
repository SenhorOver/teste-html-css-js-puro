const Main = {
    page: 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1',

    init(){
        this.selectors()
        this.bindEvents()
        this.execFetch(this.page, this.JSON.pegarJSON, this.JSON.newPage, this.JSON.error)
    },

    selectors(){
        this.infoBtn = document.querySelector('#info-btn')
        this.shareBtn = document.querySelector('#share-btn')
        this.mpBtn = document.querySelector('#mp-btn')
        this.shTxt = document.querySelector('#sh-text')
    },

    bindEvents(){
        this.infoBtn.onclick = this.Events.click_thanksMsg.bind(this)
        this.shareBtn.onclick = this.Events.click_thanksMsg.bind(this)
        this.mpBtn.onclick = this.Events.click_showProducts.bind(this)
        this.shTxt.onclick = this.Events.click_showText.bind(this)
    },

    Events: {
        click_thanksMsg(e){
            e.preventDefault()
            let validEmpty = true
            let validCpf = true
            let validEmail = true

            validEmpty = this.Validacoes.empty(e)
            validCpf = this.Validacoes.cpf(e)
            validEmail = this.Validacoes.email(e)

            if(validEmpty && validCpf && validEmail){
                const el = e.target
                const parentEl = el.parentElement.parentElement
                const thanksMsg = parentEl.nextElementSibling
    
                parentEl.classList.add('none')
                thanksMsg.classList.remove('none')
            }
        },

        click_showProducts(e){
            const ul = e.target.previousElementSibling
            const inputs = ul.querySelectorAll('.none')
            if(inputs.length){
                this.UsefulMethods.rmNone(inputs)
                return
            }
            this.execFetch(this.page, this.JSON.pegarJSON, this.JSON.newPage, this.JSON.error)
        },

        click_showText(e){
            const text = document.querySelector('#text')
            const i = document.querySelector('.arrow')
            if(text.classList.contains('none')) {
                i.classList.remove('down')
                i.classList.add('up')
                return text.classList.remove('none')
            }
            text.classList.add('none')
            i.classList.add('down')
            i.classList.remove('up')
        }
    },

    Validacoes: {
        empty(e){
            let valid = true
            const form = e.target.parentElement
            const inputs = form.querySelectorAll('.inp-name')
            inputs.forEach(el => {
                if(!el.value) {
                    el.classList.add('error')
                    el.setAttribute('placeholder','Digite uma informação válida')
                    valid = false
                    return valid
                }
                el.classList.remove('error')
                el.setAttribute('placeholder','')
            })
            return valid
        },

        cpf(e){
            let valid = true
            const form = e.target.parentElement
            const inputs = form.querySelectorAll('.inp-name')
            inputs.forEach(el => {
                if(el.previousElementSibling.innerText === 'CPF:') {
                    const teste = new ValidaCPF(el.value)
                    if(teste.valida()){
                        el.classList.remove('error')
                        el.setAttribute('placeholder','')
                        return
                    }
                    el.classList.add('error')
                    el.setAttribute('placeholder','Digite um CPF válido')
                    valid = false
                }
            })
            return valid
        },

        email(e){
            let valid = true
            const form = e.target.parentElement
            const inputs = form.querySelectorAll('.inp-name')
            inputs.forEach(el => {
                if(el.previousElementSibling.innerText === 'E-mail:' || el.previousElementSibling.innerText === 'E-mail dele:'){
                    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el.value)){
                        el.classList.add('error')
                        el.setAttribute('placeholder','Digite um Email Válido')
                        valid = false
                        return
                    }
                    el.classList.remove('error')
                    el.setAttribute('placeholder','')
                }
            })
            return valid
        }
    },

    JSON: {
        pegarJSON(e){
            return e.json()
        },

        newPage(e){
            if(window.innerWidth < 501){
                productsUl = document.querySelector('#products-list')
                e.products.forEach((el,ix) => {
                    if(ix > 3){
                        productsUl.innerHTML += Main.UsefulMethods.mkProduct(el, 'true')
                        return
                    }
                    productsUl.innerHTML += Main.UsefulMethods.mkProduct(el)
                });
                Main.page = `https://${e.nextPage}`
                return
            }
            productsUl = document.querySelector('#products-list')
            e.products.forEach(el => {
                productsUl.innerHTML += Main.UsefulMethods.mkProduct(el)
            });
            Main.page = `https://${e.nextPage}`
        },

        error(){
            products = document.querySelector('.list-products')
            products.innerHTML = '<h2> Ocorreu um erro, atualize a página ou tente novamente mais tarde </h2>'
        }
    },

    UsefulMethods:{
        mkProduct(el, none){
            if(none){
                return `
                <li class="item none">
                        <div class="img">
                            <img src="${el.image}" alt="">
                        </div>
                        <div class="content">
                            <div class="description">
                                <h4 class="title">
                                    ${el.name}
                                </h4>
                                <p class="text">
                                    ${el.description}
                                </p>
                            </div>
                            <div class="prices">
                                <span>De: ${el.oldPrice.toFixed(2)}</span>
                                Por: ${el.price.toFixed(2)}
                                <span>ou ${el.installments.count}x de R$${el.installments.value.toFixed(2)}</span>
                            </div>
                            <button class="buy">Comprar</button>
                        <div>
                    </li> 
                `
            }
            return `
            <li class="item">
                    <div class="img">
                        <img src="${el.image}" alt="">
                    </div>
                    <div class="content">
                        <div class="description">
                            <h4 class="title">
                                ${el.name}
                            </h4>
                            <p class="text">
                                ${el.description}
                            </p>
                        </div>
                        <div class="prices">
                            <span>De: ${el.oldPrice.toFixed(2)}</span>
                            Por: ${el.price.toFixed(2)}
                            <span>ou ${el.installments.count}x de R$${el.installments.value.toFixed(2)}</span>
                        </div>
                        <button class="buy">Comprar</button>
                    <div>
                </li> 
            `
        },

        rmNone(inputs){
            inputs.forEach(el => {
                el.classList.remove('none')
            })
        }
    },

    execFetch(fetchLink, firstThen, secondThen, Error){
        fetch(fetchLink)
            .then(firstThen)
            .then(secondThen)
            .catch(Error)
    }
}

Main.init()
