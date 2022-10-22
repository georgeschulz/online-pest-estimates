import MultiSelectConfig from "../Inputs/MultiSelectConfig";
import SingleLineText from "../Inputs/SingleLineText";

function ConfigForm({ parameters, config, updateConfig = () => { }, children }) {

    const updateValue = (e, i) => {
        const partOne = parameters.slice(0, i);
        const partTwo = parameters.slice(i + 1, parameters.length)
        const elementToUpdate = { ...parameters[i], value: e }
        const newResults = [...partOne, elementToUpdate, ...partTwo];
        const newConfig = {
            ...config,
            parameterConfig: newResults
        }
        updateConfig(newConfig)
    }

    const form = (
        <div className="w-full flex flex-wrap">
            <div className="w-1/3 mr-10">
                {children}
            </div>
            {parameters == null ? '' :
                parameters.map((parameter, i) => {
                    if (parameter.inputType === 'number' && parameter.type === 'config') {
                        return (
                            <div className="w-1/3 mr-10 mt-4" key={"single-line-text-" + parameter.name}>
                                <SingleLineText
                                    name={parameter.name}
                                    label={parameter.name}
                                    type="number"
                                    helper={parameter.description}
                                    state={parameter.value}
                                    setState={(e) => updateValue(e, i)}
                                />
                            </div>
                        )
                    } else if (parameter.inputType === 'multipleSelect') {
                        return (
                            <div className="w-3/5" key={"multiSelect-Config-" + parameter.name}>
                                <MultiSelectConfig parameterIndex={i} parameters={parameters} parameter={parameter} config={config} updateConfig={updateConfig} />
                            </div>
                        )
                    }
                })}
        </div>
    )

    return form;
}

export default ConfigForm;