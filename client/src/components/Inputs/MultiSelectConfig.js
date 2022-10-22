import SingleLineText from "./SingleLineText";
import x from '../../assets/x.png'
import plus from '../../assets/plus.png'

function MultiSelectConfig({ parameter, parameterIndex, parameters, config, updateConfig = () => {} }) {
    //this one is used in all the different handlers to take the update options and add them to the config object
    const setOptionChanges = (newOptions) => {
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
        setOptionChanges(newOptions)
    }
    
    const removeOption = (i) => {
        const { options } = parameter;
        const partOne = options.slice(0, i);
        const partTwo = options.slice(i + 1, options.length);
        const newOptions = [...partOne, ...partTwo];
        setOptionChanges(newOptions)
    }

    const addOption = () => {
        const { options } = parameter;
        const newOptions = [...options, {
            option: '',
            value: ''
        }]
        setOptionChanges(newOptions)
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
                        <div className="w-48 flex justify-center mt-4">
                            <span className="flex scale" onClick={() => removeOption(i)}>
                                <img className="w-5 h-5 mr-2" src={x} />
                                <span>Remove Option</span>
                            </span>   
                        </div>
                    </div>
                )
            })}
            <div className="w-full">
                <span className="flex text-2xl items-center text-green-800" onClick={() => addOption()}>
                    <b className="text-4xl pointer scale mr-2">+</b> 
                    <span className="pointer scale">Add Option</span>
                </span> 
            </div>
        </div>
    )
}

export default MultiSelectConfig;