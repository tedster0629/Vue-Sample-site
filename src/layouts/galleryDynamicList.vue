<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div :id="contentId" class="query-gallery">
	<h3>{{listTitle}}</h3>
	<div class="grid-container grid-container-padded">
		<div class="grid-x grid-margin-x">
			<div class="medium-4 cell" v-for="item of items">
				<wch-content :id="item.id" :props="{summary: true}"></wch-content>
			</div>
		</div>
	</div>
	<view-all-button :link="viewAllLink"></view-all-button>
</div>
</template>


<script>
	import {loadContent, queryContent, getQueryString, getFirstCategory, sortQueriedItems} from 'wch-flux-sdk';



	export default {
		created () {
			loadContent(this.contentId);
		},
		computed: {
			type () {
				if (this.$root.$data.content[this.contentId]) {
					return getFirstCategory(this.$root.$data.content[this.contentId].elements.contentType);
				} return '';
			},
			maxItems () {
				if (this.$root.$data.content[this.contentId]) {
					if (this.$root.$data.content[this.contentId].elements.maxItem.value) {
						return this.$root.$data.content[this.contentId].elements.maxItem.value;
					}
				} return 10;
			},
            sortOrder () {
                if (this.$root.$data.content[this.contentId]) {
                    return this.$root.$data.content[this.contentId].elements.sortOrder;
                }
            },
			listTitle () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.listTitle.value;
				}
			},
			items () {
				if (this.type.length > 0) {
					let queryString = getQueryString(this.type, this.maxItems);

					if (!this.$root.$data.queries[queryString]) {
						queryContent(this.type, this.maxItems);
					} else {
                        let sortField = (this.type === 'Alphabetical ascending' || this.type === 'Alphabetical descending') ? 'heading' : 'date';
                        return sortQueriedItems(this.$root.$data.queries[queryString].itemsContext, sortField, getFirstCategory(this.sortOrder), this.maxItems);
					}
				} return [];
			},
			viewAllLink () {
				if (this.$root.$data.content[this.contentId]) {
					return (this.$root.$data.content[this.contentId].elements.viewAllLink) ? this.$root.$data.content[this.contentId].elements.viewAllLink : {};
				} return {};
			}
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/layouts/galleryDynamicList.scss" scoped></style>