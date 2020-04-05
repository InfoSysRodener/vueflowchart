export const flowchatMixins = {
    methods: {
        getMousePosition(element, event) {
            let mouseX = event.pageX || event.clientX + document.documentElement.scrollLeft;
            let mouseY = event.pageY || event.clientY + document.documentElement.scrollTop;

            let offset = this.getOffsetRect(element);
            let x = mouseX - offset.left;
            let y = mouseY - offset.top;

            return [x, y];
        },
        getOffsetRect(element) {
            let box = element.getBoundingClientRect();

            let scrollTop = window.pageYOffset;
            let scrollLeft = window.pageXOffset;

            let top = box.top + scrollTop;
            let left = box.left + scrollLeft;

            return {top: Math.round(top), left: Math.round(left)}
        },


        // getLinkPosition(linkData) {
        //     const subConnectors = self._getSubConnectors(linkData);
        //     const fromSubConnector = subConnectors[0];
        //     const toSubConnector = subConnectors[1];
        //     const fromPosition = self.getConnectorPosition(
        //         linkData.fromOperator,
        //         linkData.fromConnector,
        //         fromSubConnector
        //     );
        //     const toPosition = self.getConnectorPosition(
        //         linkData.toOperator,
        //         linkData.toConnector,
        //         toSubConnector
        //     );
        //
        //     var linesData;
        //     const fromX = fromPosition.x;
        //     const fromY = fromPosition.y;
        //     const toX = toPosition.x;
        //     const toY = toPosition.y;
        //     const difY = fromY - toY;
        //     const difX = fromX - toX;
        //     const isHigherY = 30;
        //     const arrowOffset = 5;
        //     const arrowSize = 10;
        //     const isHigher = toY <= fromY + 15;
        //     const isDirectlyBelow = difY < 0 && difX == 0;
        //     //const offsetFromX = fromPosition.width;
        //     //console.log("diffX2", difX);
        //
        //     // Set link position
        //     if (isDirectlyBelow) {
        //         linesData = {
        //             line1: {
        //                 x1: fromX,
        //                 y1: fromY,
        //                 x2: toX,
        //                 y2: toY
        //             },
        //             line2: {
        //                 x1: 0,
        //                 y1: 0,
        //                 x2: 0,
        //                 y2: 0
        //             },
        //             line3: {
        //                 x1: 0,
        //                 y1: 0,
        //                 x2: 0,
        //                 y2: 0
        //             },
        //             line4: {
        //                 x1: 0,
        //                 y1: 0,
        //                 x2: 0,
        //                 y2: 0
        //             },
        //             line5: {
        //                 x1: 0,
        //                 y1: 0,
        //                 x2: 0,
        //                 y2: 0
        //             },
        //             arrow: {
        //                 x1: toX,
        //                 y1: toY + arrowOffset,
        //                 x2: toX - arrowSize,
        //                 y2: toY - arrowSize,
        //                 x3: toX + arrowSize,
        //                 y3: toY - arrowSize
        //             }
        //         };
        //     } else if (isHigher) {
        //         linesData = {
        //             line1: {
        //                 x1: fromX,
        //                 y1: fromY,
        //                 x2: fromX,
        //                 y2: fromY + isHigherY
        //             },
        //             line2: {
        //                 x1: fromX,
        //                 y1: fromY + isHigherY,
        //                 x2: fromX - difX / 2,
        //                 y2: fromY + isHigherY
        //             },
        //             line3: {
        //                 x1: fromX - difX / 2,
        //                 y1: fromY + isHigherY,
        //                 x2: fromX - difX / 2,
        //                 y2: toY - isHigherY
        //             },
        //             line4: {
        //                 x1: fromX - difX / 2,
        //                 y1: toY - isHigherY,
        //                 x2: toX,
        //                 y2: toY - isHigherY
        //             },
        //             line5: {
        //                 x1: toX,
        //                 y1: toY - isHigherY,
        //                 x2: toX,
        //                 y2: toY
        //             },
        //             arrow: {
        //                 x1: toX,
        //                 y1: toY + arrowOffset,
        //                 x2: toX - arrowSize,
        //                 y2: toY - arrowSize,
        //                 x3: toX + arrowSize,
        //                 y3: toY - arrowSize
        //             }
        //         };
        //     } else {
        //         linesData = {
        //             line1: {
        //                 x1: fromX,
        //                 y1: fromY,
        //                 x2: fromX,
        //                 y2: fromY - difY / 2
        //             },
        //             line2: {
        //                 x1: fromX,
        //                 y1: fromY - difY / 2,
        //                 x2: toX,
        //                 y2: fromY - difY / 2
        //             },
        //             line3: {
        //                 x1: toX,
        //                 y1: fromY - difY / 2,
        //                 x2: toX,
        //                 y2: toY
        //             },
        //             line4: {
        //                 x1: 0,
        //                 y1: 0,
        //                 x2: 0,
        //                 y2: 0
        //             },
        //             line5: {
        //                 x1: 0,
        //                 y1: 0,
        //                 x2: 0,
        //                 y2: 0
        //             },
        //             arrow: {
        //                 x1: toX,
        //                 y1: toY + arrowOffset,
        //                 x2: toX - arrowSize,
        //                 y2: toY - arrowSize,
        //                 x3: toX + arrowSize,
        //                 y3: toY - arrowSize
        //             }
        //         };
        //     }
        // }
    }
};