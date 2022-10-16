import { useState } from "react";
import LargeButton from "../buttons/button";
import deleteImg from '../../assets/delete.png'
import plus from '../../assets/plus.png'

function TagBuilder({name, label, type = 'text', state = "", setState, removeTag = () => {}, helper, showLabel = true, size = "medium", length = 100000}) {
    let customStyles = "";
    const [newValue, setNewValue] = useState('');

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

    const onSubmit = () => {
        setState(newValue);
        setNewValue('')
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            setState(newValue);
            setNewValue('')
        }
    }

    return (
        <div className="input-group mb-6">
            {showLabel && (<label 
                htmlFor={name}
                className="text-xl font-roboto font-semibold ml-6">
                {label}
            </label>)}
            <div className="flex space-x-4 mb-4">
                <input
                    name={name} 
                    type={type} 
                    value={newValue}
                    placeholder={helper} 
                    onChange={(e) => setNewValue(e.target.value)}
                    maxLength={length}
                    className={`border border-lightgray w-full rounded-lg text-lightmatte ${customStyles}`}
                    onKeyDown={handleKeyDown}
                />
                <LargeButton
                    size={2}
                    handleClick={() => onSubmit()}
                >
                    <span>+Add</span>
                </LargeButton>
            </div>
            
            <div className="w-full flex flex-wrap">
                {state.map(tag => {
                    return (
                        <div className="bg-primary text-white px-6 py-2 mx-2 my-1 rounded-full text-center flex justify-between items-center" style={{"minWidth": "150px"}}>
                            {tag}
                            <img src={deleteImg} className="ml-2 w-5 h-5 scale" onClick={() => removeTag({tag})} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TagBuilder;