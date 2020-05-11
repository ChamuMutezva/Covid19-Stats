const menuOpen = document.querySelector(".fa-bars");
const menuClose = document.querySelector(".fa-window-close");
const modal = document.querySelector(".modal");
const searchCountry = document.getElementById("countrySearch");
const body = document.querySelector("body");

const modalMyth = document.querySelector(".modalMyth") //Select myth modal
const mythLink = document.querySelector(".myth");
/*
mythLink.addEventListener("click" , () => {
    console.log("myth clicked");
 modalMyth.classList.add("modalMythOpen");
 menuClose.classList.toggle("menuToggle");
 menuOpen.classList.toggle("menuToggle");
 modal.classList.toggle("menuToggle");
})
*/
//map data
async function getMapsData() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const results = await response.json();
  //const  [flag , region , name] = results;
    console.log(results)
}

getMapsData();



console.log(modalMyth);

//filter search by country
searchCountry.addEventListener("keyup", (event) => {
    const allCountries = Array.from(document.querySelectorAll(".countryName"));
    console.log(event.key)
    console.log(searchCountry.value)

    allCountries.forEach(countrySelect => {
        const countries = countrySelect.innerHTML.toLowerCase();
        if (countries.includes(searchCountry.value.toLowerCase().trim())) {
            console.log(countrySelect.parentElement);
            console.log(countries);
            countrySelect.parentElement.style.display = "block";
        } else {
            countrySelect.parentElement.style.display = "none";
        }
    })

})

menuOpen.addEventListener("click", () => {
    console.log("menu active")
    menuClose.classList.toggle("menuToggle");
    menuOpen.classList.toggle("menuToggle");
    modal.classList.toggle("menuToggle");
})

menuClose.addEventListener("click", () => {
    menuClose.classList.toggle("menuToggle");
    menuOpen.classList.toggle("menuToggle");
    modal.classList.toggle("menuToggle");
})
//function to fetch data from the Covid19 Api
//Data is dynamic and is subject to change as new data come in
async function covidData() {
    try {
        const response = await fetch('https://api.covid19api.com/summary');
      //  const responseMap = await fetch('https://restcountries.eu/rest/v2/all'); //fetch map
       // const resultsMap = await responseMap.json(); //get map data
        const results = await response.json();
        const { Global, Countries } = results;        
        console.log(Countries);
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
            const divCountry = document.createElement("div");

            // console.log(country.Country);
            //create a child element to hold all countries 
            //create a button

            const btn = document.createElement("button");
            btn.classList.add("btn");
           // modalCountry.classList.remove('animate__animated', 'animate__fadeOut');
            btn.innerHTML = "Read more...";

            countryHolder.appendChild(divCountry);

            let countryName = document.createElement("h3");
            countryName.classList.add("countryName");

            let countryDetail = document.createElement("span");
            divCountry.classList.add("countryCard")

            countryName.innerHTML = `${country.Country} `
            countryDetail.innerHTML = `New Confirmed: ${country.NewConfirmed.toLocaleString()} <br/> 
    New Death: ${country.NewDeaths.toLocaleString()} <br/> New Recovered: ${country.NewRecovered} <br/>    
    Total Confirmed: ${country.TotalConfirmed.toLocaleString()} <br/>  
    Total Deaths: ${country.TotalDeaths.toLocaleString()} <br/>
    Total Recovered: ${country.TotalRecovered.toLocaleString()}`;

            //add children to parent
            divCountry.appendChild(countryName);
            divCountry.appendChild(countryDetail);
            divCountry.appendChild(btn);

            //add eventlistener to button
            btn.addEventListener("click", (evt) => {
                const modalCountry = document.querySelector(".modalCountry");
                const countryName = document.querySelector(".modalCountry h1")
                countryName.innerHTML = `${country.Country}`
                console.log(modalCountry)
                modalCountry.classList.add("modalCountryOpen");
                body.style.overflow = "hidden"
                //  body.classList.add(".toggleOverflow");
                console.log(`button clicked is ${country.Country}`);
                //alert(`${country.Country} information will 
                //be implemented soon!`);

                //add data to modal dialog box
                const totalConfirmedCases = document.querySelector(".totalConfirmedCases");
                // totalConfirmedCases data;
                totalConfirmedCases.innerHTML = `Total Confirmed Cases: ${country.TotalConfirmed.toLocaleString()}`;

                //new confirmed cases
                const newConfirmedCases = document.querySelector(".newConfirmedCases");
                newConfirmedCases.innerHTML = `New Confirmed Cases: ${country.NewConfirmed.toLocaleString()}`;

                const totalDeath = document.querySelector(".totalDeathsCases");
                totalDeath.innerHTML = `Total Death Cases: ${country.TotalDeaths.toLocaleString()}`;

                const newDeath = document.querySelector(".newDeathsCases");
                newDeath.innerHTML = `New Death Cases: ${country.NewDeaths.toLocaleString()}`

                const totalRecovered = document.querySelector(".totalRecoveredCases");
                totalRecovered.innerHTML = `Total Recovered Cases: ${country.TotalRecovered.toLocaleString()}`

                const newRecovered = document.querySelector(".newRecoveredCases");
                newRecovered.innerHTML = `New Recovered Cases: ${country.NewRecovered.toLocaleString()}`

            })

        });

        const newConfirmed = document.querySelector(".newConfirmed");
        const newDeath = document.querySelector(".newDeath");
        const newRecovered = document.querySelector(".newRecovered");
        const totalConfirmedCases = document.querySelector(".totalConfirmed");
        const totalDeath = document.querySelector(".totalDeath");
        const totalRecovered = document.querySelector(".totalRecovered");
        const dateLabel = document.querySelector(".dateTaken");


        newConfirmed.innerHTML = Global.NewConfirmed.toLocaleString();
        newDeath.innerHTML = Global.NewDeaths.toLocaleString();
        newRecovered.innerHTML = Global.NewRecovered.toLocaleString();
        totalConfirmedCases.innerHTML = Global.TotalConfirmed.toLocaleString();
        totalDeath.innerHTML = Global.TotalDeaths.toLocaleString();
        totalRecovered.innerHTML = Global.TotalRecovered.toLocaleString();
        console.log(dateToday)
        dateLabel.innerHTML = `Data captured at: ${dateToday}  ${timeToday}`;
    } catch (err) {
        const dateLabel = document.querySelector(".dateTaken");
        dateLabel.classList.add("dataError");
        // alert(err)
        dateLabel.innerHTML = ` Error:
        Data can only be fetched online <br/>  ${err} `
    }
}

//close the modal button steps
const btnModal = document.querySelector(".modalCountry button");
console.log(btnModal)
btnModal.addEventListener("click", () => {
    const modalCountry = document.querySelector(".modalCountry");
    body.style.overflow = "visible";
    modalCountry.classList.remove("modalCountryOpen");
   // modalCountry.classList.add('animate__animated', 'animate__fadeOut');


})

covidData();

/* api testing - not used in project
async function testData() {
    const response = await fetch("https://api.covid19api.com/countries");
    const results = await response.json();
    console.log(results)
}
testData() */
