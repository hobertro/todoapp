Parse.initialize("AdGqJXnBWEDhZKgqPnKKlxiLOdzbbCc8Vv2KEanX", "I66EXwDbj2TCTpWjgsHjqwnEYdhb61ChiqiCxpO5");

var TodoCollection = Parse.Collection.extend({
	model: TodoModel,
	allTodo: function(){
		return this.models;
	},
	uncomplete: function(){
		var uncompleted = this.filter(function(todo){
			return !todo.get("completed");
		});
		return uncompleted;
	},
	complete: function(){
		this.filter(function(todo){
			return todo.get("completed");
		});
		return completed;
	},
	comparator: function(a,b){
		return a.createdAt > b.createdAt ? 1 : 0;
	},
	nextOrder: function(){
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	}
});

