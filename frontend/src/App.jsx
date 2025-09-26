import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./components/Dashboard"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
