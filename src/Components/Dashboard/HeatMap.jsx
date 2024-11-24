import { useEffect } from "react";
import ApexCharts from "apexcharts";

const HeatMap = ({ apiResponse }) => {
  // Process the API response into heatmap data
  const processHeatmapData = () => {
    if (!apiResponse || !apiResponse.result || !Array.isArray(apiResponse.result)) {
      return [];
    }

    const hourlyGroups = {};

    // Group data by hour and metrics
    apiResponse.result.forEach((day) => {
      if (day.Hourly_Data) {
        day.Hourly_Data.forEach((hour) => {
          Object.keys(hour).forEach((key) => {
            if (key !== "show" && key !="time_part") {
              const hourKey = hour.time_part; // Use hour as row identifier
              const dayKey = `${day.weekday}-${key}`; // Combine day and metric for unique columns

              if (!hourlyGroups[hourKey]) {
                hourlyGroups[hourKey] = {};
              }
              hourlyGroups[hourKey][dayKey] = hour[key] ?? null;
            }
          });
        });
      }
    });

    // Convert data into heatmap series
    const series = Object.entries(hourlyGroups).map(([hour, values]) => ({
      name: hour, // Each row is an hour
      data: Object.entries(values).map(([dayMetric, value]) => ({
        x: dayMetric,
        y: value,
      })),
    }));

    return series;
  };

  // Render heatmap chart
  const renderHeatmap = () => {
    const series = processHeatmapData();

    const options = {
      chart: {
        type: "heatmap",
        height: 600,
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              { from: 0, to: 5, color: "#FFB6C1", name: "Low" },
              { from: 5, to: 10, color: "#FFC300", name: "Medium" },
              { from: 10, to: 20, color: "#00A36C", name: "High" },
            ],
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => (val !== null ? val.toFixed(2) : ""),
      },
      xaxis: {
        type: "category",
        title: { text: "Day and Metric" },
      },
      yaxis: {
        title: { text: "Hour of Day" },
      },
      title: {
        text: `Heatmap: Daily Metrics by Hour`,
        align: "center",
      },
      series,
    };

    const chartElement = document.querySelector("#heatmap");
    if (chartElement) {
      const chart = new ApexCharts(chartElement, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  };

  useEffect(() => {
    const cleanup = renderHeatmap();
    return cleanup;
  }, [apiResponse]);

  return <div id="heatmap"></div>;
};

export default HeatMap;
