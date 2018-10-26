import React from "react";
import VideoListItem from './video_list_item'

const VideoList = ({ videos, onVideoSelected }) => {
  const videoItems = videos.map( video => <VideoListItem key={video.etag} video={video} onVideoSelected={onVideoSelected} />)
  return (
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );
}

export default VideoList;