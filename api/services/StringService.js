module.exports = {
	toPath: function(str){
		var path = str.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[á]/, 'a')
		.replace(/[é]/, 'e')
		.replace(/[í]/, 'i')
		.replace(/[ó]/, 'o')
		.replace(/[ú]/, 'u')
		.replace(/[()]/, '-')
		.replace(/ñ/, 'ny')
		.replace(/[._*?¿+]/, '');

		return path;
	},
	getExtension: function(filename){
		return filename.split('.').slice(-1);
	}
}