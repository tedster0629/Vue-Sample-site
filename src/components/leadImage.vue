<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
	<div class="article-lead-image">
	<div class="image-container">
		<img :src="imageUrl" :alt="altText" :title="altText">
	</div>
	<!--<div class="caption">{{caption}} <span>{{credit}}</span></div>-->
</div>
</template>


<script>
	import {loadContent, getImageUrl} from 'wch-flux-sdk';

	export default {
		data: () => ({
			imageRendition: 'lead'
		}),
		created () {
			loadContent(this.contentId);
		},
		computed: {
			imageUrl () {
				if(this.$root.$data.content[this.contentId]) {
					return getImageUrl(this.$root.$data.content[this.contentId].elements.leadImage, this.imageRendition);
				}
				return '';
			},
			altText () {
				if(this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.leadImage.altText;
				}
				return '';
			},
			caption () {
				if(this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.leadImageCaption.value;
				}
				return '';
			},
			credit () {
				if(this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.leadImageCredit.value;
				}
				return '';
			},
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/components/leadImage.scss" scoped></style>
