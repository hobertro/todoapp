Parse.initialize("AdGqJXnBWEDhZKgqPnKKlxiLOdzbbCc8Vv2KEanX", "I66EXwDbj2TCTpWjgsHjqwnEYdhb61ChiqiCxpO5");

var AppView = Backbone.View.extend({

el: "#todoapp",

template: Handlebars.compile($("#inputTemplate").html()),

initialize: function(){
	this.render();
	$enter = this.$('#enter');
	$inputTodo = this.$('#inputTodo');
	$todos = this.$("#todos");
},

events: {
	"click #enter": "createTodo",
	'keypress #inputTodo': 'createOnEnter',
	"click #logout": "logOut"
},

//render a collection of models 
render: function(){
	this.$el.html(this.template({username: Parse.User.current().attributes.username}));
	var currentUser = Parse.User.current();
	if (currentUser) {
    // do stuff with the user
	} else {
    // show the signup or login page
	}
	return this;
},

//for creating views through the form input
createCollection: function(){
	this.collection.forEach(function(model){
		var modelView = new todoView({model: model});
		$todos.append(modelView.el);
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
	$("#todos").append(newView.render().el);
},

createModel: function(value){
	var todo = new TodoModel({title: value,
		//user: Parse.User.current()
	});
	todo.save(null, {
		success: function(test){
			console.log("model saved");
		},
		error: function(test, error){
			console.log("model not saved");
		}
	});
	return todo;
},
createOnEnter: function(event){
	if (event.which !== 13 || !$inputTodo.val().trim()){
		return;
		// 13 is keyCode property for "Enter Key"
	}
	this.createTodo();
},
logOut: function(){
	Parse.User.logOut();
	var newLoginView = new loginView();
	this.undelegateEvents();
	}
});

// All things login and sign up

var loginView = Backbone.View.extend({
	el: "#todoapp",
	template: Handlebars.compile($("#loginTemplate").html()),
	initialize: function(){
		var self = this;
		this.render();
	},
	events: {
		"click #submit-signup": "signUp",
		"click #submit-login": "login"
	},
	render: function(){
		this.$el.html(this.template());
		return this;
	},
	signUp: function(){
		var self = this;
		var username = $("#signUp").val();
		var password = $("#signup-password").val();
		
		Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
			success: function(user) {
				alert("success!");
				self.load();
  },
	error: function(user, error) {
	alert("error");
			}
		});
	},
	login: function(){
		var self = this;
		var username = $("#username").val();
		var password = $("#login-password").val();
		Parse.User.logIn(username, password,{
			success: function(user){
				alert("login successful!");
				self.load();
			},
			error: function(user, error){
				alert("login failed");
			}
		});
	},
	load: function(){
		var self = this;
		var query = new Parse.Query(TodoModel);
		query.equalTo("user", Parse.User.current());
		query.find({
			success: function(results){
				alert("Successfully retrieved " + results.length + " To do models");
				self.collectionLoad(results);
				self.undelegateEvents();

			},
			error: function(error){
				alert("Error, could not load models");
			}
		});
	},
	collectionLoad: function(results){
		var userCollection = new TodoCollection(results);
		var userAppView = new AppView({collection: userCollection});
		userAppView.createCollection();
	}
});



