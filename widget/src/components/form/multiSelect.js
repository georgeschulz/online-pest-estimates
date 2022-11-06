import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { selectForm, setFormValue, selectHexSecondary } from '../../redux/configSlice';
import Loading from '../loading/loading';

function MultiSelect({ options, name, value, onChange, label }) {
    const dispatch = useDispatch();
    const form = useSelector(selectForm);
    const hexSecondary = useSelector(selectHexSecondary);
    
    //initialize the form values in the form state
    useEffect(() => {
        dispatch(setFormValue({
            name: name,
            value: options.map((item) => { 
                return {name: item.option, isSelected: false }
            })
     }))
    }, [])

    const handleClick = (optionName) => {
        const updatedForm = form[name].map((item) => {
            if(item.name === optionName) {
                return {
                    ...item,
                    isSelected: !item.isSelected
                }
            }
            return item;
        })

        dispatch(setFormValue({
            name: name,
            value: updatedForm
        }))
    }


    //once the form state is initialized, create the form from that state
    if(form[name]) {
        return (
            <div className="pricing-widget-multi-select pricing-widget-form-group">
                <label className='pricing-widget-label'>{label}</label>
                <div className="pricing-widget-multiple-select-options">
                    {form[name].map((item) => {
                        return (
                            <div 
                                className={`pricing-widget-multipe-select-option ${item.isSelected ? 'pricing-widget-selected' : ''}`} 
                                style={{border: item.isSelected ? `1px solid ${hexSecondary}` : `1px solid #AAA6A6`, boxShadow: item.isSelected ? `0px 0px 2px 2px ${hexSecondary}` : null}}
                                onClick={() => handleClick(item.name)}
                                key={item.name}
                            >
                                    {item.name}
                            </div>
                        )
                    })}
                </div>
    
            </div>
        )    
    } else {
        return (
            <Loading />
        )
    }
    
}

export default MultiSelect;