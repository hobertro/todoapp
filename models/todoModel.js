var TodoModel = Parse.Object.extend("Todo", {
	className: "Todo",
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
		});
	}
});


var todoCollection = Parse.Collection.extend({
model: TodoModel
});

