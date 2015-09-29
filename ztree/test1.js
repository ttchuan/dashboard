var data = [{
	name: "1",
	id: 1,
	pid: 0
}, {
	name: "2",
	id: 2,
	pid: 0
}, {
	name: "1-1",
	id: 3,
	pid: 1
}, {
	name: " 1-2",
	id: 4,
	pid: 1
}, {
	name: "1-1-1",
	id: 5,
	pid: 3
}, {
	name: "1-1-2",
	id: 6,
	pid: 3
}, {
	name: "2-1",
	id: 7,
	pid: 2
}, {
	name: "2-2",
	id: 8,
	pid: 2
},{
	name: "2-1-1",
	id: 9,
	pid: 7
},{
	name: "2-1-2",
	id: 10,
	pid: 7
}];
var zNodes = [];
var setting = {
	view: {
		selectedMulti: false,
		showIcon: false,
		showLine: false,
		dblClickExpand: false
	},
	check: {
		enable: true
	},
	data: {
		simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pid",
			rootPId: ""
		}
	},
	callback: {
		beforeClick: beforeClick
	}
};
zNodesObj(data);
console.log(zNodes)
function beforeClick(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	if (treeNode.isParent) {
		zTree.expandNode(treeNode);
		return false;
	} else {
		zTree.checkNode(treeNode, !treeNode.checked, true, true);
		return true;
	}
}
function zNodesObj(data, parentArr) {
	if (!parentArr) {
		var parentArr = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].pid == 0) {
				var oldId = data[i].id;
				var oldPid = data[i].pid
				var node = $.extend(true, {}, data[i]);
				node.oldId = oldId;
				node.oldPid = oldPid;
				parentArr.push(node);
				zNodes.push(node);
			};
		};
		zNodesObj(data, parentArr);
	} else {
		for (var i = 0; i < parentArr.length; i++) {
			var newParentArr = [];
			var index = 1;
			for (var j = 0; j < data.length; j++) {
				if (data[j].pid == parentArr[i].oldId) {
					var oldId = data[j].id
					var oldPid = data[j].pid;
					var node = $.extend(true, {}, data[j]);
					node.oldId = oldId;
					node.id = parseInt(parentArr[i].id.toString() + index);
					node.pid = parentArr[i].id;
					index++;
					newParentArr.push(node);
					zNodes.push(node);
					if (zNodes.length == data.length) {
						return
					};
				};
			};
			if (newParentArr.length == 0) {
				continue
			};
			zNodesObj(data, newParentArr);
		};
	}
}
$(function() {
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
})