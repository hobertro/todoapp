Parse.initialize("AdGqJXnBWEDhZKgqPnKKlxiLOdzbbCc8Vv2KEanX", "I66EXwDbj2TCTpWjgsHjqwnEYdhb61ChiqiCxpO5");

var AppView = Backbone.View.extend({

	el: "#todoapp",

	template: Handlebars.compile($("#inputTemplate").html()),

	initialize: function(){
		var self = this;
		this.render();
		$enter = this.$('#enter');
		$inputTodo = this.$('#inputTodo');
		$todos = this.$("#todos");
		$.allCheckbox = this.$("#toggle-all")[0];
		this.allCheckbox = this.$('#toggle-all')[0];
		this.todos = new TodoCollection();
		this.collection = this.todos;
		this.todos.query = new Parse.Query(TodoModel);
		this.todos.query.equalTo("user", Parse.User.current());
		this.todos.query.find({
			success: function(results){
				console.log(("Successfully retrieved " + results.length + " To do models"));
				//self.undelegateEvents();
				_.each(results, function(model){
					self.collection.add(model);
				});
				self.createCollection(self.collection);
			},
			error: function(error){
				alert("Error, could not load models");
			}
		});
	},

	events: {
		"click #testButton": "completed",
		"click #testButton2": "uncomplete",
		"click #testButton3": "allTodos",
		"click #testButton4": "testButton",
		"click #enter": "createTodo",
		'keypress #inputTodo': 'createOnEnter',
		"click #logout": "logOut",
		"click #toggle-all": "toggleAllComplete",
		"click #reset-all": "resetAll",
		"click #clear-all": "clearCompleted"
	},

	//render a collection of models 
	render: function(){
		var currentUser = Parse.User.current();
		if (currentUser){
			this.$el.html(this.template({username: Parse.User.current().toJSON().username}));
		} else {
			//this.createLoginView();
			this.newLoginView = new loginView();
			this.newLoginView.parentView = this;
			//this.undelegateEvents();
		}

	},

	//for creating views through the form input
	createCollection: function(newCollection){
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
		if (event.which !== 13 || !$inputTodo.val().trim()){
			return;
			// 13 is keyCode property for "Enter Key"
		}
		this.createTodo();
	},
	logOut: function(){
		Parse.User.logOut();
		var newLoginView = new loginView();
		//this.createLoginView();
		this.undelegateEvents();
		this.changeBackground();
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
		document.body.style.background = "#1ABC9C";
	},
	/* from dev backbone */
	filterOne: function(todo){
		todo.trigger('visible');
	},
	filterAll: function(){
		app.Todos.each(this.filterOne, this);
	},
	clearCompleted: function(){
		_.invoke(this.todos.complete(), 'destroy');
		return false;
	},
	toggleAllComplete: function(){
		this.collection.each(function(todo){
			todo.save({'completed': true});
		});
	},
	resetAll: function(){
		this.collection.each(function(todo){
			todo.save({'completed': false});
		});
	},
});

// All things login and sign up

var loginView = Backbone.View.extend({

	el: "#todoapp",

	template: Handlebars.compile($("#loginTemplate").html()),
	initialize: function(){
		var turtle = "#1ABC9C";
		this.changeBackground(turtle);
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
	signUp: function(e){
		var self = this;
		e.preventDefault();
		var username = $("#signin-name").val();
		var password = $("#signin-pass").val();
		Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
			success: function(user) {
				var white = "white";
				self.undelegateEvents();
				//this.parentView.render();
				var newAppView = new AppView();
				self.changeBackground(white);
  },
	error: function(user, error) {
	alert("error, sign-up failed");
			}
		});
	},
	login: function(e){
		e.preventDefault();
		$('#submit-login').attr("disabled", true);
		var self = this;
		var username = $("#login-name").val();
		var password = $("#login-pass").val();
		Parse.User.logIn(username, password,{
			success: function(user){
				self.undelegateEvents();
				var newAppView = new AppView();
				//self.parentView.render();
				var white = "white";
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



