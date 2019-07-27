import React from 'react';

class UserDetails extends React.Component{
  constructor(props) {
    super(props);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  saveAndContinue(event) {
    event.preventDefault();
    this.props.nextStep()
  }

  render(){
      const { values } = this.props;
      return(
        <form>
          <label>
            Name:
            <input type="text" value={values.firstName} onChange={this.props.handleChange('firstName')} />
          </label>
          <button onClick={this.saveAndContinue}>
            Next
          </button>
        </form>
      )
  }
}

class PersonalDetails extends React.Component{
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  back(event) {
    event.preventDefault();
    this.props.prevStep();
  }

  saveAndContinue(event) {
    event.preventDefault();
    this.props.nextStep()
  }

  render(){
      const { values } = this.props;
      return(
        <form>
          <label>
            Age:
            <input type="text" value={values.age} onChange={this.props.handleChange('age')} />
          </label>
          <button onClick={this.back}>
            Back
          </button>
          <button onClick={this.saveAndContinue}>
            Next
          </button>
        </form>
      )
  }
}

class Confirmation extends React.Component{
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  back(event) {
    event.preventDefault();
    this.props.prevStep();
  }

  saveAndContinue(event) {
    event.preventDefault();
    this.props.nextStep()
  }

  render(){
      const { values } = this.props;
      return(
        <div>
          <h2>
          What is your gender?
          </h2>
          <form>
            <label>
              Gender:
              <input type="text" value={values.gender} onChange={this.props.handleChange('gender')} />
            </label>
            <button onClick={this.back}>
              Back
            </button>
            <button onClick={this.saveAndContinue}>
              Finish
            </button>
          </form>
        </div>
      )
  }
}

class Success extends React.Component{

  render(){
    const {values: { firstName, age, gender }} = this.props;
      return(
        <div>
          Congrats! We'll send you a meal now.
          firstname: {firstName} age: {age} gender: {gender}
        </div>
      )
  }
}


class QuizFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        step: 1,
        firstName: '',
        age: '',
        gender: '',
        heightFeet: '',
        heightInches: '',
        activityLevel: null,
    };
  }

  nextStep = () => {
      const { step } = this.state
      this.setState({
          step : step + 1
      })
  }

  prevStep = () => {
      const { step } = this.state
      this.setState({
          step : step - 1
      })
  }

  handleChange = input => event => {
      this.setState({ [input] : event.target.value })
  }

  setGender = (gender) => {
      this.setState({gender: gender})
  }


  render() {
    const {step} = this.state;
    const { firstName, age, gender } = this.state;
    const values = { firstName, age, gender };
    return (
      <div>
      {(()=>{
        switch(step) {
          case 1:
              return <UserDetails
                      nextStep={this.nextStep}
                      handleChange={this.handleChange}
                      values={values}
                      />
          case 2:
              return <PersonalDetails
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      handleChange={this.handleChange}
                      values={values}
                      />
          case 3:
              return <Confirmation
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      handleChange={this.handleChange}
                      values={values}
                      />
          case 4:
              return <Success values={values}/>
          default:
              return null;
          }
      })()}
      </div>
    )

  }
}

export default QuizFlow;
