describe("PropertyLibrary", function() {
  var libary;

  beforeEach(function() {
    library = new PropertyLibrary();
  });

  it("should be able to instantiate", function() {
    expect(library).not.toBeNull();
  });
});