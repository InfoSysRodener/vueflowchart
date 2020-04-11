<template>
  <div id="app">
      <div class="flowchartStyle">
          <div class="panzoom-parent">
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
          <div class="node-container">
              <card></card>
          </div>
      </div>
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
        // BUG: allow for empty array to load. Currently there is bug if nodes is empty
        nodes: [
          // {
          //   id: 2,
          //   x: 0,
          //   y: 0,
          //   type: "Action",
          //   label: "test1",
          //   hasChildren:true,
          //   children:[
          //       {
          //           title:'Accept',
          //           x:0,
          //           y:0,
          //       },
          //       {
          //           title:'Reject',
          //           x:0,
          //           y:0,
          //       }
          //   ]
          // },
          // {
          //   id: 4,
          //   x: 200,
          //   y: 200,
          //   type: "Script",
          //   label: "test2"
          // },
          // {
          //   id: 6,
          //   x: 300,
          //   y: 300,
          //   type: "Decision",
          //   label: "test3"
          // }
        ],
        links: [
          // {
          //   id: 3,
          //   from: 2, // node id the link start
          //   to: 4 // node id the link end
          // }
        ],
      },
      newNodeType: 0,
      newNodeLabel: "",
      nodeCategory: ["rule", "action", "script", "decision", "fork", "join"]
    };
  },
  methods: {
    canvasClick(e) {
      console.log("canvas Click, event:", e);
    },
    // TODO: when generate new node, create new ID for the Node. Generate a mongoId for every new node
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
  width: 100%;
  padding: 0;
  margin:0;
}
.panzoom-parent {
  /*position: relative;*/
  /*border: 3px solid red;*/
  /*height: 1000px;*/
  /*width: 100%;*/
  position: relative;
  overflow: hidden;
  height: 100vh;
}
.node-container {
  /*position: relative;*/
  /*width: 20%;*/
    background-color: #f9f6f7;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.flowchartStyle{
    width: 100%;
    display: grid;
    grid-template-columns: 10fr 2fr;
    margin: 0;
    padding: 0;
    height: 100vh;
}
</style>
