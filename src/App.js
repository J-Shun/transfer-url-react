import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import { EditPassword } from "./components/EditPassword";

function App() {
  return (
    <main className="global-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<User />}>
          {/* <Route index element={<EditPassword />} />
          <Route path="/profile" /> */}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
