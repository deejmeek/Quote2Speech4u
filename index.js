const divTog = document.querySelector("div");
const quoteP = document.getElementById("quoteP");
const authorP = document.getElementById("authorP");



// api - key - https://api.quotable.io // https://quote-garden.onrender.com/api/v3/quotes
// console.log(divTog)

//https://programming-quotesapi.vercel.app/api/available
//todo-  integrate category seach bar. - filter search dropdown





divTog.addEventListener("click", async function fetchData() {

//    speechSynthesis.cancel();
//    const res = await fetch("https://programming-quotesapi.vercel.app/api/random");
   const res = await fetch("https://api.quotable.io/random");
const data = await res.json();


authorP.textContent = data.author;
quoteP.textContent = data.content;

let msg = data.content;
const utterance = new SpeechSynthesisUtterance(msg);
speechSynthesis.speak(utterance);
   
    utterance.addEventListener("end", (event) => {
        // preventDefault();
        divTog.classList.remove('active')
        divTog.addEventListener("click", fetchData)

})
  
divTog.classList.add('active')
divTog.removeEventListener("click", fetchData);
    
    return;
});


        

// divTog.addEventListener("click", async function fetchData(){
// const res =  await fetch("https://programming-quotesapi.vercel.app/api/random")
// const data = await res.json();

// authorP.textContent = data.author;

// console.log(data.author);

// return;

// });

// fetchData();

// document.getElementById("btn")
// .addEventListener("click", () => {

// var msg = "glad to meet you friend";
// const utterance = new SpeechSynthesisUtterance(msg);
// speechSynthesis.speak(utterance);

// })



// async function fetchAuthor(){
// const res =  await fetch("https://api.quotable.io/authors")
// const data = await res.json();

// console.log(data)
// let myAuth = data.name;

// const sectors = ["Teddy","Buzz","Bob" ]
// const input = document.getElementById('dropdown1')
// const dataList = document.getElementById('author')

// myAuth.forEach(function(item){
//     let option = document.createElement('option');
//     option.value = item;
//     list.appendChild(option);





// });



// }

// fetchAuthor();



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

