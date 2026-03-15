import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const TopSellers = () => {

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {

        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        setSellers(response.data);

      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const column1 = sellers.slice(0, 4);
  const column2 = sellers.slice(4, 8);
  const column3 = sellers.slice(8, 12);

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

  return (
    <section id="section-popular" className="no-bottom">

      <div className="container">

        <div className="row">

          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>

        </div>

        <div className="row">

          <div className="col-lg-4">
            {column1.map((seller, i) => renderSeller(seller, i))}
          </div>

          <div className="col-lg-4">
            {column2.map((seller, i) => renderSeller(seller, i + 4))}
          </div>

          <div className="col-lg-4">
            {column3.map((seller, i) => renderSeller(seller, i + 8))}
          </div>

        </div>

      </div>

    </section>
  );
};

export default TopSellers;
