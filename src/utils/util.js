export const numberWithCommas = number => number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

export const calcHighestPopulation = array => Math.max(...array.map(planet => planet.population));

export const calcPercentage = (partialValue, totalValue) => {
    let precentage = (100 * partialValue) / totalValue;
    return precentage < 10 ? precentage + 10 : precentage;
}