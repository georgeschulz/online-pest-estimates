import { useState } from "react";
import SingleLineText from "../Inputs/SingleLineText";
import Loading from "../loading/loading";

function ConfigForm({ parameters, config, updateConfig = () => { } }) {

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
        <div className="w-full flex flex-wrap space-x-3">
            {parameters == null ? '' :
                parameters.map((parameter, i) => {
                    if (parameter.inputType === 'number' && parameter.type === 'config') {
                        return (
                            <div className="w-2/5">
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
                    } else if (parameter.inputTyoe === 'multipeSelect') {

                    }
                })}
        </div>
    )

    return form;
}

export default ConfigForm;