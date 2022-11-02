import './App.css';
import Frame from './components/layout/frame';
import Banner from './components/layout/banner';
import demoBanner from './assets/demoBanner.JPG';
import ContentContainer from './components/layout/contentContainer';
import BenefitsList from './components/presentational/benefitsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Frame>
          <Banner img={demoBanner} />
          <ContentContainer>
            <span class="pricing-widget-header flex-row">All in One Program</span>
            <BenefitsList list={['All in One helps kill bugs', 'Termite control!', 'Rodent Control']} />
            <span class="pricing-widget-pricestart flex-row">Prices Starting At <span class="pricing-widget-pricestart-enlarged">$75 / Mo</span></span>
            <div class="pricing-widget-button">
              <div id="pricing-widget-start-session" class="pricing-widget-button">Get My Quote Online</div>
            </div>
          </ContentContainer>
        </Frame>
      </header>
    </div>
  );
}

export default App;
