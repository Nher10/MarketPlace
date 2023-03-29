import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories?.map((category) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={category._id}>
              <div className="card">
                <Link to={`/category/${category.slug}`} className="btn cat-btn">
                  {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
