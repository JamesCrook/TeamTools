from bs4 import BeautifulSoup, Comment, Doctype
from PIL import Image
import os
import os.path
import re

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

def label_of_ref( ref ):
    global this_file
    if not '.html' in ref :
        ref = this_file + "#" + ref
    ref = ref.replace('#', '_' )
    ref = ref.replace('../', '' )
    ref = ref.replace('.html', '_' )
    ref = ref.replace('/', '_' )
    ref = ref.replace('__', '_' )
    ref = ref.replace('_', ':' )
    return ref

def png_filename_of_link( link ):
    # src could for example be '../m/images/9/90/play.png'
    pieces = link.split( '/images/' )
    if len( pieces ) > 1 :
        link = "C:\\OpenSourceGit\\AudacityTeamTools\\test\\m\\images\\" + pieces[-1]
        return link
    print( "Bad name" + link )
    return link

def add_image_map( tag, siz ):
    map_tag = tag.find_previous_sibling( 'map' )
    if not map_tag:
        return tag
    scale = 0.5
    while ( siz[0] * scale ) > 300 :
       scale *= 0.8
    preamble = '\n\n\\par\\Needspace{'+str(100+siz[1]*scale)+'pt}\\begin{picture}('+str(siz[0]*scale)+','+str(siz[1]*scale)+')\n'
    postamble = ''
    for area in map_tag.find_all( name='area' ):
        if area.has_attr( 'coords' ) and area.has_attr( 'href' ) and area.has_attr('shape'):
            if( area['shape']=='rect' ) :
                label = label_of_ref( area['href'] )
                coords = area['coords'].split(',')
                coords = [int(x)*scale for x in coords]# convert to numbers.
                # print( 'coord ',coords )
                x,y,x1,y1 = coords
                w = x1-x
                y = siz[1]*scale-y
                y1 = siz[1]*scale-y1
                h = y-y1
                # Do not include the rather wide hotspots.
                if( w < 290 ):
                    x,y1,w,h = [str(k) for k in [x,y1,w,h]]
                    postamble += '   \\put('+x+','+y1+'){\\hyperref[\\foo{'+label+'}]{\\makebox('+w+','+h+'){}}}\n'
    postamble += '\\end{picture}\n\n'
    tag.insert_before( Comment( preamble ) )
    tag.insert_after( Comment( postamble ) )
    tag.insert_before( Comment('   \\put(0,0){\\includegraphics[scale='+str(scale)+']{') )
    tag.insert_after(  Comment('}}\n') )
    return tag
                    
def cleanup_soup( soup ):

    # Remove comments
    for comment in soup.findAll(text=lambda text:isinstance(text, Comment)):
        comment.extract()

    # Remove the wikimedia TOC (3 tags to remove)    
    for tag in soup.find_all(name='span', id='Contents' ):
        tag = tag.parent;
        tag = tag.next_sibling;
        tag = tag.next_sibling;
        tag.previous_sibling.extract()
        tag.previous_sibling.extract()
        tag.extract()
        
    # Remove more wikimedia cruft (sidebar, footer)
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
            if tag['id'] == "toc" :
               tag.extract()


    for tag in soup.find_all(name='ul' ):
        if not tag.contents[0].name == 'li' :
            print( "Bad ul tag fixed" )
            tag.insert( 0, Comment( "\\item " ) )

    # Our two column mode
    # Each file is a chapter, starting at h1.
    # And with the 2-col environment inside it.
    tag = soup.body
    if tag:
        # The title is one column
        tag2 = soup.find( 'h1' )
        if tag2:
            tag2.insert_after(Comment('latex \\label{' +label_of_ref('') +'}')) 
            tag2.insert_after(Comment('latex \\begin{multicols}{2}') )
        else:
            tag.insert(0,Comment('latex \\begin{multicols}{2}') )
            tag.insert(0,Comment('latex \\label{' +label_of_ref('') +'}')) 
        tag.insert(-1,Comment('latex \\end{multicols}') )
      
    # anchors become \hyperrefs and \labels
    # provided they are relative.
    for tag in soup.find_all(name='a' ):
        if tag.has_attr( 'href' ) :
            if not tag.find(name='img'):
                if not tag['href'].startswith('http'):
                    label = label_of_ref( tag['href'] )
                    #print( "hyperref: ", label )
                    tag.insert_before( Comment('latex \n\\hyperref[\\foo{'+label+'}]{') )
                    tag.insert_after( Comment('latex }\n') )

    # divs may provide \labels
    for tag in soup.find_all(name='div' ):
        if tag.has_attr( 'id' ) and not tag.contents :
            label = label_of_ref( tag['id'])                   
            #print( "label: ", label )
            tag2 = tag.find_next_sibling( re.compile( '^h\d') )
            if tag2:
                tag2.insert_after( Comment('latex \n\\label{'+label+'}') )
            else:
                print( 'No title for ' + label )
                tag.insert_before( Comment('latex \n\\label{'+label+'}') )
     
    # (valid) images get treated depending on their size
    # all our images are screenshots, so we just check sizes in pixels.
    #  - small images are inline, and are already sized (using dpi) for inline use
    #  - large images are 72 dpi, and will be at most one column width.
    for tag in soup.find_all(name='img' ):
        if tag.has_attr( 'src' ) :
            png_filename = png_filename_of_link( tag['src'] )
            if os.path.isfile( png_filename ) :
                with Image.open(png_filename) as image:
                    siz = image.size
                    if tag.has_attr('usemap') :
                        # no par for image map.
                        tag = add_image_map( tag, siz )
                    elif siz[0] > 60 or siz[1] > 30:
                        #Bigger images...
                        #print( png_filename )
                        tag.insert_before( Comment('\n\\par\\includegraphics[max width=\\linewidth]{') )
                        tag.insert_after(  Comment('}\\par\n') )
                    else:
                        tag.insert_before(Comment( '\\texorpdfstring{\\protect\\includegraphics[max width=\\linewidth]{' ))
                        tag.insert_after( Comment( '}}{}' ))                        
            # file name is used by includegraphics
            tag.insert( 0, Comment( png_filename.replace('\\','/') ) )

        
               

tagspec = {
#    ( 'h0', '\n\\chapter{', '}' ),
    ( 'h1', '\n\\ensurespace\\section{', '}\n\\par\\vspace{1mm}\\hrule\n' ),
    ( 'h2', '\n\\subsection{', '}' ),
    ( 'h3', '\n\\subsubsection{', '}' ),
    ( 'h4', '\n\\subsubsection{', '}' ),
    ( 'h5', '\n\\subsubsection{', '}' ),
#   ( 'h4', '\n\\paragraph{', '}' ),
#   ( 'h5', '\n\\subparagraph{', '}' ),
    ( 'ul', '\n\\begin{itemize}', '\n\\end{itemize}\n' ),
    ( 'ol', '\n\\begin{enumerate}', '\n\\end{enumerate}\n' ),
    ( 'li', '\n\\item ', '' ),
    ( 'lh', '\n\\item ', '' ),
    ( 'i',  '\\textit{', '}' ),
    ( 'em', '\\emph{', '}' ),
    ( 'b',  '\\textbf{', '}' ),
    ( 'hr', '\\vspace{1mm}\\hrule ', '' ),
    ( 'tr', '\\par ', '' ),
#   ( 'img','\\texorpdfstring{\\protect\\includegraphics[max width=\\linewidth]{', '}}{}' ),    
}   

def latexify( soup ):
    for item in tagspec :
        for tag in soup.find_all(name= item[0] ):
            if item[1] :
                tag.insert_before(Comment( item[1] ))
            if item[2] :              
                tag.insert_after( Comment( item[2] ))

#    for tag in soup.find_all(name='h2' ):
#        tag.insert_before(Comment('platex \n\\section{') )
#        tag.insert_after(Comment('platex }\n') )



def cleanup_file( src,dest ):
    global this_file
    #print()
    this_file = os.path.basename( dest )
    print( "Processing: "+this_file )
    with open(src, encoding='utf8') as file:
        soup = BeautifulSoup(file, "html5lib")
        cleanup_soup( soup )
        latexify( soup )
        with open(dest, "w", encoding='utf8') as dest_file:
            dest_file.write(soup.encode(formatter="html").decode( encoding='UTF-8'))
        latex = latex_of_soup( soup )
        d2 = dest.replace( '.html', '.tex' )
        with open(d2, "w", encoding='utf8') as dest_file:
            dest_file.write( latex )
        

def latex_of_soup( soup ):
    latex = ""
    for tag in soup.find_all( text=True ):
        s = str( tag )
        if isinstance( tag, Comment ):
            if s.startswith('latex '):
                s = s[6:]
        else:
            #html text is not supposed to have LaTeX in it.
            #and we have to escape \ because of python.
            s=s.replace( '\\', '\\\\' )
            s=s.replace( '#', '\\#' )
            s=s.replace( '_', '\\_' )
            s=s.replace( '%', '\\%' )
            s=s.replace( '&', '\\&' )
            s=s.replace( '{', '\\{' )
            s=s.replace( '}', '\\}' )
            s=s.replace( '~', '\\textasciitilde{}' )
            s=s.replace( '^', '\\^' )
            s=s.replace( '$', '\\$' )
        if isinstance( tag, Doctype ):
            s=""
        if tag.parent.name == u'title':
            s=""
        if not s.isspace():
            latex = latex + s
    return latex

def clean_all():
    for dirpath, dirnames, filenames in os.walk( base_dir):
        for filename in [f for f in filenames if f.endswith(".html")]:
            infile = os.path.join(dirpath, filename)
            outfile = os.path.join(dest_dir, os.path.relpath( infile, base_dir ))
            #print( infile )
            #print( outfile )
            cleanup_file( infile, outfile )



def size_file( src,dest ):
    with Image.open(src) as image:
        siz = image.size
        if( siz[0] < 24 ):
           print()
           print( src )
           print( siz )
           scal = siz[1] * 7.8
           print( "New dpi is ", (scal, scal ) )
           image.save( dest, dpi=(scal,scal) )
        else :
           image.save( dest )


def size_all():
    for dirpath, dirnames, filenames in os.walk( base_dir):
        for filename in [f for f in filenames if f.endswith(".png")]:
            infile = os.path.join(dirpath, filename)
            outfile = os.path.join(dest_dir, os.path.relpath( infile, base_dir ))
            size_file( infile, outfile )

base_dir = "C:\\OpenSourceGit\\AudacityTeamTools\\help\\manual"
dest_dir = "C:\\OpenSourceGit\\AudacityTeamTools\\test"
#currently being processed file/
this_file = ""


disabled = """

soup = BeautifulSoup(html_doc, 'html.parser')
print( soup.find_all( text=True ))

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
#clean_one_file( "glossary.html" )
#clean_one_file( "file_menu_chains.html" )

#print( file )
#size_all()
clean_all()
