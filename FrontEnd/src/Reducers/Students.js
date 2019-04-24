//import {FETCH_STUDENTS } from '../Actions/Students';

export const studentReducer = (state = 0, action) => {
    switch (action.type) {
        case 'GET_STUDENTS_SUCCESS':
         //   console.log('action: ', action.students)
            return action.students
        case 'GET_STUDENTS_FAILED':
          //  console.log('action: Failed')
            return action.students     
        default:
            return state
    }
}
/*
export const newstudentReducer = (state = 0, action) => {
    switch(action.type) {
        case FETCH_STUDENTS:
            return action.payload.data;
        default:
            return state;
    }
}

*/