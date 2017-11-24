from bs4 import BeautifulSoup, Comment, Doctype
from PIL import Image
import os
import os.path
import re


# ref is a file relative anchor e.g. Edit.html#Menu_Cut
# Convert to a label, e.g. Edit:Menu:Cut
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


# Get a full path from the file-relative link.
def abs_filename_of_relative_link( link ):
    # link could for example be '../m/images/9/90/play.png'
    global this_file
    global dest_dir
    # reconstruct the full path for this_file (in output)
    out_file = os.path.normpath( os.path.join( dest_dir, this_file) )
    # and get its dir
    start_dir = os.path.dirname( out_file )
    # absolute version of link, relative to this dir
    link = os.path.normpath( os.path.join( start_dir, link ) )
    #print( "Link: "+link)
    return link


#Adds extra comment tags into the html for the LaTeX image map
#once we have these in, the image map area tags can be ignored.
def add_image_map( tag, siz ):
    map_tag = tag.find_previous_sibling( 'map' )
    if not map_tag:
        return tag

    #Mostly the scale is half width, as we have two columns.
    scale = 0.5
    #Sometimes that does not fit, so we keep reducing.
    while ( siz[0] * scale ) > 280 :
        scale *= 0.8
    #Some images are in one column sections, so twice the size
    if tag.find_parent( "div", class_="full-width") :
        print( "Found a BIG image" )
        scale *=2
    #image may need to be on a new page.
    preamble = '\n\n\\par\\Needspace{'+str(30+siz[1]*scale)+'pt}\\begin{picture}('+str(siz[0]*scale)+','+str(siz[1]*scale)+')\n'
    postamble = ''
    for area in map_tag.find_all( name='area' ):
        if area.has_attr( 'coords' ) and area.has_attr( 'href' ) and area.has_attr('shape'):
            if( area['shape']=='rect' ) :
                label = label_of_ref( area['href'] )
                coords = area['coords'].split(',')
                #Calculations with w and h are because the HTML hotspots have
                #y down the page, and LaTeX ones go up the page.
                #And we have to play games with strings, ints and scaling.
                coords = [int(x)*scale for x in coords]# convert to numbers.
                # print( 'coord ',coords )
                x,y,x1,y1 = coords
                w = x1-x
                y = siz[1]*scale-y
                y1 = siz[1]*scale-y1
                h = y-y1
                # Do not include the rather wide hotspots.
                # Each rectangle is 'put' into the picture.
                if( w < (520*scale) ):
                    x,y1,w,h = [str(k) for k in [x,y1,w,h]]
                    postamble += '   \\put('+x+','+y1+'){\\hyperref[\\foo{'+label+'}]{\\makebox('+w+','+h+'){}}}\n'
    postamble += '\\end{picture}\n\n'
    tag.insert_before( Comment( preamble ) )
    tag.insert_after( Comment( postamble ) )
    #The image itself, using put, is before the puts for the areas.
    tag.insert_before( Comment('   \\put(0,0){\\includegraphics[scale='+str(scale)+']{') )
    tag.insert_after(  Comment('}}\n') )
    return tag


#We have the html tags in memory in the soup variable.
#This steps through all the conversions and is html to html
#though we will be creating html comment tags.
def cleanup_soup( soup ):
    # Remove existing comments
    for comment in soup.findAll(text=lambda text:isinstance(text, Comment)):
        comment.extract()

    # Remove the wikimedia TOC (there are 3 tags to remove)    
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

    # ul tag may be bad and need an li.
    # html is fine without, but the latexified version would
    # otherwise baulk at a missing \item.
    for tag in soup.find_all(name='ul' ):
        if not tag.contents[0].name == 'li' :
            print( "Bad ul tag fixed" )
            tag.insert( 0, Comment( "\\item " ) )

    # Our two column mode
    # Each file is a chapter, starting at h1.
    # And with the 2-col environment inside it.
    # So go do that for this html 
    tag = soup.body
    if tag:
        # The title is one column
        tag2 = soup.find( 'h1' )
        # The empty argument to label_of_ref will give a label for this
        # source file, at its start.
        if tag2:
            tag2.insert_after(Comment('latex \\label{' +label_of_ref('') +'}')) 
            tag2.insert_after(Comment('latex \\begin{multicols}{2}') )
        else:
            tag.insert(0,Comment('latex \\begin{multicols}{2}') )
            tag.insert(0,Comment('latex \\label{' +label_of_ref('') +'}')) 
        tag.insert(-1,Comment('latex \\end{multicols}') )

    # Most text is two column.  Fix up the sections marked as full width.
    for tag in soup.find_all(name='div', class_="full-width"):
        tag.insert(0,Comment('\\end{multicols}\n') )
        tag.insert(-1,Comment('\\begin{multicols}{2}\n') )
      
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
            #insert label after the heading, if there was one
            #(this gets more accurate LaTeX hyperlink landings)
            #otherwise just insert it anyway.
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
            png_filename = abs_filename_of_relative_link( tag['src'] )
            if os.path.isfile( png_filename ) :
                with Image.open(png_filename) as image:
                    siz = image.size
                    if tag.has_attr('usemap') :
                        # no \par needed or used for image map.
                        tag = add_image_map( tag, siz )
                    elif siz[0] > 60 or siz[1] > 30:
                        #Bigger images...
                        #print( png_filename )
                        tag.insert_before( Comment('\n\\par\\includegraphics[max width=\\linewidth]{') )
                        tag.insert_after(  Comment('}\\par\n') )
                    else:
                        #small inline image
                        #the \texorpdfstring is because these inline images
                        #may occur in section headings, and without \texorpdfstring
                        #that would mess up the conversion to pdf which does not like
                        #images in the labels.
                        tag.insert_before(Comment( '\\texorpdfstring{\\protect\\includegraphics[max width=\\linewidth]{' ))
                        tag.insert_after( Comment( '}}{}' ))                        
            # file name is used by includegraphics, so put it in.
            tag.insert( 0, Comment( png_filename.replace('\\','/') ) )

        
# These are the more regular conversions, simple substitutions.
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
# img is no longer simple enough to do a sa simple substitution.    
#   ( 'img','\\texorpdfstring{\\protect\\includegraphics[max width=\\linewidth]{', '}}{}' ),    
}   

#latexify does the simple substitutions, substituting
#at start and end of the tags.
def latexify( soup ):
    for item in tagspec :
        for tag in soup.find_all(name= item[0] ):
            if item[1] :
                tag.insert_before(Comment( item[1] ))
            if item[2] :              
                tag.insert_after( Comment( item[2] ))

#This is essentially file I/O with called routines using the tag soup.
#encoding using html formatter is most like what browsers expect.
#utf-8 because we will have accented characters later
#
#for each input html file it produces two outputs.
#  a modified html file (which can be viewed in a browser)
#  a .tex file ready to be used in pdf generation.
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
        
#We have the html as tag soup
#We're extracting a string from it, by taking all the text strings
#and comments.
def latex_of_soup( soup ):
    latex = ""
    for tag in soup.find_all( text=True ):
        s = str( tag )
        if isinstance( tag, Comment ):
            #comments are entirely latex.
            #this test is 'legacy' we don't have to prefix a comment
            #with the word latex, because we stripped out all cooments
            #early on in processing.
            if s.startswith('latex '):
                s = s[6:]
        else:
            #text in the html is LaTeX free, or rather supposed to be.
            #in cases where it isn't, we have to LaTeX escape it.
            #and because \ is a special character in python we have
            #a plethora of double slashes here to achieve that.
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
        #and now a couple of cases of strings to ignore.
        if isinstance( tag, Doctype ):
            s=""
        if tag.parent.name == u'title':
            s=""
        #add the non empty content.
        if not s.isspace():
            latex = latex + s
    return latex

#iterate through all html files in base_dir and clean them up into dest_dir.
def clean_all():
    for dirpath, dirnames, filenames in os.walk( base_dir):
        for filename in [f for f in filenames if f.endswith(".html")]:
            infile = os.path.join(dirpath, filename)
            outfile = os.path.join(dest_dir, os.path.relpath( infile, base_dir ))
            #print( infile )
            #print( outfile )
            cleanup_file( infile, outfile )

#used to size image files (in dpi)
#small files are shown inline and need to be about the size
#of the font we use.  i.e. 1/7.8 of an inch
#the others are just copied across as is.            
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

#iterate through al image files copying and sizing them.
def size_all():
    for dirpath, dirnames, filenames in os.walk( base_dir):
        for filename in [f for f in filenames if f.endswith(".png")]:
            infile = os.path.join(dirpath, filename)
            outfile = os.path.join(dest_dir, os.path.relpath( infile, base_dir ))
            size_file( infile, outfile )

#some file paths are used as globals.
            
#up in the html and css and image files parent directory.
base_dir = "C:\\OpenSourceGit\\AudacityTeamTools\\help\\manual"
dest_dir = "C:\\OpenSourceGit\\AudacityTeamTools\\test"
#currently being processed file.  
this_file = ""

#size_all()

#descend into the html directory
base_dir += "\\man"
dest_dir += "\\man"

#and now clean all the files.
def clean_one_file( filename ) :
    file = os.path.join(base_dir, filename)
    ofile = os.path.join(dest_dir, filename)
    cleanup_file( file, ofile)

#clean_one_file( "new_features_in_this_release.html" )
#clean_one_file( "audacity_tour_guide.html" )
#clean_one_file( "glossary.html" )
#clean_one_file( "file_menu_chains.html" )
#clean_one_file( "track_control_panel_and_vertical_scale.html" )

#print( file )
clean_all()
