const SearchBar = ({filteringCountry}) => {
  const [filterText, setFilterText] = filteringCountry


  
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text" placeholder="Search for a country..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  )
}

export default SearchBar