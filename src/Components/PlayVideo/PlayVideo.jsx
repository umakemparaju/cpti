import React, { useEffect, useState } from "react";
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY } from "../../data";
import valueConverter from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(videoDetails_url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setApiData(data.items[0]);
        }
      } catch (error) {
        setError("Error fetching video data");
      }
    };

    const fetchOtherData = async () => {
      try {
        if (!apiData || !apiData.snippet) {
          return;
        }
        
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        const channelResponse = await fetch(channelData_url);
        const channelData = await channelResponse.json();
        if (channelData.items && channelData.items.length > 0) {
          setChannelData(channelData.items[0]);
        }

        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
        const commentResponse = await fetch(comment_url);
        const commentData = await commentResponse.json();
        setCommentData(commentData.items || []);
      } catch (error) {
        setError("Error fetching other data");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
    fetchOtherData();
  }, [videoId, apiData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="play-video">
      {apiData && (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title="YouTube Video"
          ></iframe>
          <h3>{apiData.snippet.title}</h3>
          <div className="play-video-info">
            <p>
              {valueConverter(apiData.statistics.viewCount)} Views &bull;{" "}
              {moment(apiData.snippet.publishedAt).fromNow()}
            </p>
            <div>
              <span>
                <img src={like} alt="" />
                {valueConverter(apiData.statistics.likeCount)}
              </span>
              <span>
                <img src={dislike} alt="" />
              </span>
              <span>
                <img src={share} alt="" />
                share
              </span>
              <span>
                <img src={save} alt="" />
                save
              </span>
            </div>
          </div>
          <hr />
          <div className="publisher">
            <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
            <div>
              <p>{apiData.snippet.channelTitle}</p>
              <span>
                {channelData ? valueConverter(channelData.statistics.subscriberCount) : "1M"} Subscribers
              </span>
            </div>
            <button>Subscribe</button>
          </div>
          <div className="vid-description">
            <p>{apiData.snippet.description.slice(0, 250)}</p>
            <hr />
            <h4>{valueConverter(apiData.statistics.commentCount)} Comments</h4>
            {commentData.map((item, index) => (
              <div key={index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}
                    <span>1 day ago</span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayVideo;

