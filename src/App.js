import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import BarChart from './components/BarChart/BarChart';
import Table from './components/Table/Table';
import * as StarwarsActions from './store/actions/starwars';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StarwarsActions.fetchPlanets());
    dispatch(StarwarsActions.fetchVehicles());
  }, []);


  return (
    <div className="container">
      <h1>Counting every alien in the galaxy takes some time, please be patient!</h1>
      <Table />
      <BarChart />
    </div>
  );
}

export default App;