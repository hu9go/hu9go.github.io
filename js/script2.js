let cards = document.querySelectorAll(".card");
let card1 = document.querySelector("#card1");
let card2 = document.querySelector("#card2");
let card3 = document.querySelector("#card3");
let aperto = false;

card1.addEventListener("click", function(){
  if (!aperto) {
    card1.classList.add("opened");
    card1.innerHTML = "";
    card1.style.marginRight = "200px";
    aperto = true;
  } else {
    card1.classList.remove("opened");
    card1.style.marginRight = "auto";
    card1.innerHTML = `<img src="../img/ristrutturazioni.jpg" alt="Ristrutturazioni">
          <h3>Ristrutturazioni</h3>
          <p>Rinnoviamo appartamenti, ville, uffici e negozi con soluzioni su misura e materiali di qualità.</p>
`
    aperto = false;
  }
})