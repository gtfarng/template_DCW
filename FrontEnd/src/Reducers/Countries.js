export const countryReducer = (state = 0, action) => {
  switch (action.type) {
      case 'GET_COUNTRIES_SUCCESS':
        //  console.log('action: ', action.countries)
          return action.countries
      case 'GET_COUNTRIES_FAILED':
        //  console.log('action: Failed')
          return action.countries
      default:
          return state
  }
}