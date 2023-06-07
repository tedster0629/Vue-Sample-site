<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<footer>
	<div class="wch-footer">
		<div class="grid-container">
			<div class="grid-x grid-padding-x">
				<div class="medium-3 cell footer-logo">
					<div class="logo-container">
						<div class="logo" v-bind:style="{backgroundImage: `url(${imageUrl})`}"></div>
					</div>
				</div>
				<div class="medium-3 cell footer-nav">
					<footer-nav></footer-nav>
				</div>
				<div class="medium-3 cell follow-us">
					<h5>Follow us</h5>
					<ul>
						<li>
							<a href="https://www.facebook.com">
								<svg class="icon">
									<use :href="icon.facebook"/>
								</svg>
								<span class="show-for-medium">Facebook</span>
							</a>
						</li>
						<li>
							<a href="https://twitter.com">
								<svg class="icon">
									<use :href="icon.twitter"/>
								</svg>
								<span class="show-for-medium">Twitter</span>
							</a>
						</li>
						<li>
							<a href="https://www.instagram.com">
								<svg class="icon">
									<use :href="icon.instagram"/>
								</svg>
								<span class="show-for-medium">Instagram</span>
							</a>
						</li>
					</ul>
				</div>
				<div class="medium-3 cell contact-us">
					<h5>Contact us</h5>
					<ul>
						<li><span>{{salesLabel}}</span> <a v-bind:href="`tel:${salesNumber}`">{{salesNumber}}</a></li>
						<li><span>{{customerServiceLabel}}</span> <a v-bind:href="`tel:${customerServiceNumber}`">{{customerServiceNumber}}</a></li>
						<li><span>email</span> <a v-bind:href="`mailto:${emailAddress}`">{{emailAddress}}</a></li>
					</ul>
				</div>

			</div>
			<div class="grid-x legal">
				<div class="copyright">&copy; <span>{{currentYear}}</span> {{copyrightText}}</div>
			</div>
		</div>
	</div>
</footer>
</template>


<script>
	import {loadContent, getImageUrl} from 'wch-flux-sdk';

	import FooterNav from './footerNav';

	const facebook = require('../../images/icon-facebook-logo.svg');
	const twitter = require('../../images/icon-twitter-logo-white.svg');
	const instagram = require('../../images/icon-instagram-logo.svg');

	const footerConfigId = 'ae72d304-ad18-4bf3-b213-4a79c829e458';

	export default {
		data: () => ({
			currentYear: '2017',

			icon: {
				facebook: `#${facebook.default.id}`,
				twitter: `#${twitter.default.id}`,
				instagram: `#${instagram.default.id}`,
			}
		}),
		components: {
			'footer-nav': FooterNav
		},
		computed: {
			imageUrl () {
				if (this.$root.$data.content[footerConfigId]) {
					return getImageUrl(this.$root.$data.content[footerConfigId].elements.Logo);
				} return '';
			},
			copyrightText () {
				if (this.$root.$data.content[footerConfigId]) {
					return this.$root.$data.content[footerConfigId].elements.copyright.value;
				} return '';
			},
			salesLabel () {
				if (this.$root.$data.content[footerConfigId]) {
					return this.$root.$data.content[footerConfigId].elements.labelForSales.value;
				} return '';
			},
			salesNumber () {
				if (this.$root.$data.content[footerConfigId]) {
					return this.$root.$data.content[footerConfigId].elements.salesNumber.value;
				} return '';
			},
			customerServiceLabel () {
				if (this.$root.$data.content[footerConfigId]) {
					return this.$root.$data.content[footerConfigId].elements.labelForCustomerService.value;
				} return '';
			},
			customerServiceNumber () {
				if (this.$root.$data.content[footerConfigId]) {
					return this.$root.$data.content[footerConfigId].elements.customerServiceContactNumber.value;
				} return '';
			},
			emailAddress () {
				if (this.$root.$data.content[footerConfigId]) {
					return this.$root.$data.content[footerConfigId].elements.emailAddress.value;
				} return '';
			},
		},
		created () {
			loadContent(footerConfigId);
		}
	}
</script>


<style lang="scss" src="styles/components/siteFooter/siteFooter.scss"></style>
