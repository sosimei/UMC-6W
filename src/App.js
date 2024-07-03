import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from "./components/Header"
import MainPage from './pages/MainPage';
import NowPlayingPage from './pages/NowPlayingPage'
import PopularPage from './pages/PopularPage'
import TopRatedPage from './pages/TopRatedPage'
import UpComing from './pages/UpComing'
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import MovieDetail from './pages/MovieDetail'
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className='root-warp'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/nowplaying" element={<NowPlayingPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/toprated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpComing />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
