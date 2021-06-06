import axios from 'axios'

const URL_DOMAIN = `http://fitnesstrac-kr.herokuapp.com`

//const _storeActivities = (activities) => localStorage.setItem('activities', JSON.stringify(activities))

export const getActivitiesEndPoint = async () => {
  try {
    const {data} = await axios.get(`${URL_DOMAIN}/api/activities`)
    console.log('activities', data)
    
    return data
  } catch (error) {
    console.error(error)
  }
}