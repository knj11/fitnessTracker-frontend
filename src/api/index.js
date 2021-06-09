import axios from 'axios'

const URL_DOMAIN = `http://fitnesstrac-kr.herokuapp.com`

//const _storeActivities = (activities) => localStorage.setItem('activities', JSON.stringify(activities))

export const getActivitiesEndPoint = async () => {
  try {
    const {data: activities} = await axios.get(`${URL_DOMAIN}/api/activities`)
    console.log('activities', activities)
    
    return activities
  } catch (error) {
    console.error(error)
  }
}

export const getRoutines = async () => {
  try {
    const {data: routines} = await axios.get(`${URL_DOMAIN}/api/routines`)
    console.log('routines', routines)
    return routines
  } catch (error) {
    console.log(error)
  }
}