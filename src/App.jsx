import { useEffect, useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [details, setDetails] = useState([]);

  const url = `https://restcountries.com/v3.1/name/${searchQuery}?fullText=true`;

  const getData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        setDetails(data);
      } else {
        setDetails([]);
      }
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [searchQuery]);

  return (
    <main className="flex items-center justify-center bg-blue-600 h-screen w-screen">
      <div className="flex items-center justify-center bg-white h-auto w-[35rem] rounded-lg flex-col">
        <div className="flex gap-2 m-8">
          <input
            type="text"
            placeholder="Enter country name"
            className="px-3 py-2 outline-none border-b-2 border-black text-xl capitalize"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-fuchsia-600 rounded-md text-xl"
            onClick={getData}
          >
            Search
          </button>
        </div>
        {details.map((country) => (
          <div className="flex flex-col gap-4 m-4" key={country.id}>
            <div className="flex items-center justify-center flex-col gap-1">
              <img
                src={country.flags?.svg}
                alt=""
                className="h-[11rem] w-[20rem]"
              />
              <span className="text-2xl font-bold text-blue-600 uppercase">
                {country.name?.common}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl">
                <span className="text-xl font-medium text-fuchsia-700">
                  Capital:
                </span>
                {country.capital}
              </p>
              <p className="text-xl">
                <span className="text-xl font-medium text-fuchsia-700">
                  Continent:
                </span>
                {country.continents?.[0]}
              </p>
              <p className="text-xl">
                <span className="text-xl font-medium text-fuchsia-700">
                  Population:
                </span>
                {country.population}
              </p>
              <p className="text-xl">
                <span className="text-xl font-medium text-fuchsia-700">
                  Currency:
                </span>
                {country.currencies && country.currencies[0]?.symbol
                  ? country.currencies[0].symbol
                  : "Not available"}
              </p>
              <p className="text-xl">
                <span className="text-xl font-medium text-fuchsia-700">
                  Common Language:
                </span>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "Not available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
