import { useEffect, useState } from "react"
import CountryCard from './CountryCard'
import ShimmerCountryCard from "./ShimmerCountryCard"



const CountriesList = ({filteringCountry}) => {
  const [filterText, region] = filteringCountry
  const [allCountriesData, setAllCountriesData] = useState([])

  async function getCountriesData() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all')
      const data = await response.json()
      setAllCountriesData(data)
      setFilteredCountriesData(data)
      localStorage.setItem('allCountries', JSON.stringify(data))
    } catch (error) {
    }
  }

  useEffect(()=> {
    const data = JSON.parse(localStorage.getItem('allCountries'))
    if (data) {
      setAllCountriesData(data)
    }
    else{
      getCountriesData()
    }
  }, [])
  
  
  return (
    <div className="countries-container">
      {
        allCountriesData.length === 0
        ?
          (Array.from({length : 12})).map((card, i) => <ShimmerCountryCard key={i}/>)
          
        :
          allCountriesData.filter(country => country?.region.toLowerCase().includes(region.toLowerCase()))
          .filter(country => country?.name.common?.toLowerCase().includes(filterText.toLowerCase()))
          .map(country => {
            return <CountryCard key={country?.name?.common} country={country} />
          })
      }
    </div>
  )
}

export default CountriesList