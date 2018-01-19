

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
const OAuth2Client = google.auth.OAuth2;
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const opn = require('opn');
const nconf = require('nconf');
const path = require('path');

var googleapi = {};
googleapi.scopes = [
	'https://www.googleapis.com/auth/drive',
	'https://www.googleapis.com/auth/drive.appdata',
	'https://www.googleapis.com/auth/drive.file',
	'https://www.googleapis.com/auth/drive.metadata',
	'https://www.googleapis.com/auth/drive.metadata.readonly',
	'https://www.googleapis.com/auth/drive.photos.readonly',
	'https://www.googleapis.com/auth/drive.readonly'
	];
//var server = null;
googleapi.authenticated = false;
googleapi.storeToken = function (token)  {
  try {
		fs.writeFile('.credentials/drive-ndn.json', JSON.stringify(token));
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
};
googleapi.getNewToken = function (callback, keys) {
	googleapi.authorizeUrl = googleapi.oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: googleapi.scopes.join(' ')
	});
	const server = http.createServer((req, res) => {
		if (req.url.indexOf('/oauth2callback') > -1) {
			const qs = querystring.parse(url.parse(req.url).query);
			googleapi.oAuth2Client.getToken(qs.code, (err, tokens) => {
			if (err) {
				console.error('Error getting oAuth tokens: ' + err);
				return callback(err);
			}
			googleapi.authenticated = true;
			googleapi.oAuth2Client.credentials = tokens;
			googleapi.storeToken(tokens);
			res.end('Authentication successful! Please return to the console.');
			callback(googleapi.oAuth2Client);
			server.close();
			});
		}
		}).listen(3000, () => {
		// open the browser to the authorize url to start the workflow
			opn(googleapi.authorizeUrl);
		});
}
googleapi.authorize = function (keys, callback) {
	googleapi.oAuth2Client = new OAuth2Client(
		keys.client_id,
		keys.client_secret,
		keys.redirect_uris[0]
	);
	if(!googleapi.authenticated){
		fs.readFile('.credentials/drive-ndn.json', function(err, token) {
			if (err || token == '') {
				googleapi.getNewToken(callback, keys);
			} else {
				googleapi.oAuth2Client.credentials = JSON.parse(token);
				callback(googleapi.oAuth2Client);
			}
		});
	}
	else
		callback(googleapi.oAuth2Client);
};

module.exports = {
	upload: function(file, options){
		/*if(options.newname)
			options.saveAs = options.newname;
		return new Promise(function(resolve, reject){
			file.upload(options, function(err, uploadedFiles){
				if(err) return reject(err);

				if(uploadedFiles.length == 0) return reject({ message: "No se subió ninguna imagen" });

				return resolve(uploadedFiles);
			});
		});*/
		var fileMetadata = {
			'name': options.newname,
			parents: [options.folder]
		  };
		  var media = {
			//mimeType: 'image/jpeg',
			body: file._files[0].stream//fs.createReadStream('files/photo.jpg')
		  };
		  
		  
		return new Promise(function (resolve, reject) {
			var createFile = function (auth) {
				var drive = google.drive({
					version: 'v3',
					auth: auth
				});
				drive.files.create({
					resource: fileMetadata,
					media: media,
					fields: 'id',
					auth: auth
				  }, function (err, file) {
					if(err) return reject(err);
		
					return resolve(file);
					
				});
			  };
			  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
				if (err) {
				  console.log('Error loading client secret file: ' + err);
				  return reject(err);
				}
				// Authorize a client with the loaded credentials, then call the
				// Drive API.
				googleapi.authorize(JSON.parse(content).installed, createFile);
			  });
		  });
	}
};