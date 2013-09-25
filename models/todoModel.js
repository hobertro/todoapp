Parse.initialize("AdGqJXnBWEDhZKgqPnKKlxiLOdzbbCc8Vv2KEanX", "I66EXwDbj2TCTpWjgsHjqwnEYdhb61ChiqiCxpO5");

var TodoModel = Parse.Object.extend("Todo", {
	defaults: {
		title: "I am a title",
		completed: false
	},
	validate: function(attrs){
		if(attrs.title < 2){
			return "error";
		}
	},
	initalize: function(){
		this.on('change', function(){
			console.log("Model has changed");
			this.save();
		});
	}
});

/*
var testObject = Parse.Object.extend("testObject", {
	defaults: {
		title: "I am a title"
	},
	initalize: function(){
		console.log("test succcessful");
	}
});


var theTest = new testObject({title: "test"});
console.log(theTest.get("title"));
theTest.set("name", "Bob");
console.log(theTest.get("name"));
theTest.save(null, {
	success: function(theTest){
		alert("new theTest object created!");
		console.log("new theTest object created!");
		console.log(theTest.id);
	},
	error: function(theTest, user){
		alert("theTest object failed");
		console.log("theTest object failed");

	}
});

var testComment = Parse.Object.extend("Comment");
var myComment = new testComment();
myComment.set("content", "Let's do it!");
myComment.save(null, {
	success: function(theTest){
		alert("new comment object created!");
		console.log("new theTest object created!");
		console.log(theTest.id);
	},
	error: function(theTest, user){
		alert("comment object failed");
		console.log("theTest object failed");

	}
});

myComment.set("parent", theTest);
myComment.save();


query.get("KLtaJ1ghqT", {
	success: function(test){
		alert("object retrieved!");
		var help = test;
		return help;
	},
	error: function(object, error){
		alert("error, can't retrieve object");
	}
});


var TestCollection = Parse.Collection.extend({
	model: testObject
});

var collection = new TestCollection();
collection.fetch({
	success: function(collection){
		collection.each(function(object){
			console.log(object.toJSON());
		});
	},
	error: function(collection, error){
		alert("error in fetching");
	}
});
*/

