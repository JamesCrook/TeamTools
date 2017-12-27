/**
 * Created by James Crook on 12/27/2017.
 */

var Menu = {width:150,height:250};


function DrawMenuBack( x,y ){

  Gui.Ctx.save();
  Gui.Ctx.fillStyle = '#f2f2f2';
  Gui.Ctx.shadowColor = '#777777';
  Gui.Ctx.shadowBlur = 2;
  Gui.Ctx.shadowOffsetX = 2;
  Gui.Ctx.shadowOffsetY = 2;
  Gui.Ctx.lineWidth = 1;
  Gui.Ctx.beginPath();
  Gui.Ctx.rect(x, y, Menu.width, Menu.height);
  Gui.Ctx.fill();
  Gui.Ctx.restore();

  Gui.Ctx.beginPath();
  Gui.Ctx.strokeStyle = '#cccccc';
  Gui.Ctx.lineWidth = 1;
  Gui.Ctx.rect(x, y, Menu.width, Menu.height);
  Gui.Ctx.stroke();

}

var menuSelected = 1;
var menuChevron  = 2;
var menuCheckbox = 4;

function DrawItem( x,y, text, accel, flags ){
  if( (flags & menuSelected )){
  }
  if( (flags & menuChevron )){
  }
  if( flags & menuCheckbox ){
  }
  if( text.indexOf( '---' ) == 0 ){
    Gui.Ctx.fillStyle = '#cccccc';
    Gui.Ctx.lineWidth = 1;
    Gui.Ctx.moveTo( x+31,y+5 );
    Gui.Ctx.lineTo( x+Menu.width -5, y+5 );
    Gui.Ctx.stroke();
    y+= 7;
  }
  else {
    Gui.Ctx.font = "12px Arial";
    Gui.Ctx.fillStyle = 'black';
    var w = Gui.Ctx.measureText(accel).width;
    Gui.Ctx.fillText(text,  x + 31 + 4, y+18);
    Gui.Ctx.fillText(accel, x + Menu.width -20-w, y+18);
    y+=22;
  }
  return {x:x,y:y};
}


/*
function DrawMenuItem( Gui, x, y, item )
{
  var
  // Background for menu, with drop shadow.
  if( iItem == 0 ){
    SetBrushColour( wxColour( 0xf2f2f2 ) );
    SetPenColour( wxColour( 0xcccccc ));
    DrawRectangle( x+xx, y+yy, ww, hh );
    SetPenColour( wxColour( 0x777777 ));
    DrawLine( x+xx+1, y+yy+hh, x+xx+ww+1, y+yy+hh );
    DrawLine( x+xx+ww, y+yy+1, x+xx+ww,   y+yy+hh+1 );
    SetPenColour( wxColour( 0xaaaaaa ));
    DrawLine( x+xx+2, y+yy+hh+1, x+xx+ww+2, y+yy+hh+1 );
    DrawLine( x+xx+ww+1, y+yy+2, x+xx+ww+1,   y+yy+hh+2 );
    fBarStart = y+yy;
    xx +=31;
    yy +=6;
  }
  ww -=31;

  tMenuItem & M=_MenuItems[iItem];
  if( M.iMenu != iMenuNumber )
    return;
  tMenuItem &N = _MenuItems[ iMenuNumber ];
  wxString Temp = *M.pName;
  wxString T1 = Temp.BeforeLast( '¬' );
  wxString T2 = Temp.AfterLast( '¬' );
  if( (M.iFlags & 4) != 0 ){
    SetBrushColour( wxColour( 0xf6c890 ) );
    SetPenColour( wxColour( 0xf6c890 ) );
    fBarStart = y+yy-3;
    DrawRectangle( x+xx-28, y+yy-3, ww+25, 22 );

  }
  wxString Link=wxString::Format("%s#%s",Parent,ValidName( Temp ).Lower());
  if( (M.iFlags &1) != 0 ){
    // Draw chevron for more on right
    // Two versions, one selected, one not.
    wxBitmap chevron(( (M.iFlags &4) != 0 ) ? Chevron2_xpm: Chevron_xpm);
    pDC->DrawBitmap( chevron, x+xx+ww-25 , y+yy-3 );
    Link = Parent + ": "+T1;
    //DrawText( ">", x+xx+ww-20, y+yy);
  }
  if(( M.iFlags &2) != 0 ){
    wxBitmap check(Tick_xpm);
    pDC->DrawBitmap( check, x+xx-28 , y+yy-3 );
  }

  if( Temp.StartsWith( "--" )){
    SetPenColour( wxColour( 0xcccccc ));
    DrawLine( x+xx, y+yy, x+xx+ww-5, y+yy);
    yy += 7;
  }
  else
  {
    // Command text
    DrawText( T1, x+xx+4, y+yy);
    if( bCapturePngs )
    {
      //wxLogDebug( "Check: %s%s", Submenu, Link);
      wxString No_ = Submenu + Link ;
      No_.Replace( " ", "_" );

      int ll = RedirectFrom.Index( No_ );
      if( ll != wxNOT_FOUND )
        Link = RedirectTo[ ll ];
      Rects = Rects + wxString::Format("rect %d %d %d %d [[%s|%s]]\n",
          (int)xx-32, (int)(yy-13), (int)(xx+ww-17), (int)(yy+9),
      Link, DeWikify(*M.pShortDesc) );
      Divs = Divs + wxString::Format( "\n<div id=\"%s\"></div>\n",
          ValidName( Temp ).Lower());
      if( (M.iFlags &1)!=0){
        Divs = Divs + wxString::Format( "==[[%s|%s SubMenu]] &nbsp;<font size=\"-1\">{{shortcut|%s}}</font> ==\n%s\n",
            Link, T1,T2,*M.pDesc );
        Divs = Divs + wxString::Format( "Find out more about the '%s' submenu [[%s|here]].\n", T1, Link );
      }
      else
        Divs = Divs + wxString::Format( "==%s &nbsp;<font size=\"-1\">{{shortcut|%s}}</font> ==\n%s\n",
            T1,T2,*M.pDesc);
    }
    // Shortcut text
    wxCoord lx,ly;
    pDC->GetTextExtent( T2, &lx, &ly );
    DrawText( T2, x+xx+ww-20-lx, y+yy);
    yy+=22;
  }
}
*/