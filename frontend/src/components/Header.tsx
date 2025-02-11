import React from 'react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { ReactDOM } from 'react';
import "../App.css";

const Header: React.FC = () => {
    return (
        <div>
            <nav className='app-date'>
                <p>今日の日付: {new Date().toLocaleDateString('ja-JP')}</p>
            </nav>
        </div>        
    );
    }
export {Header};