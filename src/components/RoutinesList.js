import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, List, ListItem, Radio, TextField, Button, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';

import { postNewRoutine } from '../api'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  outline: {
    outline: '2px solid black'
  }
});

export default function RoutinesList({ routines, user, setNewRoutine, newRoutine }) {
  const classes = useStyles();

  const [routineName, setRoutineName] = useState('')
  const [routineGoal, setRoutineGoal] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const createNewRoutine = async (event) => {
    event.preventDefault()
    try {
      await postNewRoutine(routineName, routineGoal, isPublic)
      document.getElementById('routineName').value = ''
      document.getElementById('routineGoal').value = ''
      setRoutineName('')
      setRoutineGoal('')
      setIsPublic(false)
      setErrorMessage('')
      const updateRoutineCounter = newRoutine + 1
      setNewRoutine(updateRoutineCounter)
    } catch (error) {
      console.dir(error)
      setErrorMessage(error.message)
    }
  }

  return (
    <>
      {(user)
        ?
        <form onSubmit={createNewRoutine}>
          <TextField id="routineName" label='RoutineName' placeholder='Enter the RoutineName' onChange={(event) => setRoutineName(event.target.value)} fullWidth required />
          <TextField id="routineGoal" label='RoutineGoal' placeholder='Enter the Goal' onChange={(event) => setRoutineGoal(event.target.value)} fullWidth required />
          <FormLabel component="legend">Set Routine to Public?</FormLabel>
          <RadioGroup aria-label="quiz" name="quiz" value={isPublic} onChange={(event) => setIsPublic(event.target.value)}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
          {/* <Radio onChange={(event) => setIsPublic(event.target.value)}></Radio> */}
          <Button type='submit' color='primary' variant="contained" fullWidth>Create New Routine</Button>
          <Typography>
            {errorMessage}
          </Typography>
        </form>
        : <div></div>
      }
      {(routines)
        ? routines.map((routine, idx) => {
          return (
            <Card key={idx} className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {routine.creatorName}
                </Typography>
                <Typography variant="h5" component="h2">
                  {routine.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {routine.goal}
                </Typography>
                {routine.activities.map(activity => {
                  return (
                    <List className={classes.outline}>
                      <ListItem>
                        <Typography variant="h5" component="h2" color="textSecondary">
                          {activity.name}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>
                          {activity.description}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography color="textSecondary">
                          Duration: {activity.duration}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography color="textSecondary">
                          Count: {activity.count}
                        </Typography>
                      </ListItem>
                    </List>
                  )
                })}
              </CardContent>
            </Card>
          )
        })
        : <div></div>
      }
    </>
  );
}