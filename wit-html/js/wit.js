/**
 * Created by James Crook on 1/3/2018.
 */


var App = Audacity;
var Scroller;
var UrlHolder;
var DoxyUrlHolder;
var RemoteUrl = "";
var MenuComponent = "";
var BoxComponent = "";
var Message = null;
var Annotated = {available:false};
var Clicker = {};
var Gui = {};
var Level = 0;
var MenuMode = false;
var ClickedBox = -1;
var HoverBox = -1;
var LastHover = -2;
var TargetName = "";
var emptyOK = true;
var notIfEmpty = false;
var isAppReady = false;

var Async = [];


// @return var
function FindBox(Source, x, y, Level){

  var i;
  var v;
  var boxes = Source.Boxes[ Level ];
  Source.ThisIx = -1;
  //console.log( "Finding x:"+x+" y:"+y);
  for( i = 0; i < boxes.length; i++ ){
    v = boxes[i];
    if( (v[0] <= x) && (v[1] <= y) && ( v[2] >= x ) &&
      (v[3] >= y ) ){
      Source.ThisIx = i;
      break;
    }
  }
  return Source.ThisIx;
}

// Finds subitems from the main list at the chosen level.
function Extract( List, from, level ){
  var result = [];
  var i;
  for( i=from;i<List.length;i++){
    var lev = List[i][0];
    if( lev < level ){
      return result;
    }
    if( lev ==level ){
      var Item = List[i];
      var Entry =
        [ Item[1], Item[2], Item[3], Item[4], Item[5],i];
      result.push( Entry );
    }
  }
  return result;
}

/**
 *
 * @param string
 * @returns {string}
 */
function CapitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @param string
 * @returns {string}
 */
function CapitaliseFirstLetters( string ){
  var pieces = string.split("_");
  var newPieces = pieces.map( CapitalizeFirstLetter );
  return newPieces.join( "_" );
}

function GuiInit(){

  var i;
/*
  var Arr = App.BoxUrls;
  for(i=0;i<Arr.length;i++){
    var str1 = Arr[i][0];
    var str = Arr[i][1];
    var pieces = str.split( '#');
    pieces[0] = CapitaliseFirstLetters( pieces[0] );
    str = pieces.join( '#');
    console.log("  [\""+str1 + "\",\""+str +"\"],");
    Arr[i][1] = str;
  }
*/
  App.Doxy = [];
  var Arr = App.DoxyLinks;
  for(i=0;i<Arr.length;i++){
    if( Arr[i][0] != "" ){
      var str = Arr[i][2].replace( '&','');
      App.Doxy[ str ] = [ Arr[i][0], Arr[i][1] ];
    }
  }
  //console.log( App.Doxy );
  App.Doxy2 = [];
  Arr = App.DoxyBoxes;
  for(i=0;i<Arr.length;i++){
    if( Arr[i].length > 1){
      var str = Arr[i][1];
      var name = Arr[i][0];
      if( name.indexOf( ".html" ) >= 0 ){
        name = name.replace(".html", "");
        App.Doxy2[str] = [Arr[i][0], name];
      }
      else if( App.Doxy[ name ] ){
        var pair = App.Doxy[name];
        App.Doxy2[ str ] = [
          "class_audacity_project.html#" + pair[0], pair[1] ];
      }
    }
    else {
      var search = Arr[i][0];
      var search2 = search.replace( /_/g, ' ' );
      if( App.Doxy[ search2 ] ){
        var pair = App.Doxy[search2];
        App.Doxy2[ search2 ] = [
          "class_audacity_project.html#" + pair[0], pair[1] ];
      }
    }
  }
  //console.log( App.Doxy2 );


  //Gui.Boxes = [ image_boxes, [], [] ];
  Gui.Boxes = [ Extract( App.Boxes, 0,1),[],[],[],[],[],[]];
  Gui.Img = document.getElementById("Gui");
  Gui.Canvas = document.getElementById("GuiCanvas");
  Gui.Ctx = Gui.Canvas.getContext("2d");
  Gui.DoesFade = true;
  Gui.Rect = [0,0,1225,587];
  Gui.BackDraw = function() { Gui.Ctx.drawImage(Gui.Img, 0, 0);};
  Gui.FrontDraw = function( x,y,w,h ){
    Gui.Ctx.drawImage(Gui.Img, x, y, w, h, x, y, w, h);
  }
}

function ClickerInit(){
  //Clicker.Boxes = [ clicker_boxes, [],[]];
  Clicker.Boxes = [ Extract( App.Boxes, 0,1),[],[],[],[],[],[]];
  Clicker.Img = document.getElementById("Gui");
  Clicker.Canvas = document.getElementById("GuiCanvas");
  Clicker.Ctx = Gui.Canvas.getContext("2d");
  Clicker.DoesFade = false;
  Clicker.Rect = [0,583,1225,740];
  Clicker.BackDraw = function(){
    var G = Clicker;
    var YY = Gui.Img.height;
    G.Ctx.fillStyle = 'white';
    G.Ctx.fillRect(0, YY, G.Canvas.width, G.Canvas.height-YY);
  };
  Clicker.FrontDraw = RedrawClicker;
}

/**
 *
 * @returns {boolean}
 * @constructor
 */
function EmptyLevel(){
  ClickedBox = HoverBox;
  HoverBox = -1;
  LastHover = -2;

  Gui.Boxes[ Level+1 ] = [];
  Clicker.Boxes[ Level+1 ] = [];
  Level += 1;
  return true;

}

/**
 *
 * @param delta
 * @param emptyOK
 * @returns {boolean}
 * @constructor
 */
function ChangeLevel( delta, emptyOK ){
  if( Level + delta > 4 ){
    return false;
  }
  if( (Level + delta) < 0 ){
    return false;
  }
  if( HoverBox < 0 )
    return false;
  if( delta == 1){
    var index = Gui.Boxes[ Level ][HoverBox][5]+1;
    var inside = Extract( App.Boxes,index, Level+2 );
    if( !emptyOK && inside.length < 1)
      return false;

    //console.log( "Descending: ", inside );
    ClickedBox = HoverBox;
    HoverBox = -1;
    LastHover = -2;

    Gui.Boxes[ Level+1 ] = inside;
    // Rather than deep copy the extracted items,
    // we just extract them a second time.
    inside = Extract( App.Boxes,index, Level+2 );
    Clicker.Boxes[ Level+1 ] = inside;
    Level += 1;
    return inside.length >= 1;
  }
  return false;
}

// Draws one text item
function DrawClicky( G, Where, Box ){
  var str = Box[4];
  var XX = Where[0];
  var YY = Where[1];

  G.Ctx.font = "900 14px Helvetica";// heavier than bold.
  var w = Math.ceil(G.Ctx.measureText(str).width) + 30;
  G.Ctx.fillStyle = 'rgb(0,43,184)';
  G.Ctx.fillText(str, XX + 15, YY + 22);
  Box[0] = XX;
  Box[1] = YY;
  XX += w;
  Box[2] = XX;
  Box[3] = YY + Where[3];

  Where[0]=XX;
  Where[1]=YY;

}

function DrawAnnotationBox( name, x1,y1,x2,y2 )
{
  var BorderLeft = Math.min(5, x1);
  var BorderTop = Math.min(5, y1);
  x1 -= BorderLeft;
  y1 -= BorderTop;
  x2 +=5;
  y2 +=5;

  Annotated.x = x1+1;
  Annotated.y = y1+1;
  Annotated.width = x2 - x1 -2;
  Annotated.height = y2 - y1 -2;

  Annotated.name = name + (App.AnnotationMode ? "" :"A");
  Annotated.available = true;

  if( !App.AnnotationMode )
    return;

  DrawDottedSurround(Clicker, x1, y1, x2 - x1, y2 - y1);
}



function RedrawClicker(){
  var G = Clicker;
  var i;
  var YY = Gui.Img.height+4;
  var LL = Level;
  if( LL > 0 )
    LL-=1;

  // Clicker at bottom of image...
  var Channels = [[ 40, YY, 1225-40, 30 ],[ 40, YY+30, 1225-40, 30 ]];
  for( i = 0; i < G.Boxes[LL].length; i++ ){
    DrawClicky( G, Channels[i%2], G.Boxes[LL][i] )
  }
  if( Level < 1)
    return;

  // Clicker superimposed on image...
  LL=Level;
  var BoxRow = Gui.Boxes[LL-1][ClickedBox];
  var Start = Math.max( 2, BoxRow[0] - 122);

  Channels =[];
  // Spread potentially increases vertical spread between the two
  // rows of annotations.
  var Spread = Math.min( Math.max( BoxRow[1]-70, 10 ), 30);
  Channels.push( [Start, BoxRow[1]-40-Spread, 0, 30] );
  // If there is vertical space, then a second row.
  if( Gui.Rect[3]-BoxRow[3] > 83 )
    Channels.push( [Start, BoxRow[3]+10+Spread, 0, 30] );

  var x1 = Channels[0][0];
  var y1 = Channels[0][1];
  for( i = 0; i < G.Boxes[LL].length; i++ ){
    DrawClicky( G, Channels[i%Channels.length], G.Boxes[LL][i] )
    var x = G.Boxes[LL][i][5];
    var BX = App.Boxes[ x ];
    //console.log( BX );
    var BC =  G.Boxes[LL][i];
    BX[6] = BC[0];
    BX[7] = BC[1];
    BX[8] = BC[2];
    BX[9] = BC[3];
  }

  var x2 = BoxRow[2];
  var y2 = BoxRow[3];
  x2 = Math.max( x2, Channels[0][0]);
  y2 = Math.max( y2, Channels[0][1]+30);
  if( Channels.length > 1 ){
    x2 = Math.max(x2, Channels[1][0]);
    y2 = Math.max(y2, Channels[1][1] + 30);
  }

  var box = BoxRow[5];
  DrawAnnotationBox( App.Boxes[box][5].replace(/ /g,'') + "Annotated", x1, y1, x2, y2 );
}

function AffineBoxes(){
  var i;
  for(i=0;i<AudacityDoxed.Boxes.length;i++){
    var Box = AudacityDoxed.Boxes[i];
    Box[1] = Box[1] * 600/868 + 132;
    Box[2] = Box[2] * 600/868 + 90;
    Box[3] = Box[3] * 600/868 + 132;
    Box[4] = Box[4] * 600/868 + 90;
  }

}


window.onload = function(){
  Message = document.getElementById("message");
  Scroller = document.getElementById("scroller");
  UrlHolder = document.getElementById("url-holder");
  DoxyUrlHolder = document.getElementById("doxy-url-holder");
  AffineBoxes();
  GuiInit();
  ClickerInit();
  MayRefresh();
  isAppReady = true;
}

/**
 * Draws one level of a menu.
 * @param from - item in list of menus to start from.
 */
function DrawMenu( from ){
  var MenuIndent = App.Menus[from][0];
  // A fixup, only for drawing.
  if( Menu.bar )
    Menu.width = 865;
  DrawMenuBack( Menu.x,Menu.y );
  var Res = { x:Menu.x, y:Menu.y};
  var i;
  // iterate through the menu items.
  for(i=from;i<App.Menus.length;i++){
    // stop iterating when the indent drops back.
    if( App.Menus[i][0] < MenuIndent )
      return;
    // Highlight the hovered item.
    var Option = ( Gui.Boxes[Level].length == HoverBox) ?
      menuSelected : 0;
    // Also highlight any selected (i.e. clicked by user) item.
    if( Gui.Boxes[Menu.Level].length == Menu.iSel )
      Option = menuSelected;
    if( App.Menus[i][0] == MenuIndent ){
      Res = (Menu.bar ? DrawBarItem : DrawItem)( i, Res.x,Res.y,
        App.Menus[i][2],
        App.Menus[i][3],
        App.Menus[i][1] | Option );
    }
  }
}

function SizeMenu( from ){
  var MenuLevel = App.Menus[from][0];
  Menu.tWidth = 0;
  Menu.aWidth = 0;
  var Res = { x:0, y:0};
  var i;
  for(i=from;i<App.Menus.length;i++){
    if( App.Menus[i][0] < MenuLevel )
      break;
    if( App.Menus[i][0] == MenuLevel ){
      Res = (Menu.bar ? SizeBarItem : SizeItem)
      ( i, Res.x, Res.y, App.Menus[i][2],
        App.Menus[i][3], App.Menus[i][1]);
    }
  }
  Menu.x =2;
  Menu.y = 30;
  if( Menu.bar ){
    Menu.width = Res.x;
    Menu.height = 22;
  }
  else {
    Menu.width = Menu.tWidth + Menu.aWidth + 70;
    Menu.height = Res.y + 7;
    if( MenuLevel == 1){
      var Box =Gui.Boxes[1][Menu.iHover];
      Menu.x = Box[0];
      Menu.y = Box[3];
    } else {
      var Box =Gui.Boxes[MenuLevel][Menu.iHover];
      Menu.x = Box[2];
      Menu.y = Box[1];
    }

  }
}



function RefreshImage(Gui){
  var backfade = (Level > 0) && Gui.DoesFade;

  if( MenuMode ){
    if( !Gui.DoesFade ){
      Gui.BackDraw();
      return;
    }
    DrawFadedBack( Gui );
    var i;
    for( i=1;i<=Math.min( 3,Level);i++){
      Gui.Boxes[i] = [];
      Menu = Menus[i];
      Menu.bar = (i==1);
      Menu.Level = i;
      SizeMenu( Menu.item );

      // This calculation may move a second menu up relative to
      // its usual position to use less vertical space in the manual.
      if( App.AnnotationMode && (i==3) ){
        var extraY = Menu.height - Menus[2].height;
        extraY += Menu.y - Menus[2].y;
        Menu.y -= Math.max( 0, extraY);
        Menu.y = Math.max( Menu.y, Menus[2].y );
      }
      DrawMenu( Menu.item );
    }

    // Compute bounding box.
    var iStart =(Level<2) ? 1:2;
    var x1 = Menus[iStart].x;
    var y1 = Menus[1].y;
    var x2 = x1;
    var y2 = y1;
    x1 = x1 - 22;
    for( i=iStart;i<=Math.min( 3,Level);i++){
      Menu = Menus[i];
      x2 = Math.max( x2, Menu.x + Menu.width);
      y2 = Math.max( y2, Menu.y + Menu.height);
    }
    var name = "MenuBar";
    var ix;

    if( Level >= 2 ){
      ix = Menus[2].item-1;
      name = App.Menus[ix][2];
    }

    if( Level > 2 ){
      ix = Menus[3].item-1;
      name = name + "-"+App.Menus[ix][2];
    }
    name = name.replace( / /g, '_' );
    if( Level >= 2 )
      name = name + "Menu";
    DrawAnnotationBox(name, x1, y1, x2, y2 );

    return;
  }

  if( backfade ){
    DrawFadedBack( Gui );


    var box = Gui.Boxes[Level - 1][ClickedBox];
    var x = box[0];
    var y = box[1];
    var w = box[2] - box[0];
    var h = box[3] - box[1];
    Gui.FrontDraw( x, y, w, h );
    DrawRedSurround(Gui, x, y, w, h);
  }

  if( !backfade) {
    Gui.BackDraw();
    Gui.FrontDraw();
    // Connect parent box...
    ConnectBoxes(Level - 1, ClickedBox, 0);
    var i;
    if( Level > 0 ){
      for( i=0;i<Gui.Boxes[Level].length; i++){
        ConnectBoxes( Level, i, 1 );
      }
    } else if( App.AnnotationMode ) {
      var dx = Gui.DoesFade ? 3 :-10;
      var dy = Gui.DoesFade ? 20 : 25;
      Gui.Ctx.font = "900 24px Helvetica";// heavier than bold.
      Gui.Ctx.fillStyle = 'rgb(0,43,184)';
      for( i=0;i<Gui.Boxes[0].length; i++){
        x = Gui.Boxes[0][i][0]+dx;
        y = Gui.Boxes[0][i][1]+dy;
        var text = Gui.Boxes[0][i][4];
        Gui.Ctx.fillText( "" +(i+1), x, y);
        //console.log( text, i+1, x, y );
      }
      var G = window.Gui;
      Annotated.x = G.Rect[0];
      Annotated.y = G.Rect[1];
      Annotated.width = G.Rect[2]-G.Rect[0];
      Annotated.height = G.Rect[3]-G.Rect[1];

      Annotated.name = "AmazingImageMap";
      Annotated.available = true;

    }
  }



  // The highlighted box...
  if( HoverBox < 0 )
    return;

  var box = Gui.Boxes[ Level][HoverBox];
  var x = box[0];
  var y = box[1];
  var w = box[2] - box[0];
  var h = box[3] - box[1];
  DrawBlueFade( Gui, x,y,w,h);
  DrawBlueSurround( Gui, x,y,w,h );

}



function ScrollTo( Target ){
  var i;
  for(i=0;i<App.BoxUrls.length;i++){
    if( App.BoxUrls[i][0] == Target){
      var src = App.BoxUrls[i][1];
      Scroller.src = "./scroller-contents/" + src;
      //console.log("Scroll to: "+Target + " : " + src );
      return;
    }
  }
  console.log("Scroll to: "+Target + " -no match-");
}

function ScrollToUrl( Target ){
  if( App.KeepPanel )
    return;
  if( Target == "" )
    return;
  Scroller.src = "./scroller-contents/" + Target;
  //console.log("Scroll to: "+Target + " -URL-");
}

function ConnectBoxes(level, boxIx, style){
  if( level < 0 )
    return;
  var b1 = Gui.Boxes[ level][boxIx ];
  var b2 = Clicker.Boxes[ level][boxIx ];

  var x1 = (b1[0]+b1[2])/2;
  var y1 = b1[3];
  var x2 = (b2[0]+b2[2])/2;
  var y2 = b2[1];
  if( y1 > y2 ){
    y2 = b2[3];
    y1 = b1[1];
  }
  var xmin;
  var xmax;
  var h;
  var bImproved = false;
  var TextEnd = 20;
  // d is the margin on the target in which arrow must not land.
  // allow margin of 1/4 of width, or 5px whichever is less.
  // in particular the mid point of the target is always acceptable.
  var d = Math.min( 5, (b1[2]-b1[0])/4);
  // Possibly vertical arrow.
  if( !bImproved ){
    xmin = Math.max( b2[0]+TextEnd,b1[0]+d);
    xmax = Math.min( b2[2]-TextEnd,b1[2]-d);
    if( xmin <= xmax ){
      x2 = (xmin + xmax) / 2;
      x1 = x2;
      bImproved = true;
    }
  }

  // Only short lines are encouraged to take standard slopes.
  if( (y2-y1 < 200 ) ){
    if( !bImproved ){
      h = y2 - y1;
      h *= 1.5;
      xmin = Math.max(b2[0] + TextEnd, b1[0] - h);
      xmax = Math.min(b2[2] - TextEnd, b1[2] - h);
      if( xmin < xmax ){
        x2 = (xmin + xmax) / 2;
        x1 = x2 + h;
        bImproved = true;
      }
    }
    if( !bImproved ){
      h = y1 - y2;
      h *= 1.5;
      xmin = Math.max(b2[0] + TextEnd, b1[0] - h);
      xmax = Math.min(b2[2] - TextEnd, b1[2] - h);
      if( xmin < xmax ){
        x2 = (xmin + xmax) / 2;
        x1 = x2 + h;
        bImproved = true;
      }
    }
  }
  // negative style shows a grey head.
  if( !bImproved ){
    style = -style;
  }

  DrawArrow( Vec2(x2,y2), Vec2( x1,y1), style  );
}

function MayRefresh(){
  if( LastHover != HoverBox ){
    RefreshImage(Gui);
    RefreshImage(Clicker);
    LastHover = HoverBox;

/*
    if( HoverBox >= 0 ){
      var B = Gui.Boxes[Level][HoverBox];
      Message.innerHTML = B[4] + "<br>:"+B[0]+":"+B[1]+":"+B[2]+":"+B[3];
    }
    else
      Message.innerHTML = 'None '+Level;
*/
  }
}

/** @return  int  */
function GetHoverBoxInner( event, Gui, l ){
  if( l < 0 )
    return -1;
  var XX = event.offsetX;
  var YY = event.offsetY;
  return FindBox(Gui, XX, YY, l);
}
/**
 * @return int
 */
function GetHoverBoxAndUrl( event, Gui, l ){
  var box = GetHoverBoxInner( event, Gui, l );
  if( box < 0 )
    return box;
  TargetName = Gui.Boxes[ l ][box][4];
  return box;
}

/** @return  int  */
function GetHoverBox( event ){
  return GetHoverBoxAndUrl( event, Gui, Level );
}
/** @return  int  */
function GetHoverAnnoTextBox( event ){
  return GetHoverBoxAndUrl( event, Clicker, Level );
}
/** @return  int  */
function GetHoverLowTextBox( event ){
  if( Level < 1 )
    return -1;
  return GetHoverBoxAndUrl( event, Clicker, Level-1 );
}

function GetMenuNameByIndex( ix ){
  return App.Menus[ ix ][2];
}

function GetMenuNameByLevel( level ){
  return GetMenuNameByIndex( Menus[level].item -1 );
}

/**
 *
 * @param inp
 * @returns {string}
 */
function GetReplacementUrl( inp ){
  var i;
  var SearchString = inp.toLowerCase();
  for(i=0;i<App.MenuUrls.length;i++){
    if(App.MenuUrls[i][0] == SearchString ){
      return App.MenuUrls[i][1];
    }
  }
  return inp;
}
/**
 *
 * @param Url
 * @returns {string}
 */
function AlphaManualLink( Url ){
  var str = Url;
  str = str.replace("Top_Menu.html#Menu_Bar", "Menu_Reference");
  str = str.replace("Top_Menu", "Main_Page");
  str = str.replace( '.html', '');
  str = str.replace( '_Menu_', '_Menu:_');
  //var pieces = str.split('#');
  //if( pieces.length > 1 )
  //  pieces[1]=pieces[1].toLowerCase();
  //str = pieces.join('#');
  return str;
}

/**
 *
 * @param Url
 * @returns {string}
 */
function LocalManualLink( Url ){
  var pieces = Url.split( ".html" );
  var str = pieces[0].toLowerCase();
  str = str.replace( '-_', '' );
  pieces[0] = str;
  //pieces[1] = pieces[1].replace( /\_/g,'');
  str = pieces.join( ".html");//.toLowerCase();
  str = str.replace(/\,/g,"");
  return str;
}

/**
 *
 * @param Url
 * @returns {string}
 */
function CraftAlphaLink( Url ){
  RemoteUrl = "https://alphamanual.audacityteam.org/man/" + Url;
  return "<a target=\"manual\"" +
    " href=\"https://alphamanual.audacityteam.org/man/" + Url + "\">" +
    Url + "</a>";
}
/**
 *
 * @param Url
 * @returns {string}
 */
function CraftLocalLink( Url ){
  return "<a target=\"sidebar\" href=\"./scroller-contents/" + Url + "\">" +
    Url + "</a>";
}

/**
 *
 * @param UrlPair
 * @returns {string}
 */
function CraftDoxyLink( UrlPair ){
  return "<a target=\"doxy\"" +
    " href=\"https://doxy.audacityteam.org/class_audacity_project.html#" + UrlPair[0]  + "\">" +
    UrlPair[1] + "</a>";
}

/**
 *
 * @param UrlPair
 * @returns {string}
 */
function CraftOtherDoxyLink( UrlPair ){
  return "<a target=\"doxy\"" +
    " href=\"https://doxy.audacityteam.org/" + UrlPair[0]  + "\">" +
    UrlPair[1] + "</a>";
}


/**
 * Tweaks a URL for use locally with lower case file names.
 * Also keeps a copy of the untweaked url.
 * @param Url
 * @returns {string} the url + anchor with URL in lower case.
 */
function LowUrl( Url ){
  var AlphaLink = AlphaManualLink( Url );
  var LocalLink = LocalManualLink( Url );
  var str = "";
  str += " ~~ Alpha Manual: " + CraftAlphaLink(AlphaLink);
  str += " ~~ WIT Manual: " + CraftLocalLink(LocalLink);
  UrlHolder.innerHTML = str;
  str = "";
  if( MenuComponent ){
    if( App.Doxy[ MenuComponent] )
      str+= " ~~ Doxygen: " + CraftDoxyLink( App.Doxy[ MenuComponent] );
    MenuComponent = '';
  }
  else if( BoxComponent ){
    if( App.Doxy2[ BoxComponent] )
      str+= " ~~ Doxygen: " + CraftOtherDoxyLink( App.Doxy2[ BoxComponent] );
    BoxComponent = '';
  }
  DoxyUrlHolder.innerHTML = str + ' ~~';
  return LocalLink;
}

/**
 * Converts automatic URL name to the location we actually will want.
 * @param Url
 * @returns {string}
 */
function UrlFromMenuItemName( Url ){
  Url = Url.replace( "...", "" );
  Url = Url.replace(/ /g,"_");
  Url = Url.replace(/\//g,"");
  Url = Url.replace(/\(/g,"");
  Url = Url.replace(/\)/g,"");
  var pieces = Url.split('#');
  if( pieces.length > 1 )
    pieces[1]=pieces[1].toLowerCase();
  Url = pieces.join('#');  //var OldUrl = Url;
  Url = GetReplacementUrl( Url );
  if( Url.indexOf("#") >= 0 ){
    Url = Url.replace("#",".html#");
  }
  if( Url.indexOf(".html") < 0 ){
    Url += ".html";
  }

  //Url = Url.replace(/\,/g,"");
  return LowUrl( Url );
}
/**
 *
 * @param name
 * @returns {string}
 */
function UrlFromBoxName( name ){
  BoxComponent = name;
  var i;
  for(i=0;i<App.BoxUrls.length;i++){
    if( App.BoxUrls[i][0] == name){
      return LowUrl( App.BoxUrls[i][1] );
    }
  }
  //console.log( "BoxName "+name+" not found" );
  return "";
}

/**
 *
 * @param event
 */
function UpdateMenuSelection( event ){
  var l;
  TargetName = "";
  ClickedBox = -1;
  for( l=1;l<=Level;l++){
    HoverBox = GetHoverBoxInner( event, Gui, l );
    LastHover = -2;
    if( HoverBox >= 0 ){
      Level = l;
      var StartAt = Gui.Boxes[l][HoverBox][5];
      // if it has descendants...
      if( (StartAt+1) < App.Menus.length &&
        App.Menus[StartAt][0] ==
        (App.Menus[StartAt + 1][0] - 1) ){
        // Descend for menus...
        Level = l+1;
        ClickedBox = HoverBox;
        Menus[Level].item = StartAt + 1;
        Menus[Level].iHover = HoverBox;
        Menus[Level-1].iSel = HoverBox;
        HoverBox = -1;
      }
      Menus[Level].iSel = -1;
      TargetName = GetMenuNameByLevel( 2 )+"_Menu";
      var PostFix = "";
      if( l > 2 ){
        TargetName = TargetName + "_" + GetMenuNameByLevel(3);
        TargetName = TargetName + "#";
        PostFix = GetMenuNameByIndex( StartAt );
      }
      else if (l > 1 ){
        TargetName = TargetName + "#";
        PostFix = GetMenuNameByIndex(StartAt);
      }
      MenuComponent = PostFix;
      TargetName += PostFix;
      //PostFix = PostFix.replace(/ /g,"_");
      return;
    }
  }
  MenuMode = false;
  Level = 0;
  UpdateSelection(event );
}

/**
 * Moves focus lower in the boxing hierarchy.
 * @param event
 * @param options
 * @returns {boolean}
 */
function Descend( event, options ){
  // if nothing was hovered over, nothing to do.
  if( HoverBox < 0 )
    return false;

  if( options.recursive ){
    // Keep descending whilst we can...
    while( ChangeLevel(1, notIfEmpty) ){
      HoverBox = GetHoverBox(event);
      LastHover = -2;
      MayRefresh();
    }
  } else if( options.single ){
    Level -=1;
    //ClickedBox = HoverBox;
    ChangeLevel(1,emptyOK);
    return true;
  } else {
    ChangeLevel(1,notIfEmpty);
  }

  if( Level < 1 )
    EmptyLevel();
  MenuMode = (Level <= 1) && (ClickedBox == App.Menu);
  if( MenuMode ){
    Menus[1].iSel = -1;
  }
  return true;
}

/**
 *
 * @param event
 */
function UpdateSelection( event ){
  TargetName = "";
  LastHover = -2;
  // Try bottom rows.
  HoverBox = GetHoverLowTextBox( event );
  if( Descend( event, {recursive:false, single:true} ) )
    return;

  // Try items in on-screen annotation
  // (if at Level 0, the low text IS annotation)
  HoverBox = GetHoverAnnoTextBox( event );
  if( Descend( event, {recursive:false, single:false} ) )
    return;

  // Try items on screen
  HoverBox = GetHoverBox( event );
  if( Descend( event, {recursive:true, single:false} ) )
    return;

  // Nothing found.  Reset to 0.
  Level = 0;
  ClickedBox = -1;
  LastHover = -2;

  // Try items on screen again.
  HoverBox = GetHoverBox( event );
  if( Descend( event, {recursive:true, single:false} ) )
    return;
}

/**
 * Also handles mouse movement.
 *
 * @param event
 * @param isclick
 */
function ImageClick(event, isclick){
  if( !isAppReady )
    return;
  // let's us highlight something and move away...
  if( event.shiftKey )
    return;
  if( isclick){
    Menus[0].item = 0;
    Menus[0].iSel = 0;
    Menus[1].item = 0;
    Menus[1].iHover = 0;
    if( MenuMode )
      UpdateMenuSelection( event );
    else {
      UpdateSelection( event );
    }

    if( TargetName != "" ){
      if( MenuMode )
        TargetName = UrlFromMenuItemName( TargetName );
      else
        TargetName = UrlFromBoxName( TargetName );
      ScrollToUrl( TargetName );
    }
  }  else {
    HoverBox = GetHoverBox( event );
    if ( HoverBox < 0 ){
      if( MenuMode ){
        //if( Level > 2 ){
        //  HoverBox = GetHoverBoxAndUrl( event, Clicker, Level );
        //}
      }
      else
        HoverBox = GetHoverAnnoTextBox(event);
    }
  }
  MayRefresh();
  if( Async.length > 0 ){
    var action = Async.pop();
    //console.log( action );
    handleNewData( action.value );
  }
}

function handleNewData( data ){
  data = data.replace( '</nowiki>', '<nowiki>' );
  var commands = data.split( '<nowiki>' );
  if( commands.length > 1 ){
    OnReset();
    var str = commands[commands.length - 2];
    //console.log( str );
    eval( str );

  }
}

/**
 * Loads one source file into an item in an array.
 * @param data
 * @param action
 * @param url
 */
function fileActionLoader(data, action, url ){
  var txtFile = new XMLHttpRequest();
  // CDNs and Varnish should give us the very latest.
  txtFile.onreadystatechange = function(){
    if( this.readyState === 4 && this.status == 200 ){
      // data.push({ action: action, value: this.responseText});
      handleNewData( this.responseText);
    }
  };

  txtFile.open("GET", url , true);
  //txtFile.setRequestHeader( "Cache-Control", "s-maxage=0" );
  txtFile.send();
}


function OnReset(){
  Level = 0;
  ClickedBox = -1;
  LastHover = -2;
  HoverBox = -1;
  MenuMode = false;
  MayRefresh();
  ScrollToUrl( "top_menu.html" );
}
function OnManual(){
  window.open( RemoteUrl, "manual" );
//  alert( "When this button is working, it will take you to the equivalent" +
//    " page in the manual, full window size.");
}
function OnSpecial(){
  //Scroller.src = "https://wiki.audacityteam.org/wiki/WIT_Experiments?action=raw";
  //alert( "At some point this button will do clever stuff");
  var str = window.location.href;

  App.KeepPanel = false;
  ScrollToUrl( "special_menu.html" );
  SetUrlVisibility( false );
  SetDoxyUrlVisibility( true );
  App.KeepPanel = true;
  App.NumbersOnScreen = false;
  App.AnnotationMode = false;
  App.ShowUrls = false;
  App.ShowDoxygen = true;

  var date = new Date();
  var nMillis = date.getTime();

  if( str.indexOf( 'localhost' ) != -1){
    fileActionLoader(Async, "EVAL", "./raw/raw_menu.txt");
    fileActionLoader(Async, "EVAL", "./raw/raw_tooltips.txt");
  }
  else {
    fileActionLoader(Async, "EVAL",
      "https://wiki.audacityteam.org/wiki/WIT_Audacity_Menus?action=raw&time=" +
      nMillis);
    fileActionLoader(Async, "EVAL",
      "https://wiki.audacityteam.org/wiki/WIT_Audacity_Tooltips?action=raw&time=" +
      nMillis);
    fileActionLoader(Async, "EVAL",
      "https://wiki.audacityteam.org/wiki/WIT_Audacity_Extra_Shortcuts?action=raw&time=" +
      nMillis);
  }
}

function OnAnnotationMode(arg){
  App.AnnotationMode =  arg.checked;
  LastHover = -2;
  MayRefresh();
}

function SetUrlVisibility( value ){
  UrlHolder.style.display = value ? 'inline': 'none';
}
function SetDoxyUrlVisibility( value ){
  DoxyUrlHolder.style.display = value ? 'inline': 'none';
}

function OnShowDoxygenUrls(arg){
  App.ShowDoxygen = arg.checked;
  SetDoxyUrlVisibility( App.ShowUrls || App.ShowDoxygen );
}

function OnShowUrls(arg){
  App.ShowUrls = arg.checked;
  SetUrlVisibility( App.ShowUrls );
  SetDoxyUrlVisibility( App.ShowUrls || App.ShowDoxygen );
}

function OnKeepPanel(arg){
  App.KeepPanel = arg.checked;
}

/**
 * A Durl is a Data URL.  For example, an image represented as a Base64 URL
 * string.
 */

/**
 * Converts a string to a durl
 * @returns {string}
 * @constructor
 */
function DurlOfText( text ){
  return "data:application/txt," + encodeURIComponent(text);
}

/**
 * Converts the current annotated image region into a Durl.
 * @returns {string}
 */
function DurlOfAnnotatedImage(){
  var new_canvas = document.createElement('canvas');
  new_canvas.width = Annotated.width;
  new_canvas.height = Annotated.height;
  var ctx = new_canvas.getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(5, 5, 70, 70);
  ctx.drawImage(Gui.Ctx.canvas, Annotated.x, Annotated.y, Annotated.width,
    Annotated.height, 0, 0, Annotated.width, Annotated.height);
  var data = ctx.canvas.toDataURL("image/png");

  //var data = Gui.Ctx.canvas.toDataURL('image/png');
  /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
  data = data.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  return data;
}

function DownloadDurl( name, durl ){
  var link = document.createElement('a');
  link.download = name;
  link.href =  durl;
  link.click();
}


function OnGetImage(){
  if( !Annotated.available )
    return;

  DownloadDurl( Annotated.name + ".png", DurlOfAnnotatedImage());
}

function OnGetToolbarImageMaps(arg){
  DownloadDurl( "Toolbars.txt", DurlOfText(App.ToolsImap()) );
}

function OnGetMenuImageMaps(arg){
  DownloadDurl( "all-menus.txt", DurlOfText(App.MenuImap()) );
}

function OnGetKeyboardReference(arg){
  DownloadDurl( "KeyboardReference.txt", DurlOfText(App.KeyboardReference()) );
}

function OnGetAutomationReference(arg){
  DownloadDurl( "AutomationReference.txt", DurlOfText(App.AutomationReference()) );
}

function OnGetNextApp(arg){
  if( App.Name == "Audacity" )
    App = AudacityDoxed;
  else
    App = Audacity;

  Gui.Img.onload = function(){
    LastHover = HoverBox-1;
    GuiInit();
    ClickerInit();
    MayRefresh();
  };
  Gui.Img.src =  App.Image;
  //Gui.BackDraw = function() { Gui.Ctx.drawImage(Gui.Img, 0, 0);};
}
