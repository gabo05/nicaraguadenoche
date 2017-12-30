module.exports = {
	upload: function(file, options){
		if(options.newname)
			options.saveAs = options.newname;
		return new Promise(function(resolve, reject){
			file.upload(options, function(err, uploadedFiles){
				if(err) return reject(err);

				if(uploadedFiles.length == 0) return reject({ message: "No se subió ninguna imagen" });

				return resolve(uploadedFiles);
			});
		});
		
	}
};