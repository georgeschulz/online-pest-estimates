import { useDispatch, useSelector } from 'react-redux';
import Banner from './banner.js'
import ContentContainer from './contentContainer.js'
import Frame from './frame';
import BenefitsList from './benefitsList';
import SubmitButton from './submitButton';
import { selectBenefitList, selectProgramName } from '../../redux/widgetSlice';
import './App.css'

function StartPaneDemo() {
    const benefits = useSelector(selectBenefitList);
    const program = useSelector(selectProgramName);
    const startingPrice = '40'
    const interval = '/ mo'

    return (
        <Frame>
          <Banner />
          <ContentContainer type="">
            <span className="pricing-widget-header flex-row">{program}</span>
            <BenefitsList list={benefits} />
            <span className="pricing-widget-pricestart flex-row">Prices Starting At <span className="pricing-widget-pricestart-enlarged">${startingPrice} {interval}</span></span>
            <SubmitButton text="Get My Quote Online" onClick={() => {}}/>
          </ContentContainer>
        </Frame>
    )
}

export default StartPaneDemo;