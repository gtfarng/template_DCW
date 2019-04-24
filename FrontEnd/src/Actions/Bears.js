import axios from 'axios'

export const getBearsSuccess = bears => ({   type: 'GET_BEARS_SUCCESS',   bears});
export const getBearsFailed = () => ({ type: 'GET_BEARS_FAILED'});

export const getBears = () => async (dispatch) => {
   try {
      // console.log('get bear new')
       const response = await axios.get(`http://localhost:8000/api/Bears`)
       const responseBody = await response.data;
     //  console.log('response: ', responseBody)
       dispatch(getBearsSuccess(responseBody));
   } catch (error) {
       //console.error(error);
       dispatch(getBearsFailed());
   }
}