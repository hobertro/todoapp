var AppView = Backbone.View.extend({

el: "#todoapp",

initialize: function(){
	$enter = this.$('#enter');
	$inputTodo = this.$('#inputTodo');
},

events: {
	"click #enter": "createTodo",
	'keypress #inputTodo': 'createOnEnter'
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
	//var value = $("#inputTodo").val();
	if ($inputTodo.val() === "" || null) {
		return;
	} else {
	var value = $inputTodo.val();
	this.createView(value);
	$inputTodo.val(""); // reset value
	}
},

createView: function(value){
	var newView = new todoView({model: this.createModel(value)});
	$("#todo").append(newView.render().el);
},

createModel: function(value){
	var todo = new TodoModel({title: value});
	return todo;
},
createOnEnter: function(event){
	if (event.which !== 13 || !$inputTodo.val().trim()){
		return;
		// 13 is keyCode property for "Enter Key"
	}
	this.createTodo();
}
});

