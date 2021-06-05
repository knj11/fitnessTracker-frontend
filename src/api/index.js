import axios from 'axios'

const URL_DOMAIN = `http://fitnesstrac-kr.herokuapp.com`

export const getActivitiesResponce = async () => {
  try {
    const responce = await axios.get(`${URL_DOMAIN}/api/activities`)
    console.log('activities', responce)
  } catch (error) {
    console.error(error)
  }
}