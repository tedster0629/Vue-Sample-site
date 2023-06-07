<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div :id="contentId" class="item-selection">
	<h3>{{heading}}</h3>

		<div class="grid-x grid-margin-x">
			<div class="medium-4 cell" v-for="item of items">
				<wch-content :id="item.id" :props="{summary: true}"></wch-content>
			</div>
		</div>
	<view-all-button :link="viewAllLink"></view-all-button>
</div>
</template>


<script>
	import {loadContent} from 'wch-flux-sdk';

	export default {
		created () {
			loadContent(this.contentId);
		},
		computed: {
			heading () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.heading.value;
				} return '';
			},
			items () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.items.values;
				} return [];
			},
			viewAllLink () {
				if (this.$root.$data.content[this.contentId]) {
					return (this.$root.$data.content[this.contentId].elements.viewAllLink) ? this.$root.$data.content[this.contentId].elements.viewAllLink : {};
				} return {};
			},
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/layouts/galleryList.scss" scoped></style>