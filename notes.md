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

## Making it More Realistic

### Scale

* If there are two items that are the same width and height, and one is further away, it should appear smaller in scale
* an items scale should be relative to its depth
* We can use a scale range so to prevent our elements from appearing too small or too big
* scaleStart = 1
* scaleEnd = 0.5
* scaleRange = scaleEnd - scaleStart
* itemScale = scaleStart + (scaleRange * depth)

### Blurriness

* The farther away an item is, the blurrier they will appear
* but we don't want items to get blurry until a certain depth, otherwise every element except elements at zero depth will be blurry
* One option: decide on a starting depth value where blurriness will kick in
* blurStartDepth = 0.5
* The other is a blur range value, meaning how blurry an element can get
* blurRange = 14
* itemBlur = (depth - blurStartDepth) * blurRange
* you may end up with negative blur values, but for nwo that means those elements will appear non-blurry

## Plan Like an Amateur

* When you design and code various versions of the parallax effect, there can be A LOT of moving parts
* Planning is an essential part of the process

### How to plan

* Two methods of planning below
* Both should be done at multiple different stages of a project

#### Write down what you want to happen

* start fairly broadly and descriptively, and then add more detail
* ex:
* As the user moves their mouse, the items move.
* As the user moves their mouse from left to right, their items move from right to left.
* As the user moves their mouse from left to right, each item moves inversely from right to left at a ratio.
* As the user moves their mouse from left to right, each item moves inversely from right to left at a speed relative to its distance away from the user.
* As the user moves their mouse horizontally, each item moves inversely at a speed relative to its distance away from the user.
* Next step: break goal down into managable chucks; i.e ACTION PLAN
* 1. track mouse X using mousemove event.
* 2. compare mouse X to screen width to create a fraction.
* 3. Connect that fraction to an element's X range.
* 4. Do this for each element and apply a depth.
* THEN do the same for each step:
* track mouse X using mousemove event.
    1. add event listener
    2. create named function: handleMouseMove maybe?
    3. Create var that stores event X inside of handleMouseMove
* These lines can become comments in your JS, which are easy to follow
* You can make a plan at ANY time at ANY point in the process
* Break down what has to happen in english, then put it into code

#### Put pen to paper, or pencil to ipad

* draw everything you can
* put fake values an dmake calculations
* make calculations in js or something easy to convert into js
* try interraction in different stages
* once you think you know what is going to happen, replace values with variable names
* write it down and then transfer it into code.
* it doesn't need to be perfect, and it doesn't have to be done all at once.

## Scrolling Parallax Effect

### What we want to achieve

1. Create scrollY input fraction value that I can connect my output values to
2. We then want each of my elements to move in the opposite direction to the scroll direction but proportional to their depth
    * the FURTHER AWAY an element is the QUICKER it will be moving in the opposite direction to the scroll direction
    * the maximum we can scrole is the document height minus the window height

### Unique Input Values for Each Element

* output.y.current = output.y.end - (input.scrollY.fraction * output.y.range)
* this says we should start at the end and as the fraction value increases, we'll get closer and closer to the start value
* instead, we want to start with the start value, and as the fraction value increases, lets get closer and closer to the end value:
* output.y.current = output.y.start + (input.scrollY.fraction * output.y.range)
