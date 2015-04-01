function onDeviceReady(fct)
{
	if(ENV == 'prod')
		document.addEventListener('deviceready', fct, false);

	if(ENV == 'local')
		fct();
}