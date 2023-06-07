<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div class="about-the-author">
	<img :src="imageUrl" :alt="altText" :title="altText" />
	<div>
		<h5>{{name}}</h5>
		<div v-html="shortBio"></div>
	</div>
</div>
</template>


<script>
	import {loadContent, getImageUrl} from 'wch-flux-sdk';

	export default {
		data: () => ({
			imageRendition: 'closeUp'
		}),
		created () {
			loadContent(this.contentId);
		},
		computed: {
			imageUrl () {
				if (this.$root.$data.content[this.contentId]) {
					return getImageUrl(this.$root.$data.content[this.contentId].elements.profilePicture, this.imageRendition);
				}
				return '';
			},
			altText () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.profilePicture.altText;
				}
				return '';
			},
			name () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.name.value;
				}
				return '';
			},
			shortBio () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.shortBio.value;
				}
				return '';
			}
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/components/authorProfile.scss" scoped></style>
