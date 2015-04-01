
/**
 *
 */

function CswApp()
{
	var that = this;

	this.objects = {};
	this.controllers = {};

	$(document).ready
	(
		function()
		{
			that.init();
		}
	);
}

CswApp.prototype.init = function()
{
	 //this.formInit();
	 //this.callCtrl();
	// this.initTpl();
	// this.initClick();
}

CswApp.prototype.createBdd = function()
{
	var that = this;

	$('.model').each
	(
		function(i)
		{
			var path = $(this).attr('src');
			var name  =  path.replace('models/Model.', '');
			var className =  name.replace('.js', '');

			that.objects[className] = eval('new ' + className + '()');
			that.objects[className].createTable();
		}
	);
}

/*
CswApp.prototype.initTpl = function()
{
	$('[csw-tpl]').css('display', 'none');
}

CswApp.prototype.initClick = function()
{
	var that = this;

	$('#app').on
	(
		'dblclick',
		'[csw-dblclick]',
		function(e)
		{
			var parts = $(this).attr('csw-dblclick').split('.');

			var params = eval('(' + $(this).attr('csw-params') + ')');

			if(typeof params === 'undefined' && params === false)
				params = {};

			that.controllers[parts[0]][parts[1]](params);
		}
	);

}


CswApp.prototype.formInit = function(datas)
{
	var that = this;

	$('#app').on
	(
		'submit',
		'.CswForm',
		function(e)
		{
			e.preventDefault();

			var model = $(this).attr('csw-model');
			var actions = model.split('.');
			var className = actions[0];
			var action = actions[1];


			var datas = $(this).serializeArray();

			var object = eval('new ' + className + '()');

			for(var i in datas)
				object[datas[i].name].value = datas[i].value;

			object[action]();

			var target = $(this).attr('csw-target');

			if(typeof target != 'undefined' && target.length > 0)
				that.callCtrl(target);
		}
	);

}

CswApp.prototype.template = function(target, datas)
{
	var elmt = $('[csw-tpl="'+target+'"]');
	elmt.siblings().remove();

	var parent = elmt.parent();
	var node = $(elmt[0]);

	for(var i in datas)
	{
		var clone = node.clone();
		clone.removeAttr('csw-tpl');

		clone = this.setParams(clone, datas[i]);

		for(var k in datas[i])
		{
			this.addIn(clone.find('[csw-var="'+k+'"]'), datas[i][k]);

			parent.append(clone);

			clone.show();
		}
	}
}

CswApp.prototype.inject = function(target, datas)
{
	var node = $('[csw-view="'+target+'"]');

	for(var i in datas)
		for(var k in datas[i])
			this.addIn(node.find('[csw-var="'+k+'"]'), datas[i][k]);
}

CswApp.prototype.setParams = function(node, datas)
{
	var attr = node.attr('csw-params');

	if(typeof attr === 'undefined' && attr === false)
		return node;

	var args = attr.replace('{', '').replace('}', '').split(',');
	var params = {};

	for(var i in args)
		params[args[i]] = datas[args[i]];

	node.attr
	(
		'csw-params',
		JSON.stringify(params)
	);

	return node;
}

CswApp.prototype.addIn = function(node, value)
{
	var node = $(node);

	for(var i in node)
	{
		if(node[i].nodeName == 'INPUT')
			node.val(value);
		else
			node.html(value);
	}
}

CswApp.prototype.controller = function(ctrl, fct)
{
	this.controllers[ctrl] = fct;
}


CswApp.prototype.callCtrl = function(ctrl)
{
	if(typeof ctrl == 'undefined')
	{
		for(var i in this.controllers)
		{
			this.controllers[i].init();
		}
	}
	else
		this.controllers[ctrl].init();
}*/
