import { useState } from "react";
import LargeButton from "../buttons/button";
import deleteImg from '../../assets/delete.png'
import check from '../../assets/check.png'
import x from '../../assets/x.png';

function TagBuilder({name, label, type = 'text', state = "", setState, removeTag = () => {}, helper, showLabel = true, size = "medium", length = 100000, tagStyle = "tag", icon = check}) {
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
        <div className="input-group mb-6" style={{'minHeight': '270px'}}>
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
                    className={`border border-lightgray w-full rounded-full text-lightmatte ${customStyles}`}
                    onKeyDown={handleKeyDown}
                />
                <LargeButton
                    size={2}
                    handleClick={() => onSubmit()}
                >
                    <span>+Add</span>
                </LargeButton>
            </div>
            
            { tagStyle === 'tag'
                ? (<div className="w-full flex flex-wrap">
                {state.map(tag => {
                    return (
                        <div key={'tag-' + tag} className="bg-primary text-white px-6 py-2 mx-2 my-1 rounded-full text-center flex justify-between items-center" style={{"minWidth": "150px"}}>
                            {tag}
                            <img src={deleteImg} className="ml-2 w-5 h-5 scale" onClick={() => removeTag({tag})} />
                        </div>
                    )
                })}
            </div>)
            : (<div className="w-full flex flex-wrap px-16 align-bottom mt-8">
                {state.map(tag => {
                    return (
                        <div key={'tag-' + tag} className="w-full flex text-lg font-semibold font-poppins mb-5 items-center">
                            <img src={icon} className="w-5 mr-2" />
                            <span>{tag}</span>
                            <span className="text-sm hover:underline cursor-pointer ml-2 font-normal" onClick={() => removeTag({tag})}>Remove</span>
                        </div>
                    )
                })}
            </div>)
            }
            
        </div>
    )
}

export default TagBuilder;

//<img src={x} className="ml-2 w-2 h-2 scale" onClick={() => removeTag({tag})} />