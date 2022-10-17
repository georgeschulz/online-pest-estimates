function MultiLineText({name, label, type = 'text', state = "", setState, helper, showLabel = true, size = "medium", length = 100000}) {
    let customStyles = "";

    switch(size) {
        case "short":
            customStyles += 'py-2 px-8 text-xl h-24'
            break;
        case "tall":
            customStyles += 'py-2 px-8 text-xl h-96';
            break;
        default:
            customStyles += 'py-2 px-8 text-xl h-36';
            break;
    }

    return (
        <div className="input-group mb-6">
            {showLabel && (<label 
                htmlFor={name}
                className="text-xl font-roboto font-semibold ml-6">
                {label}
            </label>)}
            <textarea
                name={name} 
                type={type} 
                value={state}
                placeholder={helper} 
                onChange={(e) => setState(e.target.value)}
                maxLength={length}
                className={`border border-lightgray w-full rounded-lg text-lightmatte ${customStyles}`}
            />
        </div>
    )
}

export default MultiLineText;