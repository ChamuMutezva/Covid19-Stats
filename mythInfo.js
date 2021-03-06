const modalMyth = document.querySelector(".modalMyth")
const myData = [
    {
        "id": 1,
        "fact": "People should NOT wear masks while exercising",
        "alt": `People should NOT wear masks when exercising,
         as masks may reduce the ability to breathe comfortably.
        Sweat can make the mask become wet more quickly which makes 
        it difficult to breathe and promotes the growth of microorganisms.
         The important preventive measure during exercise is to maintain
          physical distance of at least one meter from others.`
    },
    {
        "id": 2,
        "fact": "The likelihood of shoes spreading COVID-19 is very low",
        "alt": `The likelihood of COVID-19 being spread on shoes 
        and infecting individuals is very low. As a precautionary measure,
         particularly in homes where infants and small children crawl or play 
         on floors, consider leaving your shoes at the entrance of your home.
          This will help prevent contact with dirt or any waste  that could
           be carried on the soles of shoes.`
    },
    {
        "id": 3,
        "fact": "The coronavirus disease (COVID-19) is caused by a virus, NOT by bacteria",
        "alt": `The virus that causes COVID-19 is in a family of viruses called Coronaviridae.
 Antibiotics do not work against viruses. Some people who become ill with COVID-19 can also
  develop a bacterial infection as a complication. In this case, antibiotics may be 
  recommended by a health care provider. There is currently no licensed medication to
   cure COVID-19. If you have symptoms, call your health care provider or COVID-19 hotline for assistance.`
    },
    {
        "id": 4,
        "fact": "Most people who get COVID-19 recover from it",
        "alt": `Most people who get COVID-19 have mild or moderate
 symptoms and can recover thanks to supportive care. If you have a cough,
  fever and difficulty breathing seek medical care early - call your health
   facility by telephone first. If you have fever and live in an area with
    malaria or dengue seek medical care immediately.`
    },
    {
        "id": 5,
        "fact": "Drinking alcohol does not protect you against COVID-19 and can be dangerous",
        "alt": "The harmful use of alcohol increases your risk of health problems."
    }
]

myData.map(item => {
    console.log(modalMyth)
    const div = document.createElement("div")
    div.classList.add("description")
   
    const template =
    `<details class="details">
        <summary class="m-4">${item.fact}</summary>
        <p class="mt-12">${item.alt}</p>
    </details>`
    div.innerHTML = template
    modalMyth.appendChild(div)
})