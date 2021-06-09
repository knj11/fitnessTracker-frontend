import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Grid, Typography, Toolbar, TextField, Button } from '@material-ui/core';

import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'

import { postNewActivity } from '../api'

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
  errorColor: {
    color: "red"
  }
}));




export default function ActivitiesList({ activities, user, setNewActivity, newActivity }) {
  const classes = useStyles();

  const [activityName, setActivityName] = useState('')
  const [activityDescription, setActivityDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const createNewActivity = async (event) => {
    event.preventDefault()
    try {
      await postNewActivity(activityName, activityDescription)
      const updateActivityCounter = newActivity + 1
      setNewActivity(updateActivityCounter)
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message)
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Toolbar >
          <Typography variant="h6" className={classes.title}>
            All Activities
          </Typography>
        </Toolbar>
        {(user)
          ?
          <form onSubmit={createNewActivity}>
            <TextField id="activityName" label='ActivityName' placeholder='Enter the ActivityName' onChange={(event) => setActivityName(event.target.value)} fullWidth required />
            <TextField id="activityDescription" label='ActivityDescription' placeholder='Enter the Description' onChange={(event) => setActivityDescription(event.target.value)} fullWidth required />
            <Button type='submit' color='primary' variant="contained" fullWidth>Create New Activity</Button>
            <Typography style={errorColor}>
              {errorMessage}
            </Typography>
          </form>
          : <div></div>
        }
        <List >
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