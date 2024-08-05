import ExpenseTable from './components/ExpenseTable'
import ExpenseForm from './components/ExpenseForm'
import rawExpenseData from './assets/expenseData'
import { ExpensesContext } from './contexts/ExpensesContext'
import { useLocalStorage } from './hooks/useLocalStorage'

import './App.css'

function App() {
  const[expenses, setExpenses] = useLocalStorage('expenses', rawExpenseData)
  const [expenseData, setExpenseData] = useLocalStorage('expenseData', {id: '', title: '', category: '', amount: ''})


  return (
    <ExpensesContext.Provider value={[expenses, setExpenses]}>
      <main>
        <h1 className='heading'>Track Your Expenses</h1>
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
