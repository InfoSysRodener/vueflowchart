<!-- eslint-disable -->
<template>
        <div
             class="flowchart-container"
             @mousemove="handleMove"
             @mouseup="handleUp"
             @mousedown="handleDown"
             @dragover.prevent
             @drop.prevent="drop"
        >
            <panZoom @zoom="onZoom" @pan="onPan" selector=".g1" :options="panzoomOptions">
                <svg width="100%" :height="`${height}px`">
                    <!--<g class="g1">-->
                        <!--<path d="M150 0 L75 200 L225 200 Z" />-->
                    <!--</g>-->
                        <flowchart_link class="g1"
                              v-bind.sync="link"
                              v-for="(link, index) in lines"
                              :key="`link${index}`"
                              @deleteLink="linkDelete(link.id)">
                        </flowchart_link>
                        <!--<g class="g1">-->
                            <!--<path d="M150 0 L75 200 L225 200 Z" />-->
                        <!--</g>-->
                </svg>
                <flowchart_node
                        v-bind.sync="node"
                        v-for="(node, index) in scene.nodes"
                        :key="`node${index}`"
                        :options="nodeOptions"
                        @linkingStart="linkingStart(node.id)"
                        @linkingStop="linkingStop(node.id)"
                        @nodeSelected="nodeSelected(node.id, $event)"
                >
                </flowchart_node>
            </panZoom>
            <slot></slot>
        </div>

</template>

<script>/* eslint-disable */
    import { flowchatMixins } from '../../mixins'
    import flowchart_link from  './link.vue';
    import flowchart_node from  './node.vue';
    export default {
        mixins:[flowchatMixins],
        name: "container",
        components:{
            flowchart_link,
            flowchart_node
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
                        links: [],
                    }
                }
            },
            height: {
                type: Number,
                default: 400,
            },
        },
        data:() => ({
            panzoomOptions:{
             maxZoom: 5,
             minZoom: 0.1,
             smoothScroll: true,
             bounds:{
                 top:0,
                 left:0,
                 right:1000,
                 bottom:1000,
             },
             boundsPadding: 0
            },
            action: {
                linking: false,
                dragging: false,
                scrolling: false,
                selected: 0,
            },
            mouse: {
                x: 0,
                y: 0,
                lastX: 0,
                lastY: 0,
            },
            draggingLink: null,
            rootDivOffset: {
                top: 0,
                left: 0
            },
        }),
        methods:{
            drop(e){
              console.log('dragDrop',e);
              const card_id = e.dataTransfer.getData('card_id');
              const title = e.dataTransfer.getData('title');
              this.scene.nodes.push({
                id: parseInt(card_id),
                x: e.x,
                y: e.y,
                type: title,
                label: `test${card_id}`,
              })

            },
            findNodeWithID(id) {
                return this.scene.nodes.find((item) => {
                    return id === item.id
                })
            },
            getPortPosition(type, x, y) {
                if (type === 'top') {
                    return [x + 40, y];
                }
                else if (type === 'bottom') {
                    return [x + 40, y + 80];
                }
            },
            linkingStart(index) {
                this.action.linking = true;
                this.draggingLink = {
                    from: index,
                    mx: 0,
                    my: 0,
                };
            },
            linkingStop(index) {
                // add new Link
                if (this.draggingLink && this.draggingLink.from !== index) {
                    // check link existence
                    const existed = this.scene.links.find((link) => {
                        return link.from === this.draggingLink.from && link.to === index;
                    })
                    if (!existed) {
                        let maxID = Math.max(0, ...this.scene.links.map((link) => {
                            return link.id
                        }))
                        const newLink = {
                            id: maxID + 1,
                            from: this.draggingLink.from,
                            to: index,
                        };
                        this.scene.links.push(newLink)
                        this.$emit('linkAdded', newLink)
                    }
                }
                this.draggingLink = null
            },
            linkDelete(id) {
                const deletedLink = this.scene.links.find((item) => {
                    return item.id === id;
                });
                if (deletedLink) {
                    this.scene.links = this.scene.links.filter((item) => {
                        return item.id !== id;
                    });
                    this.$emit('linkBreak', deletedLink);
                }
            },
            nodeSelected(id, e) {
                console.log(e);
                this.action.dragging = id;
                this.action.selected = id;
                this.$emit('nodeClick', id);
                this.mouse.lastX = e.pageX || e.clientX + document.documentElement.scrollLeft;
                this.mouse.lastY = e.pageY || e.clientY + document.documentElement.scrollTop;
            },
            handleMove(e) {
                if (this.action.linking) {
                    [this.mouse.x, this.mouse.y] = this.getMousePosition(this.$el, e);
                    [this.draggingLink.mx, this.draggingLink.my] = [this.mouse.x, this.mouse.y];
                }
                if (this.action.dragging) {
                    this.mouse.x = e.pageX || e.clientX + document.documentElement.scrollLeft
                    this.mouse.y = e.pageY || e.clientY + document.documentElement.scrollTop
                    let diffX = this.mouse.x - this.mouse.lastX;
                    let diffY = this.mouse.y - this.mouse.lastY;

                    this.mouse.lastX = this.mouse.x;
                    this.mouse.lastY = this.mouse.y;
                    this.moveSelectedNode(diffX, diffY);
                }
                if (this.action.scrolling) {
                    [this.mouse.x, this.mouse.y] = this.getMousePosition(this.$el, e);
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
                    if (typeof target.className !== 'string' || target.className.indexOf('node-input') < 0) {
                        this.draggingLink = null;
                    }
                    if (typeof target.className === 'string' && target.className.indexOf('node-delete') > -1) {
                        // console.log('delete2', this.action.dragging);
                        this.nodeDelete(this.action.dragging);
                    }
                }
                this.action.linking = false;
                this.action.dragging = null;
                this.action.scrolling = false;
            },
            handleDown(e) {
                const target = e.target || e.srcElement;
                // console.log('for scroll', target, e.keyCode, e.which)
                if ((target === this.$el || target.matches('svg, svg *')) && e.which === 1) {
                    this.action.scrolling = true;
                    [this.mouse.lastX, this.mouse.lastY] = this.getMousePosition(this.$el, e);
                    this.action.selected = null; // deselectAll
                }
                this.$emit('canvasClick', e);
            },
            moveSelectedNode(dx, dy) {
                let index = this.scene.nodes.findIndex((item) => {
                    return item.id === this.action.dragging
                });
                let left = this.scene.nodes[index].x + dx / this.scene.scale;
                let top  = this.scene.nodes[index].y + dy / this.scene.scale;
                this.$set(this.scene.nodes, index, Object.assign(this.scene.nodes[index], {
                    x: left,
                    y: top,
                }));
            },
            nodeDelete(id) {
                this.scene.nodes = this.scene.nodes.filter((node) => {
                    return node.id !== id;
                });
                this.scene.links = this.scene.links.filter((link) => {
                    return link.from !== id && link.to !== id
                });
                this.$emit('nodeDelete', id)
            },
            onZoom(panzoomInstance) {
                this.scene.scale = panzoomInstance.getTransform().scale;
            },
            onPan(panzoomInstance)
            {
                // this.scene.centerX = panzoomInstance.getTransform().x;
                // this.scene.centerY = panzoomInstance.getTransform().y;
            },
            onPanEnd(panzoomInstance){
                // this.scene.centerX = panzoomInstance.getTransform().x;
                // this.scene.centerY = panzoomInstance.getTransform().y;
            }
        },
        computed:{
            nodeOptions() {
                return {
                    centerY:  this.scene.centerY,
                    centerX: this.scene.centerX,
                    scale:  this.scene.scale,
                    offsetTop: this.rootDivOffset.top,
                    offsetLeft: this.rootDivOffset.left,
                    selected: this.action.selected,
                }
            },
            lines() {
                const lines = this.scene.links.map((link) => {
                    const fromNode = this.findNodeWithID(link.from);
                    const toNode = this.findNodeWithID(link.to);
                    let x, y, cy, cx, ex, ey;
                    x = this.scene.centerX + fromNode.x;
                    y = this.scene.centerY + fromNode.y;
                    [cx, cy] = this.getPortPosition('bottom', x, y);
                    x = this.scene.centerX + toNode.x;
                    y = this.scene.centerY + toNode.y;
                    [ex, ey] = this.getPortPosition('top', x, y);
                    return {
                        start: [cx, cy],
                        end: [ex, ey],
                        id: link.id,
                    };
                });
                if (this.draggingLink) {
                    let x, y, cy, cx;
                    const fromNode = this.findNodeWithID(this.draggingLink.from)
                    x = this.scene.centerX + fromNode.x;
                    y = this.scene.centerY + fromNode.y;
                    [cx, cy] = this.getPortPosition('bottom', x, y);
                    // push temp dragging link, mouse cursor postion = link end postion
                    lines.push({
                        start: [cx, cy],
                        end: [this.draggingLink.mx, this.draggingLink.my],
                    })
                }
                return lines;
            }
        }
    }
</script>

<style scoped lang="scss">
    .flowchart-container {
        margin: 0;
        background: #ededed;
        position: relative;
        overflow: hidden;
        svg {
            cursor: grab;
        }
    }
</style>
