// html setup

let itemsHTMLCollection = document.getElementsByClassName('parallax-item');
const itemsArray = Array.from(itemsHTMLCollection)

// input setup
let input = {
    mouseX: {
        start: 0,
        end: window.innerWidth,
        current: 0,
    },
    mouseY: {
        start: 0,
        end: window.innerHeight,
        current: 0,
    }
};


let output = {
    x: {
        start: -150,
        end: 150,
        current: 0,
    },
    y: {
        start: -150,
        end: 150,
        current: 0,
    },
    zIndex: {
        range: 10000
    },
    scale: {
        start: 1,
        end: 0.3,
    },
    blur: {
        startingDepth: .1,
        range: 20,
    }
}

output.scale.range = output.scale.end - output.scale.start;
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

let mouse = {
    x: window.innerWidth * .5,
    y: window.innerHeight * .5,
}
let updateInputs = function () {
    input.mouseX.current = mouse.x;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

    input.mouseY.current = mouse.y;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
}

let updateOutputs = function () {
    // output x and y
    output.x.current = output.x.end - (input.mouseX.fraction * output.x.range)
    output.y.current = output.y.end - (input.mouseY.fraction * output.y.range)
}

let updateEachParallaxItem = function () {
    itemsArray.forEach(function (item, k) {
        let depth = parseFloat(item.dataset.depth, 10);
        let itemOutput = {
            x: output.x.current - (output.x.current * depth),
            y: output.y.current - (output.y.current * depth),
            zIndex: output.zIndex.range - (output.zIndex.range * depth),
            scale: output.scale.start + (output.scale.range * depth),
            blur: (depth - output.blur.startingDepth) * output.blur.range
        }
        console.log('depth: ', depth)
        item.style.filter = 'blur('+itemOutput.blur+'px)'
        item.style.zIndex = itemOutput.zIndex;
        item.style.transform = 'scale('+itemOutput.scale+')translate('+itemOutput.x+'px, '+itemOutput.y+'px)';
    })
}
let handleMouseMove = function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    updateInputs();
    updateOutputs();
    updateEachParallaxItem()
}
let handleResize = function () {
    input.mouseX.end = window.innerWidth;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.mouseY.end = window.innerWidth;
    input.mouseY.range = input.mouseX.end - input.mouseY.start;
}



// function inside event listener is ANONYMOUS, meaning it is not accessible outside of the event listener.
// moving it to a variable (or function) outside of the event listener and referencing it makes it available outside of the addEventListener scope
window.addEventListener('mousemove', handleMouseMove)
window.addEventListener('resize', handleResize)

    updateInputs();
    updateOutputs();
    updateEachParallaxItem()