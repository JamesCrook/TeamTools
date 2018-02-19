## 'What is That?' Audacity Help Page.

This is now working and at https://wit.audacityteam.org

It can:

* Show you the name and help for different parts of the user interface
* Connect in to doxygen documentation
* Generate image maps for the manual.

### Conversion of manual into WIT narrow format

Conversion of the manual is now much easier than before.  There is 
a custom 303.css that is used instead of the one in the online manual.
With a little more work we could make the css responsive, so that it 
is the same css for both - just using the more compact layout when in a
narrow browser window.

External hyperlinks to wikipedia and mediawiki now have a target="manual" 
so as to force them into a larger window.  They don't adjust 
to a narrow window.  That could be made part of the mw2html script, but 
I did it by search and replace.  It can't be done by css.

### Using WIT to update "Bill's Amazing Image Map" 

For the front page of https://alphamanual.audacityteam.org: 

* Open WIT in Chrome
* Shift+Click on special to get the secret extra special editors options.  
* Click Enable annotation-capture mode to get the numbers on the image.  
* Click 'Download the current image' to get the image.  


The matching image map is in the 'Download all-toolbars image map', 
along with image maps for all annotated toolbars.
 
### Using WIT for other manual updates.

Follow the same steps as above, but click on the image to get different 
annotated toolbars or menus before downloading the 'current image'
 
Other download buttons fetch the other image maps.  There are multiple 
image maps using mediawiki+parserfunctions markup in each download.   


### Updating WIT menus.
 
Go to https://wiki.audacityteam.org/wiki/WIT_Audacity_Menus and edit 
the menu (in JSON) there, to update the menu in WIT.
 
That menu can be retrieved from Audacity using the scripting command 
GetMenusPlus.

### Highlight one button

Annotated toolbar images with one item highlighted can be obtained by 
choosing the toolbar (click), hover over the item to highlight, then 
hold shift down as you move the mouse away.  The highlight will stay 
and can be captured from the special panel.

