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

/*
const ROOT_URL = 'http://localhost:8000/api/Bears';

export const FETCH_BEARS = 'fetch_bears';

export function fetchBears() {
    const request = axios.get(ROOT_URL);
    return {
        type: FETCH_BEARS,
        payload: request
    };
}
*/