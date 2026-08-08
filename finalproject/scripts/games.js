const gamesURL = "https://rachaelo05.github.io/wdd231/finalproject/data/games.json";

const libraryContainer = document.querySelector("#library");
const featureContainer = document.querySelector("#featured");
const modalContainer = document.querySelector('#gameModal');

let allGames = [];

async function getGamesData() {
    try {
        const response = await fetch(gamesURL);

        if (!response.ok) {
            throw new Error("Could not load games.")
        }

        const data = await response.json();

        allGames = data.games;

        if (libraryContainer) {
            displayGames(allGames, libraryContainer);
        }
        if (featureContainer) {
            displayFeatures(allGames, featureContainer);
        }

        displayFavorites();
        
    }
    catch (error) {
        console.error(error);
    }
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const displayGames = (games, div) => { 
    games.forEach((game) => {
        const section = document.createElement("section");

        let picture = document.createElement('img');
        let title = document.createElement('h3');
        let rating = document.createElement('p');
        let favBtn = document.createElement('button');

        picture.setAttribute('src', game.image);
        picture.setAttribute('alt', `${game.title} image`);
        picture.setAttribute('width', 200);
        picture.setAttribute('height', 300);
        picture.setAttribute('loading', 'lazy');

        title.textContent = `${game.title}`;

        if (game.rating >= 4.8) {
            rating.innerHTML = `Rating: <strong>★★★★★</strong> <span class="numeric-rating">(${game.rating})</span>`;
        }
        else if (game.rating >= 4.4){
            rating.innerHTML = `Rating: <strong>★★★★⯨</strong> <span class="numeric-rating">(${game.rating})</span>`;
        }
        else if (game.rating >= 3.8) {
            rating.innerHTML = `Rating: <strong>★★★★</strong> <span class="numeric-rating">(${game.rating})</span>`;
        }
        else if (game.rating >= 3.4) {
            rating.innerHTML = `Rating: <strong>★★★⯨</strong> <span class="numeric-rating">(${game.rating})</span>`;
        }
        else if (game.rating >= 2.8) {
            rating.innerHTML = `Rating: <strong>★★★</strong> <span class="numeric-rating">(${game.rating})</span>`;
        }

        favBtn.textContent = `❤︎`;
        const savedFavorite = favorites.find(fav => fav.id === game.id);

        if (savedFavorite) {
            favBtn.classList.add(savedFavorite.class);
        } else {
            favBtn.classList.add('fav-btn');
        }

        section.appendChild(picture);
        section.appendChild(title);
        section.appendChild(rating);
        section.appendChild(favBtn);

        div.appendChild(section);


        section.addEventListener("click", () => {
            openModal(game);
        });

        favBtn.addEventListener('click', (event) => {
            event.stopPropagation();

            addFavorite(game.id, favBtn);
        });
    });
}

const displayFeatures = (games, div) => {
    const featureFilter = games.filter(
        game => game.rating > 4.8
    );

    featureFilter.sort(() => Math.random() - 0.5);

    const selectedGames = featureFilter.slice(0, 4);
    displayGames(selectedGames, div);
}

const displayFavorites = () => {
    const favoriteContainer = document.querySelector("#favorites");

    if (!favoriteContainer) return;

    const favoriteGames = allGames.filter(game =>
        favorites.some(fav => fav.id === game.id)
    );

    favoriteContainer.innerHTML = "";

    displayGames(favoriteGames, favoriteContainer);
};

const openModal = (game) => {
    modalContainer.innerHTML = `
        <div>
            <button id="closeModal">✕</button>

            <img src="${game.image}" alt="${game.title}" width="250">

            <h2>${game.title}</h2>
        </div>

        <div>
            <p><strong>Genres:</strong> ${game.genre.join(", ")}</p>

            <p><strong>Platforms:</strong> ${game.platforms.join(", ")}</p> 

            <p><strong>Released:</strong> ${game.releaseYear}</p>

            <p><strong>Rating:</strong> ${game.rating}</p>

            <p><strong>Developer:</strong> ${game.developer}</p>

            <p><strong>Multiplayer:</strong> ${game.multiplayer ? "Yes" : "No"}</p>

            <p><strong>Play Time:</strong> ${game.playTime}</p>

            <p><strong>Art Style:</strong> ${game.artStyle}</p>

            <p><strong>Price Range:</strong> ${game.priceRange}</p>
        </div>

        <div>
            <p>${game.description}</p>

            <p><strong>Store:</strong> <a href="${game.storeLink}">${game.storeLink}</a></p>
        </div>
    `;

    modalContainer.showModal();

    modalContainer.querySelector("#closeModal").addEventListener("click", () => {
        modalContainer.close();
    });

    const closeButton = modalContainer.querySelector("#closeModal");

    console.log(closeButton);
}

const addFavorite = (gameId, btn) => {

    if (favorites.some(fav => fav.id === gameId)) {

        favorites = favorites.filter(fav => fav.id !== gameId);

        btn.classList.add('fav-btn');
        btn.classList.remove('added-fav');

    } else {

        favorites.push({
            id: gameId,
            class: "added-fav"
        });

        btn.classList.add('added-fav');
        btn.classList.remove('fav-btn');
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
};

const genreFilter = document.querySelector("#genre");
const platformFilter = document.querySelector("#platforms");
const multiplayerFilter = document.querySelector("#multiplayer");
const priceFilter = document.querySelector("#priceRange");
const ratingFilter = document.querySelector("#rating");

const filterGames = () => {
    let filteredGames = allGames;

    if (genreFilter.value !== "") {
        filteredGames = filteredGames.filter(game =>
            game.genre.includes(genreFilter.value)
        );
    }

    if (platformFilter.value !== "") {
        filteredGames = filteredGames.filter(game =>
            game.platforms.includes(platformFilter.value)
        );
    }

    if (multiplayerFilter.value !== "") {
        filteredGames = filteredGames.filter(game =>
            game.multiplayer.toString() === multiplayerFilter.value
        );
    }

    if (priceFilter.value !== "") {
        filteredGames = filteredGames.filter(game =>
            game.priceRange === priceFilter.value
        );
    }

    if (ratingFilter.value === "ascending") {
        filteredGames.sort((a, b) => a.rating - b.rating);
    }
    else if (ratingFilter.value === "descending") {
        filteredGames.sort((a, b) => b.rating - a.rating);
    }

    libraryContainer.innerHTML = "";

    displayGames(filteredGames, libraryContainer);
}

if (genreFilter) {
    genreFilter.addEventListener("change", filterGames);
    platformFilter.addEventListener("change", filterGames);
    multiplayerFilter.addEventListener("change", filterGames);
    priceFilter.addEventListener("change", filterGames);
    ratingFilter.addEventListener("change", filterGames);
}



getGamesData();