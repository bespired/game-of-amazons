if (window.global === undefined) {
	window.global = window;
}

global.clone = function(data) {
	if (data === null) return null
	if (data === undefined) return undefined
	return JSON.parse(JSON.stringify(data))
}

global.notValid = function(data) {
	if (data === null) return true
	if (data === undefined) return true
	if (Number.isNaN(data)) return true
	return false
}

global.isValid = function(data) {
	return !notValid(data)
}

global.isObject = function(data) {
	return data === null || (data && data.toString() === "[object Object]");
}

global.isArray = function(data) {
	return Array.isArray(data)
}

global.isNumber = function(value) {
   return typeof value === 'number' && isFinite(value);
}

global.isBoolean = function(value) {
	return typeof value === "boolean"
}

global.swapKeyValue = function(obj) {
	const ret = {};
  	Object.keys(obj).forEach(key => {
    	ret[obj[key]] = key
  	})
  	return ret;
}

global.firstOfArray = function(data) {
	return data.find(e => true);
}

global.lastOfArray = function(data) {
	return data[data.length-1]
}

global.arrayDiff = function(arr1, arr2) {
	return arr1.filter(x => !arr2.includes(x))
}

global.midSplit = function(str, first, last) {
	return str.substring(str.indexOf(first) + 1, str.lastIndexOf(last))
}

global.keyPairs = function(str, lems, seps) {
	let rows  = str.split(lems)
	let pairs = {}
	rows.forEach( r => {
		let pair = r.split(seps)
		if (pair.length > 1) pairs[pair[0].trim()] = pair[1].trim()
	})
	return pairs
}

global.pairsJoin = function(obj, lems, seps) {
	let arr = []
	Object.keys(obj).forEach( k => {
		arr.push(`${k}${seps}${obj[k]}`)
	})
	return arr.join(lems)
}

global.randomId = function(name) {
	return `${name}-${(Math.random()*1e+8).toString(36).replace('.','-')}`
}

global.mdhash = function(str) {
 	var hash = 0, i, chr
	if (str.length === 0) return '0'
  	for (i = 0; i < str.length; i++) {
   	chr   = str.charCodeAt(i)
   	hash  = ((hash << 5) - hash) + chr
   	hash |= 0
	}
  	return hash.toString(36)
}

global.objhash = function(obj) {
	return mdhash(JSON.stringify(obj))
}

global.setStorage = function(name, value) {
	const setValue = isValid(value) ? JSON.stringify(value) : null
	window.localStorage.setItem(name, setValue)
}

global.getStorage = function(name, value1, value2) {
	const defaultValue = isValid(value2) ? value2 : value1
	const getValue = window.localStorage.getItem(name)
	if (notValid(getValue)) return defaultValue

	const model = JSON.parse(getValue)
	if (notValid(value2)) return model

	const dots = value1.split('.')
	const dotl = dots.length

	if (notValid(model[dots[0]])) return defaultValue
	if ((dotl > 1) && (notValid(model[dots[0]][dots[1]]))) return defaultValue
	if ((dotl > 2) && (notValid(model[dots[0]][dots[1]][dots[2]]))) return defaultValue

	switch(dots.length){
		case 1: return model[dots[0]];
		case 2: return model[dots[0]][dots[1]];
		case 3: return model[dots[0]][dots[1]][dots[2]];
	}
	console.error('too many dots in the getStorage dot notation')
}

global.sortLabelAlphabetical = function(a, b) {
  if ( a.label.toLowerCase() < b.label.toLowerCase() ){ return -1; }
  if ( a.label.toLowerCase() > b.label.toLowerCase() ){ return  1; }
  return 0;
}

global.keySort = function (obj) {
	return Object.fromEntries(Object.entries(obj).sort( ))
}

global.slug = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

/// ----


global.boardPosition = { x: 0, y: 0 }

// ViteComponents() in vite.config.js handles this.
// Object.keys(OpptyCom).forEach((name) => {
// 	console.log('mount: ', name)
// 	Vue.component(name, OpptyCom[name]);
// });

export default global