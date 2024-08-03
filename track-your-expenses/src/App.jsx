// import { useState } from 'react'
import './App.css'
import ExpenseTable from './components/ExpenseTable'
import ExpenseForm from './components/ExpenseForm'
import rawExpenseData from './assets/expenseData'
import { useState } from 'react'
import { ExpensesContext } from './contexts/ExpensesContext'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const[expenses, setExpenses] = useLocalStorage('expenses', rawExpenseData)
  // const[expenses, setExpenses] = useState(rawExpenseData)
  // console.log(JSON.parse(localStorage.getItem('expenses')))
  const [expenseData, setExpenseData] = useState({id: '', title: '', category: '', amount: ''})


  return (
    <ExpensesContext.Provider value={[expenses, setExpenses]}>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
        <ExpenseForm formExpenseData={[expenseData, setExpenseData]} />
          <ExpenseTable formExpenseData={[expenseData, setExpenseData]}/>
          <div className="context-menu">
              <div>Edit</div>
              <div>Delete</div>
          </div>
        </div>
      </main>

    </ExpensesContext.Provider>
  )
}

export default App
