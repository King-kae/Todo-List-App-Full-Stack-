import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'

// import { home } from '../Helpers/authService'

  
const Home = lazy(() => import('../Pages/Home'))

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      
      
    </>
  )
}

export default App