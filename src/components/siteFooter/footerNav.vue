<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div>
	<h5>Menu</h5>
	<ul>
		<li v-for="page of site.pages">
			<!--<a v-bind:href="page.route">{{page.name}}</a>-->
			<router-link v-if="page && !page.hideFromNavigation" v-bind:to="page.route" >{{page.name}} </router-link>
		</li>
	</ul>
</div>
</template>


<script>
	import {loadSite} from 'wch-flux-sdk';

	export default {
		created () {
			loadSite
		},
		computed: {
			site () {
				return this.$root.$data.site;
			}
		}
	}
</script>


<style lang="scss" src="styles/components/siteFooter/footerNav.scss" scoped></style>