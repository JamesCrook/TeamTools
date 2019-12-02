// MDN Pollyfill for startsWith
if( !String.prototype.startsWith ){
  String.prototype.startsWith = function(searchString, position){
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

var Annotator = {};

var A = Annotator;
A.Spec = {}; // the unparsed spec from wiki arrives here.
A.Porthole = {};
A.Porthole.width = 1024;
A.Porthole.height = 567;
A.Porthole.margin = 5;
A.Image = {};
A.Image.imageSrc = './images/AudacityAu19.jpg';
A.Hotspots = {};
A.Hotspots.imageSrc = './images/AudacityAu19HS.png';
A.Focus = {};
A.Focus.radius = 75;
A.Detail = {};
A.Detail.width = 400;
A.Detail.height = 300;

A.AddHot = function(index){
  var actions = {};
  A.Hotspots.Colours[index] = actions;
  A.Hotspots.Colours[roundColour(index)] = actions;
  A.Hotspots.Current = actions;
  actions.Zone = A.Hotspots.count++;
};

A.AddHotExact = function(index){
  var actions = {};
  A.Hotspots.Colours[index] = actions;
  A.Hotspots.Current = actions;
  actions.Zone = A.Hotspots.count++;
};

A.AddButton = function(text){
  A.Buttons.Names.push(text);
  A.AddHot("[0,10," + A.Buttons.Names.length * 5 + ",255]");
};

A.AddInfo = function(){
  A.AddHot("[0,0,5,255]");
};

A.AddDetail = function(text){
  A.Hotspots.Current.Tip = text;
};

A.AddHover = function(text){
  A.Hotspots.Current.Hover = text;
};


// These are for hotspot colours added by a drawn image.
A.NextAutoColour = function(Tip){
  var a = (A.Hotspots.autoColour++) + 256 * 11;

  // Note that Chrome and other
  // browsers may not preserve the
  // alpha exactly, so we do not use that.

  var index = "[" + Math.floor(a / 255) + "," + (a % 256) + ",30,255]";
  var rgb = rgbOfJsonColourTuple(index);
  var actions = A.Hotspots.Colours[index];
  if( actions ) return rgb;

  A.AddHotExact( index );
  A.AddDetail( Tip );

  A.Hotspots.ColourZones = A.Hotspots.ColourZones || [];
  A.Hotspots.ColourZones.push( JSON.parse( index ) );
  A.Hotspots.ColourZoneIx++;

  if( A.Hotspots.ColourZoneIx === 1 ){
    setATitle( A.Caption.text, A.Caption.page, A.Caption.fromWiki );
  }
  return rgb;
};


var Nozone = {};
Nozone.Zone = 0;

function resetHotspots(){
  var A = Annotator;
  A.Hotspots.Colours = [];
  A.Hotspots.count = 0;
  A.Hotspots.autoColour = 0;
  // Bogus entry to catch bad tips.
  A.AddHot("[5,0,0,0]");

  A.Buttons = {};
  A.Buttons.Names = [];
  A.Buttons.chosen = -1;

  A.RootObject = {};
  A.Distortion = {};
}

resetHotspots();



var Status = {};
Status.OldHit = -1;
Status.imagesToCome = 2;
Status.time = 0;

var Message;
var Message2;

function resizeDivs(){
  var A = Annotator;
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

function resizeForImage(img){
  //alert( "RESIZING "+img.width +"x"+img.height );
  A.Porthole.width = img.width;
  A.Porthole.height = img.height;
  // resizeDivs();
  if( Status.isAppReady ) onChart();
}

function innerDraw(){
  Status.drawing = true;
  var ctx = A.BackingCanvas.ctx;
  var ctx2 = A.Hotspots.ctx;
  ctx.clearRect(0, 0, A.Porthole.width, A.Porthole.height);
  ctx2.clearRect(0, 0, A.Porthole.width, A.Porthole.height);

  // Some hotpspot colours are created as needed.
  A.Hotspots.autoColour = 0;
  drawArrows();
  drawCells(A.RootObject, {});
  drawArrowHeads();

  drawButtons();
  Status.drawing = false;
}

function onChart(){
  var A = Annotator;
  console.log("onChart");
  A.Detail.width = A.Porthole.width / 2 - 10;
  A.Detail.height = Math.min(300, A.Porthole.height - 100);

  resizeDivs();

  var d = {};
  sizeCells(A.RootObject, d);
  d.margins = 0;
  layoutCells(0, 0, A.Porthole.width, A.Porthole.height, A.RootObject, d);
  //console.log(A.RootObject.content );
  innerDraw();
  Status.isAppReady = true;

}

function timerCallback(){
  if( Status.isFocus ) return;
  Status.time++;
  if( !Status.drawing ) innerDraw();
}

function onFailedImage(){
  alert("Image failed to load");
}

function detailPosFromCursorPos(x, y){
  var A = Annotator;
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

function drawBar(T, values, i, ix){
  var A = Annotator;
  var vx = values[i][ix];
  var x = i * T.xScaler;
  var y = vx * T.yScaler;
  var ctx = A.BackingCanvas.ctx;
  ctx.beginPath();
  ctx.rect(T.margin + x + (ix - 1) * T.width + T.x0,
    T.yh - (T.margin + y) + T.y0, T.width, y);
  ctx.fillStyle =
    (ix !== 1) ? "rgba(105,205,105,1.0)" : "rgba(105,105,205,1.0)";
  ctx.fill();
  ctx.stroke();
}

function drawLabel(T, values, i){
  var ctx = A.BackingCanvas.ctx;
  var x = i * T.xScaler + T.width + 10;
  var y = T.margin;
  ctx.save();
  ctx.translate(T.margin + x + T.x0, T.yh - (T.margin + y) + T.y0);
  ctx.rotate(-Math.PI / 4);
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(15,35,165,1.0)";
  ctx.fillText(values[i][0], 0, 0);
  ctx.restore();
}

function clearBacking(x0, y0, xw, yh){
  var A = Annotator;

  var ctx = A.BackingCanvas.ctx;
  ctx.beginPath();
  ctx.fillStyle = "rgba(205,205,205,1.0)";
  //ctx.strokeStyle = "rgba( 55, 55,155,1.0)";
  ctx.lineWidth = 1;

  ctx.rect(x0, y0, xw, yh);
  ctx.fill();
  //ctx.stroke();
}

function computeSpacing(T, x0, y0, xw, yh, values){
  T.x0 = x0;
  T.y0 = y0;
  T.xw = xw;
  T.yh = yh;
  T.count = T.count || values.length;
  T.items = T.items || (values[0].length - 1);
  T.margin = 40;
  T.yh += T.margin - 10;
  if( T.width )
    // If width of each item is given, then space between is what's left over
    T.spacer =
      (xw - 2 * T.margin - T.count * T.width * T.items) / (T.count - 1); else {
    // otherwise width of item is determined by spacing between.
    T.spacer = T.spacer || 4;
    T.width = ((xw + T.spacer - 2 * T.margin) / T.count - T.spacer) / T.items;
  }
  T.xScaler = (T.width * T.items + T.spacer);
  T.yScaler = (Math.min(20, Status.time) / 20) * (yh) / 2000.0;
}

function drawSpacedItems(x0, y0, xw, yh, values, fn, T){

  if( !values ) return;
  computeSpacing(T, x0, y0, xw, yh, values);
  for( i = 0; i < T.count; i++ ){
    for( j = 0; j < T.items; j++ ) fn(T, values, i, 1 + j);
  }
}

function drawChart3(x0, y0, xw, yh, obj){
  var T = {};
  T.width = 8;
  clearBacking(x0, y0, xw, yh);
  if( obj.subtype != "labels" ) drawSpacedItems(x0, y0, xw, yh, obj.values,
    drawBar, T);
  T.items = 1;
  if( obj.subtype == "labels" ) drawSpacedItems(x0, y0, xw, yh, obj.values,
    drawLabel, T);
}

function drawDonut(T, values, i, ix){
  var A = Annotator;
  var xw = T.width;
  var x = i * T.xScaler + T.margin + T.x0 + xw / 2;
  var y = T.y0 + T.yh - T.margin - T.width + xw / 2;
  var r = xw / 2;
  var r2 = r * 0.40;
  var t0 = 2.0 * Math.PI * 0.75;
  var t1 = 2.0 * Math.PI * 0.75;
  var colours = ["rgba(105,205,105,1.0)", "rgba(105,105,205,1.0)"];

  // get total
  var total = 0;
  var j;
  for( j = 1; j < values[i].length; j++ ) total = total + values[i][j];

  var ctx = A.BackingCanvas.ctx;

  var frac = Math.min(20, Status.time) / 20;

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
    ctx.fillStyle = colours[j % 2];
    ctx.fill();
    ctx.stroke();
  }
}

function drawPieChart(x0, y0, xw, yh, obj){
  var T = {};
  //T.width = 100;
  T.spacer = 30;
  T.items = 1;
  clearBacking(x0, y0, xw, yh);
  drawSpacedItems(x0, y0, xw, yh, obj.values, drawDonut, T);
}

function xyOfIndexSnakey(i, T){
  var row = Math.floor(i / T.n);
  var col = i - row * T.n;
  if( row % 2 ) col = T.n - col - 1;
  var x = T.x0 + col * T.xSpacing;
  var y = T.y0 + row * T.ySpacing;
  if( T.isPath ){
    T.theta = undefined;
    if( i === 0 ) x -= T.xSpacing; else if( i === T.maxv - 1 ) x += T.xSpacing;
    // end of row
    else if( i % T.n === 0 ){
      T.theta = (3 * Math.PI / 2);
      y -= T.ySpacing / 2;
      T.thetaDirection = (row % 2) === 0;
    }

  }
  return { "x": x, "y": y };
}

function drawMultipleItems(values, T){
  var i = 0;
  var ctx = A.BackingCanvas.ctx;
  var ctx2 = A.Hotspots.ctx;

  // These are concerned with animation - a gradual reveal of the
  // 'stations'.
  // The log heuristic makes us spend a bit
  // longer on very long paths
  var animateTime = 11 * Math.log(values.length + 5);
  var frac = Math.min(animateTime, Status.time) / animateTime;
  var maxv = Math.floor(frac * T.count);

  var reserveColoursTo = A.Hotspots.autoColour + T.count;

  ctx.beginPath();
  ctx.lineWidth = 5;

  var S;
  var j;
  T.isPath = true;
  T.maxv = maxv;
  for( j = 0; i < maxv; j += 2 ){
    if( values[j + 1] === "No Description" ) continue;
    S = T.fn(i, T);
    if( i === 0 ) ctx.moveTo(S.x, S.y); else if( T.theta !==
      undefined ) ctx.arc(S.x, S.y, T.ySpacing / 2, T.theta, T.theta + Math.PI,
      T.thetaDirection); else ctx.lineTo(S.x, S.y);
    i++;

  }
  ctx.strokeStyle = "rgba(0,0,0,1.0)";
  ctx.stroke();
  i = 0;

  T.isPath = false;
  for( j = 0; i < maxv; j += 2 ){
    if( values[j + 1] === "No Description" ) continue;
    var r = 1.6 * Math.log((values[j + 1].length) + 0.1) + T.r0;
    S = T.fn(i, T);
    ctx.beginPath();
    ctx.arc(S.x, S.y, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = "rgba(105,205,105,1.0)";
    ctx.fill();
    //ctx.stroke();

    ctx2.beginPath();
    ctx2.arc(S.x, S.y, r, 0, 2 * Math.PI, false);
    ctx2.closePath();
    ctx2.fillStyle =
      A.NextAutoColour("<h1>" + values[j] + "</h1>" + values[j + 1]);
    ctx2.fill();
    i++;

  }
  A.Hotspots.autoColour = reserveColoursTo;
}

// draws a path inside a box.
function drawPath(x0, y0, xw, yh, obj){
  var T = {};
  //T.width = 100;
  //T.spacer = 30;
  T.items = 1;
  T.count = 0;
  T.width = 15;
  for( let i = 0; i < obj.values.length; i += 2 ){
    if( obj.values[i + 1] !== "No Description" ) T.count++;
  }
  T.margin = 30;
  // The sqrt is so that we get the same density in x and y.
  T.n = Math.ceil(Math.sqrt(T.count) * xw / yh);
  T.m = Math.ceil(T.count / T.n);
  var unused = T.n * T.m - T.count;
  // Make more square, if there is room.
  if( T.n < T.m ) T.m -= Math.floor(unused / T.n); else T.n -=
    Math.floor(unused / T.m);

  //T.spacer = (xw-2* T.margin)/ (T.n-1);
  T.r0 = obj.baseSize || 0;
  T.x0 = x0 + T.margin + T.width / 2;
  T.y0 = y0 + T.margin + T.width / 2;
  T.xSpacing = (xw - 2 * T.margin) / (T.n);
  T.ySpacing = (yh - 2 * T.margin) / (T.m);

  T.fn = xyOfIndexSnakey;
  drawMultipleItems(obj.values, T);
}

// slice is a number from -1 to +1.
// source is a number from 0 to 1.
function sourceForSlice(slice){
  return Math.acos(-slice) / Math.PI;
}

function drawSphere(xx, yy, xw, yh, ctx, obj){
  xw = Math.floor(xw);
  yh = Math.floor(yh);
  //console.log( "Draw at "+xx+","+yy+" ["+xw+" by "+yh+"]");
  var A = Annotator;
  var ctx2 = obj.ctx;
  var img = obj.img;
  //console.log( "From image "+img.width+" by "+img.height);
  if( !ctx2 ){
    obj.canvas = document.createElement("canvas");
    obj.canvas.width = img.width;
    obj.canvas.height = img.height;
    obj.ctx = obj.canvas.getContext('2d');
    ctx2 = obj.ctx;
  }
  ctx2.drawImage(img, 0, 0, img.width, img.height);
  var x0 = xw / 2;
  var rotate = img.width - ((Status.time * 3) % img.width);

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
  var frac = Math.max(0, Math.min(40, Status.time - 120)) / 40;

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

function drawButtons(){
  var A = Annotator;
  var xw = 60;
  var yh = 25;
  var gap = 9;
  var n = A.Buttons.Names.length;
  var m = 1;
  // grid of n by m buttons, with gaps between them.
  var x = (A.Porthole.width - n * (xw + gap) + gap) * 0.5;
  var y = 0;//(A.Porthole.height - m *(yh+gap) + gap) *0.5;
  var ctx = A.BackingCanvas.ctx;
  var ctx2 = A.Hotspots.ctx;
  ctx.lineWidth = 3;
  ctx.font = "16px Arial";
  ctx.strokeStyle = "rgba( 55, 55,155,1.0)";
  ctx2.lineWidth = 0;

  var i;
  for( i = 0; i < n; i++ ){
    var xx = x + i * (xw + gap);
    var yy = y + 1;
    ctx.beginPath();
    if( (i + 1) === A.Buttons.chosen ) ctx.fillStyle =
      "rgba(255,255,255,1.0)"; else ctx.fillStyle = "rgba(205,205,205,1.0)";

    ctx.rect(xx, yy, xw, yh);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,1.0)";
    ctx.fillText(A.Buttons.Names[i], xx + 11, yy + 18);
    ctx2.beginPath();
    ctx2.fillStyle = "rgba(0,10," + (i + 1) * 5 + ",1.0)";
    ctx2.rect(x + i * (xw + gap), y + 0 * (yh + gap), xw, yh);
    ctx2.fill();
  }
  drawInfoButtonHotspot();
}

function roundRect(ctx, x, y, w, h, r){
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

function drawArrow(obj1, obj2){
  var A = Annotator;
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

function drawArrowHead(obj1, obj2){
  var A = Annotator;
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

function drawImage(x, y, xw, yh, obj){
  var A = Annotator;
  var ctx = A.BackingCanvas.ctx;
  var ctx2 = A.Hotspots.ctx;
  if( obj.status !== "arrived" ){
    drawRectangle(x, y, xw, yh, obj);
  } else if( obj.spherical ){
    drawSphere(x, y, xw, yh, ctx, obj);
    drawSphere(x, y, xw, yh, ctx2, obj.hot);
  } else {
    if( obj.stretch == "yes" ){
      // rescaled to fit, aspect ratio ignored.
    } else if( obj.stretch == "no" ){
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
    ctx.drawImage(obj.img, x, y, xw, yh);
    if( obj.hot && obj.hot.status === "arrived" ) ctx2.drawImage(obj.hot.img, x,
      y, xw, yh);
  }
}

function drawRectangle(x, y, xw, yh, obj){
  var A = Annotator;
  var ctx = A.BackingCanvas.ctx;

  ctx.save();
  ctx.beginPath();

  setStyles(ctx, obj);
  if( obj.corner_radius ) roundRect(ctx, x, y, xw, yh,
    obj.corner_radius); else ctx.rect(x, y, xw, yh);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(0,0,0,1.0)";
  ctx.fillText(obj.value, x + xw / 2, y + yh / 2 + 6);
  ctx.restore();
  if( obj.hotspotColour ){
    var ctx2 = A.Hotspots.ctx;
    ctx2.beginPath();
    ctx2.rect(x, y, xw, yh);
    ctx2.fillStyle = obj.hotspotColour;
    ctx2.fill();
  }
}

function drawCircle(x, y, xw, yh, obj){
  var A = Annotator;
  var ctx = A.BackingCanvas.ctx;
  ctx.lineWidth = 3;
  ctx.font = "16px Arial";
  ctx.globalCompositeOperation = 'source-over';

  ctx.save();
  ctx.beginPath();
  setStyles(ctx, obj);

  var r = Math.min(xw, yh) / 2;
  ctx.arc(x + xw / 2, y + yh / 2, r, 0, Math.PI * 2.0, true);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(0,0,0,1.0)";
  ctx.fillText(obj.value, x + xw / 2, y + yh / 2 + 6);
  ctx.restore();
  if( obj.hotspotColour ){
    var ctx2 = A.Hotspots.ctx;
    ctx2.beginPath();
    ctx2.arc(x + xw / 2, y + yh / 2, r, 0, Math.PI * 2.0, true);
    ctx2.fillStyle = obj.hotspotColour;
    ctx2.fill();
  }
}

function drawInfoButtonHotspot(){
  var A = Annotator;
  var xw = 25;
  var yh = 25;
  var x = 5;
  var y = 5;
  var ctx2 = A.Hotspots.ctx;
  ctx2.lineWidth = 0;
  ctx2.beginPath();
  ctx2.fillStyle = "rgba(0,0,5,1.0)";
  ctx2.rect(x, y, xw, yh);
  ctx2.fill();
}

function objFromId(id){
  if( !isDefined(id) ) return id;
  var A = Annotator;
  return A.RootObject.objectDict[id.substr(0, 10)];
}

function drawArrowThing(fn){
  var A = Annotator;
  var arrows = A.RootObject.arrows;
  if( !isDefined(arrows) ) return;
  for( i = 0; i < arrows.length; i += 2 ){
    var obj1 = objFromId(arrows[i]);
    var obj2 = objFromId(arrows[i + 1]);
    if( !isDefined(obj1) || !isDefined(obj2) ) return;
    fn(obj1, obj2);
  }
}

function drawArrows(){
  drawArrowThing(drawArrow);
}

function drawArrowHeads(){
  drawArrowThing(drawArrowHead);
}

function drawInfoButton(){
  var A = Annotator;
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

function drawFocusSpot(x, y){
  var A = Annotator;
  var ctx = A.FocusCanvas.ctx;
  var extra = A.Buttons.Names.length ? 25 : 0;

  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, A.Porthole.width, A.Porthole.height);

  if( y < extra ) return;

  var m = A.Porthole.margin;
  ctx.fillStyle = "rgba( 5,5,5,0.2)";

  ctx.fillRect(m, m + extra, A.Porthole.width - 2 * m,
    A.Porthole.height - 2 * m - extra);

  ctx.fillStyle = "rgba(0,255,255,1.0)";
  ctx.globalCompositeOperation = 'destination-out';

  ctx.beginPath();
  ctx.arc(x, y, A.Focus.radius, 0, Math.PI * 2.0, true);
  ctx.closePath();
  ctx.fill();
}

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

function rgbOfJsonColourTuple(tuple){
  var tuple2 = JSON.parse(tuple);
  return rgbOfColourTuple( tuple2 );
}

function removeAdornments(e){
  Status.isFocus = false;
  if( !Status.isAppReady ) return;
  if( e.shiftKey ) return;
  var A = Annotator;
  var ctx = A.FocusCanvas.ctx;
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, A.Porthole.width, A.Porthole.height);
  A.DetailDiv.style.display = "none";
  Status.OldHit = -1;
}

function actionsFromCursorPos(x, y, flags){
  var A = Annotator;
  if( !A.Hotspots.ctx ) return -1;
  var pixel = A.Hotspots.ctx.getImageData(x, y, 1, 1).data;
  var result = "[" + pixel[0] + "," + pixel[1] + "," + pixel[2] + "," +
    pixel[3] + "]";
  var actions = A.Hotspots.Colours[result] ||
    A.Hotspots.Colours[roundColour(result)] || Nozone;
  if( Message2 ) Message2.innerHTML =
    "Colour &amp; Zone: rgba" + result + ", Zone " + actions.Zone;
  if( flags === "log" ) console.log(roundColour(result) + ",");
  return actions;
}

function setNewImage(url){
  var A = Annotator;
  // Only supported for whole-div images.
  if( (A.RootObject.content.length === 1) &&
    (A.RootObject.content[0].type === "Image") ){
    var obj = A.RootObject.content[0];
    obj.file = url;
    obj.img.src = obj.file;
  }

}

function doAction(action){
  var A = Annotator;
  if( action.Action === "Spec" ) requestSpec(action.Name,
    A.fromWiki); else if( action.Action === "Image" ) setNewImage(
    action.Name); else if( action.Action === "Goto" ){
    window.location.href = action.Name;
  }

}

function mousemoveOnMap(e){
  if( !Status.isAppReady ) return;

  Status.isFocus = true;
  var A = Annotator;
  if( e.shiftKey ) return;

  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  var coordinates = "Coordinates: (" + x + "," + y + ")";

  var pt = detailPosFromCursorPos(x, y);

  drawFocusSpot(x, y);
  drawInfoButton();
  var actions = actionsFromCursorPos(x, y);
  if( Message ) Message.innerHTML = coordinates;
  A.DetailDiv.style.left = pt.x + "px";
  A.DetailDiv.style.top = pt.y + "px";
  if( Status.OldHit !== actions.Zone ){
    Status.OldHit = actions.Zone;

    // Update the detail div
    A.DetailDiv.style.display = (actions.Tip) ? "block" : "none";
    if( actions.Tip ){
      A.DetailDiv.innerHTML = actions.Tip;
    }
    // Do any additional hover action
    if( actions.Hover ){
      A.Buttons.chosen = actions.Zone;
      doAction(actions.Hover);
    }
    e.target.style.cursor = actions.Click ? 'pointer' : 'auto';
  }
}

function onFocusClicked(e){
  if( !Status.isAppReady ) return;

  if( e.shiftKey ) return;

  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  var actions = actionsFromCursorPos(x, y, "log");
  if( actions.Click ){
    doAction(actions.Click);
  }
}

function createDomElements(){
  var A = Annotator;
  var contentHere = document.getElementById("content_here");

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

  A.MainDiv.style.position = "relative";
  A.MainDiv.style.display = "inline-block";
  A.MainDiv.style.marginLeft = "auto";
  A.MainDiv.style.marginRight = "auto";
  A.MainDiv.style.overflow = "hidden";

  A.BackingCanvas.style.position = "absolute";
  A.BackingCanvas.style.left = "0px";
  A.BackingCanvas.style.top = "0px";
  A.BackingCanvas.ctx = A.BackingCanvas.getContext('2d');

  A.FocusCanvas.onmousemove = mousemoveOnMap;
  A.FocusCanvas.onmouseout = removeAdornments;
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
  A.DetailDiv.className = "detaildiv";

  // Hotspot canvas and context do not need to be attached.
  A.Hotspots.canvas = document.createElement('canvas');

  resizeDivs();

}

function updateImages(){
  if( (A.RootObject.content.length === 1) &&
    (A.RootObject.content[0].type === "Image") ){
    var obj = A.RootObject.content[0];
    if( obj.file ){
      obj.img.src = obj.file;
    }
    if( obj.hot && obj.hot.file ){
      obj.hot.img.src = obj.hot.file;
    }
  }
  onChart();
}

function addImagesToDom(){
  var A = Annotator;
  //Status.isAppReady = true;
  A.Backing = {};
  //updateImages();
}

function makeToc(){
  var h = A.Hotspots;
  var str = "<table>";
  for(var i=0;i<h.ColourZones.length;i++){
    var c = h.ColourZones[i];
    // White text for numbers on dark backgrounds, black when light.
    var textColor = ((c[0]+c[1]+c[2])>380) ? 'black':'white';
    var tip = h.Colours[ stringOfTuple( c )].Tip;
    str += "<tr><td>Zone"+
      "<div style='width:30px;height:30px;color:"+textColor+
      ";border:thin solid black;text-align:center;vertical-align:middle;"+
      "line-height:30px;background-color:"+
      rgbOfColourTuple(c)+
      "'>"+i+"</div></td><td>"+tip+"</td></tr>";
  }
  str += "</table>";
  return str;
}

function setToc( text ){
  var div = document.getElementById("tabular_contents");
  if( !div )
    return;
  div.innerHTML = text;

  div.style.display = A.TocShown ? 'block':'none';
  var toggler = document.getElementById("zoneToggler");
  if( !toggler)
    return;
  toggler.innerHTML=A.TocShown ?"-zones":"+zones";

}

function toggleDetailsInToc(){
  var date = new Date();
  var nMillis = date.getTime();
  var contents = makeToc();
  A.TocShown = !(A.TocShown || false);
  var text ="This is the full list of zones:<br>"+contents;
  setToc( text );
  return false;
}

function setATitle(caption, page, fromWiki){
  A.TocShown = false;
  A.Caption = {};
  A.Caption.text = caption;
  A.Caption.page = page;
  A.Caption.fromWiki = fromWiki;

  var atitle = document.getElementById("atitle");
  var str = "<em>" + caption + "</em>";
  if( page ) str +=
    " &nbsp; [ <a href='https://wiki.audacityteam.org/w/index.php?title=Toolbox/" +
    page + "&action=edit'>edit</a> ]"

  if( A.Hotspots.ColourZones && A.Hotspots.ColourZones.length > 0)
    str +=
      " &nbsp; [ <a href='#zonelist' id='zoneToggler'" +
      " onclick='toggleDetailsInToc()'>+zones</a> ]";
  atitle.innerHTML = sanitiseHtml(str);
}

// finds field value to first ; or </pre>
function fieldValue(field, line){
  var value = line.split(field + "=")[1] || "";
  value = value.split("</pre>")[0];
  if( value.indexOf('\n') === -1 ) value = value.split(";")[0];

  return value;
}

function setHover(type, location){
  var A = Annotator;
  var h = A.Hotspots.Current.Hover || {};
  h.Action = type;
  h.Name = location;
  A.Hotspots.Current.Hover = h;
}

function setClick(type, location){
  var A = Annotator;
  var h = A.Hotspots.Current.Click || {};
  h.Action = type;
  h.Name = location;
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

function drawCells(obj, data){
  visit(drawThing, obj, data);
}

function drawContainer(obj, d){
  //console.log( "draw container - "+obj.type);
  var n = obj.content.length;
  for( var i = 0; i < n; i++ ) drawCells(obj.content[i], d);
}

drawThing = {
  "default": function(obj, d){
    //console.log( "draw (default) - "+obj.type);
  }, "VStack": drawContainer, "HStack": drawContainer, "Overlay": drawContainer,

  "Chart": function(obj, d){
    //console.log( "draw - "+obj.type);
    var l = obj.layout;
    drawChart3(l.x0, l.y0, l.xw, l.yh, obj);
  }, "PieChart": function(obj, d){
    //console.log( "draw - "+obj.type);
    var l = obj.layout;
    drawPieChart(l.x0, l.y0, l.xw, l.yh, obj);
  }, "Path": function(obj, d){
    //console.log( "draw - "+obj.type);
    var l = obj.layout;
    drawPath(l.x0, l.y0, l.xw, l.yh, obj);
  }, "Image": function(obj, d){
    //console.log( "draw - "+obj.type);
    var l = obj.layout;
    drawImage(l.x0, l.y0, l.xw, l.yh, obj);
  }, "Rectangle": function(obj, d){
    //console.log( "draw - "+obj.type);
    var l = obj.layout;
    drawRectangle(l.x0, l.y0, l.xw, l.yh, obj);
  }, "Circle": function(obj, d){
    //console.log( "draw - "+obj.type);
    var l = obj.layout;
    drawCircle(l.x0, l.y0, l.xw, l.yh, obj);
  }
};

function sizeCells(obj, data){
  visit(sizeThing, obj, data);
  //console.log( obj.sizing);
}

function sizeCell(obj, d, proportion){
  //console.log( "size cell - "+obj.type);
  obj.sizing = {};
  obj.sizing.min = 0;
  obj.sizing.wants = (proportion === undefined) ? 1.0 : proportion;
  obj.sizing.cumulativeWants = 0.0;
  if( d.hasOwnProperty("sizeAs") && (proportion === undefined) ){
    obj.sizing.wants = d.sizeAs;
    delete d.sizeAs;
  }
}

function sizeContainer(obj, d){
  //console.log( "size container - "+obj.type);
  var n = 0;
  if( obj.content && Array.isArray(obj.content) ) n = obj.content.length;
  sizeCell(obj, d);
  for( var i = 0; i < n; i++ ){
    var o2 = obj.content[i];
    sizeCells(o2, d);
    obj.sizing.min += o2.sizing.min;
    obj.sizing.cumulativeWants += o2.sizing.wants;
  }
}

function sizeContainer2(obj, d){
  sizeContainer(obj, d);
}

sizeThing = {
  "default": sizeContainer, //"VStack":sizeContainer,
  //"HStack":sizeContainer,
  //"Overlay":sizeContainer,

  // SizeAs gives this size to the next object.
  // The size is normally 1, so 2 will increase
  // the size, 0.5 will decrease the size.
  "SizeAs": function(obj, d){
    sizeCell(obj, d, 0.0);
    d.sizeAs = obj.value;
  }, // Spacer makes some open space
  "Spacer": function(obj, d){
    sizeCell(obj, d, obj.value);
  }, "Margins": function(obj, d){
    sizeCell(obj, d, 0.0);
  }

  //"Chart":sizeContainer,
  //"PieChart":sizeCell,
  //"Image":sizeContainer2,
  //"Rectangle":sizeCell,
  //"Circle":sizeCell
};

function layoutCell(x0, y0, xw, yh, obj, d){
  obj.layout = { "x0": x0, "y0": y0, "xw": xw, "yh": yh };
  //console.log( obj.layout );
}

function layoutCells(x0, y0, xw, yh, obj, d){
  layoutCell(x0, y0, xw, yh, obj, d);
  visit(layoutThing, obj, d);
}

function layoutMargined(obj, d){
  //console.log( "layout - "+obj.type);
  var m = d.margins;
  var l = obj.layout;
  layoutCell(l.x0 + m, l.y0 + m, l.xw - 2 * m, l.yh - 2 * m, obj, d);
}

function layoutUnmargined(obj, d){
  //console.log( "layout - "+obj.type);
  var m = 0;
  var l = obj.layout;
  layoutCell(l.x0 + m, l.y0 + m, l.xw - 2 * m, l.yh - 2 * m, obj, d);
}

layoutThing = {
  "default": layoutUnmargined,
  "VStack": function(obj, d){
    //console.log( "layout - "+obj.type);
    var n = obj.content.length;
    var l = obj.layout;
    var k = obj.sizing.cumulativeWants;
    //console.log( "n: "+n+", k:"+k);
    var wantsSoFar = 0.0;
    for( var i = 0; i < n; i++ ){
      var want = obj.content[i].sizing.wants;
      layoutCells(l.x0, l.y0 + (wantsSoFar / k) * l.yh, l.xw, l.yh * (want / k),
        obj.content[i], d);
      wantsSoFar += want;
    }
  },
  "HStack": function(obj, d){
    //console.log( "layout - "+obj.type);
    var n = obj.content.length;
    var l = obj.layout;
    var k = obj.sizing.cumulativeWants;
    //console.log( "n: "+n+", k:"+k);
    var wantsSoFar = 0.0;
    for( var i = 0; i < n; i++ ){
      var want = obj.content[i].sizing.wants;
      layoutCells(l.x0 + (wantsSoFar / k) * l.xw, l.y0, l.xw * (want / k), l.yh,
        obj.content[i], d);
      wantsSoFar += want;
    }
  }, // Superimposed elements, all the same size.
  "Overlay": function(obj, d){
    //console.log( "layout - "+obj.type);
    var n = obj.content.length;
    var l = obj.layout;
    for( var i = 0; i < n; i++ ){
      layoutCells(l.x0, l.y0, l.xw, l.yh, obj.content[i], d);
    }
  },
  "Chart": layoutMargined, //"PieChart":layoutUnmargined,
  "Image": layoutMargined,
  "Rectangle": layoutMargined,
  "Circle": layoutMargined,
  "Margins": function(obj, d){
    d.margins = obj.value;
  }

};

// converts user friendly format into more
// verbose but more uniform format,
// with content and type fields.

// @how has a function for each type of object
// @what is an object to visit
// @data carries extra information into the function
function visit(how, what, data){
  if( how[what.type] ){
    how[what.type].call(how, what, data);
  } else how.default.call(how, what, data);
}

function convertJsonStructure(indent, layout){
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
      convertJsonStructure(indent + "   ", layout.content[i]);
    }
  }
}

function getObjectByName(name){
  if( !name ) return 0;
  if( !A.RootObject.objectDict ) return 0;
  var shortName = name.substr(0, 10);
  return A.RootObject.objectDict[shortName];
}

function isDefined(x){
  var undef;
  return x !== undef;
}

function startChart(){
  A.Porthole.width = 700;
  A.Porthole.height = 400;

  A.RootObject.type = 'VStack';
  A.RootObject.content = [];
  A.RootObject.itemIndex = 0;
  A.RootObject.objectDict = {};
  A.RootObject.objectList = [];

  A.Hotspots.ColourZoneIx = 0;
}

function loadNewDetails(specFileData){
  var A = Annotator;
  var lines = specFileData.split("<pre>");
  setATitle("Caption was missing");
  startChart();
  Status.isAppReady = false;
  for( i = 0; i < lines.length; i++ ){
    var item = lines[i];
    var detail = item.split("TIP=</pre>")[1];
    var file = item.split("[[File:")[1] || "";
    file = file.split("]]")[0] || "";
    if( isFromServer() === "yes" )
      file = "https://wit.audacityteam.org/images/" + file;
    else
      file = "./images/" + file;

    var spec = item.split("[[")[1] || "";
    spec = spec.split("]]")[0] || spec;
    spec = spec.split("|")[0] || spec;

    if( item.startsWith("ZONE:RGBA=(") ){
      var index = fieldValue("RGBA", item);
      index = index.split(" ").join("");
      index = index.replace("(", "[");
      index = index.replace(")", "]");
      console.log("color:" + index);
      A.AddHot(index);
    }
    if( item.startsWith("NEXTZONE:") ){
      if( A.Hotspots.ColourZones ){
        var n = A.Hotspots.ColourZoneIx++ % A.Hotspots.ColourZones.length;
        var c = A.Hotspots.ColourZones[n];
        c = '[' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + ']';
        console.log("next-color:" + c+ "n:"+n);
        A.AddHot(c);
      }
    }
    if( item.startsWith("ZONE:LABEL=") || item.startsWith("BUTTON:LABEL=") ){
      var label = fieldValue("LABEL", item);
      console.log("label:" + label);
      A.AddButton(label);
      if( !detail ) detail = " ";
    }
    if( item.startsWith("HOVER LOAD IMAGE") ){
      console.log("hover-load-image:" + file);
      setHover("Image", file);
    }
    if( item.startsWith("HOVER LOAD SPEC") ){
      file = ("X" + spec).split("Toolbox/")[1] || fieldValue("SPEC", item);
      console.log("hover-load-spec:" + file);
      setHover("Spec", file);
    }
    if( item.startsWith("CLICK LOAD IMAGE") ){
      console.log("click-load-image:" + file);
      setClick("Image", file);
    }
    if( item.startsWith("CLICK LOAD SPEC") ){
      file = ("X" + spec).split("Toolbox/")[1] || fieldValue("SPEC", item);
      console.log("click-load-spec:" + file);
      setClick("Spec", file);
    }
    if( item.startsWith("CLICK GOTO") ){
      file = item.split("GOTO=</pre>")[1] || "";
      // extract a wiki hyperlink.
      file = ("X" + file).split("[")[1] || "";
      file = file.split(" ")[0] || file.split("]")[0] || "";

      console.log("click-goto:" + file);
      setClick("Goto", file);
    }
    if( item.startsWith("DISTORTION") ){
      console.log("distortion:");
      var obj = A.RootObject.lastImage;
      if( !obj ) continue;
      obj.spherical = true;

    }
    if( item.startsWith("COLOURSET=") ){
      var data = fieldValue("OURSET", item);
      console.log("colour-data:" + data);
      var obj = JSON.parse(data);
      //console.log(obj);
      A.Hotspots.ColourZones = A.Hotspots.ColourZones || [];
      A.Hotspots.ColourZones = A.Hotspots.ColourZones.concat( obj );
      A.Hotspots.ColourZoneIx = A.Hotspots.ColourZoneIx || 0;
    }
    if( item.startsWith("ZONECOLOURS=") ){
      var data = fieldValue("COLOURS", item);
      console.log("colour-data:" + data);
      var obj = JSON.parse(data);
      console.log(obj);
      A.Hotspots.ColourZones = A.Hotspots.ColourZones || [];
      A.Hotspots.ColourZones = A.Hotspots.ColourZones.concat( obj );
      A.Hotspots.ColourZoneIx = A.Hotspots.ColourZoneIx || 0;

    }
    if( item.startsWith("FLOWCHART:") || item.startsWith("ADD:") ){
      var data = fieldValue("DATA", item);
      console.log("flow-data:" + data);
      var container = [];
      var json = JSON.parse(data);
      //console.log(obj);
      if( !Array.isArray(json) ) container.push(json); else container = json;

      for( var kk = 0; kk < container.length; kk++ ){
        convertJsonStructure("", container[kk]);
        A.RootObject.content.push(container[kk]);
      }
      //console.log(obj);
    }
    if( item.startsWith("CHART") ){
      // Chart relies on a values array that holds the data.
      var data = fieldValue("DATA", item);
      console.log("chart-data:" + data);
      var obj = JSON.parse(data);
      convertJsonStructure("", obj);
      obj.content = [];
      obj.type = "Chart";

      A.RootObject.content.push(obj);
    }
    if( item.startsWith("IMAGE") ){
      console.log("image:" + file);
      var obj = getObjectByName(fieldValue("NAME", item));
      if( obj ){
        obj.resize = false;
      } else {
        obj = {};
        obj.Image = file;
        convertJsonStructure("", obj);
        obj.resize = A.RootObject.content.length === 0;
        obj.spherical = false;
        obj.stretch = "preserve-aspect";
        A.RootObject.content.push(obj);
      }
      A.RootObject.lastImage = obj;

      obj.status = "asked";
      obj.file = file;
      obj.content = [];
      obj.img = document.createElement("img");
      obj.img.onload = (function(){
        var obj1 = obj;
        return function(){
          obj1.status = "arrived";
          console.log(obj1.file + " image arrived");
          //alert("Loaded image " + obj1.file);
          if( obj1.resize ) resizeForImage(
            obj1.img);
          else if( Status.isAppReady )
            onChart();
        }
      })();
      obj.img.onerror = (function(){
        var obj1 = obj;
        return function(){
          obj1.status = "failed";
          alert("Failed to load image " + obj1.file);
        }
      })();
      obj.img.src = file;

    }
    if( item.startsWith("HOTSPOTS") ){
      console.log("hotspots:" + file);
      var obj = A.RootObject.lastImage;
      if( !obj ) continue;

      obj.hot = {};
      obj.hot.status = "asked";
      obj.hot.file = file;
      obj.hot.img = document.createElement("img");
      obj.hot.img.onload = (function(){
        var obj1 = obj;
        return function(){
          obj1.hot.status = "arrived";
          console.log(obj1.file + " HS arrived");
          if( Status.isAppReady ) drawCells(A.RootObject, {});
        }
      })();
      obj.hot.img.onerror = (function(){
        var obj1 = obj;
        return function(){
          obj1.status = "failed";
          alert("Failed to load hotspots " + obj1.hot.file);
        }
      })();
      obj.hot.img.src = file;
    }

    if( item.startsWith("NEXTOBJECT:") ){
      if( !isDefined(A.RootObject.objectList) ) continue;
      var n = A.RootObject.itemIndex++;
      obj = A.RootObject.objectList[n];
      if( !isDefined(obj) ) continue;

      var data;
      data = fieldValue("COLOUR", item);
      if( data ) obj.colour = data;
      data = fieldValue("BCOLOUR", item);
      if( data ) obj.bcolour = data;
      data = fieldValue("CORNER_RADIUS", item);
      if( data && (!isNaN(Number(data))) ) obj.corner_radius = Number(data);
      if( detail ){
        detail = sanitiseHtml(detail);
        var c = A.NextAutoColour(detail);
        detail = ""; //so as not to add it twice.
        obj.hotspotColour = c;
      }
    }

    if( item.startsWith("ARROWS:") ){
      var data = fieldValue("DATA", item);
      console.log("arrow-data:" + data);
      var obj = JSON.parse(data);
      //console.log(obj);
      A.RootObject.arrows = obj;
    }

    if( item.startsWith("CREDITS") ){
      A.caption = fieldValue("CAPTION", item);
      console.log("caption:" + A.caption);
      setATitle(A.caption, A.page, A.fromWiki);
      // Reserve a colour for the info button.
      A.AddInfo();
    }
    if( detail ){
      detail = sanitiseHtml(detail);
      console.log(" <<<" + detail + ">>>");
      A.AddDetail(detail);
    }
  }
  Status.time = 0;
  updateImages();
}

function handleNewData(data){
  var spec = document.getElementById("spec");
  // for debugging...
  //spec.innerHTML = data.split("<pre>START</pre>")[1];
  resetHotspots();
  loadNewDetails(data);
}

/**
 * Loads one source file into an item in an array.
 * @param data
 * @param action
 * @param url
 * @param data
 * @param action
 * @param url
 */
function fileActionLoader(data, action, url){
  var txtFile = new XMLHttpRequest();
  // CDNs and Varnish should give us the very latest.
  txtFile.onreadystatechange = function(){
    if( this.readyState === 4 && this.status === 200 ){
      // data.push({ action: action, value: this.responseText});
      handleNewData(this.responseText);
    }
  };

  txtFile.open("GET", url, true);
  //txtFile.setRequestHeader( "Cache-Control", "s-maxage=0" );
  txtFile.send();
}

function requestSpec(source, fromwiki){
  var A = Annotator;
  A.SpecName = source;

  if( isFromServer() === "no" )
  {
    fileActionLoader("", "", "./raw/raw_spec_" + source + ".txt");
  } else  if( fromwiki !== 'yes' ){
    fileActionLoader("", "", "https://wit.audacityteam.org/raw/raw_spec_" + source + ".txt?time="+ nMillis);
  }

    else {
    var date = new Date();
    var nMillis = date.getTime();
    // action=raw to get unprocessed file from wiki.
    // time=nMillis to avoid issues with cached content.
    fileActionLoader("", "",
      "https://wiki.audacityteam.org/wiki/Toolbox/" + source +
      "?action=raw&time=" + nMillis);
  }

}

function loadDiagram(source, fromwiki){
  var spec = document.getElementById("spec");
  spec.innerHTML = "";
  setToc("");
  requestSpec(source, fromwiki);
}

function removeFrame(){
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