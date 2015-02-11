// teal #43D1C3;

var todoView = Backbone.View.extend({
	//tagName: "li",
	// will render each time a new view is created
	className: "todoModel",

	template: Handlebars.compile($("#modelTemplate").html()),

	events: {
		"click [type='checkbox']": "strikeout",
		"click .edit": "editView",
		"click .delete": "deleteView"
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.model.view = this;
		return this;
	},
	strikeout: function(){
			console.log("strikeout");
			if (this.$("span").css("textDecoration") === "none"){
				this.$("span").css("textDecoration", "line-through");
				this.model.set("completed", true);
				this.model.save();
		}	else {
				this.$("span").css("textDecoration", "none");
				this.model.set("completed", false);
				this.model.save();
		}
	},
	editView: function(){
		// if the edit view doesn't exist, then create one.
		this.$contentTitle = this.$('.content-title');
		console.log(this.$contentTitle);
		if($(".editView").length === 0){
			var editView = new editTodoView({model: this.model});
			this.editView = editView;
			this.editView.parentView = this;
			this.$contentTitle.append(editView.render().el);
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
		"click .save": "saveEdit",
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
		this.model.save({"title": savedInput}, {
			success: function(){
				console.log("model successfully saved as " + savedInput);
			},
			error: function(error){
				console.log("model failed to save");
			}
		});
		this.parentView.render();
		}
	},
	createOnEnter: function(event){
	if (event.which !== 13 /* || !this.$el.find("input").val().trim()*/){
		return;
		// 13 is keyCode property for "Enter Key"
	}
		this.saveEdit();
	}
});
