const list$$ = document.querySelector('#pokedex')
const urlBase = 'https://pokeapi.co/api/v2/pokemon?limit=150';

async function cargarDatos(endpoint) {
    const response = await fetch(endpoint, { method: 'GET' });
    const data = await response.json();
    arraySinMapear(data.results)
}



function arraySinMapear(arrayNomap) {

    const pokemon = arrayNomap.map(async (element) => {
        //console.log(element)
        const response = await fetch(element.url, { method: 'GET' })
        const pokemon = await response.json()
        pintarPokemons(pokemon,list$$)
    }
    );
}

function pintarPokemons(arraryNomap,elementDom) {
    console.log(arraryNomap)

    //-------creamos
    
    const li = document.createElement('li');
    const figure = document.createElement('figure');
    const div = document.createElement('div');
    const img = document.createElement('img'); 
    const figcaption = document.createElement('figcaption'); 
    const h2 = document.createElement('h2');
    const h3__tipo = document.createElement('h3');
    //const h3__specie = document.createElement('h3');
    
    //-------- añadimos
    
    li.appendChild(figure);
    figure.appendChild(div);
    figure.appendChild(figcaption);
    figure.appendChild(h3__tipo);
   //figure.appendChild(h3__specie);
    div.appendChild(img);
    figcaption.appendChild(h2);

    //------añadimos contenido
    
    h2.textContent = arraryNomap.name;
    img.src = arraryNomap.sprites.other.dream_world.front_default;
    h3__tipo.textContent = arraryNomap.types[0].type.name;
    //h3__specie.textContent= arraryNomap.forms[0].name

    //-------añadimos clases

    figure.classList.add('figure');
    div.classList.add('figure__div');
    img.classList.add('figure__div__img');
    figcaption.classList.add('figure__figcaption');
    h2.classList.add('figure__h2')
    h3__tipo.classList.add('figure__h3')
    //----pintamos en html
    elementDom.appendChild(li);

}

const init = () => {
    
    const cargarDAtos = cargarDatos(urlBase);


}

init()


