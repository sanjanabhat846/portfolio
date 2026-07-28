
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
window.addEventListener("scroll",()=>{

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

const top=card.getBoundingClientRect().top;

if(top<window.innerHeight-100){

card.classList.add("show");

}

});

});
