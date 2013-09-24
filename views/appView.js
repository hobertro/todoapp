Parse.initialize("AdGqJXnBWEDhZKgqPnKKlxiLOdzbbCc8Vv2KEanX", "I66EXwDbj2TCTpWjgsHjqwnEYdhb61ChiqiCxpO5");

var AppView = Backbone.View.extend({

el: "#todoapp",

initialize: function(){
	$enter = this.$('#enter');
	$inputTodo = this.$('#inputTodo');
	this.render();
},

events: {
	"click #enter": "createTodo",
	'keypress #inputTodo': 'createOnEnter'
},

//render a collection of models 
render: function(){

},

//for creating views through the form input
createCollection: function(){
	this.collection.forEach(function(model){
		var modelView = new todoView({model: model});
		this.$el.append(modelView.el);
	}, this);
	return this;
},

createTodo: function(){
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

// All things login and sign up

var loginView = Backbone.View.extend({
	el: "#todoapp",
	template: Handlebars.compile($("#loginTemplate").html()),
	initialize: function(){
		this.render();
	},
	events: {
		"click #submit-signup": "signUp"
	},
	render: function(){
		$("#todoapp").append(signupTemplate());
	},
	signUp: function(){
		var username = $("#signUp").val();
		var password = $("#signup-password").val();
		
		Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
			success: function(user) {
				alert("success!");
				new AppView();
  },
  error: function(user, error) {
  alert("error");
  }
});
	},
	login: function(){

	}
});



