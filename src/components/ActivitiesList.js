import React, { cloneElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Grid, Typography } from '@material-ui/core';

import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function ActivitiesList({ activities }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Typography variant="h6" className={classes.title}>
          All Activities
        </Typography>
        <List>
          {(activities)
            ? activities.map((activity, idx) => {
              return (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <FitnessCenterIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.name}
                    secondary={activity.description}
                  />
                </ListItem>
              )
            })
            : <div></div>
          }
        </List>
      </Grid>
    </div>
  );
}