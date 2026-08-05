const slider = document.querySelector(".information");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector("#slider-dots");

slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        slider.scrollTo({
            left: slide.offsetLeft,
            behavior: "smooth"
        });
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll("#slider-dots button");

slider.addEventListener("scroll", () => {

    const currentSlide = Math.round(slider.scrollLeft / slider.clientWidth);

    dots.forEach(dot => dot.classList.remove("active"));

    dots[currentSlide].classList.add("active");
});