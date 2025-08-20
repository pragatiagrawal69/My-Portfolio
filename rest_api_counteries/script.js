const countriesContainer = document.querySelector('.countries-container')
const filter = document.querySelector('.filter')
const searchInput = document.querySelector('.input-container input')
const themeChanger = document.querySelector('.theme-changer')
let allCountriesData=[]

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then(data =>{
        allCountriesData = data
        renderCountries(allCountriesData)
    })

filter.addEventListener('change', (e) => {
    const region = e.target.value;
  if (region === "Filter by Region") {
    renderCountries(allCountriesData);
  } else {
    const filtered = allCountriesData.filter(c => c.region === region);
    renderCountries(filtered);
  }
})

function renderCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        const countryCard = document.createElement('div')
        countryCard.classList.add('country')
        

        countryCard.innerHTML = `
            <img src="${country.flags?.svg}" alt="">
            <div class="card-content">
              <h3 class="card-title">${country.name?.common || 'No name'}</h3>
              <p><b>Population: </b>${country.population?.toLocaleString('en-IN') || 'N/A'}</p>
              <p><b>Region: </b>${country.region || 'N/A'}</p>
              <p><b>Capital: </b>${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>`
        countriesContainer.append(countryCard)
    })
}

searchInput.addEventListener('input',(e)=> {
    const filterCountries=allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filterCountries)
})

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark")
    themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'
} else {
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'
}

themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')

    if(document.body.classList.contains('dark')){
        localStorage.setItem("theme","dark")
        themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'
    } else {
        localStorage.setItem("theme","light")
        themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'
    }
})

