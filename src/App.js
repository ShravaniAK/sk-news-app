import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import TopStories from './components/TopStories'
import NotFound from './components/NotFound'
import Search from './components/Search'
import {categories} from './constants/index'

function App() {
  // const apiKey = 'KIgPBxO8nLsSd65Ts2xAorFhyx4Qay6F';
  const apiKey = 'tbpXMX6mu8av6Ew7Ehb05J4RttEvvVrp';

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<TopStories apiKey={apiKey} section="home" />}></Route>
          <Route exact path='*' element={<NotFound />}></Route>
          <Route exact path='/search' element={<Search apiKey={apiKey}/>}></Route>
          {
            categories.map((e) => {
              return <Route key={e} exact path={`/categories/${e.toLowerCase()}`} element={<TopStories apiKey={apiKey} section={e.toLowerCase()} />}></Route>
            })
          }
        </Routes>
      </Router>
    </>
  )
}

export default App
