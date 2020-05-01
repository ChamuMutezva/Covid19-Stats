const menuOpen = document.querySelector(".fa-bars");
const menuClose = document.querySelector(".fa-window-close");
const modal = document.querySelector(".modal");
const searchCountry = document.getElementById("countrySearch");

console.log(searchCountry);

//filter search by country
searchCountry.addEventListener("keyup", (event) => {
    const allCountries = Array.from(document.querySelectorAll(".countryName"));
    console.log(event.key)
    console.log(searchCountry.value)
   
    allCountries.forEach(countrySelect => {
       const countries = countrySelect.innerHTML.toLowerCase();        
        if(countries.includes(searchCountry.value.toLowerCase())) {
            console.log(countrySelect.parentElement);
            console.log(countries);
            countrySelect.parentElement.style.display = "block";
        } else {
            countrySelect.parentElement.style.display = "none";
        }
    })

})

menuOpen.addEventListener("click", ()=> {
    console.log("menu active")
    menuClose.classList.toggle("menuToggle");
    menuOpen.classList.toggle("menuToggle");
    modal.classList.toggle("menuToggle");
})

menuClose.addEventListener("click", ()=> {
    menuClose.classList.toggle("menuToggle");
    menuOpen.classList.toggle("menuToggle");
    modal.classList.toggle("menuToggle");
})
//function to fetch data from the Covid19 Api
//Data is dynamic and is subject to change as new data come in
async function covidData() {
    const response = await fetch('https://api.covid19api.com/summary');
    const results = await response.json();
    const { Global, Countries } = results;
   // console.log(Global);
   // console.log(Countries);
    const timeExtracted = Countries[0].Date;
   // console.log(timeExtracted)
    const currentDateTime = timeExtracted.split("T");
  // console.log(currentDateTime);
   const dateToday = currentDateTime[0];
   const timeToday = currentDateTime[1].substring(0, currentDateTime[1].length - 1);
  // console.log(dateToday);
  // console.log(timeToday);
    let countryHolder = document.querySelector(".countryState");   
    
    
    Countries.forEach(country => {
       // console.log(country.Country);
        //create a child element to hold all countries 
     let divCountry = document.createElement("div");  
     countryHolder.appendChild(divCountry);   
    let countryName = document.createElement("h3");
    countryName.classList.add("countryName");
    let countryDetail = document.createElement("span");
    divCountry.classList.add("countryCard")
    countryName.innerHTML = `${country.Country} `
    countryDetail.innerHTML = `New Confirmed: ${country.NewConfirmed} <br/> 
    New Death: ${country.NewDeaths} <br/> New Recovered: ${country.NewRecovered} <br/>    
    Total Confirmed: ${country.TotalConfirmed} <br/>  
    Total Deaths: ${country.TotalDeaths} <br/>
    Total Recovered: ${country.TotalRecovered}`;
    divCountry.appendChild(countryName);
    divCountry.appendChild(countryDetail);
    });

    const newConfirmed = document.querySelector(".newConfirmed");
    const newDeath = document.querySelector(".newDeath");
    const newRecovered = document.querySelector(".newRecovered");
    const totalConfirmedCases = document.querySelector(".totalConfirmed");
    const totalDeath = document.querySelector(".totalDeath");
    const totalRecovered = document.querySelector(".totalRecovered");
    const dateLabel = document.querySelector(".dateTaken");

    
    newConfirmed.innerHTML = Global.NewConfirmed;
    newDeath.innerHTML = Global.NewDeaths;
    newRecovered.innerHTML = Global.NewRecovered;
    totalConfirmedCases.innerHTML = Global.TotalConfirmed;
    totalDeath.innerHTML = Global.TotalDeaths;
    totalRecovered.innerHTML = Global.TotalRecovered;
    dateLabel.innerHTML = `${dateToday}  ${timeToday}`;    

}

covidData();

// api testing - not used in project
async function testData () {
    const response = await fetch("https://api.covid19api.com/countries");
    const results = await response.json();
console.log(results)
}
testData()