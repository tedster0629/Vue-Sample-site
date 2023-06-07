<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div>
	<h4 v-if="errorMsg" class="msg error">{{ errorMsg }}</h4>
	<button class="create-thumbnail" v-on:click="createThumbnail()">Capture a thumbnail from this preview</button>
	<div class="preview-container" id="preview-container">
		<wch-content v-if="contentId && layoutId" :id="contentId" :layoutId="layoutId"></wch-content>
	</div>
</div>
</template>

<script>
	import { loadSite } from 'wch-flux-sdk';
	import FileSaver from 'file-saver';
	import domtoimage from '../../node_modules/dom-to-image/dist/dom-to-image.min';

	export default {
		created () {
			loadSite(); // this is usually done in the header nav, but preview does not contain the header/footer
		},
		computed: {
			layoutId () {
				return this.$route.query.layout;
			},
			contentId () {
				return this.$route.query.content;
			},
			errorMsg () {
				const msg = 'must be provided to preview.';
				return !this.layoutId && !this.contentId ? `A layout and content item ${msg}`
					 : !this.layoutId ? `A layout ${msg}` 
					 : !this.contentId ? `A content item ${msg}`
				 	 : '';
			}
		},
		methods: {
			createThumbnail () {
				// grab the node that contains the previewed rendering context, find its height and width
				// the height should be no more than 1600px
				// the width should be no more than 2400px
				const node = document.getElementById('preview-container');
				const nodeWidth = node.offsetWidth > 1600 ? 1600 : node.offsetWidth;
				const nodeHeight = node.offsetHeight > 2400 ? 2400 : node.offsetHeight;

				// options to transform the screenshot into a thumbnail image
				// the image is scaled to 1/4 its size and capped at width = 1600/4 = 400px, and height = 2400/4 = 600px
				const blobOptions = {
					width: nodeWidth/4,				// overall width of the image
					height: nodeHeight/4,			// overall height of the image
					quality: 0.9, 					// png quality option
					style: {						// styles applied to the node before it is screenshot
						width: nodeWidth + 'px',
						height: nodeHeight + 'px',
						overflow: 'hidden',
						transform: 'scale(0.25)',	// shrink to 1/4 size
						transformOrigin: '0 0',
						backgroundColor: 'white',
						padding: '0',
						margin: '0'
					},
					filter: n => !n.tagName || n.tagName.toLowerCase() !== 'iframe'  // remove all iframes to avoid cross-site errors
				};
				console.log(`Creating ${nodeWidth/4}x${nodeHeight/4} thumbnail of %o`, node);

				// save the resulting screenshot to the user's computer
				domtoimage.toBlob(node, blobOptions).then(blob => {
					FileSaver.saveAs(blob, `thumbnail_${this.layoutId}.png`);
				}).catch(e => {
					console.error('Could not create thumbnail', e);
					confirm('Could not create thumbnail');
				});
			}
		}
	}
</script>

<style lang="scss" src="styles/components/previewComponent.scss" scoped></style>
