(function() {
  'use strict';

  angular
    .module('map-gen')
    .service('mapGenerator', mapGenerator);

  function mapGenerator() {
    var service = {
      generate: generate,
      createMap: createMap
    };

    return service;
  }

  function Map(x, y) {
    this.x = x;
    this.y = y;
    this.map = [];
  }

  Map.prototype = {
    emptyMap: function() {
      var row = [];
      for (var rows = 0, columns = 0; rows < this.x; rows++) {
        row = [];
        for (columns = 0; columns < this.y; columns++) {
          row.push('');
        }
        this.map.push(row);
      }
    }//,
    //toString: function() {
    //  var chars = ['.', '#', '+'];
    //  var mapString = '';
    //  console.log(this.map);
    //  for (var row = 0, column = 0; row < this.x; row++) {
    //    for (column = 0; column < this.y; column++) {
    //      mapString += this.map[row][column];
    //    }
    //    mapString += '\n';
    //  }
    //  return mapString;
    //}
  };

  function createMap(x, y) {
    return new Map(x, y);
  }

  function generate(map) {
    console.log('Map before seeding:');
    console.log(map);
    map.map = seeder(map.x, map.y);
    console.log('Map after seeding:');
    console.log(map);
    map.map = populate(map);
    return map;
  }

  function seeder(columns, rows) {
    var map = [];
    var row;
    for (var r = 0, c = 0; r < rows; r++) {
      row = [];
      for (c = 0; c < columns; c++) {
        if (r === 0) {
          row.push(1);
        } else if (c === 0) {
          row.push(1);
        } else if (r === rows - 1) {
          row.push(1);
        } else if (c === columns - 1) {
          row.push(1);
        } else {
          if (r === rows / 2) {
            row.push(0);
          } else {
            row.push(randomWall());
          }
        }
      }
      map.push(row);
    }
    return map;
  }

  function randomWall() {
    return (Math.floor(Math.random() * (101 - 1) + 1) <= 40) ? 1 : 0;
  }

  function populate(map) {
    var populatedMap = [];
    var row;
    for (var r = 0, c = 0; r < map.x; r++) {
      row = [];
      for (c = 0; c < map.y; c++) {
        map.map[r][c] = placeWall(r, c, map);
      }
    }
  }

  function placeWall(x, y, map) {
    var surroundingWalls = getSurroundingWalls(map, x, y);
    //console.log('Surrounding Walls: ' + surroundingWalls);
    //console.log('Cell at index ['+x+']['+y+'] : '+map.map[x][y]);
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
  }

  function getSurroundingWalls(map, row, column) {
    var beforeX = (row === 0) ? 0 : row - 1;
    var beforeY = (column === 0) ? 0 : column - 1;
    var afterX = (row === map.x) ? row : row + 1;
    var afterY = (column === map.y) ? column : column + 1;
    var walls = 0;
    for (var iX = beforeX, iY = beforeY; iX < afterX; iX++) {
      for (iY = beforeY; iY < afterY; iY++) {
        console.log('Checking index at [' + iX + '][' + iY + ']');
        if (iX !== row || iY !== column) {
          if (isWall(map, iX, iY)) {
            walls++;
          }
        }
      }
    }
    console.log('Amount of surrounding walls: ' + walls);
    return walls;
  }

  function isWall(map, x, y) {
    console.log(map.map[x][y]);
    if (outOfBounds(map, x, y)) {
      return true;
    } else if (map.map[x][y] === 1) {
      return true;
    } else if (map.map[x][y] === 0) {
      return false;
    }
    return false;
  }

  function outOfBounds(map, x, y) {
    if (x > map.x - 1 || y > map.y - 1) {
      return true;
    }
    return false;
  }
})();
