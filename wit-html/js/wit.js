/**
 * Created by James Crook on 1/3/2018.
 */


var App = Audacity;
var Message = null;
var Clicker = {};
var Gui = {};
var Level = 0;
var MenuMode = false;
var Scroller;
var ClickedBox = -1;
var HoverBox = -1;
var LastHover = -2;
var TargetName = "";
var emptyOK = true;
var notIfEmpty = false;
var isAppReady = false;


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

function GuiInit(){
  //Gui.Boxes = [ image_boxes, [], [] ];
  Gui.Boxes = [ Extract( App.Boxes, 0,1),[],[],[],[],[],[]];
  Gui.Img = document.getElementById("Gui");
  Gui.Canvas = document.getElementById("GuiCanvas");
  Gui.Ctx = Gui.Canvas.getContext("2d");
  Gui.DoesFade = true;
  Gui.Rect = [0,0,865,583];
  Gui.BackDraw = function() { Gui.Ctx.drawImage(Gui.Img, 0, 0);}
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

    console.log( "Descending: ", inside );
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
  var Start = Math.max( 2, BoxRow[0] - 72);

  Channels =[];
  // Spread potentially increases vertical spread between the two
  // rows of annotations.
  var Spread = Math.min( Math.max( BoxRow[1]-70, 10 ), 30);
  Channels.push( [Start, BoxRow[1]-40-Spread, 0, 30] );
  if( (Gui.Rect[2]-BoxRow[3]-320 ) > 80 )
    Channels.push( [Start, BoxRow[3]+10+Spread, 0, 30] );

  for( i = 0; i < G.Boxes[LL].length; i++ ){
    DrawClicky( G, Channels[i%Channels.length], G.Boxes[LL][i] )
  }
}

window.onload = function(){
  Message = document.getElementById("message");
  Scroller = document.getElementById("scroller");
  GuiInit();
  ClickerInit();
  MayRefresh();
  isAppReady = true;
}

function DrawMenu( from ){
  var MenuLevel = App.Menus[from][0];
  DrawMenuBack( Menu.x,Menu.y );
  var Res = { x:Menu.x, y:Menu.y};
  var i;
  for(i=from;i<App.Menus.length;i++){
    if( App.Menus[i][0] < MenuLevel )
      return;
    var Option = ( Gui.Boxes[Level].length == HoverBox) ?
      menuSelected : 0;
    if( Gui.Boxes[Menu.Level].length == Menu.iSel )
      Option = menuSelected;
    if( App.Menus[i][0] == MenuLevel ){
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
      DrawMenu( Menu.item );
    }
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
    if( Level > 0 ){
      var i;
      for( i=0;i<Gui.Boxes[Level].length; i++){
        ConnectBoxes( Level, i, 1 );
      }
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
      console.log("Scroll to: "+Target + " : " + src );
      return;
    }
  }
  console.log("Scroll to: "+Target + " -no match-");
}

function ScrollToUrl( Target ){
  Scroller.src = "./scroller-contents/" + Target;
  console.log("Scroll to: "+Target + " -URL-");
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
  for(i=0;i<App.MenuUrls.length;i++){
    if(App.MenuUrls[i][0] == inp ){
      return App.MenuUrls[i][1];
    }
  }
  return inp;
}

function UrlFromMenuItemName( Url ){
  Url = Url.toLowerCase();
  Url = Url.replace( "...", "" );
  Url = Url.replace(/ /g,"_");
  Url = Url.replace(/\//g,"");
  Url = Url.replace(/\(/g,"");
  Url = Url.replace(/\)/g,"");
  //var OldUrl = Url;
  Url = GetReplacementUrl( Url );
  if( Url.indexOf("#") >= 0 ){
    Url = Url.replace("#",".html#");
  }
  if( Url.indexOf(".html") < 0 ){
    Url += ".html";
  }
  Url = Url.replace(/\,/g,"");
  return Url;
}
/**
 *
 * @param name
 * @returns {string}
 */
function UrlFromBoxName( name ){
  var i;
  for(i=0;i<App.BoxUrls.length;i++){
    if( App.BoxUrls[i][0] == name){
      return App.BoxUrls[i][1];
    }
  }
  console.log( "BoxName "+name+" not found" );
  return "";
}
/**
 *
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
 * @param options
 * @returns {boolean}
 */
function Descend( options ){
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
  MenuMode = (Level <= 1) && (ClickedBox == 0);
  if( MenuMode ){
    Menus[1].iSel = -1;
  }
  return true;
}

function UpdateSelection( event ){
  TargetName = "";
  LastHover = -2;
  // Try bottom rows.
  HoverBox = GetHoverLowTextBox( event );
  if( Descend( {recursive:false, single:true} ) )
    return;

  // Try items in on-screen annotation
  // (if at Level 0, the low text IS annotation)
  HoverBox = GetHoverAnnoTextBox( event );
  if( Descend( {recursive:false, single:false} ) )
    return;

  // Try items on screen
  HoverBox = GetHoverBox( event );
  if( Descend( {recursive:true, single:false} ) )
    return;

  // Nothing found.  Reset to 0.
  Level = 0;
  ClickedBox = -1;
  LastHover = -2;

  // Try items on screen again.
  HoverBox = GetHoverBox( event );
  if( Descend( {recursive:true, single:false} ) )
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
    if( HoverBox < 0 )
      HoverBox = GetHoverAnnoTextBox( event );
  }
  MayRefresh();
}


function OnReset(){
  Level = 0;
  ClickedBox = -1;
  LastHover = -2;
  HoverBox = -1;
  MayRefresh();
  ScrollToUrl( "top_menu.html" );
}
function OnManual(){
  alert( "When this button is working, it will take you to the equivalent" +
    " page in the manual, full window size.");
}
function OnSpecial(){
  alert( "At some point this button will do clever stuff");
}


