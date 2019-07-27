import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GoalForm from './GoalForm';
import DemographicsForm from './DemographicsForm';
import LoadingNutrients from './LoadingNutrients';
import Review from './Review';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  loader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const steps = ['Goals', 'Personal Info', 'Customize Results'];

export default function NutritionCalculator() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showLoader, setShowLoader] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    activity: '',
    age: '',
    gender: '',
    goal: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
  });
  const handleNext = () => {
    if (activeStep === 1) {
      setShowLoader(true);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const removeLoader = () => {
    setActiveStep(activeStep + 1);
    setShowLoader(false);
  };

  const saveInputToState = (input, value) => {
    setFormValues({ ...formValues, [input]: value });
  }

  function getHeightInInches() {
    // * 1 needed to convert string to an int
    return formValues.heightFeet * 12 + formValues.heightInches * 1;
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <GoalForm handleChange={saveInputToState}/>;
      case 1:
        return <DemographicsForm handleChange={saveInputToState}/>;
      case 2:
        return <Review handleChange={saveInputToState} gender={formValues.gender} height={getHeightInInches()} weight={formValues.weight} age={formValues.age} activity={formValues.activity} goal={formValues.goal}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Nutrition Calculator
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Nutrient Profile Completed.
                </Typography>
                <Typography variant="subtitle1">
                  You can now order meals customized to your nutrient profile!
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {showLoader ? (<React.Fragment>
                  <div className={classes.loader}>
                  <Typography variant="h5" gutterBottom>
                    Calculating your profile...
                  </Typography>

                  <LoadingNutrients callback={removeLoader}/>
                  </div></React.Fragment>) : (<React.Fragment>                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Confirm Profile' : 'Next'}
                  </Button>
                </div></React.Fragment>)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
