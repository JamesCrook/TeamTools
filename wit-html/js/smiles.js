

function drawAtom(A, obj, d){
  var ctx = A.BackingCanvas.ctx;

  ctx.save();
  ctx.beginPath();
  ctx.arc(obj.cx , obj.cy, obj.r, 0, Math.PI * 2.0, true);
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
  ctx.fillText(obj.value, obj.cx, obj.cy+6);


  ctx.restore();

}

function drawMolecule( A, obj, d ){
  var i;
  for(i=0;i<obj.bonds.length;i++){
    drawBond( A, obj.bonds[i], d );
  }
  for(i=0;i<obj.atoms.length;i++){
    drawAtom( A, obj.atoms[i], d );
  }
}

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
  }

  // We know how many letters.  Take them.
  result.tok = toParse.str.slice(0,n);
  toParse.str = toParse.str.slice( n );

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


  // Vanillin
  var thing = "O=Cc1ccc(O)c(OC)c1COCc1cc(C=O)ccc1O";


  obj.atoms = [];
  obj.bonds = [];

  var oldAtom = {};
  x += 40;
  toParse = {};
  toParse.str = thing;//"CClHc-B=Br";
  toParse.state = "empty";
  var result;
  do{
    result = getSmileToken( toParse );
    if( result.type === 'atom' ){
      var atom = {};
      atom.cx = x;
      atom.cy = y + yh/2;
      atom.r = 10;
      x+= 40;
      atom.value = result.tok;
      atom.colour = rgbOfAtom( result.tok );
      obj.atoms.push( atom );
      oldAtom = atom;
    }
    if( result.type === 'bond' ){
      var bond = {};
      bond.fromPt = {x:oldAtom.cx, y:oldAtom.cy};
      bond.toPt = {x:x, y:y+yh/2};
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
  obj.value = "C";
}

function normalizedDifference( pt1, pt2, length ){
  length = length || 1.0;
  var dx = pt2.x - pt1.x;
  var dy = pt2.y - pt1.y;
  var scale = length/Math.sqrt( dx*dx + dy*dy);
  return { x: dx*scale, y: dy*scale };
}

function layoutBond( A, obj, d ){
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  obj.fromPt = {};
  obj.fromPt.x = x + xw/2 - 50;
  obj.fromPt.y = y + yh/2;
  obj.toPt = {};
  obj.toPt.x = x + xw/2 + 50;
  obj.toPt.y = y + yh/2;
  obj.multiplicity = 2;
}

function drawBond(A, obj, d){
  var ctx = A.BackingCanvas.ctx;

  // Should be an error...  but we allow it.
  var d = normalizedDifference( obj.fromPt, obj.toPt, 12 );
  var dPerp = {x:d.y/5,y:-d.x/5};

  ctx.save();
  ctx.beginPath();

  var n = obj.multiplicity;
  for(i=0;i<n;i++){
    var p = (3*i-n+1)/n;
    ctx.moveTo(obj.fromPt.x + d.x+dPerp.x*p, obj.fromPt.y + d.y+dPerp.y*p);
    ctx.lineTo(obj.toPt.x - d.x+dPerp.x*p, obj.toPt.y - d.y+dPerp.y*p);
  }
  ctx.lineWidth = 2;
  // grey rather than black to avoid over-intense.
  ctx.strokeStyle = "rgba(110,110,110,1.0)";
  ctx.stroke();
  ctx.restore();

}



function drawBenzene( A, obj, d ){
  var l = obj.layout;
  var x = l.x0;
  var y = l.y0;
  var xw = l.xw;
  var yh = l.yh;

  var atom = {};
  atom.r = 10;
  atom.value = "C";

  var bond = {};
  bond.fromPt = {};
  bond.toPt = {};

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
    bond.toPt.x = atom.cx;
    bond.toPt.y = atom.cy;
    if( i > 0 ){
      bond.multiplicity = ((i%2) === 0)?1:2;
      drawBond(A, bond, d);
      drawAtom(A, atom, d);
    }
    bond.fromPt.x=atom.cx;
    bond.fromPt.y=atom.cy;
  }
}


function drawChem(A, obj, d){
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
  if( obj.corner_radius )
    drawRoundRect(ctx, x, y, xw, yh, obj.corner_radius);
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


function drawText(A, obj, d){
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
  if( obj.corner_radius )
    drawRoundRect(ctx, x, y, xw, yh, obj.corner_radius);
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


function registerSmilesMethods()
{
  registerMethod( "Text",    0, layoutMargined, drawText);
  registerMethod( "Chem",    0, 0, drawBenzene);
  registerMethod( "Chem",    0, layoutMolecule, drawMolecule);
  //registerMethod( "Chem",    0, 0, drawChem);
  registerMethod( "Atom",    0, layoutAtom, drawAtom);
  registerMethod( "Bond",    0, layoutBond, drawBond);
}

registerSmilesMethods();