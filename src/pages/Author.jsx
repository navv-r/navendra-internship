import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);

  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {

        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        const data = response.data;

        setAuthor({
          name: data.authorName,
          authorImage: data.authorImage,
          username: data.tag,
          wallet: data.address
        });

        setFollowers(data.followers);

      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const toggleFollow = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
    } else {
      setFollowers((prev) => prev + 1);
    }

    setIsFollowing(!isFollowing);
  };

  if (!author) {
    return <p style={{ padding: "40px" }}>Loading author...</p>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">

            <div className="row">

              <div className="col-md-12">

                <div className="profile_avatar">

                  <div className="d-flex flex-row">

                    <div className="profile_avatar">

                      <img src={author.authorImage} alt={author.name} />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">

                        <h4>

                          {author.name}

                          <span className="profile_username">
                            @{author.username}
                          </span>

                          <span id="wallet" className="profile_wallet">
                            {author.wallet}
                          </span>

                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>

                        </h4>

                      </div>

                    </div>

                  </div>

                  <div
                    className="profile_follow"
                    style={{ marginLeft: "auto", textAlign: "right" }}
                  >

                    <div className="profile_follower">
                      {followers} followers
                    </div>

                    <button className="btn-main" onClick={toggleFollow}>
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>

                  </div>

                </div>

              </div>

              <div className="col-md-12">

                <div className="de_tab tab_simple">

                  <AuthorItems authorId={authorId} />

                </div>

              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Author;
