
document.addEventListener("DOMContentLoaded", function () {

console.log("Portfolio Loaded Successfully!");

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

card.addEventListener("mouseenter", () => {

card.style.transform = "translateY(-8px)";

});

card.addEventListener("mouseleave", () => {

card.style.transform = "translateY(0px)";

});

});

});
