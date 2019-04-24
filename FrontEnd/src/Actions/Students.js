import axios from 'axios'

export const getStudentsSuccess = students => ({   type: 'GET_STUDENTS_SUCCESS',   students});
export const getStudentsFailed = () => ({ type: 'GET_STUDENTS_FAILED'});

export const getStudents = () => async (dispatch) => {
   try {
      // console.log('get student new')
       const response = await axios.get(`http://localhost:8000/api/Students`)
       const responseBody = await response.data;
       //console.log('response: ', responseBody)
       dispatch(getStudentsSuccess(responseBody));
   } catch (error) {
      // console.error(error);
       dispatch(getStudentsFailed());
   }
}

/*
const ROOT_URL = 'http://localhost:8000/api/Students';

export const FETCH_STUDENTS = 'fetch_students';

export function fetchStudents() {
    const request = axios.get(ROOT_URL);
    return {
        type: FETCH_STUDENTS,
        payload: request
    };
}
*/