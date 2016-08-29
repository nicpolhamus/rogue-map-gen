(function(){
  'use strict';

  angular
      .module('map-gen')
      .controller('mapController', mapControl);

    mapControl.$inject = ['mapGenerator'];
    function mapControl(mapGenerator) {
      var vm = this;
      var map = mapGenerator.createMap(10,10);
      vm.generate = generate;

      function generate() {
        map.seed();
        map.populate();
        vm.map = map;
        vm.mapString = map.toString();
        console.log(map);
      }
    }
})();
