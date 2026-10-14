const pokemonInput = document.getElementById("pokemonInput");
const searchButton = document.getElementById("searchButton");

const message = document.getElementById("message");
const pokemonCard = document.getElementById("pokemonCard");

const pokemonName = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonType = document.getElementById("pokemonType");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonStats = document.getElementById("pokemonStats");


// Load all Pokémon into the dropdown
async function loadPokemonList() {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=2000"
        );

        const data = await response.json();

        pokemonInput.innerHTML = '<option value="">Select a Pokémon...</option>';

        data.results.forEach(pokemon => {
            const option = document.createElement("option");

            option.value = pokemon.name;
            option.textContent = capitalize(pokemon.name);

            pokemonInput.appendChild(option);
        });

    } catch (error) {
        console.error(error);
        pokemonInput.innerHTML =
            '<option value="">Could not load Pokémon</option>';
    }
}


// Get selected Pokémon
async function getPokemon() {

    const name = pokemonInput.value;

    if (!name) {
        message.textContent = "Please select a Pokémon.";
        pokemonCard.classList.add("hidden");
        return;
    }

    message.textContent = "Loading...";
    pokemonCard.classList.add("hidden");

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const pokemon = await response.json();

        displayPokemon(pokemon);

        message.textContent = "";

    } catch (error) {
        console.error(error);

        message.textContent = "Could not find that Pokémon.";
        pokemonCard.classList.add("hidden");
    }
}


// Display Pokémon information
function displayPokemon(pokemon) {

    pokemonName.textContent = capitalize(pokemon.name);

    pokemonImage.src =
        pokemon.sprites.other["official-artwork"].front_default;

    pokemonImage.alt = capitalize(pokemon.name);

    pokemonType.textContent = pokemon.types
        .map(type => capitalize(type.type.name))
        .join(", ");

    pokemonHeight.textContent =
        `${pokemon.height / 10} m`;

    pokemonWeight.textContent =
        `${pokemon.weight / 10} kg`;


    pokemonStats.innerHTML = "";

    pokemon.stats.forEach(stat => {

        const statElement = document.createElement("p");

        statElement.innerHTML = `
            <strong>${formatStatName(stat.stat.name)}:</strong>
            ${stat.base_stat}
        `;

        pokemonStats.appendChild(statElement);
    });

    pokemonCard.classList.remove("hidden");
}


// Capitalize Pokémon names
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}


// Make stat names look nicer
function formatStatName(name) {

    const names = {
        hp: "HP",
        attack: "Attack",
        defense: "Defense",
        "special-attack": "Special Attack",
        "special-defense": "Special Defense",
        speed: "Speed"
    };

    return names[name] || capitalize(name);
}


// Events
searchButton.addEventListener("click", getPokemon);


// Also search when selecting a Pokémon
pokemonInput.addEventListener("change", getPokemon);


// Load Pokémon when page starts
loadPokemonList();