describe("PropertyLibrary", function() {
	var libary;

	beforeEach(function() {
		library = new PropertyLibrary();
	});

	it("should be able to instantiate", function() {
		expect(library).not.toBeNull();
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