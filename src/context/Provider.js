import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchPlanetsAPI from '../services';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanetsAPI();
      const newArrayPlanets = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(newArrayPlanets);
    };
    getPlanets();
  }, []);

  const context = {
    planets,
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
