import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function FilterNumeric() {
  const {
    planetsFilterNumeric: { filterByNumericValues },
    handleFilterNumeric,
    removeAll,
    removeFilters } = useContext(Context);

  const [filterNumeric, setFilterNum] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleNumeric = ({ target: { value: valueFilter, name } }) => {
    setFilterNum((prevState) => ({
      ...prevState,
      [name]: valueFilter,
    }));
  };

  const optionsColumn = () => {
    const mapColumn = filterByNumericValues.map((filter) => filter.column);
    const columnsFilter = columns.filter((filterColumn) => !mapColumn
      .some((column) => column === filterColumn));
    return columnsFilter
      .map((column, index) => <option key={ index }>{column}</option>);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFilterNumeric(filterNumeric);
    const arrayColumns = columns.filter((column) => column !== filterNumeric.column);
    setColumns(arrayColumns);
    setFilterNum({
      column: arrayColumns[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  const removeFilter = ({ column: removed, comparison, value }) => {
    setColumns((prev) => ([...prev, removed]));
    setFilterNum({ column: removed, comparison: 'maior que', value: 0 });
    removeFilters({ removed, comparison, value });
  };

  const removeAllFilters = () => {
    removeAll(filterByNumericValues);
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
          {
            optionsColumn()
          }
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

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => removeAllFilters() }
      >
        Remover Todos os Filtros
      </button>

      {
        filterByNumericValues.map((values, index) => (
          <div key={ index } data-testid="filter">
            {
              `${values.column} ${values.comparison} ${values.value}`
            }
            <button
              type="button"
              onClick={ () => removeFilter(values) }
            >
              Remover
            </button>
          </div>
        ))
      }
    </section>
  );
}

export default FilterNumeric;
