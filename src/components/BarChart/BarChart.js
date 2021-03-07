import React from 'react';
import { useSelector } from 'react-redux';
import { calcHighestPopulation, calcPercentage } from '../../utils/util';
import BarItem from '../BarItem/BarItem';
import './BarChart.css';

const BarChart = () => {
    const planetsData = useSelector(state => state.starwarsReducer.planetsData);
    const error = useSelector(state => state.starwarsReducer.error);

    const highestPopulation = calcHighestPopulation(planetsData);

    if (error) return <h1>An error occured! Please contact the site builder!</h1>;

    const barChart = planetsData.map((item, i) => {
        let precentage = calcPercentage(parseInt(item.population), highestPopulation);
        return <BarItem key={`${item.population}${i}`} {...item} precentage={precentage} />
    });

    return (
        <div className="chart">
            {barChart}
        </div>
    );
};

export default BarChart;