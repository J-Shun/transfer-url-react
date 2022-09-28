import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import { EditPassword } from "./pages/EditPassword";
import { Profile } from "./pages/Profile";
import { Analysis } from "./pages/Analysis";
import React, { useReducer } from "react";

export const ModelContext = React.createContext();

function App() {
  const modelReducer = (state, action) => {
    switch (action.type) {
      case "show":
        if (action.status === "error" || action.status === "success") {
          return {
            show: true,
            status: action.status,
            message: action.message,
          };
        }
        return { ...state, show: false };
      case "hide":
        return { ...state, show: false };
      default:
        return { ...state, show: false };
    }
  };

  const [modelState, modelDispatch] = useReducer(modelReducer, {
    show: false,
    status: "error",
    message: "",
  });

  return (
    <ModelContext.Provider value={{ modelState, modelDispatch }}>
      <main className="global-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<Header />}>
            <Route index element={<User />} />
            <Route path="editPassword" element={<EditPassword />} />
            <Route path="profile" element={<Profile />} />
            <Route path="shortUrl/:id" element={<Analysis />} />
          </Route>
        </Routes>
      </main>
    </ModelContext.Provider>
  );
}

export default App;
