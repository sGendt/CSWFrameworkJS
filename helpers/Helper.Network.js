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
 * @see CswNetwork.prototype.setListener()
 * @since Class available since Release 0.0.1
 */

function CswNetwork(onOnline, onOffline)
{
	this.onOnline = function(){};
	this.onOffline = function(){};

	this.is = false;

	if(typeof onOnline == 'function')
		this.onOnline = onOnline;
	if(typeof onOffline == 'function')
		this.onOffline = onOffline;

	this.setListener();
}


/**
 * Cette méthode instancie les écouteurs d'événements pour l'acquisition
 * et la perte de réseau
 *
 * @access public
 * @see CswNetwork.prototype.on()
 * @see CswNetwork.prototype.off()
 * @since Method available since Release 0.0.1
 */

CswNetwork.prototype.setListener = function()
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
 * @see CswNetwork()
 * @since Method available since Release 0.0.1
 */

CswNetwork.prototype.on = function()
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
 * @see CswNetwork()
 * @since Method available since Release 0.0.1
 */

CswNetwork.prototype.off = function()
{
	this.is = false;
	this.onOffline();
}


/**
 * Cette méthode est appelé pour obtenir l'état du réseau
 *
 * @return 	boolean 	Retourne true si il existe une connexion réseau
 * 						retourne false si il n'existe pas de connexion réseau
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswNetwork.prototype.has = function()
{
	return Connection.NONE != navigator.connection.type && this.is;
}


/**
 * Cette méthode est appelé pour obtenir le type de connection
 *
 * @return 	string 	Retourne le type de connexion sous la forme d'une chaine de caractères:
 * 					- Unknown
 *					- Ethernet
 *					- WiFi
 *					- Cell
 *					- Cell_2G
 *					- Cell_3G
 *					- Cell_4G
 *					- NONE
 *
 * @access public
 * @since Method available since Release 0.0.1
 */

CswNetwork.prototype.get = function()
{
	return navigator.connection.type;
}
