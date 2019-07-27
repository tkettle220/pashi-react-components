import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  button : {
    marginTop: theme.spacing(2),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  active: {},
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const activityModifierMap = {
  'low': 1.2,
  'three': 1.375,
  'four': 1.4187,
  'five': 1.4625,
  'everyday': 1.6375,
}

const goalModifierMap = {
  'lose': .85,
  'maintain': 1,
  'gain': 1.15,
}

const carbCalToGramConversion = .25;
const fatCalToGramConversion = .11;
const proteinCalToGramConversion = .25;


function calculateBMR(gender, height, weight, age) {
  var modifier = gender === 'm' ? 5 : -161;
  return 4.53 * weight + 15.875 * height - 5 * age + modifier;
}

function calculateMR(bmr, activity) {
  return bmr * activityModifierMap[activity];
}

function calculateCalories(gender, height, weight, age, activity, goal) {
  var bmr = calculateBMR(gender, height, weight, age);
  var mr = calculateMR(bmr, activity);
  return Math.round(mr * goalModifierMap[goal]);
}

// Given a calorie count and macro ratios returns the calorie and gram amt
// for each macro
function calculateMacros(calories, macroPercents) {
  var percentCarb = macroPercents.percentCarb;
  var percentFat = macroPercents.percentFat;
  var percentProtein = macroPercents.percentProtein;
  var carbCals = calories * percentCarb;
  var fatCals = calories * percentFat;
  var proteinCals = calories * percentProtein;
  return {
    'carb': {
      'percent': percentCarb,
      'cals': Math.round(carbCals),
      'grams': Math.round(carbCals * carbCalToGramConversion)
    },
    'fat': {
      'percent': percentFat,
      'cals': Math.round(fatCals),
      'grams': Math.round(fatCals * fatCalToGramConversion)
    },
    'protein': {
      'percent': percentProtein,
      'cals': Math.round(proteinCals),
      'grams': Math.round(proteinCals * proteinCalToGramConversion)
    },
  }
}

function getPercentsFromSliderValue(sliderValues) {
  var min = Math.min(...sliderValues) * .01;
  var max = Math.max(...sliderValues) * .01;
  return {
    'percentCarb': min,
    'percentProtein': max - min,
    'percentFat': 1 - max,
  }
}

function calculateMacrosFromCalsAndSlider(calories, sliderValues) {
  return calculateMacros(calories, getPercentsFromSliderValue(sliderValues));
}

export default function Review(props) {
  const classes = useStyles();
  const { gender, height, weight, age, activity, goal } = props;


  const initialCalories = calculateCalories(gender, height, weight, age, activity, goal);
  const initialSliderValues = [50, 70]

  const [sliderValues, setSliderValues] = React.useState(initialSliderValues);
  const [calories, setCalories] = React.useState(initialCalories);
  const [macros, setMacros] = React.useState(calculateMacrosFromCalsAndSlider(calories, sliderValues));

  const handleMacroChange = (event, newValue) => {
    setSliderValues(newValue);
    setMacros(calculateMacrosFromCalsAndSlider(calories, newValue))
};

  const handleCalChange = (event, newValue) => {
    setCalories(newValue);
    setMacros(calculateMacrosFromCalsAndSlider(newValue, sliderValues))
};

  function resetToRecommendation() {
    setCalories(initialCalories);
    setSliderValues(initialSliderValues);
    setMacros(calculateMacrosFromCalsAndSlider(initialCalories, initialSliderValues))
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Nutrient Profile
      </Typography>
      <Typography gutterBottom>Calories</Typography>
      <PrettoSlider valueLabelDisplay="on" aria-label="Pretto slider"
        value={calories}
        onChange={handleCalChange}
        step={1}
        min={Math.round(initialCalories * .5)}
        max={Math.round(initialCalories * 1.5)}/>
      <Typography gutterBottom>Macro Breakdown</Typography>
      <PrettoSlider valueLabelDisplay="auto" aria-label="Pretto slider"
        value={sliderValues}
        onChange={handleMacroChange}
        step={1}
        min={0}
        max={100} />
      <Grid container spacing={12}>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Carbohydrate</Typography>
          <Typography gutterBottom>{Math.round(macros.carb.percent * 100) + '%'}</Typography>
          <Typography gutterBottom>{macros.carb.cals + ' cals'}</Typography>
          <Typography gutterBottom>{macros.carb.grams + ' g'}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Protein</Typography>
          <Typography gutterBottom>{Math.round(macros.protein.percent * 100) + '%'}</Typography>
          <Typography gutterBottom>{macros.protein.cals + ' cals'}</Typography>
          <Typography gutterBottom>{macros.protein.grams + ' g'}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Fat</Typography>
          <Typography gutterBottom>{Math.round(macros.fat.percent * 100) + '%'}</Typography>
          <Typography gutterBottom>{macros.fat.cals + ' cals'}</Typography>
          <Typography gutterBottom>{macros.fat.grams + ' g'}</Typography>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={resetToRecommendation}
        className={classes.button}
      >
        Reset
      </Button>
    </React.Fragment>
  );
}
