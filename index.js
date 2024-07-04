const divTog = document.querySelector("div");
const quoteP = document.getElementById("quoteP");
const authorP = document.getElementById("authorP");
const idP = document.getElementById("quoteId");
const favouriteH3 = document.getElementById("favouriteH3");
const favBtn = document.getElementById("favButton");
// const quoteContainer = document.getElementById("quoteContainer");
// const soundWaveContainer = document.getElementById("soundWaveContainer");

let clickEnabled = true; //variable to control if click events are allowed or not

divTog.addEventListener("click", fetchData); // click listener on the divTog, activates fetchData func.

async function fetchData() {
  //func to fetch data from API
  if (!clickEnabled) return; //checks if clicks are allowed, exits function otherwise
  clickEnabled = false; //blocks clicks to stop quote queuing or cut-offs

  speechSynthesis.cancel(); //work-around to over-ride chrome specific issue with media auto-play permission.
  const res = await fetch("https://api.quotable.io/random?maxLength=200"); //calls data from API - maxlength=200 required to dance-arund chrome issue with character length
  const data = await res.json();
  displayQuote(data); //calls function to display the assocaited data
  speakNow(data); //calls functions handling the speechsynthisis

  divTog.classList.add("active"); //sets css to active for styling if quote is being read.
}

function displayQuote(data) {
  //function handles populating <p> with quote strings.
  authorP.textContent = data.author;
  quoteP.textContent = data.content;
  idP.textContent = data._id;
}

function speakNow(data) {
  //func. handles speechSynthesis API
  let msg = data.content;
  const utterance = new SpeechSynthesisUtterance(msg);
  speechSynthesis.speak(utterance);
  utterance.addEventListener("end", toggleWithUtterOnEnd); //listens for the 'end' of quote to call toggleWithUtterOnEnd
}

function toggleWithUtterOnEnd(event) {
  //When end of quote is flagged active class is removed and clicks are allowed.
  divTog.classList.remove("active");
  clickEnabled = true;
}

function favQuote() {
  //handles grabbing current quote and adding to fav list when btn is clicked.
  favBtn.addEventListener("click", function () {
    //Favourite Button event listener
    const favouriteQuote = document.createElement("p"); //creates a new <p> element to hold the favourited quote
    const existingQuotes = favouriteH3.querySelectorAll("p"); //holds all the current existing favourited quotes
    const newQuoteText = `${authorP.textContent} - ${idP.textContent}`; //constructs the string of the author and the quote ID

    let quoteExists = false; //sets an initial state to allow for checking for duplicate quotes
    existingQuotes.forEach((quote) => {
      //iterates through each favourited quote
      if (quote.textContent === newQuoteText) {
        //compares the quote text of each favourited quote. if is a match then quoteExists is flagged as true
        quoteExists = true;
        return;
      }
    });

    if (!quoteExists) {
      //appends <p> to favourited list under favourite h3 if quote does not already exist
      favouriteQuote.textContent = newQuoteText; //sets the textContent of created favourite <p>
      favouriteH3.appendChild(favouriteQuote); //appends the newly created favourite <p> to the h3 favourited list.
    }

    utterFavQuote();
  });
}
favQuote();

async function utterFavQuote() {
  //handles clicks on the favourite quote list
  const favList = favouriteH3.childNodes; //is a node list of the children of the Favourite Quotes h3

  favList.forEach((node) => {
    //click listener event for each child element
    node.addEventListener("click", async () => {
      if (!clickEnabled) return; //checks whether the element is allowed to be clicked - exits otherwise.
      clickEnabled = false; //sets the element to not allow clicks
      speechSynthesis.cancel(); ///work-around to over-ride chrome specific issue with media auto-play permission.
      const idurl = node.textContent; //grabs the content of the element
      idUrlTrimmed = urlIdTrim(idurl); //calls trim func to give trimmed content to feed into API fetch
      const res = await fetch(`https://api.quotable.io/quotes/${idUrlTrimmed}`); //calls the favourited quote
      const data = await res.json();

      speakNow(data); //calls the speechSynthesis func.
      displayQuote(data); //calls the func to display quote string to the quote widget
      divTog.classList.add("active"); //sets quote widget to active to show active quote.
    });
  });
}

function urlIdTrim(str) {
  //func to take the text content of the favourited quote, deletes everything before the "-" and trims the white space
  const index = str.indexOf("-"); //finds the first "-" in the favourited quote string
  return str.substring(index + 1).trim(); //extracts the substring immediately after the "-" and trims it.
}

window.addEventListener("load", () => {
  const bar = document.querySelectorAll(".bar");
  for (let i = 0; i < bar.length; i++) {
    bar.forEach((item, j) => {
      // Random move
      item.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.2}s`; // Change the numbers for speed / ( max - min ) + min / ex. ( 0.5 - 0.1 ) + 0.1
    });
  }
});
