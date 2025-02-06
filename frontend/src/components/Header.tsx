import React from 'react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { ReactDOM } from 'react';
import "./Header.css";

const Header: React.FC = () => {
    return (
        <div>
            <div className="header">
                日常生活アプリ
            </div>
            <div className='app-date'>
                    <div className={"nowDay"}>今日の日付: {new Date().toLocaleDateString('ja-JP')}</div>
                    <div className={"point"}>獲得ポイント数：{}p</div>
            </div>
        </div>        
    );
    }
export {Header};