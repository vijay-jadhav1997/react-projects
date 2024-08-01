import { useState } from "react"
import InputField from "./InputField"
import SelectInputField from "./SelectInputField"

function ExpenseForm(props) {
  const [expenses, setExpenses] = props?.expensesData
  const [error, setError] = useState({title: '', category: '', amount: ''})
  const [expense, setExpense] = useState({title: '', category: '', amount: ''})

  const formValidationRules = {
    title: [{required: "Please enter Title."}, {minlength: "Title must be at least 5 characters long."}, {maxlength: "Title can't exceed 50 characters."}],

    category: [{required: "Please select a category from the dropdown."}],

    amount: [{required: "Please enter an amount."}, {min: "Amount must be more than zero(0)."}],
  }

  function validate(values) {
    let fieldErrors = {title: '', category: '', amount: ''}
    let isErrorFree = true
    Object.entries(values).forEach(([key, value]) => {
      // console.log(value)
      formValidationRules[key].some(validation => {
        // console.log(validation)
        if (!value) {
          fieldErrors = {...fieldErrors, [key]: validation?.required}
          isErrorFree = false
          return true
        }

        if (validation?.minlength && value.length < 5) {
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

    // console.log(fieldErrors)

    setError(fieldErrors)
    return isErrorFree
  }
  
  function handleFormSubmit(e) {
    e.preventDefault()

    if(!validate(expense)){
      return
    }

    const uniqueId = crypto.randomUUID()

    setExpenses(prevState => [...prevState, {...expense, id: uniqueId, amount: parseInt(expense.amount)}])
    
    localStorage.setItem('expenses', JSON.stringify([...expenses, {...expense, id: uniqueId, amount: parseInt(expense.amount)}]))
    setExpense({title: '', category: '', amount: ''})
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
    setExpense(prevState => ({...prevState, [e.target.name]: e.target.value}))

    setError({...error, [e.target.name]: ''})
  }
  
  
  return (
    <form className="expense-form" onSubmit={handleFormSubmit}>
      <InputField label={'Title'} id={'title'} handleChange={handleChange} value={expense.title} error={error?.title} type={'text'} />

      <SelectInputField
        id={"category"}
        label={"Category"}
        value={expense?.category}
        handleChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        error={error?.category}
      />
      
      {/* <div className="input-container">
        <label htmlFor="category">Category</label>
          <select id="category" name="category"
            value={expense?.category}
            onChange={handleChange}
          >
            <option hidden>Select Category</option>
            <option value="Grocery">Grocery</option>
            <option value="Clothes">Clothes</option>
            <option value="Bills">Bills</option>
            <option value="Education">Education</option>
            <option value="Medicine">Medicine</option>
          </select>
      </div> */}

      <InputField label={'Amount'} id={'amount'} handleChange={handleChange} value={expense.amount} error={error?.amount} type={'number'} />
      <button className="add-btn">Add</button>
    </form>
  )
}

export default ExpenseForm