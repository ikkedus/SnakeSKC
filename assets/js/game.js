(function(){
    // Grab the canvas, which is the part of the screen the game is played in
    let canvas = document.getElementById('game');
    // Retrieve the context of the canvas html element, compare it to taking the image data from an image
    let context = canvas.getContext('2d');

    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;
    const CELL_SIZE = 16;
    const CANVAS_SIZE = 5;

    // Startup values
    let frameCounter = 0;
    let frameCounterLimit = 30;
    let acceptInput = true;
    canvas.height = canvas.width = CANVAS_SIZE * CELL_SIZE;

    let snake = {
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

    let apple = {
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
        // Lets the browser decide when its best to render the game
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

        // Sets the color for the apple and draw it
        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, CELL_SIZE-1, CELL_SIZE-1);

        // Loop over each part of the snake to draw it for the next frame and check for collision with itself
        snake.cells.forEach(function(cell, index) {
            // Set the snake's color
            context.fillStyle = 'green';
            
            // A cell is a piece of the snake, and the index and the index defines the position in the snake
            context.fillRect(cell.x, cell.y, CELL_SIZE, CELL_SIZE);  
        
            // Check if the snake eats an apple
            if (cell.x === apple.x && cell.y === apple.y) {
              snake.length++;
        
              // Place a new apple on a random location in the canvas
              apple.x = getRandomInt(0, CANVAS_SIZE) * CELL_SIZE;
              apple.y = getRandomInt(0, CANVAS_SIZE) * CELL_SIZE;
            }
        
            // check collision with all cells after this one,
            // because we have to check if the snake collides with it self we have to loop through all the cells in the snake.
            for (var i = index + 1; i < snake.cells.length; i++) {
              
              // snake occupies same space as a body part. reset game
              if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 0;
                snake.y = 0;
                snake.cells = [];
                snake.length = 4;
                snake.dx = CELL_SIZE;
                snake.dy = 0;
        
                apple.x = getRandomInt(0, CANVAS_SIZE) * CELL_SIZE;
                apple.y = getRandomInt(0, CANVAS_SIZE) * CELL_SIZE;
              }
            }
          });
    }

    // Listens to keyboard events, used to control the snake
    document.addEventListener('keydown',function(keyBoardEvent){
        if (false === acceptInput) {
            return;
        }

        // Change direction when the left arrow key is pressed
        if (keyBoardEvent.which === KEY_LEFT && snake.dx === 0) {
            snake.dx = -CELL_SIZE;
            snake.dy = 0;
            acceptInput = false;
        }
        // Change direction when the up arrow key is pressed
        else if (keyBoardEvent.which === KEY_UP && snake.dy === 0) {
            snake.dx = 0;
            snake.dy = -CELL_SIZE;
            acceptInput = false;
        }
    });

    // Starts the game
    requestAnimationFrame(loop);
})();