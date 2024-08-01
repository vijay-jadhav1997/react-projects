// import { useState } from 'react'
import './App.css'
import ExpenseTable from './components/ExpenseTable'
import ExpenseForm from './components/ExpenseForm'
import expenseData from './assets/expenseData'
import { useState } from 'react'

function App() {
  // const[expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || expenseData)
  const[expenses, setExpenses] = useState(expenseData)
  // console.log(JSON.parse(localStorage.getItem('expenses')))


  return (
   <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
       <ExpenseForm expensesData={[expenses, setExpenses]} />
        <ExpenseTable expenses={expenses}/>
        <div className="context-menu">
            <div>Edit</div>
            <div>Delete</div>
        </div>
      </div>
    </main>
  )
}

export default App
