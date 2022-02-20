const menuOpen = document.querySelector(".fa-bars");
const menuClose = document.querySelector(".fa-window-close");
const modal = document.querySelector(".modal");
const searchCountry = document.getElementById("countrySearch");
const body = document.querySelector("body");

const modalMyth = document.querySelector(".modalMyth") //Select myth modal
const mythLink = document.querySelector(".myth");

//filter search by country
searchCountry.addEventListener("keyup", (event) => {
    const allCountries = Array.from(document.querySelectorAll(".countryName"));

    allCountries.forEach(countrySelect => {
        const countries = countrySelect.innerHTML.toLowerCase();
        if (countries.includes(searchCountry.value.toLowerCase().trim())) {
            countrySelect.parentElement.style.display = "block";
        } else {
            countrySelect.parentElement.style.display = "none";
        }
    })

})

menuOpen.addEventListener("click", () => {
    menuClose.classList.toggle("menuToggle");
    menuOpen.classList.toggle("menuToggle");
    modal.classList.toggle("menuToggle");
    modal.classList.toggle("modalAnimation");
})

menuClose.addEventListener("click", () => {
    menuClose.classList.toggle("menuToggle");
    menuOpen.classList.toggle("menuToggle");
    modal.classList.toggle("menuToggle");
    modal.classList.toggle("modalAnimation");
})

//function to fetch data from the Covid19 Api
//Data is dynamic and is subject to change as new data come in
async function covidData() {
    try {
        const response = await fetch('https://api.covid19api.com/summary');
        const results = await response.json();
        const { Global, Countries } = results;

        const timeExtracted = Countries[0].Date;
        const currentDateTime = timeExtracted.split("T");
        const dateToday = currentDateTime[0];
        const timeToday = currentDateTime[1].substring(0, currentDateTime[1].length - 1);
        let countryHolder = document.querySelector(".countryState");

        Countries.forEach(country => {
            const divCountry = document.createElement("div");
            const btn = document.createElement("button");
            let countryName = document.createElement("h3");
            let countryDetail = document.createElement("span");

            btn.classList.add("btn");           
            btn.innerHTML = "Read more...";
            countryHolder.appendChild(divCountry);            
            countryName.classList.add("countryName");            
            divCountry.classList.add("countryCard")

            countryName.innerHTML = `${country.Country} `
            countryDetail.innerHTML = `New Confirmed: ${country.NewConfirmed.toLocaleString()} <br/> 
                                        New Death: ${country.NewDeaths.toLocaleString()} <br/>
                                        New Recovered: ${country.NewRecovered} <br/>    
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
                const countryName = document.querySelector(".modalCountry h1");

                countryName.innerHTML = `${country.Country}`
                console.log(modalCountry)
                modalCountry.classList.add("modalCountryOpen");              

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

                getMapsData(country.Country);

            })

        }); //covid19 api



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
        dateLabel.innerHTML = `Data captured at: ${dateToday}  ${timeToday}`;


    } catch (err) {
        const dateLabel = document.querySelector(".dateTaken");
        dateLabel.classList.add("dataError");        
        dateLabel.innerHTML = ` Error:
        Data can only be fetched online <br/>  ${err} `
    }
}

//close the modal button steps
const btnModal = document.querySelector(".modalCountry button");
btnModal.addEventListener("click", () => {
    const modalCountry = document.querySelector(".modalCountry");
    //  modalCountry.focus();
    body.style.overflow = "visible";
    modalCountry.classList.remove("modalCountryOpen");    
})

covidData();

//map data
async function getMapsData(cty) {
    const regionContinent = document.querySelector(".region");
    const capitalCity = document.querySelector(".capitalCity");
    const countryPopulation = document.querySelector(".countryPopulation"); 
    //const response = await fetch('https://restcountries.eu/rest/v2/all');
    const response = await fetch('https://restcountries.com/v3.1/all');
    const results = await response.json();
    console.log(results)
    const modalCountryOpen = document.querySelector(".modalCountryOpen");
    const countryFlag = document.querySelector(".countryFlag")
    
    results.forEach(country => {        
        const { name, population, region, capital, flags } = country
        // console.log(name, flag)
        if (cty == name.common) {          
            regionContinent.innerHTML = `Region : ${region}`;
            capitalCity.innerHTML = `Capital : ${capital}`;
            countryPopulation.innerHTML = `Population : ${population.toLocaleString()}`
            countryFlag.src = `${flags.svg}`;
        }
    })
}



