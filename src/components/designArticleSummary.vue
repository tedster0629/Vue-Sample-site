<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div class="summary-card">
	<div v-if="leadImage" class="summary-card-image">
		<!-- This sample shows the entire supplied image, so the correct aspect should be supplied by the user. -->
		<!-- <lead-image :content-id="leadImageId"></lead-image> -->
		<div class="article-lead-image">
			<div class="image-container">
				<img :src="getLeadImageUrl(leadImage, 'lead')" :alt="leadImage.altText" :title="leadImage.altText">
			</div>
		</div>
	</div>
	<p>{{heading}}</p>
</div>

</template>


<script>
	import {loadContent, getImageUrl} from 'wch-flux-sdk';

	export default {
		created () {
			loadContent(this.contentId);
		},
		computed: {
			leadImage (){
				if (this.$root.$data.content[this.contentId].elements.mainImage) {
					return this.$root.$data.content[this.contentId].elements.mainImage.value.leadImage;
				} return '';
			},
			heading () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.heading.value;
				}
				return '';
			},
		},
		methods: {
			getLeadImageUrl (leadImage, size) {
				if(leadImage) {
					return getImageUrl(leadImage, size);
				}
				return '';
			}
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/components/designArticleSummary.scss"></style>
