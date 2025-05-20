import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "./App";
import Post from "../components/Post";
import AddPost from "../components/AddPost";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/add" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)


