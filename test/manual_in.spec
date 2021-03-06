\documentclass[]{book}

\usepackage[latin1]{inputenc}
%\usepackage[utf8]{inputenc} 
\usepackage[T1]{fontenc}
\usepackage[english]{babel}
\usepackage{amsmath}
\usepackage{amssymb,amsfonts,textcomp}
\usepackage{color}
\usepackage{array}
\usepackage{supertabular}
\usepackage{hhline}
\usepackage{hyperref,stackengine}

\usepackage[pdftex]{graphicx}
\usepackage[export]{adjustbox}
\usepackage{blindtext}
\usepackage{enumitem}
\usepackage{parskip}
%\usepackage{flushend}
\usepackage{multicol}
\graphicspath{{man/}}
\hypersetup{colorlinks, linkcolor=blue, citecolor=blue, filecolor=blue, urlcolor=blue, pdftitle=}

%\hypersetup{ colorlinks, citecolor=green, filecolor=blue, linkcolor=blue, urlcolor=blue } 
\usepackage[margin=0.6in]{geometry}
\setlength{\columnsep}{0.4 in}
%\setlength{\parindent}{0pt}

\begin{document}
%%\newgeometry{oneside}
%%\cleardoublepage
{\let\cleardoublepage\clearpage 
\title{Audacity User Manual}
\author{James Crook}
%%\maketitle
}

%html -rhttp://alphamanual.audacityteam.org/ 
%html -s book

%html new_features_in_this_release.html 1
%html audacity_tour_guide.html 1

\iffalse
\input{./man/new_features_in_this_release.tex}
\input{./man/audacity_tour_guide.tex}
\fi

\end{document}
