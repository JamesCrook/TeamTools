## Image Script

The Image Script was originally a complex C++ piece of code to generate menus and imagemaps for Audacity.

It has largely been superseded by the combination of WIT with the built in enhancements to scripting within Audacity.  

* Toolbars, EAGs and Preferences can be captured manually from within Audacity using the screenshot dialog.
  * It does the work of launching and capturing each in turn.
  * This can also be driven from an external script.
* Menus, annotated toolbar images and their imagemaps are now captured from [WIT](../WIT.md)
  * Use the **Special** button, holding shift down when you click on it, and follow instructions from there.
  * The configuration files live in the wiki.
* Track images showing clips, envelopes etc, are now captured with the python test script.

### Problem Images

* Some problem images are at https://alphamanual.audacityteam.org/man/User:JamesCrook/Problem_Images_for_Automation

The main issue is visual effects that require focus / mouse-hover disappearing when taking a screenshot.

### Results

* Results at https://wit.audacityteam.org/images.htm


### Python Scripts

The scripts live in [scripts -> piped-work](https://github.com/audacity/audacity/tree/master/scripts/piped-work)

A master script, docimages_all.py, calls all the component scripts, and they in turn call docimages_core.py

#### docimages_tracks.py

Includes a demo illustrating track and channel resizing.  These use the Track and the Channel argument of SetTrack respectively.
Sets preference /GUI/Sampleview when demonstrating Stem plots.

#### docimages_labels.py

Closely follows the example son the labels examples page.

#### docimages_spectro.py

Has a nice demo of using scripting to create a tone of various chosen loudnesses, that show well in dB view.  The same kind of technique is also used to construct a scale of notes.  Each not is a tone, faded in and out so as to reduce sharp spectral spikes at the boundaries.

The script also produces a mixed spectrogram and wave 'stereo' track, to show how that could look.

Scripting makes it particularly easy to generate the same spectrogram image with 6 different window sizes, to show the trade off between frequency precision and temporal precision.  This is done for three examples:

* A pure tone with two clicks (achieved by adding very short high-frequency tones)
* The harmonics of the 'Pluck' sound.
* The word 'Audacity'
    

#### docimages_arrange.py

Arranges tracks:

* In order using sorting, and also TrackUp TrackDown.
* Arranges in time, moving all tracks left/right together, or to align end to end.

Capture uses the ToTop=0 parameter which prevents Audacity bringing its window to the top.  That in turn preserves the Focused highlight.

#### docimages_after.py

This is a longer running script, and runs through built in commands showing what the same waveform looks like after application.  We will be selective about which of these to show.  The results are shown both (1) with and (2) without the selection.

#### docimages_envelopes.py

The envelopes script runs quickly.  Envelope points are set by specifying the time at which to set them.  If needed the envelop can be set on a certain track or channel.  All points on an envelope clip can be deleted too. 

#### docimages_cut_n_paste.py

Runs through the cut, paste and split variants.

#### docimages_clip_boundaries.py

Closely follows the examples in the manual for moving and selecting clip boundaries.

#### docimages_oddments.py

This uses the Drag script (mouse movement).  This script command is hard to use becaus eexact coordinates are needed.
 
* Show the highlighting on hover of buttons.  Thi sis done in the High-Contrast theme, as the highlighting is too subtle in Light.
* Shows that drag can be used to initiate quick play and capture the screen during quick play.
