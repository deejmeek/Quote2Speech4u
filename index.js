const divTog = document.querySelector("div");
const quoteP = document.getElementById("quoteP");
const authorP = document.getElementById("authorP");
const idP = document.getElementById("quoteId");
const favouriteH3 = document.getElementById("favouriteH3");
const favBtn = document.getElementById("favButton");
const clearAllBtn = document.getElementById("clearFavButton");
const clearBtn = document.querySelector(".clear-btn");
const favQuoteCont = document.getElementById("favourite-quote");
const quoteText = document.getElementById("quote-text");
const authorDiv = document.querySelector(".author");
const quoteContent = document.getElementById("quote-content");

let clickEnabled = true; //Variable to control if click events are allowed or not

divTog.addEventListener("click", fetchData); // Click listener on the divTog, activates fetchData func.

async function fetchData() {
  //func to fetch data from API
  if (!clickEnabled) return; //Checks if clicks are allowed, exits function otherwise
  clickEnabled = false; //Blocks clicks to stop quote queuing or cut-offs

  speechSynthesis.cancel(); //Work-around to over-ride chrome specific issue with media auto-play permission.
  const res = await fetch("https://api.quotable.io/random?maxLength=200"); //Calls data from API - maxlength=200 required to dance-arund chrome issue with character length
  const data = await res.json();
  displayQuote(data); //Calls function to display the assocaited data
  speakNow(data); //Calls functions handling the speechsynthisis

  divTog.classList.add("active"); //Sets css to active for styling if quote is being read.
}

function displayQuote(data) {
  //Function handles populating <p> with quote strings.
  authorP.textContent = data.author;
  quoteP.textContent = data.content;
  idP.textContent = data._id;
}

function speakNow(data) {
  //Func. handles speechSynthesis API
  let msg = data.content;
  const utterance = new SpeechSynthesisUtterance(msg);
  speechSynthesis.speak(utterance);
  utterance.addEventListener("end", toggleWithUtterOnEnd); //Listens for the 'end' of quote to call toggleWithUtterOnEnd
}

function toggleWithUtterOnEnd(event) {
  //When end of quote is flagged active class is removed and clicks are allowed.
  divTog.classList.remove("active");

  clickEnabled = true;
}

document.addEventListener("DOMContentLoaded", function () {
  function favQuote() {
    // Handles grabbing current quote and adding to fav list when btn is clicked.
    favBtn.addEventListener("click", function () {
      // Favourite Button event listener
      const newQuoteText = `${quoteP.textContent}`; // construct the quote text
      const newQuoteAuth = `${authorP.textContent}`; // construct the author text
      const newQuoteId = `${idP.textContent}`; // construct the id text

      // Check if this quote already exists in favourites
      const isQuoteExists = Array.from(
        document.querySelectorAll(".favourite-quote") // Get all elements with the class "favourite-quote"
      ).some((quote) => quote.dataset.id === idP.textContent); // Check if any of these elements have a data-id matching the current quote's ID

      if (!isQuoteExists) {
        // If the quote does not exist, add it to the favourites list
        // Create elements for the new favourite quote
        const favouriteQuote = document.createElement("div");
        favouriteQuote.classList.add("favourite-quote"); // Add the "favourite-quote" class to the new div
        favouriteQuote.dataset.id = idP.textContent; // Set the data-id attribute to the current quote's ID

        const authorDiv = document.createElement("div"); // Create a new div element for the author
        authorDiv.textContent = authorP.textContent; // Set the text content to the author's name
        authorDiv.classList.add("author"); // Add the "author" class to the new div

        const quoteContent = document.createElement("div"); // Create a new div element for the quote content
        quoteContent.classList.add("quote-content"); // Add the "quote-content" class to the new div

        const quoteText = document.createElement("p"); // Create a new paragraph element for the quote text

        quoteText.textContent = quoteP.textContent; // Set the text content to the quote text
        quoteText.classList.add("quote-text"); // Add the "quote-text" class to the paragraph

        const clearBtn = document.createElement("button"); // Create a new button element for removing the favourite quote
        clearBtn.textContent = "Remove"; // Set the button text to "Remove"
        clearBtn.classList.add("clear-btn"); // Add the "clear-btn" class to the button

        clearBtn.addEventListener("click", function () {
          // Add an event listener to the button to handle the removal of the favourite quote
          clearFavourite(favouriteQuote); // Call the clearFavourite function with the favouriteQuote element as an argument
        });

        // Append elements to construct the favourite quote
        quoteContent.appendChild(quoteText);
        quoteContent.appendChild(clearBtn);
        favouriteQuote.appendChild(authorDiv);
        favouriteQuote.appendChild(quoteContent);
        favouriteH3.appendChild(favouriteQuote);

        // Store the quote data in localstorage
        addToFavourites(newQuoteText, newQuoteAuth, newQuoteId);
      }

      utterFavQuote();
    });
  }

  favQuote();
});

async function utterFavQuote() {
  //Handles clicks on the favourite quote list
  const favList = document.querySelectorAll(".favourite-quote");

  favList.forEach((node) => {
    //Click listener event for each child element
    node.addEventListener("click", async () => {
      if (!clickEnabled) return; //Checks whether the element is allowed to be clicked - exits otherwise.
      clickEnabled = false; //sets the element to not allow clicks
      speechSynthesis.cancel(); ///work-around to over-ride chrome specific issue with media auto-play permission.
      const idurl = node.dataset.id;

      const res = await fetch(`https://api.quotable.io/quotes/${idurl}`); //calls the favourited quote
      const data = await res.json();

      speakNow(data); //Calls the speechSynthesis func.
      displayQuote(data); //Calls the func to display quote string to the quote widget

      divTog.classList.add("active"); //Sets main quote div to active to show active quote.
      favQuoteCont.classList.add("active"); //Sets favquote div to active to show active quote.
      clickEnabled = true;
    });
  });
}

window.addEventListener("load", () => {
  // Add an event listener for the window load event.
  const bar = document.querySelectorAll(".bar"); // Select all elements with the class "bar"
  for (let i = 0; i < bar.length; i++) {
    // Iterate over each element in the NodeList using a for loop
    bar.forEach((item, j) => {
      // Iterate over each element to set the animation duration

      item.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.2}s`; // Set the animation duration for each element to a random value between 0.2s and 0.7s
    });
  }
});

console.log(typeof Storage !== "undefined");

function addToFavourites(quote, author, id) {
  // Func adds quote, author and id to localstorage
  let favourites = JSON.parse(localStorage.getItem("favourites")) || []; // Retrieve favourites from localstorage, or initialize an empty array if none exist
  favourites.push(quote, author, id); // Add the new quote, author, and id to the list of favourites
  localStorage.setItem("favourites", JSON.stringify(favourites)); // Save updated list of favourites to localstorage
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the element that will contain the favourite quotes
  const favouriteH3 = document.getElementById("favouriteH3");

  const favourites = JSON.parse(localStorage.getItem("favourites")) || []; // Retrieve favourites from localstorage, or initialize an empty array if none exist

  favourites.forEach((item, index) => {
    // Iterate over the favourites array
    if (index % 3 === 0) {
      // Check if it's the start of a new quote set (every 3 items)
      const quoteText = item; // Extract the quote text, author, and id from the favourites array
      const author = favourites[index + 1]; // Get author from the next item
      const id = favourites[index + 2]; // Get id from the item after author

      const favouriteQuote = document.createElement("div"); // Create a div element to represent the favourite quote
      favouriteQuote.classList.add("favourite-quote");

      const authorDiv = document.createElement("div"); // Create a div element for the author
      authorDiv.textContent = author;
      authorDiv.classList.add("author");

      const quoteContent = document.createElement("div"); // Create a div element to contain the quote text and clear button
      quoteContent.classList.add("quote-content");

      const quoteTextElement = document.createElement("p"); // Create a p element to display the quote text
      quoteTextElement.textContent = quoteText;
      quoteTextElement.classList.add("quote-text");

      const clearBtn = document.createElement("button"); // Create a button element to remove the favourite quote
      clearBtn.textContent = "Remove";
      clearBtn.classList.add("clear-btn");
      clearBtn.addEventListener("click", function () {
        clearFavourite(favouriteQuote);
      });

      quoteContent.appendChild(quoteTextElement); // Append the quote text and clear button to the quote content container
      quoteContent.appendChild(clearBtn);

      favouriteQuote.appendChild(authorDiv); // Append the author and quote content container to the favourite quote element
      favouriteQuote.appendChild(quoteContent);

      favouriteH3.appendChild(favouriteQuote); // Append the favourite quote element to the favourite quotes container
      favouriteQuote.addEventListener("click", async () => {
        //Click event listener to the favourite quote element
        if (!clickEnabled) return; // If clicks are disabled, exit the function
        clickEnabled = false;

        speechSynthesis.cancel(); //Work-around to over-ride chrome specific issue with media auto-play permission.

        const res = await fetch(`https://api.quotable.io/quotes/${id}`); // Fetch the quote data from the API using the id
        const data = await res.json();

        speakNow(data);
        displayQuote(data);

        divTog.classList.add("active");
        favQuoteCont.classList.add("active");

        clickEnabled = true;
      });
    }
  });
});

function clearFavourite(favouriteQuote) {
  // Get the text content of the quote to be removed
  const quoteText = favouriteQuote
    .querySelector(".quote-text")
    .textContent.trim();
  favouriteQuote.remove(); // Remove the favourite quote element from the DOM

  // Remove from Local Storage
  let favourites = JSON.parse(localStorage.getItem("favourites")) || []; // Retrieve the list of favourite quotes from localStorage
  // Filter out the quote to be removed from the favourites list
  for (let i = 0; i < favourites.length; i += 3) {
    //Favourites array structure is [quote,author,id,quote,author,id...]
    if (favourites[i] === quoteText) {
      //Remove quote, author, id from array
      favourites.splice(i, 3);
      break;
    }
  }
  localStorage.setItem("favourites", JSON.stringify(favourites)); // Update the favourites list in localStorage
}
