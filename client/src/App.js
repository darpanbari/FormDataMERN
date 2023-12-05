import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./pages/RegistrationForm1";
import RegisteredData from "./pages/RegisteredData";


function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/get-registered-data" element={<RegisteredData/>} />
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
