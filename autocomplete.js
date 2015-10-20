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
	model   : results,
	el : $('.results'),
	initialize : function() {
		var self = this;
		this.template = _.template($('.resultado').html());
		_.each(this.model.toArray(), function(element){
			self.render(element);
		});
	},
	render : function(value) {
		this.$el.append(this.template(value.toJSON()));
		return this;
	}
});

// Vista de la barra de búsqueda.

var InputView = Backbone.View.extend({
	el : $('.autoC'),
	events : {
		'focusin #autoInput'  : 'render',
		'focusout #autoInput' : 'unRender'
	},
	initialize : function(){
		$('.results').hide();
	},
	render : function(){
		this.resultPosition();
		$('.results').show();
		this.resultView = new ResultView();
		return this;
	},
	unRender : function(){
		$('.results').hide();
		$('.results').empty();
		return this;
	},
	resultPosition : function(){
		var width  = $('#autoInput').outerWidth();
		var height = $('#autoInput').height();
		var offset = $('#autoInput').offset();
		$('.results').css('width', width);
		$('.results').css('left', offset.left);
	}
});
var inputView = new InputView();
// Vista para todos los resultados
/*
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
*/