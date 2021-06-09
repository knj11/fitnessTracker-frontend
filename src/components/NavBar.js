import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box, Toolbar } from '@material-ui/core';
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import UserMenu from './UserMenu'
import ActivitiesList from './ActivitiesList'
import RoutinesList from './RoutinesList'
import { getActivitiesEndPoint, getRoutines } from '../api'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  spaceBetween: {
    "justify-content": 'space-between'
  }
}));



export default function NavBar({ user, toggleSignUpForm, setUser }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [activities, setActivities] = useState(null)
  const [routines, setRoutines] = useState(null)

  useEffect(() => {
    getActivitiesEndPoint().then(response => setActivities(response)).catch(error => console.log(error))
    getRoutines().then(response => setRoutines(response)).catch(error => console.log(error))
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar className={classes.spaceBetween}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Activities" {...a11yProps(1)} />
            <Tab label="Routines" {...a11yProps(2)} />
          </Tabs>
          <UserMenu setUser={setUser} user={user} toggleSignUpForm={toggleSignUpForm} />
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        Home
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ActivitiesList activities={activities} />
      </TabPanel>
      <TabPanel value={value} index={2}>
          <RoutinesList routines={routines} />
      </TabPanel>
    </div>
  );
}