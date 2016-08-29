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
        map = mapGenerator.generate(map);
        vm.map = map;
        console.log(map);
      }
    }
})();
