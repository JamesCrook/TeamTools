## Pdf Manual

The pdf version of the manual is generated from the local copy of the manual.

* Uses mw2html to extract manual from wiki and store it locally as html.
* Uses BeutifulSoup to convert html to LaTeX.
* Uses MiTeX LaTeX package to convert LaTeX to pdf.

Features include:
* Translation of image maps into pdf format
* Creating all internal hyper links
* Reformatting in more readbale two column layout.

Most of the relevant files are in the test subdirectory.

* DraftAudacityManual.tex coordinates the component documents.  It was created by hand.
* custom_first_page.tex is a hand crafted version of the front page.