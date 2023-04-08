import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import Header from './components/Header';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/detail/:taskid' element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
