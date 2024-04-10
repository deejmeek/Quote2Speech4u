const divTog = document.querySelector("div");
const quoteP = document.getElementById("quote");
const authorP = document.getElementById("author")
console.log(authorP)
console.log(quoteP)
// api - key - https://api.quotable.io // https://quote-garden.onrender.com/api/v3/quotes
// console.log(divTog)



divTog.addEventListener("click", function () {

    // divTog.classList.add('active')?.classList.remove('active');

    divTog.classList.add('active')
setTimeout(() => {

divTog.classList.remove('active')

},1000)

});


async function fetchData (){

const res = await fetch("https://programming-quotesapi.vercel.app/api/random");
const data = await res.json();
quoteP.innerHTML = data.quote;
authorP.innerHTML = data.author;
return;


}


fetchData();

// fetch("")

//     .then((response)=> response.json())
//     .then((quote)=> console.log(quote));
//  quoteP.textContent = quote;


// async function showQuote (){

    


    
//     // const res = await fetch("https://programming-quotesapi.vercel.app/api/random")
//     // console.log(res)
//     // return res;
// }

// console.log(showQuote)


// const categoryList = document.querySelector(".categories");
// const jokeEl = document.querySelector(".joke");
// const another = document.querySelector(".another");
// let currentCategory; 
// let currentCategoryEl;

// async function showCategories(){

// const res = await fetch("https://api.chucknorris.io/jokes/categories");
// const categories = await res.json();
// categories.forEach((category) => {


//     const a = document.createElement('a')
//     a.href = "#";
//     a.className = "category"
//     a.textContent = category    
//     categoryList.append(a)
// });

// }

// async function loadJoke(category){

//     const res = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
//     console.log(res)

// const joke = await res.json();
// jokeEl.textContent = joke.value;


// }

// document.addEventListener('click', async (e)=>{

// const target = e.target;
// if (target.className === 'category') {
//     const category = target.textContent;
//     loadJoke(category);
//     currentCategory = category
// }else if (target.className === "another" && currentCategory) {
    
//     loadJoke(currentCategory)
// }
// })

// showCategories(); 

