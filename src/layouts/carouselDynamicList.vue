<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div :id="contentId" class="query-carousel">
	<h3>{{listTitle}}</h3>
	<div class="carousel">
		<div class="carousel-item" v-for="item of items">
			<wch-content :id="item.id" :props="{summary: true}"></wch-content>
		</div>
	</div>
	<view-all-button :link="viewAllLink"></view-all-button>
</div>
</template>

<script>
	import {loadContent, queryContent, getQueryString, getFirstCategory, sortQueriedItems} from 'wch-flux-sdk';

	const slickLoaded = new Promise((resolve, reject) => {
		if (!document.getElementById('slick-script-tag')) {
			let styleTag = document.createElement('link');
			styleTag.href = '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css';
			styleTag.rel = 'stylesheet';
			styleTag.async =true;
			document.head.appendChild(styleTag);

			let scriptTag = document.createElement('script');
			scriptTag.id = 'slick-script-tag';
			scriptTag.type = 'application/javascript';
			scriptTag.src = '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js';
			scriptTag.async = true;
			scriptTag.addEventListener('load', resolve);
			scriptTag.addEventListener('error', () => reject('Error loading script.'));
			scriptTag.addEventListener('abort', () => reject('Script loading aborted.'));
			document.body.appendChild(scriptTag);
		} else {
			resolve();
		}
	});

	export default {
		data: () => ({

			slickOptions: {
				'speed': 500,
				'slidesToShow': 4,
				'slidesToScroll': 4,
				'dots': false,
				'arrows': true,
				'responsive': [{
					'breakpoint': 1250,
					'settings': {
						'slidesToShow': 3,
						'slidesToScroll': 3
					}
				},
					{
					'breakpoint': 700,
					'settings': {
						'slidesToShow': 2,
						'slidesToScroll': 2
					}
				},
					{
					'breakpoint': 400,
					'settings': {
						'slidesToShow': 1,
						'slidesToScroll': 1
					}
				}]
			}
		}),
		created () {
			loadContent(this.contentId);
		},
		mounted () {
			slickLoaded.then(() => $('.carousel').slick(this.slickOptions));
		},
		watch: {
			items () {
				slickLoaded.then(() => {
					$('.carousel').slick('unslick');
					$('.carousel').slick(this.slickOptions);
				});
			}
		},
		beforeDestroy () {
			slickLoaded.then(() => $('.carousel').slick('unslick'));
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


<style lang="scss" src="styles/layouts/carouselDynamicList.scss"></style>
