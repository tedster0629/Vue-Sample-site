<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div>
	<site-header v-if="this.$route.name !== 'preview'" />
	<div class="content-placeholder">
		<router-view/>
	</div>
	<site-footer v-if="this.$route.name !== 'preview'" />
</div>
</template>


<script>
	import SiteHeader from './components/siteHeader/siteHeader';
	import SiteFooter from './components/siteFooter/siteFooter';

	export default {
		components: {
			'site-header': SiteHeader,
			'site-footer': SiteFooter
		}
	}
</script>


<style lang="scss" src="styles/app"></style>
