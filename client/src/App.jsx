import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./layouts/navbar";
import { Home } from "./pages/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
