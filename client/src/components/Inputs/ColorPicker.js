import SingleLineText from "./SingleLineText";
import { ChromePicker } from "react-color";
import { useState } from "react";

function ColorPicker({name, label, state, setState}) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
      }
      const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }

    return (
        <div className="mb-6 flex flex-wrap">
            <p className="w-full text-xl font-roboto font-semibold ml-6 mb-2">{label}</p>
            <div className="flex">
                <div 
                    className="rounded-full w-16 h-16 border-4 border-black mr-4 shrink-0" 
                    style={{'backgroundColor': state.hex}}
                    onClick={handleClick}
                ></div>
                {displayColorPicker 
                    ? <div style={ popover }>
                        <div style={ cover } onClick={ handleClick }/>
                        <ChromePicker
                            color={state}
                            onChangeComplete={setState}
                        />
                    </div> 
                    : null }

                <SingleLineText
                    name={name}
                    label={label}
                    type="text"
                    state={state.hex}
                    setState={setState}
                    helper="#Ae3031"
                    showLabel={false}
                    size="color"
                />
            </div>
        </div>
    )
}

export default ColorPicker;