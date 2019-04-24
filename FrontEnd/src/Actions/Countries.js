import axios from 'axios'

export const getCountriesSuccess = countries => ({   type: 'GET_COUNTRIES_SUCCESS',   countries});
export const getCountriesFailed = () => ({ type: 'GET_COUNTRIES_FAILED'});

export const getCountries = () => async (dispatch) => {
   try {
      // console.log('get country new')
       const response = await axios.get(`http://localhost:8000/api/Countries`)
       const responseBody = await response.data;
      // console.log('response: ', responseBody)
       dispatch(getCountriesSuccess(responseBody));
   } catch (error) {
       //console.error(error);
       dispatch(getCountriesFailed());
   }
}