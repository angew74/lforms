'use strict';

angular.module('lformsWidget', [
    "mgcrea.ngStrap",
    'ui.select2',
    'autocompleteLhcMod',
    'lfConstants'
])
.directive('lformsPanelV', function() {
  return {
    restrict: 'E',
    link: linkFunction,
    transclude: true,
    controller: 'PanelTableCtrl',
    templateUrl: 'form-view-a.html'
  };
})
.directive('lformsPanelH', function() {
  return {
    restrict: 'E',
    link: linkFunction,
    transclude: true,
    controller: 'PanelTableCtrl',
    templateUrl: 'form-view-b.html'
  };
});

/**
 * Add element attributes to the scope.
 *
 * @param {Object} scope
 * @param {Object} element
 * @param {Object} attributes
 * @returns {void}
 */
function linkFunction(scope, element, attributes) {
  scope.hideHeader = attributes['hideHeaders'];
  scope.hideCheckBoxes = attributes['hideCheckBoxes'];
}

