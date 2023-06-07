<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
	<header id="site-header">
		<nav>
			<div class="title-bar" data-responsive-toggle="example-menu" data-hide-for="large">
				<button class="menu-icon" type="button" data-toggle="example-menu"></button>
				<div class="logo-container hide-for-large">
					<h1 class="logo" v-bind:style="{backgroundImage: imageUrl}"></h1>
					<header-search></header-search>
				</div>
			</div>
			<div class="top-bar" id="example-menu">
				<div class="top-bar-left show-for-large">
					<div class="logo-container show-for-large">
						<h1 class="logo" v-bind:style="{backgroundImage: imageUrl}"></h1>
					</div>
				</div>
				<div class="top-bar-right">
					<header-nav></header-nav>
				</div>
				<header-search></header-search>
			</div>
		</nav>
	</header>
</template>


<script>
	import {loadContent, getImageUrl} from 'wch-flux-sdk';

	import headerNav from './headerNav';
	import Search from './search-box/search-box.vue';

	const headerConfigId = '90d184ea-eb9c-4316-97a8-9d1ebc3029fc';

	export default {
		data: () => ({
		}),
		components: {
			'header-nav': headerNav,
			'header-search': Search	
		},
		created () {
			loadContent(headerConfigId);
			
		},
		methods: {
			// reload () {
			// 	// we know the exact content id for the header Config so we don't need to search for it.
			// 	loadContent('90d184ea-eb9c-4316-97a8-9d1ebc3029fc').then(res => {
			// 		this.imageUrl = getImageUrl(res.elements.websiteLogo);
			// 	});
			// }
		},
		computed: {
			imageUrl () {
				if (this.$root.$data.content[headerConfigId]) {
					let url = getImageUrl(this.$root.$data.content[headerConfigId].elements.websiteLogo);
					return `url('${url}')`;
				}
				return '';
			}
		}
	}
</script>


<style lang="scss" src="styles/components/siteHeader/siteHeader.scss"></style>
