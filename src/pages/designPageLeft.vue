<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
	<div>
		<router-link v-if="summary && route" :to="route">
			<design-article-summary v-if="designTopicId.length > 0" :content-id="designTopicId"></design-article-summary>
		</router-link>
		<div v-if="!summary" class="grid-container section-small">
			<div :id="contentId" class="grid-x grid-padding-x">
				<div class="medium-8 cell auto">
					<div class="section">
						<design-article v-if="designTopicId.length > 0" :content-id="designTopicId"></design-article>
					</div>
				</div>
				<div class="medium-4 cell shrink">
					<div class="section">
						<vertical-list v-if="relatedArticlesId.length > 0" :content-id="relatedArticlesId"></vertical-list>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
    import {loadContent, getRouteForContentId} from 'wch-flux-sdk';
    import DesignArticleSummary from '../components/designArticleSummary';
    import DesignArticle from '../layouts/designArticle';
    import VerticalList from '../layouts/verticalList';

    export default {
        components: {
            'design-article': DesignArticle,
            'design-article-summary': DesignArticleSummary,
            'vertical-list' : VerticalList
        },
        created () {
            loadContent(this.contentId);
        },
        computed: {
            designTopicId () {
                if (this.$root.$data.content[this.contentId]) {
                    return this.$root.$data.content[this.contentId].elements.designTopic.value ? this.$root.$data.content[this.contentId].elements.designTopic.value.id : '';
                } return '';
            },
            relatedArticlesId () {
                if (this.$root.$data.content[this.contentId]) {
                    return this.$root.$data.content[this.contentId].elements.relatedArticles.value ? this.$root.$data.content[this.contentId].elements.relatedArticles.value.id : '';
                } return '';
            },
            route () {
                if (this.summary) {
                    return getRouteForContentId(this.contentId);
                } return '';
            },
        },
        props: ['contentId', 'summary']
    };
</script>


<style lang="scss" src="styles/pages/designPageLeft.scss" scoped></style>