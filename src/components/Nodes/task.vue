<template>
    <div class="flowchart-operator">
        <div>
            <div class="flowchart-operator-title-icon">
                <div class="flowchart-operator-icon">

                </div>
                <div v-text="type" class="flowchart-operator-title"></div>
            </div>
        </div>
        <div
          class="node-port node-output"
          @click="selectOutputNodePort"
        >
        </div>
    </div>
</template>

<script>
    export default {
        name: "task",
        props:{
            type: {
                type: String,
                default: "Default"
            },
        },
        data:() => ({

        }),
        methods:{
            selectOutputNodePort(e){
                this.$emit('selectOutputNodePort',e);
            }
        }

    }
</script>

<style scoped>

</style>