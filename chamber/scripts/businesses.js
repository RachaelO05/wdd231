const membersURL = "https://rachaelo05.github.io/wdd231/chamber/data/members.json";
const cards = document.querySelector('#cards');
const spotlight = document.querySelector('#spotlights');

const gridbtn = document.querySelector('#grid-btn');
const listbtn = document.querySelector('#list-btn');

async function getBusinessData() {
    const response = await fetch(membersURL);
    const data = await response.json();

    if (cards) {
        displayBusinesses(data.members, cards);
    }

    if (spotlight) {
        displaySpotlights(data.members, spotlight);
    }
};

if (cards) {
    cards.classList.add('grid');
}

if (spotlight) {
    spotlight.classList.add('grid');
}

const displayBusinesses = (businesses, section) => {
    businesses.forEach((business) => {
        let card = document.createElement('section');

        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let websiteURL = document.createElement('p');
        let image = document.createElement('img');
        let membershipLevel = document.createElement('p');

        name.textContent = `${business.name}`;

        image.setAttribute('src', business.image);
        image.setAttribute('alt', `${business.name} image`);
        image.setAttribute('width', 200);
        image.setAttribute('height', 200);
        image.setAttribute('loading', 'lazy');
        
        address.innerHTML = `<span class="label"><strong>Address:</strong></span> ${business.address}`;
        phoneNumber.innerHTML = `<span class="label"><strong>Phone Number:</strong></span> ${business.phonenumber}`;
        websiteURL.innerHTML = `<span class="label"><strong>Website:</strong></span> ${business.websiteurl}`;
        membershipLevel.innerHTML = `<span class="label"><strong>Membership Level:</strong></span> ${business.membershiplevel}`;

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(websiteURL);
        card.appendChild(membershipLevel);

        section.appendChild(card);
    });
};

if (gridbtn && listbtn) {
    gridbtn.addEventListener('click', () => {
        cards.classList.add('grid');
        cards.classList.remove('list');
    });

    listbtn.addEventListener('click', () => {
        cards.classList.add('list');
        cards.classList.remove('grid');
    });
}

const displaySpotlights = (businesses, section) => {
    const spotlightFilter = businesses.filter(
        business => business.membershiplevel === 2 || business.membershiplevel === 3
    );

    spotlightFilter.sort(() => Math.random() - 0.5);

    const selectedBusinneses = spotlightFilter.slice(0, 3);
    displayBusinesses(selectedBusinneses, section);
};

getBusinessData();

const npBtn = document.querySelector("#npBtn");
const bronzeBtn = document.querySelector('#bronzeBtn');
const silverBtn = document.querySelector('#silverBtn');
const goldBtn = document.querySelector('#goldBtn');

const closeBtn = document.querySelectorAll('.closeModal');

const npModal = document.querySelector('#np-info');
const bronzeModal = document.querySelector('#bronze-info');
const silverModal = document.querySelector('#silver-info');
const goldModal = document.querySelector('#gold-info');

npBtn.addEventListener('click', () => {
    npModal.showModal();
});

bronzeBtn.addEventListener('click', () => {
    bronzeModal.showModal();
});

silverBtn.addEventListener('click', () => {
    silverModal.showModal();
});

goldBtn.addEventListener('click', () => {
    goldModal.showModal();
});

closeBtn.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

