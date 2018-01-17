## mod-script-pipe

This is a dll or .so module that is loaded by Audacity when it starts up.  It forwards commands from an external script to Audacity.

### Using

* Currently Audacity should be started before starting to run the script.
* We are working on scripting mostly in a branch.  'Automation'.
** That branch will have the most recent code, with the most functions implemented.

Currently the easiest way to use it is to use the python command line.  Run ```script-test.py``` and then use the 'Do' command:

```python
Do("GetMenusPlus:")

```




  