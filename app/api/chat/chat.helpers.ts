import { fetchFacade } from "@/services/fetchFacade";

export const getCurrentWeather = async (params: string) => {
  const { location } = JSON.parse(params);

  const resp =
    await fetchFacade(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=no
  `);

  return resp;
};
