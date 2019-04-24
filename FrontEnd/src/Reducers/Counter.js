export const numberReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD':
            //console.log('my add...')
            return state + 1
        case 'MINUS':
            return state - 1
        case 'RESET':
            return 0
        case 'ADD2':
            return state + action.number
        default:
            return state
    }
}

