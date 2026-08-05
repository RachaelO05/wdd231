const gamesURL = "https://rachaelo05.github.io/wdd231/finalproject/data/games.json";

const libraryContainer = document.querySelector("#library");
const featureContainer = document.querySelector("#featured");

async function getGamesData() {
    try {
        const response = await fetch(gamesURL);

        if (!response.ok) {
            throw new Error("Could not load games.")
        }

        const data = await response.json();

        if (libraryContainer) {
            displayGames(data.games, libraryContainer);
        }
        if (featureContainer) {
            displayFeatures(data.games, featureContainer);
        }

        
    }
    catch (error) {
        console.error(error);
    }
}

if (libraryContainer) {
    libraryContainer.classList.add('grid');
}

if (featureContainer) {
    featureContainer.classList.add('grid');
}

const displayGames = (games, div) => {
    games.forEach((game) => {
        const section = document.createElement("section");

        let picture = document.createElement('img');
        let title = document.createElement('h3');
        let rating = document.createElement('p');

        picture.setAttribute('src', game.image);
        picture.setAttribute('alt', `${game.title} image`);
        picture.setAttribute('width', 200);
        picture.setAttribute('height', 300);
        picture.setAttribute('loading', 'lazy');

        title.textContent = `${game.title}`;

        if (game.rating >= 4.8) {
            rating.innerHTML = `Rating: <strong>★★★★★</strong> (${game.rating})`;
        }
        else if (game.rating >= 4.4){
            rating.innerHTML = `Rating: <strong>★★★★⯨</strong> (${game.rating})`;
        }
        else if (game.rating >= 3.8) {
            rating.innerHTML = `Rating: <strong>★★★★</strong> (${game.rating})`;
        }
        else if (game.rating >= 3.4) {
            rating.innerHTML = `Rating: <strong>★★★⯨</strong> (${game.rating})`;
        }
        else if (game.rating >= 2.8) {
            rating.innerHTML = `Rating: <strong>★★★</strong> (${game.rating})`;
        }

        section.appendChild(picture);
        section.appendChild(title);
        section.appendChild(rating);

        div.appendChild(section);
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

getGamesData();