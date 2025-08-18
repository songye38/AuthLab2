import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Me from "./pages/Me";
import Register from "./pages/Register";
import Header from "./components/header";

import { AuthProvider } from "./hooks/useAuth";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
