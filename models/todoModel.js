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
		});
	},
});
