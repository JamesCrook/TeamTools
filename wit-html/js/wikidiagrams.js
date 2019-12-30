// MDN Pollyfill for startsWith
if( !String.prototype.startsWith ){
  String.prototype.startsWith = function(searchString, position){
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}


// These are constants for drawing stages.
const kStageArrowShaft=1;
const kStageOutlineEarly=3;
const kStageFillAndTextEarly=4;
const kStageOutline=5;
const kStageFillAndText=6;
const kStageArrowHead=9;
const kStageHots=10;


var Annotator = [];

function InitAnnotator(A){
  A.Spec = {}; // the unparsed spec from wiki arrives here.
  A.Status = {};
  A.Status.OldHit = -1;
  A.Status.imagesToCome = 2;
  A.Status.time = 0;
  A.Porthole = {};
  A.Porthole.width = 1024;
  A.Porthole.height = 567;
  A.Porthole.margin = 5;
  A.Image = {};
  A.Image.imageSrc = './images/AudacityAu19.jpg';
  A.Hotspots = {};
  A.Hotspots.imageSrc = './images/AudacityAu19HS.png';
  A.Focus = {};
  A.Focus.radius = 35;
  A.Detail = {};
  A.Detail.width = 400;
  A.Detail.height = 300;
}


function resetHotspots(A){
  A.Hotspots.Colours = [];
  A.Hotspots.count = 0;
  A.Hotspots.autoColour = 0;
  A.Hotspots.colourZoneIx = 0;
  A.Hotspots.colourZones = [];
  // Bogus entry to catch bad tips.  This is Zone 0.
  AddHot(A,"[5,0,0,0]");
}

function resetSceneGraph(A){
}

function startChart(A){
  A.Porthole.width = 700;
  A.Porthole.height = 400;

  A.RootObject = {};
  A.RootObject.type = 'VStack';
  A.RootObject.content = [];
  A.RootObject.itemIndex = 0;
  A.RootObject.objectDict = {};
  A.RootObject.objectList = [];

  A.Hotspots.colourZoneIx = 0;
}

function resizeDivs(A){
  if( !A.BackingCanvas )
    return;
  A.MainDiv.style.width = A.Porthole.width + 'px';
  A.MainDiv.style.height = A.Porthole.height + 'px';
  A.BackingCanvas.width = A.Porthole.width;
  A.BackingCanvas.height = A.Porthole.height;
  A.FocusCanvas.width = A.Porthole.width;
  A.FocusCanvas.height = A.Porthole.height;
  A.DetailDiv.style.width = A.Detail.width + 'px';
  A.DetailDiv.style.height = A.Detail.height + 'px';
  A.Hotspots.canvas.width = A.Porthole.width;
  A.Hotspots.canvas.height = A.Porthole.height;
  A.Hotspots.ctx = A.Hotspots.canvas.getContext('2d');
}

function resizeForImage(A,img){
  //alert( "RESIZING "+img.width +"x"+img.height );
  A.Porthole.width = img.width;
  A.Porthole.height = img.height;
  // resizeDivs();
  if( A.Status.isAppReady ) onChart(A);
}


function populateDomElement(A, contentHere){

  // Used for debugging messages
  Message = document.getElementById("message");
  Message2 = document.getElementById("message2");

  // MainDiv contains all the other divs
  A.MainDiv = document.createElement("div");
  // Backing canvas has the image drawn into it
  A.BackingCanvas = document.createElement("canvas");
  // Focus canvas has the white-out with focus circle
  A.FocusCanvas = document.createElement("canvas");
  // Detail div floats above the white-out
  A.DetailDiv = document.createElement("div");

  contentHere.appendChild(A.MainDiv);
  A.MainDiv.appendChild(A.BackingCanvas);
  A.MainDiv.appendChild(A.FocusCanvas);
  A.MainDiv.appendChild(A.DetailDiv);


  A.TitleDiv = document.createElement("div");
  A.TitleDiv.style.textAlign = "center";
  A.TitleDiv.innerHTML = "<em>No Hotspot Zones Loaded (Yet)</em>";
  A.TableOfHotsDiv = document.createElement("div");
  A.TableOfHotsDiv.style.margin = "5px";
  A.TableOfHotsDiv.style.maxHeight = "400px";
  A.TableOfHotsDiv.style.padding = "5px";
  A.TableOfHotsDiv.style.border = "inset 2px #C3C3C3";
  A.TableOfHotsDiv.style.overflow = "auto";
  A.TableOfHotsDiv.style.textAlign = "left";

  contentHere.appendChild(A.TitleDiv);
  contentHere.appendChild(A.TableOfHotsDiv);

  A.MainDiv.style.position = "relative";
  A.MainDiv.style.display = "inline-block";
  A.MainDiv.style.marginLeft = "auto";
  A.MainDiv.style.marginRight = "auto";
  A.MainDiv.style.overflow = "hidden";

  A.BackingCanvas.style.position = "absolute";
  A.BackingCanvas.style.left = "0px";
  A.BackingCanvas.style.top = "0px";
  A.BackingCanvas.ctx = A.BackingCanvas.getContext('2d');

  A.FocusCanvas.toolkitIndex = A.index;
  A.FocusCanvas.onmousemove = mousemoveOnMap;
  A.FocusCanvas.onmouseout = onMouseOut;
  A.FocusCanvas.onclick = onFocusClicked;

  A.FocusCanvas.style.position = "absolute";
  A.FocusCanvas.style.left = "0px";
  A.FocusCanvas.style.top = "0px";
  A.FocusCanvas.ctx = A.FocusCanvas.getContext('2d');

  A.DetailDiv.innerHTML = "Some Text";
  A.DetailDiv.style.backgroundColor = "rgba(210,210,230,0.9)";
  A.DetailDiv.style.position = "absolute";
  A.DetailDiv.style.left = "0px";
  A.DetailDiv.style.top = "0px";

  A.DetailDiv.style.display = "none";
  //A.DetailDiv.className = "detaildiv";


  A.DetailDiv.style.padding = "20px";
  // so the div is exactly therequested size.
  A.DetailDiv.style.boxSizing =  "border-box";
  A.DetailDiv.style.border = "1px solid rgba(230, 230, 230, 0)";
  A.DetailDiv.style.borderRadius = "5px";
  A.DetailDiv.style.MozBorderRadius = "5px";
  A.DetailDiv.style.textAlign = "left";
  A.DetailDiv.style.margin = "0px";


  // Hotspot canvas and context do not need to be attached.
  A.Hotspots.canvas = document.createElement('canvas');
  A.Backing = {};
  resizeDivs(A);

}

function createDomElements(A){
  var contentHere = document.getElementById("content_here" + A.index);
  populateDomElement( A, contentHere);
}

AddHot = function( A, index){
  AddHotExact( A, index );
  // Extra entry for the rounded (reduced) colour.
  // This idea was introduced to cope with the climate map, where the colour
  // coding varied somewhat.
  // Reduced colour is not needed, provided hotspot image is already
  // reduced.  We've done this now.
  //A.Hotspots.Colours[roundColour(index)] = A.Hotspots.Colours[index];
};

// index is a colour in string format like "[10,10,30,255]".
AddHotExact = function( A, index){
  if( A.Hotspots.Colours.hasOwnProperty(index) ){
    A.Hotspots.Current = A.Hotspots.Colours[index];
    return;
  }
  var actions = {};
  A.Hotspots.toc = A.Hotspots.toc || [];
  A.Hotspots.toc.push( index );
  A.Hotspots.Colours[index] = actions;
  A.Hotspots.Current = actions;
  actions.Zone = A.Hotspots.count++;
};

AddInfo = function( A ){
  // This is the zone for the info tip.
  AddHot(A,"[0,0,5,255]");
};

AddDetail = function( A, text){
  A.Hotspots.Current.Tip = text;
};

AddHover = function( A, text){
  A.Hotspots.Current.Hover = text;
};


// These are for hotspot colours added by a drawn image.
// With a hotspot image, the colours are provided.
// Here the oclours must be auto-generated.
// We try to make a nice palette of colours, moving through different hues
// and then different darkness/lightness, then coming back to very slightly
// different hues.
// There are 3x17=51 easily distinguished colours here, after that it's hard to
function autoColourOfIndex(a){


  // Note that Chrome and other
  // browsers may not preserve the
  // alpha exactly, so we do not use that.

  // a with 24 bits.
  a = a % (65536 * 256);

  // h (hue) on its own gives us 17 distinct colours before it repeats.
  // it doesn't actually repeat at 17, but visually it is almost identical.
  var h = (Math.PI * 57 * 2 / 1023) * a % 1024;
  //a = Math.floor(a/1024);

  var r = Math.floor(127 * Math.cos(h)) + 128;
  h -= Math.PI * 2 / 3;
  var g = Math.floor(127 * Math.cos(h)) + 128;
  h -= Math.PI * 2 / 3;
  var b = Math.floor(127 * Math.cos(h)) + 128;
  h -= Math.PI * 2 / 3;

  // drop the lower 4 bits, since our above cycle is about 16.
  a = a >> 4;
  // Now gray-code the remaining bits
  // Idea of using gray code is to make changes in luminance or in
  // saturation, but not both at the same time.
  a = a ^ (a >> 1);

  // luminance and saturation each grab 3 bits.
  var l = (((a & 2) << 6) + ((a & 8) << 3) + ((a & 32)));
  var s = (((a & 1) << 7) + ((a & 4) << 4) + ((a & 16) << 1)) / 500;

  // saturation is grabbing 4 bits.
  //var s = (a & 15)/19;

  // We've only used about 11 bits, so 2048 colours.

  r = Math.floor(r + (l - r) * s);
  g = Math.floor(g + (l - g) * s);
  b = Math.floor(b + (l - b) * s);

  var index = "[" + r + "," + g + "," + b + ",255]";
  return index;
}

// tell some colours apart.
NextAutoColour = function( A, Tip){
  var a = (A.Hotspots.autoColour++);
  var index = autoColourOfIndex(a);
  var rgb = rgbOfJsonColourTuple(index);
  var actions = A.Hotspots.Colours[index];
  if( actions )
    return rgb;

  AddHotExact( A, index );
  AddDetail( A, Tip );

  A.Hotspots.colourZoneIx++;

  return rgb;
};

function innerDraw(A,obj,d){
  var l = obj.layout;
  if( !l )
    return;

  A.Status.drawing = true;
  var ctx = A.BackingCanvas.ctx;
  var ctx2 = A.Hotspots.ctx;

  ctx.clearRect(l.x0,l.y0,l.xw,l.yh);
  ctx2.clearRect(l.x0,l.y0,l.xw,l.yh);

  // Some hotpspot colours are created as needed.
  A.Hotspots.autoColour = 0;

  var i;
  for(i=0;i<=10;i++){
    d.stage = i;
    drawCells(A, obj, d);
  }

  drawInfoButtonHotspot(A);
  A.Status.drawing = false;
}

function sizeLayoutAndDraw(A, obj, d){
  sizeCells(A, obj, d);
  d.margins = 0;
  layoutCells(A, obj, d);
  innerDraw(A, obj, d);
}

function onChart(A){
  console.log("onChart");
  A.Detail.width = A.Porthole.width / 2 - 10;
  A.Detail.height = Math.min(300, A.Porthole.height - 100);
  resizeDivs(A);
  var d = {};
  var obj = A.RootObject;
  setCellLayout( A,0, 0, A.Porthole.width, A.Porthole.height, obj);
  sizeLayoutAndDraw(A, obj, d);
  A.Status.isAppReady = true;
}

function timerCallback(){

  for(var i=0;i<Annotator.length;i++){
    A = Annotator[i];
    if( A.Status.isFocus )
      continue;
    A.Status.time++;
    // animation stops on America.
    // and dark side of moon.
    if( A.Status.time > 600 )
      continue;
    if( !A.Status.drawing )
      innerDraw(A,A.RootObject,{});
  }
}

function onFailedImage(){
  alert("Image failed to load");
}

function detailPosFromCursorPos(A,x, y){
  var pt = {};
  // get position as somewhere in range -1..+1
  var vx = 2.0 * x / A.Porthole.width - 1;
  var vy = 2.0 * y / A.Porthole.height - 1;

  // Detail panel will be hard right or hard left.
  vx = (vx > 0) ? -1 : 1;

  // Message2.innerHTML = "Vec: ("+vx+","+vy+")";
  pt.x = (vx + 1) * (A.Porthole.width - A.Detail.width) * 0.5;
  pt.y = (vy + 1) * (A.Porthole.height - A.Detail.height) * 0.5;

  return pt;
}

function drawBar(A,T, values, i, ix){
  var vx = values[i][ix];
  var x = T.margin + T.x0 + i * T.xScaler;
  var y = vx * T.yScaler;
  var ctx = A.BackingCanvas.ctx;
  ctx.beginPath();
  ctx.rect(x + (ix - 1) * T.width,
    T.yh - (T.margin + y) + T.y0, T.width, y);
  ctx.fillStyle =
    (ix !== 1) ? "rgba(105,205,105,1.0)" : "rgba(105,105,205,1.0)";
  ctx.fill();
  ctx.stroke();
}

function drawSpot(A,T, values, i, ix){
  var vx = values[i][ix];
  var x = T.margin + T.x0 + i * T.xScaler;
  var y = vx * T.yScaler;
  var ctx = A.BackingCanvas.ctx;
  ctx.beginPath();
  ctx.rect(x + (ix - 1) * T.width,
    T.yh - (T.margin + y) + T.y0, T.width, T.width);
  ctx.fillStyle =
    (ix !== 1) ? "rgba(105,205,105,1.0)" : "rgba(105,105,205,1.0)";
  ctx.fill();
  ctx.stroke();
}

function boxColourOfIndex( i ){
  var colours = ["rgba(105,205,105,1.0)", "rgba(105,105,205,1.0)"];
  if( i<3 )
    return colours[i%2];
  var c = autoColourOfIndex(i-3);
  c = JSON.parse( c );
  c = rgbOfColourTuple(c);
  return c;
}

function drawDonut(A,T, values, i, ix){
  if( ix !== 1)
    return;
  var xw = T.width;
  var x = i * T.xScaler + T.margin + T.x0 + xw / 2;
  var y = T.y0 + T.yh - T.margin - T.width + xw / 2;
  var r = xw / 2;
  var r2 = r * 0.40;
  var t0 = 2.0 * Math.PI * 0.75;
  var t1 = 2.0 * Math.PI * 0.75;

  // get total
  var total = 0;
  var j;
  for( j = 1; j < values[i].length; j++ ) total = total + values[i][j];

  var ctx = A.BackingCanvas.ctx;

  if( T.stage === kStageHots ){
    ctx = A.Hotspots.ctx;
    for( j = 1; j < values[i].length; j++ ){
      var colour = autoColourOfIndex( (j-1) *3 );
      AddHot( A, colour );
      AddDetail( A, T.obj.titles[j] + ": "+(values[i][j] *0.1).toFixed(1)+"%");
    }
  }

  var frac = Math.min(20, A.Status.time) / 20;

  for( j = 1; j < values[i].length; j++ ){
    t0 = t1;
    t1 = t1 + frac * Math.PI * 2 * values[i][j] / total;
    ctx.beginPath();
    ctx.moveTo(x + r2 * Math.cos(t0), y + r2 * Math.sin(t0));
    ctx.lineTo(x + r * Math.cos(t0), y + r * Math.sin(t0));
    ctx.arc(x, y, r, t0, t1, false);
    ctx.lineTo(x + r2 * Math.cos(t1), y + r2 * Math.sin(t1));
    ctx.arc(x, y, r2, t1, t0, true);
    ctx.closePath();
    //ctx.rect(x, y, T.width, T.width);
    ctx.fillStyle = boxColourOfIndex( j*3 );
    ctx.fill();
    ctx.stroke();
  }
}


function drawLabel(A,T, values, i,ix){
  // Only label the x axis items once.
  if( ix > 1 )
    return;
  var ctx = A.BackingCanvas.ctx;
  // The +8 is 0.707 * font height of 11.
  var x = T.margin + T.x0 + i * T.xScaler+(T.width*T.items)*0.5+8;
  var y = T.margin;
  ctx.save();
  ctx.translate(x+ (ix - 1) * T.width, T.yh - (T.margin + y) + T.y0);
  ctx.rotate(-Math.PI / 4);
  ctx.textAlign = "right";
  ctx.font = "15px Arial";
  ctx.fillStyle = "rgba(15,35,165,1.0)";
  ctx.fillText(values[i][0], 0, 0);
  ctx.restore();
}

function clearBacking(A,x0, y0, xw, yh){
  var ctx = A.BackingCanvas.ctx;
  ctx.beginPath();
  ctx.fillStyle = "rgba(205,205,205,1.0)";
  //ctx.strokeStyle = "rgba( 55, 55,155,1.0)";
  ctx.lineWidth = 1;

  ctx.rect(x0, y0, xw, yh);
  ctx.fill();
  //ctx.stroke();
}

function computeSpacing(A, T, x0, y0, xw, yh, values){
  T.x0 = x0;
  T.y0 = y0;
  T.xw = xw;
  T.yh = yh;
  // Count is the number of rows in the table.  One per time.
  // Items is the number of cols in the table.  One per data series.
  T.count = T.count || values.length;
  T.items = T.items || values[0].length;
  // Cols is the number of columns to draw.
  T.cols = T.cols || T.items-1;

  T.margin = 40;
  T.yh += T.margin - 10;
  if( T.width )
    // If width of each item is given, then space between is what's left over
    T.spacer =
      (xw - 2 * T.margin - T.count * T.width * T.cols) / (T.count - 1);
  else {
    // otherwise width of item is determined by spacing between.
    T.spacer = T.spacer || 4;
    T.width = ((xw + T.spacer - 2 * T.margin) / T.count - T.spacer) / T.cols;
  }
  T.xScaler = (T.width * T.cols + T.spacer);

  // yScale so that items grow.
  T.yScaler = (Math.min(20, A.Status.time) / 20) * (yh) / 2000.0;
}

function drawSpacedItems(A,x0, y0, xw, yh, values, T){
  for( j = 0; j < T.items; j++ ){
    for( i = 0; i < T.count; i++ ){
      T.fns[j](A, T, values, i, j);
    }
  }
}


function drawNowt(A,T, values, i,ix){
}
//function drawNowt(A, obj, d){
//}

function makeFunctionTable(T, obj){
  // prepare which functions to call
  T.fns = [];
  for( var j = 0; j < T.items; j++ ){
    var type = obj.subtype[j];
    if( type === "bar" )
      T.fns.push(drawBar);
    else if( type === "label" )
      T.fns.push(drawLabel);
    else if( type === "pie" )
      T.fns.push(drawDonut);
    else if( type === "spot" )
      T.fns.push(drawSpot);
    else
      T.fns.push(drawNowt);
  }
}

function drawChart(A, obj, d){
  if( d.stage !== kStageFillAndText && ( d.stage !== kStageHots ) )
    return;

  //console.log( "draw - "+obj.type);
  var l = obj.layout;
  var x0 = l.x0;
  var y0 = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  var T = {};
  // We can either specify width of the bars, or the spacing between bar groups.
  if( obj.pie ){
    T.spacer = 30;
    T.cols = 1;
  }
  else
    T.width = 8;
  T.stage = d.stage;
  T.obj = obj;// Heck, pass the whole object too...
  if( !obj.values )
    return;
  if( T.stage === kStageFillAndText )
    clearBacking(A,x0, y0, xw, yh);
  computeSpacing(A, T, x0, y0, xw, yh, obj.values);
  makeFunctionTable(T, obj);
  drawSpacedItems(A,x0, y0, xw, yh, obj.values, T);
}

function xyOfIndexSnakey(i, T){
  var row = Math.floor(i / T.n);
  var col = i - row * T.n;
  if( row % 2 ) col = T.n - col - 1;
  var x = T.x0 + col * T.xSpacing;
  var y = T.y0 + row * T.ySpacing;
  if( T.isPath ){
    T.theta = undefined;
    if( i === 0 )
      x -= T.xSpacing *0.75;
    else if( i % T.n === 0 ){
      T.theta = (3 * Math.PI / 2);
      y -= T.ySpacing / 2;
      T.thetaDirection = (row % 2) === 0;
    }
    // whether we extend or reduce depends on odd or even row.
    // but code disabled as we want a snake's head.
    //else if( i === T.maxv - 1 )
    //  x += (1-2*( row % 2 ))*T.xSpacing*0.75;

  }
  return { "x": x, "y": y };
}


// For drawing a snakey plot
function drawSnakeyPath(A, values, T){
  var i = 0;
  var ctx = A.BackingCanvas.ctx;
  var ctx2 = A.Hotspots.ctx;

  // These are concerned with animation - a gradual reveal of the
  // 'stations'.
  // The log heuristic makes us spend a bit
  // longer on very long paths
  var animateTime = 11 * Math.log(values.length + 5);
  var frac = Math.min(animateTime, A.Status.time) / animateTime;
  var maxv = Math.floor(frac * T.count);

  var reserveColoursTo = A.Hotspots.autoColour + T.count;


  var S={};
  var j;
  S.x=0;S.y=0;
  T.isPath = true;
  T.maxv = maxv;
  var nextWidth = 5;
  var nextStyle = "rgba(0,0,0,1.0)";

  if(  T.style === 1){
    nextWidth = 13;
    nextStyle = "rgb(156,3,0)";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0,0,0,1.0)";

  }else if(  T.style ===2)
  {
    nextWidth = 9;
    nextStyle = "rgb(15,0,181)";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0,0,0,1.0)";

  }

  var isHead = false;
  for( j = 0; i < maxv; j += T.stride ){
    if( (T.stride>1) && values[j + 1] === "No Description" ) continue;

    ctx.beginPath();
    ctx.moveTo(S.x, S.y);
    ctx.lineWidth = nextWidth;
    ctx.strokeStyle = nextStyle;

    if(  values[j].startsWith("*")){
      nextWidth = 13;
      nextStyle = "rgb(156,3,0)";
      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgba(0,0,0,0)";

    }else if(  values[j].startsWith("#"))
    {
      nextWidth = 9;
      nextStyle = "rgb(15,0,181)";
      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgba(0,0,0,0)";

    }
    else {
    }
    S = T.fn(i, T);
    if( i === 0 )
      ctx.moveTo(S.x, S.y);
    else if( T.theta !== undefined ){
      ctx.arc(S.x, S.y, T.ySpacing / 2, T.theta, T.theta + Math.PI,
        T.thetaDirection);
      S.y += T.ySpacing / 2;
    }
    else {
      ctx.lineTo(S.x, S.y);
    }
    i++;
    ctx.stroke();

  }
  i = 0;

  T.isPath = false;
  for( j = 0; i < maxv; j += T.stride ){
    var r=T.r0+7;
    if( (T.stride>1) ){
      if( values[j + 1] === "No Description" ) continue;
      r = 1.6 * Math.log((values[j + 1].length) + 0.1) + T.r0;
    }
    S = T.fn(i, T);
    ctx.fillStyle = "rgba(105,205,105,1.0)";
    ctx.strokeStyle = nextStyle;
    isHead = false;
    if( i===(maxv-1) )
    {
      isHead = true;
    }
    else if( values[j+T.stride].startsWith("*")){
      nextStyle = "rgb(156,3,0)";
      isHead = true;
    }
    else if( values[j+T.stride].startsWith("#")){
      nextStyle = "rgb(15,0,181)";
      isHead = true;
    }

    if( isHead ){
      // lighter green for head.
      ctx.fillStyle = "rgb(182,222,157)";
      r+=3;
    }
    ctx.beginPath();
    ctx.arc(S.x, S.y, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    if( isHead){
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx2.beginPath();
    ctx2.arc(S.x, S.y, r, 0, 2 * Math.PI, false);
    ctx2.closePath();
    ctx2.fillStyle =
      NextAutoColour( A, "<h1>" + values[j] + "</h1>" + values[j + 1]);
    ctx2.fill();
    i++;

  }
  A.Hotspots.autoColour = reserveColoursTo;
}

// draws a path inside a box.
function drawPath(A, obj, d, stride){
  if( d.stage != kStageFillAndText )
    return;

  //console.log( "draw - "+obj.type);
  var l = obj.layout;
  var x0 = l.x0;
  var y0 = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  stride = stride || 2;
  var T = {};
  //T.width = 100;
  //T.spacer = 30;
  T.items = 1;
  T.count = 0;
  T.width = 15;
  T.stride = stride;
  if( T.stride == 1){
    T.count = obj.values.length;
  } else for( let i = 0; i < obj.values.length; i += T.stride ){
    if( obj.values[i + 1] !== "No Description" ) T.count++;
  }
  T.margin = 9;
  T.factor = 1.1;// increase density along snake.
  xw -= 2*T.margin+T.width;
  yh -= 2*T.margin+T.width;
  // The sqrt is so that we get the same density in x and y.
  T.n = Math.ceil(Math.sqrt(T.count * T.factor * xw / yh))+1;
  T.m = Math.ceil(T.count / T.n);

  var unused = T.n * T.m - T.count;
  // Make more square, if there is room.
  if( T.n < T.m )
    T.m -= Math.floor(unused / T.n);
  else
    T.n -= Math.floor(unused / T.m);

  //T.spacer = (xw-2* T.margin)/ (T.n-1);
  T.r0 = obj.baseSize || 0;
  T.x0 = x0 + T.margin + T.width / 2;
  T.y0 = y0 + T.margin + T.width / 2;
  T.xSpacing = xw / ((T.n-1)||1);
  T.ySpacing = yh / ((T.m-1)||1);

  T.fn = xyOfIndexSnakey;
  T.style = obj.style || 0;
  drawSnakeyPath(A,obj.values, T);
}

function drawTree(A, obj, d){
  //console.log( "draw - "+obj.type);
  drawPath(A, obj, d, 1);
}



// slice is a number from -1 to +1.
// source is a number from 0 to 1.
function sourceForSlice(slice){
  return Math.acos(-slice) / Math.PI;
}

function drawSphere(A,xx, yy, xw, yh, ctx, obj){
  xw = Math.floor(xw);
  yh = Math.floor(yh);
  //console.log( "Draw at "+xx+","+yy+" ["+xw+" by "+yh+"]");
  var ctx2 = obj.ctx;
  var img = obj.img;
  //console.log( "From image "+img.width+" by "+img.height);
  if( !ctx2 || (obj.canvas.width !== img.width) || (obj.canvas.height !== img.height)){
    obj.canvas = document.createElement("canvas");
    obj.canvas.width = img.width;
    obj.canvas.height = img.height;
    obj.ctx = obj.canvas.getContext('2d');
    ctx2 = obj.ctx;
  }
  ctx2.clearRect( 0, 0, img.width, img.height);
  ctx2.drawImage(img, 0, 0, img.width, img.height);
  var x0 = xw / 2;
  var rotate = img.width - ((A.Status.time * 3) % img.width);

  var offsets = obj.offsets || [];
  if( offsets.length !== img.width ){
    offsets = [];
    for( i = 0; i < img.width; i++ ){
      d =
        Math.floor(Math.asin(i / img.width) * (img.width) / (2 * Math.PI)) * 4;
      offsets.push(d);
    }
    obj.offsets = offsets;
  }

  var w = Math.floor(xw / 2);
  var h1 = Math.floor(yh / 2);
  var h = Math.min(h1, w);

  var srcData = ctx2.getImageData(0, 0, img.width, img.height);
  //var dstData = ctx.createImageData( h*2,h*2) ;

  var dstData = ctx.getImageData(xx + (w - h), yy + (h1 - h), h * 2, h * 2);

  var adjustedOffsets = [];
  var frac = Math.max(0, Math.min(40, A.Status.time - 120)) / 40;

  if( frac === 1 ) adjustedOffsets = offsets; else for( var i = 0;
                                                        i < img.width; i++ ){
    // 2*Math.PI would match the centre of the sphere exactly.
    // slightly less to match away from equator.
    // That way Africa bulges as the distortion happens.
    var p = i / (1.4 * Math.PI);
    adjustedOffsets.push(4 * Math.floor(p + frac * (offsets[i] / 4 - p)));
  }

  for( var y = -h; y < h; y++ ){
    var dx = Math.floor(Math.sqrt(h * h - y * y));
    var srcLine = Math.floor(sourceForSlice(y / h) * img.height);
    var srcBase = (srcLine * img.width + rotate) * 4;
    dx = h + frac * (dx - h);
    var index = Math.floor((y + h) * h * 2 + h - dx) * 4;
    var rescaler = (img.width - 1) / dx;
    var srcIndex;
    var offset;
    var src = srcData.data;
    var dst = dstData.data;
    //console.log( 'row:'+y+' ('+(h-dx)+'..'+(h+dx)+')');
    for( var x = -dx; x < dx; x++ ){
      // This inner loop has had a little TLC for speed.
      // Taking 25% of CPU to 15% by taking calculations
      // outside the loop.
      offset = adjustedOffsets[Math.floor(Math.abs(x) * rescaler)];
      if( x < 0 ) srcIndex = srcBase - offset; else srcIndex = srcBase + offset;

      if( src[srcIndex + 3] < 128 ){
        dst[index++] = 10;
        dst[index++] = 10;
        dst[index++] = 110;
        dst[index++] = 180;
      } else {
        dst[index++] = src[srcIndex++];
        dst[index++] = src[srcIndex++];
        dst[index++] = src[srcIndex++];
        dst[index++] = src[srcIndex++];
      }
    }
  }
  //ctx.clearRect(xx,yy,xw,yh);
  ctx.putImageData(dstData, xx + (w - h), yy + (h1 - h));
}

function drawRoundRect(ctx, x, y, w, h, r){
  if( w < 0 ) return;
  if( h < 0 ) return;
  if( w < 2 * r ) r = w / 2;
  if( h < 2 * r ) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function setStyles(ctx, obj){
  ctx.lineWidth = 3;
  ctx.font = "16px Arial";
  ctx.globalCompositeOperation = 'source-over';

  if( obj.colour ) ctx.fillStyle = obj.colour; else ctx.fillStyle =
    "rgba(255,255,255,1.0)";

  if( obj.bcolour ) ctx.strokeStyle = obj.bcolour; else ctx.strokeStyle =
    "rgba( 55, 55,155,1.0)";
}

function drawArrow(A,obj1, obj2){
  var ctx = A.BackingCanvas.ctx;
  var x1 = obj1.layout.x0 + obj1.layout.xw / 2;
  var x2 = obj2.layout.x0 + obj2.layout.xw / 2;
  var y1 = obj1.layout.y0 + obj1.layout.yh / 2;
  var y2 = obj2.layout.y0 + obj2.layout.yh / 2;
  ctx.beginPath();
  ctx.strokeStyle = "rgba(0,0,0,1.0)";
  ctx.lineWidth = 3;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawArrowHead(A,obj1, obj2){
  var ctx = A.BackingCanvas.ctx;
  var x1 = obj1.layout.x0 + obj1.layout.xw / 2;
  var x2 = obj2.layout.x0 + obj2.layout.xw / 2;
  var y1 = obj1.layout.y0 + obj1.layout.yh / 2;
  var y2 = obj2.layout.y0 + obj2.layout.yh / 2;
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,0,0,1.0)";
  ctx.lineWidth = 1;
  var vx = x1 - x2;
  var vy = y1 - y2;
  var theta = -Math.atan2(vx, vy) - Math.PI / 2;
  var m = 0;
  if( obj2.type === "Circle" ){
    var r = Math.min(obj2.layout.yh, obj2.layout.xw) / 2;
    m = 0.93 * r / Math.sqrt(vx * vx + vy * vy);
  } else {
    m = 1;//0.5;

    if( Math.abs(vx) * obj2.layout.yh > Math.abs(vy) * obj2.layout.xw ) m =
      obj2.layout.xw / (2 * Math.abs(vx)); else m =
      obj2.layout.yh / (2 * Math.abs(vy));
    m = m * 0.93;

  }
  x2 = x2 + m * vx;
  y2 = y2 + m * vy;

  ctx.save();
  ctx.translate(x2, y2);
  ctx.rotate(theta);
  ctx.moveTo(-11, -5);
  ctx.lineTo(0, 0);
  ctx.lineTo(-11, 5);
  ctx.lineTo(-7, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawImage(A, obj, d){
  //console.log( "draw - "+obj.type);
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  var ctx = A.BackingCanvas.ctx;
  var ctx2 = A.Hotspots.ctx;
  if( obj.status !== "arrived" ){
    drawRectangle(A, obj, d);
    return;
  }


  if( obj.spherical ){
    if( d.stage === kStageFillAndText )
      drawSphere(A, x, y, xw, yh, ctx, obj);
    if( d.stage === kStageHots )
      drawSphere(A, x, y, xw, yh, ctx2, obj.hot);
    return;
  }


  if( obj.stretch === "yes" ){
    // rescaled to fit, aspect ratio ignored.
  } else if( obj.stretch === "no" ){
    // ToDo: crop or center.
  } else {
    // obj.stretch undefined or "preserve-aspect"
    // Logic to rescale image to fit, preserving
    // aspect ratio and placing centrally.
    if( obj.img.width * yh < obj.img.height * xw ){
      // shift image left to centre.
      x += xw * 0.5;
      // rescale x
      xw = obj.img.width * yh / obj.img.height;
      // shift image mid back to mid
      x -= xw * 0.5;
    } else {
      // shift image top to y centre line
      y += yh * 0.5;
      // rescale y
      yh = obj.img.height * xw / obj.img.width;
      // shift image mid back to y centre line
      y -= yh * 0.5;
    }
  }
  if( d.stage === kStageFillAndText )
    ctx.drawImage(obj.img, x, y, xw, yh);

  if( d.stage === kStageHots )
    if( obj.hot && obj.hot.status === "arrived" )
      ctx2.drawImage(obj.hot.img, x, y, xw, yh);
}

function drawRectangle(A, obj, d){
  //console.log( "draw - "+obj.type);
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;
  var stage = d.stage;

  // -- Extra twiddles for chooser
  // The unchosen tabs are drawn early, so that they get overlapped.
  if( obj.drawEarly && (stage<9) ){
    stage += 2;
  }
  // Text position unchanged even if we expand the rectangle.
  xwText = xw;
  yhText = yh;
  // All the chooser rectangles are expanded, so that they will overlap.
  if( obj.drawExtra ){
    // The direction to expand in is currently a hack, based on size.
    // fixme drawExtra should tell us which direction to expand in.
    if( yh < 50 ){
      yh+=10;
    }
    else {
      xw+=10;
    }
  }
  // A chosen main rectangle has this style, to meld with the chooser rectangle.
  if( obj.style === "chosen" ){
    obj.colour       = "rgb(255,250,235)";
    obj.bcolour      = "rgb(145,125,0)";
    obj.cornerRadius = 8;
  }
  // -- End of extra twiddles for chooser.

  var ctx = A.BackingCanvas.ctx;

  if( (stage===kStageOutline) || (stage===kStageFillAndText) ){
    ctx.save();
    ctx.beginPath();

    setStyles(ctx, obj);
    if( obj.cornerRadius )
      drawRoundRect(ctx, x, y, xw, yh, obj.cornerRadius);
    else
      ctx.rect(x, y, xw, yh);

    if( stage===kStageOutline){
      ctx.stroke();
    }

    if( stage===kStageFillAndText){
      ctx.fill();
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(0,0,0,1.0)";
      ctx.fillText(obj.value, x + xwText / 2, y + yhText / 2 + 6);
    }
    ctx.restore();
  }

  if( (stage===kStageHots) && obj.hotspotColour ){
    var ctx2 = A.Hotspots.ctx;
    ctx2.beginPath();
    ctx2.rect(x, y, xw, yh);
    ctx2.fillStyle = obj.hotspotColour;
    ctx2.fill();
  }
}


function drawCircle(A, obj, d){
  //console.log( "draw - "+obj.type);
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  var r = Math.min(xw, yh) / 2;
  if( r < 0 )
    return;

  var ctx = A.BackingCanvas.ctx;
  ctx.lineWidth = 3;
  ctx.font = "16px Arial";
  ctx.globalCompositeOperation = 'source-over';


  if( (d.stage===kStageOutline) || (d.stage===kStageFillAndText) ){
    ctx.save();
    ctx.beginPath();
    setStyles(ctx, obj);

    ctx.arc(x + xw / 2, y + yh / 2, r, 0, Math.PI * 2.0, true);
    if( d.stage===kStageOutline){
      ctx.stroke();
    }

    if( d.stage===kStageFillAndText){
      ctx.fill();
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(0,0,0,1.0)";
      ctx.fillText(obj.value, x + xw / 2, y + yh / 2 + 6);
    }
    ctx.restore();
  }
  if( (d.stage===kStageHots ) && obj.hotspotColour ){
    var ctx2 = A.Hotspots.ctx;
    ctx2.beginPath();
    ctx2.arc(x + xw / 2, y + yh / 2, r, 0, Math.PI * 2.0, true);
    ctx2.fillStyle = obj.hotspotColour;
    ctx2.fill();
  }
}

function drawInfoButtonHotspot(A){
  var xw = 25;
  var yh = 25;
  var x = 5;
  var y = 5;
  var ctx2 = A.Hotspots.ctx;
  ctx2.lineWidth = 0;
  ctx2.beginPath();
  ctx2.fillStyle = "rgba(0,0,5,1.0)";
  //ctx2.rect(x, y, xw, yh);
  ctx2.arc(x + xw / 2, y + yh / 2, xw / 2, 0, Math.PI * 2.0, true);
  ctx2.fill();
}

function objFromId(A,id){
  if( !isDefined(id) ) return id;
  return A.RootObject.objectDict[id.substr(0, 10)];
}

function drawArrows(A,obj,d){
  var arrows = obj.content;
  if( !isDefined(arrows) ) return;
  if( !Array.isArray( arrows) ) return;
  if( (d.stage !== kStageArrowShaft ) && (d.stage !== kStageArrowHead ) )
    return;

  for( i = 0; i < arrows.length; i += 2 ){
    var obj1 = objFromId(A,arrows[i]);
    var obj2 = objFromId(A,arrows[i + 1]);
    if( !isDefined(obj1) || !isDefined(obj2) ) return;
    if( !isDefined(obj1.layout) || !isDefined(obj2.layout) ) continue;
    if( d.stage === kStageArrowShaft )
      drawArrow(A,obj1,obj2);
    if( d.stage === kStageArrowHead )
      drawArrowHead(A,obj1,obj2);
  }
}

function drawInfoButton(A){
  var xw = 25;
  var yh = 25;
  var x = 5;
  var y = 5;
  var ctx = A.FocusCanvas.ctx;
  ctx.lineWidth = 3;
  ctx.font = "20px Times New Roman";
  ctx.strokeStyle = "rgba( 55, 55,155,1.0)";
  ctx.globalCompositeOperation = 'source-over';

  ctx.beginPath();
  ctx.fillStyle = "rgba(255,255,255,1.0)";

  ctx.arc(x + xw / 2, y + yh / 2, xw / 2, 0, Math.PI * 2.0, true);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(0,0,0,1.0)";
  ctx.fillText("i", x + 9, y + 19);
}

function drawFocusSpot(A,x, y){

  var ctx = A.FocusCanvas.ctx;

  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, A.Porthole.width, A.Porthole.height);

  var m = A.Porthole.margin;
  ctx.fillStyle = "rgba( 5,5,5,0.2)";

  ctx.beginPath();
  ctx.arc(x, y, A.Focus.radius+15, 0, Math.PI * 2.0, true);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(0,255,255,1.0)";
  ctx.globalCompositeOperation = 'destination-out';

  ctx.beginPath();
  ctx.arc(x, y, A.Focus.radius, 0, Math.PI * 2.0, true);
  ctx.closePath();
  ctx.fill();
}


function drawHotShape(ix, action, c){
  var A = Annotator[ ix ];


  var ctx = A.FocusCanvas.ctx;

  var w = A.Porthole.width;
  var h = A.Porthole.height;

  if( !A.Hotspots.ctx ) return -1;

  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, A.Porthole.width, A.Porthole.height);

  if( action === "clear" ){
    A.Hotspots.lastHot = action;
    return;
  }

  var drawAll = action === "drawAll";

  var colourString;
  if( drawAll )
    colourString = "all";
  else
    colourString = rgbOfColourTuple(c);

  // We'll cache the picked-out shape.
  if( A.Hotspots.lastHot !== colourString ){
    var pixels = A.Hotspots.ctx.getImageData(0, 0, w, h);
    var d = pixels.data;
    for( var i = 0; i < w * h * 4; i += 4 ){
      if( drawAll  && d[i+3]<50){
        d[i]=255;
        d[i+1]=255;
        d[i+2]=255;
        d[i + 3] = 200;
      }
      else if( drawAll ){
        d[i + 3] = 230;
      }
      else if( d[i] === c[0] && d[i + 1] === c[1] && d[i + 2] === c[2] &&
        d[i + 3] === c[3] ){
        d[i] = c[0];
        d[i + 1] = c[1];
        d[i + 2] = c[2];
        d[i + 3] = 200; // faded slightly so we can see the image too.
      } else {
        d[i]=255;
        d[i+1]=255;
        d[i+2]=255;
        d[i + 3] = 200;      }
    }
    A.Hotspots.lastHot = colourString;
    A.Hotspots.pixels = pixels;
  }

  ctx.putImageData( A.Hotspots.pixels, 0, 0);
}


//------------------ Some colour utilities...
function roundColour(tuple){
  var values = JSON.parse(tuple);
  var result = values.map(function(v){
    return Math.floor((v + 2.5) / 5) * 5;
  });
  return '[' + result.toString() + ']';
}

function stringOfTuple( v ){
  return "[" + v[0] + "," + v[1] + "," + v[2] + "," + v[3] + "]";
}

function rgbOfColourTuple( v ){
  return "rgba(" + v[0] + "," + v[1] + "," + v[2] + "," + v[3] + ")";
}

function colourTupleOfJsonString(string){
  return JSON.parse(string);
}

function rgbOfJsonColourTuple(tuple){
  var tuple2 = JSON.parse(tuple);
  return rgbOfColourTuple( tuple2 );
}

function textColourForColourTuple( c ){
  return ((c[0]+c[1]+c[2])>380) ? 'black':'white';
}

function colourTupleOfRgb( rgb ){
  var t = rgb.split( "(" )[1]||"0,0,0";
  t = t.split(")")[0];
  t = t.split(",");
  t = t.map( Number );
  return t;
}

function textColourForRgb( rgb ){
  var c = colourTupleOfRgb( rgb );
  return textColourForColourTuple( c );
}
//----------- end of colour utilities.


/*
 * When we exit the annotation area,
 * remove the decorations (the extra focus ring and the detail div).
 */
function onMouseOut(e){
  var index = e.target.toolkitIndex;
  var A = Annotator[index];
  A.Status.isFocus = false;
  if( !A.Status.isAppReady ) return;
  if( e.shiftKey ) return;
  var ctx = A.FocusCanvas.ctx;
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, A.Porthole.width, A.Porthole.height);
  A.DetailDiv.style.display = "none";
  A.Status.OldHit = -1;
}

function actionsFromCursorPos(A,x,y){

  if( !A.Hotspots.ctx ) return -1;
  var pixel = A.Hotspots.ctx.getImageData(x, y, 1, 1).data;
  var result = "[" + pixel[0] + "," + pixel[1] + "," + pixel[2] + "," +
    pixel[3] + "]";
  var actions = A.Hotspots.Colours[result] ||
    // Testing with a reduced colour is no longer needed.
    /* A.Hotspots.Colours[roundColour(result)] || */
    Nozone;
  if( Message2 ) Message2.innerHTML =
    "Colour &amp; Zone: rgba" + result + ", Zone " + actions.Zone;
  return actions;
}

function setNewImage(A,url){

  // Only supported for whole-div images.
  if( (A.RootObject.content.length === 1) &&
    (A.RootObject.content[0].type === "Image") ){
    var obj = A.RootObject.content[0];
    obj.file = url;
    obj.img.crossOrigin = "anonymous";
    obj.img.src = obj.file;
  }

}

function doAction(A,action){
  if( action.Action === "Spec" ){
    requestSpec( A, action.Name, A.fromWiki, action.Section);
  } else if( action.Action === "DoSpec" ){
    requestSpec( A, action.Name, A.fromWiki, action.Section, addNewDetails);
  }
  else if( action.Action === "Image" ) {
    setNewImage( A, action.Name);
  } else if( action.Action === "Goto" ){
    window.location.href = action.Name;
  }
}

function mousemoveOnMap(e){
  var index = e.target.toolkitIndex;
  var A = Annotator[index];
  if( e.shiftKey ) return;

  if( !A.Status.isAppReady ) return;
  A.Status.isFocus = true;


  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  var coordinates = "Coordinates: (" + x + "," + y + ")";

  var pt = detailPosFromCursorPos(A, x, y);

  drawFocusSpot(A,x, y);
  drawInfoButton(A);
  var actions = actionsFromCursorPos(A, x, y);
  if( Message ) Message.innerHTML = coordinates;
  A.DetailDiv.style.left = pt.x + "px";
  A.DetailDiv.style.top = pt.y + "px";
  if( A.Status.OldHit !== actions.Zone ){
    A.Status.OldHit = actions.Zone;

    // Update the detail div
    A.DetailDiv.style.display = (actions.Tip) ? "block" : "none";
    if( actions.Tip ){
      A.DetailDiv.innerHTML = actions.Tip;
    }
    // Do any additional hover action
    if( actions.Hover ){
      doAction(A, actions.Hover);
    }
    e.target.style.cursor = actions.Click ? 'pointer' : 'auto';
  }
}

function onFocusClicked(e){
  if( e.shiftKey ) return;
  var index = e.target.toolkitIndex;
  var A = Annotator[index];

  if( !A.Status.isAppReady ) return;

  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  var actions = actionsFromCursorPos(A,x, y, "log");
  if( actions.Click ){
    doAction(A, actions.Click);
  }
}


function updateImages(A){
  if( !A.BackingCanvas )
    return;
/*
  if( (A.RootObject.content.length === 1) &&
    (A.RootObject.content[0].type === "Image") ){
    var obj = A.RootObject.content[0];
    if( obj.file ){
      obj.img.crossOrigin = "anonymous";
      obj.img.src = obj.file;
    }
    if( obj.hot && obj.hot.file ){
      obj.hot.img.crossOrigin = "anonymous";
      obj.hot.img.src = obj.hot.file;
    }
  }

 */
  onChart(A);
}

function fooo( ix, c ){
  var A = Annotator[ ix ];
  drawHotShape(A,c);
}

function makeToc(A){
  var h = A.Hotspots;
  if( !h || !h.toc)
    return "NO HOTSPOT COLOURS";
  var str = "<table>";
  for(var i=1;i<h.toc.length;i++){
    var c = h.toc[i];
    if( !c )
      continue;
    //var strc = stringOfTuple(c);
    var item = h.Colours[c];
    if( !item )
      continue;
    var tip = item.Tip;
    if( !tip )
      continue;
    // White text for numbers on dark backgrounds, black when light.
    var c2 = colourTupleOfJsonString(c);
    var clicker = "onmouseover='drawHotShape("+A.index+",\"draw\","+c+")'" +
      " onmouseout='drawHotShape("+A.index+",\"clear\")'";
    var textColor = textColourForColourTuple(c2);
    str += "<tr><td style='vertical-align:top;padding-top:28px'>" +
      "<div style='width:30px;height:30px;color:" + textColor +
      ";border:thin solid black;text-align:center;vertical-align:middle;" +
      "line-height:30px;background-color:" + rgbOfColourTuple(c2) + "' "+clicker+">" + (i-1) +
      "</div></td><td>" + tip + "</td></tr>";
  }
  str += "</table>";
  return str;
}

function setToc( A,text ){
  var div = A.TableOfHotsDiv;//.getElementById("tabular_contents"+A.index);
  if( !div )
    return;
  div.innerHTML = text;

  div.style.display = A.TocShown ? 'block':'none';
  var toggler = document.getElementById("zoneToggler"+A.index);
  if( !toggler)
    return;
  toggler.innerHTML=A.TocShown ?"-zones":"+zones";

}

function toggleDetailsInToc(index){
  var A = Annotator[index];
  var date = new Date();
  var nMillis = date.getTime();
  var contents = makeToc(A);
  A.TocShown = !(A.TocShown || false);
  var clicker = "onmouseover='drawHotShape("+A.index+",\"drawAll\")'" +
    " onmouseout='drawHotShape("+A.index+",\"clear\")' ";

  var text ="<div " + clicker +
    "style='float:left;width:30px;height:30px;margin:5px;text-align:center;vertical-align:middle;line-height:30px;color:white;border:1px solid;border-color: #000000;background:repeating-linear-gradient(-45deg,#d68252,#9c43ad,#326489,#32852f 33%)'>All</div><h3>Zones</h3>Hover over coloured boxes in this list to see the zones in the image highlighted.  The stripy box above highlights all zones<br clear='all'><hr>"+contents;
  setToc( A, text );
  return false;
}

function setATitle(A,caption, page, fromWiki){
  A.TocShown = false;
  A.Caption = {};
  A.Caption.text = caption;
  A.Caption.page = page;
  A.Caption.fromWiki = fromWiki;

  var atitle = A.TitleDiv;//.getElementById("atitle"+A.index);
  if( !atitle )
    return;
  var str = "<em>" + caption + "</em>";
  if( page ){

    if( isFromServer() === "no" )
    {
      str +=
        " &nbsp; [ <a target='editor' href='./edit.htm?page0=" +
        page + "&action=edit'>edit</a> ]"
    } else  if( fromWiki !== 'yes' ){
      str +=
        " &nbsp; [ <a" +
        " href='https://wit.audacityteam.org/edit.htm?page0=" +
        page + "&action=edit'>edit</a> ]";
    }

    else {
      str +=
        " &nbsp; [ <a href='https://wiki.audacityteam.org/w/index.php?title=Toolbox/" +
        page + "&action=edit'>edit</a> ]";
    }

  }

  if( A.Hotspots.toc && A.Hotspots.toc.length > 0)
    str +=
      " &nbsp; [ <a href='#zonelist' id='zoneToggler" + A.index +
      "' onclick='toggleDetailsInToc("+A.index+")'>+zones</a> ]";
  atitle.innerHTML = sanitiseHtml(str);
}

// finds field value to first ; or </pre>
function fieldValue(field, line){
  var value;
  var sepIndex;
  var sep = ";";
  if( field.charAt( 0 ) === field.charAt(0).toUpperCase() ){
    value = line.split(field + "=")[1] || "";
    value = value.split("</pre>")[0];
    sepIndex = value.indexOf(sep);
  }
  else {
    sep = '\n';
    value = line.split(field + ":")[1] || "";
    value = value.split("</pre>")[0];
    sepIndex = value.indexOf(sep);
  }

  var lineEndIndex = value.indexOf('\n');

  // command ends at </pre> or at ;.
  // Only use a ; as the end, if it is on the same line.
  if( (lineEndIndex === -1 ) || ( sepIndex <= lineEndIndex))
    value = value.split(sep)[0];

  return value;
}

function setSection( A, section ){
  var h = A.Hotspots.Current.Click || {};
  h.Section = JSON.parse(section)+1;
  A.Hotspots.Current.Click = h;
}

function setHover(A,type, location){

  var h = A.Hotspots.Current.Hover || {};
  h.Action = type;
  h.Name = location;
  A.Hotspots.Current.Hover = h;
}

function setClick(A,type, location){

  var h = A.Hotspots.Current.Click || {};
  h.Action = type;
  // ignore after '#'
  h.Name = (location + "#").split("#")[0];
  var num = location.split("#")[1]||"0";
  num = Number( num );
  h.Section = num+1;
  A.Hotspots.Current.Click = h;
}

function fixHyperlinks(text){
  text = text.split("[http");
  var result = text[0];
  text[0] = "";
  text.forEach(function(item){
    if( item ){
      item = item.replace(" ", "'>");
      item = item.replace("]", "</a>");
      result += "<a href='http" + item;
    }

  });
  return result;
}

function sanitiseHtml(html){
  html = fixHyperlinks(html);
  // Whitelist all relevant tags.
  return html;
}

function drawContainer(A, obj, d){
  //console.log( "draw container - "+obj.type);
  var n = obj.content.length;
  for( var i = 0; i < n; i++ ) drawCells(A,obj.content[i], d);
}


function sizeCell(A, obj, d){
  //console.log( "size cell - "+obj.type);
  obj.sizing = {};
  obj.sizing.min = 0;
  obj.sizing.wants = obj.sizeAs || 1.0;
  obj.sizing.cumulativeWants = 0.0;
}

function sizeContainer(A, obj, d){
  //console.log( "size container - "+obj.type);
  var n = 0;
  if( obj.content && Array.isArray(obj.content) ) n = obj.content.length;
  sizeCell(A, obj, d);
  for( var i = 0; i < n; i++ ){
    var o2 = obj.content[i];
    sizeCells(A, o2, d);
    obj.sizing.min += o2.sizing.min;
    obj.sizing.cumulativeWants += o2.sizing.wants;
  }
}

function setCellLayout(A, x0, y0, xw, yh, obj){
  obj.layout = { "x0": x0, "y0": y0, "xw": xw, "yh": yh };
  //console.log( obj.layout );
}


function layoutMargined(A, obj, d){
  //console.log( "layout - "+obj.type);
  var m = d.margins;
  var l = obj.layout;
  setCellLayout(A, l.x0 + m, l.y0 + m, l.xw - 2 * m, l.yh - 2 * m, obj, d);
}

function layoutUnmargined(A, obj, d){
  //console.log( "layout - "+obj.type);
  var m = 0;
  var l = obj.layout;
  setCellLayout(A, l.x0 + m, l.y0 + m, l.xw - 2 * m, l.yh - 2 * m, obj, d);
}

function layoutContainer( A, obj, d){
  //console.log( "layout - "+obj.type);
  var n = obj.content.length;
  var l = obj.layout;
  var k = obj.sizing.cumulativeWants;
  //console.log( "n: "+n+", k:"+k);
  var wantsSoFar = 0.0;
  for( var i = 0; i < n; i++ ){
    var want = obj.content[i].sizing.wants;
    switch( obj.type ){
      case "HStack":
        setCellLayout(A, l.x0 + (wantsSoFar / k) * l.xw, l.y0,
          l.xw * (want / k), l.yh, obj.content[i]);
        break;
      case "VStack":
        setCellLayout(A, l.x0, l.y0 + (wantsSoFar / k) * l.yh,
          l.xw,l.yh * (want / k), obj.content[i]);
        break;
      case "Overlay":
        setCellLayout(A, l.x0, l.y0, l.xw, l.yh, obj.content[i]);
        break;
      default:
    }
    layoutCells( A, obj.content[i], d );
    wantsSoFar += want;
  }
}

function createProg( A, obj, data ){
  if( !obj.code )
    return;
  var activeObject;
  var code = obj.code;
  for(i=0;i<=code.length;){
    var command = code[i++];
    if( command === "selectCredits" ){
    }
    else if( command === "setCaption" ){
      setATitle(A, code[i++], A.page, A.fromWiki);
    }
    else if( command === "setCreditsTip" ){
      // Reserve a colour for the info button.
      AddInfo(A);
      AddDetail( A, code[i++] );
    }
    else if( command === "chooseItem" ){
      activeObject = getObjectByName(A, code[i++]);
    }
    else if( command === "setTip" ){
      activeObject.tip = code[i++];
    }
  }
}

function sizeSpacer( A, obj, data ){
  sizeCell(A, obj, data );
  obj.sizing.wants = obj.value;
}

function sizeNowt( A, obj, data ){
  sizeCell( A, obj, data );
  obj.sizing.wants = 0;
}

function layoutNowt( A, obj, data ){
}



function mayRegisterClickAction( A, obj ){
  // setClick uses the 'Hotspots.Current.Click' object.
  if( obj.hasOwnProperty( "clickDo" )){
    setClick( A, obj.clickDo[0], obj.clickDo[1] );
  }
}

function mayRequestImage( A, obj ){
  if( !obj.src )
    return;
  if( obj.type !== "Image" )
    return;

  obj.status = "asked";
  obj.file = obj.src;
  obj.content = [];
  obj.img = document.createElement("img");
  obj.img.onload = (function(){
    var obj1 = obj;
    return function(){
      obj1.status = "arrived";
      console.log(obj1.file + " image arrived");
      // May need to layout and draw when image arrives.
      if( obj1.resize ) resizeForImage(A,
        obj1.img); else if( A.Status.isAppReady ) onChart(A);
    }
  })();
  obj.img.onerror = (function(){
    var obj1 = obj;
    return function(){
      obj1.status = "failed";
      alert("Failed to load image " + obj1.file);
    }
  })();
  obj.img.crossOrigin = "anonymous";
  obj.img.src = obj.src;
}

function mayRequestHotImage( A, obj ){
  if( !obj.hotsrc ) return;
  if( obj.type !== "Image" ) return;
  obj.hot = {};
  obj.hot.status = "asked";
  obj.hot.file = obj.hotsrc;
  obj.hot.img = document.createElement("img");
  obj.hot.img.onload = (function(){
    var obj1 = obj;
    return function(){
      obj1.hot.status = "arrived";
      console.log(obj1.file + " HS arrived");
      if( A.Status.isAppReady ) drawCells(A, A.RootObject, {});
    }
  })();
  obj.hot.img.onerror = (function(){
    var obj1 = obj;
    return function(){
      obj1.status = "failed";
      alert("Failed to load hotspots " + obj1.hot.file);
    }
  })();
  obj.hot.img.crossOrigin = "anonymous";
  obj.hot.img.src = obj.hotsrc;
}


function createCell(A, obj, d){

  var detail;
  var c;
  // NextAutoColour sets up the 'Hotspots.Current.Click' object.
  if( obj.hasOwnProperty('tip') ){
    detail = sanitiseHtml(obj.tip);
    c = NextAutoColour(A, detail);
    obj.hotspotColour = c;
  }

  mayRegisterClickAction( A, obj);
  mayRequestImage( A, obj );
  mayRequestHotImage( A, obj );

  if( obj.hasOwnProperty( 'choice')){
    doChoose(A, obj, obj.choice);
  }

  // Image zone colours only used for tips.
  if( obj.hasOwnProperty('colourZones') ){
    var i;
    var n = obj.colourZones.length;
    for(i=0;i<n;i++){
      var zone = obj.colourZones[i];
      if( zone.hotspotColour && zone.tip ){
        c = zone.hotspotColour;
        var colourString = '[' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + ']';
        //console.log("next-color:" + c + "n:" + n);
        detail = sanitiseHtml(zone.tip);
        AddHot(A, colourString);
        AddDetail(A, detail);
      }
      mayRegisterClickAction( A, zone );
    }
  }
}


function createContainer( A, obj, d){
//console.log( "create container - "+obj.type);
  var n = 0;
  if( obj.content && Array.isArray(obj.content) ) n = obj.content.length;
  createCell(A, obj, d);
  for( var i = 0; i < n; i++ ){
    var o2 = obj.content[i];
    createCells(A, o2, d);
  }
}


function createCells(A, obj, data){
  visit(createThing, A, obj, data);
}


function sizeCells(A, obj, data){
  visit(sizeThing, A, obj, data);
  //console.log( obj.sizing);
}

function layoutCells(A, obj, data){
  if( obj.hasOwnProperty('margins') )
    data.margins = obj.margins;
  visit(layoutThing, A, obj, data);
}

function drawCells(A, obj, data){
  visit(drawThing, A, obj, data);
}

createThing = {
  "default": createContainer,
};

sizeThing = {
  "default": sizeContainer,
  "Spacer": sizeSpacer,
};

layoutThing = {
  "default": layoutUnmargined,
  "VStack": layoutContainer,
  "HStack": layoutContainer,
  "Overlay": layoutContainer,
};

drawThing = {
  "default": drawNowt,
  "VStack": drawContainer,
  "HStack": drawContainer,
  "Overlay": drawContainer,
};


function registerMethod( forWhat, creating, sizing, layout, draw )
{
  if( creating )
    createThing[ forWhat ] = creating;
  if( sizing )
    sizeThing[ forWhat ] = sizing;
  if( layout )
    layoutThing[ forWhat ] = layout;
  if( draw )
    drawThing[ forWhat ] = draw;

}

function registerMethods()
{
  registerMethod( "Circle",    0,0, layoutMargined, drawCircle);
  registerMethod( "Rectangle", 0,0, layoutMargined, drawRectangle);
  registerMethod( "Image",     0,0, layoutMargined, drawImage);
  registerMethod( "Chart",     0,0, layoutMargined, drawChart);

  // The charts are unmargined...
  registerMethod( "Path",    0,0,0, drawPath);
  registerMethod( "Tree",    0,0,0, drawTree);
  registerMethod( "Arrows",  0, sizeNowt,layoutNowt, drawArrows);
  registerMethod( "Prog",     createProg,sizeNowt,layoutNowt, 0);

}


// @how has a function for each type of object
// @what is an object to visit
// @data carries extra information into the function
function visit(how, A, what, data){
  if( how[what.type] ){
    how[what.type].call(how, A, what, data);
  } else how.default.call(how, A, what, data);
}

// converts user friendly format into more
// verbose but more uniform format,
// with content and type fields.
function convertJsonStructure(A, indent, layout){
  var key;
  for( key in layout ){
    if( !layout.hasOwnProperty(key) ) continue;
    var ch = key.substr(0, 1);
    if( ch !== ch.toUpperCase() ) continue;

    // If an array, then there are more objects
    // to explore.
    if( Array.isArray(layout[key]) ){
      layout.content = layout[key];
    } else {
      // otherwise there are no contents.
      layout.content = [];
      layout.value = layout[key];
    }
    layout.type = key;
    delete layout[key];

    //console.log( indent+key );
    break;
  }
  if( (!layout.id) && layout.value && (typeof layout.value) == "string" ){
    layout.id = layout.value;
  }
  if( layout.id ){
    layout.id = layout.id.substr(0, 10);
    A.RootObject.objectDict[layout.id] = layout;
    A.RootObject.objectList.push(layout);
  }
  if( layout.content && Array.isArray(layout.content) ){
    for( var i = 0; i < layout.content.length; i++ ){
      //console.log( indent+"Arg: "+i);
      convertJsonStructure( A, indent + "   ", layout.content[i]);
    }
  }
}

function doChoose( A, parentObj, item )
{
  if( !parentObj.content )
    return;
  if( !Array.isArray(parentObj.content))
    return;

  item--;
  var n = parentObj.content.length;
  for( var i=0;i<n;i++){
    var obj = parentObj.content[i];

    obj.colour  = (i===item) ? "rgb(255,250,235)":"rgb(255,230,205)";
    obj.bcolour = (i===item) ? "rgb(145,125,0)"  :"rgb(215,155,0)";
    obj.cornerRadius = 8;
    obj.drawEarly = (i!==item);
    obj.drawExtra = true;
  }
}

function getObjectByName(A, name){
  if( !name ) return 0;
  if( !A.RootObject.objectDict ) return 0;
  var shortName = name.substr(0, 10);
  return A.RootObject.objectDict[shortName];
}

function isDefined(x){
  var undef;
  return x !== undef;
}

function loadNewLines(A, specFileData, section){
  if( section ){
    specFileData = specFileData.split("<pre>START")[section] || "";
    var ix = specFileData.indexOf("</pre>");
    if( ix >=0 )
      specFileData = specFileData.substr(ix+6);
  }

  var lines = specFileData.split("<pre>");


  for( var i = 0; i < lines.length; i++ ){
    var item = lines[i];
    var data;
    var obj;
    var n;
    var c;
    var root;

    var detail =
      item.split("TIP=</pre>")[1] ||
      item.split("tip=</pre>")[1];
    var file = item.split("[[File:")[1] || "";
    file = file.split("]]")[0] || "";
    if( isFromServer() === "yes" ) file =
      "https://wit.audacityteam.org/images/" + file; else file =
      "./images/" + file;

    var spec = item.split("[[")[1] || "";
    spec = spec.split("]]")[0] || spec;
    spec = spec.split("|")[0] || spec;



    // Specify a table of colours which will be used for hotspots.
    if( item.startsWith("ZONECOLOURS=") ){
      obj = A.RootObject.lastImage;
      if( !obj ) continue;

      data = fieldValue("COLOURS", item);
      console.log("colour-data:" + data);
      var colours = JSON.parse(data);
      console.log(colours);
      obj.colourZones = obj.colourZones || [];
      A.Hotspots.colourZoneIx = obj.colourZones.length;
      obj.colourZones = obj.colourZones.concat( colours );
      A.Hotspots.colourZones = obj.colourZones;
    }

    // Add a TIP to the next zone (from zones specified earlier via ZONECOLOURS)
    if( item.startsWith("NEXTZONE:") ){
      if( A.Hotspots.colourZones &&  detail ){
        var zone = A.Hotspots.colourZones[ A.Hotspots.colourZoneIx ];
        if( isDefined( zone )){
          if( !isDefined( zone.hotspotColour ) ){
            zone = { 'hotspotColour': zone };
          }
          zone.tip = detail;
          A.Hotspots.colourZones[ A.Hotspots.colourZoneIx++ ] = zone;
          obj = zone;
        }
      }
    }

    // Add a TIP to the next object.
    // Can also modify other attributes such as colours and edge rounding.
    // Can also turn an object into a chooser.
    if( item.startsWith("NEXTOBJECT:") ){
      if( !isDefined(A.RootObject.objectList) ) continue;
      n = A.RootObject.itemIndex++;
      obj = A.RootObject.objectList[n];
      if( !isDefined(obj) ) continue;

      data = fieldValue("colour", item);
      if( data ) obj.colour = data;
      data = fieldValue("bcolour", item);
      if( data ) obj.bcolour = data;
      data = fieldValue("cornerRadius", item);
      if( data && (!isNaN(Number(data))) ) obj.cornerRadius = Number(data);
      if( detail ){
        obj.tip = detail;
      }
    }


    // ----------- Filename follows these -----------------------------
    // Set object click to load a spec
    if( item.startsWith("CLICK LOAD SPEC") ){
      file = ("X" + spec).split("Toolbox/")[1] || fieldValue("SPEC", item);
      console.log("click-load-spec:" + file);
      obj.clickDo = ["Spec",file];
    }

    // Set object click to execute a section of a spec (without erasing
    // what's already there)
    if( item.startsWith("CLICK DO") ){
      file = ("X" + spec).split("Toolbox/")[1] || fieldValue("SPEC", item);
      console.log("click-do-spec:" + file);
      obj.clickDo = ["DoSpec",file];
    }

    // Set object click to goto a hyperlink
    if( item.startsWith("CLICK GOTO") ){
      file = item.split("GOTO=</pre>")[1] || "";
      // extract a wiki hyperlink.
      file = ("X" + file).split("[")[1] || "";
      file = file.split(" ")[0] || file.split("]")[0] || "";

      console.log("click-goto:" + file);
      obj.clickDo = ["Goto",file];
    }
    // ------------ End of group requiring a filename. ----------------




    // ADD in some object into the scene graph.
    // Can add at a particular named place using 'NAME='
    if( item.startsWith("ADD:") ){
      root = getObjectByName(A, fieldValue("NAME", item));
      root = root || A.RootObject;
      root.type = "VStack";
      root.content = root.content || [];
      data = fieldValue("DATA", item);
      console.log("flow-data:" + data);
      var container = [];
      var json = JSON.parse(data);
      //console.log(obj);
      if( !Array.isArray(json) ) container.push(json); else container = json;

      for( var kk = 0; kk < container.length; kk++ ){
        convertJsonStructure(A, "", container[kk]);
        root.content.push(container[kk]);
      }
      //console.log(obj);
    }

    // Add an image into the scene graph.
    // This is required, if you want the image to actually load.
    if( item.startsWith("IMAGE") ){
      console.log("image:" + file);
      obj = getObjectByName(A, fieldValue("NAME", item));
      if( !obj ) continue;
      A.RootObject.lastImage = obj;
      obj.src = file;
    }

    // Used after IMAGE to add hotspot image for that image.
    if( item.startsWith("HOTSPOTS") ){
      console.log("hotspots:" + file);
      obj = A.RootObject.lastImage;
      if( !obj ) continue;
      obj.hotsrc = file;
    }

    // DO some immediate command.  Currently it's confined to changing
    // the choice in a chooser.
    if( item.startsWith("DO") ){
      obj = getObjectByName(A, fieldValue("CHOOSER_NAME", item));
      if( obj ){
        data = fieldValue("VALUE", item);
        if( data ){
           data = JSON.parse( data );
           obj.choice = data;
        }
      }
    }

    // Experimental (and incomplete) code to request a subdiagram to add
    // in at a specified place.
    if( item.startsWith("SUBOBJECT") ){
      console.log("subobject:" + file);
      obj = getObjectByName(A, fieldValue("NAME", item));
      if( !obj ) continue;

      obj.status = "asked";
      obj.file = file;
      obj.content = [];
      obj.onload = (function(){
        var obj1 = obj;
        return function(){
          obj1.status = "arrived";
          console.log(obj1.file + " subdiagram arrived");
          if( A.Status.isAppReady )
            onChart(A);
        }
      })();
      obj.onerror = (function(){
        var obj1 = obj;
        return function(){
          obj1.status = "failed";
          alert("Failed to load subdiagram " + obj1.file);
        }
      })();

      //obj.img.src = file;

    }

    // Set the caption, and info for the info button.
    if( item.startsWith("CREDITS") ){
      A.caption = fieldValue("CAPTION", item);
      console.log("caption:" + A.caption);
      setATitle(A, A.caption, A.page, A.fromWiki);
      // Reserve a colour for the info button.
      AddInfo(A);

      if( detail ){
        AddDetail( A, detail );
      }

    }


  }
}

/**
 * addNewDetails does not clear out old data before loading new lines from
 * a file.
 * It does do 'updateImages' so can be used to change the image.
 * @param A
 * @param data
 * @param section
 */
function addNewDetails(A, data, section){
  resetHotspots(A);
  A.Status.isAppReady = false;
  loadNewLines(A, data, section);

  var d= {};
  var obj = A.RootObject;
  createCells( A, obj, d );
  A.Status.time = 0;

  updateImages(A);
}

/**
 * handleNewData wipes out all old data, including captions and hotpsots,
 * before bringing new data in.
 * @param A
 * @param data
 * @param section
 */
function handleNewData(A, data, section){
  resetHotspots(A);
  setATitle(A,"Caption was missing");
  startChart(A);
  A.Status.isAppReady = false;
  loadNewLines(A, data, section);

  var d= {};
  var obj = A.RootObject;
  createCells( A, obj, d );
  A.Status.time = 0;

  updateImages(A);
}

/**
 * Loads one source file into an item in an array.
 * @param A
 * @param data
 * @param action
 * @param url
 * @param section
 * @param data
 * @param action
 * @param url
 */
function fileActionLoader(A,data, action, url,section,fn){
  var txtFile = new XMLHttpRequest();
  // CDNs and Varnish should give us the very latest.
  txtFile.onreadystatechange = function(){
    if( this.readyState === 4 && this.status === 200 ){
      // data.push({ action: action, value: this.responseText});
      fn(A,this.responseText,section);
    }
  };

  txtFile.open("GET", url, true);
  //txtFile.setRequestHeader( "Cache-Control", "s-maxage=0" );
  txtFile.send();
}

function requestSpec(A,source, fromwiki,section,fn){

  fn = fn || handleNewData;
  A.SpecName = source;

  if( isFromServer() === "no" )
  {
    fileActionLoader( A,"", "", "./raw/raw_spec_" + source + ".txt",section, fn);
  } else  if( fromwiki !== 'yes' ){
    fileActionLoader( A,"", "", "https://wit.audacityteam.org/raw/raw_spec_" + source + ".txt?time="+ nMillis,section,fn);
  }

    else {
    var date = new Date();
    var nMillis = date.getTime();
    // action=raw to get unprocessed file from wiki.
    // time=nMillis to avoid issues with cached content.
    fileActionLoader( A,"", "",
      "https://wiki.audacityteam.org/wiki/Toolbox/" + source +
      "?action=raw&time=" + nMillis,section, fn);
  }

}

function loadDiagram(A,page, fromwiki,section){
  console.log("Load Diagram: "+page);
  A.page = page;
  A.fromWiki = fromwiki;
  setToc( A,"");
  requestSpec( A,page, fromwiki,section);
}

function removeFrame(A){
  var doc = document.getElementById("body");
  doc.innerHTML =
    '<div id="content_here" style="text-align:center;"></div><div id="atitle" style="text-align:center;"><em>No Hotspot Zones Loaded (Yet)</em></div><div id="spec" style="margin-left:10px"></div>';
}

function getArg(line, arg){
  line = "&" + line.split('?')[1] || "";
  line = line.split('&' + arg + '=')[1] || "";
  line = (line + '&').split('&')[0];
  return line;
}

function isFromServer(){
  var str = window.location.href;
  return (str.indexOf('localhost') !== -1) ? "no" : "yes";
}



var Nozone = {};
Nozone.Zone = 0;


var Message;
var Message2;

function makeAnnotator(){
  var l = Annotator.length;
  var newA = {};
  newA.index = l;
  Annotator.push( newA );
  InitAnnotator(newA);
  resetHotspots(newA);
  return newA;
}


//makeAnnotator();

function initContent(){
  registerMethods();
  var query = window.location.href;
  var contentDivs = document.getElementsByClassName( "atkContentDiv" );
  for(var i=0;i<contentDivs.length;i++){
    var A = makeAnnotator();
    A.index = i;
    A.page = getArg(query, 'page'+i) || contentDivs[i].getAttribute("data-page") || "SmallCrowd";
    populateDomElement( A, contentDivs[i] );
    loadDiagram( A, A.page, 'no',1);
  }
  // Timer is for animation such as rotating earth.
  setInterval(timerCallback, 30);

}

function handleEditorData(A, data, section){
  A.MainDiv.innerHTML = data;
  var div = document.getElementById( "page" );
  if( !div )
    return;
  data = data.replace( /__NOTOC__/g, "" );
  data = data.replace( /^----*/gm, "<hr>");
  data = data.replace( /\[http(\S*)\s([^\]]*)\]/g,"<a" +
    " href='http$1'>$2</a>");
  data = data.replace( /\[\[File:([^\]]*)\]\]/g, "<img" +
    " style='width:700px;border:solid black 1px' src='./images/$1'>");
  data = data.replace( /https:\/\/wit.audacityteam.org\//g, '' );
  data = data.replace( /\[\[Toolbox\/([^\|\]]*)\|([^\[]*)\]\]/g, "<a" +
    " href='raw/raw_spec_$1.txt'>Toolbox/$2</a>");
  data = data.replace( /\[\[Toolbox\/([^\]]*)\]\]/g, "<a" +
    " href='raw/raw_spec_$1.txt'>Toolbox/$1</a>");
  data = data.replace( /#.\.txt/g, ".txt" );

  data=data.replace( /{{ATK_Header}}/g,
"<div style='margin:0 auto;background:#EEEEFF;padding:10px;border:1px solid" +
    " #999999;width:90%;align:center;margin-top:30px;margin-bottom:30px'" +
    ">This is an example interactive" +
    " diagram created using the " +
    "<a href='https://wiki.audacityteam.org/wiki/Audacity_Tool_Kit'>Audacity " +
    "Tool Kit</a> (ATK).  The aim of the ATK" +
    " project is to provide interactive diagrams that explain everything to do" +
    " with Audacity.  The ATK is also expected to be useful for other code" +
    " projects, and eventually for Wikipedia too, for biochemical pathways and" +
    " other interactive diagrams.</div>");

  var name = A.page;
  name = name.replace(/_/g," ");
  data = "<h1><a href='demos.htm?page0="+A.page+"'>Toolkit/"+name+"</a></h1><hr>"+data;

  div.innerHTML = data;
}

function populateEditorElement(A, contentHere){

  // Used for debugging messages
  Message = document.getElementById("message");
  Message2 = document.getElementById("message2");

  // MainDiv contains all the other divs
  A.MainDiv = document.createElement("textarea");
  A.MainDiv.rows=50;
  A.MainDiv.cols=80;
  A.MainDiv.style.width="80%";
  A.MainDiv.style.fontFamily = "Consolas,Lucida Console,monospace";
  A.MainDiv.spellcheck="false";

  contentHere.appendChild(A.MainDiv);
}

function initEditors(){
  var query = window.location.href;
  var contentDivs = document.getElementsByClassName( "atkContentDiv" );
  for(var i=0;i<contentDivs.length;i++){
    var A = makeAnnotator();
    A.index = i;
    A.page = getArg(query, 'page'+i) || contentDivs[i].getAttribute("data-page") || "SmallCrowd";
    populateEditorElement( A, contentDivs[i] );
    requestSpec(A,A.page, 'remote',1,handleEditorData);


    //loadDiagram( A, A.page, 'no',1);
  }
  // Timer is for animation such as rotating earth.
  //setInterval(timerCallback, 30);

}