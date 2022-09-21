import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchPlanetsAPI from '../services';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [planetsFilterName, setPlanetsFilterName] = useState([]);
  const [planetsFilterNumeric, setPlanetsFilterNumeric] = useState({
    filterByNumericValues: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanetsAPI();
      const newArrayPlanets = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(newArrayPlanets);
      setPlanetsFilterName(newArrayPlanets);
    };
    getPlanets();
  }, []);

  const handleFilterName = (name) => {
    if (name === '') setPlanetsFilterName(planets);
    const filter = planets.filter((planet) => (
      planet.name.toLowerCase().includes(name.toLowerCase())
    ));
    setPlanetsFilterName(filter);
  };

  const handleFilterNumeric = ({ column, comparison, value }) => {
    setPlanetsFilterNumeric((prevState) => ({
      filterByNumericValues: [
        ...prevState.filterByNumericValues,
        { column, comparison, value },
      ],
    }));
    const filter = planetsFilterName.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > value;
      case 'menor que':
        return Number(planet[column]) < value;
      case 'igual a':
        return Number(planet[column]) === Number(value);
      default:
        return false;
      }
    });
    setPlanetsFilterName(filter);
  };

  const context = {
    planets,
    planetsFilterName,
    handleFilterName,
    planetsFilterNumeric,
    handleFilterNumeric,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
