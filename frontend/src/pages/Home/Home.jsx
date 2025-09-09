import React from "react";
import Hero from "../Hero/Hero";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";

export const Home = () => {
    const [category, setCategory] = React.useState("All");
  return (
    <>
      <Hero />
      <ExploreMenu category={category} setCategory={setCategory}/>
    </>
  );
};
