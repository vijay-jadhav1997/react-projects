// import { useState } from "react"
import { useLocalStorage } from "./useLocalStorage"

export const useFilter = (dataList, callbackFn, key=null) => {
  const [query, setQuery] = useLocalStorage(key, '')
  // const [query, setQuery] = useState('')

  const filteredData = dataList.filter(data =>  {
    const value = callbackFn(data)

    if(typeof value === 'number') {
      // trying to impliment filter where typeof value is a number
      // Just think if user want to get exspenses that has amount greater than 1000
      const [type , num] = query
      if (type === 'greater') return value > parseInt(num)
      if (type === 'less') return value < parseInt(num)
      if (type === 'equal') return value === parseInt(num)
      return true
    }
    return value.toLowerCase().includes(query.toLowerCase())
    
  })

  return [filteredData, setQuery, query]
}
