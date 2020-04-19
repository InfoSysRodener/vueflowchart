<template>
  <div
    id="panzoom-element"
    class="flowchart-container"
    ref="flowchart_container"
    @mousemove="handleMove"
    @mouseup="handleUp"
    @mousedown="handleDown"
    @click="handleTemporaryLink"
    @dragover.prevent
    @drop.prevent="drop"
  >
    <svg>
      <flowchart_line_link
         class="nodes"
         v-bind.sync="link"
         v-for="(link, index) in lines"
         :key="`${index}`"
         @deleteLink="linkDelete(link.id)"
         :options="nodeOptions"
      >

      </flowchart_line_link>
      <!--<flowchart_link-->
        <!--class="nodes"-->
        <!--v-bind.sync="link"-->
        <!--v-for="(link, index) in lines"-->
        <!--:key="`${index}`"-->
        <!--@deleteLink="linkDelete(link.id)"-->
        <!--:options="nodeOptions"-->
      <!--/>-->
      <flowchart_temporary_link
         :start="temporaryLink.start"
         :end="temporaryLink.end"
         v-if="temporaryLinkShow"
      >
      </flowchart_temporary_link>
    </svg>
    <flowchart_node
      v-bind.sync="node"
      v-for="(node, index) in scene.nodes"
      :key="`node${index}`"
      :options="nodeOptions"
      @linkingStart="linkingStart(node.id)"
      @linkingStop="linkingStop(node.id)"
      @nodeSelected="nodeSelected(node.id, $event)"
      @creatingNewPath="creatingNewPath"
      class="nodes"
    ></flowchart_node>
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable */
import { flowchatMixins } from "../../mixins/mixins";
import flowchart_link from "./link.vue";
import flowchart_node from "./node.vue";
import flowchart_temporary_link from "./temporaryLink.vue";
import flowchart_line_link from "./lineLink.vue";

const Panzoom = require("../../dist/panzoom.js");
export default {
  mixins: [flowchatMixins],
  name: "container",
  components: {
    flowchart_link,
    flowchart_node,
    flowchart_temporary_link,
    flowchart_line_link
  },
  props: {
    scene: {
      type: Object,
      default() {
        return {
          centerX: 1024,
          scale: 1,
          centerY: 140,
          nodes: [],
          links: []
        };
      }
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data: () => ({
    flowchart_scale: 1,
    action: {
      linking: false,
      dragging: false,
      scrolling: false,
      selected: 0
    },
    mouse: {
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0
    },
    draggingLink: null,
    rootDivOffset: {
      top: 0,
      left: 0
    },
    temporaryLink:{
      start:[],
      end:[]
    },
    temporaryLinkShow:false
  }),
  mounted() {
    let $flowchart = this.$refs["flowchart_container"];
    let parent = $flowchart.parentElement;
    const panzoom = Panzoom($flowchart, {
      startScale: 1,
      maxScale: 5,
      startX: 0,
      startY: 0,
      contain: "outside",
      excludeClass: "nodes"
    });
    parent.addEventListener("wheel", panzoom.zoomWithWheel);
    $flowchart.addEventListener("panzoomzoom", e => {
      this.flowchart_scale = panzoom.getScale();
    });
  },
  methods: {

    addNode(data) {
      let { dragX , dragY } = data;
      this.scene.nodes.push({
          label:data.type,
          x: dragX,
          y: dragY,
          ...data
      });
    },
    addDecisionNode(data){

      let { id , dragX , dragY } = data;

      let scale = this.flowchart_scale;

      const approveParam = {
        id:  parseFloat(id + '.' + Math.floor(Math.random() * 1000)),
        x: dragX - (200 * scale) / scale,
        y: dragY + (100 * scale)  / scale,
        type: "approve",
        label: "approve"
      };
      const rejectParam = {
        id:  parseFloat(id + '.' + Math.floor(Math.random() * 1000)),
        x: dragX + (200 * scale) / scale ,
        y: dragY + (100 * scale) / scale,
        label: "reject",
        type: "reject"
      };

      this.addNode(data);
      this.scene.nodes.push(approveParam);
      this.scene.nodes.push(rejectParam);

      this.linkingNodes({from:id,to:rejectParam.id});
      this.linkingNodes({from:id,to:approveParam.id});

    },
    addMultipathNode(data) {

      let { id, type , dragX , dragY } = data;

      this.scene.nodes.push({
        label:type,
        x: dragX,
        y: dragY,
        ...data
      });

      //create default path
      this.creatingNewPath({
        id:id,
        x:dragX,
        y:dragY
      });

    },
    drop(e) {
      const type = e.dataTransfer.getData("type");
      const id = parseInt(e.dataTransfer.getData("card_id"));

      let [dragX, dragY] = this.getMousePosition(
        this.$refs["flowchart_container"],
        e
      );

      const nodeData = {
          id:id,
          dragX:dragX / this.flowchart_scale,
          dragY:dragY / this.flowchart_scale,
          type:type
      };

      if(type === 'decision'){
        this.addDecisionNode(nodeData);
      } else if(type === 'multipath'){
        this.addMultipathNode(nodeData);
      } else {
        this.addNode(nodeData);
      }

    },
    findNodeWithID(id) {
      return this.scene.nodes.find(item => {
        return id === item.id;
      });
    },
    handleTemporaryLink(){
      this.temporaryLinkShow = false;
    },
    getPortPosition(type, x, y) {
      if (type === "top") {
        return [x + 300 / 2, y];
      } else if (type === "bottom") {
        return [x + 300 / 2, y + 45];
      }
    },
    linkingStart(index) {
      this.action.linking = true;
      this.draggingLink = {
        from: index,
        mx: 0,
        my: 0
      };
    },
    linkingStop(index) {
      // add new Link
      if (this.draggingLink && this.draggingLink.from !== index) {
        // check link existence
        const existed = this.scene.links.find(link => {
          return link.from === this.draggingLink.from && link.to === index;
        });
        if (!existed) {
          let maxID = Math.max(
            0,
            ...this.scene.links.map(link => {
              return link.id;
            })
          );
          const newLink = {
            id: maxID + 1,
            from: this.draggingLink.from,
            to: index
          };
          this.scene.links.push(newLink);
          this.$emit("linkAdded", newLink);
        }
      }
      this.draggingLink = null;
    },
    linkDelete(id) {
      const deletedLink = this.scene.links.find(item => {
        return item.id === id;
      });
      if (deletedLink) {
        this.scene.links = this.scene.links.filter(item => {
          return item.id !== id;
        });
        this.$emit("linkBreak", deletedLink);
      }
    },
    nodeSelected(id, e) {
      console.log(e);
      this.action.dragging = id;
      this.action.selected = id;
      this.$emit("nodeClick", id);
      this.mouse.lastX =
        e.pageX || e.clientX + document.documentElement.scrollLeft;
      this.mouse.lastY =
        e.pageY || e.clientY + document.documentElement.scrollTop;
    },
    handleMove(e) {
      // console.log("HANDLE MOVE CONTAINER",e);
      if (this.action.linking) {
        [this.mouse.x, this.mouse.y] = this.getMousePosition(
          this.$refs["flowchart_container"],
          e
        );

        //dragging link
        [this.draggingLink.mx, this.draggingLink.my] = [
          this.mouse.x / this.flowchart_scale,
          this.mouse.y / this.flowchart_scale
        ];
      }
      if (this.action.dragging) {
        this.mouse.x =
          e.pageX || e.clientX + document.documentElement.scrollLeft;
        this.mouse.y =
          e.pageY || e.clientY + document.documentElement.scrollTop;

        let diffX = this.mouse.x - this.mouse.lastX;
        let diffY = this.mouse.y - this.mouse.lastY;

        this.mouse.lastX = this.mouse.x;
        this.mouse.lastY = this.mouse.y;

        this.moveSelectedNode(diffX, diffY);
      }
      if (this.action.scrolling) {
        [this.mouse.x, this.mouse.y] = this.getMousePosition(
          this.$refs["flowchart_container"],
          e
        );
        let diffX = this.mouse.x - this.mouse.lastX;
        let diffY = this.mouse.y - this.mouse.lastY;

        this.mouse.lastX = this.mouse.x;
        this.mouse.lastY = this.mouse.y;

        this.scene.centerX += diffX;
        this.scene.centerY += diffY;

        // this.hasDragged = true
      }
    },
    handleUp(e) {
      const target = e.target || e.srcElement;
      if (this.$el.contains(target)) {
        if (
          typeof target.className !== "string" ||
          target.className.indexOf("node-input") < 0
        ) {
          this.draggingLink = null;
        }
        if (
          typeof target.className === "string" &&
          target.className.indexOf("node-delete") > -1
        ) {
          this.nodeDelete(this.action.dragging);
        }
      }
      this.action.linking = false;
      this.action.dragging = null;
      this.action.scrolling = false;
    },
    handleDown(e) {

      this.temporaryLinkShow = false;


      console.log("HANDLE DOWN CONTAINER");
      const target = e.target || e.srcElement;
      // console.log('for scroll', target, e.keyCode, e.which)
      if (
        (target === this.$el || target.matches("svg, svg *")) &&
        e.which === 1
      ) {
        this.action.scrolling = true;
        [this.mouse.lastX, this.mouse.lastY] = this.getMousePosition(
          this.$refs["flowchart_container"],
          e
        );
        this.action.selected = null; // deselectAll
      }
      this.$emit("canvasClick", e);
    },
    moveSelectedNode(dx, dy) {
      let index = this.scene.nodes.findIndex(item => {
        return item.id === this.action.dragging;
      });
      let left = this.scene.nodes[index].x + dx / this.flowchart_scale;
      let top = this.scene.nodes[index].y + dy / this.flowchart_scale;
      this.$set(
        this.scene.nodes,
        index,
        Object.assign(this.scene.nodes[index], {
          x: left,
          y: top
        })
      );
    },
    nodeDelete(id) {
      this.scene.nodes = this.scene.nodes.filter(node => {
        return node.id !== id;
      });
      this.scene.links = this.scene.links.filter(link => {
        return link.from !== id && link.to !== id;
      });
      this.$emit("nodeDelete", id);
    },

    creatingNewPath(data){

      let { id , x , y } = data;

      let scale = this.flowchart_scale;

      const randomId = Math.floor(Math.random() * 1000);

      const pathParams = {
        id:  parseFloat(id + '.' + randomId),
        x: x - ((200) * scale) / scale,
        y: y + ((100) * scale)  / scale,
        type: "path",
        label: "path"
      };

      this.scene.nodes.push(pathParams);

      this.linkingNodes({from:id,to:pathParams.id});

    },
    linkingNodes({ from , to }){

        let linkId = this.scene.links.map(link => link.id);

        let maxID = Math.max(0, ...linkId);

        const newLink = {
          id: maxID + 1,
          from: from,
          to: to
        };
        this.scene.links.push(newLink);

        this.$emit("linkAdded", newLink);

    }
  },
  computed: {
    nodeOptions() {
      return {
        centerY: this.scene.centerY,
        centerX: this.scene.centerX,
        scale: this.scene.scale,
        offsetTop: this.rootDivOffset.top,
        offsetLeft: this.rootDivOffset.left,
        selected: this.action.selected
      };
    },
    lines() {
      const lines = this.scene.links.map(link => {
        const fromNode = this.findNodeWithID(link.from);
        const toNode = this.findNodeWithID(link.to);
        let x, y, cy, cx, ex, ey;
        x = this.scene.centerX + fromNode.x;
        y = this.scene.centerY + fromNode.y;
        [cx, cy] = this.getPortPosition("bottom", x, y);
        x = this.scene.centerX + toNode.x;
        y = this.scene.centerY + toNode.y;
        [ex, ey] = this.getPortPosition("top", x, y);
        return {
          start: [cx, cy],
          end: [ex, ey],
          id: link.id
        };
      });


      // show temporary link
      if (this.draggingLink) {
        console.log(this.draggingLink);
        let x, y, cy, cx;
        const fromNode = this.findNodeWithID(this.draggingLink.from);
        x = this.scene.centerX + fromNode.x;
        y = this.scene.centerY + fromNode.y;
        [cx, cy] = this.getPortPosition("bottom", x, y);
        // push temp dragging link, mouse cursor postion = link end postion
        // show temporary link

        this.temporaryLinkShow = true;
        this.temporaryLink.start = [cx, cy];
        this.temporaryLink.end = [this.draggingLink.mx, this.draggingLink.my];

        // lines.push({
        //   start: [cx, cy],
        //   end: [this.draggingLink.mx, this.draggingLink.my]
        // });
      }else{
        this.temporaryLinkShow = false;
      }
      return lines;
    }
  }
};
</script>

<style scoped lang="scss">

#panzoom-element {
  position: relative;
  width: 3000px;
  height: 3000px;
}
.flowchart-container {
  position: relative;
  overflow: hidden;
  height: 4000px;
  width: 15000px;
  border: 1px solid yellow;
  svg {
    cursor: grab;
    height: 4000px;
    width: 100%;
  }
}

.nodes {
  z-index: 999;
  position: absolute;
}
</style>
