async function covidData () {
    let response = await fetch('https://api.covid19api.com/summary');
    let results = await response.json();
    const {Global, Countries} = results;
    console.log(Global.NewRecovered);
    console.log(Countries)
    Countries.forEach(country => {
        console.log(country.Country);
        
    });
}

covidData();