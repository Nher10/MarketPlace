import axios from "axios";
import React, { useEffect, useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  //get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://timecraft.onrender.com/api/v1/category/get-category"
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useCategory;
