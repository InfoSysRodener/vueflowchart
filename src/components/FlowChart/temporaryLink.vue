<template>
    <g class="flowchart-temporary-link-layer">
        <line
          :x1="start[0]"
          :y1="start[1]"
          :x2="end[0]"
          :y2="end[1]"
          stroke-dasharray="6,6"
          stroke-width="4"
          stroke="black"
          fill="none">
        </line>
    </g>
</template>

<script>
    export default {
        name: "temporaryLink",
        props:{
          start:{
              type: Array,
              default() {
                  return [0, 0];
              }
          },
          end:{
              type: Array,
              default() {
                  return [0, 0];
              }
          }
        },
    }
</script>

<style scoped>

</style>