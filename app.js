// models

$("#enter").on("click", function(){
	var value = $("#inputTodo").val();
	createView(value);
});

function createView(val){
	var newView = new todoView({model: createModel(val)});
	$("#todo").append(newView.render().el);
}

function createModel(val){
	var todo = new Todo({title: val});
	return todo;
}

var todo1 = new Todo();

// views

var todoview = new todoView({ model: todo1});

$("#todo").append(todoview.render().el);

// app view

var appView = Backbone.View.extend({
	initialize: {

	}
});