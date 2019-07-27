import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function LoadingNutrients(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [complete, setComplete] = React.useState(false);


  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      if (progress === 100 && !complete) {
        props.callback();
        setComplete(true);
      } else {
        setProgress(oldProgress => (oldProgress + 1));
      }
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, [complete, progress, props]);

  return (
    <div>
      <CircularProgress className={classes.progress} variant="determinate" value={progress} />
    </div>
  );
}
