import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function FilterName() {
  const { handleFilterName } = useContext(Context);

  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
  });

  const handleChange = ({ target: { value: valueFilter } }) => {
    setFilter({
      filterByName: {
        name: valueFilter,
      },
    });
    handleFilterName(valueFilter);
  };
  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Search by name"
        onChange={ handleChange }
        value={ filter.filterByName.name }
      />
    </section>
  );
}

export default FilterName;
