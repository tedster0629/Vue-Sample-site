<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<ul id="header-nav-menu" class="vertical medium-horizontal menu" data-responsive-menu="accordion medium-dropdown">
	<li class="top-level-nav-item" v-for="page of site.pages">
		<router-link v-if="page && !page.hideFromNavigation" v-bind:to="page.route" active-class="active">{{page.name}}</router-link>
		<ul class="vertical menu" v-if="page.children.length > 0">
			<li v-for="child of page.children">
				<router-link v-bind:to="child.route" active-class="active">{{child.name}}</router-link>
			</li>
		</ul>
	</li>
</ul>
</template>

<script>
	import {loadSite} from 'wch-flux-sdk';

	export default {
		created () {
			loadSite();
			
		},
		mounted () {
			$('#site-header').foundation();
		},
		watch: {
			site (newVal, oldVal) {
				setTimeout(() => {
					$('#header-nav-menu').foundation('_destroy');
					$('#header-nav-menu').foundation();
				});
			}
		},
		computed: {
			site () {
				return this.$root.$data.site;
			}
		}
	}
</script>

<style lang="scss" src="styles/components/siteHeader/headerNav.scss"></style>
