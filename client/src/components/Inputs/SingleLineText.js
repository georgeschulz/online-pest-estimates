function SingleLineText({name, label, type = 'text', state = "", setState, helper, showLabel = true, size = "large"}) {
    let customStyles = "";
    let labelStyles = "";

    switch(size) {
        case "large":
            customStyles += 'py-4 px-9 text-2xl';
            labelStyles += "text-xl font-roboto font-semibold ml-6"
            break;
        case 'medium-large':
            customStyles += 'py-4 px-9 text-xl';
            labelStyles += 'text-lg font-semibold font-roboto'
            break;
        case "medium":
            customStyles += 'py-2 px-8 text-xl'
            labelStyles += "text-xl font-roboto font-semibold ml-6"
            break;
        default:
            customStyles += 'py-4 px-9 text-2xl';
            labelStyles += "text-xl font-roboto font-semibold ml-6"
            break;
    }

    return (
        <div className="input-group mb-6">
            {showLabel && (<label 
                htmlFor={name}
                className={labelStyles}>
                {label}
            </label>)}
            <input
                name={name} 
                type={type} 
                value={state}
                placeholder={helper} 
                onChange={type == 'number' ? (e) => setState(Number(e.target.value)) : (e) => setState(e.target.value)}
                className={`border border-lightgray w-full rounded-full text-lightmatte ${customStyles}`}
            />
        </div>
    )
}

export default SingleLineText;