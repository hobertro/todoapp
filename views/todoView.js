var todoView = Backbone.View.extend({

	tagName: "li",
	// will render each time a new view is created

	template: Handlebars.compile($("#modelTemplate").html()),

	events: {
		"click [type='checkbox']": "strikeout"
	},

	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	strikeout: function(){
		alert("hi");
		this.$el.css("textDecoration", "line-through");
	}
});

