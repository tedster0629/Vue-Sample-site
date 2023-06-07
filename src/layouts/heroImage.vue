<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div v-bind:id="contentId" class="wch-hero-image">
	<img v-bind:src="imageUrl" v-bind:alt="altText" v-bind:title="altText" />

	<div class="hero-message">
		<h1 class="text-hero">{{headline}}</h1>
		<router-link v-bind:to="callToAction.url" class="button hero-button">{{callToAction.text}}</router-link>
	</div>
</div>

</template>


<script>
	import {loadContent, getImageUrl} from 'wch-flux-sdk';
	export default {
		data: () => ({}),
		created () {
			loadContent(this.contentId);
		},
		computed: {
			imageUrl () {
				if (this.$root.$data.content[this.contentId]) {
					return getImageUrl(this.$root.$data.content[this.contentId].elements.image, 'short');
				}
				return '';
			},
			altText () { 
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.image.altText;
				}
				return '';
			},
			headline () { 
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.text.value;
				}
				return '';
			},
			callToAction () { 
				if (this.$root.$data.content[this.contentId]) {
					return {
						text: this.$root.$data.content[this.contentId].elements.link.linkText,
						url: this.$root.$data.content[this.contentId].elements.link.linkURL
					};
				}
				return { text: '', url: '' };
			}
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/layouts/heroImage.scss" scoped></style>
