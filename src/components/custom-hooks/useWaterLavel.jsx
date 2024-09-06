import { useState, useEffect } from "react";
import io from "socket.io-client";

const useWaterLevelData = (sensor) => {
  const [dataPoints, setDataPoints] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [latestData, setLatestData] = useState({ time: "No data", value: "No data", location: "No data" });

  useEffect(() => {
    const socket = io("http://localhost:3000/water-levels");

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("selectSensor", sensor.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("sensorSelected", (message) => {
      console.log(message);
    });

    socket.on("water-level", (data) => {
      const sensorId = data.sensorId;

      // Update the latest data for the selected sensor
      if (sensorId === sensor.id) {
        // TODO pastikan agar semua data tersimpan dan ketika tidak memilih sensor koneksi websocket tetap terhubung
        const formattedTime = new Date(data.timestamp).toLocaleDateString("en-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Bangkok",
        });

        const waterLevelInCm = data.water_level;

        setLatestData({ time: formattedTime, value: waterLevelInCm, location: data.location });
      }

      // Update data points for all sensors
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

        // Limit the data points to the latest 7 points
        if (newData[sensorId].length > 7) {
          newData[sensorId] = newData[sensorId].slice(-7);
        }

        return newData;
      });
    });

    return () => {
      socket.off("water-level");
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [sensor,]);

  return { dataPoints, isConnected, latestData };
};

export default useWaterLevelData;
