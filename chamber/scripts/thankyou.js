const info = new URLSearchParams(window.location.search);

document.getElementById("firstName").textContent =
    info.get("first-name");

document.getElementById("lastName").textContent =
    info.get("last-name");

document.getElementById("email").textContent =
    info.get("email");

document.getElementById("phone").textContent =
    info.get("phone-number");

document.getElementById("organization").textContent =
    info.get("organization-name");

document.getElementById("submitted").textContent =
    info.get("timestamp");