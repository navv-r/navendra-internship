import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );

        setItems(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching new items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimes = {};

      items.forEach((item) => {
        const difference =
          new Date(item.expiryDate).getTime() - new Date().getTime();

        if (difference > 0) {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

          const minutes = Math.floor((difference / 1000 / 60) % 60);

          const seconds = Math.floor((difference / 1000) % 60);

          updatedTimes[item.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          updatedTimes[item.id] = "Expired";
        }
      });

      setTimeLeft(updatedTimes);
    }, 1000);

    return () => clearInterval(timer);
  }, [items]);

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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div className="row">
          {loading ? (
            <div className="row">
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <Skeleton width="100%" height="220px" borderRadius="10px" />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "-25px",
                      }}
                    >
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>

                    <div style={{ marginTop: "15px" }}>
                      <Skeleton width="70%" height="16px" borderRadius="4px" />
                    </div>

                    <div style={{ marginTop: "8px" }}>
                      <Skeleton width="40%" height="14px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Slider {...settings}>
              {items.map((item) => (
                <div key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="de_countdown">{timeLeft[item.id]}</div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>

                      <div className="nft__item_price">{item.price} ETH</div>

                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
