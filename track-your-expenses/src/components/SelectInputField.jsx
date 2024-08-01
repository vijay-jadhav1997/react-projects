
function SelectInputField({label, id, value, handleChange, error, options}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id}
        value={value}
        onChange={handleChange}
      >
        <option hidden>Select {label}</option>
        {
          options?.map(option => {
            return (
            <option key={option} value={option}>{option}</option>

            )
          })
        }
      </select>
      {error !== '' && <p className="error">{error}</p>}
    </div>
  )
}

export default SelectInputField