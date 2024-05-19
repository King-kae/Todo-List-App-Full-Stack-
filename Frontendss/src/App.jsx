import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import SignupForm from "../components/Signup/Signup";

const Home = lazy(() => import('../Pages/Home'))





const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<SignupForm />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App