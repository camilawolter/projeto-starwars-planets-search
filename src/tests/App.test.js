import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import resposeDataTest from './responseDataTest';
import userEvent from '@testing-library/user-event';

describe('Testando se a ocorre a renderazação corretamente da página', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(resposeDataTest),
    });
  });
  afterEach(() => jest.clearAllMocks);

  test('Renderiza o formulário na página', () => {
    render(<App />);

    const inputNameFilter = screen.getByTestId('name-filter');
    const inputColumnFilter = screen.getByTestId('column-filter');
    const inputComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const buttonRemoveAllFilters = screen.getByTestId('button-remove-filters');

    expect(inputNameFilter).toBeInTheDocument();
    expect(inputColumnFilter).toBeInTheDocument();
    expect(inputComparisonFilter).toBeInTheDocument();
    expect(inputValueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(buttonRemoveAllFilters).toBeInTheDocument();
  });

  test('Ocorre uma requisição para a API', async () => {
    render(<App />);

    const urlAPI = 'https://swapi.dev/api/planets';

    expect(global.fetch).toBeCalledWith(urlAPI);
  });

  test('Renderiza a tabela com os dados retornados', async () => {
    render(<App />);

    const planets = resposeDataTest.results;
    for (let planetIndex in planets) {
      const name = await screen.findByText(planets[planetIndex].name);
      const rotationPeriod = await screen.findAllByText(planets[planetIndex].rotation_period);
      const orbitalPeriod = await screen.findAllByText(planets[planetIndex].orbital_period);
      const diameter = await screen.findAllByText(planets[planetIndex].diameter);
      const climate = await screen.findAllByText(planets[planetIndex].climate);
      const gravity = await screen.findAllByText(planets[planetIndex].gravity);
      const terrain = await screen.findAllByText(planets[planetIndex].terrain);
      const surfaceWater = await screen.findAllByText(planets[planetIndex].surface_water);
      const population = await screen.findAllByText(planets[planetIndex].population);
      const created = await screen.findAllByText(planets[planetIndex].created);
      const edited = await screen.findAllByText(planets[planetIndex].edited);
      const url = await screen.findAllByText(planets[planetIndex].url);


      expect(name).toBeInTheDocument();
      expect(rotationPeriod.length).toBeGreaterThanOrEqual(1);
      expect(orbitalPeriod.length).toBeGreaterThanOrEqual(1);
      expect(diameter.length).toBeGreaterThanOrEqual(1);
      expect(climate.length).toBeGreaterThanOrEqual(1);
      expect(gravity.length).toBeGreaterThanOrEqual(1);
      expect(terrain.length).toBeGreaterThanOrEqual(1);
      expect(surfaceWater.length).toBeGreaterThanOrEqual(1);
      expect(population.length).toBeGreaterThanOrEqual(1);
      expect(created.length).toBeGreaterThanOrEqual(1);
      expect(edited.length).toBeGreaterThanOrEqual(1);
      expect(url.length).toBeGreaterThanOrEqual(1);

    };
  });

  test('Testando os botões de filtro (MAIOR QUE)', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(resposeDataTest),
    });
    render(<App />);

    await waitFor(() => {
      const planet = screen.getByText(/Tatooine/i);
      expect(planet).toBeInTheDocument();
    });

    const inputNameFilter = screen.getByTestId('name-filter');
    const planetHoth = await screen.findByText('Hoth');

    userEvent.type(inputNameFilter, 'tatooine');

    expect(planetHoth).not.toBeInTheDocument();

    const inputColumnFilter = screen.getByTestId('column-filter');
    const inputComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    expect(inputColumnFilter).toHaveValue('population');
    expect(inputComparisonFilter).toHaveValue('maior que');
    expect(inputValueFilter).toHaveValue(0);

    userEvent.click(inputColumnFilter)
    userEvent.click(screen.getAllByText('orbital_period')[0]);
    userEvent.click(inputComparisonFilter);
    userEvent.click(screen.getByText('igual a'));
    userEvent.type(inputValueFilter, '402');
    userEvent.click(buttonFilter);

    expect(screen.getByText('orbital_period')).toBeInTheDocument();
    expect(screen.getByText('igual a')).toBeInTheDocument();
    expect(inputValueFilter).toHaveValue(0);

    const planets = screen.getAllByRole('row');
    expect(planets).toHaveLength(2);

  });
  test('Testando os botões de filtro (MENOR QUE)', async () => {
    render(<App />);

    const inputNameFilter = screen.getByTestId('name-filter');

    userEvent.click(inputNameFilter);
    userEvent.type(inputNameFilter, 'tatooine');

    const inputColumnFilter = screen.getByTestId('column-filter');
    const inputComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(
      inputColumnFilter,
      screen.getAllByRole('option', { name: 'diameter' })[0],
    );
    userEvent.selectOptions(
      inputComparisonFilter,
      screen.getAllByRole('option', { name: 'menor que' })[0],
    )

    userEvent.click(inputValueFilter);
    userEvent.type(inputValueFilter, '10466');

    userEvent.click(buttonFilter);
    userEvent.click(buttonFilter);
    userEvent.click(buttonFilter);

    const buttonRemoveFilter = screen.getAllByText('Remover');

    userEvent.click(buttonRemoveFilter[0]);

    expect(screen.getByText('menor que')).toBeInTheDocument();

    const buttonRemoveAllFilters = screen.getByTestId('button-remove-filters');

    userEvent.click(buttonRemoveAllFilters);

    const planets =  screen.getAllByRole('row');

    expect(planets).toHaveLength(11);
  });
  test('Testando os botões de filtro (IGUAL A)', async () => {
    render(<App />);

    const inputNameFilter = screen.getByTestId('name-filter');

    userEvent.click(inputNameFilter);
    userEvent.type(inputNameFilter, 'tatooine');

    const inputColumnFilter = screen.getByTestId('column-filter');
    const inputComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(
      inputColumnFilter,
      screen.getAllByRole('option', { name: 'diameter' })[0],
    );
    userEvent.selectOptions(
      inputComparisonFilter,
      screen.getAllByRole('option', { name: 'igual a' })[0],
    )

    userEvent.click(inputValueFilter);
    userEvent.type(inputValueFilter, '10466');

    userEvent.click(buttonFilter);

    const buttonRemoveFilter = screen.getAllByText('Remover');

    userEvent.click(buttonRemoveFilter[0]);

    expect(screen.getByText('igual a')).toBeInTheDocument();

    const buttonRemoveAllFilters = screen.getByTestId('button-remove-filters');

    userEvent.click(buttonRemoveAllFilters);

    const planets =  screen.getAllByRole('row');

    expect(planets).toHaveLength(11);
  });
});
