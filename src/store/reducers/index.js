import { combineReducers } from 'redux';
import starwarsReducer from './starwars';

const rootReducer = combineReducers({
    starwarsReducer: starwarsReducer
});

export default rootReducer;