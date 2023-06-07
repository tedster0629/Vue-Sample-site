<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
	<div v-bind:id="contentId" v-bind:class="classNames">
		<div v-if="imageUrl" class="feature-copy">
			<div class="feature-copy-content">
				<h2>{{headline}}</h2>
				<div class="text-content" v-html="description"></div>
				<router-link v-if="readMore.url && !linkTest" class="button" v-bind:to="readMore.url">{{readMore.text}}	</router-link>
				<a v-if="readMore.url && linkTest" class="button" v-bind:href="readMore.url" target="_blank">{{readMore.text}}</a>
			</div>
		</div>
		<div v-if="!imageUrl" class="feature-no-image-copy grid-x grid-padding-x">
			<div class="feature-no-image-copy-content medium-8 cell">
				<h5 >{{headline}}</h5>
				<div class="text-content" v-html="description"></div>
				<router-link v-if="readMore.url" class="button" v-bind:to="readMore.url">{{readMore.text}}</router-link>
			</div>
		</div>
		<div v-if="imageUrl" class="feature-img">
			<img v-bind:src="imageUrl" v-bind:alt="altText" v-bind:title="altText">
		</div>
	</div>
</template>


<script>
	import {loadContent, getImageUrl, getFirstCategory} from 'wch-flux-sdk';
	export default {
		created: function () {
			loadContent(this.contentId);
		},
		computed: {
			headline () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.featureHeadline.value;
				} return '';
			},
			description () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.descriptionOfFeature.value;
				} return '';
			},
			readMore () {
				if (this.$root.$data.content[this.contentId]) {
					return {
						text: this.$root.$data.content[this.contentId].elements.readMoreLink.linkText,
						url: this.$root.$data.content[this.contentId].elements.readMoreLink.linkURL
					};
				} return {};
			},
			imageUrl () {
				if (this.$root.$data.content[this.contentId]) {
					if (this.$root.$data.content[this.contentId].elements.image.renditions) {
						return getImageUrl(this.$root.$data.content[this.contentId].elements.image, this.imageSize);
					}
				} return '';
			},
			imageSize () {
				if (this.$root.$data.content[this.contentId]) {
					if (this.$root.$data.content[this.contentId].elements.image.renditions) {
						return getFirstCategory(this.$root.$data.content[this.contentId].elements.imageSize);
					}
				} return null;
			},
			imagePlacement () {
				if (this.$root.$data.content[this.contentId]) {
					if (this.$root.$data.content[this.contentId].elements.image.renditions) {
						return getFirstCategory(this.$root.$data.content[this.contentId].elements.imagePlacement);
					}
				} return null;
			},
			altText () {
				if (this.$root.$data.content[this.contentId]) {
					if (this.$root.$data.content[this.contentId].elements.image.renditions) {
						return this.$root.$data.content[this.contentId].elements.image.altText;
					}
				} return '';
			},
			classNames () {
				let css = [
					'feature',
					'section'
				];

				if (this.imagePlacement) {
					css.push(`feature-img-${this.imagePlacement}`);
				}
				if (this.imageSize) {
					css.push(`feature-${this.imageSize}`);
				}

				return css;
			},
			linkTest (){
			    if(this.$root.$data.content[this.contentId].elements.readMoreLink.linkURL){
                	return /^https?:\/\//.test(this.$root.$data.content[this.contentId].elements.readMoreLink.linkURL);
                }
				return false;
			}
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/layouts/feature.scss" scoped></style>
