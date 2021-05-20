"use strict";

/*
url https://andreboyce.com
author andre boyce
email mobile@andreboyce.com
*/

// All the code in this module is 
// enclosed in closure 
(function(exports) { 
   
   /**
    * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
    */
   class GameOfLife
   {
      /**
       * @constructor
       * @param {string} canvas_id - HTML element id - <canvas id='canvas_id'></canvas>
       * @param {integer} grid_width - grid width
       * @param {integer} grid_height - grid height
       * @param {integer} canvas_width - canvas width in pixels
       * @param {integer} canvas_height - canvas height in pixels
       * @param {integer} percentage_of_organisms percentage_of_organisms 
       * @param {integer} xscale
       * @param {integer} yscale
       * @param {integer} cycles - if you call GameOfLife.run cycles is the amount of updates it will automatically complete
       * @param {integer} delay - delay in miliseconds between updates in run function
       * @param {string} bgcolor - html color #ffffff or rgba( 255, 255, 255, 1.0 )
       * @param {string} fgcolor - html color #ffffff or rgba( 255, 255, 255, 1.0 )
      */
      constructor( p )
      {
         // canvas_id, grid_width = 100, grid_height = 100, canvas_width = 100, canvas_height = 100, percentage_of_organisms = 17, 
         // xscale = 10, yscale = 10, cycles = 800, delay = 1000

         //console.log( p );
         this.canvas_id = p['canvas_id'];
         var canvas = document.getElementById( p['canvas_id'] );

         if( canvas == null )
            throw new Error( "Canvas not found" );

         this.canvas = canvas;

         this.grid        = this.createRandomGrid( p['percentage_of_organisms'], p['grid_width'], p['grid_height'] );
         this.future_grid = this.createGrid( p['grid_width'], p['grid_height'] );

         this.cycles = p['cycles'];
         this.delay  = p['delay'];

         this.interval = null;

         this.percentage_of_organisms = p['percentage_of_organisms'];

         this.generation                              = 0;
         this.number_of_organisms                     = 0;
         this.number_of_organisms_created_this_update = 0;
         this.number_of_organisms_died_this_update    = 0;

         this.xscale = p['xscale'];
         this.yscale = p['yscale'];
         this.grid_width  = p['grid_width'];
         this.grid_height = p['grid_height'];

         this.canvas_width  = p['canvas_width'];
         this.canvas_height = p['canvas_height'];

         this.bgcolor = p['bgcolor'];
         this.fgcolor = p['fgcolor'];

         this.scaleCanvas( p['xscale'], p['yscale'] );
         //this.setFillStyle( p['color'] );
      }

      /**
       * getCanvas
       * @param {object} canvas = document.getElementById( canvas_id ); context = this.getContext()
       * @returns this.canvas
      */
      getCanvas( canvas = this.canvas )
      {
         return this.canvas;
      }

      /**
       * getContext
       * @param {object} canvas = document.getElementById( canvas_id );
       * @returns context = canvas.getContext( "2d" );
      */
      getContext( canvas = this.canvas )
      {
         var context = canvas.getContext( "2d" );
         return context;
      }

      /**
       * setFillStyle
       * @param {string} color - "#FF0000" or rgbA( 255, 255, 255, 1.0 )
       * @param {object} context = var context = canvas.getContext( "2d" );
       * @returns 
      */
      setFillStyle( color, context = this.getContext() )
      {
         context.fillStyle = color;
      }
      

      /**
      * scaleCanvas
      * @param {integer} x width scale 1 = 100%, 0.5 = 50%, 2 = 200%
      * @param {integer} y height scale 1 = 100%, 0.5 = 50%, 2 = 200%
      * @param {object} canvas = document.getElementById( canvas_id ); context = this.getContext()
      */
      scaleCanvas( x, y, context = this.getContext() )
      {
         this.resizeCanvas( this.grid_width*x, this.grid_height*y );
         context.scale( x, y );
         this.xscale = x;
         this.yscale = y;
      }

      /**
       * resizeCanvas
       * canvas.width  = canvas_width;
       * canvas.height = canvas_height;
       * @param {integer} width = this.grid_width
       * @param {integer} height = this.grid_height
       * @param {object} canvas = document.getElementById( canvas_id );
      */
      resizeCanvas( canvas_width = this.canvas_width, canvas_height = this.canvas_height, canvas = this.canvas )
      {         
        canvas.width  = canvas_width;
        canvas.height = canvas_height;
        this.canvas_width  = canvas_width;
        this.canvas_height = canvas_height;
      }

      /**
       * resizeCanvasFullWindow
       * canvas.width  = window.innerWidth;
       * canvas.height = window.innerHeight;
       * @param {object} canvas = document.getElementById( canvas_id );
       * @param {integer} width = window.innerWidth
       * @param {integer} height = window.innerHeight
       * 
      */
      resizeCanvasFullWindow( width = window.innerWidth, height = window.innerHeight, canvas = this.canvas )
      {
         canvas.width  = width;
         canvas.height = height;
      }

      /**
       * fillRect
       * @param {integer} x coordinate
       * @param {integer} y coordinate
       * @param {integer} width
       * @param {integer} height
       * @param {object} context = canvas.getContext( "2d" );
       * 
      */
      fillRect( x, y, width, height, context = this.getContext() )
      {
         context.fillRect( x, y, width, height );
      }

      /**
       * createGrid
       * creates 2d array of boolean with all set to false
       * @param {integer} width - [width][height] width of grid
       * @param {integer} height - [width][height] height of grid
       * @param {array} grid - 2d array of boolean
       * @returns {array} grid - 2d array of boolean
      */
      createGrid( width = this.grid_width, height = this.grid_height, grid = null )
      {
         var grid = new Array( width );
         for( let i = 0; i<grid.length; i++ )
         {
            grid[i] = new Array( height );
         }

         // Loop to initilize 2D array elements. 
         for( let i = 0; i <grid.length; i++ )
         { 
            for( let j = 0; j < grid[i].length; j++ )
            { 
               grid[i][j] = false; 
            }
         }

         return grid;
      }

      /**
       * createRandomGrid
       * creates 2d array of boolean with a precentage of some elements set to true
       * @param {integer} percentage_of_organisms - e.g. 10 =  10%
       * @param {integer} width - [width][height] width of grid
       * @param {integer} height - [width][height] height of grid
       * @param {array} grid - 2d array of boolean
       * @returns {array} grid - 2d array of boolean
      */
      createRandomGrid( percentage_of_organisms = this.percentage_of_organisms, width = this.grid_width, height = this.grid_height, grid = null )
      {
         //console.log( "createRandomGrid: percentage_of_organisms: " + percentage_of_organisms );
         var grid = new Array( width );
         for( let i = 0; i<grid.length; i++ )
         {
            grid[i] = new Array( height );
         }

         // Loop to initilize 2D array elements. 
         for( let i = 0; i <grid.length; i++ )
         {
            for( let j = 0; j < grid[i].length; j++ )
            {
               //grid[i][j] = (Math.random() >= 0.5);
               grid[i][j] = (Math.random() <= Math.abs(percentage_of_organisms/100) );
            }
         }
         this.percentage_of_organisms = percentage_of_organisms;
         return grid;
      }

      /**
       * updateGrid
       * calls updateCell for each cell
       * @param {array} grid - 2d array of boolean
       * @param {array} future_grid - 2d array of boolean
       * @param {integer} generation - how many generations update has been called
       * @param {integer} number_of_organisms number of organisms
       * @param {integer} number_of_organisms_created_this_update number of organisms created this update
       * @param {integer} number_of_organisms_died_this_update  number of organisms that died this update
       * @returns {array} future_grid grid - 2d array of boolean
      */
      updateGrid( grid = this.grid, future_grid = this.future_grid, generation = this.generation, number_of_organisms = this.number_of_organisms, 
                  number_of_organisms_created_this_update = this.number_of_organisms_created_this_update, number_of_organisms_died_this_update = this.number_of_organisms_died_this_update )
      {
         number_of_organisms = 0;
         number_of_organisms_created_this_update = 0;
         number_of_organisms_died_this_update = 0;

         for( let i = 0; i <grid.length; i++ )
         {
            for( let j = 0; j < grid[i].length; j++ )
            {
               if( grid[i][j] )
               {
                  if( !this.updateCell( i, j ) )
                  {
                     number_of_organisms_died_this_update++;
                     
                  }
               }
               else
               {
                  if( this.updateCell( i, j ) )
                  {
                     number_of_organisms_created_this_update++;
                  }
               }

               future_grid[i][j] = this.updateCell( i, j );
               if( future_grid[i][j] )
               {
                  number_of_organisms++;
               }
            }
         }

         this.number_of_organisms = number_of_organisms;
         this.number_of_organisms_created_this_update = number_of_organisms_created_this_update;
         this.number_of_organisms_died_this_update = number_of_organisms_died_this_update;

         this.grid = future_grid;
         this.generation += 1;
         return future_grid;
      }

      /**
       * updateCell
       * @param {integer} x [x][y] x index of element of 2d array
       * @param {integer} y [x][y] y index of element of 2d array
       * @param {array} grid - 2d array
       * @return {boolean} if cell will live or die
      */
      updateCell( x, y, grid = this.grid )
      {
         //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
         //Any live cell with two or three live neighbours lives on to the next generation.
         //Any live cell with more than three live neighbours dies, as if by overpopulation.
         //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

         if( x <= 0 || x > grid.length )
            return false;
         if( y <= 0 || y > grid[x].length )
            return false;

         var neighbours = 0;
         var alive = grid[x][y];

         if( y-1 >= 0 )
         {
            if( x-1 >= 0 )
               if( grid[x-1][y-1] ) // top left
                  neighbours += 1;
               
            if( grid[x][y-1] ) // top center
               neighbours += 1;

            if( x+1 < grid.length )
               if( grid[x+1][y-1] ) // top right
                  neighbours += 1;
         }

         if( x-1 >= 0 )
           if( grid[x-1][y] ) // middle left
               neighbours += 1;

         if( x+1 < grid.length )
           if( grid[x+1][y] ) // middle right
               neighbours += 1;

         if( x-1 >= 0 )
            if( y+1 < grid[x-1].length )
               if( grid[x-1][y+1] ) // bottom left
                  neighbours += 1;

         if( y-1 >= 0 )
            if( y+1 < grid[x].length )
               if( grid[x][y+1] ) // bottom middle
                  neighbours += 1;

         if( x+1 < grid.length )
            if( y+1 < grid[x+1].length )
               if( grid[x+1][y+1] ) // bottom right
                  neighbours += 1;

         if( neighbours < 2 && alive == true )
         {
            return false;
         }
         if( ( neighbours == 2 || neighbours == 3 ) && alive == true )
         {
            return true;
         }
         if( ( neighbours > 3 ) && alive == true )
         {
            return false;
         }
         if( ( neighbours == 3 ) && alive == false )
         {
            return true;
         }

         return false;
      }

      /**
       * clearCanvas
       * calls context.clearRect( 0, 0, canvas.width, canvas.height );
       * @param {string} color - html color #ffffff or rgba( 255, 255, 255, 1 )
       * @param {object} canvas = document.getElementById( canvas_id );
      */
      clearCanvas( color = this.bgcolor, canvas = this.canvas, context = this.getContext() )
      {
         context.clearRect( 0, 0, canvas.width, canvas.height );

         this.bgcolor = color;
         this.setFillStyle( color );
         this.fillRect( 0, 0, canvas.width, canvas.height, context );
         this.setFillStyle( this.fgcolor );
      }

      /**
       * renderGrid
       * for each cell call this.fillRect( i, j, 1, 1 );
       * @param {array} grid - 2d array
      */
      renderGrid( grid = this.grid )
      {
         for( let i = 0; i <grid.length; i++ )
         { 
            for( let j = 0; j < grid[i].length; j++ )
            {
               if( grid[i][j] )
                  this.fillRect( i, j, 1, 1 );
            } 
         }
      }

      /**
       * renderStats
       * @param {integer} generation = this.generation,
       * @param {integer} number_of_organisms = this.number_of_organisms,
       * @param {integer} number_of_organisms_created_this_update = this.number_of_organisms_created_this_update,
       * @param {integer} number_of_organisms_died_this_update = this.number_of_organisms_died_this_update,
       * @param {integer} xscale = this.xscale,
       * @param {integer} yscale = this.yscale,
       * @param {object} canvas_id = this.canvas_id
      */
      renderStats( generation = this.generation,
                   number_of_organisms = this.number_of_organisms,
                   number_of_organisms_created_this_update = this.number_of_organisms_created_this_update,
                   number_of_organisms_died_this_update = this.number_of_organisms_died_this_update,
                   xscale = this.xscale,
                   yscale = this.yscale,
                   canvas_id = this.canvas_id
                 )
      {
         var canvas = document.getElementById( canvas_id );
         var node = document.getElementById( canvas_id + "stats" );
         if( node == null )
         {
            node = document.createElement( "div" );
            node.id = canvas_id + "stats";
            node.style = "width: 500px; margin: 0px auto;";
         }
         else
         {
            node.innerHTML = "";
         }
         node.innerHTML = "<span>generation: " + generation + "</span> " +
                          "<span>total organisms: " + number_of_organisms + "</span> " +
                          "<span>created: " + number_of_organisms_created_this_update + "</span> " +
                          "<span>died: " + number_of_organisms_died_this_update + "</span> " +
                          //"<span>xscale: " + xscale + "</span> "  +
                          //"<span>yscale: " + yscale + "</span>" +
                          "<span>" + "" + "</span>";
         canvas.parentNode.insertBefore( node, canvas.nextSibling );
      }

      /**
       * run
       * @param cycles = this.cycles
       * @param delay = this.delay
       * @returns {object} interval = window.setInterval
       */
      run( completeCallback = null, cycles = this.cycles, delay = this.delay, interval = this.interval )
      {
               interval = window.setInterval( () => { 
                     this.cycles -= 1;
                     this.clearCanvas();
                     this.updateGrid();
                     this.renderGrid();
                     this.renderStats();
                     if( this.cycles <= 0 || ( this.number_of_organisms_created_this_update == 0 && this.number_of_organisms_died_this_update == 0 ) )
                     {
                        window.clearInterval( this.interval );
                        this.cycles = 0;
                        if( typeof completeCallback == "function" )
                          conpleteCallback();
                     }
             }, delay );
            this.interval = interval;
            return interval;
      }

      /**
       * destroy
      */
      destroy()
      {   
      }
   }
   
   // Export the function to exports 
   // In node.js this will be exports  
   // the module.exports 
   // In browser this will be function in 
   // the global object sharedModule 
   exports.GameOfLife = GameOfLife; 
       
})(typeof exports === 'undefined'?  
          this['GameOfLife']={}: exports); 
