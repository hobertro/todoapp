// teal #43D1C3;


var todoView = Backbone.View.extend({
	//tagName: "li",
	// will render each time a new view is created
	className: "todoModel",

	template: Handlebars.compile($("#modelTemplate").html()),

	events: {
		"click [type='checkbox']": "strikeout",
		"click .edit": "editView",
		"click .save": "render",
		"click .delete": "deleteView"
	},

	initialize: function(){
		//this.listenTo(this.model, 'change', this.render());
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	strikeout: function(){
			if (this.$("li").css("textDecoration") === "none"){
			this.$("li").css("textDecoration", "line-through");
			this.model.set("completed", true);
			this.model.save();
		}	else {
			this.$("li").css("textDecoration", "none");
			this.model.set("completed", false);
			this.model.save();
		}
	},
	editView: function(){
		// if the edit view doesn't exist, then create one. 
		if($(".editView").length === 0){
		var editView = new editTodoView({model: this.model});
		this.editView = editView;
		this.editView.parentView = this;
		this.$el.append(editView.render().el);
		} else {
			return ;
		}
		
	},
	deleteView: function(){
		this.model.destroy();
		this.remove();
	},

});

var editTodoView = Backbone.View.extend({
	className: "editView",
	events: {
		"click button": "saveEdit",
		"keypress input": "createOnEnter"
	},

	template: Handlebars.compile($("#editTemplate").html()),

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	saveEdit: function(){
		var savedInput = this.$el.find("input").val();
		if (savedInput === "" || null){
			return;
		} else {
		//this.model.set({"title": savedInput});
		this.model.save({"title": savedInput}, {
			success: function(){
				console.log("model successfully saved as " + savedInput);
			},
			error: function(error){
				console.log("model failed to save");
			}
		});
		}
	},
	createOnEnter: function(event){
	if (event.which !== 13 /* || !this.$el.find("input").val().trim()*/){
		return;
		// 13 is keyCode property for "Enter Key"
	}
	this.saveEdit();
	this.parentView.render();
	console.log(this.parentView);
	}
});
