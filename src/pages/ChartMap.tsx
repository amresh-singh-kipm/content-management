import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface coordinate {
  lat: number;
  long: number;
}

interface Country {
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  countryInfo: coordinate;
}

interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

const ChartMap: React.FC = () => {
  const [worldData, setWorldData] = useState<any>({});
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [graphData, setGraphData] = useState<HistoricalData | null>(null);

  useEffect(() => {
    // Fetch worldwide data
    axios.get("https://disease.sh/v3/covid-19/all").then((response) => {
      setWorldData(response.data);
    });

    // Fetch country-specific data
    axios.get("https://disease.sh/v3/covid-19/countries").then((response) => {
      setCountryData(response.data);
    });

    // Fetch graph data for cases
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((response) => {
        setGraphData(response.data);
      });
  }, []);

  const lineChartData = graphData
    ? Object.keys(graphData.cases).map((date) => ({
        date,
        cases: graphData.cases[date],
        deaths: graphData.deaths[date],
        recovered: graphData.recovered[date],
      }))
    : [];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">COVID-19</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Graph */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Worldwide Cases Fluctuation
          </h2>
          <LineChart
            width={500}
            height={300}
            data={lineChartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            barSize={10}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="cases"
              name="Cases"
              stroke="#8884d8"
            />
            <Line
              type="monotone"
              dataKey="deaths"
              name="Deaths"
              stroke="#ff7300"
            />
            <Line
              type="monotone"
              dataKey="recovered"
              name="Recovered"
              stroke="#008000"
            />
          </LineChart>
        </div>

        {/* Map */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">COVID-19 Map</h2>
          <MapContainer style={{ height: "400px", width: "100%" }} center={[0, 0]} zoom={2}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {countryData.map((country) => (
              <Marker
                key={country.country}
                position={[country.countryInfo.lat, country.countryInfo.long]}
              >
                <Popup>
                  <h3>{country.country}</h3>
                  <p>Total Cases: {country.cases}</p>
                  <p>Total Deaths: {country.deaths}</p>
                  <p>Total Recovered: {country.recovered}</p>
                  <p>Total Active: {country.active}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartMap;
