/**
 * A Durl is a Data URL.  For example, an image represented as a Base64 URL
 * string.
 */

/**
 * Converts a string to a durl
 * @returns {string}
 */
function DurlOfText( text ){
  return "data:application/txt," + encodeURIComponent(text);
}

function DownloadDurl( name, durl ){
  var link = document.createElement('a');
  link.download = name;
  link.href =  durl;
  link.click();
}

function roundToFives( v ){
  return Math.floor((v + 2.5) / 5) * 5;
}

/**
 * Rounding the pixels to nearest five for hotspot images where the
 * colours vary a bit.
 * @param w
 * @param h
 * @param ctx
 */
function roundPixels( w, h, ctx){
  var pixels = ctx.getImageData(0, 0, w, h);
  var d = pixels.data;
  var i;

  for( i = 0; i < w * h * 4; i += 4 ){
    d[i] = roundToFives(d[i]);
    d[i + 1] = roundToFives(d[i + 1]);
    d[i + 2] = roundToFives(d[i + 2]);
  }
  ctx.putImageData(pixels, 0, 0);
}

/**
 * Takes image that's already loaded, draws it to a ctx, and
 * modifies it and downloads it to a file.
 */
function OnDownloadImage(){
  var src = document.getElementById('globe');
  var canvas = document.createElement("canvas");
  var w = src.width;
  var h = src.height;
  canvas.width = src.width;
  canvas.height = src.height;
  var ctx = canvas.getContext( '2d');
  ctx.drawImage( src, 0, 0 );

  roundPixels( w, h, ctx);

  var data = ctx.canvas.toDataURL("image/png");
  /* Change MIME type to trick the browser to download the file instead of
   displaying it */
  data = data.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');


  DownloadDurl( "file.png", data );
}

function OnUploadImage(){
}
