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
                ? (<div className="absolute right-10 bg-matte text-white pt-2 pb-2 px-5 space-y-4 border-b-2 border-y-white">
                    {menuItems.map(item => {
                        return (
                            <Link to={item.location}><div className="text-lg hover:underline">{item.label}</div></Link>
                        )
                    })}
                    </div>) 
                : ''
            }
        </div>
    )
}

export default DropdownMenu;