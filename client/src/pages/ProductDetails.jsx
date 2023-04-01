import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  //initial product detail
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      console.log(product._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <img
          src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
          className="card-img-top"
          alt={product.name}
          style={{ height: "500px", width: "500px" }}
        />
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Desciption : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("PHP", {
              style: "currency",
              currency: "PHP",
            })}
          </h6>
          <h6>Category : {product.category?.name}</h6>
          <button className="btn btn-secondary ms-1">Add To Cart</button>
          {/* <h4>Shipping : {product.shipping}</h4> */}
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4 className="ms-3">Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">"NO Similar Products Found"</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((product, key) => (
            <div className="card m-3" style={{ width: "18rem" }} key={key}>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{product.name}</h5>
                  <h5 className="card-title card-price">
                    {product.price.toLocaleString("PHP", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </h5>
                </div>
                <p className="card-text">
                  {product.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    More Details
                  </button>
                </div>

                {/* <button className="btn btn-secondary ms-1">Add To Cart</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
