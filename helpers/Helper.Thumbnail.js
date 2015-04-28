var Thumbnail = function()
{
    this.canvas = document.createElement('canvas');
    this.context =  this.canvas.getContext('2d');

    this.width = 100;
    this.height = 100;

    this.crop = false;
    //this.bkg = '#000';
    this.bkg = '#fff';

    this.quality = 50;

    this.img =  null;

    this.init();
}


Thumbnail.prototype.init = function(){ /*...*/ }


Thumbnail.prototype.set = function(path)
{
    //var content = document.querySelector('#container');
    for(var i = 0; i < 200; i++)
    {
        this.loadImage
        (
            path,
            path.split('/').reverse()[0]
        );
       /* var img = new Image();
        img.src = path;
        content.appendChild(img);*/
    }
}


Thumbnail.prototype.loadImage =  function(file, name)
{
    var that =  this;
    var img = new Image();
    img.src = file+'?t='+new Date().getTime();

    img.onload = function() 
    {
        that.imagetocanvas
        ( 
            this, 
            that.width, 
            that.height, 
            that.crop, 
            that.bkg, 
            name 
        );

        img.src = '';
    };
}


Thumbnail.prototype.imagetocanvas = function
( 
    img, 
    thumbwidth, 
    thumbheight, 
    crop, 
    background, 
    name 
) 
{

    console.log(img);
    this.canvas.width = thumbwidth;
    this.canvas.height = thumbheight;

    var dimensions = this.resize(img.width, img.height, thumbwidth, thumbheight);

    if (crop) 
    {
      this.canvas.width = dimensions.w;
      this.canvas.height = dimensions.h;
      dimensions.x = 0;
      dimensions.y = 0;
    }
      
    this.context.fillStyle = background;
    this.context.fillRect ( 0, 0, thumbwidth, thumbheight );

    this.context.drawImage
    (
      img, dimensions.x, dimensions.y, dimensions.w, dimensions.h
    );

    this.get(name);
}


Thumbnail.prototype.get = function(name) 
{
    var thumb = new Image();
    var url = this.canvas.toDataURL('image/jpeg', this.quality);
    thumb.src = url;
   /* var thumbname = name.split('.');
    thumbname = thumbname[0] + '_tn.jpg';*/

    var content = document.querySelector('#contimg');
    content.appendChild(thumb);

    /*return 
    {
        'url' : url,
        'name' : thumbname
    };*/
}



Thumbnail.prototype.resize = function(imagewidth, imageheight, thumbwidth, thumbheight) 
{
    var w = 0, h = 0, x = 0, y = 0,
        widthratio  = imagewidth / thumbwidth,
        heightratio = imageheight / thumbheight,
        maxratio    = Math.max(widthratio, heightratio);

    if (maxratio > 1) 
    {
        w = imagewidth / maxratio;
        h = imageheight / maxratio;
    } 
    else 
    {
        w = imagewidth;
        h = imageheight;
    }

    x = ( thumbwidth - w ) / 2;
    y = ( thumbheight - h ) / 2;

    return { w:w, h:h, x:x, y:y };
}