/**
 * Cet Helper à pour but de faliciter la gestion des événements
 *
 * Il appelle une fonction callback lors des événements suivants:
 * 				- clique sur le button menu 
 * 				- clique sur le button retour 
 * 				- clique sur le button recherche du clavier 
 * 				- clique sur les buttons de volume 
 * 				- lorsque que l'application est mise en arrière plan 
 * 				- lorsque que l'application est mise en premier plan 
 *
 * Cordova & JavaScript
 *
 * @category   CSWFrameworkJS
 * @package    Helper
 * @author     GENDT Sébastien sebastien@gendt.fr
 * @version    0.0.1
 *
 * @access public
 * @since Class available since Release 0.0.1
 */

var CswEvent = function(){}


/**
 * Cette méthode est appelé pour poser un écouteur d'événement,
 * elle réagit aux événements suivants:
 * 				- ready
 * 				- menu
 * 				- back
 * 				- search
 * 				- volumeDown
 * 				- volumeUp
 * 				- sleep
 * 				- wakeup
 *
 * @param 	string 		eventType 	Permet de définir l'écouteur d'événement, si aucun événement n'est précisé,
 * 									tous les événements seront écoutés.
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.on = function(eventType, callback)
{
	switch (eventType)
	{
		case 'ready':
			this.onDeviceReady(callback);
		case 'menu':
			this.onMenuButton(callback);
		case 'back':
			this.onBackButton(callback);
		case 'search':
			this.onSearchButton(callback);
		case 'volumeDown':
			this.onVolumeDown(callback);
		case 'volumeUp':
			this.onVolumeUp(callback);
		case 'sleep':
			this.onSleep(callback);
		case 'wakeup':
			this.onWakeup(callback);
		default:
			this.all(callback):
	}
}


/**
 * Cette méthode applique tous écouteurs d'événements:
 * 				- ready
 * 				- menu
 * 				- back
 * 				- search
 * 				- volumeDown
 * 				- volumeUp
 * 				- sleep
 * 				- wakeup
 *
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.all = function(callback)
{
	this.onDeviceReady(callback);
	this.onMenuButton(callback);
	this.onBackButton(callback);
	this.onSearchButton(callback);
	this.onVolumeDown(callback);
	this.onVolumeUp(callback);
	this.onSleep(callback);
	this.onWakeup(callback);
}


/**
 * Cette méthode applique un écouteur d'événements sur l'action ready (device ready)
 *
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.onDeviceReady = function(callback)
{
	document.addEventListener
	(
		"deviceready", 
		function()
		{
			callback('ready');
		}, 
		false
	);
}


/**
 * Cette méthode applique un écouteur d'événements sur l'action menu (menu button)
 *
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.onMenuButton = function(callback)
{
	document.addEventListener
	(
		"menubutton", 
		function()
		{
			callback('menu');
		}, 
		false
	);
}


/**
 * Cette méthode applique un écouteur d'événements sur l'action back (back button)
 *
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.onBackButton = function(callback)
{
	document.addEventListener
	(
		"backbutton", 
		function()
		{
			callback('back');
		}, 
		false
	);
}


/**
 * Cette méthode applique un écouteur d'événements sur l'action search (search button)
 *
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.onSearchButton = function(callback)
{
	document.addEventListener
	(
		"searchbutton", 
		function()
		{
			callback('search');
		}, 
		false
	);
}


/**
 * Cette méthode applique un écouteur d'événements sur l'action volumeDown (volume down button)
 *
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.onVolumeDown = function(callback)
{
	document.addEventListener
	(
		"volumedownbutton", 
		function()
		{
			callback('volumeDown');
		}, 
		false
	);
}


/**
/**
 * Cette méthode applique un écouteur d'événements sur l'action volumeUp (volume up button)
 *
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.onVolumeUp = function(callback)
{
	document.addEventListener
	(
		"volumeupbutton", 
		function()
		{
			callback('onVolumeUp');
		}, 
		false
	);
}


/**
 * Cette méthode applique un écouteur d'événements sur l'action sleep (on sleep | pause)
 *
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.onSleep = function(callback)
{
	document.addEventListener
	(
		"pause", 
		function()
		{
			callback('sleep');
		}, 
		false
	);
}


/**
 * Cette méthode applique un écouteur d'événements sur l'action weakup (on wakeup | resume)
 *
 * @param 	function 	eventType 	Cette function est appelée quand l'événement est déclenché,
 * 									elle prend un paramètre qui le nom de l'événement.
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswEvent.prototype.onWakeup = function(callback)
{
	document.addEventListener
	(
		"resume", 
		function()
		{
			callback('wakeup');
		}, 
		false
	);
}
