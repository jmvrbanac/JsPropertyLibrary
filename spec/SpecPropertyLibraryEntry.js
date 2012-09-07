describe("PropertyLibraryEntry", function() {
  var entry;

  beforeEach(function() {
    entry = new PropertyLibraryEntry();
  });

  it("should be able to instantiate", function() {
    expect(entry).not.toBeNull();
  });
});