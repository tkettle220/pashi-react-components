import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function GoalForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    goal: '',
    activity: '',
  });

  const handleChange = prop => event => {
    props.handleChange(prop, event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tell us a bit about yourself
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Select
            value={values.goal}
            onChange={handleChange('goal')}
            input={<Input name="goal" id="goal-label-placeholder" />}
            displayEmpty
            name="goal"
            className={classes.selectEmpty}
          >
          <MenuItem value="">
              <em>What is your goal?</em>
            </MenuItem>
            <MenuItem value={"lose"}>Weight Loss</MenuItem>
            <MenuItem value={"maintain"}>Weight Maintenance</MenuItem>
            <MenuItem value={"gain"}>Weight Gain</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={values.activity}
            onChange={handleChange('activity')}
            input={<Input name="activity" id="activity-label-placeholder" />}
            displayEmpty
            name="activity"
            className={classes.selectEmpty}
          >
          <MenuItem value="">
              <em>How much do you exercise?</em>
            </MenuItem>
            <MenuItem value={"low"}>Rarely</MenuItem>
            <MenuItem value={"three"}>3 times per week</MenuItem>
            <MenuItem value={"four"}>4 times per week</MenuItem>
            <MenuItem value={"five"}>5 times per week</MenuItem>
            <MenuItem value={"everyday"}>Everyday</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
