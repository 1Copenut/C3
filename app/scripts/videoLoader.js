/*global _V_, $:true */
var ContinuumVideo = function(container, el, shortName, marker) {
	this.container = container;
	this.el = el;
	this.shortName = shortName;
	this.marker = marker;
	this.videoObj = false;
};

ContinuumVideo.prototype.prepareVideo = function() {
	if(this.videoObj === true) {
		this.dispose();
	}

	$(this.container).append($(this.el));

	$(this.shortName).attr({
		'id': 'video_1',
		'class': 'video-js vjs-default-skin',
		'controls': true,
		'poster': 'http://video-js.zencoder.com/oceans-clip.jpg',
		'preload': false
	});

	this.createVideoObject(this.marker);
};

ContinuumVideo.prototype.createVideoObject = function(videoID) {
	_V_(videoID, {}, function () {
		this.videoID = _V_(videoID);

		this.videoID.src([
			{type: "video/mp4", src: "http://vjs.zencdn.net/v/oceans.mp4"},
			{type: "video/webm", src: "http://vjs.zencdn.net/v/oceans.webm"},
			{type: "video/ogg", src: "http://vjs.zencdn.net/v/oceans.ogv"}
		]);
		
		this.videoID.pause();

		this.videoObj = true;
	});
};

$(document).ready(function (){
	var video = new ContinuumVideo('div.video-wrapper', '<video/>', 'video', 'video_1');
	video.prepareVideo();
});