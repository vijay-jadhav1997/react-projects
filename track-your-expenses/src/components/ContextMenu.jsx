import { useExpenses } from "../hooks/useExpenses"

function ContextMenu({menuStyle, expenseId, setExpenseData}) {
  const [expenses, setExpenses] = useExpenses()
  const [contextMenuStyle, setContextMenuStyle] = menuStyle

  function deleteExpense(id) {
    const updatedExpenses = expenses.filter(data => data.id !== id)
    setExpenses(updatedExpenses)
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
    setContextMenuStyle({display: 'none'})
  }

  function editExpense(id) {
    const [updateExpense] = expenses.filter(data => data.id === id)
    
    setExpenseData({id: updateExpense.id, title: updateExpense.title, category: updateExpense.category, amount: updateExpense.amount})
    setContextMenuStyle({display: 'none'})
  }
  
  return (
   <div className="context-menu" 
    style={{display: contextMenuStyle.display, left: contextMenuStyle.left, top: contextMenuStyle.top}}
   >
      <div onClick={() => editExpense(expenseId)}>Edit</div>
      <div 
        onClick={() => deleteExpense(expenseId)}
      >Delete</div>
      <div onClick={() => {
        setExpenses([])
        setContextMenuStyle({display: 'none'})
        localStorage.setItem('expenses', JSON.stringify([]))
      }}>Clear All</div>
   </div>
  )
}

export default ContextMenu