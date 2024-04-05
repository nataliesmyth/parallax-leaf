// html setup

let itemsHTMLCollection = document.getElementsByClassName('parallax-item');
const itemsArray = Array.from(itemsHTMLCollection);
let html = document.documentElement;

// input setup
let input = {
    scrollY: {
        start: 0,
        end: html.scrollHeight - window.innerHeight,
        current: 0,
    },
    mouseX: {
        start: 0,
        end: window.innerWidth,
        current: 0,
    },
    mouseY: {
        start: 0,
        end: window.innerHeight,
        current: 0,
    },
};

input.scrollY.range = input.scrollY.end - input.scrollY.start;
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

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
    scrollY: {
        start: 0,
        end: 500,
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
        range: 40,
    }
}

output.scale.range = output.scale.end - output.scale.start;
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;
output.scrollY.range = output.scrollY.end - output.scrollY.start;

let mouse = {
    x: window.innerWidth * .5,
    y: window.innerHeight * .5,
}
let updateInputs = function () {
    // mouse x input
    input.mouseX.current = mouse.x;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

    // mouse y input
    input.mouseY.current = mouse.y;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;

    // scroll y input
    input.scrollY.current = html.scrollTop;
    input.scrollY.fraction = (input.scrollY.current - input.scrollY.start) / input.scrollY.range;
    console.log('scroll', input.scrollY.current)
}

let updateOutputs = function () {
    // output x and y
    output.x.current = output.x.end - (input.mouseX.fraction * output.x.range)
    output.y.current = output.y.end - (input.mouseY.fraction * output.y.range)

    output.scrollY.current = output.scrollY.start + (input.scrollY.fraction * output.scrollY.range)
}

let updateEachParallaxItem = function () {
    // apply output to html
    itemsArray.forEach(function (item, k) {
        let depth = parseFloat(item.dataset.depth, 10);

        let itemInput = {
            scrollY: {
                start: item.offsetParent.offsetTop,
                end: item.offsetParent.offsetTop + window.innerHeight,
            }
        }
        // allows us to specify a start and end for each element
        // input is the GLOBAL input
        itemInput.scrollY.range = itemInput.scrollY.end - itemInput.scrollY.start;
        itemInput.scrollY.fraction = (input.scrollY.current - itemInput.scrollY.start) / itemInput.scrollY.range;

        // not using an object bc we only need one value
        let itemOutputYCurrent = output.scrollY.start + (itemInput.scrollY.fraction * output.scrollY.range)


        let itemOutput = {
            x: output.x.current - (output.x.current * depth),
            // scroll piece of code
            y: itemOutputYCurrent * depth + (output.y.current - (output.y.current * depth)),
            zIndex: output.zIndex.range - (output.zIndex.range * depth),
            scale: output.scale.start + (output.scale.range * depth),
            blur: (depth - output.blur.startingDepth) * output.blur.range
        }
        console.log(k, 'fraction: ', itemInput.scrollY.fraction)
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
    updateEachParallaxItem();
}

let handleScroll = function () {
    updateInputs();
    updateOutputs();
    updateEachParallaxItem();
}

let handleResize = function () {
    input.mouseX.end = window.innerWidth;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;

    input.mouseY.end = window.innerWidth;
    input.mouseY.range = input.mouseX.end - input.mouseY.start;

    input.scrollY.end = html.scrollHeight - window.innerHeight;
    input.scrollY.range = input.scrollY.end - input.scrollY.start;
}

// function inside event listener is ANONYMOUS, meaning it is not accessible outside of the event listener.
// moving it to a variable (or function) outside of the event listener and referencing it makes it available outside of the addEventListener scope
window.addEventListener('mousemove', handleMouseMove)
document.addEventListener('scroll', handleScroll)
window.addEventListener('resize', handleResize)

    updateInputs();
    updateOutputs();
    updateEachParallaxItem();