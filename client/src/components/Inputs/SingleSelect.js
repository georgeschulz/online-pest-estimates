function SingleSelect({name, label, state = "", setState, showLabel = true, size = "large", options}) {
    let customStyles = "";

    switch(size) {
        case "large":
            customStyles += 'py-4 px-9 text-2xl';
            break;
        case "medium":
            customStyles += 'py-2 px-8 text-xl'
            break;
        default:
            customStyles += 'py-4 px-9 text-2xl';
            break;
    }

    return (
        <div className="input-group mb-6">
            {showLabel && (<label 
                htmlFor={name}
                className="text-xl font-roboto font-semibold ml-6">
                {label}
            </label>)}
            <select
                name={name} 
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={`border border-lightgray w-full rounded-full text-lightmatte ${customStyles}`}
            >
                {options.map(option => {
                    return (<option key={option} value={option}>{option}</option>)
                })}
            </select>
        </div>
    )
}

export default SingleSelect;