import * as actionTypes from './actionTypes';

export const fetchPlanets = () => ({
    type: actionTypes.FETCH_PLANETS
});

export const fetchPlanetsSuccess = payload => ({
    type: actionTypes.FETCH_PLANETS_SUCCESS,
    payload
});

export const fetchPlanetsFailed = () => ({
    type: actionTypes.FETCH_PLANETS_FAILED
});

export const fetchVehicles = () => ({
    type: actionTypes.FETCH_VEHICLES
});

export const fetchVehiclesSuccess = payload => ({
    type: actionTypes.FETCH_VEHICLES_SUCCESS,
    payload
});

export const fetchVehiclesFailed = () => ({
    type: actionTypes.FETCH_VEHICLES_FAILED
});