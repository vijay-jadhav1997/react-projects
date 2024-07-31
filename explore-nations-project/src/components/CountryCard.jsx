import { Link } from "react-router-dom"

const CountryCard = ({country}) => {

  return (
    <Link state={country} to={country.name.common} className="country-card">
      <div className="flag-container">
        <img src={country?.flags.svg} alt={country?.name?.common + 'flag'} />
      </div>
      <div className="card-text">
          <h3 className="card-title">{country?.name.common}</h3>
          <p><b>Population: </b>{country?.population.toLocaleString(
            'en-IN'
          )}</p>
          <p><b>Region: </b>{country?.region}</p>
          <p><b>Capital: </b>{country?.capital?.[0]}</p>
      </div>
    </Link>
  )
}

export default CountryCard