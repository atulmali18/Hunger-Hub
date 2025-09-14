import React, { useState } from "react";
import Hero from "../Hero/Hero";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

export const Home = () => {
    const [category, setCategory] = useState("All");
  return (
    <>
      <Hero />
      <ExploreMenu category={category} setCategory={setCategory}/>
       <FoodDisplay category={category}/>
       <AppDownload />
    </>
  );
};
