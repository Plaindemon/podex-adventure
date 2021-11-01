const poke_container = document.getElementById('poke_container');

const pokemon_number = 150;
// 
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);
console.log(main_types);

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_number; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    //fetch the url, res = result
    const res = await fetch(url);
    // get the pokemon from res or result then log it to console
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}



function createPokemonCard(pokemon){
    // pokemonEl creates a div in th html
  const pokemonEl = document.createElement('div');
  // adds the classList to the pokemonEl
  pokemonEl.classList.add('pokemon');
  const poke_types = pokemon.types.map(el => el.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1 );
    // loads the pokemon names up to 150 with the first letter uppercase
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];
    // pulls from the fetch request to get the name of the pokemon 
    // adds the image from the sprites object and then uses the pokemon.id to find each pokemon image based of its Id 
    pokemonEl.style.backgroundColor = color;
  const pokeInnerHTML = `
  <div class="img-container">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}" />
  </div>
    <div class="info">
    <span class="number">#${pokemon.id
    .toString()
    .padStart(3, '0')}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
    

    </div>
  `;

  pokemonEl.innerHTML = pokeInnerHTML;
// adds the pokemon element to the poke_container div class 
  poke_container.appendChild(pokemonEl);
  
  
}
fetchPokemons();
// getPokemon(1);