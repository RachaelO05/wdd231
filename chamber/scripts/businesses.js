const url = "https://rachaelo05.github.io/wdd231/chamber/data/members.json";
const cards = document.querySelector('#cards');

const gridbtn = document.querySelector('#grid-btn');
const listbtn = document.querySelector('#list-btn');

async function getBusinessData() {
    const response = await fetch(url);
    const data = await response.json();

    displayBusinesses(data.members);
};

getBusinessData();

cards.classList.add('grid');

const displayBusinesses = (businesses) => {
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

        cards.appendChild(card);
    });
};

gridbtn.addEventListener('click', () => {
    cards.classList.add('grid');
    cards.classList.remove('list');
});

listbtn.addEventListener('click', () => {
    cards.classList.add('list');
    cards.classList.remove('grid');
});