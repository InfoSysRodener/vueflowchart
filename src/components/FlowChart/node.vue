<!-- eslint-disable -->
<template>
  <div
    :style="nodeStyle"
    @mousedown="handleMousedown"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    v-bind:class="{selected: options.selected === id}"
  >
      <div
         @mousedown="inputMouseDown"
         @mouseup="inputMouseUp"
      >
          <div v-if="type === 'start'">
              <flowchart-node-start
                 :type="type"
                 @selectOutputNodePort="handleSelectOutputNodePort"
              >
              </flowchart-node-start>
          </div>
          <div v-else-if="type === 'task'">
              <flowchart-node-task
                :type="type"
                @selectOutputNodePort="handleSelectOutputNodePort"
              >
              </flowchart-node-task>
          </div>
          <div v-else-if="type === 'end'">
              <flowchart-node-end
                 :type="type"
              >
              </flowchart-node-end>
          </div>
          <div v-else-if="type === 'decision' || type === 'approve' || type === 'reject'">
               <flowchart-node-decision
                   :type="type"
                   @selectOutputNodePort="handleSelectOutputNodePort"
               >

               </flowchart-node-decision>
          </div>
          <div v-else-if="type === 'multipath' || type === 'path'">

              <flowchart-node-multipath
                  v-if="type === 'multipath'"
                  :type="type"
                  :id="id"
                  :x="x"
                  :y="y"
                  @createNewPath="handleCreateNewPath"
              >
              </flowchart-node-multipath>

              <flowchart-node-path
                 v-if="type === 'path'"
                 :type="type"
                 @selectOutputNodePort="handleSelectOutputNodePort"
              >
              </flowchart-node-path>
          </div>
      </div>
  </div>
</template>
<script>
/* eslint-disable */
import flowchartNodeEnd from '@/components/Nodes/end';
import flowchartNodeStart from '@/components/Nodes/start';
import flowchartNodeTask from '@/components/Nodes/task';
import flowchartNodeDecision from  '@/components/Nodes/decision';
import flowchartNodeMultipath from  '@/components/Nodes/multipath';
import flowchartNodePath from  '@/components/Nodes/path';

export default {
  name: "node",
  components:{
      flowchartNodeEnd,
      flowchartNodeStart,
      flowchartNodeTask,
      flowchartNodeDecision,
      flowchartNodeMultipath,
      flowchartNodePath
  },
  props: {
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
    type: {
      type: String,
      default: "Default"
    },
    label: {
      type: String,
      default: "input name"
    },
    hasChildren:{
      type:Boolean,
      default:false
    },
    options: {
      type: Object,
      default() {
        return {
          centerX: 0,
          scale: 1,
          centerY: 0
        };
      }
    }
  },
  data() {
    return {
      show: {
        delete: false
      }
    };
  },
  computed: {
    nodeStyle() {
      return {
        top: this.options.centerY + this.y * this.options.scale + "px", // remove: this.options.offsetTop +
        left: this.options.centerX + this.x * this.options.scale + "px", // remove: this.options.offsetLeft +
        transform: `scale(${this.options.scale})`
      };
    }
  },
  methods: {
    handleMousedown(e) {
      const target = e.target || e.srcElement;
      if (
        target.className.indexOf("node-input") < 0 &&
        target.className.indexOf("node-output") < 0
      ) {
        this.$emit("nodeSelected", e);
      }
      e.preventDefault();
    },
    handleMouseOver() {
      this.show.delete = true;
    },
    handleMouseLeave() {
      this.show.delete = false;
    },
    handleSelectOutputNodePort() {
      this.$emit("linkingStart");
    },
    inputMouseDown(e) {
      e.preventDefault();
    },
    inputMouseUp(e) {
      this.$emit("linkingStop");
      e.preventDefault();
    },
    handleCreateNewPath(data){
        this.$emit('creatingNewPath',data);
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss">
$themeColor: rgb(44, 42, 46);
$portSize: 12;

.flowchart-operator{
    position: relative;
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
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 50px;
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
.selected {
    border: 3px solid #51eaea;
}
</style>
