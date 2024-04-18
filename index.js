const divTog = document.querySelector("div");
const quoteP = document.getElementById("quoteP");
const authorP = document.getElementById("authorP");
const idP = document.getElementById("quoteId");
const favouriteH3 = document.getElementById("favouriteH3");
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
  // console.log(data)

  divTog.classList.add("active");
}

function displayQuote(data) {
  authorP.textContent = data.author;
  quoteP.textContent = data.content;
  idP.textContent = data._id;
}

function speakNow(data) {
  let msg = data.content;
  const utterance = new SpeechSynthesisUtterance(msg);
  speechSynthesis.speak(utterance);
  utterance.addEventListener("end", toggleWithUtterOnEnd);
}

function toggleWithUtterOnEnd(event) {
  divTog.classList.remove("active");
  clickEnabled = true;
}

function favQuote() {
  favBtn.addEventListener("click", function () {
    const favouriteQuote = document.createElement("p");
    const existingQuotes = favouriteH3.querySelectorAll("p");
    const newQuoteText = `${authorP.textContent} - ${idP.textContent}`;

    let quoteExists = false;
    existingQuotes.forEach((quote) => {
      if (quote.textContent === newQuoteText) {
        quoteExists = true;
        return;
      }
    });

    if (!quoteExists) {
      favouriteQuote.textContent = newQuoteText;
      favouriteH3.appendChild(favouriteQuote);
    }

    utterFavQuote();
  });
}
favQuote();

async function utterFavQuote() {
  const favList = favouriteH3.childNodes;

  favList.forEach((node) => {
    node.addEventListener("click", async () => {
      if (!clickEnabled) return;
      clickEnabled = false;
      speechSynthesis.cancel();
      const idurl = node.textContent;
      idUrlTrimmed = urlIdTrim(idurl);
      const res = await fetch(`https://api.quotable.io/quotes/${idUrlTrimmed}`);
      const data = await res.json();

      speakNow(data);
      displayQuote(data);
      divTog.classList.add("active");
    });
  });
}

function urlIdTrim(str) {
  const index = str.indexOf("-");
  if (index !== -1) {
    return str.substring(index + 1).trim();
  } else {
    return "";
  }
}

function clickCheck() {
  if (!clickEnabled) return;
  clickEnabled = false;
}
