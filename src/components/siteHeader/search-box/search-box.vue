<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
	<div class="searchWrapper">
  		<form class="search-form" id="search-form" name="search-form">
    		<input type="search" v-model="query" name="searchTerm" v-bind:class="{'active-input': query.length > 0}">
    			<button class="search-button" v-on:click="search">
    				<svg class="search-button">
						<use :href="icon.srch"/>
					</svg>
    			</button>    			
				<svg class="search-input-clear" v-on:click="clearSearch" v-bind:class="{'show-clear-button': query.length > 0}">
					<use :href="icon.srchinputclear"/>
				</svg> 
			</input>	   			
  		</form>
	</div>
</template>


<script>
	import {loadSite} from 'wch-flux-sdk';

	const srchinputclear = require('./images/search-input-clear.svg');
	const srch = require('./images/search.svg');	

	export default {
		data: () => ({
			icon: {
				srchinputclear: `#${srchinputclear.default.id}`,
				srch: `#${srch.default.id}`,
			},
			SearchConstants: {
				/* path for search results page */
				SEARCH_RESULTS_PAGE_PATH: '/searchresults'
			},
			query: ''					
		}),
		methods: {	
			search () {
					this.$router.push({path: this.SearchConstants.SEARCH_RESULTS_PAGE_PATH});				
			},
		  	clearSearch () {
			    	this.query = '';			    	
		  	}			
		}				
	}  	
</script>

<style lang="scss" src="styles/components/siteHeader/search-box/search-box.scss"></style>


