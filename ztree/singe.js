// var createDom = function () {
// 	var dom = document.createElement('div');
// 	dom.innerHTML = '创建了一个dom节点';
// 	dom.style.display = 'none';
// 	document.body.appendChild(dom);
// 	return dom
// };
// var getSingle = function (fn) {
// 	// var dom = fn()
// 	// dom.style.display = 'block'
// 	var result;
// 	return function () {
// 		return result || (result = fn());
// 	}
// }
// document.getElementById('btn').onclick = function () {
// 	var createSingleDom = getSingle(createDom);
// 	var SingleDom = createSingleDom();
// 	SingleDom.style.display = 'block'
// }
// var Share = function () {
// 	function aaa () {
// 		alert(1)
// 	};
// 	return function () {
// 		return {
// 			aaa:aaa
// 		}
// 	}
// }
// var share = Share();
// var obj = share();
// obj.aaa();
var a = (function () {
	var aa = {num:1};
	return function () {
		return {
			getaa: function () {
				return aa
			}
		}
	}
})()
var aa = a().getaa()
aa.num = 111
var bb = a().getaa();
console.log(bb) 