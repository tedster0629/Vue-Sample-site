<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div>
	<div v-if="summary">
		<design-article-summary :contentId="contentId"></design-article-summary>
	</div>
	<div v-if="!summary">
		<div class="article-lead-image">
			<div class="image-container">
				<img :src="getLeadImageUrl(leadImage, 'lead')" :alt="leadImage.altText" :title="leadImage.altText">
			</div>
			<div class="caption">{{leadImageCaption}} <span>{{leadImageCredit}}</span></div>
		</div>
		<h2 class="headline">{{heading}}</h2>
		<div class="article-details">
			<div class="byline-and-date">By <b class="author">{{author}}</b>, <span>{{date}}</span>
			</div>
			<share-social v-if="heading && author" :tweet-msg="heading" :hash-tags="author"></share-social>
		</div>
		<div class="article-body" v-for="(item, index) in body">
			<div v-html="item"></div>
			<div :class="className(bodyImages[index])">
				<img :src="getBodyImageUrl(bodyImages[index], getImageSize(bodyImages[index]))" :alt="getBodyAltText(bodyImages[index])" :title="getBodyAltText(bodyImages[index])">
				<div class="caption">{{getBodyImageCaption(bodyImages[index])}} <span>{{getBodyImageCredit(bodyImages[index])}}</span></div>
			</div>
		</div>
		<div class="article-medium-image" v-for="image in getLeftoverImages()">
			<div :class="className(image)">
				<img :src="getBodyImageUrl(image, getImageSize(image))" :alt="getBodyAltText(image)" :title="getBodyAltText(image)">
				<div class="caption">{{getBodyImageCaption(image)}} <span>{{getBodyImageCredit(image)}}</span></div>
			</div>
		</div>

		<author-profile v-if="authorBioId" :content-id="authorBioId"></author-profile>
	</div>
</div>
</template>


<script>
	import {loadContent, getImageUrl, getFirstCategory} from 'wch-flux-sdk';
	import AuthorProfile from '../components/authorProfile';
	import DesignArticleSummary from '../components/designArticleSummary';

	export default {
		data: () => ({}),
		created () {
			loadContent(this.contentId);
			window.scrollTo(0, 0);
		},
		components: {
		    'author-profile': AuthorProfile,
			'design-article-summary': DesignArticleSummary
		},
		computed: {
			heading () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.heading.value;
				} return '';
			},
			leadImage (){
				if (this.$root.$data.content[this.contentId].elements.mainImage) {
					return this.$root.$data.content[this.contentId].elements.mainImage.value.leadImage;
				} return '';
			},
			leadImageCaption (){
				if (this.$root.$data.content[this.contentId].elements.mainImage.value) {
					return this.$root.$data.content[this.contentId].elements.mainImage.value.leadImageCaption.value;
				} return '';
			},
			leadImageCredit (){
				if (this.$root.$data.content[this.contentId].elements.mainImage) {
					return this.$root.$data.content[this.contentId].elements.mainImage.value.leadImageCredit.value;
				} return '';
			},
			author () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.author.value;
				} return '';
			},
			authorBioId () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.authorBio.value.id;
				} return '';
			},
			date () {
				if (this.$root.$data.content[this.contentId]) {
					return (new Date(this.$root.$data.content[this.contentId].elements.date.value)).toDateString();
				} return '';
			},
			body () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.body.values;
				} return [];
			},
			bodyImages () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.bodyImage.values;
				} return [];
			},
		},
		methods: {
			getLeftoverImages () {
				return this.bodyImages.slice(this.body.length);
			},
			getImageSize (bodyImage) {
				if(bodyImage) {
					if (bodyImage.image.renditions) {
						return getFirstCategory(bodyImage.imageSize);
					}
				}
				return '';
			},
			getLeadImageUrl (leadImage, size) {
				if(leadImage) {
					return getImageUrl(leadImage, size);
				}
				return '';
			},
			getBodyImageUrl (bodyImage, size) {
				if(bodyImage) {
					return getImageUrl(bodyImage.image, size);
				}
				return '';
			},
			getImagePlacement (bodyImage) {
				if(bodyImage) {
					return getFirstCategory(bodyImage.imagePlacement);
				}
				return '';
			},
			getBodyImageCaption (bodyImage) {
				if (bodyImage){
					return bodyImage.imageCaption.value;
				}
				return '';
			},
			getBodyImageCredit (bodyImage) {
				if (bodyImage){
					return bodyImage.imageCredit.value;
				}
				return '';
			},
			getBodyAltText (bodyImage) {
				if (bodyImage){
					return bodyImage.image.altText;
				}
				return '';
			},
			className (bodyImage) {
				let css = [];
				const placement = this.getImagePlacement(bodyImage);
				const size = this.getImageSize(bodyImage);
				if (placement) {
					css.push(`wrap-text-${placement}`);
				}
				if (size) {
					css.push(`article-${size}-image`);
				}

				return css;
			}
		},
		props: ['contentId', 'summary']
	}
</script>


<style lang="scss" src="styles/layouts/designArticle.scss" scoped></style>
<style lang="scss" src="styles/components/leadImage.scss" scoped></style>
