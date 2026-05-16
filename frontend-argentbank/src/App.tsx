import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout"; // Organize  layout components
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./routes/ProtectedRoutes"; // Protected routes for user auth

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route index element={<UserProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
