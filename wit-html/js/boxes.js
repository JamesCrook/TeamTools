/**
 * Created by James Crook on 5/6/2017.
 */

var Audacity = {};


// These are the boxes on the main image map.
// Fields are:
//   Indent level
//   x1
//   y1
//   x2
//   y2
//   Name of what's in the box.
Audacity.Boxes = [
//  [  0, 371, 333, 1250, 927, "Audacity Window" ],
  [  1,   2,  32, 865,  53, "Menu Bar" ],
//  [  1,   2,  52, 865, 207, "Top Panel" ],
//  [  2,   2,  52, 865, 164, "ToolDock" ],
  [  1,   3,  53, 329, 107, "Transport Toolbar" ],
  [  2,   3,  53,  12, 107, "Grabber" ],
  [  2,  19,  56,  66, 103, "Pause" ],
  [  2,  69,  56, 116, 103, "Play" ],
  [  2, 119,  56, 166, 103, "Stop" ],
  [  2, 169,  56, 216, 103, "Skip to Start" ],
  [  2, 219,  56, 266, 103, "Skip to End" ],
  [  2, 277,  56, 324, 103, "Record" ],
  [  1, 331,  53, 424, 107, "Tools Toolbar" ],
  [  2, 331,  53, 340, 107, "Grabber" ],
  [  2, 342,  81, 368, 107, "Zoom" ],
  [  2, 342,  53, 368,  79, "Selection" ],
  [  2, 370,  81, 396, 107, "Time Shift" ],
  [  2, 370,  53, 396,  79, "Envelope" ],
  [  2, 398,  81, 424, 107, "Multi Tool" ],
  [  2, 398,  53, 424,  79, "Draw" ],
  [  1, 426,  53, 857,  79, "Recording Meter Toolbar" ],
  [  2, 426,  53, 435,  79, "Grabber" ],
  [  2, 435,  53, 462,  79, "Record Options" ],
  [  2, 462,  53, 852,  79, "Record Meter" ],
  [  1, 426,  81, 857, 107, "Playback Meter Toolbar" ],
  [  2, 426,  81, 435, 107, "Grabber" ],
  [  2, 435,  81, 462, 107, "Playback Options" ],
  [  2, 462,  81, 852, 107, "Play Meter" ],
  [  1,   3, 109, 325, 135, "Mixer Toolbar" ],
  [  2,   3, 109,  12, 135, "Grabber" ],
  [  2,  39, 110, 168, 134, "Slider Recording" ],
  [  2, 194, 110, 323, 134, "Slider Playback" ],
  [  1, 327, 109, 662, 135, "Edit Toolbar" ],
  [  2, 327, 109, 336, 135, "Grabber" ],
  [  2, 338, 109, 364, 135, "Cut" ],
  [  2, 365, 109, 391, 135, "Copy" ],
  [  2, 392, 109, 418, 135, "Paste" ],
  [  2, 419, 109, 445, 135, "Trim" ],
  [  2, 446, 109, 472, 135, "Silence" ],
  [  2, 487, 109, 513, 135, "Undo" ],
  [  2, 514, 109, 540, 135, "Redo" ],
  [  2, 555, 109, 581, 135, "Zoom In" ],
  [  2, 582, 109, 608, 135, "Zoom Out" ],
  [  2, 609, 109, 635, 135, "Fit selection" ],
  [  2, 636, 109, 662, 135, "Fit project" ],
  [  1, 664, 109, 803, 135, "Transcription Toolbar" ],
  [  2, 664, 109, 673, 135, "Grabber" ],
  [  2, 675, 109, 701, 135, "Play-at-Speed" ],
  [  2, 702, 110, 801, 134, "Playback Speed" ],
  [  1,   3, 137, 617, 163, "Device Toolbar" ],
  [  2,   3, 137,  12, 163, "Grabber" ],
  [  2,  14, 139, 117, 161, "Audio Host" ],
  [  2, 143, 139, 309, 161, "Recording Device" ],
  [  2, 309, 139, 415, 161, "Recording Channels" ],
  [  2, 442, 139, 597, 161, "Playback Device" ],
  [  1,   2, 165, 865, 207, "Timeline" ],
//  [  2,   3, 165,  13, 193, "Grabber" ], // It's a fake grabber!
  [  2,  14, 165,  40, 193, "Pin" ],
  [  2,   2, 193, 865, 207, "Scrubbing Bar" ],
  [  2,  40, 165, 865, 193, "Timeline Ruler" ],


  [  1,   2, 208, 865, 504, "Track Panel" ],
//  [  1,   2, 208, 848, 487, "Track Panel" ],


  [ 2, 5,213,842,416, "Audio Track" ],

  [ 3, 5,214,102,416, "Track Control Panel" ],
  [ 4, 5,214,26,232, "Close" ],
  [ 4, 5,397,86,415, "Collapse" ],
  [ 4, 26,214,103,232, "Track Menu" ],
  [ 4, 5,310,100,341, "Track Data" ],
  [ 4, 7,230,53,249, "Mute" ],
  [ 4, 5,281,100,310, "Pan Slider" ],
  [ 4, 52,230,103,249, "Solo" ],
  [ 4, 5,249,100,280, "Gain Slider" ],
  [ 3, 102, 214, 137, 416, "Vertical Scale" ],
  [ 3, 140,213,842,312, "Left Channel" ],
  [ 3, 140,318,842,416, "Right Channel" ],

  [ 2, 5,423,842,460, "Label Track" ],
  [ 3, 5,423,103,459, "Track Control Panel" ],
  [ 4, 8,423,25,441, "Close" ],
  [ 4, 5,441,86,461, "Collapse" ],
  [ 4, 25,423,102,441, "Track Menu" ],
//  [ 3, 102, 423, 137, 460, "VRuler" ], // DNGN - Does nothing, Goes Nowhere.
  [ 3, 188,424,301,458, "Point Label" ],
  [ 3, 324,424,828,458, "Region Label" ],



  [  2, 138, 488, 848, 504, "Horizontal Scrollbar" ],
  [  2, 849, 208, 865, 487, "Vertical Scrollbar" ],
//  [  1,   2, 505, 865, 561, "ToolDock" ],
  [  1,   3, 506, 679, 560, "Selection Toolbar" ],
  [  2,   3, 506,  12, 560, "Grabber" ],
  [  2,  19, 511, 113, 557, "Project Rate" ],
  [  2, 127, 511, 199, 557, "Snap To" ],
  [  2, 213, 511, 362, 558, "Audio Position" ],
  [  2, 376, 537, 523, 558, "Start" ],
  [  2, 529, 537, 676, 558, "End" ],
  [  2, 374, 511, 673, 533, "Selection Type Chooser" ],
  [  1,   2, 562, 865, 584, "Status Bar" ],
  [  2,  10, 562, 150, 584, "Status" ],
  [  2, 842, 562, 865, 584, "Grab Handle"],

];

// These are the menu items.
// Fields are:
//   Indent
//   Flags (e.g. submenu, checkbox...)
//   Menu item text
//   Accelerator
Audacity.Menus =
  [
    [  0,  0, "File", "" ],
    [  1,  0, "New", "Ctrl+N" ],
    [  1,  0, "Open...", "Ctrl+O" ],
    [  1,  1, "Recent Files", "" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Clear", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Close", "Ctrl+W" ],
    [  1,  0, "Save Project", "Ctrl+S" ],
    [  1,  0, "Save Project As...", "" ],
    [  1,  1, "Export", "" ],
    [  2,  0, "Export as MP3", "" ],
    [  2,  0, "Export as WAV", "" ],
    [  2,  0, "Export as OGG", "" ],
    [  2,  0, "Export Audio...", "Ctrl+Shift+E" ],
    [  2,  0, "Export Selected Audio...", "" ],
    [  2,  0, "Export Labels...", "" ],
    [  2,  0, "Export Multiple...", "Ctrl+Shift+L" ],
    [  2,  0, "Export MIDI...", "" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Save Compressed Copy of Project...", "" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Import", "" ],
    [  2,  0, "Audio...", "Ctrl+Shift+I" ],
    [  2,  0, "Labels...", "" ],
    [  2,  0, "MIDI...", "" ],
    [  2,  0, "Raw Data...", "" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Chains", "" ],
    [  2,  0, "Apply Chain...", "" ],
    [  2,  0, "Edit Chains...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Page Setup...", "" ],
    [  1,  0, "Print...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Exit", "Ctrl+Q" ],
    [  0,  0, "Edit", "" ],
    [  1,  0, "Undo", "Ctrl+Z" ],
    [  1,  0, "Redo", "Ctrl+Y" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Cut", "Ctrl+X" ],
    [  1,  0, "Delete", "Ctrl+K" ],
    [  1,  0, "Copy", "Ctrl+C" ],
    [  1,  0, "Paste", "Ctrl+V" ],
    [  1,  0, "Duplicate", "Ctrl+D" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Remove Special", "" ],
    [  2,  0, "Split Cut", "Ctrl+Alt+X" ],
    [  2,  0, "Split Delete", "Ctrl+Alt+K" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Silence Audio", "Ctrl+L" ],
    [  2,  0, "Trim Audio", "Ctrl+T" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Clip Boundaries", "" ],
    [  2,  0, "Split", "Ctrl+I" ],
    [  2,  0, "Split New", "" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Join", "" ],
    [  2,  0, "Detach at Silences", "" ],
    [  1,  1, "Labels", "" ],
    [  2,  0, "Edit Labels...", "" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Add Label At Selection", "Ctrl+B" ],
    [  2,  0, "Add Label At Playback Position", "Ctrl+M" ],
    [  2,  0, "Paste Text to New Label", "" ],
    [  2,  0, "----", "" ],
    [  2,  2, "Type to Create a Label (on/off)", "" ],
    [  1,  1, "Labeled Audio", "" ],
    [  2,  0, "Cut", "" ],
    [  2,  0, "Delete", "" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Split Cut", "Alt+Shift+X" ],
    [  2,  0, "Split Delete", "Alt+Shift+K" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Silence Audio", "" ],
    [  2,  0, "Copy", "Alt+Shift+C" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Split", "" ],
    [  2,  0, "Join", "" ],
    [  2,  0, "Detach at Silences", "Alt+Shift+J" ],
    [  1,  0, "Metadata...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Preferences...", "Ctrl+P" ],
    [  0,  0, "Select", "" ],
    [  1,  0, "All", "Ctrl+A" ],
    [  1,  0, "None", "" ],
    [  1,  1, "Tracks", "" ],
    [  2,  0, "In All Tracks", "Ctrl+Shift+K" ],
    [  2,  0, "In All Sync-Locked Tracks", "Ctrl+Shift+Y" ],
    [  1,  1, "Region", "" ],
    [  2,  0, "Left at Playback Position", "[" ],
    [  2,  0, "Right at Playback Position", "]" ],
    [  2,  0, "Track Start to Cursor", "Shift+J" ],
    [  2,  0, "Cursor to Track End", "Shift+K" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Store Selection", "" ],
    [  2,  0, "Retrieve Selection", "" ],
    [  1,  1, "Spectral", "" ],
    [  2,  0, "Toggle spectral selection", "" ],
    [  2,  0, "Next Higher Peak Frequency", "" ],
    [  2,  0, "Next Lower Peak Frequency", "" ],
    [  1,  1, "Clip Boundaries", "" ],
    [  2,  0, "Previous Clip Boundary to Cursor", "" ],
    [  2,  0, "Cursor to Next Clip Boundary", "" ],
    [  2,  0, "Previous Clip", "Alt+P" ],
    [  2,  0, "Next Clip", "Alt+N" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Cursor to Stored Cursor Position", "" ],
    [  1,  0, "Store Cursor Position", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "At Zero Crossings", "Z" ],
    [  0,  0, "View", "" ],
    [  1,  1, "Zoom", "" ],
    [  2,  0, "Zoom In", "Ctrl+1" ],
    [  2,  0, "Zoom Normal", "Ctrl+2" ],
    [  2,  0, "Zoom Out", "Ctrl+3" ],
    [  2,  0, "Zoom to Selection", "Ctrl+E" ],
    [  1,  1, "Track Size", "" ],
    [  2,  0, "Fit to Width", "Ctrl+F" ],
    [  2,  0, "Fit to Height", "Ctrl+Shift+F" ],
    [  2,  0, "Collapse All Tracks", "Ctrl+Shift+C" ],
    [  2,  0, "Expand Collapsed Tracks", "Ctrl+Shift+X" ],
    [  1,  1, "Skip to", "" ],
    [  2,  0, "Selection Start", "" ],
    [  2,  0, "Selection End", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "History...", "" ],
    [  1,  0, "Karaoke...", "" ],
    [  1,  0, "Mixer Board...", "" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Toolbars", "" ],
    [  2,  0, "Reset Toolbars", "" ],
    [  2,  0, "----", "" ],
    [  2,  2, "Transport Toolbar", "" ],
    [  2,  2, "Tools Toolbar", "" ],
    [  2,  2, "Recording Meter Toolbar", "" ],
    [  2,  2, "Playback Meter Toolbar", "" ],
    [  2,  2, "Mixer Toolbar", "" ],
    [  2,  2, "Edit Toolbar", "" ],
    [  2,  2, "Transcription Toolbar", "" ],
    [  2,  0, "Scrub Toolbar", "" ],
    [  2,  2, "Device Toolbar", "" ],
    [  2,  2, "Selection Toolbar", "" ],
    [  2,  0, "Spectral Selection Toolbar", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Extra Menus (on/off)", "" ],
    [  1,  0, "Show Clipping (on/off)", "" ],
    [  0,  0, "Transport", "" ],
    [  1,  1, "Play", "" ],
    [  2,  0, "Play/Stop", "Space" ],
    [  2,  0, "Play/Stop and Set Cursor", "X" ],
    [  2,  0, "Loop Play", "Shift+Space" ],
    [  2,  0, "Pause", "P" ],
    [  1,  1, "Record", "" ],
    [  2,  0, "Record", "R" ],
    [  2,  0, "Record New Track", "Shift+R" ],
    [  2,  0, "Timer Record...", "Shift+T" ],
    [  2,  0, "Pause", "P" ],
    [  1,  1, "Scrubbing", "" ],
    [  2,  0, "Scrub", "" ],
    [  2,  0, "Seek", "" ],
    [  2,  2, "Scrub Ruler", "" ],
    [  1,  1, "Cursor to", "" ],
    [  2,  0, "Selection Start", "" ],
    [  2,  0, "Selection End", "" ],
    [  2,  0, "Track Start", "J" ],
    [  2,  0, "Track End", "K" ],
    [  2,  0, "Previous Clip Boundary", "" ],
    [  2,  0, "Next Clip Boundary", "" ],
    [  2,  0, "Project Start", "Home" ],
    [  2,  0, "Project End", "End" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Play Region", "" ],
    [  2,  0, "Lock", "" ],
    [  2,  0, "Unlock", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Rescan Audio Devices", "" ],
    [  1,  1, "Transport Options", "" ],
    [  2,  0, "Sound Activation Level...", "" ],
    [  2,  0, "Sound Activated Recording (on/off)", "" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Pinned Play/Record Head (on/off)", "" ],
    [  2,  2, "Overdub (on/off)", "" ],
    [  2,  0, "Software Playthrough (on/off)", "" ],
    [  0,  0, "Tracks", "" ],
    [  1,  1, "Add New", "" ],
    [  2,  0, "Mono Track", "" ],
    [  2,  0, "Stereo Track", "" ],
    [  2,  0, "Label Track", "" ],
    [  2,  0, "Time Track", "" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Mix", "" ],
    [  2,  0, "Mix Stereo down to Mono", "" ],
    [  2,  0, "Mix and Render", "" ],
    [  2,  0, "Mix and Render to New Track", "" ],
    [  1,  0, "Resample...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Remove Tracks", "" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Mute/Unmute", "" ],
    [  2,  0, "Mute All Tracks", "Ctrl+U" ],
    [  2,  0, "Unmute All Tracks", "Ctrl+Shift+U" ],
    [  1,  1, "Pan", "" ],
    [  2,  0, "Left", "" ],
    [  2,  0, "Right", "" ],
    [  2,  0, "Center", "" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Align Tracks", "" ],
    [  2,  0, "Align End to End", "" ],
    [  2,  0, "Align Together", "" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Start to Zero", "" ],
    [  2,  0, "Start to Cursor/Selection Start", "" ],
    [  2,  0, "Start to Selection End", "" ],
    [  2,  0, "End to Cursor/Selection Start", "" ],
    [  2,  0, "End to Selection End", "" ],
    [  2,  0, "----", "" ],
    [  2,  0, "Move Selection with Tracks (on/off)", "" ],
    [  1,  1, "Sort Tracks", "" ],
    [  2,  0, "by Start time", "" ],
    [  2,  0, "by Name", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Sync-Lock Tracks (on/off)", "" ],
    [  0,  0, "Generate", "" ],
    [  1,  0, "Add / Remove Plug-ins...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Chirp...", "" ],
    [  1,  0, "DTMF Tones...", "" ],
    [  1,  0, "Noise...", "" ],
    [  1,  0, "Silence...", "" ],
    [  1,  0, "Tone...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Pluck...", "" ],
    [  1,  0, "Rhythm Track...", "" ],
    [  1,  0, "Risset Drum...", "" ],
    [  1,  0, "Sample Data Import...", "" ],
    [  0,  0, "Effect", "" ],
    [  1,  0, "Add / Remove Plug-ins...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Repeat Last Effect", "Ctrl+R" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Amplify...", "" ],
    [  1,  0, "Auto Duck...", "" ],
    [  1,  0, "Bass and Treble...", "" ],
    [  1,  0, "Change Pitch...", "" ],
    [  1,  0, "Change Speed...", "" ],
    [  1,  0, "Change Tempo...", "" ],
    [  1,  0, "Click Removal...", "" ],
    [  1,  0, "Compressor...", "" ],
    [  1,  0, "Distortion...", "" ],
    [  1,  0, "Echo...", "" ],
    [  1,  0, "Equalization...", "" ],
    [  1,  0, "Fade In", "" ],
    [  1,  0, "Fade Out", "" ],
    [  1,  0, "Invert", "" ],
    [  1,  0, "Noise Reduction...", "" ],
    [  1,  0, "Normalize...", "" ],
    [  1,  0, "Nyquist Prompt...", "" ],
    [  1,  0, "Paulstretch...", "" ],
    [  1,  0, "Phaser...", "" ],
    [  1,  0, "Repair", "" ],
    [  1,  0, "Repeat...", "" ],
    [  1,  0, "Reverb...", "" ],
    [  1,  0, "Reverse", "" ],
    [  1,  0, "Sliding Time Scale/Pitch Shift...", "" ],
    [  1,  0, "Truncate Silence...", "" ],
    [  1,  0, "Wahwah...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Adjustable Fade...", "" ],
    [  1,  0, "Clip Fix...", "" ],
    [  1,  0, "Crossfade Clips", "" ],
    [  1,  0, "Crossfade Tracks...", "" ],
    [  1,  0, "Delay...", "" ],
    [  1,  0, "High Pass Filter...", "" ],
    [  1,  0, "Limiter...", "" ],
    [  1,  0, "Low Pass Filter...", "" ],
    [  1,  0, "Notch Filter...", "" ],
    [  1,  0, "SC4...", "" ],
    [  1,  0, "Spectral edit multi tool", "" ],
    [  1,  0, "Spectral edit parametric EQ...", "" ],
    [  1,  0, "Spectral edit shelves...", "" ],
    [  1,  0, "Studio Fade Out", "" ],
    [  1,  0, "Tremolo...", "" ],
    [  1,  0, "Vocal Reduction and Isolation...", "" ],
    [  1,  0, "Vocal Remover...", "" ],
    [  1,  0, "Vocoder...", "" ],
    [  0,  0, "Analyze", "" ],
    [  1,  0, "Add / Remove Plug-ins...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Contrast...", "" ],
    [  1,  0, "Plot Spectrum...", "" ],
    [  1,  0, "Find Clipping...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Beat Finder...", "" ],
    [  1,  0, "Regular Interval Labels0..", "" ],
    [  1,  0, "Sample Data Export...", "" ],
    [  1,  0, "Silence Finder...", "" ],
    [  1,  0, "Sound Finder...", "" ],
    [  0,  0, "Help", "" ],
    [  1,  0, "Quick Help", "" ],
    [  1,  0, "Manual", "" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Tools", "" ],
    [  2,  0, "Screenshot Tools...", "" ],
    [  2,  0, "Run Benchmark...", "" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Diagnostics", "" ],
    [  2,  0, "Audio Device Info...", "" ],
    [  2,  0, "MIDI Device Info...", "" ],
    [  2,  0, "Show Log...", "" ],
    [  2,  0, "Generate Support Data...", "" ],
    [  2,  0, "Check Dependencies...", "" ],
    [  1,  0, "----", "" ],
    [  1,  0, "Check for Updates...", "" ],
    [  1,  0, "About Audacity...", "" ],

  ];



// These are URL translations for image map boxes.
// Fields:
//    Name as on image map, e.g. Pin
//    Url to go to, e.g. timeline.html#pinned
Audacity.BoxUrls = [
  [ "Menu Bar" , "top_menu.html#Menu_Bar" ],
  [ "Transport Toolbar" , "top_menu.html#Transport_Toolbar" ],
  [ "Grabber" , "transport_toolbar.html#" ],
  [ "Pause" , "transport_toolbar.html#pause" ],
  [ "Play" , "transport_toolbar.html#play" ],
  [ "Stop" , "transport_toolbar.html#stop" ],
  [ "Skip to Start" , "transport_toolbar.html#start" ],
  [ "Skip to End" , "transport_toolbar.html#end" ],
  [ "Record" , "transport_toolbar.html#record" ],
  [ "Tools Toolbar" , "top_menu.html#Tools_Toolbar" ],
  [ "Grabber" , "tools_toolbar.html#" ],
  [ "Zoom" , "tools_toolbar.html#zoom" ],
  [ "Selection" , "tools_toolbar.html#selection" ],
  [ "Time Shift" , "tools_toolbar.html#timeshift" ],
  [ "Envelope" , "tools_toolbar.html#envelope" ],
  [ "Multi Tool" , "tools_toolbar.html#multitool" ],
  [ "Draw" , "tools_toolbar.html#draw" ],
  [ "Recording Meter Toolbar" , "top_menu.html#Recording_Meter_Toolbar" ],
  [ "Grabber" , "meter_toolbar.html#" ],
  [ "Record Meter" , "meter_toolbar.html#" ],
  [ "Playback Meter Toolbar" , "top_menu.html#Playback_Meter_Toolbar" ],
  [ "Grabber" , "meter_toolbar.html#" ],
  [ "Play Meter" , "meter_toolbar.html#" ],
  [ "Mixer Toolbar" , "top_menu.html#Mixer_Toolbar" ],
  [ "Grabber" , "mixer_toolbar.html#" ],
  [ "Slider Recording" , "mixer_toolbar.html#Recording_Slider" ],
  [ "Slider Playback" , "mixer_toolbar.html#Playback_Slider" ],
  [ "Edit Toolbar" , "top_menu.html#Edit_Toolbar" ],
  [ "Grabber" , "edit_toolbar.html#" ],
  [ "Cut" , "edit_toolbar.html#cut" ],
  [ "Copy" , "edit_toolbar.html#copy" ],
  [ "Paste" , "edit_toolbar.html#paste" ],
  [ "Trim" , "edit_toolbar.html#trim" ],
  [ "Silence" , "edit_toolbar.html#silence" ],
  [ "Undo" , "edit_toolbar.html#undo" ],
  [ "Redo" , "edit_toolbar.html#redo" ],
  [ "Zoom In" , "edit_toolbar.html#zoom_in" ],
  [ "Zoom Out" , "edit_toolbar.html#zoom_out" ],
  [ "Fit selection" , "edit_toolbar.html#zoom_to_selection" ],
  [ "Fit project" , "edit_toolbar.html#fit_to_width" ],
  [ "Transcription Toolbar" , "top_menu.html#Transcription_Toolbar" ],
  [ "Grabber" , "transcription_toolbar.html#" ],
  [ "Play-at-Speed" , "transcription_toolbar.html#" ],
  [ "Playback Speed" , "transcription_toolbar.html#" ],
  [ "Device Toolbar" , "top_menu.html#Device_Toolbar" ],
  [ "Grabber" , "device_toolbar.html#" ],
  [ "Audio Host" , "device_toolbar.html#Audio_Host" ],
  [ "Recording Device" , "device_toolbar.html#Recording_Device" ],
  [ "Recording Channels" , "device_toolbar.html#Recording_Channels" ],
  [ "Playback Device" , "device_toolbar.html#Playback_Device" ],
  [ "Timeline" , "timeline.html" ],
  [ "Pin" , "timeline.html#pinned" ],
  [ "Scrubbing Bar", "scrubbing_and_seeking.html" ],
  [ "Timeline Ruler", "timeline.html#usage" ],

  [ "Track Panel" , "track_control_panel_and_vertical_scale.html#" ],
  [ "VRuler" , "track_control_panel_and_vertical_scale.html#" ],
  [ "Horizontal Scrollbar" , "track_control_panel_and_vertical_scale.html#" ],
  [ "Vertical Scrollbar" , "track_control_panel_and_vertical_scale.html#" ],
  [ "Selection Toolbar" , "top_menu.html#Selection_Toolbar" ],
  [ "Grabber" , "selection_toolbar.html#" ],
  [ "Project Rate" , "selection_toolbar.html#rate" ],
  [ "Snap To" , "selection_toolbar.html#Snap_To" ],
  [ "Audio Position" , "selection_toolbar.html#Audio_Position" ],
  [ "Selection Type Chooser" , "selection_toolbar.html#Selection_Position_Boxes" ],
  [ "Start" , "selection_toolbar.html#Selection_Position_Boxes" ],
  [ "End" , "selection_toolbar.html#Selection_Position_Boxes" ],
  [ "Status Bar" , "status_bar.html" ],
  [ "Status" , "status_bar.html#sections" ],
  [ "Grab Handle", "status_bar.html#grab" ],




  [ "Audio Track", "audio_tracks.html" ],
  [ "Track Control Panel", "audio_tracks.html#panel" ],
  [ "Close", "audio_tracks.html#close" ],
  [ "Collapse", "audio_tracks.html#collapse" ],
  [ "Track Menu", "audio_tracks.html#track_menu" ],
  [ "Track Data", "audio_tracks.html#info" ],
  [ "Mute", "audio_tracks.html#mute" ],
  [ "Pan Slider", "audio_tracks.html#pan" ],
  [ "Solo", "audio_tracks.html#solo" ],
  [ "Gain Slider", "audio_tracks.html#gain" ],
  [ "Vertical Scale", "audio_tracks.html#scale" ],
  [ "Left Channel", "audio_tracks.html#display" ],
  [ "Right Channel", "audio_tracks.html#display" ],

  [ "Label Track", "label_tracks.html#" ],
  [ "Point Label", "label_tracks.html#" ],
  [ "Region Label", "label_tracks.html#" ],


//  ,"stereo"
//  ,"single"
//  ,"controls"
//  ,"sync"
//  ,"name"
//  ,"display"
//  ,"focus"
//  ,"working"
  
  ];

// These are URL translations for menu items.
// Fields:
//    Full menu item name, e.g. edit_menu#undo
//    Url to go to, e.g. undo,_redo_and_history
// Note that menu items are logically named, so we often do
// not need to translate.
Audacity.MenuUrls =
  [
    [ "menu_bar" , "top_menu#Menu_Bar" ],
    ["edit_menu_clip_boundaries#detach_at_silences", "edit_menu_clip_boundaries#disjoin"],
    ["file_menu_import#raw_data", "file_menu_import#raw"],
    ["edit_menu_labels#add_label_at_selection", "edit_menu_labels#addlabelatselection"],
    ["edit_menu_labels#add_label_at_playback_position", "edit_menu_labels#addlabelatplaybackposition"],
    ["edit_menu_labels#paste_text_to_new_label", "edit_menu_labels#pastetexttonewlabel"],
    ["edit_menu_labels#type_to_create_a_label_onoff", "edit_menu_labels#typetocreatealabelonoff"],
    ["edit_menu_labeled_audio#silence_audio", "edit_menu_labeled_audio#silenceaudio"],
    ["edit_menu_labeled_audio#detach_at_silences", "edit_menu_labeled_audio#detachatsilences"],
    ["edit_menu#metadata", "metadata_editor"],
    ["tracks_menu#muteunmute", "tracks_menu_mute_unmute"],
    ["tracks_menu_muteunmute#mute_all_tracks", "tracks_menu_mute_unmute#mute_all_tracks"],
    ["tracks_menu_muteunmute#unmute_all_tracks", "tracks_menu_mute_unmute#unmute_all_tracks"],
    ["file_menuexport#export_audio", "file_export_dialog"],
    ["file_menuexport#export_multiple", "export_multiple"],
    ["file_menu_chains#apply_chain", "chains_for_batch_processing_and_effects_automation#applychain"],
    ["file_menu_chains#edit_chains", "chains_for_batch_processing_and_effects_automation#editchains"],
    ["edit_menu#undo", "undo,_redo_and_history"],
    ["edit_menu#redo", "undo,_redo_and_history"],
    ["edit_menu#copy", "edit_menu_copy,_paste_and_duplicate#copy"],
    ["edit_menu#paste", "edit_menu_copy,_paste_and_duplicate#paste"],
    ["edit_menu#duplicate", "edit_menu_copy,_paste_and_duplicate#duplicate"],
    ["edit_menu_labels#edit_labels", "labels_editor"],
    ["edit_menu#metadata", "metadata"],
    ["edit_menu#preferences", "preferences"],
    ["select_menu#at_zero_crossings", "select_menu_at_zero_crossings"],
    ["view_menu#history", "undo,_redo_and_history#history"],
    ["view_menu#karaoke", "karaoke"],
    ["view_menu#mixer_board", "mixer_board"],
    ["view_menu_toolbars#transport_toolbar", "transport_toolbar"],
    ["view_menu_toolbars#tools_toolbar", "tools_toolbar"],
    ["view_menu_toolbars#recording_meter_toolbar", "meter_toolbar#recording"],
    ["view_menu_toolbars#playback_meter_toolbar", "meter_toolbar#playback"],
    ["view_menu_toolbars#mixer_toolbar", "mixer_toolbar"],
    ["view_menu_toolbars#edit_toolbar", "edit_toolbar"],
    ["view_menu_toolbars#transcription_toolbar", "transcription_toolbar"],
    ["view_menu_toolbars#scrub_toolbar", "scrub_toolbar"],
    ["view_menu_toolbars#device_toolbar", "device_toolbar"],
    ["view_menu_toolbars#selection_toolbar", "selection_toolbar"],
    ["view_menu_toolbars#spectral_selection_toolbar", "spectral_selection_toolbar"],
    ["transport_menu_record#timer_record", "timer_record"],
    ["transport_menu_scrubbing#scrub", "scrubbing_and_seeking#scrubbing"],
    ["transport_menu_scrubbing#seek", "scrubbing_and_seeking#seeking"],
    ["transport_menu_scrubbing#scrub_ruler", "scrubbing_and_seeking#ruler"],
    ["tracks_menu#synclock_tracks_onoff", "sync-locked_track_groups"],
    ["generate_menu#pluck", "pluck"],
    ["generate_menu#rhythym_track", "rhythym_track"],
    ["generate_menu#risset_drum", "risset_drum"],
    ["generate_menu#sample_data_import", "sample_data_import"],
    ["effect_menu#amplify", "amplify"],
    ["effect_menu#auto_duck", "auto_duck"],
    ["effect_menu#bass_and_treble", "bass_and_treble"],
    ["effect_menu#change_pitch", "change_pitch"],
    ["effect_menu#change_speed", "change_speed"],
    ["effect_menu#change_tempo", "change_tempo"],
    ["effect_menu#classic_filters", "classic_filters"],
    ["effect_menu#click_removal", "click_removal"],
    ["effect_menu#compressor", "compressor"],
    ["effect_menu#distortion", "distortion"],
    ["effect_menu#echo", "echo"],
    ["effect_menu#equalization", "equalization"],
    ["effect_menu#fade_in", "fades#linearfade"],
    ["effect_menu#fade_out", "fades#linearfade"],
    ["effect_menu#invert", "invert"],
    ["effect_menu#noise_reduction", "noise_reduction"],
    ["effect_menu#normalize", "normalize"],
    ["effect_menu#paulstretch", "paulstretch"],
    ["effect_menu#phaser", "phaser"],
    ["effect_menu#repair", "repair"],
    ["effect_menu#repeat", "repeat"],
    ["effect_menu#reverb", "reverb"],
    ["effect_menu#reverse", "reverse"],
    ["effect_menu#sliding_time_scalepitch_shift", "sliding_time_scale_-_pitchshift"],
    ["effect_menu#truncate_silence", "truncate_silence"],
    ["effect_menu#wahwah", "wahwah"],
    ["effect_menu#sc4", "sc4"],
    ["effect_menu#adjustable_fade", "adjustable_fade"],
    ["effect_menu#clip_fix", "clip_fix"],
    ["effect_menu#crossfade_clips", "crossfade_clips"],
    ["effect_menu#crossfade_tracks", "crossfade_tracks"],
    ["effect_menu#delay", "delay"],
    ["effect_menu#high_pass_filter", "high_pass_filter"],
    ["effect_menu#limiter", "limiter"],
    ["effect_menu#low_pass_filter", "low_pass_filter"],
    ["effect_menu#notch_filter", "notch_filter"],
    ["effect_menu#nyquist_prompt", "nyquist_prompt"],
    ["effect_menu#spectral_edit_multi_tool", "spectral_edit_multi_tool"],
    ["effect_menu#spectral_edit_parametric_eq", "spectral_edit_parametric_eq"],
    ["effect_menu#spectral_edit_shelves", "spectral_edit_shelves"],
    ["effect_menu#studio_fade_out", "fades#studio_fadeout"],
    ["effect_menu#tremolo", "tremolo"],
    ["effect_menu#vocal_reduction_and_isolation", "vocal_reduction_and_isolation"],
    ["effect_menu#vocal_remover", "vocal_remover"],
    ["effect_menu#vocoder", "vocoder"],
    ["analyze_menu#contrast", "contrast"],
    ["analyze_menu#plot_spectrum", "plot_spectrum"],
    ["analyze_menu#find_clipping", "find_clipping"],
    ["analyze_menu#beat_finder", "beat_finder"],
    ["analyze_menu#regular_interval_labels", "regular_interval_labels"],
    ["analyze_menu#sample_data_export", "sample_data_export"],
    ["analyze_menu#silence_finder", "silence_finder"],
    ["analyze_menu#sound_finder", "sound_finder"],
];




bitmap_boxes = [
  [1, 1, 16, 16, "Pause"],
  [1, 19, 16, 16, "PauseDisabled"],
  [19, 1, 16, 16, "Play"],
  [19, 19, 16, 16, "PlayDisabled"],
  [37, 1, 16, 16, "Loop"],
  [37, 19, 16, 16, "LoopDisabled"],
  [55, 1, 16, 16, "Stop"],
  [55, 19, 16, 16, "StopDisabled"],
  [73, 1, 16, 16, "Rewind"],
  [73, 19, 16, 16, "RewindDisabled"],
  [91, 1, 16, 16, "FFwd"],
  [91, 19, 16, 16, "FFwdDisabled"],
  [109, 1, 16, 16, "Record"],
  [109, 19, 16, 16, "RecordDisabled"],
  [127, 1, 16, 16, "CutPreview"],
  [127, 19, 16, 16, "CutPreviewDisabled"],
  [145, 1, 16, 16, "RecordBelow"],
  [145, 19, 16, 16, "RecordBelowDisabled"],
  [163, 1, 18, 16, "Scrub"],
  [163, 19, 18, 16, "ScrubDisabled"],
  [183, 1, 26, 16, "Seek"],
  [183, 19, 26, 16, "SeekDisabled"],
  [211, 1, 16, 16, "RecordBeside"],
  [211, 19, 16, 16, "RecordBesideDisabled"],
  [1, 37, 27, 27, "IBeam"],
  [30, 37, 27, 27, "Zoom"],
  [59, 37, 27, 27, "Envelope"],
  [88, 37, 27, 27, "TimeShift"],
  [117, 37, 27, 27, "Draw"],
  [146, 37, 27, 27, "Multi"],
  [175, 37, 25, 25, "Mic"],
  [202, 37, 25, 25, "Speaker"],
  [229, 37, 27, 27, "PinnedPlayHead"],
  [258, 37, 27, 27, "UnpinnedPlayHead"],
  [287, 37, 27, 27, "PinnedRecordHead"],
  [316, 37, 27, 27, "UnpinnedRecordHead"],
  [1, 66, 27, 27, "ZoomFit"],
  [1, 95, 27, 27, "ZoomFitDisabled"],
  [30, 66, 27, 27, "ZoomIn"],
  [30, 95, 27, 27, "ZoomInDisabled"],
  [59, 66, 27, 27, "ZoomOut"],
  [59, 95, 27, 27, "ZoomOutDisabled"],
  [88, 66, 27, 27, "ZoomSel"],
  [88, 95, 27, 27, "ZoomSelDisabled"],
  [117, 66, 27, 27, "ZoomToggle"],
  [117, 95, 27, 27, "ZoomToggleDisabled"],
  [146, 66, 26, 24, "Cut"],
  [146, 95, 26, 24, "CutDisabled"],
  [174, 66, 26, 24, "Copy"],
  [174, 95, 26, 24, "CopyDisabled"],
  [202, 66, 26, 24, "Paste"],
  [202, 95, 26, 24, "PasteDisabled"],
  [230, 66, 26, 24, "Trim"],
  [230, 95, 26, 24, "TrimDisabled"],
  [258, 66, 26, 24, "Silence"],
  [258, 95, 26, 24, "SilenceDisabled"],
  [286, 66, 26, 24, "Undo"],
  [286, 95, 26, 24, "UndoDisabled"],
  [314, 66, 26, 24, "Redo"],
  [314, 95, 26, 24, "RedoDisabled"],
  [1, 124, 27, 27, "TnStartOn"],
  [1, 153, 27, 27, "TnStartOnDisabled"],
  [30, 124, 27, 27, "TnStartOff"],
  [30, 153, 27, 27, "TnStartOffDisabled"],
  [59, 124, 27, 27, "TnEndOn"],
  [59, 153, 27, 27, "TnEndOnDisabled"],
  [88, 124, 27, 27, "TnEndOff"],
  [88, 153, 27, 27, "TnEndOffDisabled"],
  [117, 124, 27, 27, "TnCalibrate"],
  [117, 153, 27, 27, "TnCalibrateDisabled"],
  [146, 124, 27, 27, "TnAutomateSelection"],
  [146, 153, 27, 27, "TnAutomateSelectionDisabled"],
  [175, 124, 27, 27, "TnMakeTag"],
  [175, 153, 27, 27, "TnMakeTagDisabled"],
  [204, 124, 24, 24, "TnSelectSound"],
  [204, 153, 24, 24, "TnSelectSoundDisabled"],
  [230, 124, 24, 24, "TnSelectSilence"],
  [230, 153, 24, 24, "TnSelectSilenceDisabled"],
  [1, 182, 15, 23, "LabelGlyph0"],
  [18, 182, 15, 23, "LabelGlyph1"],
  [35, 182, 15, 23, "LabelGlyph2"],
  [52, 182, 15, 23, "LabelGlyph3"],
  [69, 182, 15, 23, "LabelGlyph4"],
  [86, 182, 15, 23, "LabelGlyph5"],
  [103, 182, 15, 23, "LabelGlyph6"],
  [120, 182, 15, 23, "LabelGlyph7"],
  [137, 182, 15, 23, "LabelGlyph8"],
  [154, 182, 15, 23, "LabelGlyph9"],
  [171, 182, 15, 23, "LabelGlyph10"],
  [188, 182, 15, 23, "LabelGlyph11"],
  [1, 207, 19, 17, "PostfishHome"],
  [22, 207, 17, 17, "PostfishFastRewind"],
  [41, 207, 18, 17, "PostfishRewind"],
  [61, 207, 29, 17, "PostfishPlay"],
  [92, 207, 18, 17, "PostfishForward"],
  [112, 207, 17, 17, "PostfishFastForward"],
  [131, 207, 19, 17, "PostfishEnd"],
  [152, 207, 29, 17, "PostfishLoop"],
  [1, 226, 15, 55, "DockDown"],
  [18, 226, 15, 27, "DockDownShort"],
  [35, 226, 15, 55, "DockOver"],
  [52, 226, 15, 27, "DockOverShort"],
  [69, 226, 15, 55, "DockUp"],
  [86, 226, 15, 27, "DockUpShort"],
  [103, 226, 27, 27, "PinnedPlayRecordHead"],
  [132, 226, 27, 27, "UnpinnedPlayRecordHead"],
  [161, 226, 20, 22, "SyncLockSelTile"],
  [183, 226, 21, 20, "EditEffects"],
  [206, 226, 20, 20, "SyncLockTracksDown"],
  [228, 226, 20, 20, "SyncLockTracksUp"],
  [250, 226, 20, 20, "SyncLockTracksDisabled"],
  [272, 226, 20, 20, "ToggleScrubRuler"],
  [294, 226, 12, 12, "SyncLockIcon"],
  [1, 283, 20, 20, "PlayPointer"],
  [23, 283, 20, 20, "PlayPointerPinned"],
  [45, 283, 20, 20, "RecordPointer"],
  [67, 283, 20, 20, "RecordPointerPinned"],
  [89, 283, 20, 20, "GrabberDropLoc"],
  [111, 283, 20, 11, "SliderThumbRotated"],
  [1, 305, 11, 20, "SliderThumb"],
  [14, 305, 80, 20, "Slider"],
  [96, 305, 80, 20, "HiliteSlider"],
  [178, 305, 96, 18, "UpButtonExpandSel"],
  [276, 305, 96, 18, "DownButtonExpandSel"],
  [1, 327, 96, 18, "UpButtonExpand"],
  [99, 327, 96, 18, "DownButtonExpand"],
  [197, 327, 96, 18, "HiliteButtonExpand"],
  [295, 327, 96, 18, "HiliteButtonExpandSel"],
  [1, 347, 48, 48, "UpButtonLarge"],
  [51, 347, 48, 48, "DownButtonLarge"],
  [101, 347, 48, 48, "HiliteButtonLarge"],
  [151, 347, 27, 27, "UpButtonSmall"],
  [180, 347, 27, 27, "DownButtonSmall"],
  [209, 347, 27, 27, "HiliteButtonSmall"],
  [1, 397, 36, 36, "MacUpButton"],
  [39, 397, 36, 36, "MacDownButton"],
  [77, 397, 36, 36, "MacHiliteButton"],
  [115, 397, 27, 27, "MacUpButtonSmall"],
  [144, 397, 27, 27, "MacDownButtonSmall"],
  [173, 397, 27, 27, "MacHiliteButtonSmall"],
  [202, 397, 100, 28, "MacSlider"],
  [304, 397, 17, 28, "MacSliderThumb"],
  [1, 435, 32, 32, "IBeamCursor"],
  [35, 435, 32, 32, "DrawCursor"],
  [69, 435, 32, 32, "EnvCursor"],
  [103, 435, 32, 32, "TimeCursor"],
  [137, 435, 32, 32, "ZoomInCursor"],
  [171, 435, 32, 32, "ZoomOutCursor"],
  [205, 435, 32, 32, "LabelCursorLeft"],
  [239, 435, 32, 32, "LabelCursorRight"],
  [273, 435, 32, 32, "DisabledCursor"],
  [307, 435, 32, 32, "BottomFrequencyCursor"],
  [341, 435, 32, 32, "TopFrequencyCursor"],
  [375, 435, 32, 32, "BandWidthCursor"],
  [1, 469, 215, 190, "Not in Theme"],
  [218, 469, 48, 48, "AudacityLogo48x48"],

  [1, 762, 10, 10, "Blank"],
  [13, 762, 10, 10, "Unselected"],
  [25, 762, 10, 10, "Selected"],
  [37, 762, 10, 10, "Sample"],
  [49, 762, 10, 10, "SelSample"],
  [61, 762, 10, 10, "DragSample"],
  [73, 762, 10, 10, "MuteSample"],
  [85, 762, 10, 10, "Rms"],
  [97, 762, 10, 10, "MuteRms"],
  [109, 762, 10, 10, "Shadow"],
  [121, 762, 10, 10, "AboutBackground"],
  [133, 762, 10, 10, "TrackPanelText"],
  [145, 762, 10, 10, "LabelTrackText"],
  [157, 762, 10, 10, "MeterPeak"],
  [169, 762, 10, 10, "MeterDisabledPen"],
  [181, 762, 10, 10, "MeterDisabledBrush"],
  [193, 762, 10, 10, "MeterInputPen"],
  [205, 762, 10, 10, "MeterInputBrush"],
  [217, 762, 10, 10, "MeterInputRMSBrush"],
  [229, 762, 10, 10, "MeterInputClipBrush"],
  [241, 762, 10, 10, "MeterInputLightPen"],
  [253, 762, 10, 10, "MeterInputDarkPen"],
  [265, 762, 10, 10, "MeterOutputPen"],
  [277, 762, 10, 10, "MeterOutputBrush"],
  [289, 762, 10, 10, "MeterOutputRMSBrush"],
  [301, 762, 10, 10, "MeterOutputClipBrush"],
  [313, 762, 10, 10, "MeterOutputLightPen"],
  [325, 762, 10, 10, "MeterOutputDarkPen"],
  [337, 762, 10, 10, "RulerBackground"],
  [349, 762, 10, 10, "AxisLines"],
  [361, 762, 10, 10, "GraphLines"],
  [373, 762, 10, 10, "ResponseLines"],
  [385, 762, 10, 10, "HzPlot"],
  [397, 762, 10, 10, "WavelengthPlot"],
  [409, 762, 10, 10, "Envelope"],
  [421, 762, 10, 10, "MuteButtonActive"],
  [1, 774, 10, 10, "MuteButtonVetoed"],
  [13, 774, 10, 10, "CursorPen"],
  [25, 774, 10, 10, "RecordingPen"],
  [37, 774, 10, 10, "PlaybackPen"],
  [49, 774, 10, 10, "RecordingBrush"],
  [61, 774, 10, 10, "PlaybackBrush"],
  [73, 774, 10, 10, "RulerRecordingBrush"],
  [85, 774, 10, 10, "RulerRecordingPen"],
  [97, 774, 10, 10, "RulerPlaybackBrush"],
  [109, 774, 10, 10, "RulerPlaybackPen"],
  [121, 774, 10, 10, "TimeFont"],
  [133, 774, 10, 10, "TimeBack"],
  [145, 774, 10, 10, "TimeFontFocus"],
  [157, 774, 10, 10, "TimeBackFocus"],
  [169, 774, 10, 10, "LabelTextNormalBrush"],
  [181, 774, 10, 10, "LabelTextEditBrush"],
  [193, 774, 10, 10, "LabelUnselectedBrush"],
  [205, 774, 10, 10, "LabelSelectedBrush"],
  [217, 774, 10, 10, "LabelUnselectedPen"],
  [229, 774, 10, 10, "LabelSelectedPen"],
  [241, 774, 10, 10, "LabelSurroundPen"],
  [253, 774, 10, 10, "TrackFocus0"],
  [265, 774, 10, 10, "TrackFocus1"],
  [277, 774, 10, 10, "TrackFocus2"],
  [289, 774, 10, 10, "SnapGuide"],
  [301, 774, 10, 10, "TrackInfo"],
  [313, 774, 10, 10, "TrackInfoSelected"],
  [325, 774, 10, 10, "Light"],
  [337, 774, 10, 10, "Medium"],
  [349, 774, 10, 10, "Dark"],
  [361, 774, 10, 10, "LightSelected"],
  [373, 774, 10, 10, "MediumSelected"],
  [385, 774, 10, 10, "DarkSelected"],
  [397, 774, 10, 10, "Clipped"],
  [409, 774, 10, 10, "MuteClipped"],
  [421, 774, 10, 10, "ProgressDone"],
  [1, 786, 10, 10, "ProgressNotYet"],
  [13, 786, 10, 10, "SyncLockSel"],
  [25, 786, 10, 10, "SelTranslucent"],
  [37, 786, 10, 10, "BlankSelected"],
  [49, 786, 10, 10, "SliderLight"],
  [61, 786, 10, 10, "SliderMain"],
  [73, 786, 10, 10, "SliderDark"],
  [85, 786, 10, 10, "TrackBackground"],
  [97, 786, 10, 10, "Placeholder1"],
  [109, 786, 10, 10, "GraphLabels"],
  [121, 786, 10, 10, "SpectroBackground"],
  [133, 786, 10, 10, "ScrubRuler"],
  [145, 786, 10, 10, "TimeHours"],
  [157, 786, 10, 10, "FocusBox"],
  [169, 786, 10, 10, "TrackNameText"],
  [181, 786, 10, 10, "MidiZebra"],
  [193, 786, 10, 10, "MidiLines"],
  [205, 786, 10, 10, "TextNegativeNumbers"],
  [217, 786, 10, 10, "Spectro1"],
  [229, 786, 10, 10, "Spectro2"],
  [241, 786, 10, 10, "Spectro3"],
  [253, 786, 10, 10, "Spectro4"],
  [265, 786, 10, 10, "Spectro5"],
  [277, 786, 10, 10, "Spectro1Sel"],
  [289, 786, 10, 10, "Spectro2Sel"],
  [301, 786, 10, 10, "Spectro3Sel"],
  [313, 786, 10, 10, "Spectro4Sel"],
  [325, 786, 10, 10, "Spectro5Sel"],
  [0, 0, 0, 0, "Not in Theme"],
];























