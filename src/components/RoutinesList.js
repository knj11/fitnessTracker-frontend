import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, List, ListItem } from '@material-ui/core';

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

export default function RoutinesList({ routines }) {
  const classes = useStyles();

  return (
    <>
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