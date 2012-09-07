describe("PropertyLibrary", function() {
	var libary;

	beforeEach(function() {
		library = new PropertyLibrary();
	});

	it("should be able to instantiate", function() {
		expect(library).not.toBeNull();
	});

	it("should be able to add a value", function() {
		library.addValue("//media/test", "boom");

		var category = library._library[0];
		var entry = category._entries[0];

		expect(category.getName()).toBe("media");
		expect(entry.getName()).toBe("test");
		expect(entry.getPayload()).toBe("boom");
	});

	it("should be able to retrieve a local category", function() {
		library.addValue("//media/test", "boom");

		var category = library.getLocalCategory("media");

		expect(category).not.toBeNull();
		expect(category.getName()).toBe("media");
	});

	describe("Utilities", function() {

		it("can determine if a path is valid", function() {
			expect(library.isPathValid("//base/test")).toBe(true);

			expect(library.isPathValid("//base")).toBe(false);
			expect(library.isPathValid("///")).toBe(false);
			expect(library.isPathValid("/")).toBe(false);
		});
	});
});