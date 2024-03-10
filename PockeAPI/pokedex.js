const list$$ = document.querySelector('#pokedex')
const bttn$$ = document.querySelectorAll('.b-bttn--type');

const urlBase = 'https://pokeapi.co/api/v2/pokemon';

const cargarDatos= async (endpoint)=> {

    const arrayPokemons = []
    
    for (let i = 1; i <= 150; i++){
    
        const urlsObjetos = `${endpoint}/${[i]}`;
        const response = await fetch(urlsObjetos, { method: 'GET' });
        const data = await response.json();
        arrayPokemons.push(data)
       
    }
     
    console.log(arrayPokemons)
    
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
   // console.log(arrayFiltar);

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
const reload = () => {

    location.reload();

}

const init = async () => {
    
    const cargarDAtos = await cargarDatos(urlBase); //todo el arrary
    pintarPokemons(cargarDAtos, list$$);
    mostrarTipos(cargarDAtos);
    
}

setTimeout(() => {
   init() 
},1000)



