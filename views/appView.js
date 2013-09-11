var AppView = Backbone.View.extend({

el: "#todoapp",

initialize: function(){
	this.$enter = this.$('#enter');
},

events: {
	"click #enter": "createTodo",
	'keypress #new-todo': 'createOnEnter'
},

//render a collection of models 
render: function(){
	this.collection.forEach(function(model){
		var modelView = new todoView({model: model});
		this.$el.append(modelView.el);
	}, this);
	return this;
},

//for creating views through the form input

createTodo: function(){
	var value = $("#inputTodo").val();
	this.createView(value);
},

createView: function(value){
	var newView = new todoView({model: this.createModel(value)});
	$("#todo").append(newView.render().el);
},

createModel: function(value){
	var todo = new TodoModel({title: value});
	return todo;
}
});

