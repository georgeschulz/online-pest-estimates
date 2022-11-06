import './loading.css'
import { selectHexPrimary } from '../../redux/configSlice';
import { useSelector } from 'react-redux';

function Loading() {
    const backgroundColor = useSelector(selectHexPrimary);

    return (
        <div className='spinner-container w-full flex justify-center'>
            <div className='loading-spinner' style={{borderTop: `10px solid ${backgroundColor}` }}>
            </div>
        </div>
    )
}

export default Loading;