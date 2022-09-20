import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Table() {
  const { planetsFilterName, handleFilterName } = useContext(Context);

  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
  });

  const handleChange = ({ target: { value } }) => {
    setFilter({
      filterByName: {
        name: value,
      },
    });
    handleFilterName(value);
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetsFilterName.map(({
            name,
            rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: surfaceWater,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ name }>
              <td>{name}</td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>{films}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

  );
}

export default Table;
