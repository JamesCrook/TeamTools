## mod-script-pipe

This is a dll or .so module that is loaded by Audacity when it starts up.  It forwards commands from an external script to Audacity.

### Using

* Currently Audacity should be started before starting to run the script.
* We are working on scripting mostly in a branch.  'Automation'.
  * That branch will have the most recent code, with the most functions implemented.

Currently the easiest way to use it is to use the python command line.  Run ```script_test.py``` and then use the 'Do' command:


Python:

```python
Do("GetInfo: Type=Menus")

```


Nyquist:
```lisp
(aud-do "GetInfo: Type=Menus")
```

The chains feature in Audacity has its own GUI for directly building the commands.

## Commands

### Command Set

The full set of commands and their parameters are listed at https://lphamanual.audacityteam.org/Automation_Reference

You can also get a JSON version of the command parameter syntax by using "GetInfo: Type=Commands". 

### General Points

* Many SetSomething Commands can use either Tracks or Channels (or both!) to determine what changes.
* Many parameters are optional, and if not mentioned have no effect.
* Other parameters have default values that will be applied.

Truth values are 1 or 0.  True or False are not supported.

### Gotchas

* Many SetPreference names require a Reload=1
* SetClip can't move a clip to a different track, but you can cut and paste it there instead.





  