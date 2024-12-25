import React, { useState } from "react";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import PuffLoader from "react-spinners/PuffLoader";
import "./Properties.css";
import useProperties from "../../hooks/useProperties";
import PropertyCard from "../../components/propretyCard/PropertyCard";

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");

  console.log("Properties data:", data); // Debugging to confirm the structure

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          size={80}
          color="#4066ff"
          loading={isLoading}
          aria-label="puff-loading"
        />
      </div>
    );
  }

  // Handle cases where `data` or `residencies` is undefined or empty
  if (!data || !data.residencies || data.residencies.length === 0) {
    return (
      <div className="wrapper flexCenter">
        <span>No properties available</span>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {
            /* {data.residencies.map((card, i) => (
                        <PropertyCard card={card} key={i} />
                    ))} */
            data.residencies
              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Properties;
