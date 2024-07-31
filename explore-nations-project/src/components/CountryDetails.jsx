import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import '../styles/CountryDetails.css'
import { useTheme } from "../hooks/useTheme";
import CountryDetailsShimmerUI from "./CountryDetailsShimmerUI";


export default function CountryDetails() {
  const[loading, setLoading] = useState(true)
  const[notFound, setNotFound] = useState(false)
  const[countryDetail, setCountryDetail] = useState(null)

  const [isDark] = useTheme()
  
  const {state} = useLocation()

  const {country} = useParams()
  

  function updateCountryDetail(country) {
    setCountryDetail({
      flagImage: country.flags.svg,
      countryName: country.name.common,
      population: country.population.toLocaleString('en-IN'),
      region: country.region,
      topLevelDomain: country.tld,
      capital: country?.capital[0],
      borders: country?.borders,
      currencies: country?.currencies,
      languages: country?.languages,
      subregion: country?.subregion,
      nativeName: country?.name?.nativeName,
      borders: []
    })
    
    country?.borders?.length && Promise.all(country?.borders?.map((border) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      .then((res) => res.json())
      .then(([borderCountry]) => borderCountry?.name?.common)
    }))
    .then(allBorderCountriesName => {
      setCountryDetail(prevState => ({...prevState, borders:[...allBorderCountriesName]}))
    }).catch(err => {
      // console.log(err)
    })
  }

  useEffect(() => {
    if(!state) {
      fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
      .then(res => res.json())
      .then(([country]) => {
        updateCountryDetail(country)
        setLoading(false)
      })
      .catch(err => {
        setNotFound(true)
        // setLoading(false)
      })
    }
    else {
      setCountryDetail({
        flagImage: state?.flags.svg,
        countryName: state?.name.common,
        population: state?.population.toLocaleString('en-IN'),
        region: state?.region,
        topLevelDomain: state?.tld,
        capital: state?.capital[0],
        borders: state?.borders,
        currencies: state?.currencies,
        languages: state?.languages,
        subregion: state?.subregion,
        nativeName: state?.name?.nativeName,
        borders: []
      })
    
      updateCountryDetail(state)
      setLoading(false)

    }
    
  },[country])
  

  // if(loading) {
  //  return (
  //     <div className="loading">
  //       <h1> <span style={{color:"red"}}>Loading.....</span> </h1>
  //     </div>
  //   )
  // }

  // if (notFound) {
  //   return (
  //     <div className="not-found">
  //       <h1 > No Data Found</h1>
  //     </div>
  //   )
  // }
  

  return(
    <main className={isDark ? 'dark' : ''}>

      <div className="country-details-container">
        <span onClick={e => history.back()} className="back-button">
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>

       {
        loading ? 
        <CountryDetailsShimmerUI/>
        :
        (<div className="country-details">
            <img src={countryDetail?.flagImage} alt={countryDetail?.countryName + ""} />
            <div className="details-text-container">
              <h1>{countryDetail?.countryName}</h1>
              <div className="details-text">
                <p><b>Native Name: </b><span className="native-name">{Object?.values(countryDetail?.nativeName)?.map((lang=> lang?.common)).join(', ')}.</span></p>
                <p><b>Population: </b><span className="population">{countryDetail?.population}</span></p>
                <p><b>Region: </b><span className="region">{countryDetail?.region}</span></p>
                <p><b>Sub Region: </b><span className="sub-region">{countryDetail?.subregion}</span></p>
                <p><b>Capital: </b><span className="capital">{countryDetail?.capital}</span></p>
                <p>
                  <b>Top Level Domain: </b><span className="top-level-domain">{countryDetail?.topLevelDomain?.tld?.join(', ')}</span>
                </p>
                <p><b>Currencies: </b><span className="currencies">{Object?.values(countryDetail?.currencies)[0]?.name} {`(${Object?.values(countryDetail?.currencies)[0]?.symbol})`}</span></p>
                <p><b>Languages: </b><span className="languages">{Object.values(countryDetail?.languages)?.join(', ')}</span></p>
              </div>
              
              {
                countryDetail?.borders?.length !== 0 &&
                <div className="border-countries"><b>Border Countries: </b>&nbsp; 
                  {
                    countryDetail?.borders.map(border => <Link key={border} to={`/${border}`} >{border}</Link>)
                    
                  }
                </div>
              }

            </div>
        </div>)
       } 
      </div>
    </main>
  )
}