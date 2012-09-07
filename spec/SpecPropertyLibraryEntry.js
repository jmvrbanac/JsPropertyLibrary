describe("PropertyLibraryEntry", function() {
  var entry;

  beforeEach(function() {
    entry = new PropertyLibraryEntry();
  });

  it("should be able to instantiate", function() {
    expect(entry).not.toBeNull();
  });

  it("should be able to set and retrieve name", function() {
  	entry.setName("MyEntryName");
  	expect(entry.getName()).toBe("MyEntryName");
  });

  describe("when attempting to set and retrieve a payload", function() {
	it("should be able to set and retrieve a string", function() {
		entry.setPayload("boom")
		expect(entry.getPayload()).toBe("boom");
	});

	it("should be able to set and retrieve an object", function() {
		var obj = {"test":"boom"};

		entry.setPayload(obj);
		expect(entry.getPayload()).toBe(obj);
	});
  });
});