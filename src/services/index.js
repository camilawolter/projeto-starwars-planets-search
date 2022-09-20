const API_PLANETS = 'https://swapi.dev/api/planets';

const fetchPlanetsAPI = async () => {
  const response = await fetch(API_PLANETS);
  const json = await response.json();
  return json;
};

export default fetchPlanetsAPI;
