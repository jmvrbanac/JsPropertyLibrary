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

    describe("Entries", function(){
        it("it should be able to create a new PropertyLibraryEntry object", function() {
            var entry = category.createNewEntry("testName", "testPayload");

            expect(entry).not.toBeNull();
            expect(entry.getName()).toBe("testName");
            expect(entry.getPayload()).toBe("testPayload");
        });

        it("we should be able to retrieve an entry from this category through getEntry()", function(){
            category.store("/test", "boom");

            var entry = category.getEntry("/test");
            expect(entry).not.toBeNull();
            expect(entry.getName()).toBe("test");
            expect(entry.getPayload()).toBe("boom");
        });
        it("we should be able to retrieve an entry from a child category through getEntry()", function(){
            category.store("/sub/test", "boom");

            var entry = category.getEntry("/sub/test");
            expect(entry).not.toBeNull();
            expect(entry.getName()).toBe("test");
            expect(entry.getPayload()).toBe("boom");
        });
    });

    describe("Storage", function(){
        it("an entry should be created at the deepest point in the path", function(){
            category.store("/test", "boom");

            var entry = category._entries[0];

            expect(entry).not.toBeNull();
            expect(entry.getName()).toBe("test");
            expect(entry.getPayload()).toBe("boom");
        });

        it("a new category should be created if we are not at the deepest point in the path", function() {
            category.store("/sub/test", "boom");

            var subCat = category._childCategories[0];
            var entry = subCat._entries[0];

            expect(subCat).not.toBeNull();
            expect(subCat.getName()).toBe("sub");

            expect(entry).not.toBeNull();
            expect(entry.getName()).toBe("test");
            expect(entry.getPayload()).toBe("boom");

        });

        it("new categories should be created recursively until we reach the deepest point", function() {
            category.store("/sub/sub2/test", "boom");

            var subCat = category._childCategories[0]._childCategories[0];

            expect(subCat).not.toBeNull();
            expect(subCat.getName()).toBe("sub2");
            expect(subCat._childCategories.length).toBe(0);
        });
    });
});