import React, { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";
const rapidApiKey = RAPID_API_KEY;
const useFetch = (endpoint, query, time) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.request(options);
      setData(res.data.data);
    } catch (error) {
      setError(error);
      alert("There is an Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchData(), time || 10);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
