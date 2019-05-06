<template>
    <div>

        <input type="text" placeholder="File name" v-bind:value="name"
               v-on:input="update_name" style="margin: 2%; width: 96%">

        <div class="card" style="margin: 2%">
            <div class="card-tabs">
                <ul class="tabs tabs-fixed-width">
                    <li class="tab" v-on:click="tab_editor" style="cursor: pointer"><a>Editor</a></li>
                    <li class="tab" v-on:click="tab_view" style="cursor: pointer"><a>View</a></li>
                </ul>
            </div>
            <div class="card-content">
                <div id="editor" style="display: inline">
                    <textarea class="materialize-textarea" v-bind:value="text"
                              v-on:input="update_text" style="width: 100%;"></textarea>
                </div>
                <div id="view" style="display: none">
                    <div v-html="compiledMarkdown"></div>
                </div>

            </div>
        </div>
        <a class="waves-effect waves-light green accent-3 btn" v-on:click="handleSaveDocument" style="margin-left: 2%;margin-bottom: 2%">
            <i class="material-icons right">save</i>Save</a>

    </div>
</template>

<script>
    import marked from 'marked';
    import _ from 'lodash';

    export default {
        name: 'EditAndView',
        props: {
            details: Object,
            onSaveDocument: Function,
        },
        data:() => ({
            name: String,
            text: String
        }),
        watch: {
            details: function (newDetails) {
                this.text = newDetails.text;
                this.name = newDetails.name;
            }
        },
        created: function () {
            this.text = this.details ? this.details.text : '';
            this.name= this.details ? this.details.name : '';

        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.text, {sanitize: true});
            },
        },
        methods: {
            update_text: _.debounce(function (e) {
                this.text = e.target.value;
            }, 300),
            update_name: _.debounce(function (e) {
                this.name = e.target.value;
            }, 300),
            tab_editor: function() {
                const editor = document.getElementById('editor');
                const view = document.getElementById('view');
                editor.style.display = 'inline';
                view.style.display = 'none';
            },
            tab_view: function() {
                const editor = document.getElementById('editor');
                const view = document.getElementById('view');
                editor.style.display = 'none';
                view.style.display = 'inline';
            },
            handleSaveDocument: function () {
                this.onSaveDocument({
                    ...this.details,
                    text: this.text,
                    name: this.name
                });
            }
        },
    };

</script>

