<template>
    <div
       class="flowchart-operator"
    >
        <div class="flowchart-operator-title-icon">
            <div class="flowchart-operator-icon">

            </div>
            <div v-text="type" class="flowchart-operator-title"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "end",
        props:{
            type: {
                type: String,
                default: "Default"
            },
        },
        data:() => ({

        }),
        mounted(){
            console.log(this.type);
        }
    }
</script>

<style scoped>

</style>