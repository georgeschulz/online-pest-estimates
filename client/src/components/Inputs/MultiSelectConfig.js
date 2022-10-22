import { useRef } from "react";
import SingleLineText from "./SingleLineText";

function MultiSelectConfig({ parameter, parameterIndex, parameters, config, updateConfig = () => {} }) {
    const focusRef = useRef(null);

    const updateValue = (e, i, type) => {
        const { options } = parameter;
        //update the options array and only specifically the one property we are targeting
        const partOne = options.slice(0, i);
        const partTwo = options.slice(i + 1, options.length);
        const elementToUpdate = {
            ...options[i],
            [type]: e
        }
        const newOptions = [...partOne, elementToUpdate, ...partTwo];
        
        //create the new parameter array
        const parametersPart1 = parameters.slice(0, parameterIndex);
        const parametersPart2 = parameters.slice(parameterIndex + 1, parameters.length);
        
        const newParameter = {
            ...parameter,
            options: newOptions
        }

        const newParameters = [...parametersPart1, newParameter, ...parametersPart2]
        const newConfig = {
            ...config,
            parameterConfig: newParameters
        }

        updateConfig(newConfig)
    }
    
    return (
        <div className="border-stone-600 border p-5 mb-8">
            <p className="text-2xl ml-4 mb-5">{parameter.name} Configuration</p>
            <div className="flex space-x-4">
                <b className="w-2/5 pl-16 text-xl">Option</b>
                <b className="w-2/5 pl-16 text-xl">Value</b>
            </div>
            {parameter.options.map((option, i) => {
                return (
                    <div className="flex space-x-4" key={'multiselect-config-' + i}>
                        <div className="w-2/5">
                            <SingleLineText
                                name={'option-' + option.option}
                                label=''
                                type="text"
                                helper='Option'
                                state={option.option}
                                setState={(e) => updateValue(e, i, 'option')}
                            />
                        </div>
                        <div className="w-2/5">
                            <SingleLineText
                                name={'value-' + option.option}
                                label=''
                                type="text"
                                helper='Value'
                                state={option.value}
                                setState={(e) => updateValue(e, i, 'value')}
                            />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default MultiSelectConfig;