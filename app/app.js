import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Button,
  Jumbotron,
  Panel,
  Input,
  Label
} from 'react-bootstrap';

class BrewWerksApp extends React.Component {
  render() {
    return (
      <div className="container">
      	<Jumbotron>
          <Panel>
            <h1>BrewWerks</h1>
            <p>The newest brewing software experience</p>
            <LunchOptionsPanel lunchData={this.props.lunchChoices}> </LunchOptionsPanel>
          </Panel>
      	</Jumbotron>
      </div>
    );
  }
}

class LunchOptionsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLunch: 'Nothing selected',
      psi: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    // may need to use innerText for older IE
    this.setState({
      selectedLunch: event.target.textContent
    });
  }
  render() {
    let clickHandler = this.handleClick;
    let lunchOptions = this.props.lunchData.map(function(c,i) {
      return <h3 key={i} onClick={clickHandler}><Label>{c}</Label></h3>;
    });
    return (
      <div>
        <Panel header="Carbonation Levels" bsStyle="primary">
          {/*lunchOptions*/}
          <Input type="number" defaultValue="40" addonBefore="Keg Temperature F" />
          <Input type="number" defaultValue="2.5" addonBefore="CO2 Vols" />
          <Input type="text" value={this.state.psi} addonBefore="Regulator PSI" />
        </Panel>
        <SelectedLunchPanel  selectedLunch={this.state.selectedLunch}></SelectedLunchPanel>
      </div>
    );
  }
}

/**
     * CO2 Volumes Calculation - Forced (e.g. kegging with CO2 tank).  This is based on
     * the "set it and forget it" method of carbonating keg where the regulator PSI setting
     * and temperature of beer will equilibrate to the desired volumes of CO2.  The amount of
     * time required to reach this equilibration depends on multiple factors, but in practice
     * generally takes 5 - 10 days.
     * @param tempF   temperature of beer in Fahrenheit (F)
     * @param volCO2  desired volumes of CO2 in carbonated beer
     * @return        CO2 regulator PSI setting
    
    public float calcCO2VolForced(float tempF, float volCO2) {
        float co2RegPSI;

        co2RegPSI = -16.6999f - (0.0101059f * tempF) + (0.00116512f * tempF * tempF) + (0.173354f * tempF * volCO2) + (4.24267f * volCO2) - (0.0684226f * volCO2 * volCO2);

        return co2RegPSI;
    }
*/

class SelectedLunchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.updateInstructions = this.updateInstructions.bind(this);
    this.state = { instructions: '' };
  }
  updateInstructions(instructions) {
    this.setState({instructions: instructions}); // Method to setState of 'instructions' "key: value" pair
  }
  render() {
    return (
      <div>
        <Panel header="You've picked" bsStyle="warning">
          <Label>{this.props.selectedLunch}</Label>
          <p>Special Instructions: {this.state.instructions}</p> {/* Add the state variable 'instructions' */}
          <SpecialInstructionsInput
            value={this.state.instructions}              // value (prop)
            updateInstructions={this.updateInstructions} // undateInstructions (prop)
            />
        </Panel>
      </div>
    );
  }
}

class SpecialInstructionsInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.updateInstructions(e.target.value);
  }
  render() {
    return (
      <div>
        <Label>Enter special instructions:</Label>
      <input
        type='text'
        value={this.props.value}
        onChange={this.handleChange} />
      </div>
    );
  }
}

var lunchChoices = ['Chicken', 'Fish', 'Vegetarian'];
ReactDOM.render(
  <BrewWerksApp lunchChoices={lunchChoices}/>,
  document.getElementById('root')
);
