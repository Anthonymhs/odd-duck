'use strict';

const nombreProductos = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

const state = {
    totalProduct: [],
};

function Products(nombre, path) {
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
    rondas: 10,
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
        let indicesUnicos = new Set();
        while (indicesUnicos.size < 3) {
            indicesUnicos.add(this.getRandomIndex());
        }
        let indices = Array.from(indicesUnicos);

        this.objIzq = state.totalProduct[indices[0]];
        this.objCent = state.totalProduct[indices[1]];
        this.objDer = state.totalProduct[indices[2]];

        this.objIzq.views += 1;
        this.objCent.views += 1;
        this.objDer.views += 1;

        this.elemIzq.src = this.objIzq.path;
        this.elemIzq.id = this.objIzq.nombre;

        this.elemCent.src = this.objCent.path;
        this.elemCent.id = this.objCent.nombre;

        this.elemDer.src = this.objDer.path;
        this.elemDer.id = this.objDer.nombre;
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
            const info = state.totalProduct[i].nombre + ' tiene ' + state.totalProduct[i].contador + ' votos y ' + state.totalProduct[i].views + ' vistas';
            primerLi.textContent = info;
            lista.appendChild(primerLi);
        }
        const segundoLi = document.createElement('li');
        segundoLi.textContent = 'Total de clics: ' + this.totalClick;
        lista.appendChild(segundoLi);
        this.elemResultado.appendChild(lista);
        this.mostrarChart();
    },

    mostrarChart: function () {
        const ctx = document.getElementById('myChart');

        const mostrarViews = [];
        const mostrarClicks = [];

        for (let i = 0; i < state.totalProduct.length; i++) {
            mostrarViews.push(state.totalProduct[i].views);
            mostrarClicks.push(state.totalProduct[i].contador);
        }

        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nombreProductos,
                datasets: [{
                    label: 'Views',
                    data: mostrarViews,
                    borderWidth: 1
                },
                {
                    label: 'Clicks',
                    data: mostrarClicks,
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },

    buttonMostrar: function () {
        this.buttonResultados.hidden = false;
        this.buttonResultados.addEventListener('click', () => {
            this.buttonReset.hidden = false;
            this.buttonResultados.hidden = true;
            this.mostrarResultados();

            this.buttonReset.addEventListener('click', () => {
                this.buttonReset.hidden = true;
                location.reload();
            });
        });
    },

    onClick: function (event) {
        if (event.target.id === this.objIzq.nombre || event.target.id === this.objCent.nombre || event.target.id === this.objDer.nombre) {
            this.cuentaClicks(event.target.id);

            if (this.totalClick % this.rondas === 0) {
                this.elemsImage.removeEventListener('click', this.onClick.bind(this));
                this.buttonMostrar();
            }
            this.mostrarImagenes();
        } else {
            alert("Haz clic en la imagen");
        }
    }
};

productosElegidos.elemsImage.addEventListener('click', productosElegidos.onClick.bind(productosElegidos));
productosElegidos.mostrarImagenes();