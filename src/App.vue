<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <card :id="10"></card>
    <!-- <card v-for="(node, index) in scene.nodes" v-bind:key="index" :id="index"></card> -->
    <flowchart
      :scene.sync="scene"
      @nodeClick="nodeClick"
      @nodeDelete="nodeDelete"
      @linkBreak="linkBreak"
      @linkAdded="linkAdded"
      @canvasClick="canvasClick"
      :height="600"
    ></flowchart>
  </div>
</template>

<script>
/* eslint-disabled */
import flowchart from "./components/FlowChart/container";
import card from "./components/FlowChart/card";
export default {
  name: "App",
  components: {
    flowchart,
    card
  },
  data() {
    return {
      scene: {
        centerX: 0,
        centerY: 0,
        scale: 1,
        nodes: [
          {
            id: 2,
            x: 0,
            y: 0,
            type: "Action",
            label: "test1"
          },
          {
            id: 4,
            x: 200,
            y: 200,
            type: "Script",
            label: "test2"
          },
          {
            id: 6,
            x: 300,
            y: 300,
            type: "Rule",
            label: "test3"
          }
        ],
        links: [
          // BUG: unable to zoom in out if it's not loaded
          {
            id: 3,
            from: 2, // node id the link start
            to: 4 // node id the link end
          }
        ]
      },
      newNodeType: 0,
      newNodeLabel: "",
      nodeCategory: ["rule", "action", "script", "decision", "fork", "join"]
    };
  },
  methods: {
    generateId() {
      return Math.random();
    },
    canvasClick(e) {
      console.log("canvas Click, event:", e);
    },
    addNode() {
      let maxID = Math.max(
        0,
        ...this.scene.nodes.map(link => {
          return link.id;
        })
      );
      this.scene.nodes.push({
        id: maxID + 1,
        x: -400,
        y: 50,
        type: this.nodeCategory[this.newNodeType],
        label: this.newNodeLabel ? this.newNodeLabel : `test${maxID + 1}`
      });
    },
    nodeClick(id) {
      console.log("node click", id);
    },
    nodeDelete(id) {
      console.log("node delete", id);
    },
    linkBreak(id) {
      console.log("link break", id);
    },
    linkAdded(link) {
      console.log("new link added:", link);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
