/* 
    05.484.450-52 070.987.720-03
    
    Sempre verificar se meus métodos podem ou não se tornar estáticos, para saber disso, só
    preciso ver se esse método usa alguma propriedade ou não do objeto, se ele não possuir
    nenhum this, eu posso transformálo em um método estático 

*/

class ValidaCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, ''),
        })
    }

    Sequencia(){
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    }

    geraNovoCpf(){
        const cpfParcial = this.cpfLimpo.slice(0, -2)

        const digito1 = ValidaCPF.geraDigito(cpfParcial)
        const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1)
        this.novoCPF = cpfParcial + digito1 + digito2
    }

    static geraDigito(cpfParcial){
        let total = 0
        let reverse = cpfParcial.length + 1

        for(let stringNum of cpfParcial){
            total += reverse * Number(stringNum)
            reverse--
        }

        const digito = 11 - (total % 11)
        return digito <= 9 ? String(digito) : '0'
    }

    valida(){
        if(!this.cpfLimpo) return false
        if(typeof this.cpfLimpo !== 'string') return false
        if(this.cpfLimpo.length !== 11) return false
        if(this.Sequencia()) return false
        this.geraNovoCpf()

        return this.novoCPF === this.cpfLimpo
    }
}
// const validaCPF = new ValidaCPF('070.987.720-03')

// if(validaCPF.valida()){
//     console.log('CPF Válido');
// } else {
//     console.log('CPF Inválido');
// }