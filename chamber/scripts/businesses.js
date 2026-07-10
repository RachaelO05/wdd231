const url = "https://rachaelo05.github.io/wdd231/chamber/data/members.json";
const cards = document.querySelector('#cards');

async function getBusinessData() {
    const response = await fetch(url);
    const data = await response.json();

    displayBusinesses(data.members);
}

getBusinessData();

const displayBusinesses = (businesses) => {
    businesses.forEach((business) => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let description = document.createElement('p');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let websiteURL = document.createElement('p');
        let image = document.createElement('img');
        let membershipLevel = document.createElement('p');

        name.textContent = `${business.name}`;
        description.textContent = `Description: ${business.description}`;
        address.textContent = `Address: ${business.address}`;
        phoneNumber.textContent = `Phone Number: ${business.phonenumber}`;
        websiteURL.textContent = `Website: ${business.websiteurl}`;
        image.setAttribute('src', business.image);
        image.setAttribute('alt', `${business.name} image`);
        image.setAttribute('loading', 'lazy');
        
        membershipLevel.textContent = `Membership Level: ${business.membershiplevel}`;

        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(websiteURL);
        card.appendChild(image)
        card.appendChild(membershipLevel);

        cards.appendChild(card);
    });
};