
function getSmileToken( toParse ){
  result = { tok:"", type:'none'};
  n= toParse.str.length;
  if( n===0 )
    return result;
  // extra padding to ensure tok[1] and tok[2] exist.
  var tok = toParse.str + "...";

  // b,c,n,o,p,s are aromatic atoms.
  // The SMILES standard requires two (and three) letter atom names
  // be in square brackets.
  // We relax that, except for:
  // Cs Co Hs Ho Pb Nb No Os Po Sc
  // They need square brackets, otherwise they will be taken as two-atom
  // combinations.


  n = 1;
  // Look for a capital possibly followed by a lower case that isn't
  // one of the lower case aromatics.
  if( ('A' <= tok[0] ) && (tok[0] <= 'Z') )
  {
    result.type = 'atom';
    // if followed by one of the other lower case letters, extend.
    if( ('a' <= tok[1]) && (tok[1] <= 'z') &&
      (Smiles.aromatics.indexOf( tok[1] ) === -1) ){
      n++;
      // and again extend if there's yet another...
      if( ('a' <= tok[2]) && (tok[2] <= 'z') &&
        (Smiles.aromatics.indexOf( tok[2] ) === -1) ){
        n++;
      }
    }
  }
  // Wasn't upper case?  Then if aromatic, it's still an atom.
  else if(Smiles.aromatics.indexOf( tok[0] ) !== -1){
    result.type = 'atom';
  }
  // Maybe it's a bond?
  else if( Smiles.multiplicity.hasOwnProperty( tok[0] ) ){
    result.type = 'bond';
    result.multiplicity = Smiles.multiplicity[ tok[0] ];
  } else if( !isNaN( tok[0] ) ){
    var m= Number( tok[0] );
    if( toParse.noted[m] ){
      // noted stores values+1, so we can test as a bool.
      var ix = toParse.noted[m]-1;
      result.type = 'abond';
      result.multiplicity = 1;//Smiles.multiplicity[ tok[0] ];
      toParse.toAtom = ix;
      toParse.noted[m]=0;
    }
    else {
      toParse.noted[m] = toParse.fromAtom+1;
    }
  }

  // add bond implied by adjacency.
  if( (toParse.was === 'atom' ) && (result.type=== 'atom')){
    result.tok = '-';
    result.type = 'bond';
    result.multiplicity = 1;
  }
  else {
    // We know how many letters.  Take them.
    result.tok = toParse.str.slice(0,n);
    toParse.str = toParse.str.slice( n );
  }

  if( tok[0]==='(' ){
    toParse.stack.push( toParse.fromAtom);
    //console.log( "pushed atom"+(toParse.fromAtom) );
  }

  // for aromatic bond, we're still in 'was atom'.
  if( result.type === 'abond' ){
    result.type = 'bond';
  }
  else if( result.type !== 'none')
    toParse.was = result.type;
  if( result.type === 'atom' ){
    toParse.fromAtom = toParse.nAtoms++;
  }
  if( tok[0]===')' ){
    toParse.fromAtom = toParse.stack.pop();
    //console.log( "popped atom"+toParse.fromAtom );
  }


  return result;
}

var Smiles = {};

// A look up table of colours;
function initSmiles(){
  var mol = "B C N O P S F Cl Br I H";
  mol = mol.split(" ");

  var colours = [
    "rgba(255,181,181,1.0)", //Br
    "rgba(60,60,60,1.0)",  //C
    "rgba(48,80,248,1.0)", //N
    "rgba(255,14,14,1.0)", //O
    "rgba(255,128,0,1.0)", //P
    "rgba(255,255,48,1.0)",//S
    "rgba(144,224,80,1.0)",//F
    "rgba(31,240,31,1.0)", //Cl
    "rgba(166,41,41,1.0)", //Br
    "rgba(148,0,148,1.0)", //I
    "rgba(255,255,255,1.0)", //H
  ];
  Smiles.colours = [];
  for(i=0;i<mol.length;i++){
    Smiles.colours[ mol[i] ] = colours[i];
  }

  var bonds = ". - = # $ : / \\";
  bonds = bonds.split(" ");

  var multiplicity = [
    0, 1, 2, 3, 4, 1.5, 1, 1 ];

  Smiles.multiplicity = [];
  for(i=0;i<bonds.length;i++){
    Smiles.multiplicity[ bonds[i] ] = multiplicity[i];
  }

  Smiles.aromatics = "bcnops";
}

initSmiles();

function rgbOfAtom( at ){
  return Smiles.colours[ at ] || "rgba(60,60,60,1.0)";
}

function layoutMolecule( A, obj, d ){
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  var smilesString = "O=Cc1ccc(O)c(OC)c1";//Vanillin

  //smilesString = "HC(H)(H)H";// Methane
  smilesString = obj.structure;//"CC(=O)NCCC1=CNC2=C1C=C(OC)C=C2"; //melatonin

  obj.atoms = [];
  obj.bonds = [];

  var oldAtom = {cx:10,cy:10};
  x += 40;
  toParse = {};
  toParse.str = smilesString;//"CClHc-B=Br";
  toParse.state = "empty";
  toParse.stack = [];
  toParse.noted = [];
  toParse.nAtoms = 0;
  toParse.fromAtom = -1;
  toParse.toAtom = -1;
  var result;
  do{
    result = getSmileToken( toParse );
    if( result.type === 'atom' ){
      var atom = {};
      atom.cx = x;
      atom.cy = y + yh/2;
      atom.dx=0;
      atom.dy=0;
      atom.r = 10;
      x+= 40;
      atom.value = result.tok;
      atom.colour = rgbOfAtom( result.tok );
      obj.atoms.push( atom );
    }
    if( result.type === 'bond' ){
      var bond = {};
      bond.fromIx = toParse.fromAtom;
      if( obj.atoms.length > 0 ){
        oldAtom = obj.atoms[ toParse.fromAtom];
      }
      bond.S0 = {x:oldAtom.cx, y:oldAtom.cy-10};


      if( toParse.toAtom >=0 ){
        var newAtom = obj.atoms[ toParse.toAtom];
        bond.toIx = toParse.toAtom;
        bond.S1 = {x:newAtom.cx, y:newAtom.cy+10};
        toParse.toAtom = -1;
      }
      else {
        bond.toIx = obj.atoms.length;
        bond.S1 = { x: x, y: y + yh / 2 + 10 };
      }
      bond.multiplicity = result.multiplicity;
      obj.bonds.push( bond );

    }
    if( x > (xw -40) ){
      y+=40;
      x=40;
    }
  }
  while( result.tok !== "" );
}

function layoutAtom( A, obj, d ){
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  obj.r = 10;
  obj.cx = x + xw/2;
  obj.cy = y + yh/2;
  obj.value = obj.value || "C";
}

function layoutBond( A, obj, d ){
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  obj.S0 = {};
  obj.S0.x = x + xw/2 - 50;
  obj.S0.y = y + yh/2;
  obj.S1 = {};
  obj.S1.x = x + xw/2 + 50;
  obj.S1.y = y + yh/2;
  obj.multiplicity = 2;
  obj.S = getLineBetweenPoints(obj.S0, obj.S1);
}

// >>>>>>>>>>>>>>>>>>> Draw Functions >>>>>>>>>>>>>>>>>>>>>>>>>>

function drawAtom(A, obj, d){
  var ctx = A.BackingCanvas.ctx;

  var dx = obj.dx || 0;
  var dy = obj.dy || 0;
  ctx.save();
  ctx.beginPath();
  ctx.arc(obj.cx+dx, obj.cy+dy, obj.r, 0, Math.PI * 2.0, true);
  var rgb = obj.colour ||  "rgba(200,0,0,0.3)";
  ctx.fillStyle = rgb;
  ctx.fill();
  ctx.strokeWidth = 0.1;
  var rgbText = textColourForRgb( rgb );
  ctx.strokeStyle = rgbText;
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = rgbText;
  ctx.font = "16px Arial";
  ctx.fillText(obj.value, obj.cx+dx, obj.cy+dy+6);
  ctx.restore();
}

function drawBondInner(ctx, S, obj){

  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 2;
  // grey rather than black to avoid over-intense.
  ctx.strokeStyle = "rgba(110,110,110,1.0)";
  ctx.translate(S.x, S.y);
  ctx.rotate(S.theta-Math.PI);

  var atomSize = 12; // allows for a little space around.
  var n = obj.multiplicity;
  for(i=0;i<n;i++){
    var p = 3.0*(3*i-n+1)/n;
    ctx.moveTo(atomSize,  p);
    ctx.lineTo( S.l-atomSize,  p);
  }
  ctx.lineWidth = 2;

  ctx.stroke();
  ctx.restore();
}

function drawEnds(ctx, obj, d){
  d = d || 0;
  drawAnEnd(ctx, obj.S[0], "flat", d);
  drawAnEnd(ctx, obj.S[1], "pointed", d);
}

function drawBond(A, obj, d){

  var ctx = A.BackingCanvas.ctx;

  obj.S = getLineBetweenPoints(obj.S0, obj.S1);

  drawBondInner( ctx, obj.S[0], obj );
  //drawEnds(ctx, obj ,-10);
}

function drawBenzene( A, obj, d ){
  if( d.stage !== kStageFillAndText )
    return;


  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  var atom = {};
  atom.r = 10;
  atom.value = "C";

  var bond = {};
  bond.S0 = {};
  bond.S1 = {};

  var cx = x +xw/2;
  var cy = y +yh/2;
  var r1 =  (Math.min(xw, yh) / 2)-atom.r*2;
  r1=50;
  if( r1 < 0 )
    return;

  for( var i=0;i<=6;i++){
    var theta = i*(Math.PI * 2.0)/6.0;
    atom.cx = cx + r1 * Math.cos( theta );
    atom.cy = cy + r1 * Math.sin( theta );
    bond.S1.x = atom.cx;
    bond.S1.y = atom.cy;
    if( i > 0 ){
      bond.multiplicity = ((i%2) === 0)?1:2;
      drawBond(A, bond, d);
      drawAtom(A, atom, d);
    }
    bond.S0.x=atom.cx;
    bond.S0.y=atom.cy;
  }
}

function drawChem(A, obj, d){
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

  applyObjectSettingsToContext(ctx, obj);
  if( obj.cornerRadius )
    drawRoundRect(ctx, x, y, xw, yh, obj.cornerRadius);
  else
    ctx.rect(x, y, xw, yh);
  ctx.fill();
  ctx.stroke();

  //ctx.textAlign = "center";
  //ctx.fillStyle = "rgba(0,0,0,1.0)";
  //ctx.fillText(obj.value, x + xw / 2, y + yh / 2 + 6);
  ctx.restore();
  if( obj.hotspotColour ){
    var ctx2 = A.Hotspots.ctx;
    ctx2.beginPath();
    ctx2.rect(x, y, xw, yh);
    ctx2.fillStyle = obj.hotspotColour;
    ctx2.fill();
  }
  drawBenzene( A, obj, d );
}

function drawMolecule( A, obj, d ){
  if( d.stage !== kStageFillAndText ) return;

  var i;
  minEnergy(A, obj, d);
  for( i = 0; i < obj.atoms.length; i++ ){
    drawAtom(A, obj.atoms[i], d);
  }
  for( i = 0; i < obj.bonds.length; i++ ){
    drawBond(A, obj.bonds[i], d);
  }
}

// <<<<<<<<<<<<<<<<<<<< Draw Functions <<<<<<<<<<<<<<<<<<<<<<<<

var iter = 160;

// Each bond is a spring of length 40, and attempts to set its length.
// Around each atom, the bonds 'try' to form a circle.
// We randomly repel non-carbon atoms that are 'sufficiently far away'
// from each other (by an overly crude metric).
function minEnergy( A, obj, d ){
  var atoms = [];
  var i;
  var j;
  var f;
  var m;
  var n;


  var atomFrom;
  var atomTo;

  if( iter <= 0 )
    return;
  iter--;

  // all atoms move by their dx,dy and jiggle a little.
  // and we populate an empty array of atoms.
  for(i=0;i<obj.atoms.length;i++){
    obj.atoms[i].x = obj.atoms[i].cx + obj.atoms[i].dx +(Math.random()*10-5)*0.1;
    obj.atoms[i].y = obj.atoms[i].cy + obj.atoms[i].dy +(Math.random()*10-5)*0.1;
    atoms.push( [] ); // each joined to nothing.
  }

  // bonds are springs.
  // each actual bond is expected to have a length of 40.
  for( j=0;j<obj.bonds.length; j++){
    var from = obj.bonds[j].fromIx;
    var to = obj.bonds[j].toIx;

    // Build list of 2 way links.
    atoms[from].push( to );
    atoms[to].push( from );

    atomFrom = obj.atoms[from];
    atomTo = obj.atoms[to];


    // use the bond forces (as springs of length 40).
    f = { x: atomFrom.x-atomTo.x,
          y: atomFrom.y-atomTo.y};
    m = (f.x*f.x + f.y*f.y);
    m = Math.sqrt( m );
    n = (m-40)*0.25/(m+0.1);
    f.x = f.x *n;
    f.y = f.y *n;
    if( iter === 0 ){
      console.log( "LINK from "+atomFrom.value + " to " + atomTo.value +" force" +
        " "+f.x + "," + f.y );
    }
    atomFrom.dx -= f.x;
    atomFrom.dy -= f.y;
    atomTo.dx += f.x;
    atomTo.dy += f.y;
  }

  // Assume atoms around one atom will be equally spaced on a circle.
  // Set their lengths and do.
  for(i=0;i<atoms.length;i++){
    if( iter === 0 ){
      var atom = obj.atoms[i];
      console.log( "Atom "+atom.value + " at " + atom.x + "," + atom.y );
    }
    var links = atoms[i].length;
    if( links > 1 ) for( j=0;j<links;j++){
      // Sequential atoms around this atom.
      atomFrom = obj.atoms[atoms[i][j]];
      atomTo = obj.atoms[atoms[i][(j+1)%links]];
      f = { x: atomFrom.x-atomTo.x,
            y: atomFrom.y-atomTo.y};
      m = (f.x*f.x + f.y*f.y);
      m = Math.sqrt( m );
      var vLinks = Math.max( 3, links );
      var idealLength = 70;
      idealLength = 40 * Math.sin( Math.PI / vLinks ) *2;
      n = (m-idealLength)*0.1/(m+0.1);

      // n>0 implies we are too long.
      // only shorten weakly (at 1/10th amount).
      //if( n>0 )
      //  n=n*0.8;

      f.x = f.x * n;
      f.y = f.y * n;
      if( iter === 0 ){
        console.log(
          "REP from " + atomFrom.value + " to " + atomTo.value + " force" +
          " " + f.x + "," + f.y);
      }
      atomFrom.dx -= f.x;
      atomFrom.dy -= f.y;
      atomTo.dx += f.x;
      atomTo.dy += f.y;
    }
  }


  // list the non-carbon atoms.
  var nonC = [];
  for( i=0;i<obj.atoms.length;i++){
    if( obj.atoms[i].value !== "C" ){
      nonC.push( i );
    }
  }


  // pick two non carbon atoms.
  var first = 5;
  var final = nonC.length;
  first = Math.floor(Math.random() * final);
  var last = Math.floor(Math.random() * final);
  if( Math.abs( first - last ) < 1){
    first = (first + 1) % final;
  }
  first = nonC[first];
  last  = nonC[last];

  // repel them.
  var vx = obj.atoms[first].x - obj.atoms[last].x;
  var vy = obj.atoms[first].y - obj.atoms[last].y;
  var pull = 0.05*final*Math.max( 0, iter/2-3);
  // reduce the repulsion for small molecules.
  pull *= (final > 20)?1:0.05;
  console.log( "Iter: " + iter + " Pull: "+pull);
  d = pull/(Math.sqrt( vx * vx + vy * vy ) +0.1);
  vx *= d;
  vy *= d;
  //vx = d;
  //vy = 0;
  obj.atoms[first].dx += vx;
  obj.atoms[first].dy += vy;
  obj.atoms[last].dx -= vx;
  obj.atoms[last].dy -= vy;

  // update x, based on dx, y on dy.
  for(i=0;i<obj.atoms.length;i++){
    obj.atoms[i].x = obj.atoms[i].cx + obj.atoms[i].dx;
    obj.atoms[i].y = obj.atoms[i].cy + obj.atoms[i].dy;
  }



  // now tell all the bonds their ends have moved.
  for( j=0;j<obj.bonds.length; j++){
    var bond = obj.bonds[j];
    atomFrom = obj.atoms[bond.fromIx];
    atomTo = obj.atoms[bond.toIx];
    bond.S0.x = atomFrom.x;
    bond.S0.y = atomFrom.y;
    bond.S1.x = atomTo.x;
    bond.S1.y = atomTo.y;
  }
}

function rulerIxOfx( A, obj, x ){
  return obj.atStart + (x-obj.layout.x0) * obj.itemsPerPixel;
}

function xOfRulerIx( A, obj, ix ){
  return (ix - obj.atStart) / obj.itemsPerPixel + obj.layout.x0;
}

/**
 * Converts mid dragger x position to an Ix and remembers it.
 * @param A
 * @param obj
 */
function computeMidDraggerIx(A, obj){
  var mid = obj.content[1];
  var midx = mid.offset.x + mid.layout.x0;
  //midx=0;
  obj.centerIx = rulerIxOfx(A, obj, midx);
}

/**
 * Converts mid dragger Ix back to an x position, ready for drawing.
 * In conjunction with computeMidDraggerIx this allows the mid dragger
 * to be repositioned for ruler changes.
 * @param A
 * @param obj
 */
function replaceMidDragger(A, obj){
  var mid = obj.content[1];
  var left = obj.content[0];
  var right = obj.content[2];
  var inset = mid.inset;


  obj.itemsPerPixel = (obj.atEnd - obj.atStart) / obj.layout.xw;
  var newpos = xOfRulerIx(A, obj, obj.centerIx);
  //var bak = rulerIxOfx( A, obj, newpos );
  //console.log( "Midx: "+midx + " Ix: "+obj.centerIx + " newx "+newpos+ " atIx
  // "+ bak ); reposition mid-dragger.
  mid.offset.x = constrain( inset, newpos - mid.layout.x0, obj.layout.xw - inset);

  mid.offset.x = constrain( left.offset.x+40, mid.offset.x, right.offset.x-40 );
  computeMidDraggerIx(A, obj );
}

/**
 * Ensures the mid dragger ends up between the left and right dragger.
 * @param A
 * @param obj
 */
function repositionMidDragger(A, obj){
  var mid = obj.content[1];
  var left = obj.content[0];
  var right = obj.content[2];
  var inset = mid.inset;

/*
    obj.itemsPerPixel = (obj.atEnd - obj.atStart) / obj.layout.xw;
    var newpos = xOfRulerIx(A, obj, obj.centerIx);
    //var bak = rulerIxOfx( A, obj, newpos );
    //console.log( "Midx: "+midx + " Ix: "+obj.centerIx + " newx "+newpos+ " atIx
    // "+ bak ); reposition mid-dragger.
    mid.offset.x = constrain( inset, newpos - mid.layout.x0, obj.layout.xw - inset);
*/
  mid.offset.x = constrain( left.offset.x+40, mid.offset.x, right.offset.x-40 );
  computeMidDraggerIx(A, obj );
}

function onRulerClicked(A, obj){
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  if( !A.Status.click )
    return;

  console.log( "Clicked on Object " + obj.id );
  A.dragObj = obj;
  //obj.draggerIx = rulerIxOfx( A, obj, obj.content[1].offset.x);
  obj.offset = {x:A.Status.click.x ,y:A.Status.click.y };
  obj.dragIx = rulerIxOfx( A, obj, A.Status.click.x );
  computeMidDraggerIx(A, obj);
  console.log( "Click Index: "+obj.dragIx );
  console.log( "Center Index: "+obj.centerIx );
}

function setCentreDraggerX(ruler, x){
  var mid = ruler.content[1];
  mid.offset.x = x;
}

function setCentreDraggerY(ruler, y){
  var mid = ruler.content[1];
  mid.yCentre = y;
}

function draggingRuler( A, obj, dd ){
  dd.y = constrain( 20, dd.y, 20 );
  dd.x = constrain( 40, dd.x, 660 );

  var mid = obj.content[1];
  var midx = mid.offset.x + mid.layout.x0;


  //midx=0;
  //console.log("dd.x: "+dd.x);
  var dx = dd.x - midx - obj.layout.x0;
  if( Math.abs( dx) < 0 )
    return;
  var itemsPerPixel = (obj.dragIx - obj.centerIx)/dx;
  if( itemsPerPixel <= 0 )
    return;

  // this size gives us numbers at 0.1, 0.2, and prevents
  // zooming in further than that.
  if( itemsPerPixel < 0.002 )
    return;
  //console.log("New scale: "+scale);
  var startIx = obj.centerIx - mid.offset.x * itemsPerPixel;
  var endIx = obj.centerIx + (obj.layout.xw - mid.offset.x ) * itemsPerPixel;

  obj.atStart = constrain( -70, startIx, 2000 );
  obj.atEnd = constrain( -70, endIx, 2000 );
  replaceMidDragger(A, obj );
}

function onDraggableClicked2(A, obj){
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  if( !A.Status.click )
    return;
  console.log( "Clicked on Ruler Object ", obj.id );
  A.dragObj = obj;
  computeMidDraggerIx(A, obj.parent);
}


/**
 * Dragger can be on its line or slightly below.
 * If below, it moves without dragging.
 * When dragging, gearing is 3x for ruler motion.
 * @param A
 * @param obj
 * @param dd
 */
function draggingMarker( A, obj, dd ){
  var parent = obj.parent;
  var inset = obj.inset;
  dd.y = constrain( 0, dd.y, obj.wobble );
  dd.x = constrain( parent.layout.x0+inset, dd.x,
    parent.layout.x0+parent.layout.xw-inset );

  // code for disengaging the dragger.
  // if we're far enough off the line, disengage.
  if( dd.y >= Math.max(1,obj.wobble) )
    return;

  // offset is used in positioning for drawing.
  var dx = obj.offset.x - dd.x;
  dx *= parent.itemsPerPixel;
  dx *= obj.gearing;
  //dx *=3;
  dx = constrain( -70-parent.atStart, dx, 2000-parent.atEnd );
  parent.atStart += dx;
  parent.atEnd   += dx;
  console.log( "SE: "+ parent.atStart +" "+ parent.atEnd );
  if( obj.glyph === "Mid" )
    return;
  repositionMidDragger(A, obj.parent );
}

var dragNamer = 1234;

function makeDraggerObject(obj, A, pos){
  var dragger = {};
  var l1 = {};
  dragger.layout = l1;
  var l2 = obj.layout;
  var inset = 45;
  l1.x0 = l2.x0;
  l1.y0 = l2.y0+l2.yh-15;
  l1.xw = 15*(1+(pos%2));
  l1.yh = 15;
  dragger.type = "Drag2";
  var types = "L Mid R".split(" ");
  dragger.glyph = types[pos];
  dragger.onClick = onDraggableClicked2;
  dragger.offset = { x: pos * (l2.xw / 2 -inset ) +inset, y: 0};
  dragger.id = "Drag"+(dragNamer++);
  dragger.wobble = 0;
  dragger.gearing = 1;
  dragger.inset = 45;
  addObjectToDictionary(A, dragger);
  dragger.parent = obj;
  obj.content.push(dragger);
  return dragger;
}

/**
 * On finishing mid dragger dragging, it pops back onto its line.
 * (it could have been dragged down slightly)
 * @param A
 * @param obj
 */
function finishMid( A, obj ){
  obj.offset.y = 0;
  A.dragObj = undefined;
  finalDraw( A, obj );
}

/**
 * On finishing left dragger dragging, it goes back to the left end.
 * @param A
 * @param obj
 */
function finishLDragger( A, obj ){
  obj.offset.x = 40 - obj.layout.x0;
  A.dragObj = undefined;
  finalDraw( A, obj );
}

/**
 * On finishing right dragger dragging, it goes back to the right end.
 * @param A
 * @param obj
 */
function finishRDragger( A, obj ){
  obj.offset.x = 660 - obj.layout.x0;
  A.dragObj = undefined;
  finalDraw( A, obj );
}

/**
 * Updates the position of the draggers AND
 * updates the parent object too, if required.
 * @param A
 * @param obj
 * @param d
 */

function updateDraggers(A, obj, d){
  //console.log( "draw - "+obj.type);
  //var stage = d.stage;
  //if( stage !== kStageFillAndText ) return;

  if( obj.content.length === 0 ){
    var dragger;
    dragger = makeDraggerObject(obj, A, 0);
    dragger.dragFn = draggingMarker;
    dragger.onMouseUp = finishLDragger;
    dragger = makeDraggerObject(obj, A, 1);
    dragger.dragFn = draggingMarker;
    // wobble is how far off the horizontal line the dragger can move
    // if it moves as far as possible off the line it 'disengages'.
    //dragger.wobble = 5;
    dragger.gearing= 1;
    dragger.inset = 80;
    dragger.onMouseUp = finishMid;
    dragger = makeDraggerObject(obj, A, 2);
    dragger.dragFn = draggingMarker;
    dragger.onMouseUp = finishRDragger;
  }
  // invokes drawDraggers, but this is actually just doing position updates.
  drawDraggers(A, obj, d );
}

function drawDraggers(A, obj, d){
  //console.log( "draw - "+obj.type);
  drawContainer(A, obj, d);
}


rulerSpec1 = [
  { mod :10, height : 1.0, 'width': 1.7},
  { mod : 5, height : 0.6, 'width': 0.7},
  { mod : 1, height : 0.4, 'width': 0.7}
  ];

rulerSpec2 = [
  { mod :10, height : 1.0, 'width': 1.5},
  { mod : 2, height : 0.5, 'width': 0.7},
  { mod : 1, height : 0.25, 'width': 0.7}
];

rulerSpec = rulerSpec1;
otherSpec = rulerSpec2;

function drawRulerMark( A, obj, i ){
  var l = obj.layout;
  var x = l.x0 + i * obj.pixelsPerBar;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;


  var barCountAtStart = obj.atStart / obj.itemsPerBar;
  i += Math.floor( barCountAtStart );
  x -= (barCountAtStart-Math.floor( barCountAtStart ))*obj.pixelsPerBar;
  var ctx = A.BackingCanvas.ctx;
  var v = rulerSpec[1].mod;

  var j;

  for( j=0;j<2;j++){
    if( i % (v*otherSpec[j].mod) === 0)
      break;
  }
  var spec2 = otherSpec[j];
  var j1=j;

  for( j=0;j<2;j++){
    if( (i % rulerSpec[j].mod) === 0)
      break;
  }
  var spec = rulerSpec[j];

  var height = spec.height;
  var height2 = spec2.height;
  if( j> 1 )
    height2=0;

  // pixelsPerBar is between 3 and 6 or 3 and 15.
  var blend = Math.max( 0, Math.min( (obj.pixelsPerBar-4.5)/1.1, 1.0 ));
  ctx.lineWidth = spec.width;

  height = height2 + blend * (height-height2);


  ctx.beginPath();
  ctx.moveTo( x, y+yh);
  ctx.lineTo( x,y+yh*(1-height*0.6));
  ctx.stroke();

  var opacity = Math.max(0,Math.min( (obj.pixelsPerBar-2.9) /2.1, 1.0));
  if( j1 > 1 )
    opacity=0;
  if( j1 === 0 )
    opacity = 1;

  if( opacity > 0.1){
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.font = "12px Arial";

    ctx.globalAlpha = opacity;
    ctx.textAlign = "center";

    // number to nearest 0.1
    ctx.fillText( ""+ (Math.floor(10*i*obj.itemsPerBar+0.9))/10, x, y+ 8);
    ctx.globalAlpha = 1.0;
  }

}

function drawRuler(A, obj, d){
  //console.log( "draw - "+obj.type);
  var stage = d.stage;

  if(!isDefined( obj.atEnd ) ){
    obj.atStart = 0;
    obj.atEnd = 300;
  }

  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  if( stage===kDragging){
    updateDraggers( A, obj, d );

    if( A.dragObj !== obj )
      return;
    // Calculate new offset
    var dd = newPos( A, obj );
    if( obj.dragFn )
      obj.dragFn( A, obj, dd );
    // And always accept it.
    onLockInMove(A,obj,dd);

    return;
  }
  if( stage!==kStageFillAndText)
    return;


  mayUpdateObjectStyle(A, obj);

  var ctx = A.BackingCanvas.ctx;


  ctx.save();
  ctx.beginPath();

  applyObjectSettingsToContext(ctx, obj);
  if( obj.cornerRadius )
    drawRoundRect(ctx, x, y, xw, yh, obj.cornerRadius);
  else
    ctx.rect(x, y, xw, yh);

  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.strokeWidth = 0.5;
  var i;

  // The lazy way is to draw every single item in the ruler
  // That is just crazy, because the density would be too high.

  // So instead we draw 'bars' which might be every 5th item,
  // every 10, every 20, every 50, every 100...

  // How many to a bar?  Well, we work out a pixel density.
  // A minimum of 3 pixels between bars seems about right.


  obj.itemsPerPixel = (obj.atEnd - obj.atStart)/xw;
  var pixelsPerBar = 100/obj.itemsPerPixel;
  var spec = 0;

  // Each time round this loop is a 10x zoom out
  while( pixelsPerBar > 6){
    spec++;
    pixelsPerBar /= 2;
    if( pixelsPerBar <= 15 )
      break;
    spec++;
    pixelsPerBar /= 5;
  }

  // The number of pixels per bar in turn lets us compute
  // how many items for each bar.
  obj.pixelsPerBar= pixelsPerBar;
  obj.itemsPerBar = obj.itemsPerPixel * pixelsPerBar;

  if( (spec%2) === 1 ){
    rulerSpec = rulerSpec2;
    otherSpec = rulerSpec1;
  } else {
    rulerSpec = rulerSpec1;
    otherSpec = rulerSpec2;
  }

  // Actually draw the 'bars'.
  var nBars = Math.floor( xw / pixelsPerBar)+1;
  for(i=0;i<nBars;i++){
    drawRulerMark( A, obj, i );
  }

  var ctx2 = A.Hotspots.ctx;

  ctx2.save();
  var c = NextAutoColour(A, "");
  AddDown(A,["clickObject",obj.id]);

  ctx2.beginPath();
  ctx2.rect(x, y, xw, yh);
  ctx2.fillStyle = c;
  ctx2.fill();

  drawDraggers(A, obj, d );
  ctx2.restore();

  ctx.restore();
}


function createRuler(A, obj, d){
  obj.onClick = onRulerClicked;//["clickAction",obj.name ];
  obj.dragFn = draggingRuler;
}

function registerSmilesMethods()
{
  registerMethod( "Chem",    0,0, 0, drawBenzene);
  registerMethod( "Chem",    0,0, layoutMolecule, drawMolecule);
  //registerMethod( "Chem",    0, 0, drawChem);
  registerMethod( "Atom",    0,0, layoutAtom, drawAtom);
  registerMethod( "Bond",    0,0, layoutBond, drawBond);
  registerMethod( "Ruler", createRuler,0, layoutMargined, drawRuler);

}

registerSmilesMethods();