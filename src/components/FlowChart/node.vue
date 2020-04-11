<!-- eslint-disable -->
<template>
  <div
    class="flowchart-operator"
    :style="nodeStyle"
    @mousedown="handleMousedown"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    v-bind:class="{selected: options.selected === id}"
  >
      <div
         class="flowchart-inputs node-port node-input"
         @mousedown="inputMouseDown"
         @mouseup="inputMouseUp"
      >
      </div>
      <div class="flowchart-operator-title-icon">
          <div class="flowchart-operator-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                  <path fill="white" stroke="black" d="M4 1c-.55 0-.99.45-.99 1L3 16c0 .55.44 1 1 1h10c.55 0 1-.45 1-1V6l-5-5H4zm6 5V2l4 4h-4z"/>
              </svg>
          </div>
          <div v-text="type" class="flowchart-operator-title"></div>
      </div>
      <div
        class="flowchart-outputs node-port node-output"
        @mousedown="outputMouseDown"
      >
      </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "node",
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
      console.log("MOUSE DOWN");
      const target = e.target || e.srcElement;
      // console.log(target);
      if (
        target.className.indexOf("node-input") < 0 &&
        target.className.indexOf("node-output") < 0
      ) {
        this.$emit("nodeSelected", e);
      }
      e.preventDefault();
    },
    handleMouseOver() {
      console.log("MOUSE OVER");
      this.show.delete = true;
    },
    handleMouseLeave() {
      this.show.delete = false;
    },
    outputMouseDown(e) {
      this.$emit("linkingStart");
      e.preventDefault();
    },
    inputMouseDown(e) {
      e.preventDefault();
    },
    inputMouseUp(e) {
      this.$emit("linkingStop");
      e.preventDefault();
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
$themeColor: rgb(44, 42, 46);
$portSize: 12;

.flowchart-node {
  margin: 0;
  width: 80px;
  height: 80px;
  position: absolute;
  box-sizing: border-box;
  border: none;
  background: white;
  z-index: 999;
  opacity: 0.9;
  cursor: move;
  transform-origin: top left;
  .node-main {
    text-align: center;
    .node-type {
      background: $themeColor;
      color: white;
      font-size: 13px;
      padding: 6px;
    }
    .node-label {
      font-size: 13px;
    }
  }
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
  .node-delete {
    position: absolute;
    right: -6px;
    top: -6px;
    font-size: 12px;
    width: 12px;
    height: 12px;
    color: $themeColor;
    cursor: pointer;
    background: white;
    border: 1px solid $themeColor;
    border-radius: 100px;
    text-align: center;
    &:hover {
      background: $themeColor;
      color: white;
    }
  }
}

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
.flowchart-operator-title-icon{
    display: grid;
    grid-template-columns: 20% 80%;
    padding: 0 5px;
    flex-grow: 1;
}
.flowchart-operator-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border-radius: 5px;
}
.flowchart-operator-title{
    width: 100%;
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
    grid-template-columns: 20% 80%;
}
.selected {
    border: 3px solid #51eaea;
}
</style>
