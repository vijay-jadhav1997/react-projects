import { useState } from 'react'
import CountriesList from './CountriesList'
import FilterByRegion from './FilterByRegion'
import SearchBar from './SearchBar'
import { useTheme } from '../hooks/useTheme'


export default function Home ()  {
  const [filterText, setFilterText] = useState('')
  const [region, setRegion] = useState('')
  
  const [isDark] = useTheme()

  

  return (
    <main className={isDark ? 'dark' : ''}>
      <div className="scroll-watcher"></div>
      <div className="search-filter-container">
        <SearchBar filteringCountry={[filterText, setFilterText]} />
        <FilterByRegion setRegion={setRegion} />
      </div>

      <CountriesList filteringCountry = {[filterText, region]} />
    </main>
  )
}