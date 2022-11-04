import Frame from "../layout/frame";
import Banner from "../layout/banner";
import ContentContainer from "../layout/contentContainer";
import BenefitsList from "../presentational/benefitsList";
import SubmitButton from "../buttons/submitButton";
import { setPane } from "../../redux/paneSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchConfig } from "../../redux/configSlice";
import { selectBenefits, selectIsLoading, selectProgramName, selectStartingPrice, selectInterval } from "../../redux/configSlice";

function StartPane() {
    const dispatch = useDispatch();
    const benefits = useSelector(selectBenefits);
    const program = useSelector(selectProgramName);
    const startingPrice = useSelector(selectStartingPrice);
    const interval = useSelector(selectInterval);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchConfig())
    }, []);

    return (
        <Frame isLoading={isLoading}>
          <Banner />
          <ContentContainer type="">
            <span className="pricing-widget-header flex-row">{program}</span>
            <BenefitsList list={benefits} />
            <span className="pricing-widget-pricestart flex-row">Prices Starting At <span className="pricing-widget-pricestart-enlarged">${startingPrice} {interval}</span></span>
            <SubmitButton text="Get My Quote Online" onClick={() => dispatch(setPane('contact'))}/>
          </ContentContainer>
        </Frame>
    )
}

export default StartPane;