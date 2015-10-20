// MODEL

var Result = Backbone.Model.extend({
	defaults : {
		name : ''
	}
});

// COLLECTION

var Results = Backbone.Collection.extend({model : Result});
var group = [
	{name : 'Mike'},
	{name : 'James'},
	{name : 'Kevin'},
	{name : 'Molly'},
	{name : 'Mary'},
	{name : 'Cocker'},
	{name : 'Jimmy'}
];
var results = new Results(group);

// VIEWS

// Vista para un resultado
var ResultView = Backbone.View.extend({
	model   : new Result(),
	tagName : 'div',
	initialize : function() {
		this.template = _.template($('.resultado').html());
	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
// Vista para todos los resultados
var ResultsView = Backbone.View.extend({
	model  : results,
	el     : $('autoC'),
	events : {
		'click #autoInput' : 'render'
	},
	initialize : function(){
		$('#autoInput').on('click', this.render);
		console.log($('#autoInput'));
	},
	render : function(){
		var self = this;
		_.each(this.model, function(result){
			self.$el.append((new ResultView({model : result})).render().$el);
		});
		return this;
	}
});
var resultsView = new ResultsView();