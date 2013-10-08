var collectionView = Backbone.View.extend({

tagName: "ul",

initialize: function(){

},

render: function(){
this.collection.each(function(models){
	console.log(models);
	var modelView = new todoView({model: models});
	this.$el.append(modelView.el);
	return this;
}, this);
}
});

	