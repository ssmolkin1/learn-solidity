import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = "AIzaSyCJUzesxwFFy8B6AFzv2GwGTCzno00Mr2o"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.searchVideo("surfboard");
  }

  // Use class properties (or else bind in constructor) and functions which will be passed to other components.
  // Using ordinary method definition will result in unbound method, and therefore not work when called by other components.
  searchVideo = (term) => {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0], 
      });
    });
  }

  videoSearch = _.debounce(this.searchVideo, 300);
  
  render() {
    return (
      <div>
        <SearchBar searchVideo={this.videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList onVideoSelected={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));