import { useState, useEffect } from "react";
import Select from "react-select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import './MainConent.css'
import HeatMap from "./HeatMap";

const MainContent = () => {
  // API Endpoints
  const baseURL = "https://coreapi.hectorai.live/api/day-parting"; // Replace with actual base URL
  const metricOptionsURL = `${baseURL}/DayPartingFilterList`;
  const chartDataURL = `${baseURL}/DayPartingPerformanceGraphList`;
  const heatMapDataURL = `${baseURL}/heatmap-list`;
  const token = localStorage.getItem("token");

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-USER-IDENTITY":"U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg==" // Update this accordingly
    },
  };

  // States
  const [metricOptions, setMetricOptions] = useState( [
    
  ]);
  const [chartData, setChartData] = useState([]);
  const [heatMapData, setHeatMapData] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([
   {label: "CPC",value:"CPC"},
   {label: "CR %",value:"CR_perc"},
   {label: "ROAS",value:"ROAS"},
  ]);
  const [error, setError] = useState(null);

  // Fetch metric options
  useEffect(() => {
    const fetchMetricsOptions = async () => {
      try {
        const response = await axios.post(metricOptionsURL, { type: "customizeMetrics" }, headers);
        setMetricOptions(
          response.data.result.map((metric) => ({
            value: metric.code,
            label: metric.label,
          }))
        );
      } catch (err) {
        setError("Failed to fetch metric options.");
        console.error(err);
      }
    };
    fetchMetricsOptions();
  }, []);

  // Fetch chart data and heatmap data
  useEffect(() => {
    const fetchData = async () => {
      if (selectedMetrics.length === 0) return;

      const metrics = selectedMetrics.map((metric) => metric.value);
     
      const body = {
        startDate: "2024-06-08",
        endDate: "2024-07-07",
        metrics,
      };

      try {
        // Fetch chart data
        
        const chartResponse = await axios.post(chartDataURL, body, headers);
        const { success, result } = chartResponse.data;

        if (success && result) {
          const transformedData = result.categories.map((category, index) => {
            const dataPoint = { name: category };
            result.series.forEach((series) => {
              dataPoint[series.name] = series.data[index];
            });
            return dataPoint;
          });
          setChartData(transformedData);
        } else {
          setError("Failed to retrieve chart data.");
        }

        // Fetch heatmap data
        const heatMapResponse = await axios.post(heatMapDataURL, body, headers);
        setHeatMapData(heatMapResponse.data);
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      }
    };

    fetchData();
  }, [selectedMetrics]);

  return (
    <div className="main-content p-4">
      <h2>Dashboard Overview</h2>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Metrics Dropdown */}
      <div className="card p-3 mb-4">
        <h4>Metrics Dropdown</h4>
        <Select
          isMulti
           value={selectedMetrics}
          options={metricOptions}
          onChange={(selectedOptions) => setSelectedMetrics(selectedOptions)}
          placeholder="Select metrics..."
          className="metrics-dropdown"
        />
      </div>

      {/* Performance Line Chart */}
      <div className="card p-3 mb-4">
        <h4>Performance Line Chart</h4>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedMetrics.map((metric) => (
                <Line
                  key={metric.value}
                  type="monotone"
                  dataKey={metric.value}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      {/* Heat Map */}
      <div className="card p-3">
        <h4>Heat Map</h4>
        <HeatMap apiResponse={heatMapData} />
      </div>
    </div>
  );
};

export default MainContent;
