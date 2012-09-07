/**
 * JsPropertyLibrary
 * A simple object storage library using XPath-like (Ported from AS3)
 * By John Vrbanac - http://www.verticalcue.com/
 * 
 * Licensed under GPL-v3
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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
        var name;
        // We are at the deepest point
        if (path.lastIndexOf("/") === 0) {
            var entry = null;
            name = path.substring(1);

            entry = this.createNewEntry(name, blob);

            this._entries.push(entry);
        } else {
            var categoryPath;
            var category;

            name = path.split("/")[1];
            category = new PropertyLibraryCategory(name);
            categoryPath = path.substring(path.indexOf("/", 1));

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
        this._library = [];
    },

    addValue: function(path, blob) {
        if (this.isPathValid(path)) {
            var workingPath = path.substring(1);
            var catArray = workingPath.split("/");
            
            // Get local category or create new one
            var category = this.getLocalCategory(catArray[1]);
            if (category === null) {
                category = new PropertyLibraryCategory(catArray[1]);
                this._library.push(category);
            } 
            
            // Stripping out current category
            workingPath = workingPath.substring(workingPath.indexOf("/", 1));
            category.store(workingPath, blob);
        }
    },

    /**
     * Allows quick insertion of a full path //path/to/key=value.
     * @param   pathAndValue
     */
    addKeyValueString: function(pathAndValue) {
        var splitIndex = pathAndValue.lastIndexOf("=");
        var path = pathAndValue.substring(0, splitIndex);
        var value = pathAndValue.substring(splitIndex + 1);
        this.addValue(path, value);
    },

    getValue: function(path) {
        if (this.isPathValid(path)) {
            var workingPath = path.substring(1);
            var catArray = workingPath.split("/");
            
            // Get local category or create new one
            var category = this.getLocalCategory(catArray[1]);
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
        for (var i = 0; i < this._library.length; i++)
        {
            if (this._library[i].getName() === name) {
                category = this._library[i];
            }
        }
        return category;
    }
});