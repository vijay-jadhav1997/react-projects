import { useEffect, useState } from "react"

export function useLocalStorage(key, initialData='') {
  const [data, setData] = useState(initialData)


  //   if(data) {
  //     localStorage.setItem(key, JSON.stringify(data))
  //     return 
  //   }

  //  return JSON.parse(localStorage.getItem(key)) 


  useEffect(() => {
    if (localStorage.getItem(key)) {
      setData(JSON.parse(localStorage.getItem(key)))
    }
    else {
      localStorage.setItem(key, JSON.stringify(data))
    }
    
  }, [])

  

  function setDataToLocalStorage(newData) {
    if(typeof(newData) === 'function' ) {

      const callbackFnData = newData(data)
      setData(callbackFnData)

      localStorage.setItem(key, JSON.stringify(callbackFnData))
      return
    }
    
    localStorage.setItem(key, JSON.stringify(newData))

    setData(newData)

  }

  return [data, setDataToLocalStorage]
}
