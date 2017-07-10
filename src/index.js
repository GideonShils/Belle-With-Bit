/* Component imports */
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'bit/components/button';
import TextInput from 'bit/components/text-input';
import Card from 'bit/components/card';
import ComboBox from 'bit/components/combo-box';
import Option from 'bit/components/option';
import Placeholder from 'bit/components/placeholder';
import Select from 'bit/components/select';
import Separator from 'bit/components/separator';
import Spinner from 'bit/components/spinner';
import DatePicker from 'bit/components/date-picker';
import Rating from 'bit/components/rating';
import Toggle from 'bit/components/toggle';
import Choice from 'bit/components/choice';

/* General style import */
import styles from './index.css';

/* Logo import */
import logo from './assets/belle_logo.png'

/* Adding custom default styles to the Card Component */
import CardStyle from 'bit/style/card-style';

// Names for combo box
const babyNames = ['Palma', 'Paloma', 'Pamella', 'Paris', 'Patti', 'Paulina', 'Pearl', 'Pearlie'];

// Fruits for selection
var fruits = [
  { value: "pineapple", content: (<span>🍍 Pineapple</span>) },
  { value: "banana", content: (<span>🍌 Banana</span>) },
  { value: "peach", content: (<span>🍑 Peach</span>) },
  { value: "pear", content: (<span>🍐 Pear</span>) },
  { value: "cherries", content: (<span>🍒 Cherries</span>) }
];

/* Main App */
class App extends React.Component {
  render() {
    return (
      <div className="container">
        {/* Header */}
        <div className="header">
          <img src={logo}/>
          <h1>Belle React Components</h1>
          <h2>Built With Bit</h2>
        </div>

         {/* Main section */}
        <div className="main">
          <div className="info">
            <p>To see how any of these components are used and configured using Bit, check out the code on <a href="https://github.com/GideonShils/Belle-With-Bit/">GitHub</a>.</p>
            <p>Import the components from <a href="https://bitsrc.io/belle/react-components#components">Bit</a> or view the original <a href="http://nikgraf.github.io/belle/">Belle project</a></p>
            <div className="line"></div>
            <div className="usage">
              <h2>Component usage</h2>
              <p>1. Import the component you want to use</p>
              <pre><code className="bash">bit import belle.react-components/components/button</code></pre>
              <p>2. Use the component</p>
              <pre><code className="html">{"<Button primary>Submit</Button>"}</code></pre>
            </div>
          </div>

          <h2>Examples</h2>

          {/* Button components */}
          <div className="section">
            <h3>Button</h3>
            <div className="button">
              <h4>Default</h4>
              {/* A default button with no additional options configured */}
              <Button>Submit</Button>
            </div>
            <div className="button">
              <h4>Primary Default</h4>
              {/* A primary button */}
              <Button primary>Submit</Button>
            </div>
            <div className="button">
              <h4>Disabled Default</h4>
              {/* A disabled button */}
              <Button disabled>Submit</Button>
            </div>
            <div className="button">
              <h4>Custom Styles</h4>
              {/* A button with custom styles applied */}
              <Button primary
                    style={{
                      marginRight: 0,
                      color: '#fff',
                      borderRadius: 100,
                      background: '#9481F6',
                      borderTop: '1px solid #9481F6',
                      borderBottom: '1px solid #9481F6',
                      textSize: 0.8,
                      border: '1px solid #9481F6',
                      paddingLeft: 25,
                      paddingRight: 25,
                    }}
                    hoverStyle={{
                      border: '1px solid #9481F6',
                      borderBottom: '1px solid #9481F6',
                      borderTop: '1px solid #9481F6',
                      color: '#9481F6',
                      background: '#fff',
                    }}>
              Submit
              </Button>
            </div>
          </div>
          
           {/* Card components */}
          <div className="section">
            <h3>Card</h3>
            <div className="card">
              <h4>Default</h4>
              {/* A default card with no additional options configured */}
              <Card>
                Add any content here like paragraphs, images or other components …
              </Card>
            </div>
            {/* A card with custom styles applied */}
            <div className="card">
              <h4>Custom Styles</h4>
              <Card
                style={{
                  marginBottom: 20,
                  padding: 20,
                  borderRadius: 6,
                  color: '#FFF',
                  background: '#9481F6',
                  boxShadow: '0px 0px 53px -11px rgba(0,0,0,0.4)',
                  boxSizing: 'border-box'
                }}>
                Add any content here like paragraphs, images or other components …
              </Card>
            </div>
          </div>

           {/* ComboBox components */}
          <div className="section">
            <h3>Combo Box</h3>
            <div className="combobox">
              <h4>Default</h4>
              {/* A default combo box with a placeholder set. Includes the Option component */}
              <ComboBox placeholder="Choose a State">
                <Option value="Alabama">Alabama</Option>
                <Option value="Alaska">Alaska</Option>
                <Option value="Arizona">Arizona</Option>
                <Option value="Arkansas">Arkansas</Option>
              </ComboBox>
            </div>
            <div className="combobox">
              <h4>Custom style with hints enabled</h4>
              {/* A combo box with custom styles and the enableHint prop enabled */}
              <ComboBox enableHint
                        style={{
                          border: '1px solid #9481F6',
                          borderBottom: '1px solid #9481F6',
                          padding: 10,
                          borderRadius: 6,
                          color: '#9481F6',
                        }}
                        hintStyle={{
                          top: 4,
                          left: 11,
                        }}
                        placeholder = { 'Select Baby Name' }>
                {
                  babyNames.map(function(name, index) {
                    return (
                      <Option value={ name }
                              key={ index }>
                        { name }
                      </Option>
                    );
                  })
                }
              </ComboBox>
            </div>
          </div>

           {/* DatePicker components */}
          <div className="section">
            <h3>DatePicker</h3>
            <div className="datepicker">
              <h4>Default with current day selected</h4>
              {/* A default date picker with the default date set to current day */}
              <DatePicker defaultValue={new Date()} />
            </div>
            <div className="datepicker">
              <h4>With localization</h4>
              {/* A date picture with localization support. Language set to main land chinese through locale prop */}
              <DatePicker defaultValue={new Date()} locale={'zh-CN'}/>
            </div>
          </div>

           {/* Selection components */}
          <div className="section">
            <h3>Selection</h3>
            <div className="select">
              <h4>Default with Separators</h4>
              {/* A default selection with placeholder and separators */}
              <Select>
                <Placeholder>Choose a City</Placeholder>
                <Separator>Asia</Separator>
                <Option value="beijing">Beijing</Option>
                <Option value="tokyo">Tokyo</Option>
                <Separator>Europe</Separator>
                <Option value="berlin">Berlin</Option>
                <Option value="vienna">Vienna</Option>
              </Select>
            </div>
          </div>

           {/* Rating components */}
          <div className="section">
            <h3>Rating</h3>
            <div className="rating">
              <h4>Default</h4>
              {/* A default rating with no additional options configured */}
              <Rating />
            </div>
            <div className="rating">
              <h4>Disabled</h4>
              {/* A disabled rating with a default value applied */}
              <Rating defaultValue={4} 
                      disabled 
              />
            </div>
            <div className="rating">
              <h4>Custom character and style</h4>
              {/* A rating with a default value, custom character, and custom styling */}
              <Rating defaultValue={4} 
                      character={'✯'}
                      characterStyle={{
                        color: '#9481F6',
                        textShadow: '0px 0px 0px',
                      }}
                      hoverCharacterStyle={{
                        color: '#9481F6',
                      }}
              />
            </div>
          </div>

           {/* Spinner components */}
          <div className="section">
            <h3>Spinner</h3>
            <div className="spinner">
              <h4>Default</h4>
              {/* A default spinner with no additional options configured */}
              <Spinner style={{
                marginTop: 27,
              }}/>
            </div>
            <div className="spinner">
              <h4>On button</h4>
              {/* A spinner embedded within a button using custom styling */}
              <Button primary disabled>
                Saving <Spinner characterStyle={{ fontSize: 18, color: '#fff' }} />
              </Button>
            </div>
            <div className="spinner">
            <h4>Custom style</h4>
              {/* A spinner with custom styling */}
              <Spinner 
                style={{
                  fontSize: 45,
                }}
                characterStyle={{
                  color: '#9481F6',
                }}
              />
            </div>
          </div>

           {/* TextInput components */}
          <div className="section">
            <h3>TextInput</h3>
            <div className="textinput">
              <h4>Default with placeholder</h4>
              {/* A default text input with a placeholder value and default value*/}
              <TextInput defaultValue="Jane Doe" placeholder="Name" />
            </div>
            <div className="textinput">
              <h4>With new line option</h4>
              {/* A text input with the new line option enabled */}
              <TextInput defaultValue="This TextInput has allowNewLine set to true. Just press 'Return' once editing the text." allowNewLine />
            </div>
          </div>

           {/* Toggle components */}
          <div className="section">
            <h3>Toggle</h3>
            <div className="toggle">
              <h4>Default</h4>
              {/* A default toggle with no additional options configured */}
              <Toggle />
            </div>
            <div className="toggle">
              <h4>Custom choices</h4>
              {/* A toggle with custom choices that is turned on by default*/}
              <Toggle defaultValue>
                <Choice value>On</Choice>
                <Choice value={ false }>Off</Choice>
              </Toggle>
            </div>
            <div className="toggle">
              <h4>Custom styles</h4>
              {/* A toggle with custom styles */}
              <Toggle defaultValue
                      firstChoiceStyle={{ backgroundColor: 'rgba(148, 129, 246, 0.8)' }}
                      secondChoiceStyle={{ backgroundColor: 'rgba(188, 81, 99, 0.8)' }} 
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);