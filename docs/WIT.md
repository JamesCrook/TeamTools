## 'What is That?' Audacity Help Page.

This is now working and at [https://wit.audacityteam.org]

It can:

* Show you the name and help for different parts of the user interface
* Connect in to doxygen documentation
* Generate image maps for the manual.


Conversion of the manual is now mush easier than before.  There is 
a custom 303.css that is used instead of the one in the online manual.
With a little more work we could make the css responsive, so that it 
is the same css for both - just using the more compact layout when in a
narrow browser window.

External hyperlinks to wikipedia and mediawiki now have a target="manual" 
so as to force them into a larger window.  They don't adjust 
to a narrow window.  That could be made part of the mw2html script, but 
I did it by search and replace.  It can't be done by css.


