'use strict';

const nombreProductos = ['boots','bathroom','breakfast','bubblegum','chair','dog-duck','tauntaun','scissors','water-can','wine-glass','bag','banana','cthulhu','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];

const state = {
    totalProduct: [],
};

function Products(nombre, path){
    this.nombre = nombre;
    this.path = path;
    this.contador = 0;
    this.views = 0;
}

(function crearAlbum() {
    for (let i = 0; i < nombreProductos.length; i++) {
        let producto = new Products(nombreProductos[i], 'img/' + nombreProductos[i] + '.jpg');
        state.totalProduct.push(producto);
    }
})();

const productosElegidos = {
    totalClick: 0,
    rondas: 25,
    objIzq: null,
    objCent: null,
    objDer: null,

    elemIzq: document.getElementById('img1'),
    elemCent: document.getElementById('img2'),
    elemDer: document.getElementById('img3'),
    elemsImage: document.getElementById('images'),
    elemResultado: document.getElementById('resultados'),
    buttonResultados: document.getElementById('mostrarResultados'),
    buttonReset: document.getElementById('reset'),

    getRandomIndex: function () {
        return Math.floor(Math.random() * nombreProductos.length);
    },

    mostrarImagenes: function () {
        productosElegidos.objIzq = state.totalProduct[productosElegidos.getRandomIndex()];
        productosElegidos.objCent = state.totalProduct[productosElegidos.getRandomIndex()];
        productosElegidos.objDer = state.totalProduct[productosElegidos.getRandomIndex()];

        if (productosElegidos.objIzq === productosElegidos.objCent || productosElegidos.objIzq === productosElegidos.objDer || productosElegidos.objCent === productosElegidos.objDer) {
            productosElegidos.mostrarImagenes();
            // return;
        }

        productosElegidos.objIzq.views += 1;
        productosElegidos.objCent.views += 1;
        productosElegidos.objDer.views += 1;

        productosElegidos.elemIzq.src = productosElegidos.objIzq.path;
        productosElegidos.elemIzq.id = productosElegidos.objIzq.nombre;

        productosElegidos.elemCent.src = productosElegidos.objCent.path;
        productosElegidos.elemCent.id = productosElegidos.objCent.nombre;

        productosElegidos.elemDer.src = productosElegidos.objDer.path;
        productosElegidos.elemDer.id = productosElegidos.objDer.nombre;
    },

    cuentaClicks: function (losIds) {
        for (let i = 0; i < state.totalProduct.length; i++) {
            if (state.totalProduct[i].nombre === losIds) {
                state.totalProduct[i].contador += 1;
                this.totalClick += 1;
            }
        }
    },

    mostrarResultados: function () {
        const lista = document.createElement('ul');
        for (let i = 0; i < state.totalProduct.length; i++) {
            const primerLi = document.createElement('li');
            const info = state.totalProduct[i].nombre + ' tiene ' + state.totalProduct[i].contador + ' votos';
            primerLi.textContent = info;
            lista.appendChild(primerLi);
        }
        const segundoLi = document.createElement('li');
        segundoLi.textContent = 'Total de clicks: ' + this.totalClick;
        lista.appendChild(segundoLi);
        this.elemResultado.appendChild(lista);
    },
    buttonMostrar: function () {
        this.buttonResultados.hidden = false;
        this.buttonResultados.addEventListener('click', function () {
            productosElegidos.buttonReset.hidden = false;
            productosElegidos.buttonResultados.hidden = true;
            productosElegidos.mostrarResultados();

            productosElegidos.buttonReset.addEventListener('click', function () {
                productosElegidos.buttonReset.hidden = true;
                location.reload();
            });
        });
    },

    onClick: function (event) {
        if (event.target.id === productosElegidos.objIzq.nombre || event.target.id === productosElegidos.objCent.nombre || event.target.id === productosElegidos.objDer.nombre) {
            productosElegidos.cuentaClicks(event.target.id);

            if (productosElegidos.totalClick % productosElegidos.rondas === 0) {
                productosElegidos.elemsImage.removeEventListener('click', productosElegidos.onClick);
                productosElegidos.buttonMostrar();
            }
            productosElegidos.mostrarImagenes();
        }else {
            alert ("haz click en la imagen");
        }
    }
};

productosElegidos.elemsImage.addEventListener('click',productosElegidos.onClick);
productosElegidos.mostrarImagenes();
