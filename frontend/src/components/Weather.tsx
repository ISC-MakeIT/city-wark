import React, { useState, useEffect } from "react";
import axios from "axios";
import { WeatherData } from "../data/Weather";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // .env から取得
const CITY_ID = "1848354"; // 神奈川県（横浜）の都市ID

console.log("API_KEY:", API_KEY); // APIキーが適切に取得されているか確認

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bgGradient, setBgGradient] = useState<string>(
      "linear-gradient(180deg, #D3D3D3 0%, #A9A9A9 50%, #FFF 100%)"
  );

  useEffect(() => {
    const fetchWeather = async () => {
      if (!API_KEY) {
        setError("APIキーが設定されていません。");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric&lang=ja`
        );

        console.log("Weather API Response:", response.data); // APIレスポンスを確認
        setWeather(response.data);
      } catch (err) {
        console.error("Weather API Error:", err); // エラー詳細を出力
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
      case "Clear":
        return "linear-gradient(180deg, #CFEBF7 0%, #A0D8EF 31.67%, #FFF 100%)";
      case "Clouds":
        return "linear-gradient(180deg, #CED1D3 25.67%, #FFF 100%)";
      case "Rain":
        return "linear-gradient(180deg, #CED1D3 17.4%, #0F5779 72.4%)";
      case "Snow":
        return "linear-gradient(180deg, #E0F7FA 0%, #B3E5FC 50%, #FFF 100%)";
      case "Thunderstorm":
        return "linear-gradient(180deg, #483D8B 0%, #8A2BE2 50%, #FFF 100%)";
      case "Drizzle":
        return "linear-gradient(180deg, #87cefa 0%, #ADD8E6 50%, #FFF 100%)";
      default:
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
            backgroundImage: bgGradient,
            transition: "background 1s ease-in-out",
          }}
      >
        <h2>神奈川 の天気</h2>
        <p>天気: {weather?.weather[0]?.description ?? "不明"}</p>
        <p>気温: {weather?.main?.temp ?? "不明"}°C</p>
        <p>湿度: {weather?.main?.humidity ?? "不明"}%</p>
        <p>風速: {weather?.wind?.speed ?? "不明"} m/s</p>
      </div>
  );
};

export default Weather;
