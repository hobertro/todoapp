Parse.initialize("AdGqJXnBWEDhZKgqPnKKlxiLOdzbbCc8Vv2KEanX", "I66EXwDbj2TCTpWjgsHjqwnEYdhb61ChiqiCxpO5");

var AppView = Backbone.View.extend({

	el: "#todoapp",

	template: Handlebars.compile($("#inputTemplate").html()),

	initialize: function(){
		var self = this;
		this.render();
	},

	events: {
		"click #testButton": "completed",
		"click #testButton2": "uncomplete",
		"click #testButton3": "allTodos",
		"click #testButton4": "testButton",
		"click #enter": "createTodo",
		'keypress #inputTodo': 'createOnEnter',
		"click #logout": "logOut",
	},

	//render a collection of models 
	render: function(){
		var currentUser = Parse.User.current();
		if (currentUser){
			this.$el.html(this.template({username: Parse.User.current().toJSON().username}));
			this.queryParse();
		} else {
			this.createLogin();
		}
	},

	//for creating views through the form input
	createCollection: function(newCollection){
			$todos = this.$("#todos");
			newCollection = newCollection || this.collection;
			if (newCollection){
			newCollection.forEach(function(model){
			var modelView = new todoView({model: model});
			$todos.append(modelView.el);
		}, this);
		}	else {
			return;
		}
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
		var todo = new TodoModel({title: value, user: Parse.User.current()});
		this.collection.add(todo);
		todo.save(null, {
			success: function(test){
				console.log("model saved and belongs to user " + Parse.User.current().toJSON().username);
			},
			error: function(test, error){
				console.log("model not saved");
			}
		});
		return todo;
	},
	createOnEnter: function(event){
		$inputTodo = this.$('#inputTodo');
		if (event.which !== 13 || !$inputTodo.val().trim()){
			return;
			// 13 is keyCode property for "Enter Key"
		}
		this.createTodo();
	},
	logOut: function(){
		Parse.User.logOut();
		if(this.newLoginView){
			this.newLoginView.render();
			this.collection.reset();
		} else {
			var franceezy = new loginView();
		}
		this.createLogin();
		this.changeBackground();
		this.collection.reset(); // reset collection
		},
	uncomplete: function(){
		$todos.html("");
		this.createCollection(this.collection.uncomplete());
	},
	completed: function(){
		$todos.html("");
		this.createCollection(this.collection.complete());
	},
	allTodos: function(){
		$todos.html("");
		this.createCollection();
	},
	changeBackground: function(){
		document.body.style.background = "orange";
	},
	createLogin: function(){
			this.newLoginView = new loginView();
			this.newLoginView.parentView = this;
	},
	queryParse: function(){
		var self = this;
			this.todos = new TodoCollection();
			this.collection = this.todos;
			this.todos.query = new Parse.Query(TodoModel);
			this.todos.query.equalTo("user", Parse.User.current());
			this.todos.query.find({
				success: function(results){
					console.log(("Successfully retrieved " + results.length + " To do models in queryParse fxn"));
					_.each(results, function(model){
						self.collection.add(model);
					});
					self.createCollection(results);
				},
				error: function(error){
					alert("Error, could not load models");
				}
		});
	}
});

// All things login and sign up

var loginView = Backbone.View.extend({

	el: "#todoapp",

	template: Handlebars.compile($("#loginTemplate").html()),
	initialize: function(){
		var orange = "orange";
			this.changeBackground(orange);
			this.render();
	},
	events: {
		"click #testButton6": "testButton6",
		"click #submit-signup": "signUp",
		"click #submit-login": "login"
	},
	render: function(){
		$("#todoapp").html(this.template());
		return this;
	},
	signUp: function(e){
		var self = this;
		e.preventDefault();
		var username = $("#signUp").val();
		var password = $("#signup-password").val();
			Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
				success: function(user) {
					var white = "white";
						self.undelegateEvents();
						self.parentView.render();
						self.changeBackground(white);
			},
	error: function(user, error) {
			alert("error");
			}
		});
	},
	login: function(e){
		e.preventDefault();
		$('#submit-login').attr("disabled", true);
		var self = this;
		var username = $("#username").val();
		var password = $("#login-password").val();
			Parse.User.logIn(username, password,{
				success: function(user){
					var white = "white";
						self.undelegateEvents();
						self.parentView.render();
						self.changeBackground(white);
				},
				error: function(user, error){
					alert("login failed");
					$('#submit-login').attr("disabled", false);
				}
			});
	},
	changeBackground: function(color){
		document.body.style.background = color;
	},
});

