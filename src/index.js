/*jshint esnext: true, browser: true, node: true*/
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY ='AIzaSyDSlVPXQYMFpLBS3e3W4OdpCJ4mpo14M7g';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('stand up');

	}
	videoSearch (term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});	
		
	}
  
	render() {
		
		const videoSerch = _.debounce((term) =>{ this.videoSearch(term) }, 300);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSerch}/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos}/>
			</div>
		);
	};
}
ReactDOM.render(
  <App/>,
  document.querySelector('.container')
);
