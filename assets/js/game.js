(function(){
    //this line of code grabs an html element for later use
    var canvas = document.getElementById('game');
    //this takes a the context of the canvas html element, you can compare it to taking the image data of an image
    var context = canvas.getContext('2d');

    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;

    const CELL_SIZE = 16;
    const CANVAS_SIZE = 15;

    // Startup values
    let frameCounter = 0;
    let frameCounterLimit = 4;
    let acceptInput = true;
    canvas.height = canvas.width = CANVAS_SIZE * CELL_SIZE;

    var snake = {
        // The snake's starting position (top left)
        x: 0,
        y: 0,
        
        // This determines the snake's direction. Moves one grid length every frame in either the x or y direction
        dx: CELL_SIZE,
        dy: 0,
        
        // This is a list to keep track of each of the snake's segments
        cells: [],
        
        // The snake's length. This increases each time an apple is eaten
        length: 4
      };

    var apple = {
        // The first apple's position (bottom right)
        x: (CANVAS_SIZE - 1) * CELL_SIZE,
        y: (CANVAS_SIZE - 1) * CELL_SIZE
    };
    
    // get random whole numbers in a specific range
    function getRandomInt(min,max)
    {
        //Math is a library build into JAVASCRIPT. that deals with mathematics that are more complicated than adding or subtracting numbers.
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Game loop
    function loop()
    {
        //this lets the browser decide when its best to render our game.
        requestAnimationFrame(loop);

        // slow game loop to 15 fps instead of 60 (60/15 = 4)
        if(++frameCounter < frameCounterLimit){
            return
        }

        frameCounter = 0;
        acceptInput = true;

        //clear canvas html element. 
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Modify the snake's currect x and y values by their directional offsets
        snake.x += snake.dx;
        snake.y += snake.dy;

        // When the snake reaches a horizontal edge, wrap it around to the opposite edge
        if (snake.x < 0) {
            snake.x = canvas.width - CELL_SIZE;
        }
        else if (snake.x >= canvas.width) {
            snake.x = 0;
        }

        // When the snake reaches a vertical edge, wrap it around to the opposite edge
        if (snake.y < 0) {
            snake.y = canvas.height - CELL_SIZE;
        }
        else if (snake.y >= canvas.height) {
            snake.y = 0;
        }

        // keep track of where snake has been. front of the array is always the head
        snake.cells.unshift({x: snake.x, y: snake.y});

        // remove cells as we move away from them
        if (snake.cells.length > snake.length) {
            snake.cells.pop();
        }

        // this sets the color of the apple and then draws the apple
        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, CELL_SIZE-1, CELL_SIZE-1);

        // this sets the color of the snake
        context.fillStyle = 'green';
        // the snake is comprized of multiple parts that make its body we have to loop through all the parts to make him appear on screen we do this using a forEach loop.
        snake.cells.forEach(function(cell, index) {
            
            //a cell is a piece of the snake, and the index is at what position it is in the snake.

            // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
            context.fillRect(cell.x, cell.y, CELL_SIZE, CELL_SIZE);  
        
            // snake ate apple
            if (cell.x === apple.x && cell.y === apple.y) {
              snake.length++;
        
              // canvas is 400x400 which is 25x25 grids 
              apple.x = getRandomInt(0, CANVAS_SIZE) * CELL_SIZE;
              apple.y = getRandomInt(0, CANVAS_SIZE) * CELL_SIZE;
            }
        
            // check collision with all cells after this one,
            // because we have to check if the snake collides with it self we have to loop through all the cells in the snake.
            for (var i = index + 1; i < snake.cells.length; i++) {
              
              // snake occupies same space as a body part. reset game
              if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.length = 4;
                snake.dx = CELL_SIZE;
                snake.dy = 0;
        
                apple.x = getRandomInt(0, 25) * CELL_SIZE;
                apple.y = getRandomInt(0, 25) * CELL_SIZE;
              }
            }
          });


    }

    // listen to keyboard events to move the snake
    document.addEventListener('keydown',function(keyBoardEvent){
        // prevent snake from backtracking on itself by checking that it's 
        // not already moving on the same axis (pressing left while moving
        // left won't do anything, and pressing right while moving left
        // shouldn't let you collide with your own body)
        if (false === acceptInput) {
            return;
        }

        // left arrow key
        if (keyBoardEvent.which === KEY_LEFT && snake.dx === 0) {
            snake.dx = -CELL_SIZE;
            snake.dy = 0;
            acceptInput = false;
        }
        // up arrow key
        else if (keyBoardEvent.which === KEY_UP && snake.dy === 0) {
            snake.dx = 0;
            snake.dy = -CELL_SIZE;
            acceptInput = false;
        }
        // right arrow key
        else if (keyBoardEvent.which === KEY_RIGHT && snake.dx === 0) {
            snake.dx = CELL_SIZE;
            snake.dy = 0;
            acceptInput = false;
        }
        // down arrow key
        else if (keyBoardEvent.which === KEY_DOWN && snake.dy === 0) {
            snake.dx = 0;
            snake.dy = CELL_SIZE;
            acceptInput = false;
        }
    });

    //this starts the game.
    requestAnimationFrame(loop);
})();