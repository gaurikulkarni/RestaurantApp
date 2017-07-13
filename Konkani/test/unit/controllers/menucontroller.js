describe('Controller: MenuController', function () {

  // load the controller's module
  beforeEach(module('goanApp'));

  var MenuController, scope, $httpBackend;



// Initialize the controller and a mock scope
beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, menuFactory) {

	  // place here mocked dependencies
  $httpBackend = _$httpBackend_;

  $httpBackend.expectGET("http://localhost:3000/dishes").respond([
	{
		"id": 0,
      "name": "Uddamethi",
      "image": "images/Uddamethi.jpg",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A Raw mango curry which is spicy and tangy. The word Uddamethi comes from udda(urad dal) and methi(Fenugreek seeds). Savoury made from coconut and raw mango.",
      "comments":[{}]
  },
  {
  "id": 1,
      "name": "Batata song",
      "image": "images/batata-song.jpg",
      "category": "appetizer",
      "label": "",
      "price": "1.99",
      "description": "An easy potato dish to accompany your main. Mild spicy dish",
  "comments":[{}]
  }
  ]);

	scope = $rootScope.$new();
	MenuController = $controller('MenuController', {
	  $scope: scope, menuFactory: menuFactory
	  
	  
	});
		$httpBackend.flush();

}));

it('should have showDetails as false', function () {

	expect(scope.showDetails).toBeFalsy();

});

it('should create "dishes" with 2 dishes fetched from xhr', function(){

  expect(scope.showMenu).toBeTruthy();
  expect(scope.dishes).toBeDefined();
  expect(scope.dishes.length).toBe(2);

});

it('should have the correct data order in the dishes', function() {

  expect(scope.dishes[0].name).toBe("Uddamethi");
  expect(scope.dishes[1].label).toBe("");

});

it('should change the tab selected based on tab clicked', function(){

  expect(scope.tab).toEqual(1);

  scope.select(3);

  expect(scope.tab).toEqual(3);
  expect(scope.filtText).toEqual('mains');

});

});