class Dado {

    static TirarDado(){
        const numeros = [1,2,3,4,4,5,5,6,6];
        const numero = Math.round(Math.random() * 8);
        return numeros[numero];
    }
}

module.exports = Dado;