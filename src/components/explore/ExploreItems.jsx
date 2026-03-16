import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [nfts, setNfts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});

  const fetchNFTs = async (filter = "") => {
    try {
      let url =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

      if (filter) {
        url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`;
      }

      const response = await axios.get(url);

      setNfts(response.data);

      const timers = {};
      response.data.forEach((nft) => {
        timers[nft.nftId] = nft.expiry;
      });

      setCountdowns(timers);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((id) => {
          if (updated[id] > 0) {
            updated[id] -= 1000;
          }
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;

    setVisibleCount(8);
    setLoading(true);

    fetchNFTs(value);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const formatTime = (expiry) => {

  const total = new Date(expiry).getTime() - Date.now();

  if (total <= 0) return "Expired";

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const hours = Math.floor(total / (1000 * 60 * 60));

  return `${hours}h ${minutes}m ${seconds}s`;

};

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilter}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {(loading ? new Array(8).fill(0) : nfts.slice(0, visibleCount)).map(
        (nft, index) => (
          <div
            key={loading ? index : nft.nftId}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                {loading ? (
                  <Skeleton width="40px" height="40px" borderRadius="50%" />
                ) : (
                  <Link to={`/author/${nft.authorId}`}>
                    <img className="lazy" src={nft.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                )}
              </div>

              <div className="de_countdown">
                {loading ? (
                  <Skeleton width="80px" height="14px" />
                ) : (
                  formatTime(countdowns[nft.nftId])
                )}
              </div>

              <div className="nft__item_wrap">
                {loading ? (
                  <Skeleton width="100%" height="220px" borderRadius="8px" />
                ) : (
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                )}
              </div>

              <div className="nft__item_info">
                {loading ? (
                  <Skeleton width="120px" height="18px" />
                ) : (
                  <Link to={`/item-details/${nft.nftId}`}>
                    <h4>{nft.title}</h4>
                  </Link>
                )}

                <div className="nft__item_price">
                  {loading ? (
                    <Skeleton width="60px" height="14px" />
                  ) : (
                    `${nft.price} ETH`
                  )}
                </div>

                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  {loading ? (
                    <Skeleton width="30px" height="14px" />
                  ) : (
                    nft.likes
                  )}
                </div>
              </div>
            </div>
          </div>
        ),
      )}

      {!loading && visibleCount < nfts.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
