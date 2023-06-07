/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/

import 'babel-polyfill';

import Vue from 'vue';
import VueRouter from 'vue-router';

import AppComponent from './app.vue';

import AllTypesPage from './pages/allTypesPage';
import AllTypesPageHero2Blocks from './pages/allTypesPageHero2Blocks';
import AllTypesPageHero4Blocks from './pages/allTypesPageHero4Blocks';
import StandardPage from './pages/standardPage';
import StandardPageHero2Blocks from './pages/standardPageHero2Blocks';
import StandardPageHero4Blocks from './pages/standardPageHero4Blocks';
import ErrorPage from './pages/errorPage';
import PreviewComponent from './components/previewComponent';

import {WchStore, setNavChangeFunction} from 'wch-flux-sdk';
import {WchPage, WchContent, WchEdit} from 'wch-flux-sdk/vue';
import 'wch-flux-sdk/localStorage';

Vue.use(VueRouter);

// for running on local host we want to configure the WCH lib
import { configWCH, getBaseUrl } from 'wch-flux-sdk';
import { Constants } from "./Constants";
configWCH(Constants.DOMAIN_NAME, Constants.CONTENT_HUB_ID, Constants.SITE_ID);

setNavChangeFunction(path => router.push({path: path}));		// set nav change function for preview

// load components globally
Vue.component('lead-image', () => import(/* webpackChunkName: "leadImage" */ './components/leadImage'));
Vue.component('preview-component',  () => import(/* webpackChunkName: "previewComponent" */ './components/previewComponent'));
Vue.component('share-social',  () => import(/* webpackChunkName: "shareSocial" */ './components/shareSocial'));
Vue.component('author-profile',  () => import(/* webpackChunkName: "authorProfile" */ './components/authorProfile'));

// load page components globally
Vue.component('all-types-page-layout', AllTypesPage);
Vue.component('all-types-page-hero-2-blocks', AllTypesPageHero2Blocks);
Vue.component('all-types-page-hero-4-blocks', AllTypesPageHero4Blocks);
Vue.component('standard-page-layout', StandardPage);
Vue.component('standard-page', StandardPage);
Vue.component('standard-page-hero-2-blocks', StandardPageHero2Blocks);
Vue.component('standard-page-hero-4-blocks', StandardPageHero4Blocks);
Vue.component('design-page-left',  () => import(/* webpackChunkName: "designPageLeft" */ './pages/designPageLeft'));
Vue.component('design-page-right',  () => import(/* webpackChunkName: "designPageRight" */ './pages/designPageRight'));

console.log("SPA framework: Vue");

// configure the router
let router = new VueRouter({
    mode: 'history',
	base: getBaseUrl(),
	routes: [
		{path: '/', redirect: '/home'},
		{path: '/error', name: 'error', component: ErrorPage, props: true},
		{path: '/component-preview', name: 'preview', component: PreviewComponent},
		{path: '/*/*', component: WchPage},
		{path: '/*', component: WchPage }
	]
});


document.title = 'Oslo';


Vue.component('wch-content', WchContent);
Vue.directive('wch-edit', WchEdit);

// load layouts dynamically
import './registration';


new Vue({
	el: '#app',
	components: {
		AppComponent
	},
	render (createElement) {
		return createElement(AppComponent);
	},
	data: WchStore,
	router
});
