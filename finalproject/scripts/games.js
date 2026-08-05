const gamesURL = "https://rachaelo05.github.io/wdd231/finalproject/data/games.json";

async function getGamesData() {
    try {
        const response = await fetch(gamesURL);

        if (!response.ok) {
            throw new Error("Could not load games.")
        }

        const games = await response.json();

        displayGames(games);
    }
    catch (error) {
        console.error(error);
    }
}

const libraryContainer = document.querySelector("#library");

const displayGames = (games) => {
    games.forEach((game) => {
        const section = document.createElement("section");

        let picture = document.createElement('img');
        let title = document.createElement('h2');
        let rating = document.createElement('p');

        picture.setAttribute('src', game.image);
        picture.setAttribute('alt', `${game.title} image`);
        picture.setAttribute('width', 200);
        picture.setAttribute('height', 300);
        picture.setAttribute('loading', 'lazy');

        title.textContent = `${game.title}`;
        rating.innerHTML = `Rating: <strong>${game.rating}</strong>`;

        section.appendChild(picture);
        section.appendChild(title);
        section.appendChild(rating);

        libraryContainer.appendChild(section);
    });
}

getGamesData();