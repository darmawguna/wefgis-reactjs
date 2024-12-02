// custom-hooks/useWaterLevelData.js
import { useEffect, useState, useMemo } from "react";
import io from "socket.io-client";

import useFetchSensorData from "../components/custom-hooks/SensorFetchHooks";
import { useMapStore } from "../store/MapStore";

const useWaterLevelData = () => {
  const { selectedSensor, setSelectedSensor, sensor } = useMapStore((state) => ({
    selectedSensor: state.selectedSensor,
    setSelectedSensor: state.setSelectedSensor,
    sensor: state.sensor,
  }));

  const [dataPoints, setDataPoints] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [latestData, setLatestData] = useState({ time: "No data", value: "No data", location: "No data" });

  // Fetch sensor data
  useFetchSensorData();

  // Handle WebSocket connection and data handling
  useEffect(() => {
    const socket = io("https://api.fmews.wefgis.com/water-levels");
    // TODO ubah alamat api menjadi https://api.fmews.wefgis-sync.com/water-levels

    socket.on("connect", () => {
      setIsConnected(true);
      sensor.forEach((sensor) => {
        socket.emit("selectSensor", sensor.id);
      });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("water-level", (data) => {
      const sensorId = data.sensorId;

      if (sensorId === selectedSensor?.id) {
        const formattedTime = new Date(data.timestamp).toLocaleDateString("en-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Bangkok",
        });

        const waterLevelInCm = data.water_level;

        setLatestData({ time: formattedTime, value: waterLevelInCm, location: data.location });
      }

      setDataPoints((prevData) => {
        const newData = {
          ...prevData,
          [sensorId]: (prevData[sensorId] || []).concat({
            time: new Date(data.timestamp).toLocaleTimeString("en-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
              timeZone: "Asia/Bangkok",
            }),
            value: data.water_level / 100,
          }),
        };

        Object.keys(newData).forEach((key) => {
          if (newData[key].length > 7) {
            newData[key] = newData[key].slice(-7);
          }
        });

        return newData;
      });
    });

    return () => {
      socket.off("water-level");
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [sensor, selectedSensor]);

  // Memoize the sensors list to prevent unnecessary re-renders
  const memoizedSensors = useMemo(() => sensor, [sensor]);

  return {
    selectedSensor,
    dataPoints,
    isConnected,
    latestData,
    sensors: memoizedSensors,
    setSelectedSensor,
  };
};

export default useWaterLevelData;
