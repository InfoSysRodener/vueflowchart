<template>
  <g @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <path :d="dAttr" :style="pathStyle"></path>
  </g>
</template>

<script>
export default {
  name: "links",
  props: {
    start: {
      type: Array,
      default() {
        return [0, 0];
      }
    },
    end: {
      type: Array,
      default() {
        return [0, 0];
      }
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
  data: () => ({
    show: {
      delete: false
    }
  }),
  methods: {
    handleMouseOver() {
      if (this.id) {
        this.show.delete = true;
      }
    },
    handleMouseLeave() {
      this.show.delete = false;
    },
  },
  computed: {
    pathStyle() {
      return {
        stroke: "rgb(0, 0, 0)",
        strokeWidth: 2.73205,
        fill: "none",
        transform: `scale(${this.options.scale})`
      };
    },
    dAttr() {
      let cx = this.start[0],
        cy = this.start[1],
        ex = this.end[0],
        ey = this.end[1];
      let x1 = cx,
        y1 = cy + 50,
        x2 = ex,
        y2 = ey - 50;
      return `M ${cx}, ${cy} L ${x1}, ${y1}, ${x2}, ${y2}, ${ex}, ${ey}`;
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>