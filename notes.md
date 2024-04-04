# DEMYSTIFYING PARALLAX

## Capturing Mouse Movement

* End up with 2 input values to connect our output values to.
* These values will be fractional values conveying the mouse's x and y position.
* Fractional values make it easy to connect later output values to.

### X Position

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

## Connection Mouse Movement to an Output

* Output set up will look fairly similar to our input setup
* there will be a start value, end value, and a range
* 2 OPTIONS TO WORK OUT CURRENT OUTPUT VALUE
* OPTION 1
* outputValue = outputStartValue + (fractionValue * outputRange)
* OPTION 2
* outputValue = outputEndValue - (fractionValue * outputRange)

## Creating the Parallax Effect

* Give each parallax element a depth value between 0 and 1
* This makes it easy to connect depth value to our output values
* 0 means very close and 1 means very far away
* As the number gets closer to one, it will appear to be moving less and less quickly
* itemOutput.x = output.x.current - (output.x.current * itemDepth)
* itemOutput.y = output.y.current - (output.y.current * itemDepth)

### Where elements appear on screen

* in HTML, unless you specify the z-index, elements will appear beneath elements that come after it and on top of elements that come before it
* if element 1 has a depth of 0.1 and element 2 has a depth of 0.8, according to the depth, element 1 should be on top of element 2, but according to html, element 1 will be underneath element 2
* solution: set z-index with code!
* set z-index range
* EX: zIndexRange = 1000
* then work out the z-index for specific element
* itemZIndex = zIndexRange - (zIndexRange * itemDepth)
* The z-indexrange should correlate with or be higher than the amount of decimal places you intend to use for your depth values
* ex: 0.4, index range should be 10
* z-index range of 1000 or 10000 is a safe bet
