import { useState } from "react"
import InputField from "./InputField"
import SelectInputField from "./SelectInputField"
import { useExpenses } from "../hooks/useExpenses"

function ExpenseForm({formExpenseData}) {
  const [expenses, setExpenses] = useExpenses()
  const [error, setError] = useState({title: '', category: '', amount: ''})
  const [expenseData, setExpenseData] = formExpenseData

  // console.log(Object.values(error).some(err => err))
  // console.log(Object.values(expenseData).every(data => data), Object.values(error).some(err => err))

  const formValidationRules = {
    title: [{required: "Please enter Title."}, {minlength: "Title must be at least 3 characters long."}, {maxlength: "Title can't exceed 50 characters."}],

    category: [{required: "Please select a category from the dropdown."}],

    amount: [{required: "Please enter an amount."}, {min: "Amount must be more than zero(0)."}],
  }

  function validate(values) {
    let fieldErrors = {title: '', category: '', amount: ''}
    let isErrorFree = true
    Object.entries(values).forEach(([key, value]) => {
      // console.log(key, value)
      if(key === 'id') return
      formValidationRules[key].some(validation => {
        // console.log(validation)
        if (!value) {
          fieldErrors = {...fieldErrors, [key]: validation?.required}
          isErrorFree = false
          return true
        }

        if (validation?.minlength && value.length < 3) {
          fieldErrors = {...fieldErrors, [key]: validation?.minlength}
          isErrorFree = false
          return true
        }
        if (validation?.maxlength && value.length > 50) {
          fieldErrors = {...fieldErrors, [key]: validation?.maxlength}
          isErrorFree = false
          return true
        }
        if (validation?.min && parseInt(value) <= 0) {
          fieldErrors = {...fieldErrors, [key]: validation?.min}
          isErrorFree = false
          return true
        }
      })
    })

    setError(fieldErrors)
    return isErrorFree
  }
  
  function handleFormSubmit(e) {
    e.preventDefault()

    
    if(!validate(expenseData)){
      return
    }
    
    let uniqueId = expenseData.id
    
    if(!expenseData.id){
      if(expenses.some(data => data.title === expenseData.title)){
        alert(`Title should be unique! You already have expense with title '${expenseData.title}'.`)
        return
      }
      uniqueId = crypto.randomUUID()
      setExpenses([...expenses, {...expenseData, id: uniqueId, amount: parseInt(expenseData.amount)}])
    } 
    else {
      const updateExpenses = expenses.map(data => {
        if(data.id === expenseData.id) {
          return {...data, title: expenseData.title, category: expenseData.category, amount: parseInt(expenseData.amount)}
        }
        return data
      })
      // console.log(updateExpenses)
      setExpenses(updateExpenses)
    }
    
    
    // localStorage.setItem('expenses', JSON.stringify([...expenses, {...expenseData, id: uniqueId, amount: parseInt(expenseData.amount)}]))
    setExpenseData({id: '', title: '', category: '', amount: ''})
  }

  
  function getFormData(form) {
    const data = new FormData(form)
    const formData = {id: crypto.randomUUID()}

    for (const [key, value] of data) {
      
      if (key !== 'amount') {
        formData[key] = value
      }
      else {
        formData[key] = parseInt(value)
      }
    }

    return formData
  }
  

  function handleChange(e) {
    setExpenseData(prevState => ({...prevState, [e.target.name]: e.target.value}))

    setError({...error, [e.target.name]: ''})
  }
  
  function checkStatus() {
    if (Object.values(error).some(err => err)) return true

    return !(Object.entries(expenseData).every(([key, value]) => {
      if(key === 'id') return true
      if (key === 'title' & value.length < 3) return false
      return value !== ''
    }))
  }
  
  return (
    <form className="expenseData-form" onSubmit={handleFormSubmit}>
      <InputField label={'Title'} id={'title'} handleChange={handleChange} value={expenseData.title} error={error?.title} type={'text'} />

      <SelectInputField
        id={"category"}
        label={"Category"}
        value={expenseData?.category}
        handleChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        error={error?.category}
      />
      
      <InputField label={'Amount'} id={'amount'} handleChange={handleChange} value={expenseData.amount} error={error?.amount} type={'number'} />
      <button className={checkStatus() ? "add-btn disable" : "add-btn" }>{expenseData.id ? 'Save' : 'Add'}</button>
    </form>
  )
}

export default ExpenseForm