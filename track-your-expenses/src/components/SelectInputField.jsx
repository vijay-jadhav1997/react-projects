
function SelectInputField({label, id, value, handleChange, error, options, defaultValue}) {
  return (
    <div className="input-container">
      <select id={id} name={id}
        value={value}
        aria-required
        onChange={handleChange}
      >
        <option hidden>{defaultValue}</option>
        {
          options?.map(option => {
            return (
            <option key={option} value={option}>{option}</option>

            )
          })
        }
      </select>
      <label htmlFor={id}>{label}</label>
      {error !== '' && <p className="error">{error}</p>}
    </div>
  )
}

export default SelectInputField