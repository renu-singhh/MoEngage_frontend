// src/routes.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import ListsPage from "./pages/ListsPage";
import Body from "./pages/Body";
import ListsPageData from "./pages/ListPageData";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/search" element={<SearchPage />} />
      {/* <Route path="/lists" element={<ListsPage />} /> */}
      <Route path="/body" element={<Body />} />
      <Route path="/listsdata" element={<ListsPageData />} />
      <Route path="/listscontent" element={<ListsPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
