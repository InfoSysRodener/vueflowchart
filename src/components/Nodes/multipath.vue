<template>
    <div class="flowchart-operator">
        <div class="flowchart-operator-title-icon">
            <div class="flowchart-operator-icon">

            </div>
            <div v-text="type" class="flowchart-operator-title"></div>
        </div>
        <div
          class="node-port node-output"
        >
        </div>
        <button @click="createPath"> add path </button>
    </div>
</template>

<script>
    export default {
        name: "multipath",
        props:{
            type: {
                type: String,
                default: "Default"
            },
            id: {
                type: Number,
                default: 1000,
                validator(val) {
                    return typeof val === "number";
                }
            },
            x: {
                type: Number,
                default: 0,
                validator(val) {
                    return typeof val === "number";
                }
            },
            y: {
                type: Number,
                default: 0,
                validator(val) {
                    return typeof val === "number";
                }
            },
        },
        data:() => ({

        }),
        methods:{
            createPath(){
                this.$emit('createNewPath',{
                    id:this.id,
                    x:this.x,
                    y:this.y,
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .flowchart-operator-diamond{

    }
    .diamond {
        position: relative;
        height: 200px;
        width: 200px;
        line-height: 200px;
        text-align: center;
        margin: 10px 40px;
    }
    .diamond:before {
        position: absolute;
        content: '';
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        transform: rotateX(45deg) rotateZ(45deg);
        box-shadow: 0px 0px 12px gray;
    }
    .diamond:after {
        position: absolute;
        top: 10px;
        left: 10px;
        content: '';
        height: calc(100% - 22px);  /* -22px is 2 * 10px gap on either side - 2px border on either side */
        width: calc(100% - 22px);  /* -22px is 2 * 10px gap on either side - 2px border on either side */
        border: 1px solid orange;
        transform: rotateX(45deg) rotateZ(45deg);
    }

</style>