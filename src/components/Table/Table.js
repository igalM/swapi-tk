import React from 'react';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../utils/util';
import './Table.css';

const Table = () => {
    const vehicleData = useSelector(state => state.starwarsReducer.vehicleData);
    const error = useSelector(state => state.starwarsReducer.error);

    if (error) return <h1>An error occured! Please contact the site builder!</h1>;

    const worlds = Object.values(vehicleData.worlds).map((item, i) =>
        <span key={`${item.planetName}${i}`}>{item.planetName} - {numberWithCommas(item.planetPopulation)}</span>
    );
    const pilots = vehicleData.pilots.map((item, i) =>
        <span key={`${item}${i}`}>{item}</span>
    );

    return (
        <table className="table">
            <tbody>
                <tr>
                    <td>Vehicle name with the largest sum</td>
                    <td>{vehicleData.vehicleName}</td>
                </tr>
                <tr>
                    <td>Related home planets and their respective population</td>
                    <td>{worlds}</td>
                </tr>
                <tr>
                    <td>Related pilot names</td>
                    <td>{pilots}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;