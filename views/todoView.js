var todoView = Backbone.View.extend({
	// tagName:
	// will render each time a new view is created

	template: Handlebars.compile($("#modelTemplate").html()),

	events: {
		"click [type='checkbox']": "strikeout",
		"click #edit": "editView",
		"click #save": "render",
		"click #delete": "deleteView"
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
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
		if($(".edit").length === 0){
		var editView = new editTodoView({model: this.model});
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
	className: "edit",
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
		if ($(".test").val() === "" || null){
			return;
		} else {
		var savedInput = this.$el.find("input").val();
		this.model.set({"title": savedInput});
		console.log("Model title changed to " + this.model.get("title"));
		}
		this.model.save();
	},
	createOnEnter: function(event){
	if (event.which !== 13 || !this.$el.find("input").val().trim()){
		return;
		// 13 is keyCode property for "Enter Key"
	}
	this.saveEdit();
	this.remove();
	}
});
