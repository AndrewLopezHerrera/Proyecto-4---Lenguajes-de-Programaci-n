class Dado {
    constructor(){
        this.Numeros = [1,2,3,4,4,5,5,6,6];
    }

    TirarDado(){
        const numero = Math.random() * 9;
        return this.Numeros[numero];
    }
}

module.exports = Dado;