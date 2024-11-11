document.getElementById('searchButton').addEventListener('click', fetchPokemon);
document.getElementById('pokemonSearch').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') fetchPokemon();
});

function fetchPokemon() {
  const pokemonInput = document.getElementById('pokemonSearch').value.toLowerCase();
  const errorMessage = document.getElementById('errorMessage');
  const pokemonInfo = document.getElementById('pokemonInfo');
  const pokemonName = document.getElementById('pokemonName');
  const pokemonImage = document.getElementById('pokemonImage');
  const pokemonHeight = document.getElementById('pokemonHeight');
  const pokemonWeight = document.getElementById('pokemonWeight');
  const pokemonTypes = document.getElementById('pokemonTypes');

  // Clear previous results
  pokemonInfo.style.display = 'none';
  errorMessage.style.display = 'none';
  errorMessage.textContent = '';

  if (!pokemonInput) return;

  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Hide error message if Pokémon found
      pokemonInfo.style.display = 'block';

      pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      pokemonImage.src = data.sprites.front_default;
      pokemonHeight.textContent = data.height / 10 + ' m';
      pokemonWeight.textContent = data.weight / 10 + ' kg';
      pokemonTypes.textContent = data.types.map(type => type.type.name).join(', ');

    })
    .catch(error => {
      // Show error message if Pokémon not found
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Pokémon not found! Try again.';
    });
}
