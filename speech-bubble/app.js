(function() {
	var app = angular.module('speechBubble', ['flow']);
	// The controller is a regular JavaScript function. It is called
	// once when AngularJS runs into the ng-controller declaration.

	app.controller('InlineEditorController', function ($scope){

		// $scope is a special object that makes
		// its properties available to the view as
		// variables. Here we set some default values:

		$scope.showtooltip = false;
		$scope.value = 'Edit me.';
		$scope.elements = [];

		// Some helper functions that will be
		// available in the angular declarations

		$scope.hideTooltip = function(){

			// When a model is changed, the view will be automatically
			// updated by by AngularJS. In this case it will hide the tooltip.

			$scope.showtooltip = false;
		}

		$scope.addBubble = function() {

			$scope.elements.push($scope.elements.length);
		}

	});

	app.directive('bubbleDirective', ['$document', function($document) {
		return {
			restrict: 'E',
			templateUrl: 'speech-bubble.html',
			scope: true,
			link: function(scope, element, attr) {
				    var startX = 0, startY = 0, x = 0, y = 0;

				    element.css({
				     position: 'relative'
				    });

				    var moveIco = element.find('img');

				    moveIco.on('mousedown', function(event) {
				      // Prevent default dragging of selected content
				      event.preventDefault();
				      startX = event.pageX - x;
				      startY = event.pageY - y;
				      $document.on('mousemove', mousemove);
				      $document.on('mouseup', mouseup);
				    });

				    function mousemove(event) {
				      y = event.pageY - startY;
				      x = event.pageX - startX;
				      element.css({
				        top: y + 'px',
				        left:  x + 'px'
				      });
				    }

				    function mouseup() {
				      $document.off('mousemove', mousemove);
				      $document.off('mouseup', mouseup);
				    }

				    scope.toggleTooltip = function(e){
						e.stopPropagation();
						scope.showtooltip = !scope.showtooltip;
					}

					scope.calculateSize = function(){

						bubbleWidth = 150;
						bubbleHeight = 45;
						console.log('Scope: ' + scope);
						if(scope.value.length > 10 && scope.value.length < 31) {
							bubbleWidth = scope.value.length * 15;
						}else if(scope.value.length >= 31){
							bubbleWidth = 450
						}

						if (scope.value.length > 41) {
							bubbleHeight = (Math.ceil(scope.value.length / 41 ) * 30) + 45;
						}

						return 'width: ' + (bubbleWidth) + 'px; height: ' + bubbleHeight + 'px';
					}

				  }


		};
  	}]);

})();