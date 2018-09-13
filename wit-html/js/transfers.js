/**
 * Created by James Crook on 12/09/2018.
 */
///////////////////////////////////////////////////////////////////

var Async = [];


//[  1,  0, "Close", "Ctrl+W" ],
/**
 * Anchor name modified to be valid (no spaces, for example).
 * @param anchor
 * @returns {string}
 */
function CleanAnchor( anchor ){
  var str = anchor.replace("...", "");
  str = str.replace(/ /g,"_");
  str = str.replace("&","");
  str = str.replace(/\(/g,"");
  str = str.replace(/\)/g,"");
  str = str.replace("/","");
  str = str.replace(".","");
  str = str.replace(/-/g,"");
  str = str.replace(/__/g,"_");
  return str.toLowerCase();
}

/***
 * Tip modified to be valid by removing wiki links, for example.
 * @param tip
 * @returns {XML|string|void}
 */
function CleanTip( tip ){
  var str = tip.replace( /'''/g, "" );
  str = str.replace( /''/g, "" );
  str = str.replace( /\[\[(.*?)\|(.*?)\]\]/g, "$2" );
  str = str.replace( /\[\[(.*?)\]\]/g, "$1" );
  return str;
}


function CleanPageName( name ){
  var str = name.replace( /\//g, "_" );
  return str;
}

/**
 *
 * @param params
 * @returns {string}
 */
function PrintableOfParams( params ){
  var str = "";
  var i;
  var j;
  for( i=0;i<params.length;i++){
    var item = params[i];
    var key = "";
    if( item.key )
      key = " '''" + item.key + "'''";
    str += "''"+item.type + key+", (default:"+item.default + ")''<br>\r\n";
    if( item.type == "enum" ){
      str+="<!--ul-->\r\n";
      for( j=0;j< item.enum.length ;j++){
        var eItem = item.enum[ j ];
        str += "* " + eItem + "\r\n";
      }
      str+="<!--/ul-->\r\n";
    }
  }
  return str;
}


/////////////////////////////
function SafeQuote( str ){
  return str.replace( /\"/g, "\\\"" );
}
/** Get the tip info from one Menu item
 *
 * @param Menu
 * @returns {string}
 */
function PrinatbleTipInfoOfMenuItem(Menu){
  var str="";
  str += "{ key:   \"" + SafeQuote(Menu.label) + "\",\r\n";
  if( Menu.id )
    str += "  id:    \"" + SafeQuote(Menu.id) + "\",\r\n";
  str += "  short: \"" + SafeQuote(Menu.short) + "\",\r\n";
  str += "  long:  \"" + SafeQuote(Menu.long) + "\"},\r\n";
  return str;
}


function LoadSpecialFiles(){
  var date = new Date();
  var nMillis = date.getTime();

  var str = window.location.href;
  if( str.indexOf( 'localhost' ) != -1){
    fileActionLoader(Async, "EVAL", "./raw/raw_menu.txt");
    fileActionLoader(Async, "EVAL", "./raw/raw_tooltips.txt");
  }
  else {
    // action=raw to get unprocessed file from wiki.
    // time=nMillis to avoid issues with cached content.
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

/** Transfer information into a menu item from a tip
 *
 * @param Menu
 * @param Tip
 */
function SetMenuFromTip(Menu, Tip){
  Menu['short'] = Tip.short;
  Menu['long'] = Tip.long;
  if( Menu.id == undefined && Tip.id != undefined )
    Menu['id'] = Tip.id;
  if( Tip.params != undefined )
    Menu['params'] = Tip.params;
}
/** Transfers information into a menu item
 * from a command item.
 * @param Menu
 * @param Command
 */
function SetMenuFromCommand(Menu, Command){
  if( Command.id != undefined )
    Menu['id'] = Command.id;
  if( Command.params != undefined )
    Menu['params'] = PrintableOfParams(Command.params);
  if( Menu.long == undefined && Command.tip != undefined )
    Menu['long'] = Command.tip;
}
/** Cleaned up tips replace some formulaic strings
 * and expand the + at the start of the long description.
 * @returns {Array}
 */
function GetCleanedUpTips(){
  var i;
  var j;
  var Tips = [];
  var key;
  for( i = 0; i < App.Tips.length; i++ ){
    var Tip = App.Tips[i];
    key = Tip.key;
    key = key.replace(/Invoke the (.*) effect dialog/, "$1...");
    if( key != Tip.key ){
      //console.log(" Replaced "+ key);
      Tip.key = key;
    }
    if( Tip.long.indexOf('+') == 0 )
      Tip.long = Tip.long.replace('+', Tip.short);
    Tips.push(Tip);
  }
  return Tips;
}
function GetCleanedUpCommands(){
  var Commands = [];
  var Command = {};
  var i;
  for( i = 0; i < App.Commands.length; i++ ){
    Command = App.Commands[i];
    Commands.push(Command);
  }
  return Commands;
}

/***
 * Formatted string for an HTML rectangle, with each number being given 4
 * digits and a space.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param name
 * @param tip
 * @returns {string}
 */
function rectString( x1,y1,x2,y2, name, tip ){
  if( x2 < 0 )
    return "";
  var str = "rect ";
  str += ("    "+x1).slice(-4)+ " ";
  str += ("    "+y1).slice(-4)+ " ";
  str += ("    "+x2).slice(-4)+ " ";
  str += ("    "+y2).slice(-4)+ " ";
  str += "[[" + name + "|" + tip + "]]\r\n";
  return str;
}

/***
 * Update the menu array to have the tips in it, as fields
 * The menu items with a name that matches the tip key have these fields added:
 *   id
 *   params
 *   short
 *   long
 */
function JoinTipsIntoMenus( ){
  var str = "";
  var Tips = GetCleanedUpTips();

  //console.log( str );
  var i;
  var j;
  var Tip;
  for( j=0;j<App.Menus.length; j++){
    var Menu = App.Menus[j];
    var Name = Menu.label;
    if( Name.indexOf("---") < 0 ){
      if( Menu.depth==0 )
        str+="\r\n// "+Name +"\r\n";
      for(i=0;i<Tips.length;i++){
        Tip = Tips[i];
        if( Tip.key.toLowerCase() == Name.toLowerCase() ){
          SetMenuFromTip(Menu, Tip);
          str+=PrinatbleTipInfoOfMenuItem(Menu);
          Tips.splice(i,1);
          break;
        }
      }
      if( !Menu.short ){
        console.log( "No tip with key for: "+ Name );
      }
    }
  }
  //console.log( str );
  console.log("Tip Leftovers: ");
  console.log( Tips );
}
/***
 * Update the menu array to have the commands in it, as fields
 * We add the command in, if either the id or the name matches.
 * We should end up with
 *   id
 *   params
 *   short (i.e. short description)
 *   long (i.e. long description)
 */
function JoinCommandsIntoMenus(){
  var i;
  var j;
  var str = "";
  var Command = {};
  var Commands = GetCleanedUpCommands();

  //console.log( str );
  for( j = 0; j < App.Menus.length; j++ ){
    var Menu = App.Menus[j];
    var Depth = Menu.depth;
    var Name = Menu.label;
    var Flags = Menu.flags;
    var id = Menu.id || "";
    Name = Name.replace("...", "");
    if( (Name.indexOf("---") < 0 ) && (Flags != 1 ) ){
      if( Depth == 0 )
        str += "\r\n// " + Name + "\r\n";
      else for( i = 0; i < Commands.length; i++ ){
        Command = Commands[i];
        if( Command.name == Name || Command.id == id ){
          SetMenuFromCommand(Menu, Command);
          Commands.splice(i, 1);
          break;
        }
      }
//    if( !Menu.short ){
//      console.log( "Unmatched: "+ Name );
//    }
    }
  }
  //console.log( str );
  console.log("Command Leftovers: ");
  console.log(Commands);
}

/**
 *
 * @param strings
 * @param cols
 * @returns {string}
 */
function BlueTable( strings, cols ){
  var str = "\r\n";
  str += '::<table width="95%" style="border-color:#B7CEEC; border-style:' +
    ' solid" cellpadding=10px>\r\n';
  var rows = Math.ceil(strings.length / cols);
  for(i=0;i<rows;i++){
    str += (i%2==0) ? '<tr style="background-color:#ddeeff" valign="top">\r\n'
      : '<tr valign="top">\r\n';
    for(j=0;j<cols;j++){
      var k = i + (rows)*j;
      str += '<td width="25%">' + (( k >= strings.length ) ?
          "" : strings[k])+ '</td>\r\n'
    }
    str += '</tr>\r\n';
  }
  str += '</table>\r\n';
  return str;
}

/**
 *
 * @returns {string}
 */
function MakeToolMap( lll ){
  var i;
  var BoxEnd = null;
  var FB = null;
  var str = "";
  for(i=0;i< App.Boxes.length;i++){
    var Box = App.Boxes[i];
    if( Box.depth == lll ){
      var name = Box.label.replace(/ /g, '');
      str += "|" + name + "=:<imagemap>\n";
      str += "Image:" + name + "Annotated.png\r\n";
      str += "desc none\r\n";
      BoxEnd = Box;
    }
    if( Box.depth == lll+1 ){
      var mainBox = Box.box;
      var labelBox = Box.labelBox;
      // offset boxes by first actual location...
      if( FB )
        ;
      else if( labelBox )
        FB = [ labelBox[0]-3, labelBox[1]-3 ];
      else
        FB = [ 0,0 ];
      str += rectString( mainBox[0]-FB[0], mainBox[1]-FB[1], mainBox[2]-FB[0], mainBox[3]-FB[1],
        Box.label,
        Box.label + " for...");
      if( labelBox ){
        str += rectString(  labelBox[0]-FB[0],labelBox[1]-FB[1], labelBox[2]-FB[0], labelBox[3]-FB[1],
          Box.label,
          "For...");
      }
    }
    if( BoxEnd && ( (i == App.Boxes.length -1 ) || App.Boxes[i+1].depth==lll)){
      str += rectString(BoxEnd.box[0], BoxEnd.box[1], BoxEnd.box[2], BoxEnd.box[3],
        "Toolbars Overview#upper_tooldock",
        BoxEnd.label + " - click on the image to see this toolbar displayed" +
        " in the default context of the upper tooldock layout");
      str += "</imagemap>\n";
      str += "{{ClickTip|x=" + (BoxEnd.box[2] - (FB?FB[0]:0) - 50) + "|y=-5}}\r\n\r\n\r\n";
      str += "&nbsp;\r\n\r\n";
      BoxEnd = null;
      FB = null;
    }
  }
  return str;
}
/**
 * returns all menus starting at item from, or the empty string.
 * @returns {string}
 */
function MakeMenuMap(from, prefix, priorRects, xIn, yIn){
  var i;
  var MenuName = "None";
  var str = "";
  var results = "";
  var innerRects = "";
  var x = xIn;
  var y = yIn;
  var SubItems = [];
  var name;
  //console.log( "Map from:"+from+" prefix:"+prefix );
  var descend = (priorRects == "") ? 0 : 1;

  if( from >= App.Menus.length )
    return "";

  var Box = App.Menus[from];
  var indent = Box.depth + descend;

  name = Box.label.replace(/ /g, '_');
  name = name.replace(/\//g, '_');
  if( indent == 0 )
    MenuName = "Menu Reference"; else if( indent == 1 )
    MenuName = prefix + name + " Menu"; else
    MenuName = prefix + " " + name;
  var safeName = prefix + name;

  if( indent == 0 )
    safeName = "MenuBar";

  // Size of menu descended from from.
  GetMenuSizing(from + 1);
  var width = Math.floor(Menu.width);
  var height = Math.floor(Menu.height);
  //results += "At " + App.Menus[from].label + " Width = " + width + "\r\n";

  safeName = safeName.replace(/ Menu:/g, "-");
  str += "|" + safeName + "=:<imagemap>\n";
  str += "Image:" + safeName + "Menu.png\r\n";
  str += "desc none\r\n";
  str += priorRects;

  var dx = 0;
  var dy = 0;

  for( i = from; i < App.Menus.length; i++ ){
    Box = App.Menus[i];

    // if nextindent is greater than current, push the next item.
    var nextIndent = -1;
    if( i < App.Menus.length - 1 )
      nextIndent = App.Menus[i + 1].depth;

    // This is an item in the menu...
    if( Box.depth == indent ){
      x += dx;
      y += dy;
      if( Box.label.indexOf("---") >= 0 ){
        dx = 0;
        dy = 7;
      } else {
        var Tip = "tip about " + Box.label;
        if( Box.short )
          Tip = Box.short;

        dx = 0;
        dy = 22;
        if( indent == 0 ){
          width = SizeBarItem(0, 0, 0, Box.label, "", 0).x;
          dx = width;
          dy = 0;
        }

        // if has submenu...
        if( indent == 0 )
          innerRects += rectString(x, y, x + width, y + 22,
            Box.label + " Menu", CleanTip(Tip));
        else if( Box.flags == 1 )
          innerRects +=
            rectString(x, y, x + width, y + 22, MenuName + ': ' +
              CleanPageName(Box.label), CleanTip(Tip));
        else
          innerRects += rectString(x, y, x + width, y + 22,
            MenuName + '#' + CleanAnchor(Box.label), CleanTip(Tip));
      }

      if( nextIndent == (indent + 1) ){
        var dx1 = 0;
        var dy1 = 0;
        // If off menu bar, next row.
        // If off submenu, shift by previous menu width.
        if( nextIndent == 1 ){
          dy1 = 22;
          dx1 = (x==0)?0:25 - x;
        } else
          dx1 = width;

        if( nextIndent == 2 ){
          GetMenuSizing(i + 1);
          // extraY is how much we will project over the end.
          var extraY = Menu.height - height;
          extraY += y - yIn;
          // dy = -extraY would align bottom to bottom.

          // dy1 is at most 0.  (place adjacent).
          // dy1 is at least 27-y (place at start)
          dy1 = Math.max(27 - y, Math.min(0, -extraY));
        }

        SubItems.push({ 'i': i, 'x': x + dx1, 'y': y + dy1 });
        //console.log("Push "+Box.label);
        //results += "Push "+Box.label+"\r\n";
      }
    }

    // if nextindent < indent (or -1 for at end), then we are done.
    if( nextIndent < indent ){
      str += innerRects;
      str += rectString(0, 0,1000,1000, "Menu_Reference",
        "The Menus");
      str += "</imagemap>\n";
      str += "{{ClickTip|x=" + (x + width - 50) + "|y=15}}\r\n\r\n\r\n";
      str += "&nbsp;\r\n\r\n";
      var bOkToAdd = innerRects != "";
      bOkToAdd = bOkToAdd && ((indent!=0) || (from==0));
      if( bOkToAdd )
        results += str;
      //console.log( str );
      str = "";

      var j;
      if( indent == 0 )
        MenuName = "";
      for( j = 0; j < SubItems.length; j++ ){
        var S = SubItems[j];
        if( (descend == 0) && (S.i != from) ){
          innerRects = "";
          j = 1000;
          S.x = 25;
          S.y = 5;
          console.log("NewMenu");
        }
        console.log("MakeMenu: " + App.Menus[S.i].label);
        results += MakeMenuMap(S.i, MenuName + ((indent == 1) ? ":" : ""),
          priorRects + innerRects, S.x, S.y);
      }
      SubItems = [];
      return results;

    }
  }
  return results;
}

/**
 *
 * @returns {string}
 */
function MakeLittleTable(){
  var strs = [];
  var str = '';
  var name = '';
  for(i=0;i< App.Menus.length;i++){
    var Box = App.Menus[i];
    if( Box.depth ==0  ){
      if( i!= 0 )
        strs.push(str);
      name = Box.label;
      str = "'''[[#"+ CleanAnchor(Box.label) + "_menu|" + Box.label + " Menu:]]'''<br>";
    }
    else if( Box.flags == 1 )
      str += "[[#"+CleanAnchor(name+"_"+Box.label+"_submenu")+"|"+Box.label+"]], ";
  }
  strs.push(str+"\r\n");
  return BlueTable( strs, 4 );;

}

/**
 *
 * @param link
 * @param name
 * @returns {string}
 */
function WikiLink( link, name ){
  return  '<a href="' + link + '">' + name + '</a>';
}

/**
 *
 * @param text
 * @returns {string}
 */
function WikiHead2( text ){
  return '<h2>'+text + '</h2>\r\n';
}

/**
 *
 * @param text
 * @returns {string}
 */
function WikiHead3( text ){
  return '<h3>'+text + '</h3>\r\n';
}

/**
 *
 * @param text
 * @returns {string}
 */
function WikiNote( text ){
  return '<div class="note">'+text + '</div>\r\n';
}

/**
 *
 * @param text
 * @returns {string}
 */
function WikiCell( text ){
  return '<td>'+text + '</td>\r\n';
}
/**
 *
 * @param text
 * @returns {string}
 */
function WikiTitleCell( text, width ){
  return '<th width="'+width+'">'+text + '</th>\r\n';
}
/**
 *
 * @param text
 * @returns {string}
 */
function WikiRow( text ){
  return '<tr>'+text + '</tr>\r\n';
}

/**
 *
 * @param text
 * @returns {string}
 */
function WikiShortcut( text ){
  return '<span class="kbrd" style="background-color:#d0d0f8">' + text + '</span>';
}

/**
 *
 * @param text
 * @returns {string}
 */
function WikiFullShortcut( text ){
  return '<span class="kbrd" style="background-color: #eaeafa">' + text +'</span> &nbsp;' +
    ' <i><sup><a href="/man/Only_in_full_set" title="Only in full' +
    ' set">Extra</a></sup></i>';

}

/**
 *
 * @param text
 * @returns {string}
 */
function WikiMenu( text ){
  return '<span class="menu">' + text + '</span>';
}



function WikiToHtm( text ){
  str = text.replace(/'''(.*?)'''/g, "<b>$1</b>");
  str = str.replace(/''(.*?)''/g, "<em>$1</em>");
  str = str.replace(/\[\[(.*?)\|(.*?)\]\]/g, '<a href="$1">$2</a>');
  str = str.replace(/\[\[(.*?)\]\]/g, '<a href="$1">$1</a>');
  str = str.replace(/\r\n\* /g, "\r\n<li>");
  str = str.replace(/<!--ul-->/g, "<ul>");
  str = str.replace(/<!--\/ul-->/g, "</ul>");
  str = str.replace(/\{\{shortcut\|(.*?)\}\}/g, '<span class="kbrd"' +
   ' style="background-color:#d0d0f8">$1</span>');

  str = str.replace(/\{\{menu\|(.*?)\}\}/g,'<span class="menu">$1</span>' );
  return str;
}

/**
 * returns all menus starting at item from, or the empty string.
 * If in automation mode, only the menu items with an id are used.
 * @returns {string}
 */
function MakeKeyboardReference2(from, prefix, type){
  var i;
  var str = "";
  var Name ="";
  var lowName="";
  var Prefix = "";
  var indent = -1;
  var SubItems = [];
  var results = "";
  var subsAllowed = false;
  var TopName = "";
  var bEmpty =true;
  var bIsAutomation = type == "automation";

  //console.log( "Keyboard from:"+from+" prefix:"+prefix );
  for(i=from;i< App.Menus.length;i++){
    var Box = App.Menus[i];
    if( Box.depth < indent )
      return results;
    if( i== from ){
      indent = Box.depth;
    }
    Name = Box.label;
    lowName = CleanAnchor( Name );
    var boxIndent = Box.depth;
    if( Name.indexOf("---") >=0 )
      ;
    else if( boxIndent == indent ){
      if( indent < 1 )
        str += "<div id=\""+lowName+"_menu\"></div>\r\n";
      else
        str += "<div id=\""+CleanAnchor( prefix ) + "_" + lowName+"_submenu\"></div>\r\n";
      if( Box.depth == 0 )
        str += WikiHead2( WikiLink( CleanPageName(Name+"_Menu"), Name+" Menu" ));
      if( Box.depth == 1 )
        str += WikiHead3( WikiLink( CleanPageName(prefix +"_Menu:_" +Name), prefix + ": " +Name) );
      if( Box.long )
        str += WikiNote( Box.long );
      else
        str += WikiNote( "No special notes for "+Name );
      str += "<table class=\"prettytablerows\" rules = \"rows\" border =" +
        " \"2\"" +
        " width=\"100%\">\r\n";

      var rstr = "";
      if( bIsAutomation )
        rstr += WikiTitleCell( "Scripting Id", "15%" );
      rstr += WikiTitleCell( "Action", "15%" );
      if( !bIsAutomation ){
        rstr += WikiTitleCell( "Shortcut", "10%" );
        rstr += WikiTitleCell( "Description", "75%" );
      }
      else {
        rstr += WikiTitleCell( "Parameters", "30%" );
        rstr += WikiTitleCell( "Description", "55%" );
      }
      str+= WikiRow( rstr);
      Prefix = Name;
      subsAllowed = true;
      bEmpty = true;
      TopName = Name;
    }
    else if( boxIndent == (indent+1) ){
      if( !bIsAutomation || (Box.id != undefined ) ){
        var sstr ="";
        if( bIsAutomation ){
          sstr += WikiCell( "<b>" +  Box.id + ":</b>");
        }
        if( boxIndent == 1 )
          sstr += WikiCell( WikiLink(  TopName + "_Menu#" + lowName,  Name ));
        else
          sstr += WikiCell( WikiLink(  prefix + "_Menu:_" + TopName + "#" + lowName,
            Name));
        if( bIsAutomation ){
          if( Box.params != undefined ){
            sstr += WikiCell(  WikiToHtm(Box.params) );
          } else {
            sstr += WikiCell( "<em>none</em>");
          }

        } else {
          if( Box.accel == "" )
            sstr += WikiCell( "<em>unassigned</em>" );
          else if( App.ExtraShortcuts.indexOf(Box.accel) >= 0 )
            sstr += WikiCell( WikiFullShortcut( Box.accel ) );
          else
            sstr += WikiCell( WikiShortcut( Box.accel ) );
        }
        if( Box.long )
          sstr += WikiCell( WikiToHtm(Box.long) );
        else
          sstr += WikiCell( "no tip string.");
        bEmpty = false;
        str += WikiRow( sstr );
      }
    }

    var nextIndent = -1;
    if( i < App.Menus.length -1 )
      nextIndent = App.Menus[i+1].depth;
    if( (nextIndent > Box.depth) && (Box.depth >indent) && subsAllowed ){
      SubItems.push(i);
      subsAllowed = false;
    }

    if( nextIndent <= indent ){
      if( !bEmpty ){
        str += "</table>\r\n";
        //str += "{{hoverext|hover=|ext=}}\r\n";
        results += str;
        bEmpty = true;
      }
      str = "";
      if( SubItems.length > 0  ){
        for(j=0;j<SubItems.length ;j++){
          results += MakeKeyboardReference2(SubItems[j], TopName, type );
        }
        SubItems=[];
      }
    }

  }
  return results;
}
/**
 * returns all menus starting at item from, or the empty string.
 * If in automation mode, only the menu items with an id are used.
 * @returns {string}
 */
function MakeKeyboardReference(from, prefix, type){
  var i;
  var str = "";
  var Name ="";
  var lowName="";
  var Prefix = "";
  var indent = -1;
  var SubItems = [];
  var results = "";
  var subsAllowed = false;
  var TopName = "";
  var bEmpty =true;
  var bIsAutomation = type == "automation";

  //console.log( "Keyboard from:"+from+" prefix:"+prefix );
  for(i=from;i< App.Menus.length;i++){
    var Box = App.Menus[i];
    if( Box.depth < indent )
      return results;
    if( i== from ){
      indent = Box.depth;
    }
    Name = Box.label;
    lowName = CleanAnchor( Name );
    var boxIndent = Box.depth;
    if( Name.indexOf("---") >=0 )
      ;
    else if( boxIndent == indent ){
      if( indent < 1 )
        str += "<div id=\""+lowName+"_menu\"></div>\r\n";
      else
        str += "<div id=\""+CleanAnchor( prefix ) + "_" + lowName+"_submenu\"></div>\r\n";
      if( Box.depth == 0 )
        str += "==[["+CleanPageName(Name+"_Menu")+"|"+Name+" Menu]]==\r\n";
      if( Box.depth == 1 )
        str += "===[["+CleanPageName(prefix +"_Menu:_" +Name)+"|"+prefix + ": " +Name+"]]===\r\n";
      if( Box.long )
        str += "{{note|" + Box.long + " }}\r\n";
      else
        str += "{{note| No special notes for "+Name+" }}\r\n";
      str += "{| class=\"prettytablerows\" rules = \"rows\" border = \"2\"" +
        " width=\"100%\"\r\n";
      if( bIsAutomation )
        str += "!width=\"15%\"|Scripting Id\r\n";
      str += "!width=\"15%\"|Action\r\n";
      if( !bIsAutomation ){
        str += "!width=\"10%\"|Shortcut\r\n";
        str += "!width=\"75%\"|Description\r\n";
      }
      else {
        str += "!width=\"30%\"|Parameters\r\n";
        str += "!width=\"55%\"|Description\r\n";
      }
      Prefix = Name;
      subsAllowed = true;
      bEmpty = true;
      TopName = Name;
    }
    else if( boxIndent == (indent+1) ){
      if( !bIsAutomation || (Box.id != undefined ) ){
        str += "|-\r\n";
        if( bIsAutomation ){
          str += "|'''" + Box.id + ":'''\r\n";
        }
        if( boxIndent == 1 )
          str +=
            "|[[" + TopName + "_Menu#" + lowName + "|" + Name + "]]\r\n"; else
          str +=
            "|[[" + prefix + "_Menu:_" + TopName + "#" + lowName + "|" + Name +
            "]]\r\n";
        if( bIsAutomation ){
          if( Box.params != undefined ){
            str += "|" + Box.params + "\r\n";
          } else {
            str += "|''none''\r\n";
          }

        } else {
          if( Box.accel == "" )
            str += "|{{unassigned}}\r\n";
          else if( App.ExtraShortcuts.indexOf(Box.accel) >= 0 )
            str += "|{{fullshortcut|" + Box.accel + "}}\r\n";
          else
            str += "|{{shortcut|" + Box.accel + "}}\r\n";
        }
        if( Box.long )
          str += "|" + Box.long + "\r\n"; else
          str += "| no tip string.\r\n";
        bEmpty = false;
      }
    }

    var nextIndent = -1;
    if( i < App.Menus.length -1 )
      nextIndent = App.Menus[i+1].depth;
    if( (nextIndent > Box.depth) && (Box.depth >indent) && subsAllowed ){
      SubItems.push(i);
      subsAllowed = false;
    }

    if( nextIndent <= indent ){
      if( !bEmpty ){
        str += "|}\r\n";
        str += "{{hoverext|hover=|ext=}}\r\n";
        results += str;
        bEmpty = true;
      }
      str = "";
      if( SubItems.length > 0  ){
        for(j=0;j<SubItems.length ;j++){
          results += MakeKeyboardReference(SubItems[j], TopName, type );
        }
        SubItems=[];
      }
    }

  }
  return results;
}


/**
 * returns all preferences starting at item from, or the empty string.
 * @returns {string}
 */
function MakePreferencesReference2(from, prefix, type){
  var i;
  var str = "";
  var Name ="";
  var lowName="preferences";
  var Prefix = "";
  var results = "";
  var subsAllowed = false;
  var TopName = "";

  //console.log( "Keyboard from:"+from+" prefix:"+prefix );
  for(i=from;i< App.Prefs.length;i++){

    var X = [
      {
        key: "/AudioIO/Host", type: "enum", default: "", enum: [
        "MME", "Windows DirectSound", "Windows WASAPI"
      ]
      }, {
        key: "/AudioIO/LatencyDuration",
        prompt: "&Buffer length:",
        type: "number",
        default: 100
      },
    ];


//--------------------




    var Item = App.Prefs[i];
    if( i == 0 ){
      Name = "Preferences";
      str += "<div id=\"" + lowName + "\"></div>\r\n";
      str += WikiHead2( WikiLink( "Preferences", "Preferences" ));
      str += WikiNote( "No special notes for " + Name );
      str += "<table class=\"prettytablerows\" rules = \"rows\" border =" +
        " \"2\"" +
        " width=\"100%\">\r\n";
      var astr="";
      astr += WikiTitleCell("Scripting Id", "10%");
      astr += WikiTitleCell("Prompt","20%");
      astr += WikiTitleCell("Parameters","30%");
      astr += WikiTitleCell("Description","55%");
      str += WikiRow( astr );
      Prefix = Name;
      subsAllowed = true;
      TopName = Name;
    }

    var Params = PrintableOfParams( [ Item ] );
    var Prompt = Item.prompt || "";
    Prompt = Prompt.replace( '\&', '' );

    var rstr="";
    rstr += WikiCell( "<b>" + Item.id  + "</b>" );
    rstr += WikiCell( WikiToHtm( Prompt) );
    rstr += WikiCell( WikiToHtm( Params) );
    rstr += WikiCell( "no tip string.");
    str += WikiRow( rstr );
  }
  str += "</table>\r\n";
  results += str;
  return results;
}

/**
 * returns all preferences starting at item from, or the empty string.
 * @returns {string}
 */
function MakePreferencesReference(from, prefix, type){
  var i;
  var str = "";
  var Name ="";
  var lowName="preferences";
  var Prefix = "";
  var results = "";
  var subsAllowed = false;
  var TopName = "";

  //console.log( "Keyboard from:"+from+" prefix:"+prefix );
  for(i=from;i< App.Prefs.length;i++){

    var X = [
      {
        key: "/AudioIO/Host", type: "enum", default: "", enum: [
        "MME", "Windows DirectSound", "Windows WASAPI"
      ]
      }, {
        key: "/AudioIO/LatencyDuration",
        prompt: "&Buffer length:",
        type: "number",
        default: 100
      },
    ];

    var Item = App.Prefs[i];
    if( i == 0 ){
      Name = "Preferences";
      str += "<div id=\"" + lowName + "\"></div>\r\n";
      str += "==[[Preferences]]==\r\n";
      str += "{{note| No special notes for " + Name + " }}\r\n";
      str += "{| class=\"prettytablerows\" rules = \"rows\" border = \"2\"" +
        " width=\"100%\"\r\n";
      str += "!width=\"10%\"|Scripting Id\r\n";
      str += "!width=\"20%\"|Prompt\r\n";
      str += "!width=\"30%\"|Parameters\r\n";
      str += "!width=\"55%\"|Description\r\n";

      Prefix = Name;
      subsAllowed = true;
      TopName = Name;
    }

    var Params = PrintableOfParams( [ Item ] );
    var Prompt = Item.prompt || "";
    Prompt = Prompt.replace( '\&', '' );

    str += "|-\r\n";
    str += "|'''" + Item.id  + "'''\r\n";
    str += "|" + Prompt  + "\r\n";
    str += "|" + Params + "\r\n";
    str += "| no tip string.\r\n";
  }
  str += "|}\r\n";
  results += str;
  return results;
}



/**
 * Wiki template for tools image map 'here doc'
 * @returns {string}
 */
Audacity.ToolsImap = function(){

  /*HEREDOC
   </noinclude><includeonly>{{#switch: {{{1|EditToolbar}}}
   |Dock1=:<imagemap>
   Image:Dock1Annotated.png
   desc none
   rect 2 2 121 16 [[Transport Toolbar|Transport Toolbar has buttons for controlling playback and recording and for moving to the project start or end]]
   rect 0 42 298 95 [[Transport Toolbar|Transport Toolbar has buttons for controlling playback and recording and for moving to the project start or end]]
   rect 181 2 271 16 [[Tools Toolbar|Tools Toolbar lets you choose various tools for selection, volume adjustment, zooming and time-shifting of audio]]
   rect 299 42 384 95 [[Tools Toolbar|Tools Toolbar lets you choose various tools for selection, volume adjustment, zooming and time-shifting of audio]]
   rect 359 2 523 16 [[Meter Toolbar|Recording Meter Toolbar lets you see if audio being recorded is clipped, which results in distortion]]
   rect 385 42 806 68 [[Meter Toolbar|Recording Meter Toolbar lets you see if audio being recorded is clipped, which results in distortion]]
   rect 650 2 806 16 [[Meter Toolbar|Playback Meter Toolbar lets you see if audio being edited is clipped, which results in distortion]]
   rect 385 69 806 95 [[Meter Toolbar|Playback Meter Toolbar lets you see if audio being edited is clipped, which results in distortion]]
   rect 4 178 94 191 [[Mixer Toolbar|Mixer Toolbar lets you adjust Recording Volume (the amplitude at which recordings will be made) and Playback Volume (how loud the project's audio sounds, not affecting the volume of exported audio]]
   rect 0 96 294 121 [[Mixer Toolbar|Mixer Toolbar lets you adjust Recording Volume (the amplitude at which recordings will be made) and Playback Volume (how loud the project's audio sounds, not affecting the volume of exported audio]]
   rect 155 178 235 191 [[Edit Toolbar|Edit Toolbar has buttons for editing and zooming which are an alternative to using menu items or keyboard shortcuts for these tasks]]
   rect 295 96 598 121 [[Edit Toolbar|Edit Toolbar has buttons for editing and zooming which are an alternative to using menu items or keyboard shortcuts for these tasks]]
   rect 269 178 368 191 [[Device Toolbar|Device Toolbar selects Audio Host, recording device, recording channels and playback device, avoiding the need to open Devices Preferences to make these settings]]
   rect 0 122 565 148 [[Device Toolbar|Device Toolbar selects Audio Host, recording device, recording channels and playback device, avoiding the need to open Devices Preferences to make these settings]]
   rect 439 178 580 191 [[Transcription Toolbar|Transcription Toolbar|Transcription Toolbar lets you play audio at a slower or faster speed than normal, also affecting pitch]]
   rect 599 96 806 121 [[Transcription Toolbar|Transcription Toolbar|Transcription Toolbar lets you play audio at a slower or faster speed than normal, also affecting pitch]]
   </imagemap>
   {{ClickTip|y=5}}


   &nbsp;
   HEREDOC*/

  var pieces;

  /*HEREDOC
   |#default=
   {{ednote|This ednote will automagically be replaced by the Annotated
   image {{{1}}}Annotated.png, when it is ready}}}}</includeonly>
   HEREDOC*/

  pieces = Audacity.ToolsImap.toString().split( "HEREDOC" );

  return pieces[1] + MakeToolMap(0) +MakeToolMap(1) + MakeToolMap(2) + MakeToolMap(3) +pieces[3];
};
/**
 * Wiki template for menus image map 'here doc'
 * @returns {string}
 */
Audacity.MenuImap = function(){

  /*HEREDOC
   </noinclude><includeonly>{{#switch: {{{menu}}}
   HEREDOC*/

  var pieces;

  /*HEREDOC
   |#default=
   {{ednote|This ednote will automagically be replaced by the Annotated
   menu {{{menu}}}.png, when it is ready}}}}</includeonly>
   HEREDOC*/

  pieces = Audacity.MenuImap.toString().split( "HEREDOC" );
  JoinTipsIntoMenus();

  var mappy = MakeMenuMap(0, "", "", 0, 5 );
  //console.log( mappy );

  return pieces[1] + mappy  + pieces[3];
};
/**
 * Nyquist wrappers for aud-do functions.
 * @returns {string}
 */
Audacity.NyquistWrappers = function(){
  var Coms = Audacity.Commands;
  var Str = "";
  for(var i=0;i<Coms.length; i++){
    var Command = Coms[i];
    var keyArgs = "";
    var callArgs = "";
    for( var j=0;j< Command.params.length; j++){
      var param = Command.params[j];
      keyArgs += " " + param.key.toLowerCase();
      callArgs += " \"" + param.key +"\" " + param.key.toLowerCase();

    }
    Str += "(defun aud:" + MungedId( Command.id ) + " (&key" + keyArgs + ")\r\n" +
      "   (aud-do \"" + Command.id + "\"" + callArgs + "))\r\n\r\n";

  }
  return Str;
};
/**
 * Make the keyboard reference
 * @returns {string}
 */
Audacity.KeyboardReference = function(){
  JoinTipsIntoMenus();
  return MakeLittleTable() + "\r\n\r\n" +
    MakeKeyboardReference(0,"", "keyboard");
};
/**
 * Make the Automation (commands) reference
 * @returns {string}
 */
Audacity.AutomationReference = function(){
  JoinTipsIntoMenus();
  JoinCommandsIntoMenus();
  return MakeKeyboardReference(0,"", "automation");
};
/**
* Make the Automation (commands) reference
* @returns {string}
*/
Audacity.Reference = function( type ){
  JoinTipsIntoMenus();
  JoinCommandsIntoMenus();
  if( type == "prefs")
    return MakePreferencesReference2( 0 );
  return MakeKeyboardReference2(0,"", type);
};
/**
 * Make the preferences reference
 * @returns {string}
 */
Audacity.PreferencesReference = function(){
  JoinTipsIntoMenus();
  JoinCommandsIntoMenus();
  return MakePreferencesReference(0,"", "");
};