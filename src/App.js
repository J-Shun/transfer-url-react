import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import { EditPassword } from "./pages/EditPassword";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <main className="global-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Header />}>
          <Route index element={<User />} />
          <Route path="editPassword" element={<EditPassword />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
