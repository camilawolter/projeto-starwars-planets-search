import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function FilterNumeric() {
  const {
    planetsFilterNumeric: { filterByNumericValues },
    handleFilterNumeric } = useContext(Context);

  const [filterNumeric, setFilterNum] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleNumeric = ({ target: { value: valueFilter, name } }) => {
    setFilterNum((prevState) => ({
      ...prevState,
      [name]: valueFilter,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFilterNumeric(filterNumeric);
  };

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <select
          data-testid="column-filter"
          onChange={ handleNumeric }
          name="column"
          defaultValue={ filterNumeric.column }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ handleNumeric }
          name="comparison"
          defaultValue={ filterNumeric.comparison }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ handleNumeric }
          name="value"
          value={ filterNumeric.value }
        />
        <button type="submit" data-testid="button-filter">Filtrar </button>
      </form>
      {
        filterByNumericValues.map(({ column, comparison, value }, index) => (
          <div key={ index }>
            {
              `${column} ${comparison} ${value}`
            }
          </div>
        ))
      }
    </section>
  );
}

export default FilterNumeric;
