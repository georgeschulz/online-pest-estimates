import checkImg from '../../assets/check.png'

function CheckBoxGroup({name, label, state = "", setState, showLabel = true, size = "large"}) {  
    const handleClick = () => {

    }
    
    return (
        <div className="input-group mb-6">
            {showLabel && (<label 
                htmlFor={name}
                className="text-xl font-roboto font-semibold ml-6">
                {label}
            </label>)}
            <div className="flex flex-wrap  ml-8 mt-4">
                {state.map(option => {
                    return (
                        <div key={"billing-option:" + option.type} className="flex flex-wrap items-center my-2 mr-8">
                            <div className={`h-6 w-6 border-neutral-600 border scale mr-3 ${option.allowed ? 'hover:border-red-400' : 'hover:border-green-400'}`} onClick={() => setState(option.type)}>
                                {option.allowed 
                                    ? <img src={checkImg} />
                                    : ''}
                            </div>
                            <span className='text-lg'>{option.type}</span>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default CheckBoxGroup;