/**
 * MapController controller
 * @namespace Controllers
 */
(function(){
  'use strict';

  angular
      .module('map-gen')
      .controller('mapController', mapControl);

    mapControl.$inject = ['mapGenerator'];
    /**
     * @namespace MapController
     * @desc Controls how the view renders and manipulates the Map object
     * @memberof Controllers
     */
    function mapControl(mapGenerator) {
      var vm = this;
      var map;
      vm.generate = generate;
      vm.x;
      vm.y;
      vm.perc;

      /**
       * @name generate
       * @desc Generates Map
       * @memberof Controllers.MapController
       */
      function generate() {
        map =  mapGenerator.createMap(vm.y,vm.x)
        map.seed(vm.perc);
        map.populate();
        vm.map = map;
        vm.mapString = map.toString();
      }
    }
})();
