export async function getCountryByName(name) {
  const res = await fetch(`/api/countries/${encodeURIComponent(name)}`);

  if (res.ok !== true) throw new Error("Could not load country data");
  const data = await res.json();
  return data;
}
