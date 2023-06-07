<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div class="share-buttons">
  <span class="twitter">
    <iframe v-if="twitterLink"
			:src="twitterLink"
			width="76"
			height="20"
			title="Twitter Tweet Button"
			style="border: 0; overflow: hidden;">
    </iframe>
  </span>
	<span class="facebook">
  <iframe v-if="facebookLink" :src="facebookLink" width="59" height="20" style="border:none;overflow:hidden"
		  scrolling="no" frameborder="0" allowTransparency="true"></iframe>
  </span>


</div> <!-- End .share-buttons -->
</template>


<script>
	export default {
		data: () => ({
			tweetOptions: {
				baseUrl: 'https://platform.twitter.com/widgets/tweet_button.html',
				url: encodeURIComponent(window.location.href),
				buttonSize: 's',
				text: '',
				hashtags: ''
			},
			facebookOptions: {
				baseUrl: 'https://www.facebook.com/plugins/share_button.php',
				url: `${encodeURIComponent(window.location.href)}`,
				layout: 'button',
				size: 'small',
				mobile_iframe: false
			} 
		}),
		created () {
			this.tweetOptions.text = this.tweetMsg;
			this.tweetOptions.hashtags = this.hashTags;
		},
		computed: {
			twitterLink () {
				return `${this.tweetOptions.baseUrl}?size=${this.tweetOptions.buttonSize}&url=${this.tweetOptions.url}&text=${this.tweetOptions.text}&hashtags=${this.tweetOptions.hashtags}`;
			},
			facebookLink () {
				return `${this.facebookOptions.baseUrl}?href=${this.facebookOptions.url}&layout=${this.facebookOptions.layout}&size=${this.facebookOptions.size}&mobile_iframe=${this.facebookOptions.mobile_iframe}&appId`;
			}
		},
		props: ['tweetMsg', 'hashTags']
	}
</script>


<style lang="scss" src="styles/components/shareSocial.scss" scoped></style>
