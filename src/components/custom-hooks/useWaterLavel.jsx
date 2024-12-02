import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useWaterLevelStore } from "../../store/WaterLevelStore";
import { useMapStore } from "../../store/MapStore";

const useWaterLevelData = () => {
  const sensors = useMapStore((state) => state.sensor); 
  const [sensorsReady, setSensorsReady] = useState(false);
  const setDataPoints = useWaterLevelStore((state) => state.setDataPoints);
  const setLatestData = useWaterLevelStore((state) => state.setLatestData);
  // const dataPoints = useWaterLevelStore((state) => state.dataPoints);
  // const latestData = useWaterLevelStore((state) => state.latestData);

  useEffect(() => {
    if (sensors && sensors.length > 0) {
      setSensorsReady(true);
    } else {
      setSensorsReady(false);
    }
  }, [sensors]);

  useEffect(() => {
    if (!sensorsReady || !sensors) {
      return;
    }

    const newSocket = io("https://api.fmews.wefgis-sync.com/water-levels", {
      transports: ["websocket"], // Paksa penggunaan websocket
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    newSocket.on("connect", () => {
      sensors.forEach((sensor) => {
        newSocket.emit("selectSensor", sensor.id);
      });
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    newSocket.on("water-level", (data) => {
      const sensorId = data.sensorId;

      setLatestData(sensorId, {
        time: new Date(data.timestamp).toLocaleDateString("en-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Bangkok",
        }),
        value: data.water_level / 100,
        location: data.location,
      });

      const newPoint = {
        time: new Date(data.timestamp).toLocaleTimeString("en-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Bangkok",
        }),
        value: data.water_level / 100,
      };

      // Menyimpan newPoint ke dataPoints
      setDataPoints(sensorId, newPoint); // Fungsi ini menambahkan data baru ke array dataPoints
    });

    return () => {
      if (newSocket) {
        newSocket.off("water-level");
        newSocket.disconnect();
        console.log("Socket disconnected.");
      }
    };
  }, [sensorsReady, sensors, setDataPoints, setLatestData]);

  // console.log(latestData)

  return {
    dataPoints: useWaterLevelStore((state) => state.dataPoints),
    latestData: useWaterLevelStore((state) => state.latestData),
  };
};

export default useWaterLevelData;
