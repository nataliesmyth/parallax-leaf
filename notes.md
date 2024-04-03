# Capturing Mouse Movement

* End up with 2 input values to connect our output values to.
* These values will be fractional values conveying the mouse's x and y position.
* Fractional values make it easy to connect later output values to.

## X Position

* The max value of the x position is the window's width
* fractionValue = currentMousePosition / maximumMousePosition (only sometimes works)
* or f = mouse.x / window.width
* if we want the mouse position from 100px from the left to 200px from the right:
* We want the fractionValue = 0 when mouse.x = 100
* We want the fractionValue = 1 when mouse.x = window.width - 200px
* inputRange = endValue - startValue
* relativeCurrentMousePosition = currentMousePosition - startValue
* relativeCurrentMousePosition = 100 - 100
* relativeCurrentMousePosition = 0
* We compare the relativeCurrentMousePosition to the our range to get an accurate fraction value
* fractionValue = relativeCurrentMousePosition / inputRange (BETTER, always works!)