import { useSelector, useDispatch } from "react-redux";
import SingleLineText from "../form/singleLineText";
import { selectInputConfigs } from "../../redux/configSlice";
import { selectForm, setFormValue } from "../../redux/configSlice";
import MultiSelect from "../form/multiSelect";

function DynamicForm() {
    const dispatch = useDispatch();
    const form = useSelector(selectForm);
    const inputConfigs = useSelector(selectInputConfigs);

    const handleChange = (e) => {
        dispatch(setFormValue({
            name: e.target.name,
            value: e.target.value
        }))
    }

    return (
        <div className="pricing-widget-dynamic-form">
            {inputConfigs.map((item, index) => {
                if(item.inputType === 'number') {
                    return (
                        <SingleLineText
                            key={index}
                            name={item.name}
                            type="number"
                            label={item.name}
                            placeholder={item.placeholder}
                            value={form[index]}
                            onChange={handleChange}
                        />
                    )
                } else if (item.inputType === 'multipleSelect') {
                    return (
                        <MultiSelect name={'How much more would you like to charge for each possible target they say they are seeing?'} options={item.options} />
                    )
                }
                
            })}
        </div>
    )
}

export default DynamicForm;