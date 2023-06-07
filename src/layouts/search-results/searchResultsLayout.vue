<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
	<div :id="contentId" class="grid-container">
		<div v-if="searchTerm">
			<div v-if="numFound > 0 && !searchError" class="grid-x grid-margin-x">
				<div v-if="!inFlight" class="large-10 medium-9 small-8 cell results">
					<div v-if="numFound === 1"> {{numFound}} search result for <strong>"{{searchTerm}}"</strong></div>
					<div v-if="numFound > 1"> {{numFound}} search results for <strong>"{{searchTerm}}"</strong></div>
				</div>
				<div v-if="inFlight" class="large-12 medium-12 small-12">
					<div class="loading">searching...</div>
				</div>
				<div class="large-4 medium-6 cell search-result-item" v-for="item in searchResults">
					<wch-content :id="item.contentId" :props="{summary: true}"></wch-content>
				</div>
			</div>
			<div v-if="numFound === 0 || searchError" class="grid-x grid-margin-x">
				<div class="medium-12 cell">
					<div v-if="!inFlight" class="results">
						<p>Searching for "{{searchTerm}}" doesn't return any good matches.</p>
						<p>Try your search again with a different term or browse our recommendations.</p>
					</div>
					<div v-if="inFlight" class="large-12 medium-12 small-12">
						<div class="loading">searching...</div>
					</div>
				</div>
				<div v-if="!inFlight && suggestedArticlesId" class="medium-12 cell">
					<wch-content :id="suggestedArticlesId"></wch-content>
				</div>									
			</div>
		</div>
		<div v-if="!searchTerm" class="grid-x grid-margin-x">
			No results found
		</div>	
		<div id="loadIcon">
			<div v-if="moreToLoad() && searchTerm && !inFlight && !searchError" class="loading">Loading...</div>
		</div>			
	</div>
</template>

<script>
	import {loadSite, loadContent, queryContent, getQueryString, getFirstCategory, sortQueriedItems, getApiUrl} from 'wch-flux-sdk';

	const lucene = require('lucene-query-string-builder');
	import * as _ from 'lodash';

	export default {
		data: () => ({
			SearchConstants: {
				PAGE_TYPES_SEARCHED: ['Design Page'],
				SUMMARY: 'Summary'
			},
			searchResults: [],
			numFound: 0,
			searchTerm: '',
  			searchKeywords: [],
			inFlight: false,
			searchError: false,
			searchTypes: [],
			rowsPerRequest: 3,	
			start: 0,		
			SEARCH_CONTENT_TYPE_KEY: 'pageTypesToSearch'		
		}),	
		mounted () {
			this.searchResultsLayoutInit();	

			//throttle the scroll event to improve performance
			$(window).on(
      			'scroll',
      			_.throttle(this._scrollHandler, 300)
    		);					
		},	
		beforeDestroy () {
			$(window).off(
				'scroll',
				_.throttle(this._scrollHandler, 300)
			);			
		},	
		computed: {
            suggestedArticlesId () {
                if (this.$root.$data.content[this.contentId]) {
                    return this.$root.$data.content[this.contentId].elements.suggestedArticles.value ? this.$root.$data.content[this.contentId].elements.suggestedArticles.value.id : '';
                } return '';
            },		
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
			}	
		},		
		methods: {	
			searchResultsLayoutInit () {
					let searchTerm = this.$route.query.searchTerm;	
					if (searchTerm && searchTerm.length > 0) {
						searchTerm = searchTerm.trim();
			            this.searchTerm = searchTerm;
			            this.inFlight = true;
			            this.searchResults = [];
			            this.start = 0;
			            this.searchError = false;
			            this.searchTypes = this.SearchConstants.PAGE_TYPES_SEARCHED;
			            this.searchKeywords = searchTerm.split(/[\s&#.,]/);
			            this.searchKeywords.forEach(function(word, index, array) {
			                array[index] = word.replace(/[-[\]{}()+\-*"&!~?:\\^|]/g, '\\$&');
			              });
			            this._search();
			        }					
			},
			_scrollHandler () {
				/*
			         On page load we need to check in the loading icon is on screen.  If so, load more items until it is not longer
			         visible or scroll reaches 70%
			     */

			    let scrollTop = $(document).scrollTop();
			    let scrollPercentage = (scrollTop / ($(document).height() - $(window).height()));

			    if ($("#loadIcon")[0] != null) {
				    let rect = $("#loadIcon")[0].getBoundingClientRect();
				    let clientHeight = document.documentElement.clientHeight;
				    let windowHeight = $(window).innerHeight();
				    let viewHeight = Math.max(clientHeight, windowHeight);

			        if (scrollPercentage > 0.70 || !(rect.bottom < 0 || rect.top - viewHeight >= 0)) 
			        {
		   	        	this.getMoreResults();
				    }
			    }
			},
			_search() {
				let apiUrl = getApiUrl();
		        let textQuery = this.searchKeywords.reduce((query, currentVal,index) => {
		          return (index === 0) ? `${currentVal}~1` : `${query} AND ${currentVal}~1`;
		        },'');
		        let typeQuery = this.searchTypes.reduce((types, currentVal, index) => {
		          return (index === 0) ? `&fq=type:"${currentVal}"` : `${types} OR type:"${currentVal}"`;
		        }, '');

		        let searchURL = `${apiUrl}/delivery/v1/search?q=classification:page`
		          + typeQuery
		          + `&fq={!join%20from=id%20to=aggregatedIds}`
		          + `text:(${textQuery})`
		          + `&rows=${this.rowsPerRequest}&start=${this.start * this.rowsPerRequest}&fl=*`;

			    this.start++;	

			    // allows external function call from ajax return functions
			    let that = this;
			    let promise = $.ajax(searchURL);
			    promise.done(function(res) {
			    	that.processResults(res);
			    });
			    promise.fail(function() {
			    	that.processError();
			    });
			},
			processResults(res) {
	    		this.inFlight = false;
				this.numFound = res.numFound;
				this.searchResults = this.searchResults.concat(res.documents); 
	    		this._scrollHandler();
			}, 
			processError() {
			    console.out("in processError");
	    		this.searchError = true;
			},
			getMoreResults() {
				if (this.moreToLoad()) {
					this._search();
				}
			},
			moreToLoad() {
				return this.numFound > (this.rowsPerRequest * this.start);
			},
		},	
		props: ['contentId', 'summary']
	}
</script>

<style lang="scss" src="styles/layouts/search-results/searchResultsLayout.scss"></style>

