import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLogin from './Component/adminlogin.jsx'
import Login from './Component/login.jsx'
import './App.css'
import Result from './Component/result.jsx' 
import AdminDashboard from './Component/admindashboard.jsx'
import ProtectedRoute from './Component/Protectedroute.jsx'
function App() {
  

  return (
    <> 

     <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/result" element={<Result />} />

          <Route path="/admin" element={<AdminLogin />} />
         <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
        </Routes>
      </Router>
    
    </> 
  )
}

export default App
