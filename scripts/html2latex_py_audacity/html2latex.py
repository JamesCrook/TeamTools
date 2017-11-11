# convert html document to LaTeX
# 'boilerplate' (lxml use) from 
# https://tex.stackexchange.com/questions/167523

import lxml.html # http://lxml.de/lxmlhtml.html
from lxml import etree
from io import StringIO, BytesIO

def html2latex(el): 
    result = []
    if el.text:
        result.append(el.text)
    for sel in el:
        if False:
            print('tag',sel.tag)
            print('text',sel.text)
            print('tail',sel.tail)
            print('attrib',sel.attrib)
        if sel.tag in ["h1"]:
            result.append('\hmchapter{%s}' % html2latex(sel))
        elif sel.tag in ["td", "table"]:
            result.append("<%s>" % sel.tag)
            result.append(html2latex(sel))
            result.append("</%s>" % sel.tag)
        elif sel.tag in ["span"]:  #
            for att in sel.attrib.keys():
                if att =='style':
                    if sel.attrib[att] == 'font-style:italic':
                        result.append(r'\textit{%s}' % (html2latex(sel)))
        else:
            result.append(html2latex(sel))
        if sel.tail:
            result.append(sel.tail)
    return "".join(result)

def main():
    # must be unicode or lxml parse crashes
    html = u'''
<!DOCTYPE html>
    <html>
  <head>
    <title></title>
  </head>
<body >
  <h1 class="hmchapter" data-hmvarbodychaptertitle = "My title">My title</h1>
  text <span style="font-style:italic">in a specific context</span> and more.
</body>
</html>
'''
    parser = etree.HTMLParser()
    tree   = etree.parse(StringIO(html), parser) # expects a file, use StringIO for string
    root = tree.getroot()
    latex = html2latex(root)
    print latex

if __name__ == '__main__':
    main()