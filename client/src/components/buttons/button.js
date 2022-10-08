import { useState } from "react";

function LargeButton({children, isPrimary = true, size = 1, className = "", handleClick = () => {}}, isPending = false) {
    const [color, setColor] = useState((isPrimary ? 'bg-primary' : 'bg-white'));
    const [border, setBorder] = useState((isPrimary ? '' : 'border border-lightmatte'));
    const [fontColor, setFontColor] = useState((isPrimary ? 'text-white' : 'text-matte'));
    
    //handle button size as a props value using tailwind
    let buttonSize;
    switch(size) {
        case 1:
            buttonSize = `px-5 py-2 w-96 rounded text-lg font-poppins`
            break;
        case 5:
            buttonSize= `w-46 flex justify-center px-5 py-2 rounded-full text-2xl font-roboto font-bold`
            break;
        default:       
            buttonSize = `px-5 py-2 w-96 rounded text-lg font-poppins`;
            break;
    }   

    return (
        <p onClick={() => handleClick()} className={`
            text-center 
            cursor-pointer 
            shadow-sm 
            shadow-slate-500
            flex
            items-center 
            ${color} 
            ${border}
            ${fontColor}
            ${buttonSize}
            ${className}
            `}>
                {isPending ? children : 'Loading...'}
            </p>
    )
}

export default LargeButton;