import { useState } from "react";
import { Link } from "react-router-dom";

function DropdownMenu({closeIcon, openIcon, menuItems}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <img src={isOpen ?  openIcon : closeIcon} alt="dropdown menu" className={`w-12 h-12 p-2 cursor-pointer hover:bg-slate-400 ${isOpen ? 'bg-matte' : ''}`} onClick={() => handleClick()} />
            { isOpen 
                ? (<div className="absolute right-8 bg-matte text-white pt-2 px-7 border-b-2 border-y-white">
                    {menuItems.map(item => {
                        return (
                            <div onClick={item.handler} className="text-lg hover:underline pb-3 cursor-pointer">{item.label}</div>
                        )
                    })}
                    </div>) 
                : ''
            }
        </div>
    )
}

export default DropdownMenu;