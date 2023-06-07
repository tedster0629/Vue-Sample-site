<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div :id="contentId">

	<div :id="itemId" class="reveal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
		<div v-html="dialogMessage"></div>
		<a class="close-button" data-close aria-label="Close">&#215;</a>
	</div>

	<section class="grid-container">
		<!--{{this.$root.$data.content[this.contentId].elements.backgroundImage}}-->
		<div class="newsletter" :style="`background-image: url('${imageUrl}');`">
			<div class="call-to-action">
				<h4>{{headline}}</h4>
			</div>
			<div class="wrap-inputs">
				<form name="emailForm" v-on:submit.prevent>
					<input type="text" v-on:keyup.enter="openModal()" v-model="emailAddress" class="text-content" placeholder="Email address" name="emailAddr" />
					<button v-on:click="addEmail" type="button" class="button news-btn float-right"  id="newsletter-subscribe" :data-open="itemId">{{callToAction.linkText}}</button>
				</form>
			</div>
		</div>
	</section>
</div>

</template>


<script>
	import {loadContent, getImageUrl} from 'wch-flux-sdk';
	export default {
		data: () => ({
			emailAddress: '',
			modal: {}
		}),
		created () {
			loadContent(this.contentId);
		},
		mounted () {
			$(`#${this.itemId}`).foundation();
		},
		beforeDestroy () {
			$(`#${this.itemId}`).foundation('_destroy');
            $(`#${this.itemId}`).remove();
		},
		computed: {
			imageUrl () {
				if (this.$root.$data.content[this.contentId]) {
					return getImageUrl(this.$root.$data.content[this.contentId].elements.backgroundImage, 'short');
				} return '';
			},
			headline () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.text.value;
				} return '';
			},
			callToAction () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.link;
				} return {};
			},
			dialogMessage () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.dialogMessage.value;
				} return '';
			},
			itemId () {
				return `signup-${this.contentId}`;
			},
		},
		methods: {
			openModal(){
				this.addEmail();
				$(`#${this.itemId}`).foundation('open');
			},
			addEmail() {
				return;
			}
		},
		props: ['contentId']
	}
</script>

<style lang="scss" src="styles/layouts/signUp.scss" scoped></style>
