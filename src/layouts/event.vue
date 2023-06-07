<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div>
	<div class="reveal" :id="eventId" data-reveal>
		<h2 class="event-popup-title" id="popup-title">{{eventTitle}}</h2>
		<p class="event-popup-description" id="popup-description" v-html="eventDetails"></p>
		<p>Location:
			<span v-html="eventLocation"></span>
		</p>
		<button class="close-button" data-close aria-label="Close modal" type="button">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>

	<section>
		<div class="event">
			<div class="event-content">
				<time class="event-date text-content" :datetime="eventDate">{{eventDate}}</time>
				<h5 class="event-title text-header">{{eventTitle}}</h5>
				<p class="event-description text-content" v-html="eventDescription"></p>
				<a class="button" :data-open="eventId">Details</a>
			</div>
		</div>
	</section>
</div>

</template>


<script>
	import {loadContent, getImageUrl} from 'wch-flux-sdk';
	export default {
		created () {
			loadContent(this.contentId);
		},
		mounted () {
			$(`#${this.eventId}`).foundation();
		},
		beforeDestroy () {
			$(`#${this.eventId}`).foundation('_destroy');
            $(`#${this.eventId}`).remove();
		},
		computed: {
			eventId () {
				return `event-${this.contentId}`;
			},
			eventTitle () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.heading.value;
				} return '';
			},
			eventDate () {
				if (this.$root.$data.content[this.contentId]) {
					return (new Date(this.$root.$data.content[this.contentId].elements.date.value)).toDateString();
				} return '';
			},
			eventLocation () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.eventLocation.value;
				} return '';
			},
			eventDescription () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.body.value;
				} return '';
			},
			eventDetails () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.eventDetails.value;
				} return '';
			},
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/layouts/event.scss"></style>
