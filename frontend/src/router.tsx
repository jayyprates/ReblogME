// Package
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Project
import LoginPage from "./pages/Login";
import HomePage from './pages/Home';
import BaseLayout from './components/BaseLayout';
import PostPage from './pages/Post';
import ProfilePage from './pages/Profile';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="/profile/:username?" Component={ProfilePage} />
          <Route path="/posts/:id" Component={PostPage} />
          <Route path="/" Component={HomePage} />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  )
};

export default Router;