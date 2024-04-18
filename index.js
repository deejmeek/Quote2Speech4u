const divTog = document.querySelector("div");
const quoteP = document.getElementById("quoteP");
const authorP = document.getElementById("authorP");
const pitchUp = document.getElementById("pitchUp")
const favouriteH3 = document.getElementById("favouriteH3")
const favBtn = document.getElementById("favButton");

let clickEnabled = true; 

divTog.addEventListener("click", fetchData);

async function fetchData() {
    if (!clickEnabled) return; 
    clickEnabled = false; 

    speechSynthesis.cancel();
    const res = await fetch("https://api.quotable.io/random?maxLength=200");
    const data = await res.json();
    displayQuote(data);
    speakNow(data);

    divTog.classList.add('active');
}

function displayQuote(data) {
    authorP.textContent = data.author;
    quoteP.textContent = data.content;
}

function speakNow(data) {
    let msg = data.content;
    const utterance = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(utterance);
    utterance.addEventListener("end", toggleWithDataOnEnd);
}

function toggleWithDataOnEnd(event) {
    divTog.classList.remove('active');
    clickEnabled = true; 
}
