import React from 'react';
import { numberWithCommas } from '../../utils/util';
import './BarItem.css';

const BarItem = ({ precentage, population, name }) => {
    const transformedPopulation = numberWithCommas(population);
    return (
        <div className="bar" style={{ height: `${precentage}%` }}>
            <span className="population">{transformedPopulation}</span>
            <span className="name">{name}</span>
        </div>
    );
};

export default BarItem;