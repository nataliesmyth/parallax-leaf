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
}

output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

let handleMouseMove = function (event) {
    // current mouse value
    input.mouseX.current = event.clientX;
    input.mouseY.current = event.clientY;
    // fractional value
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
    
    // output x
    output.x.current = output.x.end - (input.mouseX.fraction * output.x.range)

    // output y
    output.y.current = output.y.end - (input.mouseY.fraction * output.y.range)

    // apply output to html
    itemsArray.forEach(function (item, k) {
        let depth = parseFloat(item.dataset.depth, 10);
        let itemOutput = {
            x: output.x.current - (output.x.current * depth),
            y: output.y.current - (output.y.current * depth),
            zIndex: 10000 - (10000 * depth)
        }
        console.log('depth: ', depth)
        item.style.zIndex = itemOutput.zIndex;
        item.style.transform = 'translate('+itemOutput.x+'px, '+itemOutput.y+'px)';
    })

    // console.log(output.x.current)

    // console.log('fraction X', input.mouseX.fraction)
    // console.log('fraction Y', input.mouseY.fraction)
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