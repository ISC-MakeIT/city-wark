import React, { useState, useEffect } from "react";
import axios from "axios";
import { WeatherData } from "../data/Weather";

const API_KEY = "36f79fb4e81e59745a7e56ca678a2594"; // OpenWeatherMapのAPIキー
const CITY = "Kanagawa"; // 対象都市

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bgGradient, setBgGradient] = useState<string>("linear-gradient(180deg, #D3D3D3 0%, #A9A9A9 50%, #FFF 100%)");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (err) {
        setError("天気情報を取得できませんでした。");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // 天気に応じた背景色を適用
  useEffect(() => {
    if (weather) {
      setBgGradient(getBackgroundGradient(weather.weather[0].main));
    }
  }, [weather]);

  // 天気に応じたグラデーション背景を取得
  const getBackgroundGradient = (weatherType: string): string => {
    switch (weatherType) {
      case "Clear": // 晴れ
        return "linear-gradient(180deg, #CFEBF7 0%, #A0D8EF 31.67%, #FFF 100%);";
      case "Clouds": // 曇り
        return "linear-gradient(180deg, #CED1D3 25.67%, #FFF 100%);";
      case "Rain": // 雨
        return "background: linear-gradient(180deg, #CED1D3 17.4%, #0F5779 72.4%);";
      case "Snow": // 雪
        return "linear-gradient(180deg, #E0F7FA 0%, #B3E5FC 50%, #FFF 100%)";
      case "Thunderstorm": // 雷
        return "linear-gradient(180deg, #483D8B 0%, #8A2BE2 50%, #FFF 100%)";
      case "Drizzle": // 霧雨
        return "linear-gradient(180deg, #87CEFA 0%, #ADD8E6 50%, #FFF 100%)";
      default: // その他
        return "linear-gradient(180deg, #D3D3D3 0%, #A9A9A9 50%, #FFF 100%)";
    }
  };

  if (loading) return <p>天気情報を取得中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        textAlign: "center",
        color: "black",
        padding: "20px",
        height: "100vh",
        backgroundImage: bgGradient, // 背景をグラデーションで変更
        transition: "background 1s ease-in-out",
      }}
    >
      <h2>{weather?.name} の天気</h2>
      <p>天気: {weather?.weather[0].description}</p>
      <p>気温: {weather?.main.temp}°C</p>
      <p>湿度: {weather?.main.humidity}%</p>
      <p>風速: {weather?.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
