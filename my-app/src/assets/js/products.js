// js/products.js
// ⚠️ Fuente única de productos para toda la app

// Cargar desde localStorage o usar datos por defecto
let PRODUCTS = JSON.parse(localStorage.getItem("productsData")) || [
    {id:'FR001', name:'Manzanas Fuji', category:'Frutas', price:1200, unit:'kilo', stock:150, origin:'Valle del Maule', img:'img/manzana.webp'},
    {id:'FR002', name:'Naranjas Valencia', category:'Frutas', price:1000, unit:'kilo', stock:200, origin:'Región del Maule', img:'img/naranjas.webp'},
    {id:'VR001', name:'Zanahorias Orgánicas', category:'Verduras', price:900, unit:'kilo', stock:100, origin:"O'Higgins", img:'img/zanahoria.webp'},
    {id:'VR002', name:'Lechuga', category:'Verduras', price:5000, unit:'kilo', stock:50, origin:'Local', img:'img/lechuga.webp'},
    {id:'FR003', name:'Plátano', category:'Frutas', price:4600, unit:'kilo', stock:75, origin:'Local', img:'img/platano.webp'},
    {id:'NL001', name:'Tierra', category:'Orgánico', price:1300, unit:'kilo', stock:100, origin:'Local', img:'img/tierra.webp'},
    {id:'NL002', name:'Tierra de Hojas', category:'Orgánico', price:2200, unit:'kilo', stock:50, origin:'Local', img:'img/tierrahoja.webp'}
];

// Funciones auxiliares compartidas
function saveLS(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

function loadLS(key, def){
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : def;
}

function getCart(){
    return loadLS('cart', []);
}

// Guardar productos cuando cambien
function saveProducts() {
    saveLS("productsData", PRODUCTS);
}

// Recargar productos desde localStorage
function reloadProducts() {
    PRODUCTS = loadLS("productsData", PRODUCTS);
}
