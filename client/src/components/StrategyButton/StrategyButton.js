import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWidgetStrategy } from "../../redux/widgetSlice";

function StrategyButton({tag = '', name, children, strategy}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleClick = () => {
        (async () => {
            try {
                await dispatch(setWidgetStrategy({strategyType: strategy}))
                navigate('/widget-information/create');
            } catch (err) {
                console.log(err)
            }
        })();
    }

    return (
        <div onClick={() => handleClick()} className="shadow-container px-8 py-8 m-8 hover:bg-gray-200 cursor-pointer" style={{'width': '400px'}}>
            {tag != '' ? tag : ''}
            <p className="text-xl font-bold font-poppins mb-2">{name}</p>
            <p>{children}</p>
        </div>
    )
}

export default StrategyButton;