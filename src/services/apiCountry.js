export async function getCountryByName(name) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);

  if (res.ok !== true) throw new Error("Could not load country data");
  const data = await res.json();
  return data;
}
