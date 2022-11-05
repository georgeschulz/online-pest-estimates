function SingleLineText({ name, type, label, placeholder, value, onChange }) {
    return (
        <div className="pricing-widget-form-group">
            <label htmlFor={name} className='pricing-widget-label'>{label}</label>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                className="pricing-widget-input" 
                value={value} 
                onChange={(e) => onChange(e) } 
            />
        </div>
    )
}

export default SingleLineText;