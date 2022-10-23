import SingleLineText from "./SingleLineText";
import x from '../../assets/x.png'

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
        <div className="pb-8 mb-8">
            <p className="text-xl ml-4 mb-8 font-semibold font-poppins">{parameter.name}</p>
            <table style={{'width': '800px'}}>
                <thead className="text-left text-lg font-poppins">
                    <tr>
                        <th><b className="pl-12  font-normal">{parameter.labels[0]}</b></th>
                        <th><b className="pl-12  font-normal">{parameter.labels[1]}</b></th>
                        <th className="w-48 text-center font-normal">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {parameter.options.map((option, i) => {
                return (
                    <tr key={'multiselect-config-' + i}>
                        <td className="px-4">
                            <SingleLineText
                                name={'option-' + option.option}
                                label=''
                                type="text"
                                helper='Option'
                                state={option.option}
                                setState={(e) => updateValue(e, i, 'option')}
                                size="medium"
                            />
                        </td>
                        <td className="px-4">
                            <SingleLineText
                                name={'value-' + option.option}
                                label=''
                                type="number"
                                helper='Value'
                                state={option.value}
                                setState={(e) => updateValue(e, i, 'value')}
                                size="medium"
                            />
                        </td>
                        <td className="flex justify-center pt-4">
                            <span className="flex scale" onClick={() => removeOption(i)}>
                                <img className="w-5 h-5 mr-2" src={x} />
                            </span>   
                        </td>
                    </tr>
                )
            })}
                </tbody>
            </table>
            
            <div className="w-full">
                <span className="ml-10 flex text-lg items-center text-green-800" onClick={() => addOption()}>
                    <b className="text-3xl pointer scale mr-2">+</b> 
                    <span className="pointer scale">Add Option</span>
                </span> 
            </div>
        </div>
    )
}

export default MultiSelectConfig;