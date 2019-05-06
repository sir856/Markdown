<template>
    <li v-on:click="onChooseDocument" style="width: 31%; margin-left: 2%">
        <div class="card" >
            <div class="card-content">
                <ul class="tabs">
                    <li class="tab" style="width: 67%; font-size: 15pt; overflow: hidden; text-overflow: ellipsis">
                        {{name}}</li>
                    <li class="tab" style="width: 28%; font-size: 10pt">
                        {{changeDate}}</li>
                    <li class="tab">
                        <i class="material-icons" style="cursor: pointer" v-on:click="onDeleteDocument">delete</i>
                    </li>
                </ul>
            </div>
        </div>
    </li>


</template>

<script>
    export default {
        name: 'DocumentItem',
        props: {
            name: String,
            changeDate: String,
            onChooseDocument: Function,
            onDeleteDocument: Function,
        }
    };
</script>
