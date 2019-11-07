function switchMap(obj, value) {
	document.all.div_map.getElementsByTagName('img')[obj.getAttribute('image_id') - 1].style.visibility = value;
	obj.blur();
}

function activateRegion() {
	var divsArr = document.all.div_map.getElementsByTagName('div');
	var curRegion = "Киевская область";
	for (var a = 0, b = divsArr.length; a < b; a++) {
		var content = divsArr[a].innerHTML.toLowerCase().replace('<br>', ' ');
		content = content.replace('- ', '-');
		if ((curRegion == content + ' область' || curRegion == content + ' oblast') || ((content.search('крым') != -1 && curRegion.search('крым') != -1) || (content.search('крим') != -1 && curRegion.search('крим') != -1) || (content.search('crimea') != -1 && curRegion.search('crimea') != -1))) {
			document.all.div_map.getElementsByTagName('img')[a].style.visibility = 'visible';
			document.all.regions_map.getElementsByTagName('area')[a].onmouseover = '';
			document.all.regions_map.getElementsByTagName('area')[a].onmouseout = '';
			document.all.regions_map.getElementsByTagName('area')[a].removeAttribute('onmouseover');
			document.all.regions_map.getElementsByTagName('area')[a].removeAttribute('onmouseout');
			document.all.regions_map.getElementsByTagName('area')[a].removeAttribute('href');
		return;
	}}
}
activateRegion();