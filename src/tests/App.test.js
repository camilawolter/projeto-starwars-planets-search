import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import resposeDataTest from './responseDataTest';
import userEvent from '@testing-library/user-event';

describe('Testando se a ocorre a renderazação corretamente da página', () => {

  test('Renderiza o formulário na página', () => {
    render(<App />);

    const inputNameFilter = screen.getByTestId('name-filter');
    const inputColumnFilter = screen.getByTestId('column-filter');
    const inputComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByText(/filtrar/i);

    expect(inputNameFilter).toBeInTheDocument();
    expect(inputColumnFilter).toBeInTheDocument();
    expect(inputComparisonFilter).toBeInTheDocument();
    expect(inputValueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
  });

  test('Ocorre uma requisição para a API', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(resposeDataTest),
    });
    const urlAPI = 'https://swapi.dev/api/planets';
    render(<App />);

    expect(global.fetch).toBeCalledWith(urlAPI);
  });

  test('Renderiza a tabela com os dados retornados', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(resposeDataTest),
    });
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
      // const films = await screen.findAllByText(planets[planetIndex].films);
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
      // expect(films.length).toBeGreaterThanOrEqual(1);
      expect(created.length).toBeGreaterThanOrEqual(1);
      expect(edited.length).toBeGreaterThanOrEqual(1);
      expect(url.length).toBeGreaterThanOrEqual(1);

    };
  });

  test('Verifica se ocorre corretamente a filtragem', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(resposeDataTest),
    });
    render(<App />);

    const inputNameFilter = screen.getByTestId('name-filter');
    const planetHoth = await screen.findByText('Hoth');
    
    userEvent.type(inputNameFilter, 'tatooine');
    
    expect(planetHoth).not.toBeInTheDocument();

    const inputColumnFilter = screen.getByTestId('column-filter');
    const inputComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByText(/filtrar/i);

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
    expect(inputValueFilter).toHaveValue(402);
  });
});
