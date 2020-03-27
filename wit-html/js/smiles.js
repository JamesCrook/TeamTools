


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
  obj.S = getBondBetween( obj.S0, obj.S1 );
}

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

  obj.S = getBondBetween( obj.S0, obj.S1 );

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

  setStyles(ctx, obj);
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


  // list the non-carbon attoms.
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
  last = Math.floor(Math.random() * final);
  if( Math.abs( first - last ) < 1){
    first = (first + 1) % final;
  }
  first = nonC[first];
  last  = nonC[last];

  // repel them.
  vx = obj.atoms[first].x - obj.atoms[last].x;
  vy = obj.atoms[first].y - obj.atoms[last].y;
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


function registerSmilesMethods()
{
  registerMethod( "Chem",    0,0, 0, drawBenzene);
  registerMethod( "Chem",    0,0, layoutMolecule, drawMolecule);
  //registerMethod( "Chem",    0, 0, drawChem);
  registerMethod( "Atom",    0,0, layoutAtom, drawAtom);
  registerMethod( "Bond",    0,0, layoutBond, drawBond);
}

registerSmilesMethods();