import items from "../data/items.mjs";

const itemContainer = document.querySelector('#items-cards');

function displayCards() {
    items.forEach((item) => {
        const section = document.createElement('section');
        const h2 = document.createElement('h2');

        const figure = document.createElement('figure');
        const img = document.createElement('img');

        const address = document.createElement('address');
        const description = document.createElement('p');
        const button = document.createElement('button');

        h2.textContent = item.name;

        img.src = item.image;
        img.alt = item.name;
        img.loading = "lazy";
        img.width = 300;
        img.height = 200;
        figure.appendChild(img);

        address.textContent = item.address;
        description.textContent = item.description;
        button.textContent = `Learn More!`;

        section.appendChild(h2);
        section.appendChild(figure);
        section.appendChild(address);
        section.appendChild(description);
        section.appendChild(button);

        itemContainer.appendChild(section);
    })
}

displayCards();

const message = document.querySelector('#visitMessage');
const today = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (lastVisit == null) {
    message.textContent = `Welcome! Let us know if you have any questions.`;
}
else {
    const difference = today - Number(lastVisit);
    const daysBetween = difference / (1000 * 60 * 60 * 24);
    const days = Math.floor(daysBetween);

    if (daysBetween < 1) {
        message.textContent = `Back so soon! Awesome!`;
    }
    else {
        if (days == 1) {
            message.textContent = `You last visited ${days} day ago.`;
        }
        else {
            message.textContent = `You last visited ${days} days ago.`;
        }
    }
}
localStorage.setItem("lastVisit", today);

