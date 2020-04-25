<template>

        <div class="flowchart-operator-multipath">
            <!--<div class="flowchart-operator-title-icon">-->
                <!--<div class="flowchart-operator-icon">-->

                <!--</div>-->
                <!--<div v-text="type" class="flowchart-operator-multipath-title"></div>-->
            <!--</div>-->
            <div v-text="type" class="flowchart-operator-multipath-title"></div>
            <div class="node-port node-output">
            </div>
            <div >
                <button  @click="createPath" class="add-path-btn"> + </button>
            </div>
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
                    width:300,
                    height:60
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    $themeColor: rgb(44, 42, 46);
    $portSize: 12;

    .flowchart-operator-multipath{
        position: relative;
        margin:10px 10px;
        box-sizing: border-box;
        border: 2px solid black;
        background: white;
        z-index: 1;
        opacity: 0.9;
        cursor: move;
        pointer-events: initial;
        border-radius: 5px;
        -webkit-box-shadow: -2px 0px 8px -4px rgba(0,0,0,0.75);
        -moz-box-shadow: -2px 0px 8px -4px rgba(0,0,0,0.75);
        box-shadow: -2px 0px 8px -4px rgba(0,0,0,0.75);
        transform:rotate(43deg);
        -ms-transform:rotate(43deg);
        -webkit-transform:rotate(43deg);
        .node-port {
            position: absolute;
            width: #{$portSize}px;
            height: #{$portSize}px;
            left: 100%;
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
    .add-path-btn{
        position:relative;
        border-radius:50px;
        width: 50px;
        font-size: 20px;
        padding: 10px;
        display: block;
        margin: auto;

    }
    .flowchart-operator-multipath-title{
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
        transform:rotate(0deg);
        -ms-transform:rotate(0deg);
        -webkit-transform:rotate(0deg);
    }
    .selected {
        border: 3px solid #51eaea;
    }
</style>