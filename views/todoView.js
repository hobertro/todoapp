var todoView = Backbone.View.extend({

	// will render each time a new view is created

	template: Handlebars.compile($("#modelTemplate").html()),

	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var todoview = new todoView({ model: todo1});

console.log(todoview.render().el);

$("#todo").append(todoview.render().el);