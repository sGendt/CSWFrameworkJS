function Auth()
{

}

Auth.prototype.isLoged = function()
{
    if($('body').attr('data-session').length < 1)
    	return false;

    return true;
    
    //window.location.href = '#/signin';
}

var auth = new Auth();