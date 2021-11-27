import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import WorkoutList from "./WorkoutList"
import UserProfile from "./UserProfile";
import UserFavorites from "UserFavorites";
import WorkoutDetails from "WorkoutDetails";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="workouts" element={<WorkoutList />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="favorites" element={<UserFavorites />} />
        <Route path="details/:id" element={<WorkoutDetails />} />
      </Routes>
    </div>
  );
}