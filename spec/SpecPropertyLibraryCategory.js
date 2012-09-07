describe("PropertyLibraryCategory", function() {
  var category;

  beforeEach(function() {
    category = new PropertyLibraryCategory();
  });

  it("should be able to instantiate", function() {
    expect(category).not.toBeNull();
  });
});