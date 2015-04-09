/**
 * cordova plugin add org.apache.cordova.file
 *
 * Cet Helper à pour but de faliciter la gestion des fichiers
 *
 * Utilise les fonctionnalités FileEntry et DirectoryEntry d'HTML 5 en Javascript.
 * Il est destiné à l'utilisation pour les technologies mobiles iOS et ANDROID.
 * L'accès aus ressources se fait par la fonctionnalité window.resolveLocalFileSystemURL
 *
 * HTML 5 & JavaScript
 *
 * @category   CSWFrameworkJS
 * @package    Helper
 * @author     GENDT Sébastien sebastien@gendt.fr
 * @version    0.0.1
 *
 * @param int 		filesize  		default 1024*1024 			la taille de mémoire allouée pour le traitement des fichiers
 * @param bool 	typeStorage 	default window.PERSISTENT 	le type de stockage, temporaire ou long
 *
 * @access public
 * @see CswFile.prototype.init()
 * @since Class available since Release 0.0.1
 */

 // TO DO create a method exist

var CswFile = function(filesize, typeStorage)
{
	this.pathApp = cordova.file.applicationDirectory; // accès au fichier source de l'application en read only
	this.pathData = cordova.file.dataDirectory; // accès à la mémoire interne du téléphone - chemin spécifique de la sandbox de l'application
	this.pathExternal = cordova.file.externalDataDirectory; // accès à la mémoire externe (carte SD) du téléphone - chemin spécifique de la sandbox de l'application (not iOS)
	this.pathSD = cordova.file.externalRootDirectory; // accès à la mémoire externe (carte SD) du téléphone - racine de la carte SD (not iOS)
	this.pathCache = cordova.file.cacheDirectory; // accès à la zone de mémoirecache du téléphone - chemin spécifique de la sandbox de l'application

	this.loaded = false;
	this.size = 1024*1024;
	this.type = window.PERSISTENT;

	if(typeof filesize != 'undefined')
		this.size = filesize;
	if(typeof typeStorage != 'undefined')
		this.type = typeStorage;

	this.filesystem = null;
	this.errorMsg = false;

	this.onCallback = function(){ /*alert('onCallback');*/ };
	this.init();
}


/**
 * Cette méthode est appelé comme constructeur, elle initialise l'objet
 * fileSystem et appelle la méthode onInit()
 *
 * @access public
 * @see CswFile.prototype.onInit()
 * @since Method available since Release 0.0.1
 */

CswFile.prototype.init = function()
{
	var obj = this;

	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
	window.requestFileSystem
	(
		this.type, 
		this.size, 
		function(filesystem) 
		{
	  		obj.filesystem = filesystem;
	  		obj.onInit();
		}, 
		this.errorHandler
	);
}


/**
 * Cette méthode défini si l'objet filesystem est chargé,
 * execute le callback défini par la méthode on()
 *
 * @access public
 * @see CswFile.prototype.on()
 * @since Method available since Release 0.0.1
 */

CswFile.prototype.onInit = function()
{
	this.loaded = true;
	this.onCallback();
}


/**
 * Cette méthode est appelé à l'initialisation de l'objet 
 * pour exécuter des tâches par l'utilisateur.
 *
 * @param function 	callback 	la function est appelé à la fin de l'initialisation de l'objet
 * 								ex: 
 * 								CswFile.on(
 *									function(){
 *										this.move(
 *											'mondossier/monfichier.ext',
 *											'monnouveaudossier'
 *										);
 *									}
 *								);
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.on = function(callback)
{
	if(typeof callback == 'function')
		this.onCallback = callback;
	if(this.loaded)
		callback();
}


/**
 * Cette méthode est appelé lorsque une erreur survient
 * dans l'une des méthodes de la classe CswFile
 *
 * @param object 	e 	l'objet évènement quand l'erreur est survenue
 *
 * @access public
 * @since Class available since Release 0.0.1
 */


CswFile.prototype.error = function(e)
{
	switch (e.code) 
	{
		case FileError.QUOTA_EXCEEDED_ERR:
			this.errorMsg = 'QUOTA_EXCEEDED_ERR';
		break;
		case FileError.NOT_FOUND_ERR:
			this.errorMsg = 'NOT_FOUND_ERR';
		break;
		case FileError.SECURITY_ERR:
			this.errorMsg = 'SECURITY_ERR';
		break;
		case FileError.INVALID_MODIFICATION_ERR:
			this.errorMsg = 'INVALID_MODIFICATION_ERR';
		break;
		case FileError.INVALID_STATE_ERR:
			this.errorMsg = 'INVALID_STATE_ERR';
		break;
		default:
			this.errorMsg = 'Unknown Error';
		break;
	};
}


/**
 * Cette méthode permet de créer un fichier, quelqu'en soit le type
 * (txt, mp3, mp4, jpeg, png, etc...)
 *
 * @param string 	name 		le nom et extension du fichier a créer (nom.extension)
 * @param string 	path 		le chemin absolue où créer le fichier, ce chemin est obtenu avec les
 * 								variables: 
 * 								- this.pathApp
 *								- this.pathData
 *								- this.pathExternal
 *								- this.pathSD
 *								- this.pathCache
 * @param function 	callback 	la méthode appelée une fois fichier créé
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.createFile = function(name, path, callback)
{
	var obj = this;
	window.resolveLocalFileSystemURL
	(
		path,
		function(object)
		{
			object.getFile
			(
				name, //file.ext 
				{
					create: true,
					exclusive: true
				}, 
				function (fileEntry) 
				{
					if(typeof callback == 'function')
						callback(fileEntry);
					else
						console.warn(fileEntry);
				}, 
				obj.errorHandler
			);
		}
	);
}


/**
 * Cette méthode permet de créer un dossier
 *
 * @param string 	name 		le nom du dossier a créer (nomdossier)
 * @param string 	path 		le chemin absolue où créer le dossier, ce chemin est obtenu avec les
 * 								variables: 
 * 								- this.pathApp
 *								- this.pathData
 *								- this.pathExternal
 *								- this.pathSD
 *								- this.pathCache
 * @param function 	callback 	la méthode appelée une fois dossier créé
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.createFolder = function(name, path, callback)
{
	window.resolveLocalFileSystemURL
	(
		path,
		function(object)
		{
			object.getDirectory
			(
				name, //folder name
				{
					create: true
				}, 
				function (parent) 
				{
					if(typeof callback == 'function')
						callback(parent);
					else
						console.warn(parent);
				}, 
				this.errorHandler
			);
		}
	);
}


/**
 * Cette méthode permet de créer plusieurs dossiers, 
 * elle fonctionne de façon récursive, le 3e paramètre est fonctionnel
 *
 * @param string 	folders 		le nom des dossiers séparé d'un slash (dossier1/dossier2/dossier3)
 * @param string 	path 			le chemin absolue où créer les dossiers, ce chemin est obtenu avec les
 * 									variables: 
 * 									- this.pathApp
 *									- this.pathData
 *									- this.pathExternal
 *									- this.pathSD
 *									- this.pathCache
 * @param object 	rootDirEntry 	est utilisé par la récursivité pour placer le pointeur dans le dernier dossier créé
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.createFolders = function(uri, path, rootDirEntry)
{
	var obj = this;

	window.resolveLocalFileSystemURL
	(
		path,
		function(object)
		{
			if(typeof rootDirEntry != 'object')
				rootDirEntry = object;

			var folders = uri.split('/');

			if (folders[0] == '.' || folders[0] == '') 
				folders = folders.slice(1);

			rootDirEntry.getDirectory
			(
				folders[0], 
				{create: true}, 
				function(dirEntry) 
				{
					// Recursively add the new subfolder (if we still have another to create).
					
					if (folders.length)
					{ 
						var directories  = folders.slice(1);
						directories = directories.join('/');

						obj.createFolders(directories, path+'/'+folders[0], dirEntry);
					}
				}, 
				obj.errorHandler
			);
		}
	);
}


/**
 * Cette méthode permet de lire des dossiers et fichiers, 
 * elle fonctionne sur un seul niveau de profondeur.
 *
 * @param function 	callback 		permet de récuper la map sous la forme de tableau d'objet
 * 									callback: function(map)
 *									{
 * 										map[0].type = 'file||directory';
 * 										map[1].name = 'nom de l'entrée';
 *									}
 * @param string 	uri 			le chemin absolue où lire les entrées, ce chemin est obtenu avec les
 * 									variables: 
 * 									- this.pathApp
 *									- this.pathData
 *									- this.pathExternal
 *									- this.pathSD
 *									- this.pathCache
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.readMap = function(callback, uri)
{
	var obj = this;
	var maps = new Array();
	var start = '';

	if(uri.length > 0)
		start = uri;

	window.resolveLocalFileSystemURL
	(
		uri,
		function(dirEntry) 
		{
			var dirReader = dirEntry.createReader();
			dirReader.readEntries
			(
				function(entries) // entries Type FileEntry
				{
					var nbEntries = entries.length;

					for (var i = 0, entry; entry = entries[i]; ++i) 
					{
						var type = 'file';
						
						if(entry.isDirectory)
							type = 'directory';

						maps[i] = 
						{
							'type' : type,
							'name' : entry.name
						};

						if(nbEntries == i+1)
							callback(maps);
					}
				},
				obj.errorHandler
			);
		},
		this.errorHandler
	);
}


/**
 * Cette méthode permet de lire le contenu d'un fichier
 *
 * @param string 	uri 			le chemin absolue où lire le fichier, ce chemin est obtenu avec les
 * 									variables: 
 * 									- this.pathApp
 *									- this.pathData
 *									- this.pathExternal
 *									- this.pathSD
 *									- this.pathCache
 * @param function 	callback 		permet de récuper le contenu sous la forme de texte
 * 									callback: function(text){ }
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.readFile = function(uri, callback)
{
	var obj = this;

	window.resolveLocalFileSystemURL
	(
		uri, // file.ext
		function(fileEntry) 
		{
			fileEntry.file
			(
				function(file) 
				{
	 				var reader = new FileReader();

					reader.onloadend = function(e) 
					{
	  					if(typeof callback == 'function')
	    				callback(this.result);
					};

					reader.readAsText(file);
				}, 
				obj.errorHandler
			);
		},
		this.errorHandler
	);
}


/**
 * Cette méthode permet d'écrire dans un fichier,
 * elle écrit et remplace.
 *
 * @param string 	uri 			le chemin absolue où lire le fichier, ce chemin est obtenu avec les
 * 									variables: 
 * 									- this.pathApp
 *									- this.pathData
 *									- this.pathExternal
 *									- this.pathSD
 *									- this.pathCache
 * @param string 	text 			le contenu à rédiger
 * @param function 	callback 		Cette fonction est appelée à la fin de l'écriture
 * 									callback: function(){ }
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.write = function(uri, text, callback)
{
	var obj = this;

	window.resolveLocalFileSystemURL
	(
		uri, //file.ext
		function(fileEntry) 
		{
			// Create a FileWriter object for our FileEntry (log.txt).
			fileEntry.createWriter
			(
				function(fileWriter) 
				{

					fileWriter.onwriteend = function(e) 
					{
						if(typeof callback == 'function')
							callback();
					};

					fileWriter.onerror = function(e) 
					{
						alert('Write failed: ' + e.toString());
					};


					// Create a new Blob and write it to log.txt.

					var blob = new Blob([text], {type: 'text/plain'});
					fileWriter.write(blob);

				}, 
				obj.errorHandler
			);
		}, 
		this.errorHandler
	);
}


/**
 * Cette méthode permet d'écrire dans un fichier,
 * elle écrit à la suite.
 *
 * @param string 	uri 			le chemin absolue où lire le fichier, ce chemin est obtenu avec les
 * 									variables: 
 * 									- this.pathApp
 *									- this.pathData
 *									- this.pathExternal
 *									- this.pathSD
 *									- this.pathCache
 * @param string 	text 			le contenu à rédiger
 * @param function 	callback 		Cette fonction est appelée à la fin de l'écriture
 * 									callback: function(){ }
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.writeAfter = function(uri, text, callback)
{
	var obj = this;

	window.resolveLocalFileSystemURL
	(
		uri, //file.ext
		function(fileEntry) 
		{
			// Create a FileWriter object for our FileEntry (log.txt).

			fileEntry.createWriter
			(
				function(fileWriter) 
				{
					fileWriter.onwriteend = function(e) 
					{
						if(typeof callback == 'function')
							callback();
					};

					fileWriter.onerror = function(e) 
					{
						alert('Write failed: ' + e.toString());
					};

					fileWriter.seek(fileWriter.length);
					fileWriter.write
					(
						new Blob
						(
							[text], 
							{type: 'text/plain'}
						)
					);
				}, 
				obj.errorHandler
			);
		}, 
		this.errorHandler
	);
}


/**
 * Cette méthode permet de supprimer un fichier
 *
 * @param string 	uri 			le chemin absolue où lire le fichier, ce chemin est obtenu avec les
 * 									variables: 
 * 									- this.pathApp
 *									- this.pathData
 *									- this.pathExternal
 *									- this.pathSD
 *									- this.pathCache
 * @param function 	callback 		Cette fonction est appelée à la fin de la suppression
 * 									callback: function(){ }
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.deleteFile = function(uri, callback)
{
	var obj = this;

	window.resolveLocalFileSystemURL
	(	
		uri, 
		function(fileEntry) 
		{
			fileEntry.remove
			(
				function() 
				{
					callback();
				}, 
				obj.errorHandler
			);
		},
		this.errorHandler
	);
}


/**
 * Cette méthode permet de supprimer un dossier,
 * elle supprime également le contenu du dossier
 *
 * @param string 	uri 			le chemin absolue où lire le fichier, ce chemin est obtenu avec les
 * 									variables: 
 * 									- this.pathApp
 *									- this.pathData
 *									- this.pathExternal
 *									- this.pathSD
 *									- this.pathCache
 * @param function 	callback 		Cette fonction est appelée à la fin de la suppression
 * 									callback: function(){ }
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.deleteFolder = function(uri, callback)
{
	if(uri.length == 0 || uri == '.' || uri == '/')
		return;

	var obj = this;
	window.resolveLocalFileSystemURL
	(
		uri,  
		function(dirEntry) 
		{
			dirEntry.removeRecursively
			(
				function() 
				{
	  				callback();
				}, 
				obj.errorHandler
			);
		},
		this.errorHandler
	);
}


/**
 * Cette méthode permet de déplacer un fichier
 *
 * @param string 	uri 	le chemin absolue où lire le fichier, ce chemin est obtenu avec les
 * 							variables: 
 * 							- this.pathApp
 *							- this.pathData
 *							- this.pathExternal
 *							- this.pathSD
 *							- this.pathCache
 * @param sting 	to 		le nom des dossiers de destination séparés d'un slash depuis le chemin absolue
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

CswFile.prototype.move = function(uri, to)
{
	var obj = this;
	window.resolveLocalFileSystemURL
	(
		uri, 
		function(fileEntry) 
		{
			window.resolveLocalFileSystemURL
			(
				to, 
				function(dirEntry) // DirectoryEntry object
				{
	  				fileEntry.moveTo(dirEntry);
				}, 
				obj.errorHandler
			);
		}, 
		this.errorHandler
	);
}


// work strangely

CswFile.prototype.rename = function(uri, name)
{
	var obj = this;
	window.resolveLocalFileSystemURL
	(
		uri, 
		function(fileEntry) 
		{
	  		fileEntry.moveTo(obj.filesystem.root, name);
		}, 
		this.errorHandler
	);
}
