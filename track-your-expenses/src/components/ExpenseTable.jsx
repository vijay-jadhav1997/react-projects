import { useState } from "react"
import { useFilter } from "../hooks/useFilter"
import { useExpenses } from "../hooks/useExpenses"
import ContextMenu from "./ContextMenu"

function ExpenseTable({formExpenseData}) {
  const [ expenseData, setExpenseData] = formExpenseData
  const [contextMenuStyle, setContextMenuStyle] = useState({display: 'none', left: 0, top:0})
  const [expenseId, setExpenseId] = useState('')
  const [expenses, setExpenses] = useExpenses()
  const [filteredExpenses, setCategory] = useFilter(expenses, (data) => data?.category)
  const [sortCallback, setSortCallback] = useState()


 
  function handleContextMenu(e) {
    setContextMenuStyle({display: 'block', left: e.clientX + 5, top: e.clientY + 5})
  }

  function sortExpenses(callback) {
    setExpenses(sortedExpenses)
  }
  
  
  return (
    <>
      <ContextMenu setExpenseData={setExpenseData} expenseId={expenseId} menuStyle={[contextMenuStyle, setContextMenuStyle]} /> 
      <table className="expense-table" 
        onClick={() => {
          if(contextMenuStyle.display === 'block') setContextMenuStyle({})}
        }
      >
        <thead>
          <tr>
            <th className="title-column">
              <div>
                <span>Title</span>
                <span
                  className="sort-title a-to-z"
                  onClick={() => {
                    setSortCallback(() => (a, b) => {
                      const nameA = a.title.toUpperCase();
                      const nameB = b.title.toUpperCase();
                      if (nameA < nameB) return -1

                      if (nameA > nameB) return 1

                      return 0;
                    })}
                  }
                  title="Alphabetical (A-Z)"
                >
                  A-Z
                </span>
                <span
                  className="sort-title z-to-a"
                  onClick={() => {
                    setSortCallback(() => (a, b) => {
                      const nameA = a.title.toUpperCase();
                      const nameB = b.title.toUpperCase();
                      if (nameA < nameB) return 1

                      if (nameA > nameB) return -1

                      return 0;
                    })}
                  }
                  title="Reverse Alphabetical (Z-A)"
                >
                  Z-A
                </span>
              </div>
            </th>
            <th>
              <select onChange={e => setCategory(e.target?.value)}>
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <span
                  className="arrow up-arrow"
                  onClick={() => {
                    setSortCallback(() => (a, b) => a.amount - b.amount)
                  }}
                  title="Ascending"
                >
                  &uarr;
                </span>
                <span
                  className="arrow down-arrow"
                  onClick={() => {
                    setSortCallback(() => (a, b) => b.amount - a.amount)
                    // setExpenses(sortedExpenses)
                  }}
                  title="Descending"
                >
                  &darr;
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            filteredExpenses.sort(sortCallback).map(expense => {
              return (
                <tr key={expense?.id}
                  onContextMenu={ e => {
                    e.preventDefault()
                    setExpenseId(expense?.id)
                    handleContextMenu(e)
                  }}
                >
                  <td>{expense.title}</td>
                  <td>{expense.category}</td>
                  <td>₹{expense.amount}</td>
              </tr>)
            })
          }
          
          <tr>
            <th>Total</th>
            <th style={{color: "gold", cursor: "pointer"}} onClick={() => setSortCallback()}>clear sort</th>
            <th>₹{filteredExpenses.reduce((total, expense) => typeof(expense?.amount) !== "number" ? total : total += expense?.amount, 0)}</th>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default ExpenseTable