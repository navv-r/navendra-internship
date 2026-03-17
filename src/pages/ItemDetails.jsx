import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState(null);

  useEffect(() => {
    const fetchNFT = async () => {
      try {

        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        setNft(response.data);

      } catch (error) {
        console.error("Error fetching NFT:", error);
      }
    };

    fetchNFT();
  }, [nftId]);

  if (!nft) {
    return <p style={{ padding: "40px" }}>Loading NFT...</p>;
  }

  return (
    <section id="content" className="container" style={{ paddingTop: "200px" }}>
      <div className="row">

        {/* NFT Image */}
        <div className="col-lg-6">
          <div className="nft-image-wrapper">
            <img
              src={nft.nftImage}
              alt={nft.title}
              className="img-fluid"
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>

        {/* NFT Details */}
        <div className="col-lg-6">

          <h2>{nft.title}</h2>

          <div style={{ marginTop: "20px" }}>
            <strong>Price:</strong> {nft.price} ETH
          </div>

          <div style={{ marginTop: "10px" }}>
            <strong>Likes:</strong> {nft.likes}
          </div>

          <div style={{ marginTop: "20px" }}>
            <strong>Author:</strong>
            <Link to={`/author/${nft.authorId}`} style={{ marginLeft: "8px" }}>
              View Creator
            </Link>
          </div>

          <div style={{ marginTop: "40px" }}>
            <button className="btn-main">Buy Now</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
