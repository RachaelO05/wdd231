const info = new URLSearchParams(window.location.search);

document.getElementById("gameTitle").textContent =
    info.get("title");

document.getElementById("genres").textContent =
    info.getAll("genre").join(", ");

document.getElementById("platforms").textContent =
    info.getAll("platforms").join(", ");

document.getElementById("multiplayer").textContent =
    info.get("multiplayer") === "true" ? "Yes" : "No";

document.getElementById("priceRange").textContent =
    info.get("priceRange");