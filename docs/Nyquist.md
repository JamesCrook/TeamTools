## Nyquist

Nyquist accesses the scripting commands as follows:


Nyquist:
```lisp
(aud-do "GetInfo: Type=Menus")
```


### Limitations

* If you use Audacity effects, then writing to Audio from within the Nyquist effect will have no effect.
* You cannot call out to a Nyquist effect using aud-do, not even indirectly via chains.
  * If you do, the Nyquist effect will be silently skipped.
  
  
### Useful scripts
  
* Steve has scripts for parsing GetInfo responses.  These cna be made to arrive in a LISPy format using Format=LISP.  


### Further Development

Team need to agree on strategy.  Probably:

* A new Tools plug-ins menu, with Nyquist Prompt in it.
  * Nyquist prompt then has options for whether to read/write audio, or not.
