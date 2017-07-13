'use strict';

angular.module('goanApp')
.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
	$scope.tab = 1;
	$scope.filtText = '';
	$scope.showMenu = false;
	$scope.message = "Loading ...";
	$scope.dishes = menuFactory.getDishes().query(
		function(response) {
			$scope.dishes = response;
			$scope.showMenu = true;
		},
		function(response) {
			$scope.message = "Error: "+response.status + " " + response.statusText;
	});
		
	$scope.isSelected = function (checkTab) {
		return ($scope.tab === checkTab);
	};
	
	$scope.select = function(setTab) {
		$scope.tab = setTab;

		if (setTab === 2){
			$scope.filtText = "appetizer";}
		else if (setTab === 3){
			$scope.filtText = "mains";}
		else if (setTab === 4){
			$scope.filtText = "sides";}
		else if (setTab === 5){
			$scope.filtText = "dessert";}
		else{
			$scope.filtText = "";}
	};
	
	$scope.toggleDetails = function() {
		$scope.showDetails = !$scope.showDetails;
	};
}])

.controller('ContactController', ['$scope', function($scope) {
	$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
	var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
	$scope.channels = channels;
	$scope.invalidChannelSelection = false;
}])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
	$scope.sendFeedback = function() {
		if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
			$scope.invalidChannelSelection = true;
			console.log('incorrect');
		}
		else {
			feedbackFactory.postFeedback().save({id:$scope.feedback.id},$scope.feedback);
			
			$scope.feedback = {mychannel:"", firstName:"", lastName:"",
							   agree:false, email:"" };
			$scope.feedback.mychannel="";

			$scope.feedbackForm.$setPristine();
			console.log($scope.feedback);
		}
	};
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
	$scope.showDish = false;
	$scope.message="Loading ...";
	$scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
	.$promise.then(
		function(response){
			$scope.dish = response;
			$scope.showDish = true;
		},
		function(response) {
			$scope.message = "Error: "+response.status + " " + response.statusText;
		}
	);
}])


.controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
	//Step 1: Create a JavaScript object to hold the comment from the form
	$scope.newComment = {rating:"5",comment:"",author:"",date:""};
	
	$scope.submitComment = function () {
		$scope.newComment.date = new Date().toISOString();
		console.log($scope.newComment);
		$scope.dish.comments.push($scope.newComment);

		menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
		$scope.commentForm.$setPristine();
		$scope.newComment = {rating:5, comment:"", author:"", date:""};
	};
}])

.controller('IndexController', ['$scope', 'menuFactory','corporateFactory', function($scope, menuFactory,corporateFactory) {
	$scope.showDish = false;
	$scope.message="Loading ...";

	$scope.dish = menuFactory.getDishes().get({id:0})
	.$promise.then(
		function(response){
			$scope.dish = response;
			$scope.showDish = true;
		},
		function(response) {
			$scope.message = "Error: "+response.status + " " + response.statusText;
		}
	);
	
	$scope.showPromotion = false;
	$scope.promotion = menuFactory.getPromotion().get({id:0})
	.$promise.then(
		function(response){
			$scope.promotion = response;
			$scope.showPromotion = true;
		},
		function(response) {
			$scope.message = "Error: "+response.status + " " + response.statusText;
		}
	);
	
	$scope.showChef = false;
	$scope.chef = corporateFactory.getLeaders().get({id:3})
	.$promise.then(
		function(response){
			$scope.chef = response.data;
			$scope.showChef = true;
		},
		function(response) {
			$scope.message = "Error: "+response.status + " " + response.statusText;
		}
	);
}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
	$scope.showLeaders = false;
	$scope.leaders = corporateFactory.getLeaders().query(
		function(response) {
			$scope.leaders = response.data;
			$scope.showLeaders = true;
		},
		function(response) {
			$scope.message = "Error: "+response.status + " " + response.statusText;
		}
	);
}])
;