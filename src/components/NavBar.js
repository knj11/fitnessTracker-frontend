import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box, Toolbar } from '@material-ui/core';
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom';

import UserMenu from './UserMenu'
import ActivitiesList from './ActivitiesList'
import RoutinesList from './RoutinesList'
import { getActivitiesEndPoint, getRoutines, getMyRoutines } from '../api'

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
  const [newActivity, setNewActivity] = useState(0)
  const [myRoutines, setMyRoutines] = useState(null)

  useEffect(() => {
    getActivitiesEndPoint().then(response => setActivities(response)).catch(error => console.log(error))
  }, [newActivity])

  useEffect(() => {
    getRoutines().then(response => setRoutines(response)).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (user) {
      getMyRoutines().then(response => setMyRoutines(response)).catch(error => console.log(error))
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar className={classes.spaceBetween}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              {/* <Tab label="Home" {...a11yProps(0)} /> */}
              <NavLink to='/' color="white">Home</NavLink>
              <NavLink to='/activities'>Activities</NavLink>
              <NavLink to='/routines'>Routines</NavLink>
              {(user) ? <NavLink to='/myRoutines'>My Routines</NavLink> : ''}
              {/* <Tab label="Activities" {...a11yProps(1)} />
              <Tab label="Routines" {...a11yProps(2)} /> */}
            </Tabs>
            <UserMenu setUser={setUser} user={user} toggleSignUpForm={toggleSignUpForm} />
          </Toolbar>
        </AppBar>
        <Switch>
          {/* <TabPanel value={value} index={0}> */}
          <Route exact path='/'>
            Home
            </Route>
          {/* </TabPanel> */}
          {/* <TabPanel value={value} index={1}> */}
          <Route path='/activities'>
            <ActivitiesList newActivity={newActivity} setNewActivity={setNewActivity} user={user} activities={activities} />
          </Route>
          {/* </TabPanel> */}
          {/* <TabPanel value={value} index={2}> */}
          <Route path='/routines'>
            <RoutinesList routines={routines} />
          </Route>
          {(user)
            ?
            <Route path='/myRoutines'>
              <RoutinesList myRoutines={myRoutines} />
            </Route>
            : ""
          }
          {/* </TabPanel> */}
        </Switch>
      </div>
    </Router>
  );
}