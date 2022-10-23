import { useState } from "react";
import { Link } from "react-router-dom";

function DropdownMenu({closeIcon, openIcon, menuItems, h = '12', w = '12', position = 'right-8'}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleHandler = (handler) => {
        handler();
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <img src={isOpen ?  openIcon : closeIcon} alt="dropdown menu" className={`h-${h} w-${w} cursor-pointer hover:bg-slate-400 ${isOpen ? 'bg-matte' : ''}`} onClick={() => handleClick()} />
            { isOpen 
                ? (<div className={`${position} absolute  bg-matte text-white pt-2 px-7 border-b-2 border-y-white`}>
                    {menuItems.map(item => {
                        return (
                            <div key={item.label} onClick={() => handleHandler(item.handler)} className="text-lg hover:underline pb-3 cursor-pointer">{item.label}</div>
                        )
                    })}
                    </div>) 
                : ''
            }
        </div>
    )
}

export default DropdownMenu;