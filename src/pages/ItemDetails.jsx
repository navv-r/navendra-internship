import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState(null);

  useEffect(() => {
    const fetchNFT = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
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
    <section id="content" className="container" style={{ paddingTop: "150px" }} data-aos="fade-up">
      <div className="row">
        {/* LEFT SIDE NFT IMAGE */}
        <div className="col-lg-6">
          <img
            src={nft.nftImage}
            alt={nft.title}
            className="img-fluid"
            style={{ borderRadius: "12px" }}
          />
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="col-lg-6">
          {/* TITLE + TAG */}
          <h2>
            {nft.title}
            <span
              style={{ marginLeft: "10px", fontSize: "14px", color: "#888" }}
            >
              {nft.tag}
            </span>
          </h2>

          {/* VIEWS + LIKES */}
          <div style={{ marginTop: "10px" }}>
            <span style={{ marginRight: "20px" }}>👁 {nft.views}</span>

            <span>❤️ {nft.likes}</span>
          </div>

          <p style={{ marginTop: "20px", color: "#777" }}>{nft.description}</p>

          <div style={{ marginTop: "30px" }}>
            <strong>Owner</strong>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <img
                src={nft.ownerImage}
                alt={nft.ownerName}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />

              <span>{nft.ownerName}</span>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <strong>Creator</strong>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <img
                src={nft.creatorImage}
                alt={nft.creatorName}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />

              <span>{nft.creatorName}</span>
            </div>
          </div>

          <div
            style={{ marginTop: "30px", fontSize: "22px", fontWeight: "bold" }}
          >
            {nft.price} ETH
          </div>

          <div style={{ marginTop: "30px" }}>
            <button className="btn-main">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
