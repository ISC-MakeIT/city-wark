import React from "react";
import "./Footer.css";


const Footer: React.FC = () => {
    return (

        <footer className="app-footer">
            <ul>
                <li>
                    <a href="/home">ホーム</a>
                </li>
                <li>
                    <a href="/todo">ToDo履歴</a>
                </li>
                <li>
                    <a href="/setting">設定</a>
                </li>
                <li>
                    <a href="/progress">マップ</a>
                </li>
            </ul>
        </footer>

    );
};
export default Footer;