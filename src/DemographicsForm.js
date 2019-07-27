import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function DemographicsForm(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textField: {
      flexBasis: 200,
    },
    rightMargin: {
      marginRight: theme.spacing(6),
    }
  }));

  const classes = useStyles();
  const [values, setValues] = React.useState({
    gender: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
  });

  const handleChange = prop => event => {
    props.handleChange(prop, event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Demographic Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Input
          id="adornment-heightFeet"
          value={values.heightFeet}
          onChange={handleChange('heightFeet')}
          endAdornment={<InputAdornment position="end">ft.</InputAdornment>}
          aria-describedby="heightFeet-helper-text"
          className={classes.rightMargin}
          inputProps={{
            'aria-label': 'Height',
          }}/>
          <Input
          id="adornment-heightInches"
          value={values.heightInches}
          onChange={handleChange('heightInches')}
          endAdornment={<InputAdornment position="end">in.</InputAdornment>}
          aria-describedby="heightInches-helper-text"
          inputProps={{
            'aria-label': 'Height',
          }}/>
        </Grid>
        <Grid item xs={12} md={12}>
          <Input
          id="adornment-weight"
          value={values.weight}
          onChange={handleChange('weight')}
          endAdornment={<InputAdornment position="end">lb.</InputAdornment>}
          aria-describedby="weight-helper-text"
          inputProps={{
            'aria-label': 'Weight',
          }}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="age"
            value={values.age}
            onChange={handleChange('age')}
            label="Age" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            value={values.gender}
            onChange={handleChange('gender')}
            input={<Input name="gender" id="gender-label-placeholder" />}
            displayEmpty
            name="gender"
            className={classes.selectEmpty}
          >
          <MenuItem value="">
              <em>Choose a gender</em>
            </MenuItem>
            <MenuItem value='m'>Male</MenuItem>
            <MenuItem value='f'>Female</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
