<!-- eslint-disable -->
<template>
  <div class="flowchart-operator-toolbar">
    <div
      v-for="operator in flowchartOperators"
      :key="operator.type"
      :id="getOperatorObject(operator.id)"
      class="toolbar-operator"
      :draggable="draggable"
      @dragstart="dragStart"
      @dragend="ondragend"
      @dragover.stop
    >
      <!--<div class="flowchart-inputs"></div>-->
      <div class="toolbar-operator-title-icon">
        <div class="toolbar-operator-icon" :style="{ background:operator.color}">

        </div>
      </div>
      <div class="toolbar-operator-title">{{ operator.title }}</div>
      <!--<div class="flowchart-outputs"></div>-->
    </div>
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
  data: () => ({
    flowchartOperators: [
      {
        id:1,
        title: "Start",
        type: "start",
        icon: "",
        color: "#018383",
        width:'300',
        height:'60'
      },
      {
        id:2,
        title: "Task",
        type: "task",
        icon: "",
        width:'300',
        height:'60'
      },
      {
        id:3,
        title: "Decision",
        type: "decision",
        icon: "",
        width:'300',
        height:'60'
      },
      {
        id:4,
        title: "End",
        type: "end",
        icon: "",
        width:'300',
        height:'60'
      },
      {
        id:5,
        title: "MultiPath",
        type: "multipath",
        icon: "",
        width:'120',
        height:'120',
        path:{
            width:'300',
            height:'60'
        }
      }
    ]
  }),
  methods: {
    dragStart(e) {
      let operator = e.target.id;

      const card_id = Math.floor(Math.random() * 1000);

      e.dataTransfer.setData("card_id", card_id);
      e.dataTransfer.setData("operator", operator);
    },
    ondragend(e) {
      console.log("dragleave", e);
      e.dataTransfer.setData("clientX", this.options.centerY + e.clientX);
      e.dataTransfer.setData("clientY", this.options.centerY + e.clientY);
    },
    getOperatorObject(operator_id){
        return JSON.stringify(this.flowchartOperators.find(operator => operator.id === operator_id));
    }
  },
  computed: {

  }
};
</script>

<style scoped lang="scss">
.flowchart-operator-toolbar {
  width: 100%;
  flex-grow: 3;
}
.toolbar-operator {
  width: 100%;
  height: 70px;
  display: inline-grid;
  grid-template-columns: 25% 75%;
  padding: 10px 15px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  cursor: pointer;
  border: 1px solid #ffffff;
}
.toolbar-operator-title-icon {
  text-align: center;
  color: #2c2a2e;
  border-radius: 5px;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toolbar-operator-icon {
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*color: #ffffff;*/
  /*border-radius: 5px;*/
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
.toolbar-operator-title {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
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