import { useState } from "react"
import { useFilter } from "../hooks/useFilter"
import { useExpenses } from "../hooks/useExpenses"
import ContextMenu from "./ContextMenu"
import { useLocalStorage } from "../hooks/useLocalStorage"

function ExpenseTable({formExpenseData}) {
  const [ expenseData, setExpenseData] = formExpenseData
  const [contextMenuStyle, setContextMenuStyle] = useLocalStorage('contextMenuStyle', {display: 'none', left: 0, top:0})
  const [expenseId, setExpenseId] = useState('')
  const [expenses] = useExpenses()
  const [filteredExpenses, setCategory, category] = useFilter( expenses, (data) => data?.category, 'category')
  const [filteredByAmountExpense, setType, type] = useFilter( filteredExpenses, (data) => data?.amount, 'amount')
  const [sortCallback, setSortCallback] = useState()
  const [filterObject, setFilterObject] = useState({select: '', amount: ''})


 
  function handleContextMenu(e) {
    setContextMenuStyle({display: 'block', left: e.clientX + 5, top: e.clientY + 5})
  }

  
  
  return (
    <>
      <ContextMenu setExpenseData={setExpenseData} expenseId={expenseId} menuStyle={[contextMenuStyle, setContextMenuStyle]} /> 
      <div className="table-container">
        <p>(Note: Right click on table row to edit, or delete the particular expense.)</p>
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
                <select value={category} onChange={e => setCategory(e.target?.value)}>
                  <option value="">All</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Bills">Bills</option>
                  <option value="Education">Education</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Other">Other</option>
                </select>
              </th>
              <th className="amount-column">
                <div>
                  <span>Amount</span>
                  <div className="filter-amount">
                    filter 
                    <div className="filter-container">
                      {
                        type !== '' && type[0] !== '' &&
                        <button className="clear-filter-btn" type="reset" 
                          onClick={()=> {
                            setFilterObject({select: '', amount: ''})
                            setType(['', 0])
                          }} 
                          title="clear the filter"
                        >Clear filter</button>
                      }
                      {
                        filterObject.select !== '' &&
                        (<form noValidate className="amount-input-wrapper"
                          onSubmit={(e) => {
                            e.preventDefault()
                            setType([filterObject.select, parseInt(filterObject.amount)])
                            setFilterObject({select: '', amount: ''})
                          }}
                        >
                          <input autoFocus value={filterObject.amount} min={1} type="number"
                            placeholder="Enter amount..."
                            onChange={(e) => setFilterObject(prevState => ({...prevState, amount: e.target.value}))}
                          />
                          {
                            filterObject.amount !== '' &&
                            <button type="submit" className="search-btn">search</button>
                          }
                        </form>)
                      }
                      <select value={filterObject.select} name="filter" id="select-amount"
                        aria-required="true"
                        onChange={(e) => setFilterObject(prevState => ({...prevState, select: e.target.value}))}
                      >
                        <option hidden>Select option</option>
                        <option value="greater">Greater than</option>
                        <option value="less">Less than</option>
                        <option value="equal">Equal to</option>
                      </select>
                    </div>
                  </div>
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
              filteredByAmountExpense.sort(sortCallback).map(expense => {
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
              <th>₹{filteredByAmountExpense.reduce((total, expense) => typeof(expense?.amount) !== "number" ? total : total += expense?.amount, 0)}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ExpenseTable