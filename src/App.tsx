import React, {Compoent} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

// import pages
import About from './pages/About.tsx'
import NotFound from './pages/NotFound.tsx'

// main App component (routing 담당)
export default function App() {
  return (
    <div classname="App">
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<About />} />
        <Route path="/about"    element={<About />} />

        <Route path="*"         element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}