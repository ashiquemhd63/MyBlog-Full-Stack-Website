
import './App.css';
import HomePage from './pages/HomePage';
import ArticlesListPage from './pages/ArticlesListPage';
import NavBar from './NavBar';
import ArticlesPage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        
        <div id="page-body">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/articles' element={<ArticlesListPage />} />
            <Route path='/articles/:articlesId' element={<ArticlesPage/>} />
            <Route path='*' element={<NotFoundPage />} />


          </Routes>
        </div>
      </div>

    </BrowserRouter>

  );
}

export default App;

