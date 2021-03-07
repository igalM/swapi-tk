import * as actionTypes from '../actions/actionTypes';

const initialState = {
    planetsData: [],
    vehicleData: {
        worlds: {},
        pilots: []
    },
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PLANETS_SUCCESS:
            return {
                ...state,
                planetsData: action.payload
            };
        case actionTypes.FETCH_VEHICLES_SUCCESS:
            return {
                ...state,
                vehicleData: action.payload
            };
        case actionTypes.FETCH_PLANETS_FAILED:
        case actionTypes.FETCH_VEHICLES_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;