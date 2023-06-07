<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div class="view-all"  v-if="isButtonLinkSet()">
	<a v-if="link.linkURL.startsWith('http')" :href="link.linkURL" class="button button-view-all">{{link.linkText}}</a>
	<router-link v-if="!link.linkURL.startsWith('http')" :to="link.linkURL" class="button button-view-all">{{link.linkText}}</router-link>
</div>
</template>


<script>
	export default {
		methods: {
			isButtonLinkSet () {
				return this.link && this.link.linkURL && this.link.linkURL.length > 0;
			}
		},
		props: ['link']
	}
</script>


<style lang="scss" src="styles/components/viewAllButton.scss" scoped></style>
