import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );

        setSellers(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const renderSeller = (seller, index) => (
    <div className="author_list" key={seller.authorId}>
      <div className="author_list_pp">
        <Link to={`/author/${seller.authorId}`}>
          <img src={seller.authorImage} alt={seller.authorName} />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <div className="author_list_info">
        <Link to={`/author/${seller.authorId}`}>
          {index + 1}. {seller.authorName}
        </Link>
        <span>{seller.price} ETH</span>
      </div>
    </div>
  );

  const renderSkeleton = (index) => (
    <li key={index}>
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>
      <div className="author_list_info">
        <Skeleton width="120px" height="16px" />
        <Skeleton width="60px" height="12px" />
      </div>
    </li>
  );

  return (
    <section id="section-popular" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => renderSkeleton(index))
                : sellers.map((seller, i) => (
                    <li key={seller.authorId}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {i + 1}. {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
