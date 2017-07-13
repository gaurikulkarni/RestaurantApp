'use strict';

describe('Konkani App E2E Testing', function() {

	it('should automatically redirect to / when location hash/fragment is empty', function() {

    browser.get('index.html');
    expect(browser.getCurrentUrl()).toMatch("/");

  });
});

describe('index', function() {
    beforeEach(function() {
      browser.get('index.html#/');
    });

    it('should have a title', function() {
      expect(browser.getTitle()).
        toEqual('Goan Savoury');
    });
  });
  
  describe('menu 0 item', function() {
    beforeEach(function() {
      browser.get('index.html#/menu/0');
    });

    it('should have a name', function() {
          var name = element(by.binding('dish.name'));
          expect(name.getText()).
             toEqual('Uddamethi Hot $4.99');
    });

    it('should show the number of comments as', function() {
        expect(element.all(by.exactRepeater('comment in dish.comments'))
            .count()).toEqual(5);
    });

    it('should show the first comment author as', function() {
          element(by.model('search')).sendKeys('author');
            expect(element.all(by.exactRepeater('comment in dish.comments'))
            .count()).toEqual(5);
          var author = element.all(by.exactRepeater('comment in dish.comments'))
                      .first().element(by.binding('comment.author'));

          expect(author.getText()).toContain('25 Cent');

    }); 
	
	
 });

describe('aboutus loop check', function() {
beforeEach(function() {
  browser.get('index.html#/aboutus');
});

it('should show the number of comments as', function() {
	expect(element.all(by.exactRepeater('chef in leaders'))
		.count()).toEqual(4);
}); 

});