
function InputField({label, type, id, value, handleChange, error, min, minlength}) {
  return (
    <div className="input-container">
      <input type={type} id={id} name={id} 
        min={min}
        value={value}
        minLength={minlength}
        onChange={handleChange}
        required
        placeholder=""
      />
      <label htmlFor={id}>{label}</label>
      {error !== '' && <p className="error">{error}</p>}
    </div>
  )
}

export default InputField