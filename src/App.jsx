import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProtectedRouter from "./components/ProtectedRouter";

import Home from "./pages/Home";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import AddLostItem from "./pages/AddLostItem";
import AddFoundItem from "./pages/AddFoundItem";
import MyItems from "./pages/MyItems";
import EditLostItem from "./pages/EditLostItem";
import EditFoundItem from "./pages/EditFoundItem";
import Profile from "./pages/Profile";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/lost-items" element={<LostItems />} />
        <Route path="/found-items" element={<FoundItems />} />
        <Route path="/item/lost/:id" element={<ItemDetails />} />
        <Route path="/item/found/:id" element={<ItemDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRouter>
              <Dashboard />
            </ProtectedRouter>
          }
        />
        <Route
          path="/add-lost-item"
          element={
            <ProtectedRouter>
              <AddLostItem />
            </ProtectedRouter>
          }
        />
        <Route
          path="/add-found-item"
          element={
            <ProtectedRouter>
              <AddFoundItem />
            </ProtectedRouter>
          }
        />
        <Route
          path="/my-items"
          element={
            <ProtectedRouter>
              <MyItems />
            </ProtectedRouter>
          }
        />
        <Route
          path="/edit-lost-item/:id"
          element={
            <ProtectedRouter>
              <EditLostItem />
            </ProtectedRouter>
          }
        />
        <Route
          path="/edit-found-item/:id"
          element={
            <ProtectedRouter>
              <EditFoundItem />
            </ProtectedRouter>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouter>
              <Profile />
            </ProtectedRouter>
          }
        />
      </Routes>
    </>
  );
}

export default App;
