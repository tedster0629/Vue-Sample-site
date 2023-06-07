<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div v-bind:id="contentId" class="wch-hero-video responsive-embed widescreen">
	<video
			v-bind:id="videoElementId"
			controls
			class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9">
		<!-- Supporting WebM and MP4 is the recommended way for best browser coverage. -->
		<source v-bind:src="videoUrl" v-bind:type="mediaType">
		Your browser doesn't support HTML5 video.
	</video>

</div>
</template>


<script>
import {loadContent, getVideoUrl} from 'wch-flux-sdk';

const videoJsLoaded = new Promise((resolve, reject) => {
	if (!document.getElementById('videojs-script-tag')) {
		let styleTag = document.createElement('link');
		styleTag.href = '//vjs.zencdn.net/6.2.8/video-js.css';
		styleTag.rel = 'stylesheet';
		styleTag.async = true;
		document.head.appendChild(styleTag);

		let scriptTag = document.createElement('script');
		scriptTag.id = 'videojs-script-tag';
		scriptTag.type = 'application/javascript';
		scriptTag.src = '//vjs.zencdn.net/6.2.8/video.js';
		scriptTag.async = true;
		scriptTag.addEventListener('load', resolve);
		scriptTag.addEventListener('error', () => reject('Error loading script.'));
		scriptTag.addEventListener('abort', () => reject('Script loading aborted.'));
		document.body.appendChild(scriptTag);
	} else {
		resolve();
	}
});

export default {
	created () {
		loadContent(this.contentId);
	},
	data: () => ({
		player: null,
	}),
	mounted () {
		videoJsLoaded.then(() => this.player = videojs(this.videoElementId));
		
	},
	beforeDestroy () {
		if (this.player) {
			this.player.dispose();
		}
	},
	computed: {
		mediaType () {
			if (this.$root.$data.content[this.contentId]) {
				return this.$root.$data.content[this.contentId].elements.video.asset.mediaType;
			} return 'video/mp4';
		},
		videoUrl () {
			if (this.$root.$data.content[this.contentId]) {
				return getVideoUrl(this.$root.$data.content[this.contentId].elements.video);
			} return '';
		},
		videoElementId () {
			return `hero-video-${this.contentId}`;
		}
	},
	props: ['contentId']
}
	
</script>


<style lang="scss" src="styles/layouts/heroVideo.scss" scoped></style>