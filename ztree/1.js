var body = document.getElementById('body')
var vm = new viewModel();
ko.applyBindings(vm,body);
var oStorage = window.localStorage;
var data = oStorage.getItem('data');

var select2Opions = {
	'1':[{
		name:'1-1',
		value:'1-1'
	},{
		name:'1-2',
		value:'1-2'
	},{
		name:'1-3',
		value:'1-3'
	}],
	'2':[{
		name:'2-1',
		value:'2-1'
	},{
		name:'2-2',
		value:'2-2'
	},{
		name:'2-3',
		value:'2-3'
	}],
	'3':[{
		name:'3-1',
		value:'3-1'
	},{
		name:'3-2',
		value:'3-2'
	},{
		name:'3-3',
		value:'3-3'
	}],
}
if (data) {
	var obj = JSON.parse(data);
	var newinpust = [];
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].name == 'app') {
			vm.select1Value(obj[i].value);
			vm.select2(select2Opions[obj[i].value])
		}else if (obj[i].name == 'type') {
			vm.select2Value(obj[i].value)
		}else{
			newinpust.push(obj[i]);
		}
	};
	vm.inputs(newinpust);
};
function viewModel () {
	var self = this;
	this.select1 = ko.observableArray([{
		name:'1',
		value:'1'
	},{
		name:'2',
		value:'2'
	},{
		name:'3',
		value:'3'
	}]);
	this.select2 = ko.observableArray([{
		name:'1-1',
		value:'1-1'
	},{
		name:'1-2',
		value:'1-2'
	},{
		name:'1-3',
		value:'1-3'
	}]);
	this.inputs = ko.observableArray([]);
	this.select1Value = ko.observable();
	this.select2Value = ko.observable();
	this.select1Change = function (argument) {
		var key = self.select1Value();
		self.select2(select2Opions[key])
	};
	this.select2Change = function (argument) {
		
	};
	this.add = function (argument) {
		self.inputs.push({value:""});
	};
	this.save = function (argument) {
		var inputs = self.inputs();
		var inpustfilter =  [];
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].value) {
				inpustfilter.push(inputs[i])
			};
		};
		var arr = [{name:'app',value:self.select1Value()},{name:'type',value:self.select2Value()}];
		var result = arr.concat(inpustfilter);
		oStorage.setItem('data',JSON.stringify(result));
		if (oStorage.getItem('data')) {
			alert('保存成功')
		};
	}
}