<template>
    <g>
       <g  v-for="(lines,index) in getLinkPosition" :key="index">
           <line
              :x1="lines.x1"
              :x2="lines.x2"
              :y1="lines.y1"
              :y2="lines.y2"
              stroke-width="4"
              stroke="black"
              stroke-linecap="round"
           >
           </line>
       </g>
        <path
           fill="black"
           :d="setArrowPosition"
        >
        </path>
   </g>

</template>

<script>
    export default {
        name: "lineLink",
        props:{
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
        },
        data:() => ({

        }),
        computed:{
            getLinkPosition() {
                let fromX = this.start[0];
                let fromY = this.start[1];
                let toX = this.end[0];
                let toY = this.end[1];
                let diffX = fromX - toX;
                let diffY = fromY - toY;
                const isHigherY = 30;
                const isHigher = toY <= fromY + 15;
                const isDirectlyBelow = diffY < 0 && diffX === 0;

                let linesData;

                if(isDirectlyBelow) {
                    linesData = {
                        line1: {
                            x1: fromX,
                            y1: fromY,
                            x2: toX,
                            y2: toY
                        },
                        line2: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        },
                        line3: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        },
                        line4: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        },
                        line5: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        }
                    }
                }
                else if (isHigher) {
                    linesData = {
                        line1: {
                            x1: fromX,
                            y1: fromY,
                            x2: fromX,
                            y2: fromY + isHigherY
                        },
                        line2: {
                            x1: fromX,
                            y1: fromY + isHigherY,
                            x2: fromX - diffX / 2,
                            y2: fromY + isHigherY
                        },
                        line3: {
                            x1: fromX - diffX / 2,
                            y1: fromY + isHigherY,
                            x2: fromX - diffX / 2,
                            y2: toY - isHigherY
                        },
                        line4: {
                            x1: fromX - diffX / 2,
                            y1: toY - isHigherY,
                            x2: toX,
                            y2: toY - isHigherY
                        },
                        line5: {
                            x1: toX,
                            y1: toY - isHigherY,
                            x2: toX,
                            y2: toY
                        }
                    };
                }
                else {
                    linesData = {
                        line1: {
                            x1: fromX,
                            y1: fromY,
                            x2: fromX,
                            y2: fromY - diffY / 2
                        },
                        line2: {
                            x1: fromX,
                            y1: fromY - diffY / 2,
                            x2: toX,
                            y2: fromY - diffY / 2
                        },
                        line3: {
                            x1: toX,
                            y1: fromY - diffY / 2,
                            x2: toX,
                            y2: toY
                        },
                        line4: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        },
                        line5: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        }
                    };
                }
                return  Object.keys(linesData).map(i => linesData[i]);
            },
            setArrowPosition(){
                let fromX = this.start[0];
                let fromY = this.start[1];
                let toX = this.end[0];
                let toY = this.end[1] - 5;
                let diffX = fromX - toX;
                let diffY = fromY - toY;
                const arrowOffset = 5;
                const arrowSize = 10;
                const isHigher = toY <= fromY + 15;
                const isDirectlyBelow = diffY < 0 && diffX === 0;

                let linesData;

                if(isDirectlyBelow) {
                    linesData = {
                        arrow: {
                            x1: toX,
                            y1: toY + arrowOffset,
                            x2: toX - arrowSize,
                            y2: toY - arrowSize,
                            x3: toX + arrowSize,
                            y3: toY - arrowSize
                        }
                    }
                }
                else if (isHigher) {
                    linesData = {
                        arrow: {
                            x1: toX,
                            y1: toY + arrowOffset,
                            x2: toX - arrowSize,
                            y2: toY - arrowSize,
                            x3: toX + arrowSize,
                            y3: toY - arrowSize
                        }
                    };
                }else {
                    linesData = {
                        arrow: {
                            x1: toX,
                            y1: toY + arrowOffset,
                            x2: toX - arrowSize,
                            y2: toY - arrowSize,
                            x3: toX + arrowSize,
                            y3: toY - arrowSize
                        }
                    };
                }

                return `M${linesData.arrow.x1} ${linesData.arrow.y1} L${linesData.arrow.x2} ${linesData.arrow.y2} L${linesData.arrow.x3} ${linesData.arrow.y3} Z`;
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>