export default async function getWeatherData(country) {
  // const url = `http://api.weatherapi.com/v1/forecast.json?key=895fb287bbeb4893b53113710231002&q=${country}&days=8`;
  const url= `https://api.weatherapi.com/v1/forecast.json?key=895fb287bbeb4893b53113710231002&q=${country}&days=8`;

  const request = await fetch(url);
  const data = await request.json();
  return data;
}
