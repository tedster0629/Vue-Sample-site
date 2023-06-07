<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div class="grid-container grid-container-padded section">
  <div class="error-wrapper">
    <div class="error-code">
      {{status}}
    </div>
    <div class="error-code-message">
		<p v-html="errorMessage"></p>
		<view-all-button :link="goHomeButton"></view-all-button>
    	<!-- <router-link class="button" v-bind:to="goHomeLinkUrl">{{goHomeLinkText}}</router-link> -->
    </div>
  </div>
</div>
</template>


<script>
	import {loadContent} from 'wch-flux-sdk';

	const errorContentId = 'fe3b25d4-5f96-4741-afc3-e27efe52f973';
	export default {
		created () {
			loadContent(errorContentId);
			
		},
		computed: {
			errorMessage () {
				if (this.$root.$data.content[errorContentId]) {
					return this.$root.$data.content[errorContentId].elements.errorMessage.value;
				} return ''
			},
			goHomeButton () {
				if (this.$root.$data.content[errorContentId]) {
					return this.$root.$data.content[errorContentId].elements.goHomeButton;
				} return {};
			}
		},
		props: ['status'],
	}
</script>


<style lang="scss" src="styles/pages/errorPage.scss" scoped></style>