import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );

        setCollections(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            {loading ? (
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <div className="nft_coll">
                      <Skeleton
                        width="100%"
                        height="180px"
                        borderRadius="10px"
                      />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "-25px",
                        }}
                      >
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "12px",
                        }}
                      >
                        <Skeleton
                          width="60%"
                          height="16px"
                          borderRadius="4px"
                        />
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "8px",
                        }}
                      >
                        <Skeleton
                          width="40%"
                          height="12px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Slider {...settings}>
                {collections.map((collection) => (
                  <div key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt="author"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to={`/item-details/${collection.id}`}>
                          <h4>{collection.title}</h4>
                        </Link>

                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
