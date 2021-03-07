import axios from "axios";

class StarwarsApi {

    planetsNames = ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor'];
    nextPage = true;
    currentPage = 1;
    maxSum = 0;
    cache = {
        people: {},
        planets: {}
    };
    vehicle = {
        pilots: []
    };
    vehicles = [];


    // Part 1

    getVehicles = async () => {
        do {
            const { data } = await axios.get(`${process.env.REACT_APP_VEHICLES_API_URI}${this.currentPage}`);
            for (let i = 0; i < data.results.length; i++) {
                this.vehicles.push({
                    vehicleName: data.results[i].name,
                    pilots: data.results[i].pilots
                });
            }
            this.currentPage++;
            if (!data.next) this.nextPage = false;
        } while (this.nextPage);
        return this.calcHighestPopulation();
    }

    calcHighestPopulation = async () => {
        for (const vehicle of this.vehicles) {
            let tempSum = 0;
            let tempVehicle = {
                pilots: []
            };
            for (let i = 0; i < vehicle.pilots.length; i++) {
                const pilotId = this.splitId(vehicle.pilots[i], 'people');
                if (pilotId in this.cache.people)
                    tempSum += parseInt(this.cache.people[pilotId].planet.planetPopulation);
                else {
                    const population = await this.getPilotHomeworldPopulation(vehicle.pilots[i]);
                    tempSum += parseInt(population);
                }
                tempVehicle = {
                    vehicleName: vehicle.vehicleName,
                    pilots: [...tempVehicle.pilots, pilotId]
                };
            }
            if (tempSum > this.maxSum) {
                this.maxSum = tempSum;
                this.vehicle = tempVehicle;
            }
        }
        const highestPopulatedVehicle = {
            vehicleName: this.vehicle.vehicleName,
            worlds: [],
            pilots: []
        };
        for (const id of this.vehicle.pilots) {
            const pilot = this.cache.people[id];
            highestPopulatedVehicle.worlds.push({
                ...pilot.planet
            });
            highestPopulatedVehicle.pilots.push(pilot.pilotName);
        }
        return highestPopulatedVehicle;
    }

    getPilotHomeworldPopulation = async url => {
        const pilotData = await this.getPilotOrPlanet(url);
        const pilot = pilotData.data;
        const pilotId = this.splitId(url, 'people');
        const planetId = this.splitId(pilot.homeworld, 'planets');
        if (planetId in this.cache.planets) {
            this.cache.people[pilotId] = {
                pilotName: pilot.name,
                planet: {
                    ...this.cache.planets[planetId]
                }
            };
            return this.cache.planets[planetId].planetPopulation;
        } else {
            const planetData = await this.getPilotOrPlanet(pilot.homeworld);
            const planet = planetData.data;
            this.cache.people[pilotId] = {
                pilotName: pilot.name,
                planet: {
                    planetName: planet.name,
                    planetPopulation: planet.population
                }
            };
            this.cache.planets[planetId] = {
                planetName: planet.name,
                planetPopulation: planet.population
            };
            return isNaN(planet.population) ? 0 : planet.population;
        }
    }

    getPilotOrPlanet = url => axios.get(url);

    splitId = (url, type) => {
        let regex = null;
        if (type === 'people') {
            regex = /people\/(\d+)\//;
        } else if (type === 'planets') {
            regex = /planets\/(\d+)\//;
        }
        const splitted = regex.exec(url);
        return splitted[1];
    }

    // Part 2

    getPlanets = async () => {
        const planets = await Promise.all(this.createPlanetsPromiseArray());
        return this.transformPlanetsData(planets);
    }

    createPlanetsPromiseArray = () => {
        return this.planetsNames.reduce((acc, val) => {
            const promise = this.getPlanetByName(val);
            return [...acc, promise];
        }, []);
    }

    getPlanetByName = planetName => axios.get(`${process.env.REACT_APP_PLANETS_API_URI}${planetName}`);

    transformPlanetsData = planets => {
        return planets.map((item, _) => {
            const { name, population } = item.data.results[0];
            return {
                name,
                population
            };
        });
    }

}

export const starwarsApi = new StarwarsApi();