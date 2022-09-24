import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchPlanetsAPI from '../services';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [planetsFilter, setPlanetsFilter] = useState([]);
  const [planetsFilterNumeric, setPlanetsFilterNumeric] = useState({
    filterByNumericValues: [],
  });
  const [newArray, setNewArray] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanetsAPI();
      const newArrayPlanets = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(newArrayPlanets);
      setPlanetsFilter(newArrayPlanets);
    };
    getPlanets();
  }, []);

  const handleFilterName = (name) => {
    if (name === '') setPlanetsFilter(planets);
    const filter = planets.filter((planet) => (
      planet.name.toLowerCase().includes(name.toLowerCase())
    ));
    setPlanetsFilter(filter);
  };

  const handleFilter = (comparison, column, value, arrayToFilte) => {
    const filter = arrayToFilte.filter((planet) => {
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
    return filter;
  };

  const handleFilterNumeric = ({ column, comparison, value }) => {
    setPlanetsFilterNumeric((prevState) => ({
      filterByNumericValues: [
        ...prevState.filterByNumericValues,
        { column, comparison, value },
      ],
    }));
    const filter = handleFilter(comparison, column, value, planetsFilter);
    setPlanetsFilter(filter);
  };

  const filterFuncRemove = (comparison, column, value) => {
    let arrayCopy = [...newArray];
    if (arrayCopy.length === 0) arrayCopy = [...planets];
    const filter = handleFilter(comparison, column, value, arrayCopy);
    setNewArray(filter);
    return filter;
  };

  const removeFilters = (removed) => {
    setPlanetsFilterNumeric((prevState) => ({
      filterByNumericValues: [
        ...prevState.filterByNumericValues.filter(({ column }) => column !== removed),
      ],
    }));
    const prevStateFilterNum = planetsFilterNumeric.filterByNumericValues
      .filter(({ column }) => column !== removed);
    if (prevStateFilterNum.length === 0) return setPlanetsFilter(planets);
    let nerArrayFilter = [];
    prevStateFilterNum.forEach((filter) => {
      nerArrayFilter = filterFuncRemove(filter.comparison, filter.column, filter.value);
    });
    setPlanetsFilter(nerArrayFilter);
  };

  const removeAll = () => {
    setPlanetsFilterNumeric((prevState) => ({
      ...prevState,
      filterByNumericValues: [],
    }));
    let arrayCopy = [...newArray];
    if (arrayCopy.length === 0) arrayCopy = [...planets];
    setPlanetsFilter(arrayCopy);
  };

  const context = {
    planets,
    planetsFilter,
    handleFilterName,
    planetsFilterNumeric,
    handleFilterNumeric,
    removeAll,
    removeFilters,
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
