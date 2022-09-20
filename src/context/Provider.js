import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchPlanetsAPI from '../services';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [planetsFilterName, setPlanetsFilterName] = useState([]);

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

  const context = {
    planets,
    planetsFilterName,
    handleFilterName,
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
