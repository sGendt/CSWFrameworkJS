/**
 * Cet Helper à pour but de faliciter la gestion des informations réseau
 *
 * Utilise la fonctionnalité navigator.connection, les écouteurs d'événement "online"/"offline"
 * et les constantes:
 * Connection.UNKNOWN
 * Connection.ETHERNET
 * Connection.WIFI
 * Connection.CELL_2G
 * Connection.CELL_3G
 * Connection.CELL_4G
 * Connection.CELL
 * Connection.NONE
 * Il est destiné à l'utilisation pour les technologies mobiles iOS et ANDROID.
 *
 * Cordova & JavaScript
 *
 * @category   CSWFrameworkJS
 * @package    Helper
 * @author     GENDT Sébastien sebastien@gendt.fr
 * @version    0.0.1
 *
 * @param function 	onOnline 	Cette fonction callback est appelé lors de l'acquisition d'une connection réseau
 * @param function 	onOffline  	Cette fonction callback est appelé lors de la perte d'une connection réseau
 *
 * @access public
 * @see Network.prototype.network()
 * @since Class available since Release 0.0.1
 */

function Network(onOnline, onOffline)
{
	this.onOnline = function(){};
	this.onOffline = function(){};

	this.is = false;

	if(typeof onOnline == 'function')
		this.onOnline = onOnline;
	if(typeof onOffline == 'function')
		this.onOffline = onOffline;
}


/**
 * Cette méthode est appelé comme constructeur
 *
 * @access public
 * @see Network.prototype.setListener()
 * @since Method available since Release 0.0.1
 */

Network.prototype.network = function()
{
	this.setListener();
}


/**
 * Cette méthode instancie les écouteurs d'événements pour l'acquisition
 * et la perte de réseau
 *
 * @access public
 * @see Network.prototype.on()
 * @see Network.prototype.off()
 * @since Method available since Release 0.0.1
 */

Network.prototype.setListener = function()
{
	document.addEventListener("online", this.on, false);
	document.addEventListener("offline", this.off, false);
}


/**
 * Cette méthode est appelé lors de l'acquisition d'une connexion réseau,
 * elle mémorise l'état de la connexion dans la variable "is" et
 * exécute la méthode callback défini dans le constructeur
 *
 * @access public
 * @see Network()
 * @since Method available since Release 0.0.1
 */

Network.prototype.on = function()
{
	this.is = true;
	this.onOnline();
}


/**
 * Cette méthode est appelé lors de la perte d'une connexion réseau,
 * elle mémorise l'état de la connexion dans la variable "is" et
 * exécute la méthode callback défini dans le constructeur
 *
 * @access public
 * @see Network()
 * @since Method available since Release 0.0.1
 */

Network.prototype.off = function()
{
	this.is = false;
	this.onOffline();
}


/**
 * Cette méthode est appelé pour obtenir l'état du réseau
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

Network.prototype.has = function()
{
	return Connection.NONE != navigator.connection.type && this.is;
}


/**
 * Cette méthode est appelé pour obtenir le type de connection
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

Network.prototype.get = function()
{
	return navigator.connection.type;
}
