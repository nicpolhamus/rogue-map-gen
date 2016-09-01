/**
 * Map-Generator service
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('map-gen')
    .service('mapGenerator', mapGenerator);


  /**
   * @namespace Map-Generator
   * @desc Map Generator that renders a Map Object
   * @memberOf Services
   */
  function mapGenerator() {
    var service = {
      createMap: createMap
    };

    return service;
  }

  /**
   * Creates a Map
   * @class Map
   * @param {int} x Width of map
   * @param {int} y Height of map
   * @property {int} x    - map width
   * @property {int} y    - map height
   * @property {array}    - map array
   */
  function Map(x, y) {
    this.x = x;
    this.y = y;
    this.map = [];
  }
  
  Map.prototype = {
    populate: populate,
    seed: seeder,
    toString: toString
  };

  /**
   * @function createMap
   * @desc Creates a Map object with x width and y height
   * @param {int} x
   * @param {int} y
   * @memberof Map-Generator
   */
  function createMap(x, y) {
    return new Map(x, y);
  }

  /**
   * @function populate
   * @desc Populates a seeded map
   * @memberof Map
   */
  function populate() {
    for (var r = 0, c = 0; r < this.x-1; r++) {
      for (c = 0; c < this.y-1; c++) {
        this.map[r][c] = (placeWall(r, c, this));
      }
    }

    //////////////

    /**
     * @function placeWall
     * @desc Using getSurroundingWalls, determines if the current index will be a wall or not
     * @param {int} x
     * @param {int} y
     * @param {object} map
     * @memberof populate
     */
    function placeWall(x, y, map) {
      var surroundingWalls = getSurroundingWalls(map, x, y);
      /**
       * this determination is called the 4/5 method
       * it is used in cellular automata studies
       */
      if (map.map[x][y] === 1) {
        if (surroundingWalls >= 4) {
          return 1;
        }
        return 0;
      } else {
        if (surroundingWalls >= 5) {
          return 1;
        }
      }
      return 0;

      //////////////////////////

      /**
       * @function getSurroundingWalls
       * @desc Checks the indecies surrounding the specific index to and returns the amount of walls
       * @param {object} map
       * @param {int} row
       * @param {int} column
       * @memberof placeWall
       */
      function getSurroundingWalls(map, row, column) {
        var beforeX = row - 1;
        var beforeY = column - 1;
        var afterX = row + 1;
        var afterY = column + 1;
        var iX = beforeX;
        var iY = beforeY;
        var walls = 0;

        /**
         * these for loops count around the index at [row,column]
         * the outer loop controls the row advancement
         * the inner loop controls the column advancement
         */
        for (iX = beforeX; iX < afterX+1; iX++) {
          for (iY = beforeY; iY < afterY+1; iY++) {
            if (!(iX == row && iY == column)) {
              if (isWall(map, iX, iY)) {
                walls++;
              }
            }
          }
        }
        return walls;

        ////////////////////
        
        /**
         * @function isWall
         * @desc Checks to see if the specific index is a wall or not
         * @param {object} map
         * @param {int} x
         * @param {int} y
         * @memberof getSurroundingWalls
         */
        function isWall(map, x, y) {
          if(x > -1 && y > -1) {
            console.log(map.map[x][y]);
          }
          if (outOfBounds(map, x, y)) {
            return true;
          } else if (map.map[x][y] === 1) {
            return true;
          } else if (map.map[x][y] === 0) {
            return false;
          }
          return false;

          //////////////

          /**
           * @function outOfBounds
           * @desc Checks to see if the specific index is out of bounds
           * @param {object} map
           * @param {int} x
           * @param {int} y
           * @memberof isWall
           */
          function outOfBounds(map, x, y) {
            if (x < 0 || y < 0 || x > map.x - 2 || y > map.y - 2) {
              return true;
            }
            return false;
          }
        }
      }
    }
  }

  /**
   * @function seeder
   * @desc Returns a 2d map array that has been seeded with random 
   * walls, except for the outside edges of the array which are always walls
   * @param {int} percent
   * @memberof Map
   */
  function seeder(percent) {
    var map = [];
    var row;
    for (var r = 0, c = 0; r < this.x; r++) {
      row = [];
      for (c = 0; c < this.y; c++) {
        if (r === 0) {
          row.push(1);
        } else if (c === 0) {
          row.push(1);
        } else if (r === this.x - 1) {
          row.push(1);
        } else if (c === this.y - 1) {
          row.push(1);
        } else {
          if (r === this.x / 2) {
            row.push(0);
          } else {
            row.push(randomWall(percent));
          }
        }
      }
      map.push(row);
    }
    this.map = map;

    ////////////////

    /**
     * @function randomWall
     * @desc Returns a wall based off the percent given
     * @param {int} percent
     * @memberof seeder
     */
    function randomWall(percent) {
      return (Math.floor(Math.random() * (101 - 1) + 1) <= percent) ? 1 : 0;
    }
  }

  /**
   * @function toString
   * @desc Returns a string representation of the map 
   * @memberof Map
   */
  function toString() {
    var chars = ['.', '#'];
    var mapString = '';
    for (var row = 0, column = 0; row < this.x; row++) {
      for (column = 0; column < this.y; column++) {
        mapString += chars[this.map[row][column]];
      }
      mapString += '\n';
    }
    return mapString;
  }
})();
