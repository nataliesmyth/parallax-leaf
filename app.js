let input = {
    mouseX: {
        start: 100,
        end: window.innerWidth - 200,
        current: 0,
    },
    mouseY: {}
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;

let handleMouseMove = function (event) {
    // current value
    input.mouseX.current = event.clientX;
    // fractional value
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
    if (input.mouseX.fraction > 1) {
        input.mouseX.fraction = 1;
    }
    if (input.mouseX.fraction < 0) {
        input.mouseX.fraction = 0;
    }
    console.log('fraction', input.mouseX.fraction)
}
let handleResize = function () {
    input.mouseX.end = window.innerWidth - 200;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
}



// function inside event listener is ANONYMOUS, meaning it is not accessible outside of the event listener.
// moving it to a variable (or function) outside of the event listener and referencing it makes it available outside of the addEventListener scope
window.addEventListener('mousemove', handleMouseMove)
window.addEventListener('resize', handleResize)