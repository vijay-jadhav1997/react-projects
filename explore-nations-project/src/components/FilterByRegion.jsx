const FilterByRegion = ({setRegion}) => {
  return (
    <select onChange={e => setRegion(e.target.value)} className="filter-by-region">
      <option hidden>Filter by Region</option>
      <option value="">All</option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  )
}

export default FilterByRegion