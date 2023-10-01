import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import aiLogo from "./assets/ai-logo.png";
import { Home, CreatePage, Createvariation } from './Pages';
import { Navbar } from './Components';


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar aiLogo= {aiLogo} />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] ">
        <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/create-post' element= {<CreatePage/>} />
          <Route path='/create-variation' element= {<Createvariation/>} />
        </Routes>

      </main>
      </BrowserRouter>
    </>
  )
}

export default App
