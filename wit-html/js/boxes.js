/**
 * Created by James Crook on 5/6/2017.
 */


// Written so that each App can maintain its own Sys variables.
  // Currently they all share the same one.
var Sys = {};

Sys.KeepPanel = true;
Sys.NumbersOnScreen = false;
Sys.AnnotationMode = false;
Sys.ShowUrls = false;
Sys.ShowDoxygen = true;


var Audacity = {};

Audacity.Name = "Audacity";
Audacity.Sys = Sys;
Audacity.Image = "./images/blank-links.png";
Audacity.Menu = 0;


var AudacityDoxed = {};
AudacityDoxed.Name = "AudacityDoxed";
AudacityDoxed.Sys = Sys;
AudacityDoxed.Image = "./images/audacity-blocks2.png";
AudacityDoxed.Menu = -1;

AudacityDoxed.Boxes = [
  [ 1,1,12,665,274, "Audacity" ],
  [ 2,4,87,143,274, "AudioIo" ],
  [ 2,281,87,427,274, "ShuttleGui" ],
  [ 2,157,87,284,274, "Blockfiles" ],
  [ 2,427,87,663,274, "Commands" ],
  [ 3,485,87,663,180, "Built-In Effects" ],
  [ 2,1,12,665,274, "Rest of Audacity" ],
  [ 1,2,305,666,573, "Support" ],
  [ 2,5,317,147,438, "PortAudio" ],
  [ 2,8,440,547,483, "Platform-specific Implementation Layer" ],
  [ 2,148,306,546,440, "wxWidgets" ],
  [ 3,304,304,405,379, "wxWindow" ],
  [ 3,170,305,271,382, "wxFile" ],
  [ 3,433,305,534,381, "wxMenu" ],
  [ 3,148,326,546,440, "Rest of wxWidgets" ],
  [ 2,7,480,546,570, "OS" ],
  [ 2,548,319,660,569, "Other Supporting Libraries" ],
  [ 1,666,13,860,572, "Plugins" ],
  [ 2,688,18,856,120, "Script Languages" ],
  [ 2,667,468,860,572, "Plugin Converters" ],
  [ 2,756,118,828,170, "Pipe" ],
  [ 2,666,313,866,418, "Plugin Effects" ],
  [ 2,668,170,860,270, "Scripting" ],
];

AudacityDoxed.BoxUrls = [
  [ "Audacity", "Doxygenated_Help.html#Audacity" ],
  [ "AudioIo", "Doxygenated_Help.html#AudioIo" ],
  [ "ShuttleGui", "Doxygenated_Help.html#ShuttleGui" ],
  [ "Blockfiles", "Doxygenated_Help.html#Blockfiles" ],
  [ "Commands", "Doxygenated_Help.html#Commands" ],
  [ "Built-In Effects", "Doxygenated_Help.html#Built-In_Effects" ],
  [ "Rest of Audacity", "Doxygenated_Help.html#Rest_of_Audacity" ],
  [ "Support", "Doxygenated_Help.html#Support" ],
  [ "PortAudio", "Doxygenated_Help.html#PortAudio" ],
  [ "Platform-specific Implementation Layer", "Doxygenated_Help.html#Platform-specific_Implementation_Layer" ],
  [ "wxWidgets", "Doxygenated_Help.html#wxWidgets" ],
  [ "wxWindow", "Doxygenated_Help.html#wxWindow" ],
  [ "wxFile", "Doxygenated_Help.html#wxFile" ],
  [ "wxMenu", "Doxygenated_Help.html#wxMenu" ],
  [ "Rest of wxWidgets", "Doxygenated_Help.html#Rest_of_wxWidgets" ],
  [ "OS", "Doxygenated_Help.html#OS" ],
  [ "Other Supporting Libraries", "Doxygenated_Help.html#Other_Supporting" +
  "_Libraries" ],
  [ "Plugins", "Doxygenated_Help.html#Plugins" ],
  [ "Script Languages", "Doxygenated_Help.html#Script_Languages" ],
  [ "Plugin Converters", "Doxygenated_Help.html#Plugin_Converters" ],
  [ "Pipe", "Doxygenated_Help.html#Pipe" ],
  [ "Plugin Effects", "Doxygenated_Help.html#Plugin_Effects" ],
  [ "Scripting", "Doxygenated_Help.html#Scripting" ],
];


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
  [  1, 327, 109, 689, 135, "Edit Toolbar" ],
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
  [  2, 663, 109, 689, 135, "Zoom Toggle" ],
  [  1, 691, 109, 830, 135, "Transcription Toolbar" ],
  [  2, 691, 109, 700, 135, "Grabber" ],
  [  2, 702, 109, 728, 135, "Play-at-Speed" ],
  [  2, 729, 110, 828, 134, "Playback Speed" ],
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
  [ 4, 7,230,53,249, "Mute" ],
  [ 4, 5,310,100,341, "Track Data" ],
  [ 4, 26,214,103,232, "Track Menu" ],
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
    [  1,  0, "Regular Interval Labels...", "" ],
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

    [  0,  0, "Extra", "" ],
    [  1,  1, "A Cool New Command", "" ],
    [  1,  1, "Transport", "" ],
    [  2,  0, "Play", "" ],
    [  2,  0, "Stop", "" ],
    [  2,  0, "Play One Second", " 1" ],
    [  2,  0, "Play To Selection", "B" ],
    [  2,  0, "Play Before Selection Start", "Shift+F5" ],
    [  2,  0, "Play After Selection Start", "Shift+F6" ],
    [  2,  0, "Play Before Selection End", "Shift+F7" ],
    [  2,  0, "Play After Selection End", "Shift+F8" ],
    [  2,  0, "Play Before and After Selection Start", "Ctrl+Shift+F5" ],
    [  2,  0, "Play Before and After Selection End", "Ctrl+Shift+F7" ],
    [  2,  0, "Play Cut Preview", "C" ],
    [  1,  1, "Tools", "" ],
    [  2,  0, "Selection Tool", "F1" ],
    [  2,  0, "Envelope Tool", "F2" ],
    [  2,  0, "Draw Tool", "F3" ],
    [  2,  0, "Zoom Tool", "F4" ],
    [  2,  0, "Time Shift Tool", "F5" ],
    [  2,  0, "Multi Tool", "F6" ],
    [  2,  0, "Previous Tool", "A" ],
    [  2,  0, "Next Tool", "D" ],
    [  1,  1, "Mixer", "" ],
    [  2,  0, "Adjust playback volume", "" ],
    [  2,  0, "Increase playback volume", "" ],
    [  2,  0, "Decrease playback volume", "" ],
    [  2,  0, "Adjust recording volume", "" ],
    [  2,  0, "Increase recording volume", "" ],
    [  2,  0, "Decrease recording volume", "" ],
    [  1,  1, "Edit", "" ],
    [  2,  0, "DeleteKey", " Backspace" ],
    [  2,  0, "DeleteKey2", " Delete" ],
    [  1,  1, "Transcription", "" ],
    [  2,  0, "Play-at-Speed", "" ],
    [  2,  0, "Loop Play-at-Speed", "" ],
    [  2,  0, "Play Cut Preview-at-Speed", "" ],
    [  2,  0, "Adjust playback speed", "" ],
    [  2,  0, "Increase playback speed", "" ],
    [  2,  0, "Decrease playback speed", "" ],
    [  2,  0, "Move to Previous Label", "Alt+Left" ],
    [  2,  0, "Move to Next Label", "Alt+Right" ],
    [  1,  1, "Seek", "" ],
    [  2,  0, "Short seek left during playback", " Left" ],
    [  2,  0, "Short seek right during playback", " Right" ],
    [  2,  0, "Long seek left during playback", "Shift+Left" ],
    [  2,  0, "Long Seek right during playback", "Shift+Right" ],
    [  1,  1, "Device", "" ],
    [  2,  0, "Change recording device", "Shift+I" ],
    [  2,  0, "Change playback device", "Shift+O" ],
    [  2,  0, "Change audio host", "Shift+H" ],
    [  2,  0, "Change recording channels", "Shift+N" ],
    [  1,  1, "Selection", "" ],
    [  2,  0, "Snap To Off", "" ],
    [  2,  0, "Snap To Nearest", "" ],
    [  2,  0, "Snap To Prior", "" ],
    [  2,  0, "Selection to Start", "Shift+Home" ],
    [  2,  0, "Selection to End", "Shift+End" ],
    [  2,  0, "Selection Extend Left", "Shift+Left" ],
    [  2,  0, "Selection Extend Right", "Shift+Right" ],
    [  2,  0, "Set (or Extend) Left Selection", "" ],
    [  2,  0, "Set (or Extend) Right Selection", "" ],
    [  2,  0, "Selection Contract Left", "Ctrl+Shift+Right" ],
    [  2,  0, "Selection Contract Right", "Ctrl+Shift+Left" ],
    [  1,  0, "----", "" ],
    [  1,  1, "Focus", "" ],
    [  2,  0, "Move backward from toolbars to tracks", "Ctrl+Shift+F6" ],
    [  2,  0, "Move forward from toolbars to tracks", "Ctrl+F6" ],
    [  2,  0, "Move Focus to Previous Track", " Up" ],
    [  2,  0, "Move Focus to Next Track", " Down" ],
    [  2,  0, "Move Focus to First Track", "Ctrl+Home" ],
    [  2,  0, "Move Focus to Last Track", "Ctrl+End" ],
    [  2,  0, "Move Focus to Previous and Select", "Shift+Up" ],
    [  2,  0, "Move Focus to Next and Select", "Shift+Down" ],
    [  2,  0, "Toggle Focused Track", " Return" ],
    [  2,  0, "Toggle Focused Track", " NUMPAD_ENTER" ],
    [  1,  1, "Cursor", "" ],
    [  2,  0, "Cursor Left", " Left" ],
    [  2,  0, "Cursor Right", " Right" ],
    [  2,  0, "Cursor Short Jump Left", "," ],
    [  2,  0, "Cursor Short Jump Right", "." ],
    [  2,  0, "Cursor Long Jump Left", "Shift+," ],
    [  2,  0, "Cursor Long Jump Right", "Shift+." ],
    [  2,  0, "Clip Left", "" ],
    [  2,  0, "Clip Right", "" ],
    [  1,  1, "Track", "" ],
    [  2,  0, "Change pan on focused track", "Shift+P" ],
    [  2,  0, "Pan left on focused track", "Alt+Shift+Left" ],
    [  2,  0, "Pan right on focused track", "Alt+Shift+Right" ],
    [  2,  0, "Change gain on focused track", "Shift+G" ],
    [  2,  0, "Increase gain on focused track", "Alt+Shift+Up" ],
    [  2,  0, "Decrease gain on focused track", "Alt+Shift+Down" ],
    [  2,  0, "Open menu on focused track", "Shift+M" ],
    [  2,  0, "Mute/Unmute focused track", "Shift+U" ],
    [  2,  0, "Solo/Unsolo focused track", "Shift+S" ],
    [  2,  0, "Close focused track", "Shift+C" ],
    [  2,  0, "Move focused track up", "" ],
    [  2,  0, "Move focused track down", "" ],
    [  2,  0, "Move focused track to top", "" ],
    [  2,  0, "Move focused track to bottom", "" ],
    [  1,  0, "Full screen (on/off)", "F11" ],
  ];



// These are URL translations for image map boxes.
// Fields:
//    Name as on image map, e.g. Pin
//    Url to go to, e.g. timeline.html#pinned
Audacity.BoxUrls = [
   ["Menu Bar","Top_Menu.html#Menu_Bar"],
   ["Transport Toolbar","Top_Menu.html#Transport_Toolbar"],
   ["Grabber","Transport_Toolbar.html#"],
   ["Pause","Transport_Toolbar.html#pause"],
   ["Play","Transport_Toolbar.html#play"],
   ["Stop","Transport_Toolbar.html#stop"],
   ["Skip to Start","Transport_Toolbar.html#start"],
   ["Skip to End","Transport_Toolbar.html#end"],
   ["Record","Transport_Toolbar.html#record"],
   ["Tools Toolbar","Top_Menu.html#Tools_Toolbar"],
   ["Grabber","Tools_Toolbar.html#"],
   ["Zoom","Tools_Toolbar.html#zoom"],
   ["Selection","Tools_Toolbar.html#selection"],
   ["Time Shift","Tools_Toolbar.html#timeshift"],
   ["Envelope","Tools_Toolbar.html#envelope"],
   ["Multi Tool","Tools_Toolbar.html#multitool"],
   ["Draw","Tools_Toolbar.html#draw"],
   ["Recording Meter Toolbar","Top_Menu.html#Recording_Meter_Toolbar"],
   ["Grabber","Meter_Toolbar.html#"],
   ["Record Meter","Meter_Toolbar.html#"],
   ["Playback Meter Toolbar","Top_Menu.html#Playback_Meter_Toolbar"],
   ["Grabber","Meter_Toolbar.html#"],
   ["Play Meter","Meter_Toolbar.html#"],
   ["Record Options","Meter_Toolbar.html#"],
   ["Playback Options","Meter_Toolbar.html#"],
   ["Mixer Toolbar","Top_Menu.html#Mixer_Toolbar"],
   ["Grabber","Mixer_Toolbar.html#"],
   ["Slider Recording","Mixer_Toolbar.html#recording"],
   ["Slider Playback","Mixer_Toolbar.html#playback"],
   ["Edit Toolbar","Top_Menu.html#Edit_Toolbar"],
   ["Grabber","Edit_Toolbar.html#"],
   ["Cut","Edit_Toolbar.html#cut"],
   ["Copy","Edit_Toolbar.html#copy"],
   ["Paste","Edit_Toolbar.html#paste"],
   ["Trim","Edit_Toolbar.html#trim"],
   ["Silence","Edit_Toolbar.html#silence"],
   ["Undo","Edit_Toolbar.html#undo"],
   ["Redo","Edit_Toolbar.html#redo"],
   ["Zoom In","Edit_Toolbar.html#zoom_in"],
   ["Zoom Out","Edit_Toolbar.html#zoom_out"],
   ["Fit selection","Edit_Toolbar.html#zoom_to_selection"],
   ["Fit project","Edit_Toolbar.html#fit_to_width"],
   ["Zoom Toggle","Edit_Toolbar.html#zoom_toggle"],
   ["Transcription Toolbar","Top_Menu.html#Transcription_Toolbar"],
   ["Grabber","Transcription_Toolbar.html#"],
   ["Play-at-Speed","Transcription_Toolbar.html#"],
   ["Playback Speed","Transcription_Toolbar.html#"],
   ["Device Toolbar","Top_Menu.html#Device_Toolbar"],
   ["Grabber","Device_Toolbar.html#"],
   ["Audio Host","Device_Toolbar.html#Audio_Host"],
   ["Recording Device","Device_Toolbar.html#Recording_Device"],
   ["Recording Channels","Device_Toolbar.html#Recording_Channels"],
   ["Playback Device","Device_Toolbar.html#Playback_Device"],
   ["Timeline","Timeline.html"],
   ["Pin","Timeline.html#pinned"],
   ["Scrubbing Bar","Scrubbing_And_Seeking.html"],
   ["Timeline Ruler","Timeline.html#usage"],
   ["Track Panel","Track_Control_Panel_And_Vertical_Scale.html#"],
   ["VRuler","Track_Control_Panel_And_Vertical_Scale.html#"],
   ["Horizontal Scrollbar","Track_Control_Panel_And_Vertical_Scale.html#"],
   ["Vertical Scrollbar","Track_Control_Panel_And_Vertical_Scale.html#"],
   ["Selection Toolbar","Top_Menu.html#Selection_Toolbar"],
   ["Grabber","Selection_Toolbar.html#"],
   ["Project Rate","Selection_Toolbar.html#rate"],
   ["Snap To","Selection_Toolbar.html#Snap_To"],
   ["Audio Position","Selection_Toolbar.html#Audio_Position"],
   ["Selection Type Chooser","Selection_Toolbar.html#Selection_Position_Boxes"],
   ["Start","Selection_Toolbar.html#Selection_Position_Boxes"],
   ["End","Selection_Toolbar.html#Selection_Position_Boxes"],
   ["Status Bar","Status_Bar.html"],
   ["Status","Status_Bar.html#sections"],
   ["Grab Handle","Status_Bar.html#grab"],
   ["Audio Track","Audio_Tracks.html"],
   ["Track Control Panel","Audio_Tracks.html#panel"],
   ["Close","Audio_Tracks.html#close"],
   ["Collapse","Audio_Tracks.html#collapse"],
   ["Track Menu","Audio_Tracks.html#track_menu"],
   ["Track Data","Audio_Tracks.html#info"],
   ["Mute","Audio_Tracks.html#mute"],
   ["Pan Slider","Audio_Tracks.html#pan"],
   ["Solo","Audio_Tracks.html#solo"],
   ["Gain Slider","Audio_Tracks.html#gain"],
   ["Vertical Scale","Audio_Tracks.html#scale"],
   ["Left Channel","Audio_Tracks.html#display"],
   ["Right Channel","Audio_Tracks.html#display"],
   ["Label Track","Label_Tracks.html#"],
   ["Point Label","Label_Tracks.html#"],
   ["Region Label","Label_Tracks.html#"],



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
    ["menu_bar","Top_Menu#Menu_Bar"],
    ["edit_menu_clip_boundaries#detach_at_silences","Edit_Menu_Clip_Boundaries#disjoin"],
    ["file_menu_import#raw_data","File_Menu_Import#raw"],
    ["edit_menu#metadata","Metadata_Editor"],
    ["tracks_menu#muteunmute","Tracks_Menu_Mute_Unmute"],
    ["tracks_menu_muteunmute#mute_all_tracks","Tracks_Menu_Mute_Unmute#mute_all_tracks"],
    ["tracks_menu_muteunmute#unmute_all_tracks","Tracks_Menu_Mute_Unmute#unmute_all_tracks"],
    ["file_menuexport#export_audio","File_Export_Dialog"],
    ["file_menuexport#export_multiple","Export_Multiple"],
    ["file_menu_chains#apply_chain","Chains_-_for_batch_processing_and_effects_automation#apply_chain"],
    ["file_menu_chains#edit_chains","Chains_-_for_batch_processing_and_effects_automation#edit_chains"],
    ["edit_menu#undo","Undo,_Redo_and_History"],
    ["edit_menu#redo","Undo,_Redo_and_History"],
    ["edit_menu#copy","Edit_Menu_Copy,_Paste_and_Duplicate#copy"],
    ["edit_menu#paste","Edit_Menu_Copy,_Paste_and_Duplicate#paste"],
    ["edit_menu#duplicate","Edit_Menu_Copy,_Paste_and_Duplicate#duplicate"],
    ["edit_menu_labels#edit_labels","Labels_Editor"],
    ["edit_menu#metadata","Metadata"],
    ["edit_menu#preferences","Preferences"],
    ["select_menu#at_zero_crossings","Select_Menu_At_Zero_Crossings"],
    ["view_menu#history","Undo,_Redo_and_History#history"],
    ["view_menu#karaoke","Karaoke"],
    ["view_menu#mixer_board","Mixer_Board"],
    ["view_menu_toolbars#transport_toolbar","Transport_Toolbar"],
    ["view_menu_toolbars#tools_toolbar","Tools_Toolbar"],
    ["view_menu_toolbars#recording_meter_toolbar","Meter_Toolbar#recording"],
    ["view_menu_toolbars#playback_meter_toolbar","Meter_Toolbar#playback"],
    ["view_menu_toolbars#mixer_toolbar","Mixer_Toolbar"],
    ["view_menu_toolbars#edit_toolbar","Edit_Toolbar"],
    ["view_menu_toolbars#transcription_toolbar","Transcription_Toolbar"],
    ["view_menu_toolbars#scrub_toolbar","Scrub_Toolbar"],
    ["view_menu_toolbars#device_toolbar","Device_Toolbar"],
    ["view_menu_toolbars#selection_toolbar","Selection_Toolbar"],
    ["view_menu_toolbars#spectral_selection_toolbar","Spectral_Selection_Toolbar"],
    ["transport_menu_record#timer_record","Timer_Record"],
    ["transport_menu_scrubbing#scrub","Scrubbing_and_Seeking#scrubbing"],
    ["transport_menu_scrubbing#seek","Scrubbing_and_Seeking#seeking"],
    ["transport_menu_scrubbing#scrub_ruler","Scrubbing_and_Seeking#ruler"],
    ["tracks_menu#synclock_tracks_onoff","Sync-locked_Track_Groups"],
    ["generate_menu#pluck","Pluck"],
    ["generate_menu#rhythym_track","Rhythym_Track"],
    ["generate_menu#risset_drum","Risset_Drum"],
    ["generate_menu#sample_data_import","Sample_Data_Import"],
    ["effect_menu#amplify","Amplify"],
    ["effect_menu#auto_duck","Auto_Duck"],
    ["effect_menu#bass_and_treble","Bass_and_Treble"],
    ["effect_menu#change_pitch","Change_Pitch"],
    ["effect_menu#change_speed","Change_Speed"],
    ["effect_menu#change_tempo","Change_Tempo"],
    ["effect_menu#classic_filters","Classic_Filters"],
    ["effect_menu#click_removal","Click_Removal"],
    ["effect_menu#compressor","Compressor"],
    ["effect_menu#distortion","Distortion"],
    ["effect_menu#echo","Echo"],
    ["effect_menu#equalization","Equalization"],
    ["effect_menu#fade_in","Fades#linearfade"],
    ["effect_menu#fade_out","Fades#linearfade"],
    ["effect_menu#invert","Invert"],
    ["effect_menu#noise_reduction","Noise_Reduction"],
    ["effect_menu#normalize","Normalize"],
    ["effect_menu#paulstretch","Paulstretch"],
    ["effect_menu#phaser","Phaser"],
    ["effect_menu#repair","Repair"],
    ["effect_menu#repeat","Repeat"],
    ["effect_menu#reverb","Reverb"],
    ["effect_menu#reverse","Reverse"],
    ["effect_menu#sliding_time_scalepitch_shift","Sliding_Time_Scale_-_Pitchshift"],
    ["effect_menu#truncate_silence","Truncate_Silence"],
    ["effect_menu#wahwah","Wahwah"],
    ["effect_menu#sc4","Sc4"],
    ["effect_menu#adjustable_fade","Adjustable_Fade"],
    ["effect_menu#clip_fix","Clip_Fix"],
    ["effect_menu#crossfade_clips","Crossfade_Clips"],
    ["effect_menu#crossfade_tracks","Crossfade_Tracks"],
    ["effect_menu#delay","Delay"],
    ["effect_menu#high_pass_filter","High_Pass_Filter"],
    ["effect_menu#limiter","Limiter"],
    ["effect_menu#low_pass_filter","Low_Pass_Filter"],
    ["effect_menu#notch_filter","Notch_Filter"],
    ["effect_menu#nyquist_prompt","Nyquist_Prompt"],
    ["effect_menu#spectral_edit_multi_tool","Spectral_Edit_Multi_Tool"],
    ["effect_menu#spectral_edit_parametric_eq","Spectral_Edit_Parametric_Eq"],
    ["effect_menu#spectral_edit_shelves","Spectral_Edit_Shelves"],
    ["effect_menu#studio_fade_out","Fades#studio_fadeout"],
    ["effect_menu#tremolo","Tremolo"],
    ["effect_menu#vocal_reduction_and_isolation","Vocal_Reduction_and_Isolation"],
    ["effect_menu#vocal_remover","Vocal_Remover"],
    ["effect_menu#vocoder","Vocoder"],
    ["analyze_menu#contrast","Contrast"],
    ["analyze_menu#plot_spectrum","Plot_Spectrum"],
    ["analyze_menu#find_clipping","Find_Clipping"],
    ["analyze_menu#beat_finder","Beat_Finder"],
    ["analyze_menu#regular_interval_labels","Regular_Interval_Labels"],
    ["analyze_menu#sample_data_export","Sample_Data_Export"],
    ["analyze_menu#silence_finder","Silence_Finder"],
    ["analyze_menu#sound_finder","Sound_Finder"],


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



Audacity.ExtraShortcuts = 
[
   "Ctrl+Alt+I",
   "Ctrl+J",
   "Ctrl+Alt+J",
   "Ctrl+Alt+V",
   "Alt+X",
   "Alt+K",
   "Shift+Alt+X",
   "Shift+Alt+K",
   "Alt+L",
   "Shift+Alt+C",
   "Alt+I",
   "Alt+J",
   "Shift+Alt+J",
   "Ctrl+Shift+A",
   "Q",
   "Ctrl+[",
   "Ctrl+]",
   "1",
   "Shift+F5",
   "Shift+F6",
   "Shift+F7",
   "Shift+F8",
   "Ctrl+Shift+F5",
   "Ctrl+Shift+F7",
   "Ctrl+Shift+N",
   "Ctrl+Shift+M",
   "Ctrl+Home",
   "Ctrl+End",
   "Shift+C",
   "Alt+Shift+Up",
   "Alt+Shift+Down",
   "Shift+P",
   "Alt+Shift+Left",
   "Alt+Shift+Right",
   "Ctrl+Shift+T",
   "Shift+H",
   "Shift+O",
   "Shift+I",
   "Shift+N",
   "D",
   "A",
   "Alt+Shift+F6",
   "Alt+F6"
];

function MENUSTUFF( a,b,c ){
  if( a.indexOf( "Opens the ") == 0 ){
    a = a.replace( "Opens the ","" );
    a = a.replace( " dialog","..." );
  }
  return { key:a, short:b, long: c};
}

Audacity.Tips = 
[
{ key:   "File",
  short: "File",
  long:  "File"},
{ key:   "Edit",
  short: "Edit",
  long:  "Edit"},
{ key:   "Select",
  short: "Select",
  long:  "Select"},
{ key:   "View",
  short: "View",
  long:  "View"},
{ key:   "Transport",
  short: "Transport",
  long:  "Transport"},
{ key:   "Tracks",
  short: "Tracks",
  long:  "Tracks"},
{ key:   "Generate",
  short: "Generate",
  long:  "Generate"},
{ key:   "Effect",
  short: "Effect",
  long:  "Effect"},
{ key:   "Analyze",
  short: "Analyze",
  long:  "Analyze"},
{ key:   "Help",
  short: "Help",
  long:  "Help"},
{ key:   "Extra",
  short: "Extra optional commands",
  long:  "+."},
{ key:   "New",
  short: "Creates a new and empty project window to start working on new or imported Tracks",
  long:  "Creates a new and empty project window to start working on new or imported Tracks."},
{ key:   "Open...",
  short: "Presents you with a file selection dialog box to open files",
  long:  "Presents you with a standard dialog box where you can select either audio files, a list of files (.LOF) or an Audacity Project file to open."},
{ key:   "Recent Files",
  short: "Lists the full path to the twelve most recently saved or opened projects or most recently imported audio files",
  long:  "Lists the full path to the twelve most recently saved or opened projects or most recently imported audio files"},
{ key:   "Close",
  short: "Closes the current project window, prompting you to save your work if you have not saved",
  long:  "Closes the current project window, prompting you to save your work if you have not saved."},
{ key:   "Save Project",
  short: "Saves the current Audacity project ",
  long:  "Saves the current Audacity project .AUP file."},
{ key:   "Save Project As...",
  short: "Same as \"Save Project\" above, but allows you to save a copy of an open project to a different name or location",
  long:  "Same as \"Save Project\" above, but allows you to save a copy of an open project to a different name or location"},
{ key:   "Export",
  short: "For exporting audio files",
  long:  "For exporting audio files"},
{ key:   "Import",
  short: "For importing audio files or label files into your project",
  long:  "For importing audio files or label files into your project"},
{ key:   "Chains",
  short: "Chains are Audacity's form of batch processing",
  long:  "Chains are Audacity's form of batch processing"},
{ key:   "Page Setup...",
  short: "Opens the standard Page Setup dialog box prior to printing",
  long:  "Opens the standard Page Setup dialog box prior to printing"},
{ key:   "Print...",
  short: "Prints all the waveforms in the current project window (and the contents of Label Tracks or other tracks), with the Timeline above",
  long:  "Prints all the waveforms in the current project window (and the contents of Label Tracks or other tracks), with the Timeline above. Everything is printed to one page."},
{ key:   "Exit",
  short: "Closes all project windows and exits Audacity",
  long:  "Closes all project windows and exits Audacity. If there are any unsaved changes to your project, Audacity will ask if you want to save them."},
{ key:   "Clear",
  short: "Clears the list of recently used files",
  long:  "Clears the list of recently used files."},
{ key:   "Export as MP3",
  short: "Exports to an MP3 file",
  long:  "Exports to an MP3 file"},
{ key:   "Export as WAV",
  short: "Exports to a WAV file",
  long:  "Exports to a WAV file"},
{ key:   "Export as OGG",
  short: "Exports to an OGG file",
  long:  "Exports to an OGG file"},
{ key:   "Export Audio...",
  short: "Exports to an audio file",
  long:  "Exports to an audio file."},
{ key:   "Export Selected Audio...",
  short: "Exports selected audio to a file",
  long:  "Exports selected audio to a file."},
{ key:   "Export Labels...",
  short: "Exports audio at one or more labels to file(s)",
  long:  "Exports audio at one or more labels to file(s)."},
{ key:   "Export Multiple...",
  short: "Exports multiple audio files in one process, one file for each track if there are multiple audio tracks, or [[Label Tracks|labels]] can be added which then define the length of each exported file",
  long:  "Exports multiple audio files in one process, one file for each track if there are multiple audio tracks, or [[Label Tracks|labels]] can be added which then define the length of each exported file."},
{ key:   "Export MIDI...",
  short: "Exports MIDI (note tracks) to a MIDI file",
  long:  "Exports MIDI (note tracks) to a MIDI file."},
{ key:   "Save Compressed Copy of Project...",
  short: "As for \"Save Project\", but compressed too",
  long:  "Saves in the audacity .aup project file format, but compressed (Suitable for mailing)"},
{ key:   "Audio...",
  short: "Similar to 'Open', except that the file is added as a new track to your existing project",
  long:  "Similar to 'Open', except that the file is added as a new track to your existing project."},
{ key:   "Labels...",
  short: "Launches a file selection window where you can choose to ''import'' a single text file into the project containing point or region [[Label Tracks|labels]]",
  long:  "Launches a file selection window where you can choose to ''import'' a single text file into the project containing point or region [[Label Tracks|labels]]. For more information about the syntax for labels files, see [[Label Tracks#export|Importing and Exporting Labels]]. "},
{ key:   "MIDI...",
  short: "Imports a '''''[[Glossary#midi|MIDI]]''''' (MIDI or MID '''''[[Glossary#extension|extension]]''''') or Allegro (GRO) file to a [[Note Tracks|Note Track]] where simple cut-and-paste edits can be performed",
  long:  "Imports a '''''[[Glossary#midi|MIDI]]''''' (MIDI or MID '''''[[Glossary#extension|extension]]''''') or Allegro (GRO) file to a [[Note Tracks|Note Track]] where simple cut-and-paste edits can be performed. The result can be exported with the {{menu|File > Save Other> > [[File Menu: Save Other#exportmidi|Export MIDI]]}} command. '''Note:''' Currently, MIDI and Allegro files cannot be played.   "},
{ key:   "Raw Data...",
  short: "Attempts to import an uncompressed audio file that might be \"raw\" data without any headers to define its format, might have incorrect headers or be otherwise partially corrupted, or might be in a format that Audacity is unable to recognize",
  long:  "Attempts to import an uncompressed audio file that might be \"raw\" data without any headers to define its format, might have incorrect headers or be otherwise partially corrupted, or might be in a format that Audacity is unable to recognize. Raw data in textual format cannot be imported. "},
{ key:   "Apply Chain...",
  short: "Creates a new Chain or edits an existing chain",
  long:  "Creates a new Chain or edits an existing chain. "},
{ key:   "Edit Chains...",
  short: "Show the existing chains and allows you to select and run one",
  long:  "Show the existing chains and allows you to select and run one."},
{ key:   "Undo",
  short: "Undoes the most recent editing action",
  long:  "Undoes the most recent editing action."},
{ key:   "Redo",
  short: "Redoes the most recently undone editing action",
  long:  "Redoes the most recently undone editing action."},
{ key:   "Cut",
  short: "Removes the selected audio data and/or labels and places these on the Audacity clipboard",
  long:  "Removes the selected audio data and/or labels and places these on the Audacity clipboard. By default, any audio or labels to right of the selection are shifted to the left."},
{ key:   "Delete",
  short: "Removes the selected audio data and/or labels without copying these to the Audacity clipboard",
  long:  "Removes the selected audio data and/or labels without copying these to the Audacity clipboard. By default, any audio or labels to right of the selection are shifted to the left."},
{ key:   "Copy",
  short: "Copies the selected audio data to the Audacity clipboard without removing it from the project",
  long:  "Copies the selected audio data to the Audacity clipboard without removing it from the project."},
{ key:   "Paste",
  short: "Inserts whatever is on the Audacity clipboard at the position of the selection cursor in the project, replacing whatever audio data is currently selected, if any",
  long:  "Inserts whatever is on the Audacity clipboard at the position of the selection cursor in the project, replacing whatever audio data is currently selected, if any."},
{ key:   "Duplicate",
  short: "Creates a new track containing only the current selection as a new clip",
  long:  "Creates a new track containing only the current selection as a new clip."},
{ key:   "Remove Special",
  short: "For more \"advanced\" removal of audio",
  long:  "For more \"advanced\" removal of audio"},
{ key:   "Clip Boundaries",
  short: "Create or remove separate clips in the audio track",
  long:  "Create or remove separate clips in the audio track. A clip inside an audio track is a separate section of that track which has been split so that it can be manipulated somewhat independently of the other clips in the track."},
{ key:   "Labels",
  short: "These commands are to add and edit labels",
  long:  "These commands are to add and edit labels."},
{ key:   "Labeled Audio",
  short: "Labeled Audio commands apply standard Edit Menu commands to the audio of one or more regions that are labeled",
  long:  "Labeled Audio commands apply standard Edit Menu commands to the audio of one or more regions that are labeled.  The labels themselves are not affected."},
{ key:   "Metadata...",
  short: "The Metadata Editor modifies information about a track, such as the artist and genre",
  long:  "The Metadata Editor modifies information about a track, such as the artist and genre.  Typically used with MP3 files."},
{ key:   "Preferences...",
  short: "Preferences let you change most of the default behaviors and settings of Audacity",
  long:  "Preferences let you change most of the default behaviors and settings of Audacity. On Mac, Preferences are in the [[Audacity Menu]] and the default shortcut is {{shortcut|Cmd  + ,}}."},
{ key:   "Split Cut",
  short: "Same as Cut, but none of the audio data or labels to right of the selection are shifted",
  long:  "Same as Cut, but none of the audio data or labels to right of the selection are shifted."},
{ key:   "Split Delete",
  short: "Same as Delete, but none of the audio data or labels to right of the selection are shifted",
  long:  "Same as Delete, but none of the audio data or labels to right of the selection are shifted."},
{ key:   "Silence Audio",
  short: "Replaces the currently selected audio with absolute silence",
  long:  "Replaces the currently selected audio with absolute silence. Does not affect label tracks."},
{ key:   "Trim Audio",
  short: "Deletes all audio but the selection",
  long:  "Deletes all audio but the selection.  If there are other separate [[Audacity Tracks and Clips|clips]] in the same track these are not removed or shifted unless trimming the entire length of a clip or clips. Does not affect label tracks. "},
{ key:   "Split",
  short: "Splits the current clip into two clips at the cursor point, or into three clips at the selection boundaries",
  long:  "Splits the current clip into two clips at the cursor point, or into three clips at the selection boundaries."},
{ key:   "Split New",
  short: "Does a Split Cut on the current selection in the current track, then creates a new track and pastes the selection into the new track",
  long:  "Does a Split Cut on the current selection in the current track, then creates a new track and pastes the selection into the new track."},
{ key:   "Join",
  short: "If you select an area that overlaps one or more clips, they are all joined into one large clip",
  long:  "If you select an area that overlaps one or more clips, they are all joined into one large clip. Regions in-between clips become silence. "},
{ key:   "Detach at Silences",
  short: "In a selection region that includes absolute silences, creates individual non-silent clips between the regions of silence",
  long:  "In a selection region that includes absolute silences, creates individual non-silent clips between the regions of silence. The silence becomes blank space between the clips."},
{ key:   "Edit Labels...",
  short: "Brings up a dialog box showing all of your labels in a keyboard-accessible tabular view",
  long:  "Brings up a dialog box showing all of your labels in a keyboard-accessible tabular view. Handy buttons in the dialog let you insert or delete a label, or import and export labels to a file. See [[Labels_Editor|Labels Editor]] for more details."},
{ key:   "Add Label At Selection",
  short: "Creates a new, empty label at the cursor or at the selection region",
  long:  "Creates a new, empty label at the cursor or at the selection region. "},
{ key:   "Add Label At Playback Position",
  short: "Creates a new, empty label at the current playback or recording position",
  long:  "Creates a new, empty label at the current playback or recording position.  "},
{ key:   "Paste Text to New Label",
  short: "Pastes the text on the Audacity clipboard at the cursor position in the currently selected label track",
  long:  "Pastes the text on the Audacity clipboard at the cursor position in the currently selected label track. If there is no selection in the label track a point label is created. If a range is selected in the label track a range label is created. If no label track is selected one is created, and a new label is created."},
{ key:   "Type to Create a Label (on/off)",
  short: "When a label track has the yellow focus border, if this option is on, just type to create a label",
  long:  "When a label track has the yellow focus border, if this option is on, just type to create a label.  Otherwise you must create a label first."},
{ key:   "Cut",
  short: "Same as the Cut command, but operates on labeled audio regions",
  long:  "Same as the Cut command, but operates on labeled audio regions."},
{ key:   "Delete",
  short: "Same as the Delete command, but operates on labeled audio regions",
  long:  "Same as the Delete command, but operates on labeled audio regions."},
{ key:   "Split Cut",
  short: "Same as the Split Cut command, but operates on labeled audio regions",
  long:  "Same as the Split Cut command, but operates on labeled audio regions. "},
{ key:   "Split Delete",
  short: "Same as the Split Delete command, but operates on labeled audio regions",
  long:  "Same as the Split Delete command, but operates on labeled audio regions."},
{ key:   "Silence Audio",
  short: "Same as the Silence Audio command, but operates on labeled audio regions",
  long:  "Same as the Silence Audio command, but operates on labeled audio regions."},
{ key:   "Copy",
  short: "Same as the Copy command, but operates on labeled audio regions",
  long:  "Same as the Copy command, but operates on labeled audio regions."},
{ key:   "Split",
  short: "Same as the Split command, but operates on labeled audio regions or points",
  long:  "Same as the Split command, but operates on labeled audio regions or points. "},
{ key:   "Join",
  short: "Same as the Join command, but operates on labeled audio regions or points",
  long:  "Same as the Join command, but operates on labeled audio regions or points. You may need to select the audio and use {{menu|Edit > Clip Boundaries > [[Edit Menu: Clip Boundaries#join|Join]]}}, to join all regions or points."},
{ key:   "Detach at Silences",
  short: "Same as the Detach at Silences command, but operates on labeled audio regions",
  long:  "Same as the Detach at Silences command, but operates on labeled audio regions."},
{ key:   "All",
  short: "Selects all of the audio in all of the tracks",
  long:  "Selects all of the audio in all of the tracks."},
{ key:   "None",
  short: "Deselects all of the audio in all of the tracks",
  long:  "Deselects all of the audio in all of the tracks. "},
{ key:   "Tracks",
  short: "For extending a selection to more tracks",
  long:  "For extending a selection to more tracks."},
{ key:   "Region",
  short: "For modifying, saving and restoring a selection",
  long:  "For modifying, saving and restoring a selection."},
{ key:   "Spectral",
  short: "For making a selection of a frequency range",
  long:  "For making a selection of a frequency range."},
{ key:   "Clip Boundaries",
  short: "For modifying a selection, taking account of clips",
  long:  "For modifying a selection, taking account of clips."},
{ key:   "Cursor to Stored Cursor Position",
  short: "Selects from the position of the cursor to the previously stored cursor position",
  long:  "Selects from the position of the cursor to the previously stored cursor position"},
{ key:   "Store Cursor Position",
  short: "Stores the current cursor position for use in a later selection",
  long:  "Stores the current cursor position for use in a later selection"},
{ key:   "At Zero Crossings",
  short: "Moves the edges of a selection region (or the cursor position) slightly so they are at a rising zero crossing point",
  long:  "Moves the edges of a selection region (or the cursor position) slightly so they are at a rising zero crossing point. "},
{ key:   "In All Tracks",
  short: "Extends the current selection up and/or down into all tracks in the project",
  long:  "Extends the current selection up and/or down into all tracks in the project."},
{ key:   "In All Sync-Locked Tracks",
  short: "Extends the current selection up and/or down into all sync-locked tracks in the currently selected track group",
  long:  "Extends the current selection up and/or down into all sync-locked tracks in the currently selected track group."},
{ key:   "Left at Playback Position",
  short: "When Audacity is playing, recording or paused, sets the left boundary of a potential selection by moving the cursor to the current position of the green playback cursor (or red recording cursor)",
  long:  "When Audacity is playing, recording or paused, sets the left boundary of a potential selection by moving the cursor to the current position of the green playback cursor (or red recording cursor).<p> Otherwise, opens the \"Set Left Selection Boundary\" dialog for adjusting the time position of the left-hand selection boundary. If there is no selection, moving the time digits backwards creates a selection ending at the former cursor position, and moving the time digits forwards provides a way to move the cursor forwards to an exact point. </p> "},
{ key:   "Right at Playback Position",
  short: "When Audacity is playing, recording or paused, sets the right boundary of the selection, thus drawing the selection from the cursor position to the current position of the green playback cursor (or red recording cursor)",
  long:  "When Audacity is playing, recording or paused, sets the right boundary of the selection, thus drawing the selection from the cursor position to the current position of the green playback cursor (or red recording cursor). <p> Otherwise, opens the \"Set Right Selection Boundary\" dialog for adjusting the time position of the right-hand selection boundary. If there is no selection, moving the time digits forwards creates a selection starting at the former cursor position, and moving the time digits backwards provides a way to move the cursor backwards to an exact point. </p>"},
{ key:   "Track Start to Cursor",
  short: "Selects a region in the selected track(s) from the start of the track to the cursor position",
  long:  "Selects a region in the selected track(s) from the start of the track to the cursor position."},
{ key:   "Cursor to Track End",
  short: "Selects a region in the selected track(s) from the cursor position to the end of the track",
  long:  "Selects a region in the selected track(s) from the cursor position to the end of the track."},
{ key:   "Store Selection",
  short: "Stores the end points of a selection for later reuse",
  long:  "Stores the end points of a selection for later reuse."},
{ key:   "Retrieve Selection",
  short: "Retrieves the end points of a previously stored selection",
  long:  "Retrieves the end points of a previously stored selection."},
{ key:   "Toggle spectral selection",
  short: "Changes between selecting a time range and selecting the last selected [[Spectral Selection|spectral selection]] in that time range",
  long:  "Changes between selecting a time range and selecting the last selected [[Spectral Selection|spectral selection]] in that time range. This command toggles the spectral selection even if not in Spectrogram view, but you must be in Spectrogram view to use the spectral selection in one of the [[Effect Menu#spectral multi|Spectral edit]] effects."},
{ key:   "Next Higher Peak Frequency",
  short: "When in Spectrogram view, snaps the center frequency to the next higher frequency peak, moving the spectral selection upwards",
  long:  "When in Spectrogram view, snaps the center frequency to the next higher frequency peak, moving the spectral selection upwards."},
{ key:   "Next Lower Peak Frequency",
  short: "When in Spectrogram views snaps the center frequency to the next lower frequency peak, moving the spectral selection downwards",
  long:  "When in Spectrogram views snaps the center frequency to the next lower frequency peak, moving the spectral selection downwards."},
{ key:   "Previous Clip Boundary to Cursor",
  short: "Selects from the current cursor position back to the right-hand edge of the previous clip",
  long:  "Selects from the current cursor position back to the right-hand edge of the previous clip."},
{ key:   "Cursor to Next Clip Boundary",
  short: "Selects from the current cursor position forward to the left-hand edge of the next clip",
  long:  "Selects from the current cursor position forward to the left-hand edge of the next clip."},
{ key:   "Previous Clip",
  short: "Moves the selection to the previous clip",
  long:  "Moves the selection to the previous clip."},
{ key:   "Next Clip",
  short: "Moves the selection to the next clip",
  long:  "Moves the selection to the next clip."},
{ key:   "Zoom",
  short: "Zoom in/out on the horizontal axis",
  long:  "Zoom in/out on the horizontal axis.  Show more detail or show a longer length of time."},
{ key:   "Track Size",
  short: "Controls the sizes of tracks",
  long:  "Controls the sizes of tracks."},
{ key:   "Skip to",
  short: "Move forward/backwards through the audio",
  long:  "Move forward/backwards through the audio"},
{ key:   "History...",
  short: "Brings up the History window which can then be left open while using Audacity normally",
  long:  "Brings up the History window which can then be left open while using Audacity normally. History lists all undoable actions performed in the current project, including importing."},
{ key:   "Karaoke...",
  short: "Brings up the Karaoke window, which displays the labels in a \"bouncing ball\" scrolling display",
  long:  "Brings up the Karaoke window, which displays the labels in a \"bouncing ball\" scrolling display"},
{ key:   "Mixer Board...",
  short: "Mixer Board is an alternative view to the audio tracks in the main tracks window",
  long:  "Mixer Board is an alternative view to the audio tracks in the main tracks window. Analogous to a hardware mixer board, each audio track is displayed in a Track Strip."},
{ key:   "Toolbars",
  short: "Toolbars can be used to determine which of the Audacity toolbars are displayed",
  long:  "Toolbars can be used to determine which of the Audacity toolbars are displayed.  By default all toolbars are shown except Spectral Selection and Scrub"},
{ key:   "Extra Menus (on/off)",
  short: "Shows extra menus with many extra less-used commands",
  long:  "Shows extra menus with many extra less-used commands."},
{ key:   "Show Clipping (on/off)",
  short: "Option to show or not show audio that is too loud (in red) on the wave form",
  long:  "Option to show or not show audio that is too loud (in red) on the wave form."},
{ key:   "Zoom In",
  short: "Zooms in on the horizontal axis of the audio displaying more detail over a shorter length of time",
  long:  "Zooms in on the horizontal axis of the audio displaying more detail over a shorter length of time. "},
{ key:   "Zoom Normal",
  short: "Zooms to the default view which displays about one inch per second",
  long:  "Zooms to the default view which displays about one inch per second."},
{ key:   "Zoom Out",
  short: "Zooms out displaying less detail over a greater length of time",
  long:  "Zooms out displaying less detail over a greater length of time."},
{ key:   "Zoom to Selection",
  short: "Zooms in or out so that the selected audio fills the width of the window",
  long:  "Zooms in or out so that the selected audio fills the width of the window."},
{ key:   "Fit to Width",
  short: "Zooms out until the entire project just fits in the window",
  long:  "Zooms out until the entire project just fits in the window."},
{ key:   "Fit to Height",
  short: "Adjusts the height of all the tracks until they fit in the project window",
  long:  "Adjusts the height of all the tracks until they fit in the project window."},
{ key:   "Collapse All Tracks",
  short: "Collapses all tracks to take up the minimum amount of space",
  long:  "Collapses all tracks to take up the minimum amount of space."},
{ key:   "Expand Collapsed Tracks",
  short: "Expands all collapsed tracks to their original size before the last collapse",
  long:  "Expands all collapsed tracks to their original size before the last collapse."},
{ key:   "Selection Start",
  short: "When there is a selection, moves the cursor to the start of the selection and removes the selection",
  long:  "When there is a selection, moves the cursor to the start of the selection and removes the selection."},
{ key:   "Selection End",
  short: "When there is a selection, moves the cursor to the end of the selection and removes the selection",
  long:  "When there is a selection, moves the cursor to the end of the selection and removes the selection."},
{ key:   "Reset Toolbars",
  short: "Using this command positions all toolbars in default location and size as they were when Audacity was first installed",
  long:  "Using this command positions all toolbars in default location and size as they were when Audacity was first installed"},
{ key:   "Device Toolbar",
  short: "Selects audio host, recording device, number of recording channels and playback device",
  long:  "Selects audio host, recording device, number of recording channels and playback device"},
{ key:   "Edit Toolbar",
  short: "Cut, copy, paste, trim audio, silence audio, undo, redo, zoom tools",
  long:  "Cut, copy, paste, trim audio, silence audio, undo, redo, zoom tools"},
{ key:   "Combined Meter Toolbar",
  short: "The recording and playback meters can be combined, using this command, into a single toolbar",
  long:  "The recording and playback meters can be combined, using this command, into a single toolbar"},
{ key:   "Recording Meter Toolbar",
  short: "Displays recording levels and toggles input monitoring when not recording",
  long:  "Displays recording levels and toggles input monitoring when not recording"},
{ key:   "Playback Meter Toolbar",
  short: "Displays playback levels",
  long:  "Displays playback levels"},
{ key:   "Mixer Toolbar",
  short: "Adjusts the recording and playback volumes of the devices currently selected in Device Toolbar",
  long:  "Adjusts the recording and playback volumes of the devices currently selected in Device Toolbar"},
{ key:   "Selection Toolbar",
  short: "Controls the sample rate of the project, snapping to the selection format and adjusts cursor and region position by keyboard input",
  long:  "Controls the sample rate of the project, snapping to the selection format and adjusts cursor and region position by keyboard input"},
{ key:   "Spectral Selection Toolbar",
  short: "Displays and lets you adjust the current spectral (frequency) selection without having to be in Spectrogram view",
  long:  "Displays and lets you adjust the current spectral (frequency) selection without having to be in Spectrogram view"},
{ key:   "Tools Toolbar",
  short: "Chooses various tools for selection, volume adjustment, zooming and time-shifting of audio",
  long:  "Chooses various tools for selection, volume adjustment, zooming and time-shifting of audio"},
{ key:   "Transcription Toolbar",
  short: "Plays audio at a slower or faster speed than normal, affecting pitch",
  long:  "Plays audio at a slower or faster speed than normal, affecting pitch"},
{ key:   "Transport Toolbar",
  short: "Controls playback and recording and skips to start or end of project when neither playing or recording",
  long:  "Controls playback and recording and skips to start or end of project when neither playing or recording"},
{ key:   "Scrub Toolbar",
  short: "Controls playback and recording and skips to start or end of project when neither playing or recording",
  long:  "Controls playback and recording and skips to start or end of project when neither playing or recording"},
{ key:   "Play",
  short: "These commands control playback in Audacity",
  long:  "These commands control playback in Audacity. You can Start, Stop or Pause playback of the audio in your project."},
{ key:   "Record",
  short: "These commands control recording in Audacity",
  long:  "These commands control recording in Audacity. You can Start, Stop or Pause recording in your project. You can either start a recording on your existing track or an a new track."},
{ key:   "Scrubbing",
  short: "Scrubbing is the action of moving the mouse pointer right or left so as to adjust the position, speed or direction of playback, listening to the audio at the same time - a convenient way to quickly navigate the waveform to find a particular event of interest",
  long:  "Scrubbing is the action of moving the mouse pointer right or left so as to adjust the position, speed or direction of playback, listening to the audio at the same time - a convenient way to quickly navigate the waveform to find a particular event of interest. Speed changes are made by rotating the mouse wheel while scrubbing."},
{ key:   "Cursor to",
  short: "These commands let you move the cursor to the start or end of the selection, track or any adjacent Clip that you may have ",
  long:  "These commands let you move the cursor to the start or end of the selection, track or any adjacent Clip that you may have "},
{ key:   "Play Region",
  short: "These commands enable you to lock a play region and unlock it",
  long:  "These commands enable you to lock a play region and unlock it"},
{ key:   "Rescan Audio Devices",
  short: "Rescan for audio devices connected to your computer, and update the playback and recording dropdown menus in Device Toolbar",
  long:  "Rescan for audio devices connected to your computer, and update the playback and recording dropdown menus in Device Toolbar"},
{ key:   "Transport Options",
  short: "This submenu lets you manage and set various options for transport (playing and recording) in Audacity",
  long:  "This submenu lets you manage and set various options for transport (playing and recording) in Audacity"},
{ key:   "Play/Stop",
  short: "Starts and stops playback or stops a recording (stopping does not change the restart position)",
  long:  "Starts and stops playback or stops a recording (stopping does not change the restart position). Therefore using any play or record command after stopping with \"Play/Stop\" will start playback or recording from the same [[Timeline]] position it last started from. You can also assign separate shortcuts for [[#play|Play]] and [[#stop|Stop]]. "},
{ key:   "Play/Stop and Set Cursor",
  short: "Starts playback like \"Play/Stop\", but stopping playback sets the restart position to the stop point",
  long:  "Starts playback like \"Play/Stop\", but stopping playback sets the restart position to the stop point. When stopped, this command is the same as \"Play/Stop\". When playing, this command stops playback and moves the cursor (or the start of the selection) to the position where playback stopped."},
{ key:   "Loop Play",
  short: "Plays the selection over and over again",
  long:  "Plays the selection over and over again."},
{ key:   "Pause",
  short: "Temporarily pauses playing or recording without losing your place",
  long:  "Temporarily pauses playing or recording without losing your place."},
{ key:   "Record",
  short: "Starts recording at the end of the currently [[Audacity Selection|selected]] track(s)",
  long:  "Starts recording at the end of the currently [[Audacity Selection|selected]] track(s). "},
{ key:   "Record New Track",
  short: "Recording begins on a new track at either the current cursor location or at the beginning of the current selection",
  long:  "Recording begins on a new track at either the current cursor location or at the beginning of the current selection."},
{ key:   "Timer Record...",
  short: "Brings up the Timer Record dialog",
  long:  "Brings up the Timer Record dialog."},
{ key:   "Pause",
  short: "Temporarily pauses playing or recording without losing your place",
  long:  "Temporarily pauses playing or recording without losing your place."},
{ key:   "Scrub",
  short: "Scrubbing is the action of moving the mouse pointer right or left so as to adjust the position, speed or direction of playback, listening to the audio at the same time",
  long:  "Scrubbing is the action of moving the mouse pointer right or left so as to adjust the position, speed or direction of playback, listening to the audio at the same time."},
{ key:   "Seek",
  short: "Seeking is similar to Scrubbing except that it is playback with skips, similar to using the seek button on a CD player",
  long:  "Seeking is similar to Scrubbing except that it is playback with skips, similar to using the seek button on a CD player."},
{ key:   "Scrub Ruler",
  short: "Shows (or hides) the scrub ruler, which is just below the timeline",
  long:  "Shows (or hides) the scrub ruler, which is just below the timeline."},
{ key:   "Selection Start",
  short: "Moves the left edge of the current selection to the center of the screen, without changing the [[Zooming|zoom]] level",
  long:  "Moves the left edge of the current selection to the center of the screen, without changing the [[Zooming|zoom]] level."},
{ key:   "Selection End",
  short: "Moves the right edge of the current selection to the center of the screen, without changing the [[Zooming|zoom]] level",
  long:  "Moves the right edge of the current selection to the center of the screen, without changing the [[Zooming|zoom]] level."},
{ key:   "Track Start",
  short: "Moves the cursor to the start of the selected track",
  long:  "Moves the cursor to the start of the selected track."},
{ key:   "Track End",
  short: "Moves the cursor to the end of the selected track",
  long:  "Moves the cursor to the end of the selected track."},
{ key:   "Previous Clip Boundary",
  short: "Moves the cursor position back to the right-hand edge of the previous clip",
  long:  "Moves the cursor position back to the right-hand edge of the previous clip"},
{ key:   "Next Clip Boundary",
  short: "Moves the cursor position forward to the left-hand edge of the next clip",
  long:  "Moves the cursor position forward to the left-hand edge of the next clip"},
{ key:   "Project Start",
  short: "Moves the cursor to the beginning of the project",
  long:  "Moves the cursor to the beginning of the project."},
{ key:   "Project End",
  short: "Moves the cursor to the end of the project",
  long:  "Moves the cursor to the end of the project. "},
{ key:   "Lock",
  short: "Locks standard playback to the current position of the playback region, or to the current position of the Quick-Play region)",
  long:  "Locks standard playback to the current position of the playback region, or to the current position of the Quick-Play region)."},
{ key:   "Unlock",
  short: "Removes the Play Region Lock",
  long:  "Removes the Play Region Lock."},
{ key:   "Sound Activation Level...",
  short: "Sets the activation level above which Sound Activated Recording will record",
  long:  "Sets the activation level above which Sound Activated Recording will record."},
{ key:   "Sound Activated Recording (on/off)",
  short: "Toggles on and off the Sound Activated Recording option",
  long:  "Toggles on and off the Sound Activated Recording option."},
{ key:   "Pinned Play/Record Head (on/off)",
  short: "You can change Audacity to play and record with a fixed head pinned to the center of the Timeline",
  long:  "You can change Audacity to play and record with a fixed head pinned to the center of the Timeline."},
{ key:   "Overdub (on/off)",
  short: "Toggles on and off the Overdub option",
  long:  "Toggles on and off the Overdub option."},
{ key:   "Software Playthrough (on/off)",
  short: "Toggles on and off the Software Playthrough option",
  long:  "Toggles on and off the Software Playthrough option."},
{ key:   "Add New",
  short: "Adds a new track",
  long:  "Adds a new track"},
{ key:   "Mix",
  short: "Mixes down selected tracks to mono or stereo tracks",
  long:  "Mixes down selected tracks to mono or stereo tracks"},
{ key:   "Resample...",
  short: "Allows you to resample the selected track(s) to a new sample rate for use in the project",
  long:  "Allows you to resample the selected track(s) to a new sample rate for use in the project"},
{ key:   "Remove Tracks",
  short: "Removes the selected track(s) from the project",
  long:  "Removes the selected track(s) from the project. Even if only part of a track is selected, the entire track is removed."},
{ key:   "Mute/Unmute",
  short: "Mutes or unmutes audio tracks in the project",
  long:  "Mutes or unmutes audio tracks in the project"},
{ key:   "Pan",
  short: "Pans left right or center audio tracks in the project",
  long:  "Pans left right or center audio tracks in the project"},
{ key:   "Align Tracks",
  short: "Commands that provide an automatic way of aligning selected tracks with the cursor, the selection, or with the start of the project",
  long:  "Commands that provide an automatic way of aligning selected tracks with the cursor, the selection, or with the start of the project."},
{ key:   "Sort Tracks",
  short: "Sorts all tracks in the project from top to bottom in the project window, by Start Time or by Name",
  long:  "Sorts all tracks in the project from top to bottom in the project window, by Start Time or by Name."},
{ key:   "Sync-Lock Tracks (on/off)",
  short: "Ensures that length changes occurring anywhere in a defined group of tracks also take place in all audio or label tracks in that group",
  long:  "Ensures that length changes occurring anywhere in a defined group of tracks also take place in all audio or label tracks in that group."},
{ key:   "Mono Track",
  short: "Creates a new empty mono audio track",
  long:  "Creates a new empty mono audio track. "},
{ key:   "Stereo Track",
  short: "Adds an empty stero track to the project",
  long:  "Adds an empty stero track to the project"},
{ key:   "Label Track",
  short: "Adds an empty label track to the project",
  long:  "Adds an empty label track to the project"},
{ key:   "Time Track",
  short: "Adds an empty time track to the project",
  long:  "Adds an empty time track to the project.  Time tracks are used to speed up and slow down audio."},
{ key:   "Mix Stereo down to Mono",
  short: "Converts the selected stereo track(s) into the same number of mono tracks, combining left and right channels equally by averaging the volume of both channels",
  long:  "Converts the selected stereo track(s) into the same number of mono tracks, combining left and right channels equally by averaging the volume of both channels."},
{ key:   "Mix and Render",
  short: "Mixes down all selected tracks to a single mono or stereo track, rendering to the waveform all real-time transformations that had been applied (such as track '''''[[Glossary#gain|gain]]''''', panning, [[Envelope Tool|amplitude envelopes]] or a change in [[Selection Toolbar#rate|project rate]])",
  long:  "Mixes down all selected tracks to a single mono or stereo track, rendering to the waveform all real-time transformations that had been applied (such as track '''''[[Glossary#gain|gain]]''''', panning, [[Envelope Tool|amplitude envelopes]] or a change in [[Selection Toolbar#rate|project rate]])."},
{ key:   "Mix and Render to New Track",
  short: "Same as {{menu|Tracks > [[Tracks Menu#mix_and_render|Mix and Render]]}} except that the original tracks are preserved rather than being replaced by the resulting \"Mix\" track",
  long:  "Same as {{menu|Tracks > [[Tracks Menu#mix_and_render|Mix and Render]]}} except that the original tracks are preserved rather than being replaced by the resulting \"Mix\" track. "},
{ key:   "Mute All Tracks",
  short: "Mutes all the audio tracks in the project as if you had used the mute buttons from the Track Control Panel on each track",
  long:  "Mutes all the audio tracks in the project as if you had used the mute buttons from the Track Control Panel on each track."},
{ key:   "Unmute All Tracks",
  short: "Unmutes all the audio tracks in the project as if you had released the mute buttons from the Track Control Panel on each track",
  long:  "Unmutes all the audio tracks in the project as if you had released the mute buttons from the Track Control Panel on each track."},
{ key:   "Left",
  short: "Pan selected audio to left speaker",
  long:  "Pan selected audio to left speaker"},
{ key:   "Right",
  short: "Pan selected audio centrally",
  long:  "Pan selected audio centrally."},
{ key:   "Center",
  short: "Pan selected audio to right speaker",
  long:  "Pan selected audio to right speaker."},
{ key:   "Align End to End",
  short: "Aligns the selected tracks one after the other, based on their top-to-bottom order in the project window",
  long:  "Aligns the selected tracks one after the other, based on their top-to-bottom order in the project window."},
{ key:   "Align Together",
  short: "Align the selected tracks so that they start at the same (averaged) start time",
  long:  "Align the selected tracks so that they start at the same (averaged) start time."},
{ key:   "Start to Zero",
  short: "Aligns the start of selected tracks with the start of the project",
  long:  "Aligns the start of selected tracks with the start of the project."},
{ key:   "Start to Cursor/Selection Start",
  short: "Aligns the start of selected tracks with the current cursor position or with the start of the current selection",
  long:  "Aligns the start of selected tracks with the current cursor position or with the start of the current selection."},
{ key:   "Start to Selection End",
  short: "Aligns the start of selected tracks with the end of the current selection",
  long:  "Aligns the start of selected tracks with the end of the current selection."},
{ key:   "End to Cursor/Selection Start",
  short: "Aligns the end of selected tracks with the current cursor position or with the start of the current selection",
  long:  "Aligns the end of selected tracks with the current cursor position or with the start of the current selection."},
{ key:   "End to Selection End",
  short: "Aligns the end of selected tracks with the end of the current selection",
  long:  "Aligns the end of selected tracks with the end of the current selection."},
{ key:   "Move Selection with Tracks (on/off)",
  short: "Toggles on/off the selection moving with the realigned tracks, or staying put",
  long:  "Toggles on/off the selection moving with the realigned tracks, or staying put."},
{ key:   "by Start time",
  short: "Sort tracks in order of start time",
  long:  "Sort tracks in order of start time."},
{ key:   "by Name",
  short: "Sort tracks in order by name",
  long:  "Sort tracks in order by name."},
{ key:   "Add / Remove Plug-ins...",
  short: "Selecting this option from the Effect Menu (or the [[Generate Menu]] or [[Analyze Menu]]) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity",
  long:  "Selecting this option from the Effect Menu (or the [[Generate Menu]] or [[Analyze Menu]]) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity. Even if you do not add any third-party plug-ins, you can use this to make the Effect menu shorter or longer as required.  For details see [[Manage Effects, Generators and Analyzers|Add / Remove Effects, Generators and Analyzers]]."},
{ key:   "Chirp...",
  short: "Generates four different types of tone waveform like the [[#Tone",
  long:  "Generates four different types of tone waveform like the [[#Tone...|Tone Generator]], but additionally allows setting of the starting and ending amplitude and frequency."},
{ key:   "DTMF Tones...",
  short: "Generates dual-tone multi-frequency (DTMF) tones like those produced by the keypad on telephones",
  long:  "Generates dual-tone multi-frequency (DTMF) tones like those produced by the keypad on telephones."},
{ key:   "Noise...",
  short: "Generates 'white', 'pink' or 'brown' noise",
  long:  "Generates 'white', 'pink' or 'brown' noise."},
{ key:   "Silence...",
  short: "Creates audio of zero amplitude, the only configurable setting being duration",
  long:  "Creates audio of zero amplitude, the only configurable setting being duration."},
{ key:   "Tone...",
  short: "Generates one of four different tone waveforms: ''Sine'', ''Square'', ''Sawtooth'' or ''Square (no alias)'', and a frequency between 1 Hz and ''half the current project rate''",
  long:  "Generates one of four different tone waveforms: ''Sine'', ''Square'', ''Sawtooth'' or ''Square (no alias)'', and a frequency between 1 Hz and ''half the current project rate''."},
{ key:   "Pluck...",
  short: "A synthesized pluck tone with abrupt or gradual fade-out, and selectable pitch corresponding to a '''''[[Glossary#midi|MIDI]]''''' note",
  long:  "A synthesized pluck tone with abrupt or gradual fade-out, and selectable pitch corresponding to a '''''[[Glossary#midi|MIDI]]''''' note."},
{ key:   "Rhythm Track...",
  short: "Generates a track with regularly spaced sounds at a specified tempo and number of beats per measure (bar)",
  long:  "Generates a track with regularly spaced sounds at a specified tempo and number of beats per measure (bar)."},
{ key:   "Risset Drum...",
  short: "Produces a realistic drum sound",
  long:  "Produces a realistic drum sound."},
{ key:   "Sample Data Import...",
  short: "Create audio from imported numeric data",
  long:  "Create audio from imported numeric data."},
{ key:   "Invoke the Add / Remove Plug-ins effect dialog",
  short: "Selecting this option from the Effect Menu (or the [[Generate Menu]] or [[Analyze Menu]]) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity",
  long:  "Selecting this option from the Effect Menu (or the [[Generate Menu]] or [[Analyze Menu]]) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity. Even if you do not add any third-party plug-ins, you can use this to make the Effect menu shorter or longer as required.  For details see [[Manage Effects, Generators and Analyzers|Add / Remove Effects, Generators and Analyzers]]."},
{ key:   "Repeat Last Effect",
  short: "Repeats the last used effect at its last used settings and without displaying any dialog",
  long:  "Repeats the last used effect at its last used settings and without displaying any dialog."},
{ key:   "Audacity",
  short: "Effects built in to Audacity",
  long:  "Effects built in to Audacity"},
{ key:   "LADSPA",
  short: "\"Linux Audio Plug-in Audio\" effects",
  long:  "\"Linux Audio Plug-in Audio\" effects"},
{ key:   "Nyquist",
  short: "Effects created using a LISP-variant called \"Nyquist\"",
  long:  "Effects created using a LISP-variant called \"Nyquist\"."},
{ key:   "Invoke the Amplify effect dialog",
  short: "Increases or decreases the volume of the audio you have selected",
  long:  "Increases or decreases the volume of the audio you have selected."},
{ key:   "Invoke the Auto Duck effect dialog",
  short: "Reduces (ducks) the volume of one or more tracks whenever the volume of a specified \"control\" track reaches a particular level",
  long:  "Reduces (ducks) the volume of one or more tracks whenever the volume of a specified \"control\" track reaches a particular level. Typically used to make a music track softer whenever speech in a commentary track is heard."},
{ key:   "Invoke the Bass and Treble effect dialog",
  short: "Increases or decreases the lower  '''''[[Glossary#frequency|frequencies]]'''''  and higher frequencies of your audio independently; behaves just like the bass and treble controls on a stereo system",
  long:  "Increases or decreases the lower  '''''[[Glossary#frequency|frequencies]]'''''  and higher frequencies of your audio independently; behaves just like the bass and treble controls on a stereo system."},
{ key:   "Invoke the Change Pitch effect dialog",
  short: "Change the pitch of a selection without changing its tempo",
  long:  "Change the pitch of a selection without changing its tempo."},
{ key:   "Invoke the Change Speed effect dialog",
  short: "Change the speed of a selection, also changing its pitch",
  long:  "Change the speed of a selection, also changing its pitch."},
{ key:   "Invoke the Change Tempo effect dialog",
  short: "Change the tempo and length (duration) of a selection without changing its pitch",
  long:  "Change the tempo and length (duration) of a selection without changing its pitch."},
{ key:   "Invoke the Click Removal effect dialog",
  short: "Click Removal is designed to remove clicks on audio tracks and is especially suited to declicking recordings made from vinyl records",
  long:  "Click Removal is designed to remove clicks on audio tracks and is especially suited to declicking recordings made from vinyl records."},
{ key:   "Invoke the Compressor effect dialog",
  short: "Compresses the '''''[[Glossary#dynamic_range|dynamic range]]''''' by two alternative methods",
  long:  "Compresses the '''''[[Glossary#dynamic_range|dynamic range]]''''' by two alternative methods. The default \"'''''[[Glossary#rms|RMS]]'''''\" method makes the louder parts softer, but leaves the quieter audio alone. The alternative \"peaks\" method makes the entire audio louder, but amplifies the louder parts less than the quieter parts. Make-up '''''[[Glossary#gain|gain]]''''' can be applied to either method, making the result as loud as possible without '''''[[Glossary#clipping|clipping]]''''', but not changing the dynamic range further. "},
{ key:   "Invoke the Distortion effect dialog",
  short: "Use the Distortion effect to make the audio sound distorted",
  long:  "Use the Distortion effect to make the audio sound distorted. By distorting the waveform the frequency content is changed, which will often make the sound \"crunchy\" or \"abrasive\".  Technically this effect is a [https://en.wikipedia.org/wiki/Waveshaper waveshaper]. The result of waveshaping is equivalent to applying non-linear amplification to the audio waveform. Preset shaping functions are provided, each of which produces a different type of distortion. "},
{ key:   "Invoke the Echo effect dialog",
  short: "Repeats the selected audio again and again, normally softer each time and normally not blended into the original sound until some time after it starts",
  long:  "Repeats the selected audio again and again, normally softer each time and normally not blended into the original sound until some time after it starts. The delay time between each repeat is fixed, with no pause in between each repeat. For a more configurable echo effect with a variable delay time and pitch-changed echoes, see [[Effect Menu#Delay|Delay]]. "},
{ key:   "Invoke the Equalization effect dialog",
  short: "Adjusts the volume levels of particular frequencies",
  long:  "Adjusts the volume levels of particular frequencies."},
{ key:   "Fade In",
  short: "Applies a '''''[[Glossary#linear|linear]]''''' fade-in to the selected audio - the rapidity of the fade-in depends entirely on the length of the selection it is applied to",
  long:  "Applies a '''''[[Glossary#linear|linear]]''''' fade-in to the selected audio - the rapidity of the fade-in depends entirely on the length of the selection it is applied to.  For a more customizable '''''[[Glossary#log|logarithmic]]''''' fade, use the [[Envelope Tool]] on the [[Tools Toolbar]]."},
{ key:   "Fade Out",
  short: "Applies a '''''[[Glossary#linear|linear]]''''' fade-out to the selected audio - the rapidity of the fade-out depends entirely on the length of the selection it is applied to",
  long:  "Applies a '''''[[Glossary#linear|linear]]''''' fade-out to the selected audio - the rapidity of the fade-out depends entirely on the length of the selection it is applied to.  For a more customizable '''''[[Glossary#log|logarithmic]]''''' fade, use the [[Envelope Tool]] on the [[Tools Toolbar]].<br>"},
{ key:   "Invert",
  short: "This effect flips the audio samples upside-down",
  long:  "This effect flips the audio samples upside-down.  This normally does not affect the sound of the audio at all.  It is occasionally useful for vocal removal."},
{ key:   "Invoke the Noise Reduction effect dialog",
  short: "This effect is ideal for reducing constant background noise such as fans, tape noise, or hums",
  long:  "This effect is ideal for reducing constant background noise such as fans, tape noise, or hums.  It will not work very well for removing talking or music in the background.  More details [[Noise Reduction|here]]."},
{ key:   "Invoke the Normalize effect dialog",
  short: "Use the Normalize effect to set the maximum amplitude of a track, equalize the amplitudes of the left and right channels of a stereo track and optionally remove any [[DC offset]] from the track",
  long:  "Use the Normalize effect to set the maximum amplitude of a track, equalize the amplitudes of the left and right channels of a stereo track and optionally remove any [[DC offset]] from the track."},
{ key:   "Invoke the Paulstretch effect dialog",
  short: "Use Paulstretch only for an extreme time-stretch or \"stasis\" effect, This may be useful for synthesizer pad sounds, identifying performance glitches or just creating interesting aural textures",
  long:  "Use Paulstretch only for an extreme time-stretch or \"stasis\" effect, This may be useful for synthesizer pad sounds, identifying performance glitches or just creating interesting aural textures. Use Change Tempo or Sliding Time Scale rather than Paulstretch for tasks like slowing down a song to a \"practice\" tempo. "},
{ key:   "Invoke the Phaser effect dialog",
  short: "The name \"Phaser\" comes from \"Phase Shifter\", because it works by combining phase-shifted signals with the original signal",
  long:  "The name \"Phaser\" comes from \"Phase Shifter\", because it works by combining phase-shifted signals with the original signal.  The movement of the phase-shifted signals is controlled using a Low '''''[[Glossary#frequency|Frequency]]''''' Oscillator (LFO)."},
{ key:   "Repair",
  short: "Fix one particular short click, pop or other glitch no more than 128 samples long",
  long:  "Fix one particular short click, pop or other glitch no more than 128 samples long."},
{ key:   "Invoke the Repeat effect dialog",
  short: "Repeats the selection the specified number of times",
  long:  "Repeats the selection the specified number of times."},
{ key:   "Invoke the Reverb effect dialog",
  short: "A configurable stereo reverberation effect with built-in and user-added presets",
  long:  "A configurable stereo reverberation effect with built-in and user-added presets. It can be used to add ambience (an impression of the space in which a sound occurs) to a mono sound. Also use it to increase reverberation in stereo audio that sounds too \"dry\" or \"close\". "},
{ key:   "Reverse",
  short: "Reverses the selected audio; after the effect the end of the audio will be heard first and the beginning last",
  long:  "Reverses the selected audio; after the effect the end of the audio will be heard first and the beginning last."},
{ key:   "Invoke the Sliding Time Scale/Pitch Shift effect dialog",
  short: "This effect allows you to make a continuous change to the tempo and/or pitch of a selection by choosing initial and/or final change values",
  long:  "This effect allows you to make a continuous change to the tempo and/or pitch of a selection by choosing initial and/or final change values."},
{ key:   "Invoke the Truncate Silence effect dialog",
  short: "Automatically try to find and eliminate audible silences",
  long:  "Automatically try to find and eliminate audible silences. Don't use with faded audio."},
{ key:   "Invoke the Wahwah effect dialog",
  short: "Rapid tone quality variations, like that guitar sound so popular in the 1970's",
  long:  "Rapid tone quality variations, like that guitar sound so popular in the 1970's."},
{ key:   "Invoke the SC4 effect dialog",
  short: "This effect is a stereo compressor with a variable envelope follower for RMS (average) / peak behavior",
  long:  "This effect is a stereo compressor with a variable envelope follower for RMS (average) / peak behavior."},
{ key:   "Invoke the Adjustable Fade effect dialog",
  short: "enables you to control the shape of the fade (non-linear fading) to be applied by adjusting various parameters; allows partial ''(that is not from or to zero)'' fades up or down",
  long:  "enables you to control the shape of the fade (non-linear fading) to be applied by adjusting various parameters; allows partial ''(that is not from or to zero)'' fades up or down."},
{ key:   "Invoke the Clip Fix effect dialog",
  short: "Clip Fix attempts to reconstruct clipped regions by interpolating the lost signal",
  long:  "Clip Fix attempts to reconstruct clipped regions by interpolating the lost signal."},
{ key:   "Crossfade Clips",
  short: "Use Crossfade Clips to apply a simple crossfade to a selected pair of clips in a single audio track",
  long:  "Use Crossfade Clips to apply a simple crossfade to a selected pair of clips in a single audio track. "},
{ key:   "Invoke the Crossfade Tracks effect dialog",
  short: "Use Crossfade Tracks to make a smooth transition between two overlapping tracks one above the other",
  long:  "Use Crossfade Tracks to make a smooth transition between two overlapping tracks one above the other. Place the track to be faded out above the track to be faded in then select the overlapping region in both tracks and apply the effect."},
{ key:   "Invoke the Delay effect dialog",
  short: "A configurable delay effect with variable delay time and pitch shifting of the delays",
  long:  "A configurable delay effect with variable delay time and pitch shifting of the delays."},
{ key:   "Invoke the High Pass Filter effect dialog",
  short: "Passes frequencies above its cutoff frequency and attenuates frequencies below its cutoff frequency",
  long:  "Passes frequencies above its cutoff frequency and attenuates frequencies below its cutoff frequency."},
{ key:   "Invoke the Limiter effect dialog",
  short: "Limiter passes signals below a specified input level unaffected or gently reduced, while preventing the peaks of stronger signals from exceeding this threshold",
  long:  "Limiter passes signals below a specified input level unaffected or gently reduced, while preventing the peaks of stronger signals from exceeding this threshold.  Mastering engineers often use this type of dynamic range compression combined with make-up gain to increase the perceived loudness of an audio recording during the audio mastering process."},
{ key:   "Invoke the Low Pass Filter effect dialog",
  short: "Passes frequencies below its cutoff frequency and attenuates frequencies above its cutoff frequency",
  long:  "Passes frequencies below its cutoff frequency and attenuates frequencies above its cutoff frequency."},
{ key:   "Invoke the Notch Filter effect dialog",
  short: "Greatly attenuate (\"notch out\"), a narrow frequency band",
  long:  "Greatly attenuate (\"notch out\"), a narrow frequency band. This is a good way to remove mains hum or a whistle confined to a specific frequency with minimal damage to the remainder of the audio.  "},
{ key:   "Invoke the Nyquist Prompt effect dialog",
  short: "Brings up a dialog where you can enter Nyquist commands",
  long:  "Brings up a dialog where you can enter Nyquist commands. Nyquist is a programming language for generating, processing and analyzing audio. For more information see [http://wiki.audacityteam.org/wiki/Nyquist_Plugins_Reference Nyquist Plug-ins Reference]."},
{ key:   "Spectral edit multi tool",
  short: "When the selected track is in [[Audio_Track_Dropdown_Menu#spgram|spectrogram]] or [[Audio_Track_Dropdown_Menu#spgram_log|spectrogram log(f)]] view, applies a  '''''[[Glossary#notch|notch filter]]''''', '''''[[Glossary#hp|high pass filter]]''''' or '''''[[Glossary#lp|low pass filter]]''''' according to the spectral selection made",
  long:  "When the selected track is in [[Audio_Track_Dropdown_Menu#spgram|spectrogram]] or [[Audio_Track_Dropdown_Menu#spgram_log|spectrogram log(f)]] view, applies a  '''''[[Glossary#notch|notch filter]]''''', '''''[[Glossary#hp|high pass filter]]''''' or '''''[[Glossary#lp|low pass filter]]''''' according to the spectral selection made. This effect can also be used to change the audio quality as an alternative to using [[Equalization]]. "},
{ key:   "Invoke the Spectral edit parametric EQ effect dialog",
  short: "When the selected track is in [[Audio_Track_Dropdown_Menu#spgram|spectrogram]] or [[Audio_Track_Dropdown_Menu#spgram_log|spectrogram log(f)]] view and the spectral selection has a center frequency and an upper and lower boundary, performs the specified '''''[[Glossary#band_stop|band cut]]''''' or '''''[[Glossary#band_pass|band boost]]'''''",
  long:  "When the selected track is in [[Audio_Track_Dropdown_Menu#spgram|spectrogram]] or [[Audio_Track_Dropdown_Menu#spgram_log|spectrogram log(f)]] view and the spectral selection has a center frequency and an upper and lower boundary, performs the specified '''''[[Glossary#band_stop|band cut]]''''' or '''''[[Glossary#band_pass|band boost]]'''''. This can be used as an alternative to [[Equalization]] or may also be useful to repair damaged audio by reducing frequency spikes or boosting other frequencies to mask spikes."},
{ key:   "Invoke the Spectral edit shelves effect dialog",
  short: "When the selected track is in [[Audio_Track_Dropdown_Menu#spgram|spectrogram]] or [[Audio_Track_Dropdown_Menu#spgram_log|spectrogram log(f)]] view, applies either a low- or high-frequency shelving filter or both filters, according to the spectral selection made",
  long:  "When the selected track is in [[Audio_Track_Dropdown_Menu#spgram|spectrogram]] or [[Audio_Track_Dropdown_Menu#spgram_log|spectrogram log(f)]] view, applies either a low- or high-frequency shelving filter or both filters, according to the spectral selection made. This can be used as an alternative to [[Equalization]] or may also be useful to repair damaged audio by reducing frequency spikes or boosting other frequencies to mask spikes."},
{ key:   "Studio Fade Out",
  short: "Applies a more musical fade out to the selected audio, giving a more pleasing sounding result",
  long:  "Applies a more musical fade out to the selected audio, giving a more pleasing sounding result."},
{ key:   "Invoke the Tremolo effect dialog",
  short: "Modulates the volume of the selection at the depth and rate selected in the dialog",
  long:  "Modulates the volume of the selection at the depth and rate selected in the dialog. The same as the tremolo effect familiar to guitar and keyboard players."},
{ key:   "Invoke the Vocal Reduction and Isolation effect dialog",
  short: "Attempts to remove or isolate center-panned audio from a stereo track",
  long:  "Attempts to remove or isolate center-panned audio from a stereo track.  Most  \"Remove\" options in this effect preserve the stereo image. "},
{ key:   "Invoke the Vocal Remover effect dialog",
  short: "(Legacy effect) Attempts to remove center-panned vocals from a stereo track",
  long:  "(Legacy effect) Attempts to remove center-panned vocals from a stereo track. The output from this effect will always be mono. Help text is available from within the dialog."},
{ key:   "Invoke the Vocoder effect dialog",
  short: "Synthesizes audio (usually a voice) in the left channel of a stereo track with a ''carrier wave'' (typically white noise) in the right channel to produce a modified version of the left channel",
  long:  "Synthesizes audio (usually a voice) in the left channel of a stereo track with a ''carrier wave'' (typically white noise) in the right channel to produce a modified version of the left channel. Vocoding a normal voice with white noise will produce a robot-like voice for special effects."},
{ key:   "Add / Remove Plug-ins...",
  short: "Selecting this option from the Effect Menu (or the [[Generate Menu]] or [[Analyze Menu]]) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity",
  long:  "Selecting this option from the Effect Menu (or the [[Generate Menu]] or [[Analyze Menu]]) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity. Even if you do not add any third-party plug-ins, you can use this to make the Effect menu shorter or longer as required.  For details see [[Manage Effects, Generators and Analyzers|Add / Remove Effects, Generators and Analyzers]]."},
{ key:   "Contrast...",
  short: "Analyzes a single mono or stereo speech track to determine the average '''''[[Glossary#rms|RMS]]''''' ''difference in volume'' (contrast) between foreground speech and background music, audience noise or similar",
  long:  "Analyzes a single mono or stereo speech track to determine the average '''''[[Glossary#rms|RMS]]''''' ''difference in volume'' (contrast) between foreground speech and background music, audience noise or similar. The purpose is to determine if the speech will be intelligible to the hard of hearing."},
{ key:   "Plot Spectrum...",
  short: "Takes the selected audio (which is a set of sound pressure values at points in time) and converts it to a graph of frequencies against '''''[[Glossary#amplitude|amplitudes]]'''''",
  long:  "Takes the selected audio (which is a set of sound pressure values at points in time) and converts it to a graph of frequencies against '''''[[Glossary#amplitude|amplitudes]]'''''."},
{ key:   "Find Clipping...",
  short: "Displays runs of '''''[[Glossary#clipping|clipped]]''''' samples in a [[Label Tracks|Label Track]], as a screen-reader accessible alternative to {{menu|[[View Menu|View]] > [[View Menu#Show Clipping|Show Clipping]]}}",
  long:  "Displays runs of '''''[[Glossary#clipping|clipped]]''''' samples in a [[Label Tracks|Label Track]], as a screen-reader accessible alternative to {{menu|[[View Menu|View]] > [[View Menu#Show Clipping|Show Clipping]]}}. A run must include at least one clipped sample, but may include unclipped samples too. "},
{ key:   "Beat Finder...",
  short: "Attempts to place [[Label Tracks|labels]] at beats which are much louder than the surrounding audio",
  long:  "Attempts to place [[Label Tracks|labels]] at beats which are much louder than the surrounding audio. It's a fairly rough and ready tool, and will not necessarily work well on a typical modern pop music track with compressed '''''[[Glossary#dynamic_range|dynamic range]]'''''. If you do not get enough beats detected, try reducing the \"Threshold Percentage\" setting."},
{ key:   "Regular Interval Labels...",
  short: "Places [[Label Tracks|labels]] in a long track so as to divide it into smaller, equally sized  segments",
  long:  "Places [[Label Tracks|labels]] in a long track so as to divide it into smaller, equally sized  segments."},
{ key:   "Sample Data Export...",
  short: "Reads the values of successive samples from the selected audio and prints this data to a plain text, CSV or HTML file",
  long:  "Reads the values of successive samples from the selected audio and prints this data to a plain text, CSV or HTML file. Further information may be added as a \"header\" at the top of the file."},
{ key:   "Silence Finder...",
  short: "Divides up a track by placing point [[Label Tracks|labels]] inside areas of silence",
  long:  "Divides up a track by placing point [[Label Tracks|labels]] inside areas of silence. "},
{ key:   "Sound Finder...",
  short: "Divides up a track by placing region [[Label Tracks|labels]] for areas of sound that are separated by silence",
  long:  "Divides up a track by placing region [[Label Tracks|labels]] for areas of sound that are separated by silence."},
{ key:   "Quick Help",
  short: "A brief version of help with some of the most essential information",
  long:  "A brief version of help with some of the most essential information."},
{ key:   "Manual",
  short: "Opens the manual in the default browser",
  long:  "Opens the manual in the default browser."},
{ key:   "Tools",
  short: "Takes you to Screenshot tools and Benchmarking",
  long:  "Takes you to Screenshot tools and Benchmarking"},
{ key:   "Diagnostics",
  short: "A set of diagnostic tools",
  long:  "A set of diagnostic tools"},
{ key:   "Check for Updates...",
  short: "Checks online to see if this is the latest version of Audacity",
  long:  "Checks online to see if this is the latest version of Audacity."},
{ key:   "About Audacity...",
  short: "Brings a dialog with information about Audacity, such as who wrote it, what features are enabled and the GNU GPL v2 license",
  long:  "Brings a dialog with information about Audacity, such as who wrote it, what features are enabled and the GNU GPL v2 license."},
{ key:   "Screenshot Tools...",
  short: "A tool, mainly used in documentation, to capture screenshots of Audacity",
  long:  "A tool, mainly used in documentation, to capture screenshots of Audacity."},
{ key:   "Run Benchmark...",
  short: "A tool for measuring the performance of one part of Audacity",
  long:  "A tool for measuring the performance of one part of Audacity."},
{ key:   "Audio Device Info...",
  short: "Shows technical information about your detected audio device(s)",
  long:  "Shows technical information about your detected audio device(s)."},
{ key:   "Show Log...",
  short: "Launches the \"Audacity Log\" window, the log is largely a debugging aid, having timestamps for each entry",
  long:  "Launches the \"Audacity Log\" window, the log is largely a debugging aid, having timestamps for each entry"},
{ key:   "MIDI Device Info...",
  short: "Shows technical information about your detected MIDI device(s)",
  long:  "Shows technical information about your detected MIDI device(s)."},
{ key:   "Generate Support Data...",
  short: "Selecting this will generate a Debug report which could be useful in aiding the developers to identify bugs in Audacity or in third-party plug-ins",
  long:  "Selecting this will generate a Debug report which could be useful in aiding the developers to identify bugs in Audacity or in third-party plug-ins"},
{ key:   "Check Dependencies...",
  short: "Lists any WAV or AIFF audio files that your project depends on, and allows you to copy these files into the project",
  long:  "Lists any WAV or AIFF audio files that your project depends on, and allows you to copy these files into the project"},
{ key:   "Transport",
  short: "Extra commands related to play and record",
  long:  "Extra commands related to play and record"},
{ key:   "Tools",
  short: "Extra commands to select the tool, e",
  long:  "Extra commands to select the tool, e.g. time-shift, envelopes, multi-tool."},
{ key:   "Edit",
  short: "Extra commands related to editing",
  long:  "Extra commands related to editing"},
{ key:   "Device",
  short: "Extra commands related to selecting a device",
  long:  "Extra commands related to selecting a device"},
{ key:   "Mixer",
  short: "Extra commands related to volume",
  long:  "Extra commands related to volume"},
{ key:   "Transcription",
  short: "Extra commands related to play at speed",
  long:  "Extra commands related to play at speed"},
{ key:   "Seek",
  short: "Extra commands related to seeking",
  long:  "Extra commands related to seeking"},
{ key:   "Selection",
  short: "Extra commands related to selecting",
  long:  "Extra commands related to selecting."},
{ key:   "Play",
  short: "Play (or stop) audio",
  long:  "Play (or stop) audio"},
{ key:   "Stop",
  short: "Stop audio",
  long:  "Stop audio"},
{ key:   "Play One Second",
  short: "Plays for one second centered on the current <b>mouse pointer</b> position (not from the current cursor position)",
  long:  "Plays for one second centered on the current <b>mouse pointer</b> position (not from the current cursor position). See [[Playing_and_Recording#Play_One_Second_.281.29|this page]] for an example."},
{ key:   "Play To Selection",
  short: "Plays to or from the current <b>mouse pointer</b> position to or from the start or end of the selection, depending on the pointer position",
  long:  "Plays to or from the current <b>mouse pointer</b> position to or from the start or end of the selection, depending on the pointer position. See [[Playing_and_Recording#Play_To_Selection_.28B.29|this page]] for more details."},
{ key:   "Play Before Selection Start",
  short: "Plays a short period before the start of the selected audio, the period before shares the setting of the cut preview",
  long:  "Plays a short period before the start of the selected audio, the period before shares the setting of the cut preview."},
{ key:   "Play After Selection Start",
  short: "Plays a short period after the start of the selected audio, the period after shares the setting of the cut preview",
  long:  "Plays a short period after the start of the selected audio, the period after shares the setting of the cut preview."},
{ key:   "Play Before Selection End",
  short: "Plays a short period before the end of the selected audio, the period before shares the setting of the cut preview",
  long:  "Plays a short period before the end of the selected audio, the period before shares the setting of the cut preview."},
{ key:   "Play After Selection End",
  short: "Plays a short period after the end of the selected audio, the period after shares the setting of the cut preview",
  long:  "Plays a short period after the end of the selected audio, the period after shares the setting of the cut preview."},
{ key:   "Play Before and After Selection Start",
  short: "Plays a short period  before and after the start of the selected audio, the periods before and after share the setting of the cut preview",
  long:  "Plays a short period  before and after the start of the selected audio, the periods before and after share the setting of the cut preview."},
{ key:   "Play Before and After Selection End",
  short: "Plays a short period  before and after the end of the selected audio, the periods before and after share the setting of the cut preview",
  long:  "Plays a short period  before and after the end of the selected audio, the periods before and after share the setting of the cut preview."},
{ key:   "Play Cut Preview",
  short: "Plays audio excluding the selection",
  long:  "Plays audio excluding the selection"},
{ key:   "Selection Tool",
  short: "Chooses Selection tool",
  long:  "Chooses Selection tool."},
{ key:   "Envelope Tool",
  short: "Chooses Envelope tool",
  long:  "Chooses Envelope tool."},
{ key:   "Draw Tool",
  short: "Chooses Draw tool",
  long:  "Chooses Draw tool."},
{ key:   "Zoom Tool",
  short: "Chooses Zoom tool",
  long:  "Chooses Zoom tool."},
{ key:   "Time Shift Tool",
  short: "Chooses Time Shift tool",
  long:  "Chooses Time Shift tool."},
{ key:   "Multi Tool",
  short: "Chooses the Mulit-Tool",
  long:  "Chooses the Mulit-Tool"},
{ key:   "Next Tool",
  short: "Cycles forwards through the tools, starting from the currently selected tool: starting from Selection, it would navigate to Envelope to Draw to Zoom to Time Shift to Multi-tool to Selection",
  long:  "Cycles forwards through the tools, starting from the currently selected tool: starting from Selection, it would navigate to Envelope to Draw to Zoom to Time Shift to Multi-tool to Selection."},
{ key:   "Previous Tool",
  short: "Cycles backwards through the tools, starting from the currently selected tool: starting from Selection, it would navigate to Multi-tool to Time Shift to Zoom to Draw to Envelope to Selection",
  long:  "Cycles backwards through the tools, starting from the currently selected tool: starting from Selection, it would navigate to Multi-tool to Time Shift to Zoom to Draw to Envelope to Selection."},
{ key:   "DeleteKey",
  short: "Deletes the selection",
  long:  "Deletes the selection. When focus is in [[Selection Toolbar]], BACKSPACE is not a shortcut but navigates back to the previous digit and sets it to zero."},
{ key:   "DeleteKey2",
  short: "Deletes the selection",
  long:  "Deletes the selection."},
{ key:   "Change recording device",
  short: "Displays the Select recording Device dialog for choosing the recording device, but only if the \"Recording Device\" dropdown menu in Device Toolbar has entries for devices",
  long:  "Displays the Select recording Device dialog for choosing the recording device, but only if the \"Recording Device\" dropdown menu in Device Toolbar has entries for devices. Otherwise, an recording error message will be displayed."},
{ key:   "Change playback device",
  short: "Displays the Select Playback Device dialog for choosing the playback device, but only if the \"Playback Device\" dropdown menu in Device Toolbar has entries for devices",
  long:  "Displays the Select Playback Device dialog for choosing the playback device, but only if the \"Playback Device\" dropdown menu in Device Toolbar has entries for devices. Otherwise, an error message will be displayed. "},
{ key:   "Change audio host",
  short: "Displays the Select Audio Host dialog for choosing the particular interface with which Audacity communicates with your chosen playback and recording devices",
  long:  "Displays the Select Audio Host dialog for choosing the particular interface with which Audacity communicates with your chosen playback and recording devices.  "},
{ key:   "Change recording channels",
  short: "Displays the Select Recording Channels dialog for choosing the number of channels to be recorded by the chosen recording device",
  long:  "Displays the Select Recording Channels dialog for choosing the number of channels to be recorded by the chosen recording device."},
{ key:   "Adjust playback volume",
  short: "Displays the Playback Volume dialog",
  long:  "Displays the Playback Volume dialog. You can type a new value for the playback volume (between 0 and 1), or press {{key|Tab}}, then use the left and right arrow keys to adjust the slider."},
{ key:   "Increase playback volume",
  short: "Each key press will increase the playback volume by 0",
  long:  "Each key press will increase the playback volume by 0.1."},
{ key:   "Decrease playback volume",
  short: "Each key press will decrease the playback volume by 0",
  long:  "Each key press will decrease the playback volume by 0.1."},
{ key:   "Adjust recording volume",
  short: "Displays the Recording Volume dialog",
  long:  "Displays the Recording Volume dialog. You can type a new value for the recording volume (between 0 and 1), or press {{key|Tab}}, then use the left and right arrow keys to adjust the slider."},
{ key:   "Increase recording volume",
  short: "Each key press will increase the recording volume by 0",
  long:  "Each key press will increase the recording volume by 0.1."},
{ key:   "Decrease recording volume",
  short: "Each key press will decrease the recording volume by 0",
  long:  "Each key press will decrease the recording volume by 0.1."},
{ key:   "Play-at-Speed",
  short: "Play audio at a faster or slower speed",
  long:  "Play audio at a faster or slower speed"},
{ key:   "Loop Play-at-Speed",
  short: "Combines looped play and play at speed",
  long:  "Combines looped play and play at speed"},
{ key:   "Play Cut Preview-at-Speed",
  short: "Combines cut preview and play at speed",
  long:  "Combines cut preview and play at speed"},
{ key:   "Adjust playback speed",
  short: "Displays the Playback Speed dialog",
  long:  "Displays the Playback Speed dialog. You can type a new value for the playback volume (between 0 and 1), or press {{key|Tab}}, then use the left and right arrow keys to adjust the slider."},
{ key:   "Increase playback speed",
  short: "Each key press will increase the playback speed by 0",
  long:  "Each key press will increase the playback speed by 0.1."},
{ key:   "Decrease playback speed",
  short: "Each key press will decrease the playback speed by 0",
  long:  "Each key press will decrease the playback speed by 0.1."},
{ key:   "Move to Next Label",
  short: "Moves selection to the next label",
  long:  "Moves selection to the next label"},
{ key:   "Move to Previous Label",
  short: "Moves selection to the previous label",
  long:  "Moves selection to the previous label"},
{ key:   "Short seek left during playback",
  short: "Skips the playback cursor back one second by default",
  long:  "Skips the playback cursor back one second by default."},
{ key:   "Short seek right during playback",
  short: "Skips the playback cursor forward one second by default",
  long:  "Skips the playback cursor forward one second by default."},
{ key:   "Long seek left during playback",
  short: "Skips the playback cursor back 15 seconds by default",
  long:  "Skips the playback cursor back 15 seconds by default."},
{ key:   "Long Seek right during playback",
  short: "Skips the playback cursor forward 15 seconds by default",
  long:  "Skips the playback cursor forward 15 seconds by default."},
{ key:   "Snap To Off",
  short: "Equivalent to setting the Snap To control in Selection Toolbar to \"Off\"",
  long:  "Equivalent to setting the Snap To control in Selection Toolbar to \"Off\"."},
{ key:   "Snap To Nearest",
  short: "Equivalent to setting the Snap To control in Selection Toolbar to \"Nearest\"",
  long:  "Equivalent to setting the Snap To control in Selection Toolbar to \"Nearest\"."},
{ key:   "Snap To Prior",
  short: "Equivalent to setting the Snap To control in Selection Toolbar to \"Prior\"",
  long:  "Equivalent to setting the Snap To control in Selection Toolbar to \"Prior\"."},
{ key:   "Selection to Start",
  short: "Select from cursor to start of track",
  long:  "Select from cursor to start of track"},
{ key:   "Selection to End",
  short: "Select from cursor to end of track",
  long:  "Select from cursor to end of track"},
{ key:   "Selection Extend Left",
  short: "Increases the size of the selection by extending it to the left",
  long:  "Increases the size of the selection by extending it to the left. The amount of increase is dependent on the zoom level. If there is no selection one is created starting at the cursor position."},
{ key:   "Selection Extend Right",
  short: "Increases the size of the selection by extending it to the right",
  long:  "Increases the size of the selection by extending it to the right. The amount of increase is dependent on the zoom level. If there is no selection one is created starting at the cursor position."},
{ key:   "Set (or Extend) Left Selection",
  short: "Extend selection left a little (is this a duplicate?)",
  long:  "Extend selection left a little (is this a duplicate?)"},
{ key:   "Set (or Extend) Right Selection",
  short: "Extend selection right a litlle (is this a duplicate?)",
  long:  "Extend selection right a litlle (is this a duplicate?)"},
{ key:   "Selection Contract Left",
  short: "Decreases the size of the selection by contracting it from the right",
  long:  "Decreases the size of the selection by contracting it from the right. The amount of decrease is dependent on the zoom level. If there is no selection no action is taken."},
{ key:   "Selection Contract Right",
  short: "Decreases the size of the selection by contracting it from the left",
  long:  "Decreases the size of the selection by contracting it from the left. The amount of decrease is dependent on the zoom level. If there is no selection no action is taken."},
{ key:   "Focus",
  short: "Extra commands to set focus, usually focus on one track",
  long:  "Extra commands to set focus, usually focus on one track"},
{ key:   "Cursor",
  short: "Extra commands to move the cursor",
  long:  "Extra commands to move the cursor"},
{ key:   "Track",
  short: "Extra commands to operate on a track that has focus",
  long:  "Extra commands to operate on a track that has focus"},
{ key:   "Full screen (on/off)",
  short: "Toggle full screen mode with no title bar",
  long:  "Toggle full screen mode with no title bar"},
{ key:   "Move backward from toolbars to tracks",
  short: "Move backward through currently focused toolbar in [[Toolbars Overview#upper_tooldock|Upper Toolbar dock area]], Track View and currently focused toolbar in [[Toolbars Overview#lower_tooldock|Lower Toolbar dock area]]",
  long:  "Move backward through currently focused toolbar in [[Toolbars Overview#upper_tooldock|Upper Toolbar dock area]], Track View and currently focused toolbar in [[Toolbars Overview#lower_tooldock|Lower Toolbar dock area]].  Each use moves the keyboard focus as indicated. "},
{ key:   "Move forward from toolbars to tracks",
  short: "Move forward through currently focused toolbar in [[Toolbars Overview#upper_tooldock|Upper Toolbar dock area]], Track View and currently focused toolbar in [[Toolbars Overview#lower_tooldock|Lower Toolbar dock area]]",
  long:  "Move forward through currently focused toolbar in [[Toolbars Overview#upper_tooldock|Upper Toolbar dock area]], Track View and currently focused toolbar in [[Toolbars Overview#lower_tooldock|Lower Toolbar dock area]].  Each use moves the keyboard focus as indicated. "},
{ key:   "Move Focus to Previous Track",
  short: "Focus one track up",
  long:  "Focus one track up"},
{ key:   "Move Focus to Next Track",
  short: "Focus one track down",
  long:  "Focus one track down"},
{ key:   "Move Focus to First Track",
  short: "Focus on first track",
  long:  "Focus on first track"},
{ key:   "Move Focus to Last Track",
  short: "Focus on last track",
  long:  "Focus on last track"},
{ key:   "Move Focus to Previous and Select",
  short: "Focus one track up and select it",
  long:  "Focus one track up and select it"},
{ key:   "Move Focus to Next and Select",
  short: "Focus one track down and select it",
  long:  "Focus one track down and select it"},
{ key:   "Toggle Focused Track",
  short: "Toggle focus on current track",
  long:  "Toggle focus on current track"},
{ key:   "Toggle Focused Track",
  short: "Toggle focus on current track",
  long:  "Toggle focus on current track"},
{ key:   "Cursor Left",
  short: "When not playing audio, moves the editing cursor one screen pixel to left",
  long:  "When not playing audio, moves the editing cursor one screen pixel to left. When a [[Selection Toolbar#snap|Snap To]] option is chosen, moves the cursor to the preceding unit of time as determined by the current [[Audacity Selection#selection_formats|selection format]]. If the key is held down, the cursor speed depends on the length of the tracks. When playing audio, moves the playback cursor as described at \"Cursor Short Jump Left\""},
{ key:   "Cursor Right",
  short: "When not playing audio, moves the editing cursor one screen pixel to right",
  long:  "When not playing audio, moves the editing cursor one screen pixel to right. When a [[Selection Toolbar#snap|Snap To]] option is chosen, moves the cursor to the following unit of time as determined by the current [[Audacity Selection#selection_formats|selection format]]. If the key is held down, the cursor speed depends on the length of the tracks. When playing audio, moves the playback cursor as described at \"Cursor Short Jump Right\" "},
{ key:   "Cursor Short Jump Left",
  short: "When not playing audio, moves the editing cursor one second left by default",
  long:  "When not playing audio, moves the editing cursor one second left by default. When playing audio, moves the playback cursor one second left by default. The default value can be changed by adjusting the \"Short Period\" under \"Seek Time when playing\" in [[Playback Preferences]]."},
{ key:   "Cursor Short Jump Right",
  short: "When not playing audio, moves the editing cursor one second right by default",
  long:  "When not playing audio, moves the editing cursor one second right by default. When playing audio, moves the playback cursor one second right by default. The default value can be changed by adjusting the \"Short Period\" under \"Seek Time when playing\" in [[Playback Preferences]]."},
{ key:   "Cursor Long Jump Left",
  short: "When not playing audio, moves the editing cursor 15 seconds left by default",
  long:  "When not playing audio, moves the editing cursor 15 seconds left by default. When playing audio, moves the playback cursor 15 seconds left by default. The default value can be changed by adjusting the \"Long Period\" under \"Seek Time when playing\" in [[Playback Preferences]]."},
{ key:   "Cursor Long Jump Right",
  short: "When not playing audio, moves the editing cursor 15 seconds right by default",
  long:  "When not playing audio, moves the editing cursor 15 seconds right by default. When playing audio, moves the playback cursor 15 seconds right by default. The default value can be changed by adjusting the \"Long Period\" under \"Seek Time when playing\" in [[Playback Preferences]]."},
{ key:   "Clip Left",
  short: "Moves the [[Audio Tracks#focus|currently focused]] audio track (or a separate [[Audacity Tracks and Clips|clip]] in that track which contains the editing cursor or [[Audacity Selection|selection region]]) one screen pixel to left",
  long:  "Moves the [[Audio Tracks#focus|currently focused]] audio track (or a separate [[Audacity Tracks and Clips|clip]] in that track which contains the editing cursor or [[Audacity Selection|selection region]]) one screen pixel to left."},
{ key:   "Clip Right",
  short: "Moves the [[Audio Tracks#focus|currently focused]] audio track (or a separate [[Audacity Tracks and Clips|clip]] in that track which contains the editing cursor or [[Audacity Selection|selection region]]) one screen pixel to right",
  long:  "Moves the [[Audio Tracks#focus|currently focused]] audio track (or a separate [[Audacity Tracks and Clips|clip]] in that track which contains the editing cursor or [[Audacity Selection|selection region]]) one screen pixel to right."},
{ key:   "Change pan on focused track",
  short: "Brings up the Pan dialog for the focused track where you can enter a pan value, or use the slider for finer control of panning than is available when using the track pan slider",
  long:  "Brings up the Pan dialog for the focused track where you can enter a pan value, or use the slider for finer control of panning than is available when using the track pan slider."},
{ key:   "Pan left on focused track",
  short: "Controls the pan slider on the focused track",
  long:  "Controls the pan slider on the focused track. Each keypress changes the pan value by 10% left."},
{ key:   "Pan right on focused track",
  short: "Controls the pan slider on the focused track",
  long:  "Controls the pan slider on the focused track. Each keypress changes the pan value by 10% right."},
{ key:   "Change gain on focused track",
  short: "Brings up the Gain dialog for the focused track where you can enter a gain value, or use the slider for finer control of gain than is available when using the track pan slider",
  long:  "Brings up the Gain dialog for the focused track where you can enter a gain value, or use the slider for finer control of gain than is available when using the track pan slider."},
{ key:   "Increase gain on focused track",
  short: "Controls the gain slider on the focused track",
  long:  "Controls the gain slider on the focused track. Each keypress increases the gain value by 1 dB."},
{ key:   "Decrease gain on focused track",
  short: "Controls the gain slider on the focused track",
  long:  "Controls the gain slider on the focused track. Each keypress decreases the gain value by 1 dB."},
{ key:   "Open menu on focused track",
  short: "Opens the [[Audio Track Dropdown Menu]] on the focused [[Audio Tracks|audio track]] or [[Tracks|other track type]]",
  long:  "Opens the [[Audio Track Dropdown Menu]] on the focused [[Audio Tracks|audio track]] or [[Tracks|other track type]]. In the audio track dropdown, use {{key|Up}}, and {{key|Down}}, arrow keys to navigate the menu and {{key|Enter}}, to select a menu item. Use {{key|Right}}, arrow to open the \"Set Sample Format\" and \"Set Rate\" choices or {{key|Left}}, arrow to leave those choices. "},
{ key:   "Mute/Unmute focused track",
  short: "Toggles the Mute button on the focused track",
  long:  "Toggles the Mute button on the focused track."},
{ key:   "Solo/Unsolo focused track",
  short: "Toggles the Solo button on the focused track",
  long:  "Toggles the Solo button on the focused track."},
{ key:   "Close focused track",
  short: "Close (remove) the focused track",
  long:  "Close (remove) the focused track only."},
{ key:   "Move focused track up",
  short: "Moves the focused track up by one track and moves the focus there",
  long:  "Moves the focused track up by one track and moves the focus there."},
{ key:   "Move focused track down",
  short: "Moves the focused track down by one track and moves the focus there",
  long:  "Moves the focused track down by one track and moves the focus there."},
{ key:   "Move focused track to top",
  short: "Moves the focused track up to the top of the track table and moves the focus there",
  long:  "Moves the focused track up to the top of the track table and moves the focus there."},
{ key:   "Move focused track to bottom",
  short: "Moves the focused track down to the bottom of the track table and moves the focus there",
  long:  "Moves the focused track down to the bottom of the track table and moves the focus there."},

];



Audacity.Commands = [
    { id: "Amplify", name: "Amplify", params: [
        { key: "Ratio", type: "float", default: "0.900000"},
    ]},
    { id: "AutoDuck", name: "Auto Duck", params: [
        { key: "DuckAmountDb", type: "double", default: "-12.000000"},
        { key: "InnerFadeDownLen", type: "double", default: "0.000000"},
        { key: "InnerFadeUpLen", type: "double", default: "0.000000"},
        { key: "OuterFadeDownLen", type: "double", default: "0.500000"},
        { key: "OuterFadeUpLen", type: "double", default: "0.500000"},
        { key: "ThresholdDb", type: "double", default: "-30.000000"},
        { key: "MaximumPause", type: "double", default: "1.000000"},
    ]},
    { id: "BassAndTreble", name: "Bass and Treble", params: [
        { key: "Bass", type: "double", default: "0.000000"},
        { key: "Treble", type: "double", default: "0.000000"},
        { key: "Gain", type: "double", default: "0.000000"},
        { key: "Link Sliders", type: "bool", default: "False"},
    ]},
    { id: "ChangePitch", name: "Change Pitch", params: [
        { key: "Percentage", type: "double", default: "0.000000"},
        { key: "SBSMS", type: "bool", default: "False"},
    ]},
    { id: "ChangeSpeed", name: "Change Speed", params: [
        { key: "Percentage", type: "double", default: "0.000000"},
    ]},
    { id: "ChangeTempo", name: "Change Tempo", params: [
        { key: "Percentage", type: "double", default: "0.000000"},
        { key: "SBSMS", type: "bool", default: "False"},
    ]},
    { id: "Chirp", name: "Chirp", params: [
        { key: "StartFreq", type: "double", default: "440.000000"},
        { key: "EndFreq", type: "double", default: "1320.000000"},
        { key: "StartAmp", type: "double", default: "0.800000"},
        { key: "EndAmp", type: "double", default: "0.100000"},
        { key: "Waveform", type: "enum", default: "0",
            enum : ["Sine", "Square", "Sawtooth", "Square, no alias", ]
        },
        { key: "Interpolation", type: "enum", default: "0",
            enum : ["Linear", "Logarithmic", ]
        },
    ]},
    { id: "ClickRemoval", name: "Click Removal", params: [
        { key: "Threshold", type: "int", default: "200"},
        { key: "Width", type: "int", default: "20"},
    ]},
    { id: "Compressor", name: "Compressor", params: [
        { key: "Threshold", type: "double", default: "-12.000000"},
        { key: "NoiseFloor", type: "double", default: "-40.000000"},
        { key: "Ratio", type: "double", default: "2.000000"},
        { key: "AttackTime", type: "double", default: "0.200000"},
        { key: "ReleaseTime", type: "double", default: "1.000000"},
        { key: "Normalize", type: "bool", default: "True"},
        { key: "UsePeak", type: "bool", default: "False"},
    ]},
    { id: "DtmfTones", name: "DTMF Tones", params: [
        { key: "Sequence", type: "string", default: "audacity"},
        { key: "Duty Cycle", type: "double", default: "55.000000"},
        { key: "Amplitude", type: "double", default: "0.800000"},
    ]},
    { id: "DemoCommand", name: "Demo Command", params: [
        { key: "Delay", type: "float", default: "1.000000"},
        { key: "Decay", type: "float", default: "0.500000"},
    ]},
    { id: "Distortion", name: "Distortion", params: [
        { key: "Type", type: "enum", default: "0",
            enum : ["Hard Clipping", "Soft Clipping", "Soft Overdrive", "Medium Overdrive", "Hard Overdrive", "Cubic Curve (odd harmonics)", "Even Harmonics", "Expand and Compress", "Leveller", "Rectifier Distortion", "Hard Limiter 1413", ]
        },
        { key: "DC Block", type: "bool", default: "False"},
        { key: "Threshold dB", type: "double", default: "-6.000000"},
        { key: "Noise Floor", type: "double", default: "-70.000000"},
        { key: "Parameter 1", type: "double", default: "50.000000"},
        { key: "Parameter 2", type: "double", default: "50.000000"},
        { key: "Repeats", type: "int", default: "1"},
    ]},
    { id: "Echo", name: "Echo", params: [
        { key: "Delay", type: "float", default: "1.000000"},
        { key: "Decay", type: "float", default: "0.500000"},
    ]},
    { id: "Equalization", name: "Equalization", params: [
        { key: "FilterLength", type: "size_t", default: "4001"},
        { key: "CurveName", type: "string", default: "unnamed"},
        { key: "InterpolateLin", type: "bool", default: "False"},
        { key: "InterpolationMethod", type: "enum", default: "0",
            enum : ["B-spline", "Cosine", "Cubic", ]
        },
    ]},
    { id: "FindClipping", name: "Find Clipping", params: [
        { key: "Duty Cycle Start", type: "int", default: "3"},
        { key: "Duty Cycle End", type: "int", default: "3"},
    ]},
    { id: "Noise", name: "Noise", params: [
        { key: "Type", type: "enum", default: "0",
            enum : ["White", "Pink", "Brownian", ]
        },
        { key: "Amplitude", type: "double", default: "0.800000"},
    ]},
    { id: "Normalize", name: "Normalize", params: [
        { key: "Level", type: "double", default: "-1.000000"},
        { key: "ApplyGain", type: "bool", default: "True"},
        { key: "RemoveDcOffset", type: "bool", default: "True"},
        { key: "StereoIndependent", type: "bool", default: "False"},
    ]},
    { id: "Paulstretch", name: "Paulstretch", params: [
        { key: "Stretch Factor", type: "float", default: "10.000000"},
        { key: "Time Resolution", type: "float", default: "0.250000"},
    ]},
    { id: "Phaser", name: "Phaser", params: [
        { key: "Stages", type: "int", default: "2"},
        { key: "DryWet", type: "int", default: "128"},
        { key: "Freq", type: "double", default: "0.400000"},
        { key: "Phase", type: "double", default: "0.000000"},
        { key: "Depth", type: "int", default: "100"},
        { key: "Feedback", type: "int", default: "0"},
        { key: "Gain", type: "double", default: "-6.000000"},
    ]},
    { id: "Repeat", name: "Repeat", params: [
        { key: "Count", type: "int", default: "1"},
    ]},
    { id: "Reverb", name: "Reverb", params: [
        { key: "RoomSize", type: "double", default: "75.000000"},
        { key: "Delay", type: "double", default: "10.000000"},
        { key: "Reverberance", type: "double", default: "50.000000"},
        { key: "HfDamping", type: "double", default: "50.000000"},
        { key: "ToneLow", type: "double", default: "100.000000"},
        { key: "ToneHigh", type: "double", default: "100.000000"},
        { key: "WetGain", type: "double", default: "-1.000000"},
        { key: "DryGain", type: "double", default: "-1.000000"},
        { key: "StereoWidth", type: "double", default: "100.000000"},
        { key: "WetOnly", type: "bool", default: "False"},
    ]},
    { id: "ScreenshotCommand", name: "Screenshot", params: [
        { key: "Path", type: "string", default: ""},
        { key: "CaptureWhat", type: "enum", default: "window",
            enum : ["window", "fullwindow", "windowplus", "fullscreen", "toolbars", "menus", "effects", "preferences", "selectionbar", "spectralselection", "tools", "transport", "mixer", "meter", "playmeter", "recordmeter", "edit", "device", "scrub", "transcription", "trackpanel", "ruler", "tracks", "firsttrack", "secondtrack", ]
        },
        { key: "Background", type: "enum", default: "None",
            enum : ["Blue", "White", "None", ]
        },
    ]},
    { id: "TimeScale", name: "Sliding Time Scale/Pitch Shift", params: [
        { key: "RatePercentChangeStart", type: "double", default: "0.000000"},
        { key: "RatePercentChangeEnd", type: "double", default: "0.000000"},
        { key: "PitchHalfStepsStart", type: "double", default: "0.000000"},
        { key: "PitchHalfStepsEnd", type: "double", default: "0.000000"},
        { key: "PitchPercentChangeStart", type: "double", default: "0.000000"},
        { key: "PitchPercentChangeEnd", type: "double", default: "0.000000"},
    ]},
    { id: "Tone", name: "Tone", params: [
        { key: "Frequency", type: "double", default: "440.000000"},
        { key: "Amplitude", type: "double", default: "0.800000"},
        { key: "Waveform", type: "enum", default: "0",
            enum : ["Sine", "Square", "Sawtooth", "Square, no alias", ]
        },
        { key: "Interpolation", type: "enum", default: "0",
            enum : ["Linear", "Logarithmic", ]
        },
    ]},
    { id: "TruncateSilence", name: "Truncate Silence", params: [
        { key: "Db", type: "enum", default: "0",
            enum : ["-20 dB", "-25 dB", "-30 dB", "-35 dB", "-40 dB", "-45 dB", "-50 dB", "-55 dB", "-60 dB", "-65 dB", "-70 dB", "-75 dB", "-80 dB", ]
        },
        { key: "Action", type: "enum", default: "0",
            enum : ["Truncate Detected Silence", "Compress Excess Silence", ]
        },
        { key: "Minimum", type: "double", default: "0.500000"},
        { key: "Truncate", type: "double", default: "0.500000"},
        { key: "Compress", type: "double", default: "50.000000"},
        { key: "Independent", type: "bool", default: "False"},
    ]},
    { id: "Wahwah", name: "Wahwah", params: [
        { key: "Freq", type: "double", default: "1.500000"},
        { key: "Phase", type: "double", default: "0.000000"},
        { key: "Depth", type: "int", default: "70"},
        { key: "Resonance", type: "double", default: "2.500000"},
        { key: "Offset", type: "int", default: "30"},
        { key: "Gain", type: "double", default: "-6.000000"},
    ]},
];


//AudacityDoxed.Boxes = Audacity.Boxes;
AudacityDoxed.Menus = Audacity.Menus;
//AudacityDoxed.BoxUrls = Audacity.BoxUrls;
AudacityDoxed.MenuUrls = Audacity.MenuUrls;
AudacityDoxed.ExtraShortcuts = Audacity.ExtraShortcuts;
AudacityDoxed.Tips = Audacity.Tips;
AudacityDoxed.Commands = Audacity.Commands;





function rectString( x1,y1,x2,y2, name, tip ){
  var str = "rect ";
  str += ("    "+x1).slice(-4)+ " ";
  str += ("    "+y1).slice(-4)+ " ";
  str += ("    "+x2).slice(-4)+ " ";
  str += ("    "+y2).slice(-4)+ " ";
  str += "[[" + name + "|" + tip + "]]\r\n";
  return str;
}

/**
 *
 * @returns {string}
 * @constructor
 */
function ToolMap(){
  var i;
  var BoxEnd = null;
  var FB = null;
  var str = "";
  for(i=0;i< App.Boxes.length;i++){
    var Box = App.Boxes[i];
    if( Box[0] == 1 ){
      var name = Box[5].replace(/ /g, '');
      str += "|" + name + "=:<imagemap>\n";
      str += "Image:" + name + "Annotated.png\r\n";
      str += "desc none\r\n";
      BoxEnd = Box;
    }
    if( Box[0] == 2 ){
      // offset boxes by first actual location...
      if( FB )
        ;
      else if( Box.length > 6 )
        FB = [ Box[6]-3,Box[7]-3 ];
      else
        FB = [ 0,0 ];
      str += rectString( Box[1]-FB[0], Box[2]-FB[1], Box[3]-FB[0], Box[4]-FB[1],
        Box[5],
        Box[5] + " for...");
      if( Box.length > 6 ){
        str += rectString(  Box[6]-FB[0],Box[7]-FB[1], Box[8]-FB[0], Box[9]-FB[1],
          Box[5],
          "For...");
      }
    }
    if( BoxEnd && ( (i == App.Boxes.length -1 ) || App.Boxes[i+1][0]==1)){
      str += rectString(BoxEnd[1], BoxEnd[2], BoxEnd[3], BoxEnd[4],
        "Toolbars Overview#upper_tooldock",
        BoxEnd[5] + " - click on the image to see this toolbar displayed" +
        " in the default context of the upper tooldock layout");
      str += "</imagemap>\n";
      str += "{{ClickTip|x=" + (BoxEnd[3] - (FB?FB[0]:0) - 50) + "|y=-5}}\r\n\r\n\r\n";
      str += "&nbsp;\r\n\r\n";
      BoxEnd = null;
      FB = null;
    }
  }
  return str;
}




/**
 * Template 'here doc'
 * @returns {string}
 * @constructor
 */
Audacity.ToolsImap = function ToolTemplate(){

/*HEREDOC
</noinclude><includeonly>{{#switch: {{{1|EditToolbar}}}
|Dock1=:<imagemap>
Image:Dock1Annotated.png
desc none
rect 2 2 121 16 [[Transport Toolbar|Transport Toolbar has buttons for controlling playback and recording and for moving to the project start or end]]
rect 0 42 298 95 [[Transport Toolbar|Transport Toolbar has buttons for controlling playback and recording and for moving to the project start or end]]
rect 181 2 271 16 [[Tools Toolbar|Tools Toolbar lets you choose various tools for selection, volume adjustment, zooming and time-shifting of audio]]
rect 299 42 384 95 [[Tools Toolbar|Tools Toolbar lets you choose various tools for selection, volume adjustment, zooming and time-shifting of audio]]
rect 359 2 523 16 [[Meter Toolbar|Recording Meter Toolbar lets you see if audio being recorded is clipped, which results in distortion]]
rect 385 42 806 68 [[Meter Toolbar|Recording Meter Toolbar lets you see if audio being recorded is clipped, which results in distortion]]
rect 650 2 806 16 [[Meter Toolbar|Playback Meter Toolbar lets you see if audio being edited is clipped, which results in distortion]]
rect 385 69 806 95 [[Meter Toolbar|Playback Meter Toolbar lets you see if audio being edited is clipped, which results in distortion]]
rect 4 178 94 191 [[Mixer Toolbar|Mixer Toolbar lets you adjust Recording Volume (the amplitude at which recordings will be made) and Playback Volume (how loud the project's audio sounds, not affecting the volume of exported audio]]
rect 0 96 294 121 [[Mixer Toolbar|Mixer Toolbar lets you adjust Recording Volume (the amplitude at which recordings will be made) and Playback Volume (how loud the project's audio sounds, not affecting the volume of exported audio]]
rect 155 178 235 191 [[Edit Toolbar|Edit Toolbar has buttons for editing and zooming which are an alternative to using menu items or keyboard shortcuts for these tasks]]
rect 295 96 598 121 [[Edit Toolbar|Edit Toolbar has buttons for editing and zooming which are an alternative to using menu items or keyboard shortcuts for these tasks]]
rect 269 178 368 191 [[Device Toolbar|Device Toolbar selects Audio Host, recording device, recording channels and playback device, avoiding the need to open Devices Preferences to make these settings]]
rect 0 122 565 148 [[Device Toolbar|Device Toolbar selects Audio Host, recording device, recording channels and playback device, avoiding the need to open Devices Preferences to make these settings]]
rect 439 178 580 191 [[Transcription Toolbar|Transcription Toolbar|Transcription Toolbar lets you play audio at a slower or faster speed than normal, also affecting pitch]]
rect 599 96 806 121 [[Transcription Toolbar|Transcription Toolbar|Transcription Toolbar lets you play audio at a slower or faster speed than normal, also affecting pitch]]
</imagemap>
{{ClickTip|y=5}}


&nbsp;
HEREDOC*/

  var pieces;

/*HEREDOC
|#default=
{{ednote|This ednote will automagically be replaced by the Annotated
 image {{{1}}}Annotated.png, when it is ready}}}}</includeonly>
HEREDOC*/

  pieces = Audacity.ToolsImap.toString().split( "HEREDOC" );

  return pieces[1] + ToolMap() + pieces[3];
};



//[  1,  0, "Close", "Ctrl+W" ],

/**
 *
 * @param anchor
 * @returns {string}
 * @constructor
 */
function CleanAnchor( anchor ){
  var str = anchor.replace("...", "");
  str = str.replace("/","_");
  str = str.replace(/ /g,"_");
  str = str.replace(/__/g,"_");
  return str.toLowerCase();
}


/**
 * returns all menus starting at item from, or the empty string.
 * @returns {string}
 * @constructor
 */
function MenuMap(from, prefix, priorRects){
  var i;
  var BoxEnd = null;
  var MenuName = "None";
  var str = "";
  var results = "";
  var innerRects = "";
  var x=0;
  var y=0;
  var indent = -1;
  var SubItems = [];
  var name;
  var subsAllowed = false;
  //console.log( "Map from:"+from+" prefix:"+prefix );
  for(i=from;i< App.Menus.length;i++){
    var Box = App.Menus[i];
    if( Box[0] < indent )
      return results;
    if( i== from ){
      indent = Box[0];
    }
    if( Box[0] == indent ){
      innerRects = "";
      str = "";
      name = Box[2].replace(/ /g, '_');
      MenuName = prefix + name + "Menu#";
      str += "|" + prefix + name + "=:<imagemap>\n";
      str += "Image:" + prefix + name + "Menu.png\r\n";
      str += "desc none\r\n";
      str += priorRects;
      x=50+(indent *200);
      y=27;
      BoxEnd = [0,0,0,0];
      subsAllowed = true;
    }
    else if( Box[0] == (indent+1) ){
      if( Box[2].indexOf("---") >= 0 ){
        y += 7;
      } else {
        var Tip = "tip about " + Box[2];
        if( Box.short )
          Tip = Box.short;
        innerRects += rectString(x, y, x + 200, y + 22, MenuName + CleanAnchor(Box[2]), Tip );
        y += 22;
//      SubItems.push( i );
      }
      BoxEnd[ 2 ] = x+200;
      BoxEnd[ 3 ] = y;
    }

    var nextIndent = -1;
    if( i < App.Menus.length -1 )
      nextIndent = App.Menus[i+1][0];
    if( (nextIndent > Box[0]) && (Box[0] >indent) && subsAllowed ){
      SubItems.push(i);
      subsAllowed = false;
    }

    if( BoxEnd && (nextIndent <= indent)){
      str += innerRects;
      str += "</imagemap>\n";
      str += "{{ClickTip|x=" + (BoxEnd[2] - 50) + "|y=15}}\r\n\r\n\r\n";
      str += "&nbsp;\r\n\r\n";
      if( innerRects )
        results += str;
      BoxEnd = null;
      //console.log( str );
      str = "";

      var j;
      for(j=0;j<SubItems.length;j++){
        results += MenuMap( SubItems[j], prefix + name +"-", priorRects +
          innerRects );
      }
      SubItems = [];

    }
  }
  return results;
}



/**
 * Template 'here doc'
 * @returns {string}
 * @constructor
 */
Audacity.MenuImap = function MenuTemplate(){

/*HEREDOC
</noinclude><includeonly>{{#switch: {{{menu}}}
HEREDOC*/

  var pieces;

/*HEREDOC
|#default=
{{ednote|This ednote will automagically be replaced by the Annotated
menu {{{menu}}}.png, when it is ready}}}}</includeonly>
HEREDOC*/

  pieces = Audacity.MenuImap.toString().split( "HEREDOC" );
  ZipTheTips();

  var mappy = MenuMap(0, "", "");
  //console.log( mappy );

  return pieces[1] + mappy  + pieces[3];
};


/**
 * returns all menus starting at item from, or the empty string.
 * @returns {string}
 * @constructor
 */
function MakeKeyboardReference(from, prefix, type){
  var i;
  var str = "";
  var Name ="";
  var lowName="";
  var Prefix = "";
  var indent = -1;
  var SubItems = [];
  var results = "";
  var subsAllowed = false;
  var TopName = "";
  var bEmpty =true;
  var bIsAutomation = type == "automation";

  //console.log( "Keyboard from:"+from+" prefix:"+prefix );
  for(i=from;i< App.Menus.length;i++){
    var Box = App.Menus[i];
    if( Box[0] < indent )
      return results;
    if( i== from ){
      indent = Box[0];
    }
    Name = Box[2];
    lowName = CleanAnchor( Name );
    var boxIndent = Box[0];
    if( Name.indexOf("---") >=0 )
      ;
    else if( boxIndent == indent ){
      str += "<div id=\""+lowName+"\"></div>\r\n";
      if( Box[0] == 0 )
        str += "==[["+Name+"_Menu|"+Name+" Menu]]==\r\n";
      if( Box[0] == 1 )
        str += "===[["+prefix +"_Menu:_" + Name+"|"+prefix + ": " +Name+"]]===\r\n";
      if( Box.long )
        str += "{{note|" + Box.long + " }}\r\n";
      else
        str += "{{note| No special notes for "+Name+" }}\r\n";
      str += "{| class=\"prettytablerows\" rules = \"rows\" border = \"2\"" +
        " width=\"100%\"\r\n";
      if( bIsAutomation )
          str += "!width=\"15%\"|Automation Id\r\n";
      str += "!width=\"15%\"|Action\r\n";
      if( !bIsAutomation ){
        str += "!width=\"10%\"|Shortcut\r\n";
        str += "!width=\"75%\"|Description\r\n";
      }
      else {
        str += "!width=\"30%\"|Parameters\r\n";
        str += "!width=\"55%\"|Description\r\n";
      }
      Prefix = Name;
      subsAllowed = true;
      bEmpty = true;
      TopName = Name;
    }
    else if( boxIndent == (indent+1) ){
      if( !bIsAutomation || (Box.id != undefined ) ){
        str += "|-\r\n";
        if( bIsAutomation ){
          str += "|'''" + Box.id + ":'''\r\n";
        }
        if( boxIndent == 1 )
          str +=
            "|[[" + TopName + "_Menu#" + lowName + "|" + Name + "]]\r\n"; else
          str +=
            "|[[" + prefix + "_Menu:_" + TopName + "#" + lowName + "|" + Name +
            "]]\r\n";
        if( bIsAutomation ){
          if( Box.params != undefined ){
            str += "|" + Box.params + "\r\n";
          } else {
            str += "|''none''\r\n";
          }

        } else {
          if( Box[3] == "" )
            str += "|{{unassigned}}\r\n";
          else if( App.ExtraShortcuts.indexOf(Box[3]) >= 0 )
            str += "|{{fullshortcut|" + Box[3] + "}}\r\n";
          else
            str += "|{{shortcut|" + Box[3] + "}}\r\n";
        }
        if( Box.long )
          str += "|" + Box.long + "\r\n"; else
          str += "| no tip string.\r\n";
        bEmpty = false;
      }
    }

    var nextIndent = -1;
    if( i < App.Menus.length -1 )
      nextIndent = App.Menus[i+1][0];
    if( (nextIndent > Box[0]) && (Box[0] >indent) && subsAllowed ){
      SubItems.push(i);
      subsAllowed = false;
    }

    if( nextIndent <= indent ){
      if( !bEmpty ){
        str += "|}\r\n";
        str += "{{hoverext|hover=|ext=}}\r\n";
        results += str;
        bEmpty = true;
      }
      str = "";
      if( SubItems.length > 0  ){
        for(j=0;j<SubItems.length ;j++){
          results += MakeKeyboardReference(SubItems[j], TopName, type );
        }
        SubItems=[];
      }
    }

  }
  return results;
}

function SafeQuote( str ){
  return str.replace( /\"/g, "\\\"" );
}

function ZipTheTips( ){
  var i;
  var j;
  var Unused = [];
  var str = "";
  var key;
  for(i=0;i<App.Tips.length;i++){
    var Tip = App.Tips[i];
    key = Tip.key;
    key = key.replace( /Invoke the (.*) effect dialog/, "$1..." );
    if( key != Tip.key ){
      //console.log(" Replaced "+ key);
      Tip.key = key;
    }
    Unused.push( Tip  );
  }

  //console.log( str );
  for( j=0;j<App.Menus.length; j++){
    var Menu = App.Menus[j];
    var Name = Menu[2];
    if( Name.indexOf("---") < 0 ){
      if( Menu[0]==0 )
        str+="\r\n// "+Name +"\r\n";
      for(i=0;i<Unused.length;i++){
        if( Unused[i].key == Name ){
          Tip = Unused[i];
          if( Tip.long.indexOf( '+' ) == 0 )
            Tip.long = Tip.long.replace( '+', Tip.short );
          Menu[ 'short' ] = Tip.short;
          Menu[ 'long' ] = Tip.long;
          if( Tip.id != undefined )
            Menu[ 'id' ] = Tip.id;
          if( Tip.params != undefined )
            Menu[ 'params' ] = Tip.params;
          if( Tip.long.indexOf( Tip.short) == 0 )
            Tip.long = Tip.long.replace( Tip.short, '+' );
          str += "{ key:   \""+SafeQuote(Tip.key) + "\",\r\n";
          str += "  short: \""+SafeQuote(Tip.short)+ "\",\r\n";
          str += "  long:  \""+SafeQuote(Tip.long) + "\"},\r\n";
          Unused.splice(i,1);
          break;
        }
      }
      if( !Menu.short ){
          console.log( "Unmatched: "+ Name );
      }
    }
  }
  //console.log( str );
  console.log("Tip Leftovers: ");
  console.log( Unused );
}

/*

{ id: "ScreenshotCommand", name: "Screenshot", params: [
    { key: "Path", type: "string", default: ""},
    { key: "CaptureWhat", type: "enum", default: "window",
        enum : ["window", "fullwindow", "windowplus", "fullscreen", "toolbars", "menus", "effects", "preferences", "selectionbar", "spectralselection", "tools", "transport", "mixer", "meter", "playmeter", "recordmeter", "edit", "device", "scrub", "transcription", "trackpanel", "ruler", "tracks", "firsttrack", "secondtrack", ]
    },
    { key: "Background", type: "enum", default: "None",
        enum : ["Blue", "White", "None", ]
    },
]},
*/

/**
 *
 * @param params
 * @returns {string}
 * @constructor
 */
function PrintableOfParams( params ){
    var str = "";
    var i;
    var j;
    for( i=0;i<params.length;i++){
        var item = params[i];
        str += "''"+item.type + "'' '''" + item.key + "''', (default:"+item.default + ")<br>\r\n";
        if( item.type == "enum" ){
            for( j=0;j< item.enum.length ;j++){
                var eItem = item.enum[ j ];
                str += "* " + eItem + "\r\n";
            }
        }
    }
    return str;
}

function ZipTheCommands( ){
    var i;
    var j;
    var Unused = [];
    var str = "";
    var key;
    var Com = {};
    for(i=0;i<App.Commands.length;i++){
        Com = App.Commands[i];
        Unused.push( Com  );
    }

    //console.log( str );
    for( j=0;j<App.Menus.length; j++){
        var Menu = App.Menus[j];
        var Name = Menu[2];
        Name = Name.replace("...", "" );
        if( Name.indexOf("---") < 0 ){
            if( Menu[0]==0 )
                str+="\r\n// "+Name +"\r\n";
            for(i=0;i<Unused.length;i++){
                if( Unused[i].name == Name ){
                    Com= Unused[i];
                    if( Com.id != undefined )
                        Menu[ 'id' ] = Com.id;
                    if( Com.params != undefined )
                        Menu[ 'params' ] = PrintableOfParams( Com.params);
                    Unused.splice(i,1);
                    break;
                }
            }
//            if( !Menu.short ){
//                console.log( "Unmatched: "+ Name );
//            }
        }
    }
    //console.log( str );
    console.log("Command Leftovers: ");
    console.log( Unused );
}


/**
 * Template 'here doc'
 * @returns {string}
 * @constructor
 */
Audacity.KeyboardReference = function KeyboardReferenceTemplate(){
  ZipTheTips();
  return MakeKeyboardReference(0,"", "keyboard");
};

/**
 * Template 'here doc'
 * @returns {string}
 * @constructor
 */
Audacity.AutomationReference = function AutomationReferenceTemplate(){
    ZipTheTips();
    ZipTheCommands();
    return MakeKeyboardReference(0,"", "automation");
};



