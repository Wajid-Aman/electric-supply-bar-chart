import React from "react";
import Chart from "./chart";
import { useQuery } from "@tanstack/react-query";
import { GetPowerSourcesData } from "./fetchData";

const PowerSourcesChart = () => {
  const powerSources = useQuery({
    queryKey: ["powerSources"],
    queryFn: GetPowerSourcesData,
    refetchInterval: 10000,
  });
  if (powerSources.status === "loading") return <h1>Loading...</h1>;
  if (powerSources.status === "error")
    return <h1>{JSON.stringify(powerSources.error)}</h1>;

  return <Chart powerSources={powerSources}/>
};

export default PowerSourcesChart;
