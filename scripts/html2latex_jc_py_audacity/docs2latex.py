from bs4 import BeautifulSoup, Comment
from PIL import Image
import os
import os.path

html_doc = """
<!DOCTYPE html>
<html class="client-nojs" dir="ltr" lang="en">
 <head>
  <meta charset="utf-8"/>
  <title>
   New features in this release - Audacity Development Manual
  </title>
  <!--[if IE 6]><link rel="stylesheet" href="../m/skins/monobook/ie60fixes.css/303.css" media="screen"/><![endif]-->
  <!--[if IE 7]><link rel="stylesheet" href="../m/skins/monobook/ie70fixes.css/303.css" media="screen"/><![endif]-->
  <meta content="" name="ResourceLoaderDynamicStyles"/>
  <meta content="MediaWiki 1.28.2" name="generator"/>
  <link href="../favicon.ico" rel="shortcut icon"/>
  <link href="http://alphamanual.audacityteam.org/m/opensearch_desc.php" rel="search" title="Audacity Development Manual (en)" type="application/opensearchdescription+xml"/>
  <link href="http://alphamanual.audacityteam.org/m/api.php?action=rsd" rel="EditURI" type="application/rsd+xml"/>
  <link href="https://creativecommons.org/licenses/by/3.0/" rel="copyright"/>
  <link href="../m/skins/monobook/main.css/303.css" media="screen" rel="stylesheet"/>
 </head>
 <body class="mediawiki ltr sitedir-ltr mw-hide-empty-elt ns-0 ns-subject page-New_features_in_this_release rootpage-New_features_in_this_release skin-monobook action-view">
  <div id="globalWrapper">
   <div id="column-content">
    <div class="mw-body" id="content" role="main">
     <a id="top">
     </a>
     <div class="mw-indicators">
     </div>
     <h1 class="firstHeading" id="firstHeading" lang="en">
      New features in this release
     </h1>
     <div class="mw-body-content" id="bodyContent">
      <div id="siteSub">
       From Audacity Development Manual
      </div>
      <div id="contentSub">
      </div>
      <div class="mw-jump" id="jump-to-nav">
       Jump to:
       <a href="#column-one">
        navigation
       </a>
       ,
       <a href="http://alphamanual.audacityteam.org/man/New_features_in_this_release#searchInput">
        search
       </a>
      </div>
      <!-- start content -->
      <div class="mw-content-ltr" dir="ltr" id="mw-content-text" lang="en">
       <p>
        <br/>
       </p>
       <center>
        <a href="http://audacityteam.org/" rel="nofollow" title="size=50%">
         <img alt="size=50%" height="138" src="../m/images/8/88/audacity_logo_signika_512_transparent.png" width="512"/>
        </a>
       </center>
       <div class="intro">
        <span style="font-size:120%">
         <b>
          This page is an overview of the key new functionality that has been introduced in Audacity 2.2.0
         </b>
        </span>
        <ul>
         <li>
          <span style="font-size:110%">
           Details of all the major changes since 2.1.3 can be found in
           <a class="external text" href="https://wiki.audacityteam.org/wiki/Release_Notes_2.2.0" rel="nofollow">
            Release Notes 2.2.0
           </a>
           .
          </span>
         </li>
        </ul>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
  <div>
   <h2>
    <span class="mw-headline" id="Contents">
     Contents
    </span>
   </h2>
   <ol>
    <li>
     <a href="#logo">
      New Logo
     </a>
    </li>
    <li>
     <a href="#themes">
      Themes
     </a>
    </li>
    <li>
     <a href="#midi">
      MIDI (and Allegro) Playback
     </a>
    </li>
    <li>
     <a href="#stemplots">
      Stem Plots
     </a>
    </li>
    <li>
     <a href="#menus">
      Menu reorganization
     </a>
    </li>
    <li>
     <a href="#extendedmenubar">
      The Extended Menu Bar
     </a>
    </li>
    <li>
     <a href="#append">
      Default Append Record
     </a>
    </li>
    <li>
     <a href="#help-buttons">
      Help buttons
     </a>
    </li>
    <li>
     <a href="#shortcuts">
      Standard and Full shortcut sets
     </a>
    </li>
    <li>
     <a href="#selection">
      Selection Toolbar improvements
     </a>
    </li>
    <li>
     <a href="#clips">
      New commands for using clips via the keyboard
     </a>
    </li>
    <li>
     <a href="#safety">
      Running out of disk space
     </a>
    </li>
    <li>
     <a href="#appendix">
      Additional new features
     </a>
    </li>
   </ol>
   <p>
    <br/>
   </p>
   <p>
    <br/>
   </p>
   <div id="logo">
   </div>
   <p class="story">
    ...
   </p>
  </div>
 </body>
</html>
"""

def cleanup_soup( soup ):
    for comment in soup.findAll(text=lambda text:isinstance(text, Comment)):
        comment.extract()

    tag = soup.body
    if tag:
        tag2 = soup.find( 'h1' )
        if tag2:
            tag2.insert_after(Comment('latex \\begin{multicols}{2}') )
        else:
            tag.insert(0,Comment('latex \\begin{multicols}{2}') )
        tag.insert(-1,Comment('latex \\end{multicols}') )
      
        
    for tag in soup.find_all(name='span', id='Contents' ):
        tag = tag.parent;
        tag = tag.next_sibling;
        tag = tag.next_sibling;
        tag.previous_sibling.extract()
        tag.previous_sibling.extract()
        tag.extract()



    for tag in soup.find_all(name='a' ):
        if tag.has_attr( 'href' ) :
            if not tag.find(name='img'):
                ref = tag['href']
                ref = ref.replace('#', '_' )
                ref = ref.replace('../', '' )
                ref = ref.replace('.html', '_' )
                ref = ref.replace('/', '_' )
                print( "Reference found: ", ref )
                tag.insert_before( Comment('latex \n\\hyperref['+ref+']{') )
                tag.insert_after( Comment('latex }\n') )

    for tag in soup.find_all(name='img' ):
        if tag.has_attr( 'src' ) :
            path = tag['src'] 
            # src could be '../m/images/9/90/play.png'
            pieces = path.split( '/images/' )
            if len( pieces ) > 1 :
                path = "C:\\OpenSourceGit\\AudacityTeamTools\\test\\m\\images\\" + pieces[-1]
                if os.path.isfile( path ) :
                    with Image.open(path) as image:
                        siz = image.size
                        if( siz[0] > 30 ):
                            print( path )
                            tag.insert_before( Comment('latex \\par') )
                            tag.insert_after( Comment('latex \\par') )
        
    for tag in soup.find_all():
        if tag.has_attr( 'id' ):
            if tag['id'] == 'jump-to-nav' :
               tag.extract()
            if tag['id'] == 'siteSub' :
               tag.extract()
            if tag['id'] == 'contentSub' :
               tag.extract()
            if tag['id'] == "column-one" :
               tag.extract()
            if tag['id'] == "footer" :
               tag.extract()
               


def cleanup_file( src,dest ):
    print()
    with open(src, encoding='utf8') as file:
        soup = BeautifulSoup(file, "html5lib")
        cleanup_soup( soup )
        with open(dest, "w", encoding='utf8') as dest_file:
            dest_file.write(soup.encode(formatter="html").decode( encoding='UTF-8'))



def clean_all():
    for dirpath, dirnames, filenames in os.walk( base_dir):
        for filename in [f for f in filenames if f.endswith(".html")]:
            print( filename )
            infile = os.path.join(dirpath, filename)
            outfile = os.path.join(dest_dir, os.path.relpath( infile, base_dir ))
            print( infile )
            print( outfile )
            cleanup_file( infile, outfile )



def size_file( src,dest ):
    with Image.open(src) as image:
        siz = image.size
        if( siz[0] < 30 ):
           print()
           print( src )
           print( siz )
           scal = siz[1] * 7.8
           print( "New dpi is ", (scal, scal ) )
           image.save( dest, dpi=(scal,scal) )
        #else :
        #    image.save( dest )


def size_all():
    for dirpath, dirnames, filenames in os.walk( base_dir):
        for filename in [f for f in filenames if f.endswith(".png")]:
            infile = os.path.join(dirpath, filename)
            outfile = os.path.join(dest_dir, os.path.relpath( infile, base_dir ))
            size_file( infile, outfile )

base_dir = "C:\\OpenSourceGit\\AudacityTeamTools\\help\\manual"
dest_dir = "C:\\OpenSourceGit\\AudacityTeamTools\\test"


soup = BeautifulSoup(html_doc, 'html.parser')
print( soup.find_all( text=True ))
disabled = """

cleanup_soup( soup )
print("---")
#print(soup.prettify())
#print( soup.encode(formatter="html").decode( encoding='UTF-8'))
 
"""

def clean_one_file( filename ) :
    file = os.path.join(base_dir + "\\man", filename)
    ofile = os.path.join(dest_dir + "\\man", filename)
    cleanup_file( file, ofile)

#clean_one_file( "new_features_in_this_release.html" )
#clean_one_file( "audacity_tour_guide.html" )

#print( file )
#size_all()
#clean_all()