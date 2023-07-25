import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import "./theme/app.css";

const App = () => (
    <Routes>
        <Route path="/" element={<Home/>} />
    </Routes>
);

export default App
