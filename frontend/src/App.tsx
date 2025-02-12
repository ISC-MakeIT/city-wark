import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ページコンポーネントのインポート
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Progress from "./pages/Progress";
import Setting from "./pages/Setting";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import ProfileSetting from "./components/ProfileSetting";
import Weather from "./components/Weather";

// 📌 ここでコンテキストを正���くインポート！
import { FontSizeProvider } from "./context/FontSizeContext";

import "./App.css"; // CSS ファイルをインポート

const App: React.FC = () => {
  return (
      <FontSizeProvider> {/* ここで正しくラップする */}
        <Router>
          <div>
            {/* ヘッダー */}
            <Header />
            {/*<Weather />*/}
            {/* メインコンテンツ */}
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/profile-setting" element={<ProfileSetting />} />
              </Routes>
            </main>

            {/* フッター */}
            <Footer />
          </div>
        </Router>
      </FontSizeProvider>
  );
};

export default App;