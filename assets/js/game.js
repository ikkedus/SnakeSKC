Window.Game = {};

(function(game){
    //this line of code grabes a html element for later use.
    var canvas = document.getElementById('game');
    //this takes a the context of the canvas html element, you can compare it to taking the image data of a image.
    var context = canvas.getContext('2d');

   
    //startup values for the game.
    var grid = 16;
    var count = 0;
    var pauze = false;
    var snake = {
        x: 160,
        y: 160,
        
        // snake velocity. moves one grid length every frame in either the x or y direction
        dx: grid,
        dy: 0,
        
        // keep track of all grids the snake body occupies
        cells: [],
        
        // length of the snake. grows when eating an apple
        maxCells: 4
      };
      var apple = {
        x: 320,
        y: 320
      };
    
    // get random whole numbers in a specific range
    function getRandomInt(min,max)
    {
        //Math is a library build into JAVASCRIPT. that deals with mathematics that are more complicated than adding or subtracting numbers.
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function resetGame()
    {
        pauze = false;
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
    }
    //game loop
    function loop()
    {
        //this lets the browser decide when its best to render our game.
        requestAnimationFrame(loop);

        // slow game loop to 15 fps instead of 60 (60/15 = 4)
        if(++count < 4){
            return
        }
        count = 0;

        //clear canvas html element. 
        context.clearRect(0,0,canvas.width,canvas.height);

        if(!pauze)
        {
            // move snake by it's velocity
            snake.x += snake.dx;
            snake.y += snake.dy;
        }

        // wrap snake position horizontally on edge of screen
        if (snake.x < 0) {
            snake.x = canvas.width - grid;
        }
        else if (snake.x >= canvas.width) {
            snake.x = 0;
        }

        // wrap snake position vertically on edge of screen
        if (snake.y < 0) {
            snake.y = canvas.height - grid;
        }
        else if (snake.y >= canvas.height) {
            snake.y = 0;
        }

        // keep track of where snake has been. front of the array is always the head
        snake.cells.unshift({x: snake.x, y: snake.y});

        // remove cells as we move away from them
        if (snake.cells.length > snake.maxCells) {
            snake.cells.pop();
        }

        // this sets the color of the apple and then draws the apple
        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, grid-1, grid-1);

        // this sets the color of the snake
        context.fillStyle = 'green';
        // the snake is comprized of multiple parts that make its body we have to loop through all the parts to make him appear on screen we do this using a forEach loop.
        snake.cells.forEach(function(cell, index) {
            
            //a cell is a piece of the snake, and the index is at what position it is in the snake.

            // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
            context.fillRect(cell.x, cell.y, grid-1, grid-1);  
        
            // snake ate apple
            if (cell.x === apple.x && cell.y === apple.y) {
              snake.maxCells++;
        
              // canvas is 400x400 which is 25x25 grids 
              apple.x = getRandomInt(0, 25) * grid;
              apple.y = getRandomInt(0, 25) * grid;
            }
        
            // check collision with all cells after this one,
            // because we have to check if the snake collides with it self we have to loop through all the cells in the snake.
            for (var i = index + 1; i < snake.cells.length; i++) {
              
              // snake occupies same space as a body part. reset game
              if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y && !pauze) {
                game.gameOver();
              }
            }
          });


    }
    game.reset = function()
    {
        Window.Utils.dissmissModal();
        resetGame();
    }
    game.gameOver = function()
    {
        pauze = true;
        let score = 1230
        Window.Utils.createModal("Game over","You scored: <i>"+score+"</i> points",Window.Utils.createBtns([{text:"start over",click:"Window.Game.reset()",type:"primary"}]))
    }

    // listen to keyboard events to move the snake
    document.addEventListener('keydown',function(keyBoardEvent){
        // prevent snake from backtracking on itself by checking that it's 
        // not already moving on the same axis (pressing left while moving
        // left won't do anything, and pressing right while moving left
        // shouldn't let you collide with your own body)

        // left arrow key
        if (keyBoardEvent.which === 37 && snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
        }
        // up arrow key
        else if (keyBoardEvent.which === 38 && snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
        }
        // right arrow key
        else if (keyBoardEvent.which === 39 && snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
        }
        // down arrow key
        else if (keyBoardEvent.which === 40 && snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;
        }
    });

    //this starts the game.
    requestAnimationFrame(loop);
})(Window.Game);