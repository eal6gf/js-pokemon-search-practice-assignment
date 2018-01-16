//data is a global here
// class App {
//   static init(){
//
//   }
// }
let id = 0
let pokemonStorage = {}
class Pokemon {
  constructor(name,frontImage, backImage){
    this.id = id++
    this.name = name
    this.frontImage = frontImage
    this.backImage = backImage
    if (pokemonStorage[name]) {
      // nothing
    } else {
        pokemonStorage[name]= this
    }
  }
  render(){
    let allPokemon = document.getElementById('pokemon-container')
    let newElement = document.createElement('div')
    newElement.className = 'pokemon-container'
    newElement.innerHTML = `<div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class="center-text">${this.name}</h1>
          <div style="width:239px;margin:auto">
            <div style="width:96px;margin:auto">
              <img class = '${this.name}' data-pokename= "${this.name}" src="${this.frontImage}">
            </div>
          </div>
          <p style="padding:10px;" class="center-text flip-image" data-pokename="${this.name}" data-pokeid = "${this.id}" data-action="flip-image">flip card</p>
          </div>`
          allPokemon.appendChild(newElement)
  }

}
function handleImageChange(event){
  debugger
  let targetClass = event.target.getAttribute('data-pokename') // pokemon's name
  let indivPokemon = pokemonStorage[targetClass]
  let changeImage = document.querySelector(`img[data-pokename=${targetClass}]`)
  if (changeImage.getAttribute('src') === indivPokemon.frontImage) {
    changeImage.setAttribute('src',indivPokemon.backImage)
  } else {
    changeImage.setAttribute('src', indivPokemon.frontImage)
  }

}
function handleFlip() {
  //select element, show src
  let flipCards = document.querySelectorAll('.flip-image')
  for (let card of flipCards) {
    card.addEventListener('click', handleImageChange)
  }
}

function handleSearch(event){
// clear current pokemon.
  let allPokemon = document.getElementById('pokemon-container')
  allPokemon.innerHTML = ""
  pokemonStorage = {}

  if (event.target.value === "") {
    return ''
  }
   let selectedPokemon = data['pokemons'].filter(function(a){
     return a.name.includes(event.target.value)
   })
  for (let pk of selectedPokemon) {
    let tempPokemon = new Pokemon(pk.name, pk.sprites.front, pk.sprites.back)
    tempPokemon.render()
  }
  handleFlip()
}


document.addEventListener("DOMContentLoaded", function() {
  let searchBar = document.getElementById('pokemon-search-input')
  searchBar.addEventListener('keyup', handleSearch)

})
