import React, {Compoent} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

// import pages
import NotFound from './pages/_NotFound.tsx'
import Test from './pages/_Test.tsx'


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