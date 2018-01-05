import re

# extracts the hashes used by doxygen to identify anchors for functions.

def getDoxAnchors():
  dict = {};
  with open('..\\src\\plunder\\class_audacity_project-members.html') as f:
    for line in f:
        #print( line );
        result = re.search(r".*#([^\"]*)\">([^<]*)</a>\(.*", line)
        if( result ):
            #print( line )
            dict[ result.group(2) ] = result.group(1);
            #print( "[ \""+result.group(1)+ "\",\"" + result.group(2)+"\"],")
  return dict

def getNamePairs(dict):
  with open('..\\src\\plunder\\Menus.cpp') as f:
    for line in f:
        #print( line );
        result = re.search(r".*_\(\"([^\"]*).*FN\(([^,\)]*)", line)
        if( result ):
            #print( line )
            find = result.group(2)
            a = ""
            if find in dict :
                a = dict[ find ]
            print( "[ \""+a + "\", \""+ result.group(2)+ "\",\"" +result.group(1)+ "\"],")

dict = getDoxAnchors();
getNamePairs( dict )
