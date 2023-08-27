import './App.css';

import React, {useState} from 'react'
import NavBar from './Components/Navbar';
import News from './Components/News';
import { Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 5;
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <NavBar />
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key="business" pagesize={pageSize} country='in' category="business" />} />
          <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pagesize={pageSize} country='in' category="entertainment" />} />
          <Route path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key="health" pagesize={pageSize} country='in' category="health" />} />
          <Route path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pagesize={pageSize} country='in' category="sports" />} />
          <Route path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pagesize={pageSize} country='in' category="technology" />} />
        </Routes>
      </div>
    )
  }

  export default App;
