async function covidData () {
    let response = await fetch('https://api.covid19api.com/summary');
    let results = await response.json();
    const {Global, Countries} = results;
    console.log(Global);
    console.log(Countries);
    const timeExtracted = Countries[0].Date;
    console.log(timeExtracted)
   // Countries.forEach(country => {
   //     console.log(country.Country);        
   // });

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
    dateLabel.innerHTML = timeExtracted;
}

covidData();