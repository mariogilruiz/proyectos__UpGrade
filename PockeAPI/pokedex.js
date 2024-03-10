const list$$ = document.querySelector('#pokedex')
const bttn$$ = document.querySelectorAll('.b-bttn--type');
//console.log(list$$)

const urlBase = 'https://pokeapi.co/api/v2/pokemon?limit=150';

//const urlbasse = 'https://pokeapi.co/api/v2/pokemon';

 const cargarDatos= async (endpoint)=> {

   const arrayPokemons = []; 
   
    const response = await fetch(endpoint, { method: 'GET' });
    const data = await response.json();

    for (const element of data.results) {
        const response = await fetch(element.url, { method: 'GET' })
        const pokemon = await response.json()
        arrayPokemons.push(pokemon)
        //console.log(pokemon)
    }
    
    return arrayPokemons
}

const pintarPokemons =(arraryNomap, elementDom) =>{
    list$$.innerHTML=''
    for (const element of arraryNomap) {
        
        //-------creamos

        const li = document.createElement('li');
        const figure = document.createElement('figure');
        const div = document.createElement('div');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        const h2 = document.createElement('h2');
        const h3__tipo = document.createElement('h3');
        const h3__number = document.createElement('h3');
    
        //-------- añadimos
    
        li.appendChild(figure);
        figure.appendChild(div);
        figure.appendChild(figcaption);
        figure.appendChild(h3__tipo);
        figure.appendChild(h3__number);
        div.appendChild(img);
        figcaption.appendChild(h2);

        //------añadimos contenido
    
        h2.textContent = element.name;
        img.src = element.sprites.other.dream_world.front_default;
        h3__tipo.textContent = element.types[0].type.name;
        h3__number.textContent = `#${element.id}`;

        //-------añadimos clases

        figure.classList.add('figure');
        div.classList.add('figure__div');
        img.classList.add('figure__div__img');
        figcaption.classList.add('figure__figcaption');
        h2.classList.add('figure__h2')
        h3__tipo.classList.add('figure__h3')
        h3__number.classList.add('figure__h3--number')
        //----pintamos en html
        elementDom.appendChild(li);
    }
}

const mostrarTipos = (arrayFiltar) => {
    console.log(arrayFiltar);

        for (let bttn of bttn$$) {
            //console.log(bttn)
            bttn.addEventListener('click', () => {
                const bbtnValue = bttn.value;
                const arrayTipos = arrayFiltar.filter((element) => element.types[0].type.name === bbtnValue);
                pintarPokemons(arrayTipos, list$$);
                console.log(arrayTipos); 
            
            });
        } 

    }

const init = async() => {

    const cargarDAtos = await cargarDatos(urlBase); //todo el arrary
    pintarPokemons(cargarDAtos, list$$);
    mostrarTipos(cargarDAtos);
    
}

init()


