describe("PropertyLibraryCategory", function() {
  var category;

  beforeEach(function() {
    category = new PropertyLibraryCategory("boom");
  });

  it("should be able to instantiate", function() {
    expect(category).not.toBeNull();
  });
  it("the category name should be set through the constructor", function(){
  	expect(category.getName()).toBe("boom");
  });
});