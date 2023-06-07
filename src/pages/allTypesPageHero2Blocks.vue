<!--
Copyright IBM Corporation 2018.
LICENSE: Apache License, Version 2.0
-->
<template>
<div id="this.contentId" class="grid-x">
	<div v-if="banner.length > 0" class="cell">
		<div class="section" v-for="item of banner">
			<wch-content :id="item.id"></wch-content>
		</div>
  	</div>
	<div v-if="sectionOne.length > 0 || sectionTwo.length > 0" class="bottom-sections-container medium-12 large-12 columns">
		<div class="grid-x">
			<div v-if="sectionOne.length > 0" class="medium-6 large-6 columns cell">
				<div class="section" v-for="item of sectionOne">
					<div class="grid-x">
						<div class="grid-container">
							<wch-content :id="item.id"></wch-content>
						</div>
					</div>
				</div>
			</div>
			<div v-if="sectionTwo.length > 0" class="medium-6 large-6 columns cell">
				<div class="section" v-for="item of sectionTwo">
					<div class="grid-x">
						<div class="grid-container">
							<wch-content :id="item.id"></wch-content>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>


<script>
	import {loadContent} from 'wch-flux-sdk';

	export default {
		created () {
			loadContent(this.contentId);
		},
		computed: {
			banner () {
				if (this.$root.$data.content[this.contentId]) {
					return (this.$root.$data.content[this.contentId].elements.banner.values) ? this.$root.$data.content[this.contentId].elements.banner.values : [];
				} return [];
			},
			sectionOne () {
				if (this.$root.$data.content[this.contentId]) {
					return (this.$root.$data.content[this.contentId].elements.sectionOne.values) ? this.$root.$data.content[this.contentId].elements.sectionOne.values : [];
				} return [];
			},
			sectionTwo () {
				if (this.$root.$data.content[this.contentId]) {
					return (this.$root.$data.content[this.contentId].elements.sectionTwo.values) ? this.$root.$data.content[this.contentId].elements.sectionTwo.values : [];
				} return [];
			}
		},
		props: ['contentId']
	};
</script>


<style lang="scss" src="styles/pages/allTypesPageHero2Blocks.scss" scoped></style>