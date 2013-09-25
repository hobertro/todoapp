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
	'keypress #inputTodo': 'createOnEnter'
},

//render a collection of models 
render: function(){
	this.$el.html(this.template());
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
		user: Parse.User.current()
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
}
});

// All things login and sign up

var loginView = Backbone.View.extend({
	el: "#todoapp",
	template: Handlebars.compile($("#loginTemplate").html()),
	initialize: function(){
		var self = this;
		//_.bindAll(this, "load");
		this.render();
	},
	events: {
		"click #submit-signup": "signUp",
		"click #submit-login": "login"
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
	test: function(){
		alert("test");
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
				console.log(results);

				self.collectionLoad(results);

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



