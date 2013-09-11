var todoView = Backbone.View.extend({

	tagName: "li",
	// will render each time a new view is created

	template: Handlebars.compile($("#modelTemplate").html()),

	events: {
		"click [type='checkbox']": "strikeout",
		"click #edit": "editView",
		"click #save": "render",
		"click #delete": "deleteView"
	},

	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	strikeout: function(){
			if (this.$el.css("textDecoration") === "none"){
			this.$el.css("textDecoration", "line-through");
			this.model.set("completed", true);
		}	else {
			this.$el.css("textDecoration", "none");
			this.model.set("completed", false);
		}
	},
	editView: function(){
		var editView = new editTodoView({model: this.model});
		console.log(editView);
		this.$el.append(editView.render().el);
	},
	deleteView: function(){
		this.model.destroy();
		this.remove();
	},

});

var editTodoView = Backbone.View.extend({

	events: {
		"click button": "saveEdit"
	},

	template: Handlebars.compile($("#editTemplate").html()),

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	saveEdit: function(){
		console.log(this.$el.find("input").val());
		var saved = this.$el.find("input").val();
		this.model.set({"title": saved});
		console.log("Model title changed to " + this.model.get("title"));
	}
});
