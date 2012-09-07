
var PropertyLibraryEntry = Class.extend({	
	init: function(){
		this._payload = null;
		this._name = "";
	},

	getName: function(){
		return this._name;
	},

	setName: function(name) {
		this._name = name;
	},

	getPayload: function(){
		return this._payload;
	},

	setPayload: function(payload) {
		this._payload = payload;
	}
});

var PropertyLibraryCategory = Class.extend({
	init: function(categoryName){
		this._name = categoryName;
		this._childCategories = [];
		this._entries = [];
	},

	store: function(path, blob) {

		// We are at the deepest point
		if (path.lastIndexOf("/") === 0) {
			var name  = path.substring(1);
			var entry = null;

			entry = this.createNewEntry(name, blob);

			this._entries.push(entry);
		} else {
			var categoryPath = path.substring(path.indexOf("/", 1));
			var name = path.split("/")[1];
			var category = new PropertyLibraryCategory(name);
			category.store(categoryPath, blob);

			this._childCategories.push(category);
		}
	},

	getEntry: function(path) {
		var result = null;
		if (path.indexOf("/", 1) > 0) {
			var nextCatName = path.split("/")[1];
			for (var i = 0; i < this._childCategories.length; i++)
			{
				if (nextCatName === this._childCategories[i].getName()) {
					var nextPath = path.substring(path.indexOf("/", 1));
					result = this._childCategories[i].getEntry(nextPath);
				}
			}
		} else {
			var entryName = path.substring(1);
			for (var j = 0; j < this._entries.length; j++) {
				if (entryName === this._entries[j].getName()) {
					result = this._entries[j];
				}
			}
		}
		return result;
	},

	createNewEntry: function(name, payload) {
		var entry = new PropertyLibraryEntry();
		entry.setName(name);
		entry.setPayload(payload);

		return entry;
	},

	getName: function() {
		return this._name;
	}
});


var PropertyLibrary = Class.extend({
	init: function(){
		this._library = null;
	},

	addValue: function(path, blob) {
		if (isPathValid(path)) {
			var workingPath = path.substring(1);
			var catArray = workingPath.split("/");
			
			// Get local category or create new one
			var category = getLocalCategory(catArray[1]);
			if (category === null) {
				category = new PropertyLibraryCategory(catArray[1]);
				_library.push(category);
			} 
			
			// Stripping out current category
			workingPath = workingPath.substring(workingPath.indexOf("/", 1));
			category.store(workingPath, blob);
		}
	},

	/**
	 * Allows quick insertion of a full path //path/to/key=value.
	 * @param	pathAndValue
	 */
	addKeyValueString: function(pathAndValue) {
		var splitIndex = pathAndValue.lastIndexOf("=");
		var path = pathAndValue.substring(0, splitIndex);
		var value = pathAndValue.substring(splitIndex + 1)
		addValue(path, value);
	},

	getValue: function(path) {
		if (isPathValid(path)) {
			var workingPath = path.substring(1);
			var catArray = workingPath.split("/");
			
			// Get local category or create new one
			var category = getLocalCategory(catArray[1]);
			if (category) {
				return category.getEntry(workingPath.substring(workingPath.indexOf("/", 1))).payload;
			}
		}
		return null;
	},
	
	isPathValid: function (path) {
		var result = true;
		
		if (path.indexOf("//") !== 0) {
			result = false;
		}
		
		if (path.indexOf("/", 3) < 3) {
			result = false;
		}
		
		return result;
	},

	getLocalCategory: function(name) {
		var category = null;
		for (var i = 0; i < _library.length; i++)
		{
			if (_library[i].name === name) {
				category = _library[i];
			}
		}
		return category;
	},

	getPathFromParents:function(currentNode) {
		var result = currentNode.localName();
		var parentNode = currentNode.parent();
		while (parentNode != null) {
			result = parentNode.localName() + "/" + result;
			parentNode = parentNode.parent();
		}

		return "//" + result;
	}
});