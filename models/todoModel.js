Parse.initialize("AdGqJXnBWEDhZKgqPnKKlxiLOdzbbCc8Vv2KEanX", "I66EXwDbj2TCTpWjgsHjqwnEYdhb61ChiqiCxpO5");

var a = 0;

var TodoModel = Parse.Object.extend("Todo", {
	initialize: function(){
		this.on('change', function(){
			console.log("Model has changed");
		});
	},
	defaults: {
		title: "I am a title",
		completed: false
		},
	validate: function(attrs){
		if(attrs.title === null || ""){
			return "Must set a title";
		}
	}
});
