import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import CreateWebinar from './Component/CreateWebinar'
import WebinarConfirmation from './Component/WebinarConfirmation'
import WebinarDetails from './Component/WebinarDetails'
import { WebinarProvider } from './context/WebinarContext'

function App() {
  return (
    <WebinarProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-webinar" element={<CreateWebinar />} />
            <Route path="/webinar-confirmation" element={<WebinarConfirmation />} />
            <Route path="/webinar/:id" element={<WebinarDetails />} />
          </Routes>
        </div>
      </Router>
    </WebinarProvider>
  )
}

export default App

