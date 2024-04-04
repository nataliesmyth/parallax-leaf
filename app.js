// html setup

let pupilsHTMLCollection = document.getElementsByClassName('pupil');
const pupilsArray = Array.from(pupilsHTMLCollection)
console.log('pupilsArray: ', pupilsArray)
console.log('pupilsHTMLCollection: ', pupilsHTMLCollection)
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
        start: -70,
        end: 70,
        current: 0,
    },
    y: {
        start: -80,
        end: 80,
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

    output.x.current = output.x.start + (input.mouseX.fraction * output.x.range)
    output.y.current = output.y.start + (input.mouseY.fraction * output.y.range)

    output.x.inverse = output.x.end - (input.mouseX.fraction * output.x.range)
    output.y.inverse = output.y.end - (input.mouseY.fraction * output.y.range)

    // apply output to html
    pupilsArray.forEach(function (pupil, k) {
        if (pupilsArray.indexOf(pupil) === 0) {
            pupil.style.transform = 'translate('+output.x.current+'px, '+output.y.current+'px)';
        } else {
            pupil.style.transform = 'translate('+output.x.inverse+'px, '+output.y.inverse+'px)';
        }
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