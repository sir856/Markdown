<template>
    <div id="app" >
        <DocumentList id="list" style="display: none; flex-wrap: wrap"
                      v-bind:documents="documents"
                      v-bind:on-choose-document="handleChooseDocument"
                      v-bind:on-delete-document="handleDeleteDocument"
        ></DocumentList>
        <div class="btn grey" id="show" v-on:click="show_documents" style="width: 16%; margin-left: 42%">Список документов</div>
        <div class="btn grey" id="hide" v-on:click="hide_documents" style="display: none">Скрыть</div>
        <br>
        <div class="waves-effect waves-light blue accent-3 btn" v-on:click="handleCreateNewDocument"
           style="margin-left: 2%">
            <i class="material-icons right">create</i>Create</div>
        <Markdown
                v-if="documentDetail"
                v-bind:details="documentDetail"
                v-bind:on-save-document="saveDocument"
        />
    </div>
</template>

<script>
    import DocumentsService from '@/api/api';
    import DocumentList from '@/components/DocumentList';
    import Markdown from '@/components/EditAndView';

    export default {
        components: {DocumentList, Markdown},
        data: () => ({
            documents: [],
            documentDetail: null,
        }),
        created: async function () {
            await this.getDocumentsList();
            await this.getInitDocument();
        },
        methods: {
            show_documents: function () {
                const list = document.getElementById("list");
                const show = document.getElementById("show");
                const hide = document.getElementById("hide");
                list.style.display="flex";
                show.style.display="none";
                hide.style.display="";
                hide.style.width="10%";
                hide.style.marginLeft="43%";
            },
            hide_documents: function () {
                const list = document.getElementById("list");
                const show = document.getElementById("show");
                const hide = document.getElementById("hide");
                list.style.display="none";
                show.style.display="";
                show.style.width="16%";
                hide.style.display="none";
            },
            async getDocumentsList() {
                this.documents = await DocumentsService.fetchDocumentsList();
            },
            async handleChooseDocument(id) {
                this.documentDetail = await DocumentsService.fetchDocument(id);
            },
            async getInitDocument() {
                if (this.documents.length) {
                    await this.handleChooseDocument(this.documents[0].id);
                } else {
                    this.documentDetail = null;
                }
            },
            async handleDeleteDocument(id) {
                const result = await DocumentsService.deleteDocument(id);
                if (result) {
                    await this.getDocumentsList();
                }
                if (id === this.documentDetail.id) {
                    await this.getInitDocument();
                }
            },
            async saveDocument(data) {
                let doc = await DocumentsService.saveDocument(data);
                await this.getDocumentsList();
                return doc;
            },
            async handleCreateNewDocument() {
                const createdDocument = await this.saveDocument({
                    text: '# New',
                    name: 'document'.concat((this.documents.length + 1)),
                });
                await this.handleChooseDocument(createdDocument.id);
                await this.getDocumentsList();
            },
        },
    };
</script>

