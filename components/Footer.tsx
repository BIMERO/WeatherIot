"use client";

import React, { useEffect, useState } from "react";
import { TbWind } from "react-icons/tb";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AiOutlineMoon } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import { LuCloudRainWind } from "react-icons/lu";
import { FaTemperatureHalf } from "react-icons/fa6";
import { BsDroplet } from "react-icons/bs";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Parallax,
} from "swiper/modules";

const Footer = () => {
  const [tempIn, setTempIn] = useState(0);
  const [tempOut, setTempOut] = useState(0);
  const [humIn, setHumIn] = useState(0);
  const [humOut, setHumOut] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [windDirection, setWindDirection] = useState("NA");
  const [windSpeed, setWindSpeed] = useState(0);
  const [windAvg, setWindAvg] = useState(0);

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const loginRes = await fetch("/api/tb-login", { method: "POST" });
        const login = await loginRes.json();

        if (!login.token) throw new Error("Missing TB token");

        const settingRes = await fetch("/api/settings");
        const setting = await settingRes.json();

        if (!setting.data) throw new Error("Missing device settings");

        const { entityType, entityId } = setting.data;

        const wsUrl = `wss://thingsboard.cloud/api/ws/plugins/telemetry?token=${login.token}`;
        const webSocket = new WebSocket(wsUrl);

        webSocket.onopen = () => {
          console.log("WebSocket opened ✅");

          const subscribeMsg = {
            tsSubCmds: [
              {
                entityType,
                entityId,
                scope: "LATEST_TELEMETRY",
                cmdId: 1,
              },
            ],
            historyCmds: [],
            attrSubCmds: [],
          };

          webSocket.send(JSON.stringify(subscribeMsg));
        };

        webSocket.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          console.log("Message:", msg);

          // ✅ Wait for auth success response
          if (msg.status === "SUCCESS" || msg.authCmdResponse?.success) {
            console.log("Authenticated successfully ✅");

            // Now subscribe to telemetry
            const subscribe = {
              cmds: [
                {
                  entityType,
                  entityId,
                  scope: "LATEST_TELEMETRY",
                  cmdId: 10,
                  type: "TIMESERIES",
                },
              ],
            };
            webSocket.send(JSON.stringify(subscribe));
            return;
          }

          // ✅ Handle telemetry updates
          if (msg.data) {
            const d = msg.data;
            setTempIn(d.tempIn?.[0]?.[1]);
            setTempOut(d.tempOut?.[0]?.[1]);
            setHumIn(d.humIn?.[0]?.[1]);
            setHumOut(d.humOut?.[0]?.[1]);
            setWindDirection(d.windDirection?.[0]?.[1]);
            setWindSpeed(d.windSpeed?.[0]?.[1]);
            setWindAvg(d.windAvg?.[0]?.[1]);
            setRainfall(d.rainfall?.[0]?.[1]);
            setPressure(d.pressure?.[0]?.[1]);
          }
        };

        webSocket.onerror = (err) => {
          console.error("WebSocket error ❌", err);
        };

        webSocket.onclose = () => {
          console.warn("WebSocket closed ❌");
        };

        return () => webSocket.close();
      } catch (error) {
        console.error("Error connecting to ThingsBoard:", error);
      }
    };

    fetchLoginData();
  }, []);

  return (
    <section className="flex flex-col">
      <div className="flex justify-between mx-4">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <h3 className="text-2xl">Wind</h3>
            <TbWind className="rounded-full bg-[#0e1426] p-1 text-3xl" />
          </div>
          <div className="flex gap-2">
            <p className="text-xl text-[#5f6281]">Direction:</p>
            <p className="text-xl text-white">{windDirection}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xl text-[#5f6281]">Speed:</p>
            <p className="text-xl text-white">{windSpeed} m/s</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xl text-[#5f6281]">Average:</p>
            <p className="text-xl text-white">{windAvg}</p>
          </div>
        </div>
        <div className="flex items-end">
          <p className="text-xl text-[#5f6281]">Moon Phase</p>
          <AiOutlineMoon className="text-5xl" />
        </div>
      </div>
      <div className="flex m-4 gap-3 min-h-60">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Autoplay,
            Parallax,
          ]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          <SwiperSlide>
            <Card
              title="Temperature IN"
              icon={<FaTemperatureHalf />}
              value={tempIn}
              unit={"°F"}
              texts={["", "Indoor Temperature", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Humidity IN"
              icon={<BsDroplet />}
              value={humIn}
              unit={"%"}
              texts={["", "Indoor Humidity", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Pressure"
              icon={<BsDroplet />}
              value={pressure}
              unit={"hPa"}
              texts={["", "Absolute Pressure", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Rainfall"
              icon={<LuCloudRainWind />}
              value={rainfall}
              unit={"mm"}
              texts={["", "Total", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Temperature OUT"
              icon={<FaTemperatureHalf />}
              value={tempOut}
              unit={"°F"}
              texts={["", "Outdoor Temperature", ""]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title="Humidity OUT"
              icon={<BsDroplet />}
              value={humOut}
              unit={"%"}
              texts={["", "Outdoor Humidity", ""]}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Footer;
