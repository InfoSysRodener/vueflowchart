<template>
  <div
    class="flowchart-node"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragend="ondragend"
    @dragover.stop
    :style="nodeStyle"
  >
    <p>{{name}}</p>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    draggable: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: "no name"
    },
    options: {
      type: Object,
      default() {
        return {
          centerX: 1024,
          scale: 1,
          centerY: 140
        };
      }
    }
  },
  methods: {
    dragStart(e) {
      console.log("dragStart", e.target.id);
      const card_id = Math.floor(Math.random() * 1000);
      e.dataTransfer.setData("card_id", card_id);
      e.dataTransfer.setData("title", "start");
    },
    ondragend(e) {
      console.log("dragleave", e);
      e.dataTransfer.setData("clientX", this.options.centerY + e.clientX);
      e.dataTransfer.setData("clientY", this.options.centerY + e.clientY);
    }
  },
  computed: {
    nodeStyle() {
      return {
        top: this.options.centerY + this.y * this.options.scale + "px", // remove: this.options.offsetTop +
        left: this.options.centerX + this.x * this.options.scale + "px", // remove: this.options.offsetLeft +
        transform: `scale(${this.options.scale})`
      };
    }
  }
};
</script>

<style scoped lang="scss">
$themeColor: rgb(255, 136, 85);
$portSize: 12;

.flowchart-node {
  margin: 0;
  width: 80px;
  height: 80px;
  position: relative;
  box-sizing: border-box;
  border: 2px solid black;
  background: white;
  z-index: 1;
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
.selected {
  box-shadow: 0 0 0 2px $themeColor;
}
</style>
<!--<style scoped>-->
    <!--.card {-->
        <!--box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);-->
        <!--transition: 0.3s;-->
        <!--width: 40%;-->
        <!--border-radius: 5px;-->
    <!--}-->
<!--</style>-->