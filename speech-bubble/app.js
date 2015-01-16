(function() {
	var app = angular.module('speechBubble', []);
	// The controller is a regular JavaScript function. It is called
	// once when AngularJS runs into the ng-controller declaration.

	app.controller('InlineEditorController', function ($scope){

		// $scope is a special object that makes
		// its properties available to the view as
		// variables. Here we set some default values:

		$scope.showtooltip = false;
		$scope.value = 'Edit me.';

		// Some helper functions that will be
		// available in the angular declarations

		$scope.hideTooltip = function(){

			// When a model is changed, the view will be automatically
			// updated by by AngularJS. In this case it will hide the tooltip.

			$scope.showtooltip = false;
		}

		$scope.toggleTooltip = function(e){
			e.stopPropagation();
			$scope.showtooltip = !$scope.showtooltip;
		}

	});

	app.directive('bubbleDirective', ['$document', function($document) {
		return {
			restrict: 'E',
			templateUrl: 'speech-bubble.html',
			link: function(scope, element, attr) {
			    var startX = 0, startY = 0, x = 0, y = 0;


			    var bubbleElement = element[0].querySelector('.bubble');

			    element.showtooltip = false;
				element.value = 'Edit me.';

				// Some helper functions that will be
				// available in the angular declarations

				element.hideTooltip = function(){

					// When a model is changed, the view will be automatically
					// updated by by AngularJS. In this case it will hide the tooltip.

					element.showtooltip = false;
				}

				element.toggleTooltip = function(e){
					e.stopPropagation();
					element.showtooltip = !element.showtooltip;
				}

				element.on('click', function(event){
			    	event.stopPropagation();
					element.showtooltip = !element.showtooltip;
			    });

			    element.css({
			     position: 'relative'
			     
			    });

			    element.on('mousedown', function(event) {
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

			      bubbleElement.css({
			        width: y + 'px'
			       
			      });

			    }

			    function mouseup() {
			      $document.off('mousemove', mousemove);
			      $document.off('mouseup', mouseup);

			      console.log(element);
			      console.log(bubbleElement);

			    }
  			}
  		};
  	}]);

})();