<template>
    <div class="path-style">
        <div>
            <div class="flowchart-operator-title-icon">
                <div class="flowchart-operator-icon">

                </div>
                <div v-text="type" style="color:white" class="flowchart-operator-title"></div>
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
        name: "paths",
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
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    $themeColor: rgb(44, 42, 46);
    $portSize: 12;
     .path-style{
        position: relative;
        box-sizing: border-box;
        border: 2px solid black;
        background: #3557ff;
        z-index: 1;
        opacity: 0.9;
        cursor: move;
        pointer-events: initial;
        border-radius:25px;
        -webkit-box-shadow: -2px 0px 8px -4px rgba(0,0,0,0.75);
        -moz-box-shadow: -2px 0px 8px -4px rgba(0,0,0,0.75);
        box-shadow: -2px 0px 8px -4px rgba(0,0,0,0.75);
        display: flex;
        flex-direction: column;
        .node-port {
                  position: absolute;
                  width: #{$portSize}px;
                  height: #{$portSize}px;
                  left: 50%;
                  transform: translate(-50%);
                  border: 1px solid #ccc;
                  border-radius: 100px;
                  background: white;
                  &:hover {
                      background: $themeColor;
                      border: 1px solid $themeColor;
                  }
              }
         .node-input {
             top: #{-2 + $portSize/-2}px;
         }
         .node-output {
             bottom: #{-2 + $portSize/-2}px;
         }
    }
    .flowchart-operator-title{
        width: 100%;
        text-transform: uppercase;
        padding: 20px 0;
        font-weight: bold;
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: move;
        text-align: center;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        display: grid;
        grid-template-columns: 75% 25%;
    }
    .selected {
        border: 3px solid #51eaea;
    }
</style>