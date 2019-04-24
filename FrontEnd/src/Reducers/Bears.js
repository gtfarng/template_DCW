export const bearReducer = (state = 0, action) => {
    switch (action.type) {
        case 'GET_BEARS_SUCCESS':
          //  console.log('action: ', action.bears)
            return action.bears
        case 'GET_BEARS_FAILED':
          //  console.log('action: Failed')
            return action.bears
        default:
            return state
    }
}