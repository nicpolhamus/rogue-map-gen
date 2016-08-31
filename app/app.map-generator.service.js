(function() {
  'use strict';

  angular
    .module('map-gen')
    .service('mapGenerator', mapGenerator);

  function mapGenerator() {
    var service = {
      createMap: createMap
    };

    return service;
  }

  function Map(x, y) {
    this.x = x;
    this.y = y;
    this.map = [
    ];
  }

  Map.prototype = {
    populate: populate,
    seed: seeder,
    toString: toString
  };

  function createMap(x, y) {
    return new Map(x, y);
  }

  function populate() {
    for (var r = 0, c = 0; r < this.x-1; r++) {
      for (c = 0; c < this.y-1; c++) {
        this.map[r][c] = (placeWall(r, c, this));
      }
    }

    //////////////

    function placeWall(x, y, map) {
      var surroundingWalls = getSurroundingWalls(map, x, y);
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

      function getSurroundingWalls(map, row, column) {
        var beforeX = row - 1;
        var beforeY = column - 1;
        var afterX = row + 1;
        var afterY = column + 1;
        var iX = beforeX;
        var iY = beforeY;
        var walls = 0;

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

  function seeder() {
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
            row.push(randomWall());
          }
        }
      }
      map.push(row);
    }
    this.map = map;

    ////////////////

    function randomWall() {
      return (Math.floor(Math.random() * (101 - 1) + 1) <= 40) ? 1 : 0;
    }
  }

  function toString() {
    var chars = ['.', '#', '+'];
    var mapString = '';
    for (var row = 0, column = 0; row < this.x; row++) {
      for (column = 0; column < this.y; column++) {
        if(chars[this.map[row][column]] === '.') {
          mapString += chars[this.map[row][column]];
        } else {
          mapString += chars[this.map[row][column]];
        }
      }
      mapString += '\n';
    }
    return mapString;
  }
})();
