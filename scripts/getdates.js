const currentyear = document.querySelector("#currentyear");
const lastModified = document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;

const today = new Date();

currentyear.innerHTML = `©${today.getFullYear()}`;
