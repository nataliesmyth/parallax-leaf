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

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

let handleMouseMove = function (event) {
    // current value
    input.mouseX.current = event.clientX;
    input.mouseY.current = event.clientY;
    // fractional value
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
    // if (input.mouseX.fraction > 1) {
    //     input.mouseX.fraction = 1;
    // }
    // if (input.mouseX.fraction < 0) {
    //     input.mouseX.fraction = 0;
    // }
    // if (input.mouseY.fraction > 1) {
    //     input.mouseY.fraction = 1;
    // }
    // if (input.mouseY.fraction < 0) {
    //     input.mouseY.fraction = 0;
    // }
    console.log('fraction X', input.mouseX.fraction)
    console.log('fraction Y', input.mouseY.fraction)
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