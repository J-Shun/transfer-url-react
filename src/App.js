import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";

function App() {
  return (
    <main className="global-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </main>
  );
}

export default App;
