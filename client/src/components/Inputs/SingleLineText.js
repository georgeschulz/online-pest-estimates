function SingleLineText({name, label, type = 'text', state = "", setState, helper, showLabel = true}) {
    return (
        <div className="input-group mb-6">
            {showLabel && (<label 
                for={name}
                className="text-xl font-roboto font-semibold ml-6">
                {label}
            </label>)}
            <input
                name={name} 
                type={type} 
                value={state}
                placeholder={helper} 
                onChange={(e) => setState(e.target.value)}
                className="border border-lightgray w-full rounded-full py-4 px-9 text-2xl text-lightmatte"
            />
        </div>
    )
}

export default SingleLineText;