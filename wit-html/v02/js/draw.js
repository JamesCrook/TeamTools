/**
 * Created by James Crook on 12/27/2017.
 */




function DrawFadedBack( Gui ){
  Gui.BackDraw();
  Gui.Ctx.globalAlpha =
    Audacity.AnnotationMode ? 1.0 : 0.85;
  Gui.Ctx.fillStyle = 'white';
  var R = Gui.Rect;
  Gui.Ctx.fillRect(R[0],R[1], R[2]-R[0], R[3]-R[1]);
  Gui.Ctx.globalAlpha = 1.0;
}

function DrawBlueFade( Gui, x, y, w, h ){
  Gui.Ctx.globalAlpha = 0.1;
  Gui.Ctx.fillStyle = 'blue';
  Gui.Ctx.fillRect(x, y, w, h);
  Gui.Ctx.globalAlpha = 1.0;
}

function DrawBlueSurround( Gui, x, y, w, h ){

  Gui.Ctx.strokeStyle =  'blue';
  Gui.Ctx.lineWidth = 4;
  Gui.Ctx.beginPath();
  Gui.Ctx.rect(x, y, w, h);
  Gui.Ctx.stroke();
}

function DrawDottedSurround( Gui, x, y, w, h ){
  Gui.Ctx.save();
  Gui.Ctx.strokeStyle =  'blue';
  Gui.Ctx.lineWidth = 1;
  Gui.Ctx.setLineDash( [3,1] );
  Gui.Ctx.beginPath();

  Gui.Ctx.rect( x, y, w, h);
  Gui.Ctx.stroke();
  Gui.Ctx.restore();
}


function DrawRedSurround( Gui, x, y, w, h ){
  Gui.Ctx.strokeStyle = 'rgb(0,43,184)';
  Gui.Ctx.lineWidth = 4;
  Gui.Ctx.beginPath();
  Gui.Ctx.rect(x, y, w, h);
  Gui.Ctx.stroke();
}

function DrawArrow( v1,v2, style ){
  if( Audacity.AnnotationMode && (style == 0) )
    return;

  var Head = 'black';
  if( style < 0 ){
    Head = 'grey';
    style = -style;
  }
  var headLength = 27-style*10;
  var headWidth = 5-style;

  var d1 = v2.sub(v1);
  var d2 = d1.normal();
  var d3 = d1.normalPerp();
  var u1 = v1;
  var u2 = v1.add( d1).sub( d2.times( headLength ));
  var u3;
  Gui.Ctx.save();
  if( style == 0 )
    Gui.Ctx.globalAlpha = 0.4;
  Gui.Ctx.strokeStyle = 'black';
  Gui.Ctx.lineWidth = 4-style;
  Gui.Ctx.beginPath();
  Gui.Ctx.moveTo(u1.x(), u1.y());
  Gui.Ctx.lineTo(u2.x(), u2.y());
  Gui.Ctx.stroke();

  Gui.Ctx.fillStyle = Head;
  u1 = u2.add( d3.times(headWidth) );
  u3 = u2.add( d2.times( headLength - headWidth) );
  u2 = u2.sub( d3.times(headWidth) );
  Gui.Ctx.beginPath();
  Gui.Ctx.moveTo(u1.x(), u1.y());
  Gui.Ctx.lineTo(u2.x(), u2.y());
  Gui.Ctx.lineTo(u3.x(), u3.y());
  Gui.Ctx.fill();
  Gui.Ctx.restore();
  //console.log( v2.x );
  //console.log( "from "+v1.asText()+" to "+v2.asText());

}


// Some unused functions to find best arrows
// between boxes.

function Corner( Box, index ){
  if( index == 0)
    return Vec2( Box[0], Box[1] );
  if( index == 1)
    return Vec2( Box[2], Box[1] );
  if( index == 2)
    return Vec2( Box[0], Box[3] );
  return Vec2( Box[2], Box[3] );
}

function MinMax( Box, direction ){
  var i;
  var result = {};
  for( i=0;i<4;i++){
    var dot = dotProd(Corner( Box, i), direction);
    if( i==0 || result.min > dot )
      result.min = dot;
    if( i==0 || result.max < dot )
      result.max = dot;
  }
  return result;
}

function SomeArrow( Box1, Box2, direction ){
  var result = { quality:0, p1: Vec2(0,0), p2: Vec2(0,0)};
  var Limits1, Limits2;
  Limits1 = MinMax( Box1, direction );
  Limits2 = MinMax( Box2, direction );
  var min = Math.max(Limits1.min, Limits2.min );
  var max = Math.min(Limits1.max, Limits2.max );
  result.quality = max - min;
  result.direction = Vec2( direction );
  result.value = (max + min) /2;
  return result;
}

// Finds the 'best' arrow connecting two boxes.
function BestArrow( Box1, Box2 ){
  var Arrow = [];
  // Try four distinct directions for the arrow.
  Arrow.push( SomeArrow( Box1, Box2, Vec2( 1, 0 ) ));
  Arrow.push( SomeArrow( Box1, Box2, Vec2( 0, 1 ) ));
  Arrow.push( SomeArrow( Box1, Box2, Vec2( 0.707, 0.707 ) ));
  Arrow.push( SomeArrow( Box1, Box2, Vec2( 0.707, -0.707 ) ));
  var result = Arrow[0];
  var i;
  for(i=1;i<4;i++){
    if( Arrow[i].quality > result.quality )
      result = Arrow[i];
  }

  return result;
}

