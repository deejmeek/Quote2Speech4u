const divTog = document.querySelector("div");
const quoteP = document.getElementById("quote");
const authorP = document.getElementById("author")
console.log(authorP)
console.log(quoteP)
// api - key - https://api.quotable.io // https://quote-garden.onrender.com/api/v3/quotes
// console.log(divTog)


//todo-  get t2p working

divTog.addEventListener("click", async function fetchData() {

   
   const res = await fetch("https://programming-quotesapi.vercel.app/api/random");
const data = await res.json();
quoteP.innerHTML = data.quote;
authorP.innerHTML = data.author;


   
   
   
    divTog.classList.add('active')
        setTimeout(() => {
            divTog.classList.remove('active')

            },1000)


return;
        });




fetchData();









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

