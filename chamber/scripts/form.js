const timestamp = document.getElementById("timestamp");

if (timestamp) {
    timestamp.value = new Date().toLocaleString();
}