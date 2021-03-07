import { put, takeEvery, call } from 'redux-saga/effects';
import * as StarwarsActions from '../actions/starwars';
import * as actionTypes from '../actions/actionTypes';
import { starwarsApi } from '../../api/starwars';

function* getPlanetsSaga() {
    try {
        const planetsData = yield call(() => starwarsApi.getPlanets());
        yield put(StarwarsActions.fetchPlanetsSuccess(planetsData));
    } catch (err) {
        yield put(StarwarsActions.fetchPlanetsFailed(err));
    }
}

function* getVehiclesSaga() {
    try {
        const vehicleData = yield call(() => starwarsApi.getVehicles());
        yield put(StarwarsActions.fetchVehiclesSuccess(vehicleData));
    } catch (err) {
        yield put(StarwarsActions.fetchVehiclesFailed(err));
    }
}

const sagas = [
    takeEvery(actionTypes.FETCH_PLANETS, getPlanetsSaga),
    takeEvery(actionTypes.FETCH_VEHICLES, getVehiclesSaga)
];

export default sagas;