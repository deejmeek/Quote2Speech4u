const divTog = document.querySelector("div");
const quoteP = document.getElementById("quote");
const authorP = document.getElementById("author")
console.log(authorP)
console.log(quoteP)
// api - key - https://api.quotable.io // https://quote-garden.onrender.com/api/v3/quotes
// console.log(divTog)


//todo-  get t2p working

divTog.addEventListener("click", async function fetchData() {

   window.speechSynthesis.cancel();
   const res = await fetch("https://programming-quotesapi.vercel.app/api/random");
const data = await res.json();
quoteP.innerHTML = data.quote;
authorP.innerHTML = data.author;


   let msg = data.quote;
   const utterance = new SpeechSynthesisUtterance(msg);
   speechSynthesis.speak(utterance);
   
   
   
    divTog.classList.add('active')
        setTimeout(() => {
            divTog.classList.remove('active')

            },1000)


return;
        });




// fetchData();

// document.getElementById("btn")
// .addEventListener("click", () => {

// var msg = "glad to meet you friend";
// const utterance = new SpeechSynthesisUtterance(msg);
// speechSynthesis.speak(utterance);

// })







// divTog.addEventListener("click", function () {

//     // divTog.classList.add('active')?.classList.remove('active');

//     divTog.classList.add('active')
// setTimeout(() => {

// divTog.classList.remove('active')

// },1000)

// });


// async function fetchData (){

// const res = await fetch("https://programming-quotesapi.vercel.app/api/random");
// const data = await res.json();
// quoteP.innerHTML = data.quote;
// authorP.innerHTML = data.author;
// return;


// }


// fetchData();

