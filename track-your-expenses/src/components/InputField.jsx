
function InputField({label, type, id, value, handleChange, error}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={id} 
        
        value={value}
        onChange={handleChange}
      />
      {error !== '' && <p className="error">{error}</p>}
    </div>
  )
}

export default InputField