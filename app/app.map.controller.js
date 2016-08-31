(function(){
  'use strict';

  angular
      .module('map-gen')
      .controller('mapController', mapControl);

    mapControl.$inject = ['mapGenerator'];
    function mapControl(mapGenerator) {
      var vm = this;
      var map;
      vm.generate = generate;
      vm.x;
      vm.y;
      vm.perc;

      function generate() {
        map =  mapGenerator.createMap(vm.y,vm.x)
        map.seed(vm.perc);
        map.populate();
        vm.map = map;
        vm.mapString = map.toString();
      }
    }
})();
