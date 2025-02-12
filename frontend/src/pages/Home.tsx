import React from "react";
import { useFontSize } from "../context/FontSizeContext"; // フォントサイズを取得
import Weather from "../components/Weather";

const Home: React.FC = () => {
  const { fontSize } = useFontSize(); // フォントサイズを適用

  return (
      <div style={{ fontSize: `${fontSize}px` }}>
        <Weather />
        <h1>ホームページ</h1>
        <p>当日できるタスクを表示</p>
      </div>
  );
};

export default Home;
