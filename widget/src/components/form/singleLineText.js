function SingleLineText({ name, type, label, placeholder, value, onChange }) {
    return (
        <div class="pricing-widget-form-group">
            <label for={name}>{label}</label>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                class="pricing-widget-input" 
                value={value} 
                onChange={(e) => onChange(e) } 
            />
        </div>
    )
}

export default SingleLineText;