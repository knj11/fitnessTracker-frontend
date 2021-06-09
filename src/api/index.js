import axios from 'axios'

const URL_DOMAIN = `http://fitnesstrac-kr.herokuapp.com`

import { getToken, getUsername } from '../auth'

//const _storeActivities = (activities) => localStorage.setItem('activities', JSON.stringify(activities))

export const getActivitiesEndPoint = async () => {
  try {
    const { data: activities } = await axios.get(`${URL_DOMAIN}/api/activities`)
    console.log('activities', activities)

    return activities
  } catch (error) {
    console.error(error)
  }
}

export const getRoutines = async () => {
  try {
    const { data: routines } = await axios.get(`${URL_DOMAIN}/api/routines`)
    console.log('routines', routines)
    return routines
  } catch (error) {
    console.log(error)
  }
}

export const postNewActivity = async (activityName, activityDescription) => {
  try {
    const authToken = getToken()

    const { data: activity } = await axios.post(`${URL_DOMAIN}/api/activities`, {
      name: activityName,
      description: activityDescription
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    return activity
  } catch (error) {
    console.dir(error)
    throw error.response.data
  }
}

export const getMyRoutines = async () => {
  try {
    const authToken = getToken()
    const username = getUsername()

    const {data: myRoutines} = await axios.get(`${URL_DOMAIN}/api/users/${username}/routines`,{
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    console.log('myRoutines', myRoutines)
    return myRoutines
  } catch (error) {
    console.dir(error)
  }
}

export const postNewRoutine = async (routineName, routineGoal, isPublic) => {
  try {
    const authToken = getToken()

    const {data: newRoutine} = await axios.post(`${URL_DOMAIN}/api/routines`, {
      name: routineName,
      goal: routineGoal,
      isPublic: isPublic
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    return newRoutine
  } catch (error) {
    console.dir(error)
    throw error.response.data
  }
}