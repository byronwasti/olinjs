var FakeDatabase = module.exports = {

    data: [],

    add: function(obj) {
        //adds item to end of array holding data
        FakeDatabase.data.push(obj);
        FakeDatabase.data = FakeDatabase.data.sort(function(a,b){return a.age-b.age});
    },

    getAll: function() {
        //returns copy of array of all items in the database
        return FakeDatabase.data.slice();
    },

    remove: function(index) {
        //removes item located at index in array and returns it
        return FakeDatabase.data.pop();splice(index,1);
    }
}
