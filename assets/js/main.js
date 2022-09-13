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
    },

    bindEvents(){
        this.infoBtn.onclick = this.Events.click_thanksMsg
        this.shareBtn.onclick = this.Events.click_thanksMsg
        this.mpBtn.onclick = this.Events.click_showProducts.bind(this)
    },

    //TODO: Terminei envio com fetch, não gostei de ter que usar muitos Main, pois não conseguia acessar com this, mas pelo menos funciona
    //TODO: FAZER VALIDAÇÕES DE FORMULÁRIO E DEPOIS DISSO FAZER CSS PARA MOBILE
    Events: {
        click_thanksMsg(e){
            e.preventDefault()
            if(false){
                const el = e.target
                const parentEl = el.parentElement.parentElement
                const thanksMsg = parentEl.nextElementSibling
    
                parentEl.classList.add('none')
                thanksMsg.classList.remove('none')
            }
        },

        click_showProducts(e){
            this.execFetch(this.page, this.JSON.pegarJSON, this.JSON.newPage, this.JSON.error)
        }
    },

    Validacoes: {

    },

    JSON: {
        pegarJSON(e){
            return e.json()
        },

        newPage(e){
            productsUl = document.querySelector('#products-list')
            e.products.forEach(el => {
                productsUl.innerHTML += Main.UsefulMethods.mkProduct(el)
            });
            Main.page = `https://${e.nextPage}`
            // Pra ser sinceso, acho que nesse caso era pra eu usar main sim, pois se eu tiver com outro objeto, eu vou chamar o nome desse outro objeto, então aqui o que
            // faz sentido é eu chamar o nome do próprio objeto
        },

        error(){
            products = document.querySelector('.list-products')
            products.innerHTML = '<h2> Ocorreu um erro, atualize a página ou tente novamente mais tarde </h2>'
        }
    },

    UsefulMethods:{
        mkProduct(el){
            return `
            <li class="item">
                    <div class="img">
                        <img src="${el.image}" alt="">
                    </div>
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
                </li> 
            `
        },
    },

    execFetch(fetchLink, firstThen, secondThen, Error){
        fetch(fetchLink)
            .then(firstThen)
            .then(secondThen)
            .catch(Error)
    }
}

Main.init()

