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
  A.Styles = {};
  A.Styles.current = 0;
  A.Styles.dict = [];
  A.Styles.autolink = false;
}


function resetHotspots(A){

  // Both these array structures includes hand-specified and autocolours.
  // The colours are added as they are discovered.

  // Array: It's indexed via the zone number and yields the colour,
  // e.g "[1,2,3,4]"
  // This structure is important for building the displayed toc
  A.Hotspots.colourOfZone = [];

  // HashTable: It's indexed via a colour string such as "[1,2,3,4]"
  // and yields an actions {} object.
  // The actions object includes, tips, click and hover actions and a
  // zone number.
  // This structure is important for deciding what to do on a click
  // or hover.
  A.Hotspots.actionsOfColour = [];

  // Autocolours are generated 'on demand', starting from colour 0.
  A.Hotspots.autoColourIx = 0;
  // The next quantity counts the number of autocolours found BEFORE
  // we get to drawing.  More may be used in drawing.
  A.Hotspots.InitialAutocolours = 0;

  // Array of colours specified by-hand.
  A.Hotspots.byHandColours = [];
  // A counter used when doling out the hand colours to the structures
  // that consume them.
  A.Hotspots.byHandColourIx = 0;

  // Bogus entry to catch bad tips.  This bogus entry acts as Zone 0.
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

  A.Hotspots.byHandColourIx = 0;
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
  A.FocusCanvas.onmouseup = onMouseUp;
  A.FocusCanvas.onmousedown = onMouseDown;

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
  //A.DetailDiv.style.border = "1px solid rgba(230, 230, 230, 0)";
  A.DetailDiv.style.border = "3px solid rgba(30, 30, 170, 0.6)";
  A.DetailDiv.style.borderRadius = "5px";
  A.DetailDiv.style.MozBorderRadius = "5px";
  A.DetailDiv.style.textAlign = "left";
  A.DetailDiv.style.margin = "0px";
  A.DetailHideTime = -1;
  A.DetailDivFrozen = false; // frozen = don't hide.


  // Hotspot canvas and context do not need to be attached.
  A.Hotspots.canvas = document.createElement('canvas');
  A.Backing = {};
  resizeDivs(A);

}

function createDomElements(A){
  var contentHere = document.getElementById("content_here" + A.index);
  populateDomElement( A, contentHere);
}

// index is a colour in string format like "[10,10,30,255]".
AddHot = function( A, index){

  // If we already have this colour, reuse it.
  if( A.Hotspots.actionsOfColour.hasOwnProperty(index) ){
    A.Hotspots.Current = A.Hotspots.actionsOfColour[index];
    return;
  }
  
  // Otherwise create a new actions object, and 
  // record the new colour in our two tables.
  var actions = {};
  actions.Zone = A.Hotspots.colourOfZone.length;
  A.Hotspots.Current = actions;

  A.Hotspots.colourOfZone.push( index );
  A.Hotspots.actionsOfColour[index] = actions;
};

AddInfo = function( A ){
  // This is the zone for the info tip.
  AddHot(A,"[0,0,5,255]");
};

AddDetail = function( A, text){
  A.Hotspots.Current.Tip = addHyperlinks( A, text );
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

  // We have 1024 different hues since we're using a % 1024.
  var h = (Math.PI * 57 * 2 / 1023) * (a % 1024);
  //var h = (Math.PI * 57 * 2 / 1024) * (a % 1024);
  //a = Math.floor(a/1024);

  var r = Math.floor(127 * Math.cos(h)) + 128;
  h -= Math.PI * 2 / 3;
  var g = Math.floor(127 * Math.cos(h)) + 128;
  h -= Math.PI * 2 / 3;
  var b = Math.floor(127 * Math.cos(h)) + 128;
  h -= Math.PI * 2 / 3;

  //a=0;
  // drop the lower 4 bits, since our above hue cycle is about 16.
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

AutoColourFromOffset = function( A, offset ){
  var a = (A.Hotspots.autoColourIx-offset);
  var index = autoColourOfIndex(a);
  var rgb = rgbOfJsonColourTuple(index);
  return rgb;
}

// tell some colours apart.
NextAutoColour = function( A, Tip){
  var a = (A.Hotspots.autoColourIx++);
  var index = autoColourOfIndex(a);
  var rgb = rgbOfJsonColourTuple(index);
  var actions = A.Hotspots.actionsOfColour[index];
  if( actions )
    return rgb;

  AddHot( A, index );
  AddDetail( A, Tip );

  return rgb;
};

function innerDraw(A,obj,d){
  if( !obj )
    return;
  var l = obj.layout;
  if( !l )
    return;

  A.Status.drawing = true;
  var ctx = A.BackingCanvas.ctx;
  var ctx2 = A.Hotspots.ctx;

  ctx.clearRect(l.x0,l.y0,l.xw,l.yh);
  ctx2.clearRect(l.x0,l.y0,l.xw,l.yh);

  // Some hotpspot colours are created as needed.

  var i;
  for(i=0;i<=10;i++){
    A.Hotspots.autoColourIx = A.Hotspots.InitialAutocolours;
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
    if( A.DetailHideTime > 0 ){
      A.DetailHideTime--;
      if( A.DetailHideTime <= 0 ){
        A.DetailDiv.style.display = 'none';
      }
    }

    if( A.Status.isFocus && !A.newEvents)
      continue;
    A.newEvents = false;
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

// fudge factors that later will become proper parameters...
var fudgeLineMargin = 5;// lines outside chart by 5 pixels.
var fudgeLineDrop = 13;  // drop lines/bars down to contact axis labels.
var fudgeBarDrop = 12.5;  // drop bars to fit exactly over lines.
var fudgeStarDrop = 6; // drop stars slightly.
var fudgeLabelDrop = 4; // line labels lower than lines
var fudgeLabelMargin = 2; // labels to left


// Used for bars from base line to curve.
function drawLines(A,T, values, i, ix){
  if( T.stage !== kStageFillAndText )
    return;
  if( i!== 0)
    return;

  var l = T.obj.layout;
  var x = T.margin + T.x0 - fudgeLineMargin;
  var y = T.yh + T.y0 + fudgeLineDrop;
  var xw = l.xw - 2*T.margin+2*fudgeLineMargin;
  var yh = T.yh;

  var ctx = A.BackingCanvas.ctx;

  ctx.fillStyle = "rgba(105,205,105,1.0)";
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "black";

  //var y0 = (T.margin ) + T.y0+fudgeBarDrop;
  var y0 = T.yh - T.margin  + T.y0+fudgeLineDrop;


  for(i=0;i<=T.maxY;i+=T.linesAt){
    var yy = y0 - i* T.yScalerMax;

    // Get crisp lines by positioning at 0.5 of a pixel.
    yy = Math.floor( yy ) + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, yy);
    ctx.lineTo(x + xw, yy );
    ctx.stroke();

    ctx.save();
    ctx.textAlign = "right";
    ctx.font = "10px Arial";
    ctx.fillStyle = "rgba(15,35,165,1.0)";
    ctx.fillText( i, x-fudgeLabelMargin, yy+fudgeLabelDrop);
    ctx.restore();
  }
}


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function chartSubber( obj ){
  var object = obj;

  return function( i, str ){
    var j;
    for(j=0;j<object.titles.length;j++){
      var field = "%"+object.titles[j].toLowerCase();
      str = replaceAll( str, field, object.values[ i][j]);
    }
    return str;
  };
}

// Used for bars from base line to curve.
function drawBar(A,T, values, i, ix){
  if( T.stage !== kStageFillAndText && T.stage !== kStageHots )
    return;
  var vx = values[i][ix];
  var x = T.margin + T.x0 + i * T.xScaler;
  var y = vx * T.yScaler;
  var ctx = A.BackingCanvas.ctx;

  if( T.stage === kStageHots ){

    var tip = T.obj.autoTip || "Value: %v1 at: %label";
    tip = T.subber( i, tip );
    var colour = NextAutoColour( A, tip );
    ctx = A.Hotspots.ctx;
    ctx.fillStyle = colour;//rgbOfJsonColourTuple(colour);
  }
  else {
    ctx.fillStyle = T.colours[ ix % 2];
  }

  var x0 =  x + (ix - 1) * T.width;
  var y0 = T.yh - (T.margin + y) + T.y0+fudgeBarDrop;

  ctx.beginPath();
  ctx.rect(x0, y0, T.width, y);
  ctx.fill();

  if( T.stage !== kStageFillAndText )
    return;

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "black";
  ctx.stroke();

  x0 += T.width/2;

  var S = getBondBetween( {x:x0,y:y0+y}, {x:x0,y:y0});
  var obj = {S:S};
  //drawEnds( ctx, obj, 8);

  //drawSpotification( A, S, 20 );
}

// Used for values that follow (are on) a curve.
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




// int will be in mins.
function intOfDate( date ){
  var d = date.split("-");
  var months = "Jan.Feb.Mar.Apr.May.Jun.Jul.Aug.Sep.Oct.Nov.Dec.";
  var day = Number(d[0]);
  var month = months.indexOf( d[1]+".")/4;
  var year = Number(d[2]);
  var result = day + (356/12) * month + 356 * year;
  result = result * 24 * 60 * 60;
  return result;
}

// Used for irregularly spaced items.
function drawEvent(A,T, values, i, ix){
  if( ix !== 1)
    return;

  var vx;

  // This should all be calculated in advance and rolled into the scaling.
  {
    var date = T.obj.range[0];
    var low = intOfDate( date );
    //console.log( "Low for "+ date + " was " + low );
    var date2 = T.obj.range[1];
    var high = intOfDate( date2 );
    //console.log( "Low for "+ date2 + " was " + high );
    var date3 = values[i][0];
    var vv = intOfDate( date3 );
    vx =  (vv- low)/(high-low);
    vx = vx * (T.count * T.xScaler - T.spacer) / T.xScaler;
  }


  var x = 7+T.margin + T.x0 + vx * T.xScaler;
  var y = T.yh + T.y0 - T.margin - 0.0 * 2000 * T.yScaler+fudgeStarDrop;

  var ctx = A.BackingCanvas.ctx;
  if( T.stage === kStageHots ){
    var colour = NextAutoColour( A,
      "<h2>Audacity " + values[i][1] + "</h2>Released: "+values[i][0]);
    ctx = A.Hotspots.ctx;
    ctx.fillStyle = colour;// rgbOfJsonColourTuple(colour);
  }
  else {
    ctx.fillStyle = "rgb(205,192,67)";
  }

  drawStar(ctx, A, x, y);
  if( T.stage === kStageFillAndText ){
    ctx.strokeStyle = "rgb(120,97,46)";
    ctx.stroke();
  }
}

function drawDonut(A,T, values, i, ix){
  //if( ix !== 1)
  //  return;
  if( T.stage !== kStageFillAndText && T.stage !== kStageHots )
    return;

  if( i!= 0 )
    return;
  var l = T.obj.layout;
  var xw = l.xw;//T.width;
  var yh = l.yh;
  var x =  l.x0 + xw / 2;
  var y =  l.y0 + yh / 2;
  var r = xw / 2;
  var r2 = r * 0.70;
  var t0 = 2.0 * Math.PI * 0.75;
  var t1 = 2.0 * Math.PI * 0.75;

  // get total
  var total = 0;
  var j;
  for( j = 0; j < values.length; j++ ) total = total + values[j][1];

  var ctx = A.BackingCanvas.ctx;

  if( T.stage === kStageHots ){
    ctx = A.Hotspots.ctx;
  }

  var frac = Math.min(20, A.Status.time) / 20;

  for( j = 0; j < values.length; j++ ){

    //if( T.stage === kStageHots )

    var tip = T.obj.autoTip || "Value: %v1 at: %label";
    tip = T.subber( j, tip );
    var c = NextAutoColour( A, tip );

    A.Hotspots.autoColourIx+=2;
    t0 = t1;
    t1 = t1 + frac * Math.PI * 2 * values[j][1] / total;
    ctx.beginPath();
    ctx.moveTo(x + r2 * Math.cos(t0), y + r2 * Math.sin(t0));
    ctx.lineTo(x + r * Math.cos(t0), y + r * Math.sin(t0));
    ctx.arc(x, y, r, t0, t1, false);
    ctx.lineTo(x + r2 * Math.cos(t1), y + r2 * Math.sin(t1));
    ctx.arc(x, y, r2, t1, t0, true);
    ctx.closePath();
    //ctx.rect(x, y, T.width, T.width);
    ctx.fillStyle = c;//boxColourOfIndex( j*3 );
    ctx.fill();
    if( T.stage === kStageFillAndText )
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
  ctx.beginPath();
  ctx.translate(x+ (ix - 1) * T.width, T.yh - (T.margin + y) + T.y0);
  ctx.rotate(-Math.PI / 4);
  ctx.textAlign = "right";
  ctx.font = "12px Arial";
  ctx.fillStyle = "rgba(15,35,165,1.0)";
  ctx.fillText(values[i][0], 0, 0);
  ctx.restore();

  if( !isDefined( T.obj.tipsOnLabels ))
    return;

  var ctx2 = A.Hotspots.ctx;
  ctx2.save();
  ctx2.beginPath();
  ctx2.translate(x+ (ix - 1) * T.width, T.yh - (T.margin + y) + T.y0);
  ctx2.rotate(-Math.PI / 4);
  ctx2.textAlign = "right";
  ctx2.font = "12px Arial";
  var size = ctx2.measureText( values[i][0] );
  ctx2.fillStyle = AutoColourFromOffset( A, T.count-i);
  ctx2.rect( -size.width,-9, size.width, 9 );
  ctx2.fill();
  ctx2.restore();

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
  if( T.obj.display )
    T.items = T.items || T.obj.display.length;
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
  T.yScalerMax = yh/T.maxY;
  T.yScaler = (Math.min(20, A.Status.time) / 20) * (yh) / T.maxY;
}

function drawSpacedItems(A,x0, y0, xw, yh, values, T){
  var j;
  var i;
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
    else if( type === "event" )
      T.fns.push(drawEvent);
    else if( type === "lines" )
      T.fns.push(drawLines);
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
  else if( obj.spacer ){
    T.spacer = obj.spacer;
  }
  else
    T.width = 8;
  T.stage = d.stage;
  T.obj = obj;// Heck, pass the whole object too...
  if( obj.valuesFrom ){
    var obj2 = getObjectByName(A,obj.valuesFrom );
    obj.values = obj2.values;
    obj.maxY = obj.maxY || obj2.maxY;
  }
  if( !obj.values )
    return;
  //if( T.stage === kStageFillAndText )
  //  clearBacking(A,x0, y0, xw, yh);

  T.colours = [];
  T.colours[0] = "rgba(105,205,105,1.0)";
  T.colours[1] = "rgba(105,105,205,1.0)";
  T.linesAt = obj.linesAt || 200;
  T.maxY = obj.maxY || 2600;

  if( obj.display && obj.display[1].startsWith("#") )
    T.colours[1] = obj.display[1];

  T.subber = chartSubber( obj );

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
  return { "x": x, "y": y, "row":row , "theta": (row%2===0)?0:Math.PI };
}

function stripSignalChar( str ){
  if( str.length < 2 )
    return str;
  if( str[0] === '*' || str[0] === '#' || str[0] === '.')
    return str.substr( 1 );
  return str;
}


function snakeType( A, name ){
  var result = 0;
  if(  name.startsWith("*")){
    result = 2;
  }
  if(  name.startsWith("#")){
    result = 3;
  }
  if(  name.startsWith(".")){
    result = 1;
  }
  if( result > 1){
    if( A.BrightObjects ){
      if( A.BrightObjects.indexOf(name.substr(1)) < 0)
        result=1;
    }
  }
  return result;
}

function getSnakeStyle(X, style, A){
  if( isDefined(X.snakeStyle) ){
    style = X.snakeStyle;
    if( isDefined(A.BrightObjects) ){
      if( X.category !== A.BrightObjects ){
        style = 0;
      }
    }
  }
  return style;
}

function getSnakeShape(X, shape){
  if( isDefined(X.snakeShape) ){
    shape = X.snakeShape;
  }
  return shape;
}

function drawStar(ctx, A, x, y, r){
  var n = 10;
  var r = r || 3.5;

  ctx.beginPath();
  var i;
  for( i = 0; i <= n; i++ ){
    var theta = Math.PI * 2 * (i / n + (Math.min(20, A.Status.time) / 40));
    var r0 = (i % 2 === 0) ? r : 3.5 * r;
    var xx = x + r0 * Math.cos(theta);
    var yy = y + r0 * Math.sin(theta);
    if( i === 0 ) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
  }
  ctx.fill();
  ctx.lineWidth = 0.5;
}


function drawSnakeStar(A,ctx, ctx2, S, isHead, r){
  if( isHead ){
    drawSnakeSpot( A, ctx, ctx2, S, isHead, r );
    return;
  }
  drawStar( ctx, A, S.x, S.y, r);
  drawStar( ctx2, A, S.x, S.y,  r);
}

function drawSnakeSpot(A,ctx, ctx2, S, isHead, r){
  ctx.beginPath();
  ctx.arc(S.x, S.y, r, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();
  if( isHead ){
    ctx.stroke();
  }

  ctx2.beginPath();
  ctx2.arc(S.x, S.y, r, 0, 2 * Math.PI, false);
  ctx2.closePath();
  ctx2.fill();
}

function drawSnakeRect(A,ctx, ctx2, S, isHead, r){
  if( isHead ){
    drawSnakeSpot( A, ctx, ctx2, S, isHead, r );
    return;
  }
  var d = 8;
  var dx = 7 * (S.row %2);
  var v = (S.row%2)* (6-r*2)-3;
  ctx.beginPath();
  ctx.rect(S.x-d/2 +dx, S.y-v, d, -r*2);
  ctx.closePath();
  ctx.fill();
  if( isHead ){
    ctx.stroke();
  }

  d=14;
  ctx2.beginPath();
  ctx2.rect(S.x-d/2 +dx, S.y-v, d, -r*2);
  ctx2.fill();
}

function hyperlinkOfWikiWord( word ){
  var url = word;
  url = url.replace(/([A-Z])/g, function( match, index){
    return ( "_"+match[0].toLowerCase());
  });
  url = "https://doxy.audacityteam.org/class" + url + ".html";
  return "<a href='"+url.toLowerCase() + "'>" + word +"</a>";
}


function addHyperlinks( A, string ){
  if( !A.Styles.autolink )
    return string;
  var result = string.replace( /([a-zA-Z0-9_]+[A-Z]+[A-Za-z0-9_]*)/g, function( match ){ return hyperlinkOfWikiWord( match );});
  return result;
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

  var reserveColoursTo = A.Hotspots.autoColourIx + T.count;


  var S={};
  var j;
  S.x=0;S.y=0;
  T.isPath = true;
  T.maxv = maxv;

  var drawFns = [drawSnakeSpot, drawSnakeRect, drawSnakeStar ];

  var widths = [5,6,9];
  var lines = ["rgb(150,150,150)", "rgb(156,3,0)", "rgb(15,0,181)"];
  var blobs = ["rgb(150,150,150)", "rgb(196,123,120)", "rgb(125,120,191)"];
  var xblobs = ["rgb(120,120,120)", "rgb(105,205,105)", "rgb(105,205,105)"];
  var xheads = ["rgb(180,180,180)", "rgb(182,222,157)", "rgb(182,222,157)"];
  var heads = ["rgb(150,150,150)", "rgb(236,203,200)", "rgb(205,200,240)"];


  // draw snakey body
  var isHead = false;
  var X;
  var style = 1;
  var shape = 0;
  for( j = 0; i < maxv; j += T.stride ){

    X = values[j];
    style = getSnakeStyle(X, style, A);
    shape = getSnakeShape(X, shape );

    ctx.beginPath();
    ctx.moveTo(S.x, S.y);
    ctx.lineWidth = widths[style];
    ctx.strokeStyle = lines[style];


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
    if( !isDefined(X.snakeStyle) )
      ctx.stroke();

  }
  i = 0;

  var greenBlob = "rgba(105,205,105,1.0)";
  var blobColour = greenBlob;
  // draw blobs.
  T.isPath = false;


  style = 1;
  shape = 0;
  for( j = 0; i < T.count; j += T.stride ){
    var r=T.r0+7;

    X = values[j];

    var tipText=addHyperlinks( A, X.docString );

    var c =  NextAutoColour( A, tipText);
    r = 1.6 * Math.log((X.docString.length) + 0.1) + T.r0;

    if( X.docString.indexOf("No Description") >= 0 )
      r = 3;

    if( i < maxv ){
      S = T.fn(i, T);

      style = getSnakeStyle(X, style, A);
      shape = getSnakeShape(X, shape );

      ctx.fillStyle = blobs[style];
      ctx.strokeStyle = lines[style];

      if( X.isHead ){
        // lighter green for head.
        ctx.fillStyle = heads[style];
        ctx.lineWidth = 1;
        r += 3;
      }
      ctx2.fillStyle = c;
      isHead = X.isHead;
      drawFns[ shape ](A, ctx, ctx2, S, isHead, r);

      if( isHead ){
        drawAnEnd( ctx, S, "pointed",r-2);
      }

/*
      var isTail = isDefined( X.snakeStyle );
      if( isTail ){
        S.theta = S.theta + Math.PI;
        drawAnEnd( ctx, S, "flat",4);
      }
*/
    }
    i++;

  }
  //A.Hotspots.autoColourIx = reserveColoursTo;
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

  if( isDefined( obj.autolink ) )
    A.Styles.autolink = obj.autolink;

  stride = stride || 1;
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

  if( obj.borderColour ) ctx.strokeStyle = obj.borderColour; else ctx.strokeStyle =
    "rgba( 55, 55,155,1.0)";
}


function getLineExtent(obj, vx, vy){
  var m = 0;
  var k = 1;
  if( obj.type === "Circle" ){
    var r = Math.min(obj.layout.yh, obj.layout.xw) / 2;
    m = k * r / Math.sqrt(vx * vx + vy * vy);
  } else {
    m = 1;//0.5;

    if( Math.abs(vx) * obj.layout.yh > Math.abs(vy) * obj.layout.xw ){
      m = obj.layout.xw / (2 * Math.abs(vx));
    } else {
      m = obj.layout.yh / (2 * Math.abs(vy));
    }
    m = m * k;
  }
  return m;
}

function getLineBetween(obj1, obj2){
  var x1 = obj1.layout.x0 + obj1.layout.xw / 2;
  var x2 = obj2.layout.x0 + obj2.layout.xw / 2;
  var y1 = obj1.layout.y0 + obj1.layout.yh / 2;
  var y2 = obj2.layout.y0 + obj2.layout.yh / 2;
  var vx = x2 - x1;
  var vy = y2 - y1;

  var m = getLineExtent(obj2, vx, vy);
  var n = getLineExtent(obj1, vx, vy);

  var S = [];
  S[0] = {};
  S[1] = {};

  S[0].theta = Math.atan2(vy, vx) + Math.PI;
  S[1].theta = S[0].theta - Math.PI;

  S[0].x = x1 + n * vx;
  S[0].y = y1 + n * vy;
  S[1].x = x2 - m * vx;
  S[1].y = y2 - m * vy;

  vx = S[1].x - S[0].x;
  vy = S[1].y - S[0].y;

  var l = Math.sqrt( vx * vx + vy * vy);
  S[0].l = l;
  S[1].l = l;

  return S;
}

function drawAnEnd(ctx, S, style, d){
  if( !isDefined( d ) )
    d=4;
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,0,0,1.0)";
  ctx.lineWidth = 1;
  ctx.translate(S.x, S.y);
  ctx.rotate(S.theta);
  ctx.translate( d, 0 );
  if( style === "flat" ){
    drawFlatArrowHead(ctx);
  } else {
    drawPointedArrowHead(ctx);
  }
  ctx.restore();
}

function drawArrowHeadAndTail(A, obj1, obj2){
  var S = getLineBetween( obj1, obj2 );
  var ctx = A.BackingCanvas.ctx;

  // The head at obj2
  drawAnEnd(ctx, S[1], A.Styles.head);
  // The tail at obj1
  //drawAnEnd(ctx, S[0], "flat");//,A.Styles.head);
}


function drawSpotification( A, S, d ){
  d = d || 20;
  var ctx = A.BackingCanvas.ctx;
  var n = S[0].l / d;
  var x = S[0].x;
  var y = S[0].y;
  var dx = (S[1].x-x)/n;
  var dy = (S[1].y-y)/n;
  var i;
  for(i = 0;i<n;i++){
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = "rgb(205,192,67)";
    drawStar( ctx, A, x +dx*i, y+dy*i, 3 );
    ctx.strokeStyle = "rgb(120,97,46)";
    ctx.stroke();
    //ctx.translate(S.x, S.y);
    ctx.restore();

  }
}

function drawArrowBody(A, obj1, obj2){

  var S = getLineBetween( obj1, obj2 );

  var ctx = A.BackingCanvas.ctx;
  ctx.beginPath();
  ctx.strokeStyle = "rgba(0,0,0,1.0)";
  ctx.lineWidth = 3;
  ctx.moveTo(S[0].x, S[0].y);
  ctx.lineTo(S[1].x, S[1].y);
  ctx.stroke();

  //drawSpotification( A, S, 20 );
}

function drawPointedArrowHead(ctx){
  ctx.moveTo(-11, -5);
  ctx.lineTo(0, 0);
  ctx.lineTo(-11, 5);
  ctx.lineTo(-7, 0);
  ctx.closePath();
  ctx.fill();
}

function drawFlatArrowHead(ctx){
  var k =7;
  var p = 3;
  var u = 1.5;
  var z = 15;
  ctx.moveTo(-z, u);
  ctx.lineTo(-p, u);
  ctx.lineTo(-p, k);
  ctx.lineTo( 0, k);
  ctx.lineTo( 0, -k);
  ctx.lineTo(-p, -k);
  ctx.lineTo(-p, -u);
  ctx.lineTo(-z, -u);
  ctx.closePath();
  ctx.fill();
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

  A.Styles.head         = obj.head;

  for( i = 0; i < arrows.length; i += 2 ){
    var obj1 = objFromId(A,arrows[i]);
    var obj2 = objFromId(A,arrows[i + 1]);
    if( !isDefined(obj1) || !isDefined(obj2) ) continue;
    if( !isDefined(obj1.layout) || !isDefined(obj2.layout) ) continue;
    if( d.stage === kStageArrowShaft )
      drawArrowBody(A,obj1,obj2);
    if( d.stage === kStageArrowHead )
      drawArrowHeadAndTail(A,obj1,obj2);
  }
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
    if( obj.src )
       drawRectangle(A, obj, d);
    return;
  }

  if( obj.hot && (obj.hot.status !== "arrived") ){
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
  if( isDefined( obj.opacity) )
    ctx.globalAlpha = obj.opacity;
  if( d.stage === kStageFillAndText )
    ctx.drawImage(obj.img, x, y, xw, yh);
  ctx.globalAlpha = 1.0;


  if( d.stage === kStageHots )
    if( obj.hot && obj.hot.status === "arrived" )
      ctx2.drawImage(obj.hot.img, x, y, xw, yh);
}

function drawNowt2( A, obj, d ){

}

function setStyle( A, obj ){
  if( isDefined( obj.style) && isFinite( obj.style )){
    A.Styles.current = obj.style;
  }
  var styleRec = A.Styles.dict[ A.Styles.current ] || {};
  if( styleRec ){
    obj.colour       = obj.colour || styleRec.colour;
    obj.borderColour      = obj.borderColour || styleRec.borderColour;
    obj.cornerRadius = obj.cornerRadius || styleRec.cornerRadius;
  }
  styleRec.colour       = obj.colour || "rgb(255,255,255)";
  styleRec.borderColour      = obj.borderColour || "rgb(80,80,200)";
  styleRec.cornerRadius = isDefined(obj.cornerRadius)? obj.cornerRadius : 0;
  styleRec.head         = obj.head;
  A.Styles.dict[ A.Styles.current ] = styleRec;

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
    obj.borderColour      = "rgb(145,125,0)";
    obj.cornerRadius = 8;
  }
  else{
    setStyle(A,obj);
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


function drawGeshi(A, obj, d){
  if( d.stage !== kStageFillAndText )
    return;

  //console.log( "draw - "+obj.type);
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;


  // This sizing/font matches typical appearance of <pre> element.
  var ctx = A.BackingCanvas.ctx;
  ctx.font = "13px monospace";

  // Approximate height (as M is 'square' );
  // Advanced metrics not supported in firefox or ie or edge.
  var textHeight = (ctx.measureText( "M").width *1.8);

  var i;
  var lines = obj.value.split( "\n" );
  for( i = 0;i< lines.length; i++){
    var str = lines[i];

    ctx.fillText(str,
      x ,
   y + textHeight*(i+1.5));
/*
    if( obj.hotspotColour ){
      var ctx2 = A.Hotspots.ctx;
      ctx2.beginPath();
      ctx2.rect(x, y, xw, yh);
      ctx2.fillStyle = obj.hotspotColour;
      ctx2.fill();
    }
 */
  }
}


function drawKwic(A, obj, d){
  if( d.stage !== kStageFillAndText )
    return;

  //console.log( "draw - "+obj.type);
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  if( !isDefined( obj.offset )){
    obj.offset = {x:xw/3, y:yh*20};
  }

  // This sizing/font matches typical appearance of <pre> element.
  var ctx = A.BackingCanvas.ctx;
  ctx.font = "13px monospace";

  // Approximate height (as M is 'square' );
  // Advanced metrics not supported in firefox or ie or edge.
  var oneSpace = ctx.measureText( "M").width;
  var textHeight = oneSpace *1.8;
  var textLineSpacing = textHeight;
  var kwicSpace = oneSpace;

  var i;
  var lines = Math.floor( yh/textLineSpacing );
  var D = obj.permutedIndex;

  y+= 1.5*textLineSpacing;

  var offsetX = obj.offset.x;
  var offsetY = obj.offset.y;

  if( A.Status.click ){
    offsetX += A.Status.move.x-A.Status.click.x;
    offsetY -= A.Status.move.y-A.Status.click.y;

  }

  var dx = offsetX;
  var iStart = Math.floor(offsetY / textLineSpacing);
  var dy = iStart * textLineSpacing-offsetY;



  for( i = iStart;i< Math.min( iStart+lines, D.length); i++){
    var str = D[i];

    ctx.textAlign = "right";
    ctx.fillText(str, x+dx-kwicSpace,y + dy + textLineSpacing*(i-iStart));
    ctx.textAlign = "left";
    ctx.fillText(str, x+dx,y + dy + textLineSpacing*(i-iStart));
    /*
        if( obj.hotspotColour ){
          var ctx2 = A.Hotspots.ctx;
          ctx2.beginPath();
          ctx2.rect(x, y, xw, yh);
          ctx2.fillStyle = obj.hotspotColour;
          ctx2.fill();
        }
     */
  }
}





function drawText(A, obj, d){
  if( d.stage !== kStageFillAndText )
    return;

  //console.log( "draw - "+obj.type);
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  var ctx = A.BackingCanvas.ctx;

  ctx.save();
  ctx.beginPath();

  setStyles(ctx, obj);
  if( obj.cornerRadius )
    drawRoundRect(ctx, x, y, xw, yh, obj.cornerRadius);
  else
    ctx.rect(x, y, xw, yh);
  ctx.fill();
  ctx.stroke();

  //ctx.textAlign = "left";
  ctx.fillStyle = "rgba(0,0,0,1.0)";

  var textWidth  = ctx.measureText( obj.value ).width;
  // Approximate height (as M is 'square' );
  // Advanced metrics not supported in firefox or ie or edge.
  var textHeight = ctx.measureText( "M").width;

  var xPercent = isDefined( obj.xPos ) ? obj.xPos : 0.50;
  var yPercent = isDefined( obj.yPos ) ? obj.yPos : 0.50;
  ctx.fillText(obj.value,
    x + (xw-textWidth) * xPercent,
    y + (yh-textHeight) * yPercent + textHeight);
  ctx.restore();
  if( obj.hotspotColour ){
    var ctx2 = A.Hotspots.ctx;
    ctx2.beginPath();
    ctx2.rect(x, y, xw, yh);
    ctx2.fillStyle = obj.hotspotColour;
    ctx2.fill();
  }
}



function drawTile(A,obj,d){
  drawRectangle( A, obj, d );
  increaseMargin( A, obj, 10);
  drawImage( A,obj,d);
  increaseMargin( A, obj, -10);
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


function drawHotShape(ix, action, colourMatch){
  var A = Annotator[ ix ];


  var ctx = A.FocusCanvas.ctx;


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
    colourString = rgbOfColourTuple(colourMatch);

  // We'll cache the picked-out shape.
  if( A.Hotspots.lastHot !== colourString ){
    var c = colourMatch;


    // colourWith is slightly faded so we can see image underneath.
    var colourWith   = drawAll ? [255,255,255,200] : [ c[0],c[1],c[2],200];
    var colourAbsent = [ 255,255,255, 200];
    var drawAllOpacity = 230;
    var w = A.Porthole.width;
    var h = A.Porthole.height;
    var pixels = A.Hotspots.ctx.getImageData(0, 0, w, h);
    var d = pixels.data;
    for( var i = 0; i < w * h * 4; i += 4 ){
      if( drawAll  && d[i+3]<50){
        d[i    ] = colourWith[0];
        d[i + 1] = colourWith[1];
        d[i + 2] = colourWith[2];
        d[i + 3] = colourWith[3];
      }
      else if( drawAll ){
        d[i + 3] = drawAllOpacity;
      }
      else if( d[i] === c[0] && d[i + 1] === c[1] && d[i + 2] === c[2] &&
        d[i + 3] === c[3] ){
        d[i    ] = colourWith[0];
        d[i + 1] = colourWith[1];
        d[i + 2] = colourWith[2];
        d[i + 3] = colourWith[3];
      } else if( colourAbsent[3] > 50) {
        d[i    ] = colourAbsent[0];
        d[i + 1] = colourAbsent[1];
        d[i + 2] = colourAbsent[2];
        d[i + 3] = colourAbsent[3];
      }
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
  if( !A.DetailDivFrozen ){
    A.DetailDiv.style.display = "none";
    A.Status.OldHit = -1;
  }
  A.DetailDivFrozen = false;
}

function actionsFromCursorPos(A,x,y){

  if( !A.Hotspots.ctx ) return -1;
  var pixel = A.Hotspots.ctx.getImageData(x, y, 1, 1).data;
  var result = "[" + pixel[0] + "," + pixel[1] + "," + pixel[2] + "," +
    pixel[3] + "]";
  var actions = A.Hotspots.actionsOfColour[result] ||
    // Testing with a reduced colour is no longer needed.
    /* A.Hotspots.actionsOfColour[roundColour(result)] || */
    Nozone;
  if( Message2 ) Message2.innerHTML =
    "Colour &amp; Zone: rgba" + result + ", Zone " + actions.Zone;
  return actions;
}

function setNewImage(A,file){

  // Only supported for whole-div images.
  if( (A.RootObject.content.length === 1) &&
    (A.RootObject.content[0].type === "Image") ){
    var obj = A.RootObject.content[0];
    //obj.file = file;
    //obj.img.crossOrigin = "anonymous";
    //obj.img.src = urlOfFile( obj.file );
    obj.src = file;
    mayRequestImage(A, obj)

  }

}

function showOrHideTip(A, actions){
  if( actions.Tip ){
    A.DetailDiv.style.display = "block";
    A.DetailHideTime = -1;
    A.DetailDiv.innerHTML = actions.Tip;
  } else {
    // Keep div that should disappear around for 30 ticks...
    // so it does not flicker.
    A.DetailHideTime = 10;
    A.DetailDivFrozen = false;
  }
}

function onMouseUp( e ){
  var index = e.target.toolkitIndex;
  var A = Annotator[index];

  A.Status.displace = {
    x: A.Status.move.x-A.Status.click.x,
    y:A.Status.move.y-A.Status.click.y};
  //A.Status.move = {x:0,y:0};
  A.Status.click = undefined;
  console.log( "Up ("+A.Status.displace.x + "," + A.Status.displace.y + ")");

}

function onMouseDown( e ){
  var index = e.target.toolkitIndex;
  var A = Annotator[index];

  A.Status.move = {x:0,y:0};
  A.Status.click = undefined;

  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  A.Status.move = {x:x,y:y};
  if( A.Status.displace )
  {
    A.Status.click = { x: x-A.Status.displace.x, y: y-A.Status.displace.y };
  }
  else
  {
    A.Status.click = { x: x, y: y };
  }
  console.log( "Down ("+A.Status.click.x + "," + A.Status.click.y + ")");
  updateImages( A );

}

function mousemoveOnMap(e){
  var index = e.target.toolkitIndex;
  var A = Annotator[index];
  if( e.shiftKey ) return;

  if( !A.Status.isAppReady ) return;
  A.Status.isFocus = true;


  var rect = e.target.getBoundingClientRect();
  var x = Math.ceil(e.clientX - rect.left);
  var y = Math.ceil(e.clientY - rect.top);
  var coordinates = "Coordinates: (" + x + "," + y + ")";


  var pt = detailPosFromCursorPos(A, x, y);

  drawFocusSpot(A,x, y);
  drawInfoButton(A);
  var actions = actionsFromCursorPos(A, x, y);
  if( Message ) Message.innerHTML = coordinates;
  if( !A.DetailDivFrozen ){
    A.DetailDiv.style.left = pt.x + "px";
    A.DetailDiv.style.top = pt.y + "px";
  }
  if( A.Status.OldHit !== actions.Zone ){
    A.Status.OldHit = actions.Zone;

    // Update the detail div
    if( !A.DetailDivFrozen )
      showOrHideTip(A, actions);
    // Do any additional hover action
    if( actions.Hover ){
      doAction(A, actions.Hover);
    }
    e.target.style.cursor = actions.Click ? 'pointer' : 'auto';
  }
  if( e.buttons ){
    A.Status.move = { x: x, y: y };
    updateImages(A);
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
  else {
    A.DetailDivFrozen = true;
    showOrHideTip( A, actions );
  }
}


function updateImages(A){
  if( !A.BackingCanvas )
    return;
  onChart(A);
}

function fooo( ix, c ){
  var A = Annotator[ ix ];
  drawHotShape(A,c);
}

function makeToc(A){
  var h = A.Hotspots;
  if( !h || !h.colourOfZone)
    return "NO HOTSPOT COLOURS";
  var str = "<table>";
  for(var i=1;i<h.colourOfZone.length;i++){
    var c = h.colourOfZone[i];
    if( !c )
      continue;
    //var strc = stringOfTuple(c);
    var item = h.actionsOfColour[c];
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
    str += "<tr><td style='vertical-align:top;padding:5px;padding-left:0px'>" +
      "<div style='width:30px;height:30px;color:" + textColor +
      ";border:thin solid black;text-align:center;vertical-align:middle;" +
      "line-height:30px;background-color:" + rgbOfColourTuple(c2) + "' "+clicker+">" + (i-1) +
      "</div></td><td  style='padding:5px'>" + tip + "</td></tr>";
  }
  str += "</table>";
  return str;
}

function setToc( A, bShow ){
  A.TocShown = bShow;
  var div = A.TableOfHotsDiv;//.getElementById("tabular_contents"+A.index);
  if( !div )
    return;


  if( bShow ){
    var contents = makeToc(A);
    var clicker = "onmouseover='drawHotShape("+A.index+",\"drawAll\")'" +
      " onmouseout='drawHotShape("+A.index+",\"clear\")' ";
    var text = "<div " + clicker +
      "style='float:left;width:30px;height:30px;margin:5px;text-align:center;vertical-align:middle;line-height:30px;color:white;border:1px solid;border-color: #000000;background:repeating-linear-gradient(-45deg,#d68252,#9c43ad,#326489,#32852f 33%)'>All</div><h3>Zones</h3>Hover over coloured boxes in this list to see the zones in the image highlighted.  Hover over the stripy box to see all zones<br clear='all'><hr>" +
      contents;
    div.innerHTML = text;
  }

  div.style.display = bShow? 'block':'none';
  var toggler = document.getElementById("zoneToggler"+A.index);
  if( !toggler)
    return;
  toggler.innerHTML=bShow ?"-zones":"+zones";

}

function toggleDetailsInToc(index){
  var A = Annotator[index];
  A.TocShown = !(A.TocShown || false);
  setToc( A, A.TocShown );
  return false;
}

function setATitle(A,caption, page, fromWiki){
  //A.TocShown = false;
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

  if( A.Hotspots.colourOfZone && A.Hotspots.colourOfZone.length > 0)
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


function setClick(A,type, location){
  var h = A.Hotspots.Current.Click || [];
  h.push( type );
  // ignore after '#'
  h.push(  (location + "#").split("#")[0]);
  var num = location.split("#")[1]||"0";
  num = Number( num );
  h.push( num+1 );
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


function increaseMargin(A, obj, m){
  //console.log( "layout - "+obj.type);
  var l = obj.layout;
  setCellLayout(A, l.x0 + m, l.y0 + m, l.xw - 2 * m, l.yh - 2 * m, obj);
}

function layoutMargined(A, obj, d){
  //console.log( "layout - "+obj.type);
  increaseMargin( A, obj, d.margins );
//  var m = d.margins;
//  var l = obj.layout;
//  setCellLayout(A, l.x0 + m, l.y0 + m, l.xw - 2 * m, l.yh - 2 * m, obj, d);
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


function doAction(A,code){
  var activeObject = {};
  var name;
  var section;

  for(i=0;i<code.length;){
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
    // This is just selecting the item, to do more with it.
    else if( command === "chooseItem" ){
      activeObject = getObjectByName(A, code[i++]);
    }
    else if( command === "setTip" ){
      activeObject.tip = code[i++];
    }
    else if( command === "setBright" ){
      A.BrightObjects = code[i++];
    }
    else if( command === "loadSpec" ){
      var spec = code[i++];
      //const bright = code[i++];
      var prog = code.slice( i );
      var handler = (function( pp ){
        return function( AA, data, ss ){
          handleNewData(AA, data, ss);
          doAction( AA, pp );
          //AA.BrightObjects = bright;
        }
      }(prog));
      requestSpec(A, spec, A.fromWiki, 1, handler );
      return;
    }
    else if( command === "loadImage" ){
      activeObject.src = code[i++];
      mayRequestImage(A, activeObject);
    }
    else if( command === "Spec" ){
      name = code[i++];
      section = code[i++];
      requestSpec( A, name, A.fromWiki, section);
    }
    else if( command === "DoSpec" ){
      name = code[i++];
      section = code[i++];
      requestSpec( A, name, A.fromWiki, section, addNewDetails);
    }
    else if( command === "Image" ) {
      name = code[i++];
      setNewImage( A, name);
    }
    else if( command === "Goto" ){
      name = code[i++];
      window.location.href = name;
      return;
    }


  }
}

function createProg( A, obj, data ){
  if( !obj.code )
    return;
  doAction( A, obj.code );

}


function permuteMe( values ){
  var i;

  var stopwords = [];
  stopwords["A"] = true;
  stopwords["AN"] = true;
  stopwords["AND"] = true;
  stopwords["ARE"] = true;
  stopwords["FOR"] = true;
//  stopwords["FROM"] = true;
//  stopwords["HAVE"] = true;
  stopwords["HOW"] = true;
  stopwords["IF"] = true;
//  stopwords["IN"] = true;
//  stopwords["INTO"] = true;
  stopwords["OF"] = true;
  stopwords["ON"] = true;
  stopwords["THE"] = true;
  stopwords["TO"] = true;
//  stopwords["WHAT"] = true;
//  stopwords["WHEN"] = true;
//  stopwords["WHERE"] = true;
  stopwords["-"] = true;


  var results = [];
  for( i= 0;i< values.length;i++){
    var str = values[i];
    var words = str.split( ' ');
    var j;
    for( j=0;j<words.length;j++){
      if( stopwords[ words[j] ] )
        continue;
      var perm = words.slice(j).join(" ");
      if( j> 0 )
        perm = perm + " " + words.slice(0,j).join(" ");
      results.push( perm );
    }
  }
  return results;
}


function createKwic( A, obj, data ){
  console.log("Got it");
  //var X = [ obj.content[0] ];
  var X = permuteMe( obj.values );
  var i;
  X.sort( );
  for(i=0;i<X.length;i++){
    console.log( X[i] );
  }
  obj.permutedIndex = X;
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

function urlOfFile(file){
  if( isFromServer() === "yes" )
    file = "https://wit.audacityteam.org/images/" + file;
  else
    file = "./images/" + file;
  return file;
}

function mayRequestImage(A, obj){
  if( !obj.src ){
    return;
  }
  if( obj.type !== "Image" && obj.type !== "Tile" ){
    return;
  }

  obj.file = urlOfFile(obj.src);
  if( obj.previous_img === obj.file )
    return;
  obj.status = "asked";

  obj.content = [];
  obj.img = document.createElement("img");
  obj.img.onload = (function(){
    var obj1 = obj;
    return function(){
      obj1.status = "arrived";
      console.log(obj1.file + " image arrived");
      // May need to layout and draw when image arrives.
      A.newEvents = true;
      if( obj1.resize ){
        resizeForImage(A, obj1.img);
      } else if( A.Status.isAppReady ){
        onChart(A);
      }
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
  // avoid asking twice.
  obj.previous_img = obj.file;
  obj.img.src = obj.file;
}

function mayRequestHotImage(A, obj){
  if( !obj.hotsrc ){
    return;
  }
  if( obj.type !== "Image" ){
    return;
  }

  var file = urlOfFile(obj.hotsrc);
  if( obj.hot && obj.hot.previous_image === file )
    return;

  obj.hot = {};
  obj.hot.status = "asked";
  obj.hot.file = file;

  obj.hot.img = document.createElement("img");
  obj.hot.img.onload = (function(){
    var obj1 = obj;
    return function(){
      obj1.hot.status = "arrived";
      console.log(obj1.file + " HS arrived");
      A.newEvents = true;
      if( A.Status.isAppReady ){
        drawCells(A, A.RootObject, {});
      }
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
  obj.hot.previous_image = obj.hot.file;
  obj.hot.img.src = obj.hot.file;
}

function createCell(A, obj, d){

  var detail;
  var c;
  if( obj.hasOwnProperty('autolink') )
    A.Styles.autolink = obj.autolink;
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
  if( obj.hasOwnProperty('byHandColours') ){
    var i;
    var n = obj.byHandColours.length;
    for(i=0;i<n;i++){
      var zone = obj.byHandColours[i];
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
    obj.borderColour = (i===item) ? "rgb(145,125,0)"  :"rgb(215,155,0)";
    obj.cornerRadius = 8;
    obj.drawEarly = (i!==item);
    obj.drawExtra = true;
    if( A.dataArriving )
      continue;
    if( i===item && (parentObj.chosen !== item )){
      parentObj.chosen = item;
      //console.log( "New choice of "+(item+1));
      if( obj.clickDo ){
        // This makes a temporary click action, so that we can
        // do it immediately.
        A.Hotspots.Current.Click = [];
        setClick( A, obj.clickDo[0], obj.clickDo[1] );
        doAction(A,A.Hotspots.Current.Click);
      }
    }
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
  console.log( "Loading new file..." );

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
      obj.byHandColours = obj.byHandColours || [];
      A.Hotspots.byHandColourIx = obj.byHandColours.length;
      obj.byHandColours = obj.byHandColours.concat( colours );
      A.Hotspots.byHandColours = obj.byHandColours;
    }

    // Add a TIP to the next zone (from zones specified earlier via ZONECOLOURS)
    if( item.startsWith("NEXTZONE:") ){
      if( A.Hotspots.byHandColours &&  detail ){
        var zone = A.Hotspots.byHandColours[ A.Hotspots.byHandColourIx ];
        if( isDefined( zone )){
          if( !isDefined( zone.hotspotColour ) ){
            zone = { 'hotspotColour': zone };
          }
          zone.tip = detail;
          A.Hotspots.byHandColours[ A.Hotspots.byHandColourIx++ ] = zone;
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
      data = fieldValue("borderColour", item);
      if( data ) obj.borderColour = data;
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
      var container = [];
      var json = JSON.parse(data);
      console.log("flow-data:" + JSON.stringify( json, null, 2) );

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
      if( obj.src !== file )
        obj.src = file;
      else
        console.log("Already set" );
    }

    // Used after IMAGE to add hotspot image for that image.
    if( item.startsWith("HOTSPOTS") ){
      console.log("hotspots:" + file);
      obj = A.RootObject.lastImage;
      if( !obj ) continue;
      if( obj.hotsrc !== file )
        obj.hotsrc = file;
      else
        console.log("Already set" );
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
      var bright = fieldValue("BRIGHT_OBJECTS", item);
      if( bright ){
        A.BrightObject = bright;
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
  console.log( "...New file loaded" );
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
  A.dataArriving = true;
  resetHotspots(A);
  A.Status.isAppReady = false;
  loadNewLines(A, data, section);

  var d= {};
  var obj = A.RootObject;
  createCells( A, obj, d );
  A.Status.time = 0;

  updateImages(A);
  setToc( A, A.TocShown );
  A.dataArriving = false;
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
  loadNewLines(A, A.inner);

  var d= {};
  var obj = A.RootObject;
  createCells( A, obj, d );
  A.Hotspots.InitialAutocolours = A.Hotspots.autoColourIx;
  A.Status.time = 0;
  A.newEvents = true;

  updateImages(A);
  setToc( A, A.TocShown );
  iter = 200;
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
    fileActionLoader( A,"", "", "./wiki/" + source + ".txt",section, fn);
  } else  if( fromwiki !== 'yes' ){
    fileActionLoader( A,"", "", "https://wit.audacityteam.org/wiki/" + source + ".txt?time="+ nMillis,section,fn);
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
  setToc( A, false);
  requestSpec( A,page, fromwiki,section);
}

function removeFrame(A){
  var doc = document.getElementById("body");
  doc.innerHTML =
    '<div id="content_here" style="text-align:center;"></div><div id="atitle" style="text-align:center;"><em>No Hotspot Zones Loaded (Yet)</em></div><div id="spec" style="margin-left:10px"></div>';
}

function getArg(arg){
  var line = window.location.href;
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

var timer = 0;

function initContent( classes ){
  if( classes ){
  }
  else {
    classes = "atkContentDiv";
    Annotator = [];
  }
  var base = Annotator.length;
  registerMethods();
  var contentDivs = document.getElementsByClassName( classes );
  for(var i=0;i<contentDivs.length;i++){
    var A = makeAnnotator();
    A.index = i+base;
    A.page = getArg('page' + (i + base)) || contentDivs[i].getAttribute("data-page") || "SmallCrowd";
    A.inner = contentDivs[i].innerHTML;

    // Make the divs etc for the display.
    populateDomElement( A, contentDivs[i] );

    // If it's an existing spec, update it with new data.
    if( (base > 0 ) && (A.page === getArg('page0')) ){
      var spec = Editors[0].MainDiv.value;
      handleNewData( A, spec );
    }
    // else load it with new data.
    else {
      loadDiagram(A, A.page, 'no', 1);
    }
  }
  if( timer )
    clearInterval( timer );
  // Timer is for animation such as rotating earth.
  timer = setInterval(timerCallback, 30);

}

var Editors = [];



function initEditors(){
  registerMethods();

  var contentDivs = document.getElementsByClassName( "atkEditorDiv" );
  for(var i=0;i<contentDivs.length;i++){
    var A = {};
    A.index = i;
    A.page = getArg('page' + i) || contentDivs[i].getAttribute("data-page") || "SmallCrowd";
    A.tab = getArg('action');

    populateEditorElement( A, contentDivs[i] );
    requestSpec(A,A.page, 'remote',1,handleEditorData);
    Editors.push( A );

    //loadDiagram( A, A.page, 'no',1);
  }
  initContent();
  // Timer is for animation such as rotating earth.
  //setInterval(timerCallback, 30);

}

function addPreview(){
  Annotator.splice(1);
  initContent("atkContentDiv2");
}


// Puts wikitext data into the edit page
function handleEditorData(A, data, section){
  A.MainDiv.innerHTML = data;
  // And switches to a different tab, if it should.
  if( A.tab ){
    var widget = document.getElementById( A.tab + 'Tab');
    if( widget ){
      widget.onclick();
    }
  }
}

// Translates wikitext data into html in the page.
function handlePageData(A,data){
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


  data = data.replace( /^======(.*)======/gm, "<h2>$1</h2>" );
  data = data.replace( /^=====(.*)=====/gm, "<h3>$1</h3>" );
  data = data.replace( /\*\*(.*)\*\*/gm, "<b>$1</b>" );
  data = data.replace( /~~(.*)~~/gm, "<s>$1</s>" );
  data = data.replace( /\n'''\n([\s\S]*?)\n'''\n/g, "<pre><xmp>$1</xmp></pre>" );
  data = data.replace( /(\s)http(\S*)(\.\s)/gm, "$1<a href='http$2'>http$2</a>$3" );
  data = data.replace( /(\s)http(\S*)(\s)/gm, "$1<a href='http$2'>http$2</a>$3" );

  data = data.replace( /^\*/gm, "<br> • " );
  data = data.replace( /\n\n([^<])/gm, "<br><br>$1" );
  data = data.replace( /\{\{#widget:WikiDiagram\|page=([_A-Z0-9a-z\u00C0-\u017F]*).*?\}\}/gm, '        <div id="content_here1" class="atkContentDiv2" data-page="$1" style="text-align:center;">\n' +
    '        </div>' );

  var name = A.page;
  name = decodeURI( name );
  name = name.replace(/_/g," ");
  data = "<h1><a href='demos.htm?page0="+A.page+"'>Toolkit/"+name+"</a></h1><hr>"+data;

  div.innerHTML = data;
  addPreview();
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



function registerMethods()
{
  registerMethod( "Image",    0,0, layoutMargined, drawImage);
  registerMethod( "Text",     0,0, layoutMargined, drawText);
  registerMethod( "Geshi",     0,0, layoutMargined, drawGeshi);
  registerMethod( "Circle",   0,0, layoutMargined, drawCircle);
  registerMethod( "Rectangle",0,0, layoutMargined, drawRectangle);
  registerMethod( "Tile",     0,0, layoutMargined, drawTile);
  registerMethod( "Spacer",   0,0, layoutMargined, drawNowt2);

  registerMethod( "Chart",    0,0, layoutMargined, drawChart);
  registerMethod( "Path",     0,0,0, drawPath);
  registerMethod( "Tree",     0,0,0, drawTree);
  registerMethod( "Arrows",   0, sizeNowt,layoutNowt, drawArrows);
  registerMethod( "Prog",     createProg,sizeNowt,layoutNowt, 0);
  registerMethod( "KWIC",   createKwic, 0,0, drawKwic);

}
























