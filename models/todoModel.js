Parse.initialize("AdGqJXnBWEDhZKgqPnKKlxiLOdzbbCc8Vv2KEanX", "I66EXwDbj2TCTpWjgsHjqwnEYdhb61ChiqiCxpO5");

var TodoModel = Parse.Object.extend("Todo", {
	initialize: function(){
		console.log("Model created and belongs to user " + Parse.User.current().toJSON().username);
		console.log(this.toJSON());
		this.on('change', function(){
			console.log("Model has changed");
		});
	},
	defaults: {
		title: "I am a title",
		completed: false,
		}
});
