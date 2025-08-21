
const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-dtl img')
const countryNameH1 = document.querySelector('h1')
const countryNativeName = document.querySelector('.native-name')
const countryPopulation = document.querySelector('.population')
const countryRegion = document.querySelector('.region')
const countryCapital = document.querySelector('.capital')
const countryTLD = document.querySelector('.tld')
const countryCurrencies = document.querySelector('.currencies')
const countryLanguages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImage.src = country.flags.svg
    countryNameH1.innerText = country.name.common
    countryPopulation.innerText = country.population.toLocaleString('en-IN')
    countryRegion.innerText = country.region
    countryTLD.innerText = country.tld?.join(', ') || '-'

    if (country.name.nativeName) {
      countryNativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      countryNativeName.innerText = country.name.common
    }

    if (country.capital) {
      countryCapital.innerText = country.capital[0]
    }

    if (country.currencies) {
      countryCurrencies.innerText = Object.values(country.currencies).map(c => c.name).join(', ')
    }

    if (country.languages) {
      countryLanguages.innerText = Object.values(country.languages).join(', ')
    }

    if (country.borders) {
      country.borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then(res => res.json())
          .then(([borderCountry]) => {
           const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `/rest_api_counteries/country.html?name=${borderCountry.name.common}`
            borderCountries.append(borderCountryTag)
        })
           
      })
    }
  })

// 🌙 Theme Toggle
const themeButton = document.querySelector('header h5')

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark")
  themeButton.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'
} else {
  themeButton.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle("dark")

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark")
    themeButton.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'
  } else {
    localStorage.setItem("theme", "light")
    themeButton.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'
  }
})










