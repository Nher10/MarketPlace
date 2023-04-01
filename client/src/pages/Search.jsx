import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values.results.map((product, key) => (
              <div className="card m-2" style={{ width: "18rem" }} key={key}>
                <img
                  src={`https://timecraft.onrender.com/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.name.substring(0, 20)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 60)}...
                  </p>
                  <p className="card-text"> ₱ {product.price}</p>
                  <div>
                    <button className="btn btn-primary ms-1">
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
