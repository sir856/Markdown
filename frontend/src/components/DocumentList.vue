<template>
    <ul>
        <DocumentItem
                v-for="documentItem in documents"
                v-bind:name="documentItem.name"
                v-bind:change-date="documentItem.changeDate"
                v-bind:on-choose-document="onChooseDocument.bind(null, documentItem.id)"
                v-bind:on-delete-document="onDeleteDocument.bind(null, documentItem.id)"
                v-bind:key="documentItem.id"
        />
    </ul>
</template>

<script>
    import DocumentItem from '@/components/DocumentItem';
    export default {
        name: 'DocumentList',
        components: {DocumentItem},
        props: {
            documents: Array,
            onChooseDocument: Function,
            onDeleteDocument: Function,
        }
    };
</script>

<style scoped>

</style>
