/**
 * Created by James Crook on 09/09/2018.
 */
/**
 * Wiki template for tools image map 'here doc'
 * @returns {string}
 */

SomeTables = function(){

  /*HEREDOC
   <div id="file_menu"></div>
   <h2><span class="mw-headline" id="File_Menu"><a href="/man/File_Menu" title="File Menu">File Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=1" title="Edit section: File Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">The File Menu provides commands for creating, opening and saving Audacity projects and importing and exporting audio files </div>

   </td></tr></table>   HEREDOC*/

  var pieces;

  /*HEREDOC
   |#default=
   {{ednote|This ednote will automagically be replaced by the Annotated
   image {{{1}}}Annotated.png, when it is ready}}}}</includeonly>
   HEREDOC*/

  pieces = SomeTables.toString().split( "HEREDOC" );

  return pieces;
};


AllTables = function(){

  /*HEREDOC
   <div id="file_menu"></div>
   <h2><span class="mw-headline" id="File_Menu"><a href="/man/File_Menu" title="File Menu">File Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=1" title="Edit section: File Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">The File Menu provides commands for creating, opening and saving Audacity projects and importing and exporting audio files </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>New:</b>
   </td>
   <td><a href="/man/File_Menu#new" title="File Menu">New</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Creates a new empty project window, to start working on new or imported Tracks.
   </td></tr>
   <tr>
   <td><b>Open:</b>
   </td>
   <td><a href="/man/File_Menu#open" title="File Menu">Open...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Presents you with a standard dialog box where you can select either audio files, a list of files (.LOF) or an Audacity Project file to open.
   </td></tr>
   <tr>
   <td><b>Close:</b>
   </td>
   <td><a href="/man/File_Menu#close" title="File Menu">Close</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Closes the current project window, prompting you to save your work if you have not saved.
   </td></tr>
   <tr>
   <td><b>SaveProject:</b>
   </td>
   <td><a href="/man/File_Menu#save_project" title="File Menu">Save Project</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Various ways to save a project.
   </td></tr>
   <tr>
   <td><b>PageSetup:</b>
   </td>
   <td><a href="/man/File_Menu#page_setup" title="File Menu">Page Setup...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Opens the standard Page Setup dialog box prior to printing
   </td></tr>
   <tr>
   <td><b>Print:</b>
   </td>
   <td><a href="/man/File_Menu#print" title="File Menu">Print...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Prints all the waveforms in the current project window (and the contents of Label Tracks or other tracks), with the Timeline above. Everything is printed to one page.
   </td></tr>
   <tr>
   <td><b>Exit:</b>
   </td>
   <td><a href="/man/File_Menu#exit" title="File Menu">Exit</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Closes all project windows and exits Audacity. If there are any unsaved changes to your project, Audacity will ask if you want to save them.
   </td></tr></table>
   <div id="file_save_project_submenu"></div>
   <h3><span class="mw-headline" id="File:_Save_Project"><a href="/man/File_Menu:_Save_Project" title="File Menu: Save Project">File: Save Project</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=2" title="Edit section: File: Save Project">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Various ways to save a project. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Save:</b>
   </td>
   <td><a href="/man/File_Menu:_Save_Project#save_project" title="File Menu: Save Project">Save Project</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Saves the current Audacity project .AUP file.
   </td></tr>
   <tr>
   <td><b>SaveAs:</b>
   </td>
   <td><a href="/man/File_Menu:_Save_Project#save_project_as" title="File Menu: Save Project">Save Project As...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as "Save Project" above, but allows you to save a copy of an open project to a different name or location
   </td></tr>
   <tr>
   <td><b>SaveCopy:</b>
   </td>
   <td><a href="/man/File_Menu:_Save_Project#save_lossless_copy_of_project" title="File Menu: Save Project">Save Lossless Copy of Project...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Saves the current Audacity project .AUP file.
   </td></tr>
   <tr>
   <td><b>SaveCompressed:</b>
   </td>
   <td><a href="/man/File_Menu:_Save_Project#save_compressed_copy_of_project" title="File Menu: Save Project">Save Compressed Copy of Project...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Saves in the audacity .aup project file format, but compressed (Suitable for mailing)
   </td></tr></table>
   <div id="file_export_submenu"></div>
   <h3><span class="mw-headline" id="File:_Export"><a href="/man/File_Menu:_Export" title="File Menu: Export">File: Export</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=3" title="Edit section: File: Export">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">For exporting audio files </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ExportMp3:</b>
   </td>
   <td><a href="/man/File_Menu:_Export#export_as_mp3" title="File Menu: Export">Export as MP3</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Exports to an MP3 file
   </td></tr>
   <tr>
   <td><b>ExportWav:</b>
   </td>
   <td><a href="/man/File_Menu:_Export#export_as_wav" title="File Menu: Export">Export as WAV</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Exports to a WAV file
   </td></tr>
   <tr>
   <td><b>ExportOgg:</b>
   </td>
   <td><a href="/man/File_Menu:_Export#export_as_ogg" title="File Menu: Export">Export as OGG</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Exports to an OGG file
   </td></tr>
   <tr>
   <td><b>Export:</b>
   </td>
   <td><a href="/man/File_Menu:_Export#export_audio" title="File Menu: Export">Export Audio...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Exports to an audio file.
   </td></tr>
   <tr>
   <td><b>ExportSel:</b>
   </td>
   <td><a href="/man/File_Menu:_Export#export_selected_audio" title="File Menu: Export">Export Selected Audio...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Exports selected audio to a file.
   </td></tr>
   <tr>
   <td><b>ExportLabels:</b>
   </td>
   <td><a href="/man/File_Menu:_Export#export_labels" title="File Menu: Export">Export Labels...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Exports audio at one or more labels to file(s).
   </td></tr>
   <tr>
   <td><b>ExportMultiple:</b>
   </td>
   <td><a href="/man/File_Menu:_Export#export_multiple" title="File Menu: Export">Export Multiple...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Exports multiple audio files in one process, one file for each track if there are multiple audio tracks, or <a href="/man/Label_Tracks" title="Label Tracks">labels</a> can be added which then define the length of each exported file.
   </td></tr>
   <tr>
   <td><b>ExportMIDI:</b>
   </td>
   <td><a href="/man/File_Menu:_Export#export_midi" title="File Menu: Export">Export MIDI...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Exports MIDI (note tracks) to a MIDI file.
   </td></tr></table>
   <div id="file_import_submenu"></div>
   <h3><span class="mw-headline" id="File:_Import"><a href="/man/File_Menu:_Import" title="File Menu: Import">File: Import</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=4" title="Edit section: File: Import">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">For importing audio files or label files into your project </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ImportAudio:</b>
   </td>
   <td><a href="/man/File_Menu:_Import#audio" title="File Menu: Import">Audio...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Similar to 'Open', except that the file is added as a new track to your existing project.
   </td></tr>
   <tr>
   <td><b>ImportLabels:</b>
   </td>
   <td><a href="/man/File_Menu:_Import#labels" title="File Menu: Import">Labels...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Launches a file selection window where you can choose to <i>import</i> a single text file into the project containing point or region <a href="/man/Label_Tracks" title="Label Tracks">labels</a>. For more information about the syntax for labels files, see <a href="/man/Label_Tracks#export" title="Label Tracks">Importing and Exporting Labels</a>.
   </td></tr>
   <tr>
   <td><b>ImportMIDI:</b>
   </td>
   <td><a href="/man/File_Menu:_Import#midi" title="File Menu: Import">MIDI...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Imports a <i><b><a href="/man/Glossary#midi" title="Glossary">MIDI</a></b></i> (MIDI or MID <i><b><a href="/man/Glossary#extension" title="Glossary">extension</a></b></i>) or Allegro (GRO) file to a <a href="/man/Note_Tracks" title="Note Tracks">Note Track</a> where simple cut-and-paste edits can be performed. The result can be exported with the <span class="menu">File &gt; Save Other&gt; &gt; <a href="/man/File_Menu:_Export#export_midi" title="File Menu: Export">Export MIDI</a></span> command. <b>Note:</b> Currently, MIDI and Allegro files cannot be played.
   </td></tr>
   <tr>
   <td><b>ImportRaw:</b>
   </td>
   <td><a href="/man/File_Menu:_Import#raw_data" title="File Menu: Import">Raw Data...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Attempts to import an uncompressed audio file that might be "raw" data without any headers to define its format, might have incorrect headers or be otherwise partially corrupted, or might be in a format that Audacity is unable to recognize. Raw data in textual format cannot be imported.
   </td></tr></table>
   <div id="edit_menu"></div>
   <h2><span class="mw-headline" id="Edit_Menu"><a href="/man/Edit_Menu" title="Edit Menu">Edit Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=5" title="Edit section: Edit Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">The Edit Menu provides standard edit commands (Undo, Redo, Cut, Copy, Paste and Delete) plus many other commands specific to editing audio or labels </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Undo:</b>
   </td>
   <td><a href="/man/Edit_Menu#undo" title="Edit Menu">Undo</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Undoes the most recent editing action.
   </td></tr>
   <tr>
   <td><b>Redo:</b>
   </td>
   <td><a href="/man/Edit_Menu#redo" title="Edit Menu">Redo</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Redoes the most recently undone editing action.
   </td></tr>
   <tr>
   <td><b>Cut:</b>
   </td>
   <td><a href="/man/Edit_Menu#cut" title="Edit Menu">Cut</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Removes the selected audio data and/or labels and places these on the Audacity clipboard. By default, any audio or labels to right of the selection are shifted to the left.
   </td></tr>
   <tr>
   <td><b>Delete:</b>
   </td>
   <td><a href="/man/Edit_Menu#delete" title="Edit Menu">Delete</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Removes the selected audio data and/or labels without copying these to the Audacity clipboard. By default, any audio or labels to right of the selection are shifted to the left.
   </td></tr>
   <tr>
   <td><b>Copy:</b>
   </td>
   <td><a href="/man/Edit_Menu#copy" title="Edit Menu">Copy</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Copies the selected audio data to the Audacity clipboard without removing it from the project.
   </td></tr>
   <tr>
   <td><b>Paste:</b>
   </td>
   <td><a href="/man/Edit_Menu#paste" title="Edit Menu">Paste</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Inserts whatever is on the Audacity clipboard at the position of the selection cursor in the project, replacing whatever audio data is currently selected, if any.
   </td></tr>
   <tr>
   <td><b>Duplicate:</b>
   </td>
   <td><a href="/man/Edit_Menu#duplicate" title="Edit Menu">Duplicate</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Creates a new track containing only the current selection as a new clip.
   </td></tr>
   <tr>
   <td><b>EditMetaData:</b>
   </td>
   <td><a href="/man/Edit_Menu#metadata" title="Edit Menu">Metadata...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>The Metadata Editor modifies information about a track, such as the artist and genre.  Typically used with MP3 files.
   </td></tr>
   <tr>
   <td><b>Preferences:</b>
   </td>
   <td><a href="/man/Edit_Menu#preferences" title="Edit Menu">Preferences...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Preferences let you change most of the default behaviors and settings of Audacity. On Mac, Preferences are in the <a href="/man/Audacity_Menu" title="Audacity Menu">Audacity Menu</a> and the default shortcut is <span class="kbrd" style="background-color: #d0d0f8">&#8984;  + ,</span>.
   </td></tr></table>
   <div id="edit_remove_special_submenu"></div>
   <h3><span class="mw-headline" id="Edit:_Remove_Special"><a href="/man/Edit_Menu:_Remove_Special" title="Edit Menu: Remove Special">Edit: Remove Special</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=6" title="Edit section: Edit: Remove Special">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">For more "advanced" removal of audio </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SplitCut:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Remove_Special#split_cut" title="Edit Menu: Remove Special">Split Cut</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as Cut, but none of the audio data or labels to right of the selection are shifted.
   </td></tr>
   <tr>
   <td><b>SplitDelete:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Remove_Special#split_delete" title="Edit Menu: Remove Special">Split Delete</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as Delete, but none of the audio data or labels to right of the selection are shifted.
   </td></tr>
   <tr>
   <td><b>Silence:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Remove_Special#silence_audio" title="Edit Menu: Remove Special">Silence Audio</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Replaces the currently selected audio with absolute silence. Does not affect label tracks.
   </td></tr>
   <tr>
   <td><b>Trim:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Remove_Special#trim_audio" title="Edit Menu: Remove Special">Trim Audio</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Deletes all audio but the selection.  If there are other separate <a href="/man/Audacity_Tracks_and_Clips" title="Audacity Tracks and Clips">clips</a> in the same track these are not removed or shifted unless trimming the entire length of a clip or clips. Does not affect label tracks.
   </td></tr></table>
   <div id="edit_clip_boundaries_submenu"></div>
   <h3><span class="mw-headline" id="Edit:_Clip_Boundaries"><a href="/man/Edit_Menu:_Clip_Boundaries" title="Edit Menu: Clip Boundaries">Edit: Clip Boundaries</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=7" title="Edit section: Edit: Clip Boundaries">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Create or remove separate clips in the audio track. A clip inside an audio track is a separate section of that track which has been split so that it can be manipulated somewhat independently of the other clips in the track. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Split:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Clip_Boundaries#split" title="Edit Menu: Clip Boundaries">Split</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Splits the current clip into two clips at the cursor point, or into three clips at the selection boundaries.
   </td></tr>
   <tr>
   <td><b>SplitNew:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Clip_Boundaries#split_new" title="Edit Menu: Clip Boundaries">Split New</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Does a Split Cut on the current selection in the current track, then creates a new track and pastes the selection into the new track.
   </td></tr>
   <tr>
   <td><b>Join:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Clip_Boundaries#join" title="Edit Menu: Clip Boundaries">Join</a>
   </td>
   <td><i>none</i>
   </td>
   <td>If you select an area that overlaps one or more clips, they are all joined into one large clip. Regions in-between clips become silence.
   </td></tr>
   <tr>
   <td><b>Disjoin:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Clip_Boundaries#detach_at_silences" title="Edit Menu: Clip Boundaries">Detach at Silences</a>
   </td>
   <td><i>none</i>
   </td>
   <td>In a selection region that includes absolute silences, creates individual non-silent clips between the regions of silence. The silence becomes blank space between the clips.
   </td></tr></table>
   <div id="edit_labels_submenu"></div>
   <h3><span class="mw-headline" id="Edit:_Labels"><a href="/man/Edit_Menu:_Labels" title="Edit Menu: Labels">Edit: Labels</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=8" title="Edit section: Edit: Labels">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">These commands are to add and edit labels. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>EditLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labels#edit_labels" title="Edit Menu: Labels">Edit Labels...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Brings up a dialog box showing all of your labels in a keyboard-accessible tabular view. Handy buttons in the dialog let you insert or delete a label, or import and export labels to a file. See <a href="/man/Labels_Editor" title="Labels Editor">Labels Editor</a> for more details.
   </td></tr>
   <tr>
   <td><b>AddLabel:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labels#add_label_at_selection" title="Edit Menu: Labels">Add Label at Selection</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Creates a new, empty label at the cursor or at the selection region.
   </td></tr>
   <tr>
   <td><b>AddLabelPlaying:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labels#add_label_at_playback_position" title="Edit Menu: Labels">Add Label at Playback Position</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Creates a new, empty label at the current playback or recording position.
   </td></tr>
   <tr>
   <td><b>PasteNewLabel:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labels#paste_text_to_new_label" title="Edit Menu: Labels">Paste Text to New Label</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Pastes the text on the Audacity clipboard at the cursor position in the currently selected label track. If there is no selection in the label track a point label is created. If a range is selected in the label track a range label is created. If no label track is selected one is created, and a new label is created.
   </td></tr>
   <tr>
   <td><b>TypeToCreateLabel:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labels#type_to_create_a_label_onoff" title="Edit Menu: Labels">Type to Create a Label (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When a label track has the yellow focus border, if this option is on, just type to create a label.  Otherwise you must create a label first.
   </td></tr></table>
   <div id="edit_labeled_audio_submenu"></div>
   <h3><span class="mw-headline" id="Edit:_Labeled_Audio"><a href="/man/Edit_Menu:_Labeled_Audio" title="Edit Menu: Labeled Audio">Edit: Labeled Audio</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=9" title="Edit section: Edit: Labeled Audio">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Labeled Audio commands apply standard Edit Menu commands to the audio of one or more regions that are labeled.  The labels themselves are not affected. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>CutLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labeled_Audio#cut" title="Edit Menu: Labeled Audio">Cut</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as the Cut command, but operates on labeled audio regions.
   </td></tr>
   <tr>
   <td><b>DeleteLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labeled_Audio#delete" title="Edit Menu: Labeled Audio">Delete</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as the Delete command, but operates on labeled audio regions.
   </td></tr>
   <tr>
   <td><b>SplitCutLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labeled_Audio#split_cut" title="Edit Menu: Labeled Audio">Split Cut</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as the Split Cut command, but operates on labeled audio regions.
   </td></tr>
   <tr>
   <td><b>SplitDeleteLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labeled_Audio#split_delete" title="Edit Menu: Labeled Audio">Split Delete</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as the Split Delete command, but operates on labeled audio regions.
   </td></tr>
   <tr>
   <td><b>SilenceLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labeled_Audio#silence_audio" title="Edit Menu: Labeled Audio">Silence Audio</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as the Silence Audio command, but operates on labeled audio regions.
   </td></tr>
   <tr>
   <td><b>CopyLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labeled_Audio#copy" title="Edit Menu: Labeled Audio">Copy</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as the Copy command, but operates on labeled audio regions.
   </td></tr>
   <tr>
   <td><b>SplitLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labeled_Audio#split" title="Edit Menu: Labeled Audio">Split</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as the Split command, but operates on labeled audio regions or points.
   </td></tr>
   <tr>
   <td><b>JoinLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labeled_Audio#join" title="Edit Menu: Labeled Audio">Join</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as the Join command, but operates on labeled audio regions or points. You may need to select the audio and use <span class="menu">Edit &gt; Clip Boundaries &gt; <a href="/man/Edit_Menu:_Clip_Boundaries#join" title="Edit Menu: Clip Boundaries">Join</a></span>, to join all regions or points.
   </td></tr>
   <tr>
   <td><b>DisjoinLabels:</b>
   </td>
   <td><a href="/man/Edit_Menu:_Labeled_Audio#detach_at_silences" title="Edit Menu: Labeled Audio">Detach at Silences</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as the Detach at Silences command, but operates on labeled audio regions.
   </td></tr></table>
   <div id="select_menu"></div>
   <h2><span class="mw-headline" id="Select_Menu"><a href="/man/Select_Menu" title="Select Menu">Select Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=10" title="Edit section: Select Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">Select Menu has commands that enable you make selections of tracks or parts of the tracks in your project. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SelectAll:</b>
   </td>
   <td><a href="/man/Select_Menu#all" title="Select Menu">All</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selects all of the audio in all of the tracks.
   </td></tr>
   <tr>
   <td><b>SelectNone:</b>
   </td>
   <td><a href="/man/Select_Menu#none" title="Select Menu">None</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Deselects all of the audio in all of the tracks.
   </td></tr>
   <tr>
   <td><b>SelCursorStoredCursor:</b>
   </td>
   <td><a href="/man/Select_Menu#cursor_to_stored_cursor_position" title="Select Menu">Cursor to Stored Cursor Position</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selects from the position of the cursor to the previously stored cursor position
   </td></tr>
   <tr>
   <td><b>StoreCursorPosition:</b>
   </td>
   <td><a href="/man/Select_Menu#store_cursor_position" title="Select Menu">Store Cursor Position</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Stores the current cursor position for use in a later selection
   </td></tr>
   <tr>
   <td><b>ZeroCross:</b>
   </td>
   <td><a href="/man/Select_Menu#at_zero_crossings" title="Select Menu">At Zero Crossings</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the edges of a selection region (or the cursor position) slightly so they are at a rising zero crossing point.
   </td></tr></table>
   <div id="select_tracks_submenu"></div>
   <h3><span class="mw-headline" id="Select:_Tracks"><a href="/man/Select_Menu:_Tracks" title="Select Menu: Tracks">Select: Tracks</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=11" title="Edit section: Select: Tracks">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Tracks </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SelAllTracks:</b>
   </td>
   <td><a href="/man/Select_Menu:_Tracks#in_all_tracks" title="Select Menu: Tracks">In All Tracks</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Extends the current selection up and/or down into all tracks in the project.
   </td></tr>
   <tr>
   <td><b>SelSyncLockTracks:</b>
   </td>
   <td><a href="/man/Select_Menu:_Tracks#in_all_synclocked_tracks" title="Select Menu: Tracks">In All Sync-Locked Tracks</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Extends the current selection up and/or down into all sync-locked tracks in the currently selected track group.
   </td></tr></table>
   <div id="select_region_submenu"></div>
   <h3><span class="mw-headline" id="Select:_Region"><a href="/man/Select_Menu:_Region" title="Select Menu: Region">Select: Region</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=12" title="Edit section: Select: Region">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">For modifying, saving and restoring a selection. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SetLeftSelection:</b>
   </td>
   <td><a href="/man/Select_Menu:_Region#left_at_playback_position" title="Select Menu: Region">Left at Playback Position</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When Audacity is playing, recording or paused, sets the left boundary of a potential selection by moving the cursor to the current position of the green playback cursor (or red recording cursor).<p> Otherwise, opens the "Set Left Selection Boundary" dialog for adjusting the time position of the left-hand selection boundary. If there is no selection, moving the time digits backwards creates a selection ending at the former cursor position, and moving the time digits forwards provides a way to move the cursor forwards to an exact point. </p>
   </td></tr>
   <tr>
   <td><b>SetRightSelection:</b>
   </td>
   <td><a href="/man/Select_Menu:_Region#right_at_playback_position" title="Select Menu: Region">Right at Playback Position</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When Audacity is playing, recording or paused, sets the right boundary of the selection, thus drawing the selection from the cursor position to the current position of the green playback cursor (or red recording cursor). <p> Otherwise, opens the "Set Right Selection Boundary" dialog for adjusting the time position of the right-hand selection boundary. If there is no selection, moving the time digits forwards creates a selection starting at the former cursor position, and moving the time digits backwards provides a way to move the cursor backwards to an exact point. </p>
   </td></tr>
   <tr>
   <td><b>SelTrackStartToCursor:</b>
   </td>
   <td><a href="/man/Select_Menu:_Region#track_start_to_cursor" title="Select Menu: Region">Track Start to Cursor</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selects a region in the selected track(s) from the start of the track to the cursor position.
   </td></tr>
   <tr>
   <td><b>SelCursorToTrackEnd:</b>
   </td>
   <td><a href="/man/Select_Menu:_Region#cursor_to_track_end" title="Select Menu: Region">Cursor to Track End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selects a region in the selected track(s) from the cursor position to the end of the track.
   </td></tr>
   <tr>
   <td><b>SelTrackStartToEnd:</b>
   </td>
   <td><a href="/man/Select_Menu:_Region#track_start_to_end" title="Select Menu: Region">Track Start to End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selects a region in the selected track(s) from the start of the track to the end of the track.
   </td></tr>
   <tr>
   <td><b>SelSave:</b>
   </td>
   <td><a href="/man/Select_Menu:_Region#store_selection" title="Select Menu: Region">Store Selection</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Stores the end points of a selection for later reuse.
   </td></tr>
   <tr>
   <td><b>SelRestore:</b>
   </td>
   <td><a href="/man/Select_Menu:_Region#retrieve_selection" title="Select Menu: Region">Retrieve Selection</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Retrieves the end points of a previously stored selection.
   </td></tr></table>
   <div id="select_spectral_submenu"></div>
   <h3><span class="mw-headline" id="Select:_Spectral"><a href="/man/Select_Menu:_Spectral" title="Select Menu: Spectral">Select: Spectral</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=13" title="Edit section: Select: Spectral">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">For making a selection of a frequency range. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ToggleSpectralSelection:</b>
   </td>
   <td><a href="/man/Select_Menu:_Spectral#toggle_spectral_selection" title="Select Menu: Spectral">Toggle Spectral Selection</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Changes between selecting a time range and selecting the last selected <a href="/man/Spectral_Selection" title="Spectral Selection">spectral selection</a> in that time range. This command toggles the spectral selection even if not in Spectrogram view, but you must be in Spectrogram view to use the spectral selection in one of the <a href="/man/Effect_Menu#spectral_multi" title="Effect Menu">Spectral edit</a> effects.
   </td></tr>
   <tr>
   <td><b>NextHigherPeakFrequency:</b>
   </td>
   <td><a href="/man/Select_Menu:_Spectral#next_higher_peak_frequency" title="Select Menu: Spectral">Next Higher Peak Frequency</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When in Spectrogram view, snaps the center frequency to the next higher frequency peak, moving the spectral selection upwards.
   </td></tr>
   <tr>
   <td><b>NextLowerPeakFrequency:</b>
   </td>
   <td><a href="/man/Select_Menu:_Spectral#next_lower_peak_frequency" title="Select Menu: Spectral">Next Lower Peak Frequency</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When in Spectrogram views snaps the center frequency to the next lower frequency peak, moving the spectral selection downwards.
   </td></tr></table>
   <div id="select_clip_boundaries_submenu"></div>
   <h3><span class="mw-headline" id="Select:_Clip_Boundaries"><a href="/man/Select_Menu:_Clip_Boundaries" title="Select Menu: Clip Boundaries">Select: Clip Boundaries</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=14" title="Edit section: Select: Clip Boundaries">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">For modifying a selection, taking account of clips. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SelPrevClipBoundaryToCursor:</b>
   </td>
   <td><a href="/man/Select_Menu:_Clip_Boundaries#previous_clip_boundary_to_cursor" title="Select Menu: Clip Boundaries">Previous Clip Boundary to Cursor</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selects from the current cursor position back to the right-hand edge of the previous clip.
   </td></tr>
   <tr>
   <td><b>SelCursorToNextClipBoundary:</b>
   </td>
   <td><a href="/man/Select_Menu:_Clip_Boundaries#cursor_to_next_clip_boundary" title="Select Menu: Clip Boundaries">Cursor to Next Clip Boundary</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selects from the current cursor position forward to the left-hand edge of the next clip.
   </td></tr>
   <tr>
   <td><b>SelPrevClip:</b>
   </td>
   <td><a href="/man/Select_Menu:_Clip_Boundaries#previous_clip" title="Select Menu: Clip Boundaries">Previous Clip</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the selection to the previous clip.
   </td></tr>
   <tr>
   <td><b>SelNextClip:</b>
   </td>
   <td><a href="/man/Select_Menu:_Clip_Boundaries#next_clip" title="Select Menu: Clip Boundaries">Next Clip</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the selection to the next clip.
   </td></tr></table>
   <div id="view_menu"></div>
   <h2><span class="mw-headline" id="View_Menu"><a href="/man/View_Menu" title="View Menu">View Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=15" title="Edit section: View Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">View Menu has commands that determine the amount of detail you see in all the tracks in the project window. It also lets you show or hide Toolbars and some additional windows such as Undo History. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>UndoHistory:</b>
   </td>
   <td><a href="/man/View_Menu#history" title="View Menu">History...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Brings up the History window which can then be left open while using Audacity normally. History lists all undoable actions performed in the current project, including importing.
   </td></tr>
   <tr>
   <td><b>Karaoke:</b>
   </td>
   <td><a href="/man/View_Menu#karaoke" title="View Menu">Karaoke...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Brings up the Karaoke window, which displays the labels in a "bouncing ball" scrolling display
   </td></tr>
   <tr>
   <td><b>MixerBoard:</b>
   </td>
   <td><a href="/man/View_Menu#mixer_board" title="View Menu">Mixer Board...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Mixer Board is an alternative view to the audio tracks in the main tracks window. Analogous to a hardware mixer board, each audio track is displayed in a Track Strip.
   </td></tr>
   <tr>
   <td><b>ShowExtraMenus:</b>
   </td>
   <td><a href="/man/View_Menu#extra_menus_onoff" title="View Menu">Extra Menus (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Shows extra menus with many extra less-used commands.
   </td></tr>
   <tr>
   <td><b>ShowClipping:</b>
   </td>
   <td><a href="/man/View_Menu#show_clipping_onoff" title="View Menu">Show Clipping (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Option to show or not show audio that is too loud (in red) on the wave form.
   </td></tr></table>
   <div id="view_zoom_submenu"></div>
   <h3><span class="mw-headline" id="View:_Zoom"><a href="/man/View_Menu:_Zoom" title="View Menu: Zoom">View: Zoom</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=16" title="Edit section: View: Zoom">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Zoom in/out on the horizontal axis.  Show more detail or show a longer length of time. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ZoomIn:</b>
   </td>
   <td><a href="/man/View_Menu:_Zoom#zoom_in" title="View Menu: Zoom">Zoom In</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Zooms in on the horizontal axis of the audio displaying more detail over a shorter length of time.
   </td></tr>
   <tr>
   <td><b>ZoomNormal:</b>
   </td>
   <td><a href="/man/View_Menu:_Zoom#zoom_normal" title="View Menu: Zoom">Zoom Normal</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Zooms to the default view which displays about one inch per second.
   </td></tr>
   <tr>
   <td><b>ZoomOut:</b>
   </td>
   <td><a href="/man/View_Menu:_Zoom#zoom_out" title="View Menu: Zoom">Zoom Out</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Zooms out displaying less detail over a greater length of time.
   </td></tr>
   <tr>
   <td><b>ZoomSel:</b>
   </td>
   <td><a href="/man/View_Menu:_Zoom#zoom_to_selection" title="View Menu: Zoom">Zoom to Selection</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Zooms in or out so that the selected audio fills the width of the window.
   </td></tr>
   <tr>
   <td><b>ZoomToggle:</b>
   </td>
   <td><a href="/man/View_Menu:_Zoom#zoom_toggle" title="View Menu: Zoom">Zoom Toggle</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Changes the zoom back and forth between two preset levels.
   </td></tr></table>
   <div id="view_track_size_submenu"></div>
   <h3><span class="mw-headline" id="View:_Track_Size"><a href="/man/View_Menu:_Track_Size" title="View Menu: Track Size">View: Track Size</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=17" title="Edit section: View: Track Size">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Controls the sizes of tracks. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>FitInWindow:</b>
   </td>
   <td><a href="/man/View_Menu:_Track_Size#fit_to_width" title="View Menu: Track Size">Fit to Width</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Zooms out until the entire project just fits in the window.
   </td></tr>
   <tr>
   <td><b>FitV:</b>
   </td>
   <td><a href="/man/View_Menu:_Track_Size#fit_to_height" title="View Menu: Track Size">Fit to Height</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Adjusts the height of all the tracks until they fit in the project window.
   </td></tr>
   <tr>
   <td><b>CollapseAllTracks:</b>
   </td>
   <td><a href="/man/View_Menu:_Track_Size#collapse_all_tracks" title="View Menu: Track Size">Collapse All Tracks</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Collapses all tracks to take up the minimum amount of space.
   </td></tr>
   <tr>
   <td><b>ExpandAllTracks:</b>
   </td>
   <td><a href="/man/View_Menu:_Track_Size#expand_collapsed_tracks" title="View Menu: Track Size">Expand Collapsed Tracks</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Expands all collapsed tracks to their original size before the last collapse.
   </td></tr></table>
   <div id="view_skip_to_submenu"></div>
   <h3><span class="mw-headline" id="View:_Skip_to"><a href="/man/View_Menu:_Skip_to" title="View Menu: Skip to">View: Skip to</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=18" title="Edit section: View: Skip to">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Move forward/backwards through the audio </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SkipSelStart:</b>
   </td>
   <td><a href="/man/View_Menu:_Skip_to#selection_start" title="View Menu: Skip to">Selection Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When there is a selection, moves the cursor to the start of the selection and removes the selection.
   </td></tr>
   <tr>
   <td><b>SkipSelEnd:</b>
   </td>
   <td><a href="/man/View_Menu:_Skip_to#selection_end" title="View Menu: Skip to">Selection End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When there is a selection, moves the cursor to the end of the selection and removes the selection.
   </td></tr></table>
   <div id="view_toolbars_submenu"></div>
   <h3><span class="mw-headline" id="View:_Toolbars"><a href="/man/View_Menu:_Toolbars" title="View Menu: Toolbars">View: Toolbars</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=19" title="Edit section: View: Toolbars">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Toolbars can be used to determine which of the Audacity toolbars are displayed.  By default all toolbars are shown except Spectral Selection and Scrub </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ResetToolbars:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#reset_toolbars" title="View Menu: Toolbars">Reset Toolbars</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Using this command positions all toolbars in default location and size as they were when Audacity was first installed
   </td></tr>
   <tr>
   <td><b>ShowTransportTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#transport_toolbar" title="View Menu: Toolbars">Transport Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Controls playback and recording and skips to start or end of project when neither playing or recording
   </td></tr>
   <tr>
   <td><b>ShowToolsTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#tools_toolbar" title="View Menu: Toolbars">Tools Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Chooses various tools for selection, volume adjustment, zooming and time-shifting of audio
   </td></tr>
   <tr>
   <td><b>ShowRecordMeterTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#recording_meter_toolbar" title="View Menu: Toolbars">Recording Meter Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays recording levels and toggles input monitoring when not recording
   </td></tr>
   <tr>
   <td><b>ShowPlayMeterTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#playback_meter_toolbar" title="View Menu: Toolbars">Playback Meter Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays playback levels
   </td></tr>
   <tr>
   <td><b>ShowMixerTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#mixer_toolbar" title="View Menu: Toolbars">Mixer Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Adjusts the recording and playback volumes of the devices currently selected in Device Toolbar
   </td></tr>
   <tr>
   <td><b>ShowEditTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#edit_toolbar" title="View Menu: Toolbars">Edit Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Cut, copy, paste, trim audio, silence audio, undo, redo, zoom tools
   </td></tr>
   <tr>
   <td><b>ShowPlay-at-SpeedTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#playatspeed_toolbar" title="View Menu: Toolbars">Play-at-Speed Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays audio at a slower or faster speed than normal, affecting pitch
   </td></tr>
   <tr>
   <td><b>ShowScrubbingTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#scrub_toolbar" title="View Menu: Toolbars">Scrub Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Controls playback and recording and skips to start or end of project when neither playing or recording
   </td></tr>
   <tr>
   <td><b>ShowDeviceTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#device_toolbar" title="View Menu: Toolbars">Device Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selects audio host, recording device, number of recording channels and playback device
   </td></tr>
   <tr>
   <td><b>ShowSelectionTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#selection_toolbar" title="View Menu: Toolbars">Selection Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Controls the sample rate of the project, snapping to the selection format and adjusts cursor and region position by keyboard input
   </td></tr>
   <tr>
   <td><b>ShowSpectralSelectionTB:</b>
   </td>
   <td><a href="/man/View_Menu:_Toolbars#spectral_selection_toolbar" title="View Menu: Toolbars">Spectral Selection Toolbar</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays and lets you adjust the current spectral (frequency) selection without having to be in Spectrogram view
   </td></tr></table>
   <div id="transport_menu"></div>
   <h2><span class="mw-headline" id="Transport_Menu"><a href="/man/Transport_Menu" title="Transport Menu">Transport Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=20" title="Edit section: Transport Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">Transport Menu commands let you play or stop, loop play, scrub play or record (including timed and sound activated recordings). </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>RescanDevices:</b>
   </td>
   <td><a href="/man/Transport_Menu#rescan_audio_devices" title="Transport Menu">Rescan Audio Devices</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Rescan for audio devices connected to your computer, and update the playback and recording dropdown menus in Device Toolbar
   </td></tr></table>
   <div id="transport_playing_submenu"></div>
   <h3><span class="mw-headline" id="Transport:_Playing"><a href="/man/Transport_Menu:_Playing" title="Transport Menu: Playing">Transport: Playing</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=21" title="Edit section: Transport: Playing">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">These commands control playback in Audacity. You can Start, Stop or Pause playback of the audio in your project. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>PlayStop:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Playing#playstop" title="Transport Menu: Playing">Play/Stop</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Starts and stops playback or stops a recording (stopping does not change the restart position). Therefore using any play or record command after stopping with "Play/Stop" will start playback or recording from the same <a href="/man/Timeline" title="Timeline">Timeline</a> position it last started from. You can also assign separate shortcuts for <a href="#play">Play</a> and <a href="#stop">Stop</a>.
   </td></tr>
   <tr>
   <td><b>PlayStopSelect:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Playing#playstop_and_set_cursor" title="Transport Menu: Playing">Play/Stop and Set Cursor</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Starts playback like "Play/Stop", but stopping playback sets the restart position to the stop point. When stopped, this command is the same as "Play/Stop". When playing, this command stops playback and moves the cursor (or the start of the selection) to the position where playback stopped.
   </td></tr>
   <tr>
   <td><b>PlayLooped:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Playing#loop_play" title="Transport Menu: Playing">Loop Play</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays the selection over and over again.
   </td></tr>
   <tr>
   <td><b>Pause:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Playing#pause" title="Transport Menu: Playing">Pause</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Temporarily pauses playing or recording without losing your place.
   </td></tr></table>
   <div id="transport_recording_submenu"></div>
   <h3><span class="mw-headline" id="Transport:_Recording"><a href="/man/Transport_Menu:_Recording" title="Transport Menu: Recording">Transport: Recording</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=22" title="Edit section: Transport: Recording">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">These commands control recording in Audacity. You can Start, Stop or Pause recording in your project. You can either start a recording on your existing track or an a new track. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Record1stChoice:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Recording#record" title="Transport Menu: Recording">Record</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Starts recording at the end of the currently <a href="/man/Audacity_Selection" title="Audacity Selection">selected</a> track(s).
   </td></tr>
   <tr>
   <td><b>Record2ndChoice:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Recording#record_new_track" title="Transport Menu: Recording">Record New Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Recording begins on a new track at either the current cursor location or at the beginning of the current selection.
   </td></tr>
   <tr>
   <td><b>TimerRecord:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Recording#timer_record" title="Transport Menu: Recording">Timer Record...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Brings up the Timer Record dialog.
   </td></tr>
   <tr>
   <td><b>PunchAndRoll:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Recording#punch_and_roll_record" title="Transport Menu: Recording">Punch and Roll Record</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Re-record over audio, with a pre-roll of audio that comes before.
   </td></tr>
   <tr>
   <td><b>Pause:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Recording#pause" title="Transport Menu: Recording">Pause</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Temporarily pauses playing or recording without losing your place.
   </td></tr></table>
   <div id="transport_scrubbing_submenu"></div>
   <h3><span class="mw-headline" id="Transport:_Scrubbing"><a href="/man/Transport_Menu:_Scrubbing" title="Transport Menu: Scrubbing">Transport: Scrubbing</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=23" title="Edit section: Transport: Scrubbing">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Scrubbing is the action of moving the mouse pointer right or left so as to adjust the position, speed or direction of playback, listening to the audio at the same time - a convenient way to quickly navigate the waveform to find a particular event of interest. Speed changes are made by rotating the mouse wheel while scrubbing. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Scrub:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Scrubbing#scrub" title="Transport Menu: Scrubbing">Scrub</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Scrubbing is the action of moving the mouse pointer right or left so as to adjust the position, speed or direction of playback, listening to the audio at the same time.
   </td></tr>
   <tr>
   <td><b>Seek:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Scrubbing#seek" title="Transport Menu: Scrubbing">Seek</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Seeking is similar to Scrubbing except that it is playback with skips, similar to using the seek button on a CD player.
   </td></tr>
   <tr>
   <td><b>ToggleScrubRuler:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Scrubbing#scrub_ruler" title="Transport Menu: Scrubbing">Scrub Ruler</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Shows (or hides) the scrub ruler, which is just below the timeline.
   </td></tr></table>
   <div id="transport_cursor_to_submenu"></div>
   <h3><span class="mw-headline" id="Transport:_Cursor_to"><a href="/man/Transport_Menu:_Cursor_to" title="Transport Menu: Cursor to">Transport: Cursor to</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=24" title="Edit section: Transport: Cursor to">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">These commands let you move the cursor to the start or end of the selection, track or any adjacent Clip that you may have  </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>CursSelStart:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Cursor_to#selection_start" title="Transport Menu: Cursor to">Selection Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the left edge of the current selection to the center of the screen, without changing the <a href="/man/Zooming" title="Zooming">zoom</a> level.
   </td></tr>
   <tr>
   <td><b>CursSelEnd:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Cursor_to#selection_end" title="Transport Menu: Cursor to">Selection End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the right edge of the current selection to the center of the screen, without changing the <a href="/man/Zooming" title="Zooming">zoom</a> level.
   </td></tr>
   <tr>
   <td><b>CursTrackStart:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Cursor_to#track_start" title="Transport Menu: Cursor to">Track Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the cursor to the start of the selected track.
   </td></tr>
   <tr>
   <td><b>CursTrackEnd:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Cursor_to#track_end" title="Transport Menu: Cursor to">Track End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the cursor to the end of the selected track.
   </td></tr>
   <tr>
   <td><b>CursPrevClipBoundary:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Cursor_to#previous_clip_boundary" title="Transport Menu: Cursor to">Previous Clip Boundary</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the cursor position back to the right-hand edge of the previous clip
   </td></tr>
   <tr>
   <td><b>CursNextClipBoundary:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Cursor_to#next_clip_boundary" title="Transport Menu: Cursor to">Next Clip Boundary</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the cursor position forward to the left-hand edge of the next clip
   </td></tr>
   <tr>
   <td><b>CursProjectStart:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Cursor_to#project_start" title="Transport Menu: Cursor to">Project Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the cursor to the beginning of the project.
   </td></tr>
   <tr>
   <td><b>CursProjectEnd:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Cursor_to#project_end" title="Transport Menu: Cursor to">Project End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the cursor to the end of the project.
   </td></tr></table>
   <div id="transport_play_region_submenu"></div>
   <h3><span class="mw-headline" id="Transport:_Play_Region"><a href="/man/Transport_Menu:_Play_Region" title="Transport Menu: Play Region">Transport: Play Region</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=25" title="Edit section: Transport: Play Region">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">These commands enable you to lock a play region and unlock it </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>LockPlayRegion:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Play_Region#lock" title="Transport Menu: Play Region">Lock</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Locks standard playback to the current position of the playback region, or to the current position of the Quick-Play region).
   </td></tr>
   <tr>
   <td><b>UnlockPlayRegion:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Play_Region#unlock" title="Transport Menu: Play Region">Unlock</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Removes the Play Region Lock.
   </td></tr></table>
   <div id="transport_transport_options_submenu"></div>
   <h3><span class="mw-headline" id="Transport:_Transport_Options"><a href="/man/Transport_Menu:_Transport_Options" title="Transport Menu: Transport Options">Transport: Transport Options</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=26" title="Edit section: Transport: Transport Options">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">This submenu lets you manage and set various options for transport (playing and recording) in Audacity </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SoundActivationLevel:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Transport_Options#sound_activation_level" title="Transport Menu: Transport Options">Sound Activation Level...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Sets the activation level above which Sound Activated Recording will record.
   </td></tr>
   <tr>
   <td><b>SoundActivation:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Transport_Options#sound_activated_recording_onoff" title="Transport Menu: Transport Options">Sound Activated Recording (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Toggles on and off the Sound Activated Recording option.
   </td></tr>
   <tr>
   <td><b>PinnedHead:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Transport_Options#pinned_playrecord_head_on.2Foff" title="Transport Menu: Transport Options">Pinned Play/Record Head (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>You can change Audacity to play and record with a fixed head pinned to the Timeline.  You can adjust the position of the fixed head by dragging it
   </td></tr>
   <tr>
   <td><b>Duplex:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Transport_Options#overdub_onoff" title="Transport Menu: Transport Options">Overdub (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Toggles on and off the Overdub option.
   </td></tr>
   <tr>
   <td><b>SWPlaythrough:</b>
   </td>
   <td><a href="/man/Transport_Menu:_Transport_Options#software_playthrough_onoff" title="Transport Menu: Transport Options">Software Playthrough (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Toggles on and off the Software Playthrough option.
   </td></tr></table>
   <div id="tracks_menu"></div>
   <h2><span class="mw-headline" id="Tracks_Menu"><a href="/man/Tracks_Menu" title="Tracks Menu">Tracks Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=27" title="Edit section: Tracks Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">Tracks Menu provides commands for creating and removing tracks, applying operations to selected tracks such as mixing, resampling or converting from stereo to mono, and lets you add or edit labels. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Resample:</b>
   </td>
   <td><a href="/man/Tracks_Menu#resample" title="Tracks Menu">Resample...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Allows you to resample the selected track(s) to a new sample rate for use in the project
   </td></tr>
   <tr>
   <td><b>RemoveTracks:</b>
   </td>
   <td><a href="/man/Tracks_Menu#remove_tracks" title="Tracks Menu">Remove Tracks</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Removes the selected track(s) from the project. Even if only part of a track is selected, the entire track is removed.
   </td></tr>
   <tr>
   <td><b>SyncLock:</b>
   </td>
   <td><a href="/man/Tracks_Menu#synclock_tracks_onoff" title="Tracks Menu">Sync-Lock Tracks (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Ensures that length changes occurring anywhere in a defined group of tracks also take place in all audio or label tracks in that group.
   </td></tr></table>
   <div id="tracks_add_new_submenu"></div>
   <h3><span class="mw-headline" id="Tracks:_Add_New"><a href="/man/Tracks_Menu:_Add_New" title="Tracks Menu: Add New">Tracks: Add New</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=28" title="Edit section: Tracks: Add New">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Adds a new track </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>NewMonoTrack:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Add_New#mono_track" title="Tracks Menu: Add New">Mono Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Creates a new empty mono audio track.
   </td></tr>
   <tr>
   <td><b>NewStereoTrack:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Add_New#stereo_track" title="Tracks Menu: Add New">Stereo Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Adds an empty stero track to the project
   </td></tr>
   <tr>
   <td><b>NewLabelTrack:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Add_New#label_track" title="Tracks Menu: Add New">Label Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Adds an empty label track to the project
   </td></tr>
   <tr>
   <td><b>NewTimeTrack:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Add_New#time_track" title="Tracks Menu: Add New">Time Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Adds an empty time track to the project.  Time tracks are used to speed up and slow down audio.
   </td></tr></table>
   <div id="tracks_mix_submenu"></div>
   <h3><span class="mw-headline" id="Tracks:_Mix"><a href="/man/Tracks_Menu:_Mix" title="Tracks Menu: Mix">Tracks: Mix</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=29" title="Edit section: Tracks: Mix">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Mixes down selected tracks to mono or stereo tracks </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Stereo to Mono:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Mix#mix_stereo_down_to_mono" title="Tracks Menu: Mix">Mix Stereo Down to Mono</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Converts the selected stereo track(s) into the same number of mono tracks, combining left and right channels equally by averaging the volume of both channels.
   </td></tr>
   <tr>
   <td><b>MixAndRender:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Mix#mix_and_render" title="Tracks Menu: Mix">Mix and Render</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Mixes down all selected tracks to a single mono or stereo track, rendering to the waveform all real-time transformations that had been applied (such as track <i><b><a href="/man/Glossary#gain" title="Glossary">gain</a></b></i>, panning, <a href="/man/Envelope_Tool" title="Envelope Tool">amplitude envelopes</a> or a change in <a href="/man/Selection_Toolbar#rate" title="Selection Toolbar">project rate</a>).
   </td></tr>
   <tr>
   <td><b>MixAndRenderToNewTrack:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Mix#mix_and_render_to_new_track" title="Tracks Menu: Mix">Mix and Render to New Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Same as <span class="menu">Tracks &gt; <a href="/man/Tracks_Menu#mix_and_render" title="Tracks Menu">Mix and Render</a></span> except that the original tracks are preserved rather than being replaced by the resulting "Mix" track.
   </td></tr></table>
   <div id="tracks_muteunmute_submenu"></div>
   <h3><span class="mw-headline" id="Tracks:_Mute.2FUnmute"><a href="/man/Tracks_Menu:_Mute_Unmute" title="Tracks Menu: Mute Unmute">Tracks: Mute/Unmute</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=30" title="Edit section: Tracks: Mute/Unmute">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Mutes or unmutes audio tracks in the project </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>MuteAllTracks:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Mute/Unmute#mute_all_tracks" class="mw-redirect" title="Tracks Menu: Mute/Unmute">Mute All Tracks</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Mutes all the audio tracks in the project as if you had used the mute buttons from the Track Control Panel on each track.
   </td></tr>
   <tr>
   <td><b>UnmuteAllTracks:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Mute/Unmute#unmute_all_tracks" class="mw-redirect" title="Tracks Menu: Mute/Unmute">Unmute All Tracks</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Unmutes all the audio tracks in the project as if you had released the mute buttons from the Track Control Panel on each track.
   </td></tr></table>
   <div id="tracks_pan_submenu"></div>
   <h3><span class="mw-headline" id="Tracks:_Pan"><a href="/man/Tracks_Menu:_Pan" title="Tracks Menu: Pan">Tracks: Pan</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=31" title="Edit section: Tracks: Pan">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Pans left right or center audio tracks in the project </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>PanLeft:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Pan#left" title="Tracks Menu: Pan">Left</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Pan selected audio to left speaker
   </td></tr>
   <tr>
   <td><b>PanRight:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Pan#right" title="Tracks Menu: Pan">Right</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Pan selected audio centrally.
   </td></tr>
   <tr>
   <td><b>PanCenter:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Pan#center" title="Tracks Menu: Pan">Center</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Pan selected audio to right speaker.
   </td></tr></table>
   <div id="tracks_align_tracks_submenu"></div>
   <h3><span class="mw-headline" id="Tracks:_Align_Tracks"><a href="/man/Tracks_Menu:_Align_Tracks" title="Tracks Menu: Align Tracks">Tracks: Align Tracks</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=32" title="Edit section: Tracks: Align Tracks">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Commands that provide an automatic way of aligning selected tracks with the cursor, the selection, or with the start of the project. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Align_EndToEnd:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Align_Tracks#align_end_to_end" title="Tracks Menu: Align Tracks">Align End to End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Aligns the selected tracks one after the other, based on their top-to-bottom order in the project window.
   </td></tr>
   <tr>
   <td><b>Align_Together:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Align_Tracks#align_together" title="Tracks Menu: Align Tracks">Align Together</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Align the selected tracks so that they start at the same (averaged) start time.
   </td></tr>
   <tr>
   <td><b>Align_StartToZero:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Align_Tracks#start_to_zero" title="Tracks Menu: Align Tracks">Start to Zero</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Aligns the start of selected tracks with the start of the project.
   </td></tr>
   <tr>
   <td><b>Align_StartToSelStart:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Align_Tracks#start_to_cursorselection_start" title="Tracks Menu: Align Tracks">Start to Cursor/Selection Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Aligns the start of selected tracks with the current cursor position or with the start of the current selection.
   </td></tr>
   <tr>
   <td><b>Align_StartToSelEnd:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Align_Tracks#start_to_selection_end" title="Tracks Menu: Align Tracks">Start to Selection End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Aligns the start of selected tracks with the end of the current selection.
   </td></tr>
   <tr>
   <td><b>Align_EndToSelStart:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Align_Tracks#end_to_cursorselection_start" title="Tracks Menu: Align Tracks">End to Cursor/Selection Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Aligns the end of selected tracks with the current cursor position or with the start of the current selection.
   </td></tr>
   <tr>
   <td><b>Align_EndToSelEnd:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Align_Tracks#end_to_selection_end" title="Tracks Menu: Align Tracks">End to Selection End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Aligns the end of selected tracks with the end of the current selection.
   </td></tr>
   <tr>
   <td><b>MoveSelectionWithTracks:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Align_Tracks#move_selection_with_tracks_onoff" title="Tracks Menu: Align Tracks">Move Selection with Tracks (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Toggles on/off the selection moving with the realigned tracks, or staying put.
   </td></tr></table>
   <div id="tracks_sort_tracks_submenu"></div>
   <h3><span class="mw-headline" id="Tracks:_Sort_Tracks"><a href="/man/Tracks_Menu:_Sort_Tracks" title="Tracks Menu: Sort Tracks">Tracks: Sort Tracks</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=33" title="Edit section: Tracks: Sort Tracks">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Sorts all tracks in the project from top to bottom in the project window, by Start Time or by Name. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SortByTime:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Sort_Tracks#by_start_time" title="Tracks Menu: Sort Tracks">By Start Time</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Sort tracks in order of start time.
   </td></tr>
   <tr>
   <td><b>SortByName:</b>
   </td>
   <td><a href="/man/Tracks_Menu:_Sort_Tracks#by_name" title="Tracks Menu: Sort Tracks">By Name</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Sort tracks in order by name.
   </td></tr></table>
   <div id="generate_menu"></div>
   <h2><span class="mw-headline" id="Generate_Menu"><a href="/man/Generate_Menu" title="Generate Menu">Generate Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=34" title="Edit section: Generate Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">Generate Menu lets you create audio containing tones, noise or silence. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ManageGenerators:</b>
   </td>
   <td><a href="/man/Generate_Menu#add_remove_plugins" title="Generate Menu">Add / Remove Plug-ins...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selecting this option from the Effect Menu (or the <a href="/man/Generate_Menu" title="Generate Menu">Generate Menu</a> or <a href="/man/Analyze_Menu" title="Analyze Menu">Analyze Menu</a>) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity. Even if you do not add any third-party plug-ins, you can use this to make the Effect menu shorter or longer as required.  For details see <a href="/man/Manage_Effects,_Generators_and_Analyzers" title="Manage Effects, Generators and Analyzers">Add / Remove Effects, Generators and Analyzers</a>.
   </td></tr>
   <tr>
   <td><b>Chirp:</b>
   </td>
   <td><a href="/man/Generate_Menu#chirp" title="Generate Menu">Chirp...</a>
   </td>
   <td><i>double <b>StartFreq</b>, (default:440)<br /></i>
   <p><i>double <b>EndFreq</b>, (default:1320)<br /></i>
   <i>double <b>StartAmp</b>, (default:0.8)<br /></i>
   <i>double <b>EndAmp</b>, (default:0.1)<br /></i>
   <i>enum <b>Waveform</b>, (default:Sine)<br /></i>
   </p>
   <ul><li> Sine</li>
   <li> Square</li>
   <li> Sawtooth</li>
   <li> Square, no alias</li></ul>
   <p><i>enum <b>Interpolation</b>, (default:Linear)<br /></i>
   </p>
   <ul><li> Linear</li>
   <li> Logarithmic</li></ul>
   </td>
   <td>Generates four different types of tone waveforms like the <a href="#Tone...">Tone Generator</a>, but additionally allows setting of the starting and ending amplitude and frequency.
   </td></tr>
   <tr>
   <td><b>DtmfTones:</b>
   </td>
   <td><a href="/man/Generate_Menu#dtmf_tones" title="Generate Menu">DTMF Tones...</a>
   </td>
   <td><i>string <b>Sequence</b>, (default:audacity)<br /></i>
   <p><i>double <b>Duty Cycle</b>, (default:55)<br /></i>
   <i>double <b>Amplitude</b>, (default:0.8)<br /></i>
   </p>
   </td>
   <td>Generates dual-tone multi-frequency (DTMF) tones like those produced by the keypad on telephones.
   </td></tr>
   <tr>
   <td><b>Noise:</b>
   </td>
   <td><a href="/man/Generate_Menu#noise" title="Generate Menu">Noise...</a>
   </td>
   <td><i>enum <b>Type</b>, (default:White)<br /></i>
   <ul><li> White</li>
   <li> Pink</li>
   <li> Brownian</li></ul>
   <p><i>double <b>Amplitude</b>, (default:0.8)<br /></i>
   </p>
   </td>
   <td>Generates 'white', 'pink' or 'brown' noise.
   </td></tr>
   <tr>
   <td><b>Tone:</b>
   </td>
   <td><a href="/man/Generate_Menu#tone" title="Generate Menu">Tone...</a>
   </td>
   <td><i>double <b>Frequency</b>, (default:440)<br /></i>
   <p><i>double <b>Amplitude</b>, (default:0.8)<br /></i>
   <i>enum <b>Waveform</b>, (default:Sine)<br /></i>
   </p>
   <ul><li> Sine</li>
   <li> Square</li>
   <li> Sawtooth</li>
   <li> Square, no alias</li></ul>
   <p><i>enum <b>Interpolation</b>, (default:Linear)<br /></i>
   </p>
   <ul><li> Linear</li>
   <li> Logarithmic</li></ul>
   </td>
   <td>Generates one of four different tone waveforms: <i>Sine</i>, <i>Square</i>, <i>Sawtooth</i> or <i>Square (no alias)</i>, and a frequency between 1 Hz and <i>half the current project rate</i>.
   </td></tr>
   <tr>
   <td><b>Pluck:</b>
   </td>
   <td><a href="/man/Generate_Menu#pluck" title="Generate Menu">Pluck...</a>
   </td>
   <td><i>int <b>pitch</b>, (default:0)<br /></i>
   <p><i>enum <b>fade</b>, (default:Abrupt)<br /></i>
   </p>
   <ul><li> Abrupt</li>
   <li> Gradual</li></ul>
   <p><i>double <b>dur</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>A synthesized pluck tone with abrupt or gradual fade-out, and selectable pitch corresponding to a <i><b><a href="/man/Glossary#midi" title="Glossary">MIDI</a></b></i> note.
   </td></tr>
   <tr>
   <td><b>RhythmTrack:</b>
   </td>
   <td><a href="/man/Generate_Menu#rhythm_track" title="Generate Menu">Rhythm Track...</a>
   </td>
   <td><i>double <b>tempo</b>, (default:0)<br /></i>
   <p><i>int <b>timesig</b>, (default:0)<br /></i>
   <i>double <b>swing</b>, (default:0)<br /></i>
   <i>int <b>bars</b>, (default:0)<br /></i>
   <i>double <b>click-track-dur</b>, (default:0)<br /></i>
   <i>double <b>offset</b>, (default:0)<br /></i>
   <i>enum <b>click-type</b>, (default:Metronome)<br /></i>
   </p>
   <ul><li> Metronome</li>
   <li> Ping (short)</li>
   <li> Ping (long)</li>
   <li> Cowbell</li>
   <li> ResonantNoise</li>
   <li> NoiseClick</li>
   <li> Drip (short)</li>
   <li> Drip (long)</li></ul>
   <p><i>int <b>high</b>, (default:0)<br /></i>
   <i>int <b>low</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Generates a track with regularly spaced sounds at a specified tempo and number of beats per measure (bar).
   </td></tr>
   <tr>
   <td><b>RissetDrum:</b>
   </td>
   <td><a href="/man/Generate_Menu#risset_drum" title="Generate Menu">Risset Drum...</a>
   </td>
   <td><i>double <b>freq</b>, (default:0)<br /></i>
   <p><i>double <b>decay</b>, (default:0)<br /></i>
   <i>double <b>cf</b>, (default:0)<br /></i>
   <i>double <b>bw</b>, (default:0)<br /></i>
   <i>double <b>noise</b>, (default:0)<br /></i>
   <i>double <b>gain</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Produces a realistic drum sound.
   </td></tr></table>
   <div id="effect_menu"></div>
   <h2><span class="mw-headline" id="Effect_Menu"><a href="/man/Effect_Menu" title="Effect Menu">Effect Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=35" title="Edit section: Effect Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">Audacity includes many built-in effects and also lets you use a wide range of plug-in effects. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ManageEffects:</b>
   </td>
   <td><a href="/man/Effect_Menu#add_remove_plugins" title="Effect Menu">Add / Remove Plug-ins...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selecting this option from the Effect Menu (or the <a href="/man/Generate_Menu" title="Generate Menu">Generate Menu</a> or <a href="/man/Analyze_Menu" title="Analyze Menu">Analyze Menu</a>) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity. Even if you do not add any third-party plug-ins, you can use this to make the Effect menu shorter or longer as required.  For details see <a href="/man/Manage_Effects,_Generators_and_Analyzers" title="Manage Effects, Generators and Analyzers">Add / Remove Effects, Generators and Analyzers</a>.
   </td></tr>
   <tr>
   <td><b>RepeatLastEffect:</b>
   </td>
   <td><a href="/man/Effect_Menu#repeat_last_effect" title="Effect Menu">Repeat Last Effect</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Repeats the last used effect at its last used settings and without displaying any dialog.
   </td></tr>
   <tr>
   <td><b>Built-in:</b>
   </td>
   <td><a href="/man/Effect_Menu#builtin" title="Effect Menu">Built-in</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Shows the list of available Audacity built-in effects but only if the user has effects "Grouped by Type" in Effects Preferences.
   </td></tr>
   <tr>
   <td><b>LADSPA:</b>
   </td>
   <td><a href="/man/Effect_Menu#ladspa" title="Effect Menu">LADSPA</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Shows the list of available LADSPA effects but only if the user has effects "Grouped by Type" in Effects Preferences.
   </td></tr>
   <tr>
   <td><b>Nyquist:</b>
   </td>
   <td><a href="/man/Effect_Menu#nyquist" title="Effect Menu">Nyquist</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Shows the list of available Nyquist effects but only if the user has effects "Grouped by Type" in Effects Preferences.
   </td></tr></table>
   <div id="effect_builtin_submenu"></div>
   <h3><span class="mw-headline" id="Effect:_Built-in"><a href="/man/Effect_Menu:_Built-in" title="Effect Menu: Built-in">Effect: Built-in</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=36" title="Edit section: Effect: Built-in">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Shows the list of available Audacity built-in effects but only if the user has effects "Grouped by Type" in Effects Preferences. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Amplify:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#amplify" title="Effect Menu: Built-in">Amplify...</a>
   </td>
   <td><i>float <b>Ratio</b>, (default:0.9)<br /></i>
   <p><i>bool <b>AllowClipping</b>, (default:False)<br /></i>
   </p>
   </td>
   <td>Increases or decreases the volume of the audio you have selected.
   </td></tr>
   <tr>
   <td><b>AutoDuck:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#auto_duck" title="Effect Menu: Built-in">Auto Duck...</a>
   </td>
   <td><i>double <b>DuckAmountDb</b>, (default:-12)<br /></i>
   <p><i>double <b>InnerFadeDownLen</b>, (default:0)<br /></i>
   <i>double <b>InnerFadeUpLen</b>, (default:0)<br /></i>
   <i>double <b>OuterFadeDownLen</b>, (default:0.5)<br /></i>
   <i>double <b>OuterFadeUpLen</b>, (default:0.5)<br /></i>
   <i>double <b>ThresholdDb</b>, (default:-30)<br /></i>
   <i>double <b>MaximumPause</b>, (default:1)<br /></i>
   </p>
   </td>
   <td>Reduces (ducks) the volume of one or more tracks whenever the volume of a specified "control" track reaches a particular level. Typically used to make a music track softer whenever speech in a commentary track is heard.
   </td></tr>
   <tr>
   <td><b>BassAndTreble:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#bass_and_treble" title="Effect Menu: Built-in">Bass and Treble...</a>
   </td>
   <td><i>double <b>Bass</b>, (default:0)<br /></i>
   <p><i>double <b>Treble</b>, (default:0)<br /></i>
   <i>double <b>Gain</b>, (default:0)<br /></i>
   <i>bool <b>Link Sliders</b>, (default:False)<br /></i>
   </p>
   </td>
   <td>Increases or decreases the lower  <i><b><a href="/man/Glossary#frequency" title="Glossary">frequencies</a></b></i>  and higher frequencies of your audio independently; behaves just like the bass and treble controls on a stereo system.
   </td></tr>
   <tr>
   <td><b>ChangePitch:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#change_pitch" title="Effect Menu: Built-in">Change Pitch...</a>
   </td>
   <td><i>double <b>Percentage</b>, (default:0)<br /></i>
   <p><i>bool <b>SBSMS</b>, (default:False)<br /></i>
   </p>
   </td>
   <td>Change the pitch of a selection without changing its tempo.
   </td></tr>
   <tr>
   <td><b>ChangeSpeed:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#change_speed" title="Effect Menu: Built-in">Change Speed...</a>
   </td>
   <td><i>double <b>Percentage</b>, (default:0)<br /></i>
   </td>
   <td>Change the speed of a selection, also changing its pitch.
   </td></tr>
   <tr>
   <td><b>ChangeTempo:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#change_tempo" title="Effect Menu: Built-in">Change Tempo...</a>
   </td>
   <td><i>double <b>Percentage</b>, (default:0)<br /></i>
   <p><i>bool <b>SBSMS</b>, (default:False)<br /></i>
   </p>
   </td>
   <td>Change the tempo and length (duration) of a selection without changing its pitch.
   </td></tr>
   <tr>
   <td><b>ClickRemoval:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#click_removal" title="Effect Menu: Built-in">Click Removal...</a>
   </td>
   <td><i>int <b>Threshold</b>, (default:200)<br /></i>
   <p><i>int <b>Width</b>, (default:20)<br /></i>
   </p>
   </td>
   <td>Click Removal is designed to remove clicks on audio tracks and is especially suited to declicking recordings made from vinyl records.
   </td></tr>
   <tr>
   <td><b>Compressor:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#compressor" title="Effect Menu: Built-in">Compressor...</a>
   </td>
   <td><i>double <b>Threshold</b>, (default:-12)<br /></i>
   <p><i>double <b>NoiseFloor</b>, (default:-40)<br /></i>
   <i>double <b>Ratio</b>, (default:2)<br /></i>
   <i>double <b>AttackTime</b>, (default:0.2)<br /></i>
   <i>double <b>ReleaseTime</b>, (default:1)<br /></i>
   <i>bool <b>Normalize</b>, (default:True)<br /></i>
   <i>bool <b>UsePeak</b>, (default:False)<br /></i>
   </p>
   </td>
   <td>Compresses the <i><b><a href="/man/Glossary#dynamic_range" title="Glossary">dynamic range</a></b></i> by two alternative methods. The default "<i><b><a href="/man/Glossary#rms" title="Glossary">RMS</a></b></i>" method makes the louder parts softer, but leaves the quieter audio alone. The alternative "peaks" method makes the entire audio louder, but amplifies the louder parts less than the quieter parts. Make-up <i><b><a href="/man/Glossary#gain" title="Glossary">gain</a></b></i> can be applied to either method, making the result as loud as possible without <i><b><a href="/man/Glossary#clipping" title="Glossary">clipping</a></b></i>, but not changing the dynamic range further.
   </td></tr>
   <tr>
   <td><b>Distortion:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#distortion" title="Effect Menu: Built-in">Distortion...</a>
   </td>
   <td><i>enum <b>Type</b>, (default:Hard Clipping)<br /></i>
   <ul><li> Hard Clipping</li>
   <li> Soft Clipping</li>
   <li> Soft Overdrive</li>
   <li> Medium Overdrive</li>
   <li> Hard Overdrive</li>
   <li> Cubic Curve (odd harmonics)</li>
   <li> Even Harmonics</li>
   <li> Expand and Compress</li>
   <li> Leveller</li>
   <li> Rectifier Distortion</li>
   <li> Hard Limiter 1413</li></ul>
   <p><i>bool <b>DC Block</b>, (default:False)<br /></i>
   <i>double <b>Threshold dB</b>, (default:-6)<br /></i>
   <i>double <b>Noise Floor</b>, (default:-70)<br /></i>
   <i>double <b>Parameter 1</b>, (default:50)<br /></i>
   <i>double <b>Parameter 2</b>, (default:50)<br /></i>
   <i>int <b>Repeats</b>, (default:1)<br /></i>
   </p>
   </td>
   <td>Use the Distortion effect to make the audio sound distorted. By distorting the waveform the frequency content is changed, which will often make the sound "crunchy" or "abrasive".  Technically this effect is a <a rel="nofollow" class="external text" href="https://en.wikipedia.org/wiki/Waveshaper">waveshaper</a>. The result of waveshaping is equivalent to applying non-linear amplification to the audio waveform. Preset shaping functions are provided, each of which produces a different type of distortion.
   </td></tr>
   <tr>
   <td><b>Echo:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#echo" title="Effect Menu: Built-in">Echo...</a>
   </td>
   <td><i>float <b>Delay</b>, (default:1)<br /></i>
   <p><i>float <b>Decay</b>, (default:0.5)<br /></i>
   </p>
   </td>
   <td>Repeats the selected audio again and again, normally softer each time and normally not blended into the original sound until some time after it starts. The delay time between each repeat is fixed, with no pause in between each repeat. For a more configurable echo effect with a variable delay time and pitch-changed echoes, see <a href="/man/Effect_Menu#Delay" title="Effect Menu">Delay</a>.
   </td></tr>
   <tr>
   <td><b>Equalization:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#equalization" title="Effect Menu: Built-in">Equalization...</a>
   </td>
   <td><i>size_t <b>FilterLength</b>, (default:4001)<br /></i>
   <p><i>string <b>CurveName</b>, (default:unnamed)<br /></i>
   <i>bool <b>InterpolateLin</b>, (default:False)<br /></i>
   <i>enum <b>InterpolationMethod</b>, (default:B-spline)<br /></i>
   </p>
   <ul><li> B-spline</li>
   <li> Cosine</li>
   <li> Cubic</li></ul>
   </td>
   <td>Adjusts the volume levels of particular frequencies.
   </td></tr>
   <tr>
   <td><b>Fade In:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#fade_in" title="Effect Menu: Built-in">Fade In</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Applies a <i><b><a href="/man/Glossary#linear" title="Glossary">linear</a></b></i> fade-in to the selected audio - the rapidity of the fade-in depends entirely on the length of the selection it is applied to.  For a more customizable <i><b><a href="/man/Glossary#log" title="Glossary">logarithmic</a></b></i> fade, use the <a href="/man/Envelope_Tool" title="Envelope Tool">Envelope Tool</a> on the <a href="/man/Tools_Toolbar" title="Tools Toolbar">Tools Toolbar</a>.
   </td></tr>
   <tr>
   <td><b>Fade Out:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#fade_out" title="Effect Menu: Built-in">Fade Out</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Applies a <i><b><a href="/man/Glossary#linear" title="Glossary">linear</a></b></i> fade-out to the selected audio - the rapidity of the fade-out depends entirely on the length of the selection it is applied to.  For a more customizable <i><b><a href="/man/Glossary#log" title="Glossary">logarithmic</a></b></i> fade, use the <a href="/man/Envelope_Tool" title="Envelope Tool">Envelope Tool</a> on the <a href="/man/Tools_Toolbar" title="Tools Toolbar">Tools Toolbar</a>.<br />
   </td></tr>
   <tr>
   <td><b>Invert:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#invert" title="Effect Menu: Built-in">Invert</a>
   </td>
   <td><i>none</i>
   </td>
   <td>This effect flips the audio samples upside-down.  This normally does not affect the sound of the audio at all.  It is occasionally useful for vocal removal.
   </td></tr>
   <tr>
   <td><b>Normalize:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#normalize" title="Effect Menu: Built-in">Normalize...</a>
   </td>
   <td><i>double <b>PeakLevel</b>, (default:-1)<br /></i>
   <p><i>bool <b>ApplyGain</b>, (default:True)<br /></i>
   <i>bool <b>RemoveDcOffset</b>, (default:True)<br /></i>
   <i>bool <b>StereoIndependent</b>, (default:False)<br /></i>
   </p>
   </td>
   <td>Use the Normalize effect to set the maximum amplitude of a track, equalize the amplitudes of the left and right channels of a stereo track and optionally remove any <a href="/man/DC_offset" title="DC offset">DC offset</a> from the track
   </td></tr>
   <tr>
   <td><b>Paulstretch:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#paulstretch" title="Effect Menu: Built-in">Paulstretch...</a>
   </td>
   <td><i>float <b>Stretch Factor</b>, (default:10)<br /></i>
   <p><i>float <b>Time Resolution</b>, (default:0.25)<br /></i>
   </p>
   </td>
   <td>Use Paulstretch only for an extreme time-stretch or "stasis" effect, This may be useful for synthesizer pad sounds, identifying performance glitches or just creating interesting aural textures. Use Change Tempo or Sliding Time Scale rather than Paulstretch for tasks like slowing down a song to a "practice" tempo.
   </td></tr>
   <tr>
   <td><b>Phaser:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#phaser" title="Effect Menu: Built-in">Phaser...</a>
   </td>
   <td><i>int <b>Stages</b>, (default:2)<br /></i>
   <p><i>int <b>DryWet</b>, (default:128)<br /></i>
   <i>double <b>Freq</b>, (default:0.4)<br /></i>
   <i>double <b>Phase</b>, (default:0)<br /></i>
   <i>int <b>Depth</b>, (default:100)<br /></i>
   <i>int <b>Feedback</b>, (default:0)<br /></i>
   <i>double <b>Gain</b>, (default:-6)<br /></i>
   </p>
   </td>
   <td>The name "Phaser" comes from "Phase Shifter", because it works by combining phase-shifted signals with the original signal.  The movement of the phase-shifted signals is controlled using a Low <i><b><a href="/man/Glossary#frequency" title="Glossary">Frequency</a></b></i> Oscillator (LFO).
   </td></tr>
   <tr>
   <td><b>Repair:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#repair" title="Effect Menu: Built-in">Repair</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Fix one particular short click, pop or other glitch no more than 128 samples long.
   </td></tr>
   <tr>
   <td><b>Repeat:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#repeat" title="Effect Menu: Built-in">Repeat...</a>
   </td>
   <td><i>int <b>Count</b>, (default:1)<br /></i>
   </td>
   <td>Repeats the selection the specified number of times.
   </td></tr>
   <tr>
   <td><b>Reverb:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#reverb" title="Effect Menu: Built-in">Reverb...</a>
   </td>
   <td><i>double <b>RoomSize</b>, (default:75)<br /></i>
   <p><i>double <b>Delay</b>, (default:10)<br /></i>
   <i>double <b>Reverberance</b>, (default:50)<br /></i>
   <i>double <b>HfDamping</b>, (default:50)<br /></i>
   <i>double <b>ToneLow</b>, (default:100)<br /></i>
   <i>double <b>ToneHigh</b>, (default:100)<br /></i>
   <i>double <b>WetGain</b>, (default:-1)<br /></i>
   <i>double <b>DryGain</b>, (default:-1)<br /></i>
   <i>double <b>StereoWidth</b>, (default:100)<br /></i>
   <i>bool <b>WetOnly</b>, (default:False)<br /></i>
   </p>
   </td>
   <td>A configurable stereo reverberation effect with built-in and user-added presets. It can be used to add ambience (an impression of the space in which a sound occurs) to a mono sound. Also use it to increase reverberation in stereo audio that sounds too "dry" or "close".
   </td></tr>
   <tr>
   <td><b>Reverse:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#reverse" title="Effect Menu: Built-in">Reverse</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Reverses the selected audio; after the effect the end of the audio will be heard first and the beginning last.
   </td></tr>
   <tr>
   <td><b>SlidingStretch:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#sliding_stretch" title="Effect Menu: Built-in">Sliding Stretch...</a>
   </td>
   <td><i>double <b>RatePercentChangeStart</b>, (default:0)<br /></i>
   <p><i>double <b>RatePercentChangeEnd</b>, (default:0)<br /></i>
   <i>double <b>PitchHalfStepsStart</b>, (default:0)<br /></i>
   <i>double <b>PitchHalfStepsEnd</b>, (default:0)<br /></i>
   <i>double <b>PitchPercentChangeStart</b>, (default:0)<br /></i>
   <i>double <b>PitchPercentChangeEnd</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>This effect allows you to make a continuous change to the tempo and/or pitch of a selection by choosing initial and/or final change values.
   </td></tr>
   <tr>
   <td><b>TruncateSilence:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#truncate_silence" title="Effect Menu: Built-in">Truncate Silence...</a>
   </td>
   <td><i>double <b>Threshold</b>, (default:-20)<br /></i>
   <p><i>enum <b>Action</b>, (default:Truncate Detected Silence)<br /></i>
   </p>
   <ul><li> Truncate Detected Silence</li>
   <li> Compress Excess Silence</li></ul>
   <p><i>double <b>Minimum</b>, (default:0.5)<br /></i>
   <i>double <b>Truncate</b>, (default:0.5)<br /></i>
   <i>double <b>Compress</b>, (default:50)<br /></i>
   <i>bool <b>Independent</b>, (default:False)<br /></i>
   </p>
   </td>
   <td>Automatically try to find and eliminate audible silences. Don't use with faded audio.
   </td></tr>
   <tr>
   <td><b>Wahwah:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Built-in#wahwah" title="Effect Menu: Built-in">Wahwah...</a>
   </td>
   <td><i>double <b>Freq</b>, (default:1.5)<br /></i>
   <p><i>double <b>Phase</b>, (default:0)<br /></i>
   <i>int <b>Depth</b>, (default:70)<br /></i>
   <i>double <b>Resonance</b>, (default:2.5)<br /></i>
   <i>int <b>Offset</b>, (default:30)<br /></i>
   <i>double <b>Gain</b>, (default:-6)<br /></i>
   </p>
   </td>
   <td>Rapid tone quality variations, like that guitar sound so popular in the 1970's.
   </td></tr></table>
   <div id="effect_nyquist_submenu"></div>
   <h3><span class="mw-headline" id="Effect:_Nyquist"><a href="/man/Effect_Menu:_Nyquist" title="Effect Menu: Nyquist">Effect: Nyquist</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=37" title="Edit section: Effect: Nyquist">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Shows the list of available Nyquist effects but only if the user has effects "Grouped by Type" in Effects Preferences. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>AdjustableFade:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#adjustable_fade" title="Effect Menu: Nyquist">Adjustable Fade...</a>
   </td>
   <td><i>enum <b>type</b>, (default:Up)<br /></i>
   <ul><li> Up</li>
   <li> Down</li>
   <li> SCurveUp</li>
   <li> SCurveDown</li></ul>
   <p><i>double <b>curve</b>, (default:0)<br /></i>
   <i>enum <b>units</b>, (default:Percent)<br /></i>
   </p>
   <ul><li> Percent</li>
   <li> dB</li></ul>
   <p><i>double <b>gain0</b>, (default:0)<br /></i>
   <i>double <b>gain1</b>, (default:0)<br /></i>
   <i>enum <b>preset</b>, (default:None)<br /></i>
   </p>
   <ul><li> None</li>
   <li> LinearIn</li>
   <li> LinearOut</li>
   <li> ExponentialIn</li>
   <li> ExponentialOut</li>
   <li> LogarithmicIn</li>
   <li> LogarithmicOut</li>
   <li> RoundedIn</li>
   <li> RoundedOut</li>
   <li> CosineIn</li>
   <li> CosineOut</li>
   <li> SCurveIn</li>
   <li> SCurveOut</li></ul>
   </td>
   <td>enables you to control the shape of the fade (non-linear fading) to be applied by adjusting various parameters; allows partial <i>(that is not from or to zero)</i> fades up or down.
   </td></tr>
   <tr>
   <td><b>ClipFix:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#clip_fix" title="Effect Menu: Nyquist">Clip Fix...</a>
   </td>
   <td><i>double <b>threshold</b>, (default:0)<br /></i>
   <p><i>double <b>gain</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Clip Fix attempts to reconstruct clipped regions by interpolating the lost signal.
   </td></tr>
   <tr>
   <td><b>CrossfadeClips:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#crossfade_clips" title="Effect Menu: Nyquist">Crossfade Clips</a>
   </td>
   <td>
   </td>
   <td>Use Crossfade Clips to apply a simple crossfade to a selected pair of clips in a single audio track.
   </td></tr>
   <tr>
   <td><b>CrossfadeTracks:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#crossfade_tracks" title="Effect Menu: Nyquist">Crossfade Tracks...</a>
   </td>
   <td><i>enum <b>type</b>, (default:ConstantGain)<br /></i>
   <ul><li> ConstantGain</li>
   <li> ConstantPower1</li>
   <li> ConstantPower2</li>
   <li> CustomCurve</li></ul>
   <p><i>double <b>curve</b>, (default:0)<br /></i>
   <i>enum <b>direction</b>, (default:Automatic)<br /></i>
   </p>
   <ul><li> Automatic</li>
   <li> OutIn</li>
   <li> InOut</li></ul>
   </td>
   <td>Use Crossfade Tracks to make a smooth transition between two overlapping tracks one above the other. Place the track to be faded out above the track to be faded in then select the overlapping region in both tracks and apply the effect.
   </td></tr>
   <tr>
   <td><b>Delay:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#delay" title="Effect Menu: Nyquist">Delay...</a>
   </td>
   <td><i>enum <b>delay-type</b>, (default:Regular)<br /></i>
   <ul><li> Regular</li>
   <li> BouncingBall</li>
   <li> ReverseBouncingBall</li></ul>
   <p><i>double <b>dgain</b>, (default:0)<br /></i>
   <i>double <b>delay</b>, (default:0)<br /></i>
   <i>enum <b>pitch-type</b>, (default:PitchTempo)<br /></i>
   </p>
   <ul><li> PitchTempo</li>
   <li> LQPitchShift</li></ul>
   <p><i>double <b>shift</b>, (default:0)<br /></i>
   <i>int <b>number</b>, (default:0)<br /></i>
   <i>enum <b>constrain</b>, (default:Yes)<br /></i>
   </p>
   <ul><li> Yes</li>
   <li> No</li></ul>
   </td>
   <td>A configurable delay effect with variable delay time and pitch shifting of the delays.
   </td></tr>
   <tr>
   <td><b>High-passFilter:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#high_pass_filter" title="Effect Menu: Nyquist">High Pass Filter...</a>
   </td>
   <td><i>double <b>frequency</b>, (default:0)<br /></i>
   <p><i>enum <b>rolloff</b>, (default:dB6)<br /></i>
   </p>
   <ul><li> dB6</li>
   <li> dB12</li>
   <li> dB24</li>
   <li> dB36</li>
   <li> dB48</li></ul>
   </td>
   <td>Released under terms of the GNU General Public License version 2
   </td></tr>
   <tr>
   <td><b>Limiter:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#limiter" title="Effect Menu: Nyquist">Limiter...</a>
   </td>
   <td><i>enum <b>type</b>, (default:SoftLimit)<br /></i>
   <ul><li> SoftLimit</li>
   <li> HardLimit</li>
   <li> SoftClip</li>
   <li> HardClip</li></ul>
   <p><i>double <b>gain-L</b>, (default:0)<br /></i>
   <i>double <b>gain-R</b>, (default:0)<br /></i>
   <i>double <b>thresh</b>, (default:0)<br /></i>
   <i>double <b>hold</b>, (default:0)<br /></i>
   <i>enum <b>makeup</b>, (default:No)<br /></i>
   </p>
   <ul><li> No</li>
   <li> Yes</li></ul>
   </td>
   <td>Limiter passes signals below a specified input level unaffected or gently reduced, while preventing the peaks of stronger signals from exceeding this threshold.  Mastering engineers often use this type of dynamic range compression combined with make-up gain to increase the perceived loudness of an audio recording during the audio mastering process.
   </td></tr>
   <tr>
   <td><b>Low-passFilter:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#low_pass_filter" title="Effect Menu: Nyquist">Low Pass Filter...</a>
   </td>
   <td><i>double <b>frequency</b>, (default:0)<br /></i>
   <p><i>enum <b>rolloff</b>, (default:dB6)<br /></i>
   </p>
   <ul><li> dB6</li>
   <li> dB12</li>
   <li> dB24</li>
   <li> dB36</li>
   <li> dB48</li></ul>
   </td>
   <td>Released under terms of the GNU General Public License version 2
   </td></tr>
   <tr>
   <td><b>NotchFilter:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#notch_filter" title="Effect Menu: Nyquist">Notch Filter...</a>
   </td>
   <td><i>double <b>frequency</b>, (default:0)<br /></i>
   <p><i>double <b>q</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Greatly attenuate ("notch out"), a narrow frequency band. This is a good way to remove mains hum or a whistle confined to a specific frequency with minimal damage to the remainder of the audio.
   </td></tr>
   <tr>
   <td><b>SpectralEditMultiTool:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#spectral_edit_multi_tool" title="Effect Menu: Nyquist">Spectral edit multi tool</a>
   </td>
   <td>
   </td>
   <td>When the selected track is in <a href="/man/Audio_Track_Dropdown_Menu#spgram" title="Audio Track Dropdown Menu">spectrogram</a> or <a href="/man/Audio_Track_Dropdown_Menu#spgram_log" title="Audio Track Dropdown Menu">spectrogram log(f)</a> view, applies a  <i><b><a href="/man/Glossary#notch" title="Glossary">notch filter</a></b></i>, <i><b><a href="/man/Glossary#hp" title="Glossary">high pass filter</a></b></i> or <i><b><a href="/man/Glossary#lp" title="Glossary">low pass filter</a></b></i> according to the spectral selection made. This effect can also be used to change the audio quality as an alternative to using <a href="/man/Equalization" title="Equalization">Equalization</a>.
   </td></tr>
   <tr>
   <td><b>SpectralEditParametricEq:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#spectral_edit_parametric_eq" title="Effect Menu: Nyquist">Spectral edit parametric EQ...</a>
   </td>
   <td><i>double <b>control-gain</b>, (default:0)<br /></i>
   </td>
   <td>When the selected track is in <a href="/man/Audio_Track_Dropdown_Menu#spgram" title="Audio Track Dropdown Menu">spectrogram</a> or <a href="/man/Audio_Track_Dropdown_Menu#spgram_log" title="Audio Track Dropdown Menu">spectrogram log(f)</a> view and the spectral selection has a center frequency and an upper and lower boundary, performs the specified <i><b><a href="/man/Glossary#band_stop" title="Glossary">band cut</a></b></i> or <i><b><a href="/man/Glossary#band_pass" title="Glossary">band boost</a></b></i>. This can be used as an alternative to <a href="/man/Equalization" title="Equalization">Equalization</a> or may also be useful to repair damaged audio by reducing frequency spikes or boosting other frequencies to mask spikes.
   </td></tr>
   <tr>
   <td><b>SpectralEditShelves:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#spectral_edit_shelves" title="Effect Menu: Nyquist">Spectral edit shelves...</a>
   </td>
   <td><i>double <b>control-gain</b>, (default:0)<br /></i>
   </td>
   <td>When the selected track is in <a href="/man/Audio_Track_Dropdown_Menu#spgram" title="Audio Track Dropdown Menu">spectrogram</a> or <a href="/man/Audio_Track_Dropdown_Menu#spgram_log" title="Audio Track Dropdown Menu">spectrogram log(f)</a> view, applies either a low- or high-frequency shelving filter or both filters, according to the spectral selection made. This can be used as an alternative to <a href="/man/Equalization" title="Equalization">Equalization</a> or may also be useful to repair damaged audio by reducing frequency spikes or boosting other frequencies to mask spikes.
   </td></tr>
   <tr>
   <td><b>StudioFadeOut:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#studio_fade_out" title="Effect Menu: Nyquist">Studio Fade Out</a>
   </td>
   <td>
   </td>
   <td>Applies a more musical fade out to the selected audio, giving a more pleasing sounding result.
   </td></tr>
   <tr>
   <td><b>Tremolo:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#tremolo" title="Effect Menu: Nyquist">Tremolo...</a>
   </td>
   <td><i>enum <b>wave</b>, (default:Sine)<br /></i>
   <ul><li> Sine</li>
   <li> Triangle</li>
   <li> Sawtooth</li>
   <li> InverseSawtooth</li>
   <li> Square</li></ul>
   <p><i>int <b>phase</b>, (default:0)<br /></i>
   <i>int <b>wet</b>, (default:0)<br /></i>
   <i>double <b>lfo</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Modulates the volume of the selection at the depth and rate selected in the dialog. The same as the tremolo effect familiar to guitar and keyboard players.
   </td></tr>
   <tr>
   <td><b>VocalReductionAndIsolation:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#vocal_reduction_and_isolation" title="Effect Menu: Nyquist">Vocal Reduction and Isolation...</a>
   </td>
   <td><i>enum <b>action</b>, (default:Remove)<br /></i>
   <ul><li> Remove</li>
   <li> Isolate</li>
   <li> IsolateInvert</li>
   <li> RemoveCenter</li>
   <li> IsolateCenter</li>
   <li> IsolateCenterInvert</li>
   <li> RemoveCenter</li>
   <li> Analyze</li></ul>
   <p><i>double <b>strength</b>, (default:0)<br /></i>
   <i>double <b>low-transition</b>, (default:0)<br /></i>
   <i>double <b>high-transition</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Attempts to remove or isolate center-panned audio from a stereo track.  Most  "Remove" options in this effect preserve the stereo image.
   </td></tr>
   <tr>
   <td><b>VocalRemover:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#vocal_remover" title="Effect Menu: Nyquist">Vocal Remover...</a>
   </td>
   <td><i>enum <b>action</b>, (default:Remove Vocals)<br /></i>
   <ul><li> Remove Vocals</li>
   <li> View Help</li></ul>
   <p><i>enum <b>band-choice</b>, (default:Simple)<br /></i>
   </p>
   <ul><li> Simple</li>
   <li> Remove</li>
   <li> Retain</li></ul>
   <p><i>double <b>low-range</b>, (default:0)<br /></i>
   <i>double <b>high-range</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>(Legacy effect) Attempts to remove center-panned vocals from a stereo track. The output from this effect will always be mono. Help text is available from within the dialog.
   </td></tr>
   <tr>
   <td><b>Vocoder:</b>
   </td>
   <td><a href="/man/Effect_Menu:_Nyquist#vocoder" title="Effect Menu: Nyquist">Vocoder...</a>
   </td>
   <td><i>double <b>dst</b>, (default:0)<br /></i>
   <p><i>enum <b>mst</b>, (default:BothChannels)<br /></i>
   </p>
   <ul><li> BothChannels</li>
   <li> RightOnly</li></ul>
   <p><i>int <b>bands</b>, (default:0)<br /></i>
   <i>double <b>track-vl</b>, (default:0)<br /></i>
   <i>double <b>noise-vl</b>, (default:0)<br /></i>
   <i>double <b>radar-vl</b>, (default:0)<br /></i>
   <i>double <b>radar-f</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Synthesizes audio (usually a voice) in the left channel of a stereo track with a <i>carrier wave</i> (typically white noise) in the right channel to produce a modified version of the left channel. Vocoding a normal voice with white noise will produce a robot-like voice for special effects.
   </td></tr></table>
   <div id="analyze_menu"></div>
   <h2><span class="mw-headline" id="Analyze_Menu"><a href="/man/Analyze_Menu" title="Analyze Menu">Analyze Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=38" title="Edit section: Analyze Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">The Analyze Menu contains tools for finding out about the characteristics of your audio, or labeling key feature. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ManageAnalyzers:</b>
   </td>
   <td><a href="/man/Analyze_Menu#add_remove_plugins" title="Analyze Menu">Add / Remove Plug-ins...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selecting this option from the Effect Menu (or the <a href="/man/Generate_Menu" title="Generate Menu">Generate Menu</a> or <a href="/man/Analyze_Menu" title="Analyze Menu">Analyze Menu</a>) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity. Even if you do not add any third-party plug-ins, you can use this to make the Effect menu shorter or longer as required.  For details see <a href="/man/Manage_Effects,_Generators_and_Analyzers" title="Manage Effects, Generators and Analyzers">Add / Remove Effects, Generators and Analyzers</a>.
   </td></tr>
   <tr>
   <td><b>ContrastAnalyser:</b>
   </td>
   <td><a href="/man/Analyze_Menu#contrast" title="Analyze Menu">Contrast...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Analyzes a single mono or stereo speech track to determine the average <i><b><a href="/man/Glossary#rms" title="Glossary">RMS</a></b></i> <i>difference in volume</i> (contrast) between foreground speech and background music, audience noise or similar. The purpose is to determine if the speech will be intelligible to the hard of hearing.
   </td></tr>
   <tr>
   <td><b>PlotSpectrum:</b>
   </td>
   <td><a href="/man/Analyze_Menu#plot_spectrum" title="Analyze Menu">Plot Spectrum...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Takes the selected audio (which is a set of sound pressure values at points in time) and converts it to a graph of frequencies against <i><b><a href="/man/Glossary#amplitude" title="Glossary">amplitudes</a></b></i>.
   </td></tr>
   <tr>
   <td><b>FindClipping:</b>
   </td>
   <td><a href="/man/Analyze_Menu#find_clipping" title="Analyze Menu">Find Clipping...</a>
   </td>
   <td><i>int <b>Duty Cycle Start</b>, (default:3)<br /></i>
   <p><i>int <b>Duty Cycle End</b>, (default:3)<br /></i>
   </p>
   </td>
   <td>Displays runs of <i><b><a href="/man/Glossary#clipping" title="Glossary">clipped</a></b></i> samples in a <a href="/man/Label_Tracks" title="Label Tracks">Label Track</a>, as a screen-reader accessible alternative to <span class="menu"><a href="/man/View_Menu" title="View Menu">View</a> &gt; <a href="/man/View_Menu#Show_Clipping" title="View Menu">Show Clipping</a></span>. A run must include at least one clipped sample, but may include unclipped samples too.
   </td></tr>
   <tr>
   <td><b>BeatFinder:</b>
   </td>
   <td><a href="/man/Analyze_Menu#beat_finder" title="Analyze Menu">Beat Finder...</a>
   </td>
   <td><i>int <b>thresval</b>, (default:0)<br /></i>
   </td>
   <td>Attempts to place <a href="/man/Label_Tracks" title="Label Tracks">labels</a> at beats which are much louder than the surrounding audio. It's a fairly rough and ready tool, and will not necessarily work well on a typical modern pop music track with compressed <i><b><a href="/man/Glossary#dynamic_range" title="Glossary">dynamic range</a></b></i>. If you do not get enough beats detected, try reducing the "Threshold Percentage" setting.
   </td></tr>
   <tr>
   <td><b>SilenceFinder:</b>
   </td>
   <td><a href="/man/Analyze_Menu#silence_finder" title="Analyze Menu">Silence Finder...</a>
   </td>
   <td><i>double <b>sil-lev</b>, (default:0)<br /></i>
   <p><i>double <b>sil-dur</b>, (default:0)<br /></i>
   <i>double <b>labelbeforedur</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Divides up a track by placing point <a href="/man/Label_Tracks" title="Label Tracks">labels</a> inside areas of silence.
   </td></tr>
   <tr>
   <td><b>SoundFinder:</b>
   </td>
   <td><a href="/man/Analyze_Menu#sound_finder" title="Analyze Menu">Sound Finder...</a>
   </td>
   <td><i>double <b>sil-lev</b>, (default:0)<br /></i>
   <p><i>double <b>sil-dur</b>, (default:0)<br /></i>
   <i>double <b>labelbeforedur</b>, (default:0)<br /></i>
   <i>double <b>labelafterdur</b>, (default:0)<br /></i>
   <i>int <b>finallabel</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Divides up a track by placing region <a href="/man/Label_Tracks" title="Label Tracks">labels</a> for areas of sound that are separated by silence.
   </td></tr></table>
   <div id="tools_menu"></div>
   <h2><span class="mw-headline" id="Tools_Menu"><a href="/man/Tools_Menu" title="Tools Menu">Tools Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=39" title="Edit section: Tools Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">The Tools Menu contains customisable tools. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ManageTools:</b>
   </td>
   <td><a href="/man/Tools_Menu#add_remove_plugins" title="Tools Menu">Add / Remove Plug-ins...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selecting this option from the Effect Menu (or the <a href="/man/Generate_Menu" title="Generate Menu">Generate Menu</a> or <a href="/man/Analyze_Menu" title="Analyze Menu">Analyze Menu</a>) takes you to a dialog where you can enable or disable particular Effects, Generators and Analyzers in Audacity. Even if you do not add any third-party plug-ins, you can use this to make the Effect menu shorter or longer as required.  For details see <a href="/man/Manage_Effects,_Generators_and_Analyzers" title="Manage Effects, Generators and Analyzers">Add / Remove Effects, Generators and Analyzers</a>.
   </td></tr>
   <tr>
   <td><b>ManageMacros:</b>
   </td>
   <td><a href="/man/Tools_Menu#macros" title="Tools Menu">Macros...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Creates a new macro or edits an existing macro.
   </td></tr>
   <tr>
   <td><b>Apply Macro:</b>
   </td>
   <td><a href="/man/Tools_Menu#apply_macro" title="Tools Menu">Apply Macro</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays a menu with list of all your Macros. Selecting any of these Macros by clicking on it will cause that Macro to be applied to the current project.
   </td></tr>
   <tr>
   <td><b>Screenshot:</b>
   </td>
   <td><a href="/man/Tools_Menu#screenshot" title="Tools Menu">Screenshot...</a>
   </td>
   <td><i>string <b>Path</b>, (default:)<br /></i>
   <p><i>enum <b>CaptureWhat</b>, (default:Window)<br /></i>
   </p>
   <ul><li> Window</li>
   <li> FullWindow</li>
   <li> WindowPlus</li>
   <li> Fullscreen</li>
   <li> Toolbars</li>
   <li> Effects</li>
   <li> Scriptables</li>
   <li> Preferences</li>
   <li> Selectionbar</li>
   <li> SpectralSelection</li>
   <li> Tools</li>
   <li> Transport</li>
   <li> Mixer</li>
   <li> Meter</li>
   <li> PlayMeter</li>
   <li> RecordMeter</li>
   <li> Edit</li>
   <li> Device</li>
   <li> Scrub</li>
   <li> Play-at-Speed</li>
   <li> Trackpanel</li>
   <li> Ruler</li>
   <li> Tracks</li>
   <li> FirstTrack</li>
   <li> FirstTwoTracks</li>
   <li> FirstThreeTracks</li>
   <li> FirstFourTracks</li>
   <li> SecondTrack</li>
   <li> TracksPlus</li>
   <li> FirstTrackPlus</li>
   <li> AllTracks</li>
   <li> AllTracksPlus</li></ul>
   <p><i>enum <b>Background</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Blue</li>
   <li> White</li>
   <li> None</li></ul>
   <p><i>bool <b>ToTop</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>A tool, mainly used in documentation, to capture screenshots of Audacity.
   </td></tr>
   <tr>
   <td><b>Benchmark:</b>
   </td>
   <td><a href="/man/Tools_Menu#run_benchmark" title="Tools Menu">Run Benchmark...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>A tool for measuring the performance of one part of Audacity.
   </td></tr>
   <tr>
   <td><b>NyquistPrompt:</b>
   </td>
   <td><a href="/man/Tools_Menu#nyquist_prompt" title="Tools Menu">Nyquist Prompt...</a>
   </td>
   <td><i>string <b>Command</b>, (default:)<br /></i>
   <p><i>int <b>Version</b>, (default:3)<br /></i>
   </p>
   </td>
   <td>Brings up a dialog where you can enter Nyquist commands. Nyquist is a programming language for generating, processing and analyzing audio. For more information see <a rel="nofollow" class="external text" href="http://wiki.audacityteam.org/wiki/Nyquist_Plugins_Reference">Nyquist Plug-ins Reference</a>.
   </td></tr>
   <tr>
   <td><b>RegularIntervalLabels:</b>
   </td>
   <td><a href="/man/Tools_Menu#regular_interval_labels" title="Tools Menu">Regular Interval Labels...</a>
   </td>
   <td><i>enum <b>mode</b>, (default:Number)<br /></i>
   <ul><li> Number</li>
   <li> Interval</li></ul>
   <p><i>int <b>totalnum</b>, (default:0)<br /></i>
   <i>double <b>interval</b>, (default:0)<br /></i>
   <i>enum <b>adjust</b>, (default:No)<br /></i>
   </p>
   <ul><li> No</li>
   <li> Yes</li></ul>
   <p><i>string <b>labeltext</b>, (default:)<br /></i>
   <i>enum <b>zeros</b>, (default:TextOnly)<br /></i>
   </p>
   <ul><li> TextOnly</li>
   <li> OneBefore</li>
   <li> TwoBefore</li>
   <li> ThreeBefore</li>
   <li> OneAfter</li>
   <li> TwoAfter</li>
   <li> ThreeAfter</li></ul>
   <p><i>int <b>firstnum</b>, (default:0)<br /></i>
   </p>
   </td>
   <td>Places <a href="/man/Label_Tracks" title="Label Tracks">labels</a> in a long track so as to divide it into smaller, equally sized  segments.
   </td></tr>
   <tr>
   <td><b>SampleDataExport:</b>
   </td>
   <td><a href="/man/Tools_Menu#sample_data_export" title="Tools Menu">Sample Data Export...</a>
   </td>
   <td><i>int <b>number</b>, (default:0)<br /></i>
   <p><i>enum <b>units</b>, (default:dB)<br /></i>
   </p>
   <ul><li> dB</li>
   <li> Linear</li></ul>
   <p><i>string <b>filename</b>, (default:)<br /></i>
   <i>enum <b>fileformat</b>, (default:None)<br /></i>
   </p>
   <ul><li> None</li>
   <li> Count</li>
   <li> Time</li></ul>
   <p><i>enum <b>header</b>, (default:None)<br /></i>
   </p>
   <ul><li> None</li>
   <li> Minimal</li>
   <li> Standard</li>
   <li> All</li></ul>
   <p><i>string <b>optext</b>, (default:)<br /></i>
   <i>enum <b>channel-layout</b>, (default:SameLine)<br /></i>
   </p>
   <ul><li> SameLine</li>
   <li> Alternate</li>
   <li> LFirst</li></ul>
   <p><i>enum <b>messages</b>, (default:Yes)<br /></i>
   </p>
   <ul><li> Yes</li>
   <li> Errors</li>
   <li> None</li></ul>
   </td>
   <td>Reads the values of successive samples from the selected audio and prints this data to a plain text, CSV or HTML file. Further information may be added as a "header" at the top of the file.
   </td></tr>
   <tr>
   <td><b>SampleDataImport:</b>
   </td>
   <td><a href="/man/Tools_Menu#sample_data_import" title="Tools Menu">Sample Data Import...</a>
   </td>
   <td><i>string <b>filename</b>, (default:)<br /></i>
   <p><i>enum <b>bad-data</b>, (default:ThrowError)<br /></i>
   </p>
   <ul><li> ThrowError</li>
   <li> ReadAsZero</li></ul>
   </td>
   <td>Create audio from imported numeric data.
   </td></tr></table>
   <div id="tools_apply_macro_submenu"></div>
   <h3><span class="mw-headline" id="Tools:_Apply_Macro"><a href="/man/Tools_Menu:_Apply_Macro" title="Tools Menu: Apply Macro">Tools: Apply Macro</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=40" title="Edit section: Tools: Apply Macro">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Displays a menu with list of all your Macros. Selecting any of these Macros by clicking on it will cause that Macro to be applied to the current project.  </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>ApplyMacrosPalette:</b>
   </td>
   <td><a href="/man/Tools_Menu:_Apply_Macro#palette" title="Tools Menu: Apply Macro">Palette...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays a menu with list of all your Macros which can be applied to the current project or to audio files..
   </td></tr>
   <tr>
   <td><b>Macro_FadeEnds:</b>
   </td>
   <td><a href="/man/Tools_Menu:_Apply_Macro#fade_ends" title="Tools Menu: Apply Macro">Fade Ends</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Fadees in the first second and fades out the last second of a track.
   </td></tr>
   <tr>
   <td><b>Macro_MP3Conversion:</b>
   </td>
   <td><a href="/man/Tools_Menu:_Apply_Macro#mp3_conversion" title="Tools Menu: Apply Macro">MP3 Conversion</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Converts MP3.
   </td></tr></table>
   <div id="extra_menu"></div>
   <h2><span class="mw-headline" id="Extra_Menu"><a href="/man/Extra_Menu" title="Extra Menu">Extra Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=41" title="Edit section: Extra Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">The Extra menu provides access to additional Commands that are not available in the normal default Audacity menus. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>PlayAtSpeed:</b>
   </td>
   <td><a href="/man/Extra_Menu#playatspeed" title="Extra Menu">Play-at-Speed</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Extra commands related to play at speed
   </td></tr>
   <tr>
   <td><b>FullScreenOnOff:</b>
   </td>
   <td><a href="/man/Extra_Menu#full_screen_onoff" title="Extra Menu">Full Screen (on/off)</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Toggle full screen mode with no title bar
   </td></tr></table>
   <div id="extra_transport_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Transport"><a href="/man/Extra_Menu:_Transport" title="Extra Menu: Transport">Extra: Transport</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=42" title="Edit section: Extra: Transport">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands related to play and record </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Play:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play" title="Extra Menu: Transport">Play</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Play (or stop) audio
   </td></tr>
   <tr>
   <td><b>Stop:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#stop" title="Extra Menu: Transport">Stop</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Stop audio
   </td></tr>
   <tr>
   <td><b>PlayOneSec:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play_one_second" title="Extra Menu: Transport">Play One Second</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays for one second centered on the current <b>mouse pointer</b> position (not from the current cursor position). See <a href="/man/Playing_and_Recording#Play_One_Second_.281.29" title="Playing and Recording">this page</a> for an example.
   </td></tr>
   <tr>
   <td><b>PlayToSelection:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play_to_selection" title="Extra Menu: Transport">Play to Selection</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays to or from the current <b>mouse pointer</b> position to or from the start or end of the selection, depending on the pointer position. See <a href="/man/Playing_and_Recording#Play_To_Selection_.28B.29" title="Playing and Recording">this page</a> for more details.
   </td></tr>
   <tr>
   <td><b>PlayBeforeSelectionStart:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play_before_selection_start" title="Extra Menu: Transport">Play Before Selection Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays a short period before the start of the selected audio, the period before shares the setting of the cut preview.
   </td></tr>
   <tr>
   <td><b>PlayAfterSelectionStart:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play_after_selection_start" title="Extra Menu: Transport">Play After Selection Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays a short period after the start of the selected audio, the period after shares the setting of the cut preview.
   </td></tr>
   <tr>
   <td><b>PlayBeforeSelectionEnd:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play_before_selection_end" title="Extra Menu: Transport">Play Before Selection End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays a short period before the end of the selected audio, the period before shares the setting of the cut preview.
   </td></tr>
   <tr>
   <td><b>PlayAfterSelectionEnd:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play_after_selection_end" title="Extra Menu: Transport">Play After Selection End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays a short period after the end of the selected audio, the period after shares the setting of the cut preview.
   </td></tr>
   <tr>
   <td><b>PlayBeforeAndAfterSelectionStart:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play_before_and_after_selection_start" title="Extra Menu: Transport">Play Before and After Selection Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays a short period  before and after the start of the selected audio, the periods before and after share the setting of the cut preview.
   </td></tr>
   <tr>
   <td><b>PlayBeforeAndAfterSelectionEnd:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play_before_and_after_selection_end" title="Extra Menu: Transport">Play Before and After Selection End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays a short period  before and after the end of the selected audio, the periods before and after share the setting of the cut preview.
   </td></tr>
   <tr>
   <td><b>PlayCutPreview:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Transport#play_cut_preview" title="Extra Menu: Transport">Play Cut Preview</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Plays audio excluding the selection
   </td></tr></table>
   <div id="extra_tools_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Tools"><a href="/man/Extra_Menu:_Tools" title="Extra Menu: Tools">Extra: Tools</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=43" title="Edit section: Extra: Tools">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands to select the tool, e.g. time-shift, envelopes, multi-tool. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SelectTool:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Tools#selection_tool" title="Extra Menu: Tools">Selection Tool</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Chooses Selection tool.
   </td></tr>
   <tr>
   <td><b>EnvelopeTool:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Tools#envelope_tool" title="Extra Menu: Tools">Envelope Tool</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Chooses Envelope tool.
   </td></tr>
   <tr>
   <td><b>DrawTool:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Tools#draw_tool" title="Extra Menu: Tools">Draw Tool</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Chooses Draw tool.
   </td></tr>
   <tr>
   <td><b>ZoomTool:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Tools#zoom_tool" title="Extra Menu: Tools">Zoom Tool</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Chooses Zoom tool.
   </td></tr>
   <tr>
   <td><b>TimeShiftTool:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Tools#time_shift_tool" title="Extra Menu: Tools">Time Shift Tool</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Chooses Time Shift tool.
   </td></tr>
   <tr>
   <td><b>MultiTool:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Tools#multi_tool" title="Extra Menu: Tools">Multi Tool</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Chooses the Multi-Tool
   </td></tr>
   <tr>
   <td><b>PrevTool:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Tools#previous_tool" title="Extra Menu: Tools">Previous Tool</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Cycles backwards through the tools, starting from the currently selected tool: starting from Selection, it would navigate to Multi-tool to Time Shift to Zoom to Draw to Envelope to Selection.
   </td></tr>
   <tr>
   <td><b>NextTool:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Tools#next_tool" title="Extra Menu: Tools">Next Tool</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Cycles forwards through the tools, starting from the currently selected tool: starting from Selection, it would navigate to Envelope to Draw to Zoom to Time Shift to Multi-tool to Selection.
   </td></tr></table>
   <div id="extra_mixer_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Mixer"><a href="/man/Extra_Menu:_Mixer" title="Extra Menu: Mixer">Extra: Mixer</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=44" title="Edit section: Extra: Mixer">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands related to volume </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>OutputGain:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Mixer#adjust_playback_volume" title="Extra Menu: Mixer">Adjust Playback Volume...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays the Playback Volume dialog. You can type a new value for the playback volume (between 0 and 1), or press <span class="kbrd" style="background-color: #e0e0f0">Tab</span>, then use the left and right arrow keys to adjust the slider.
   </td></tr>
   <tr>
   <td><b>OutputGainInc:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Mixer#increase_playback_volume" title="Extra Menu: Mixer">Increase Playback Volume</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Each key press will increase the playback volume by 0.1.
   </td></tr>
   <tr>
   <td><b>OutputGainDec:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Mixer#decrease_playback_volume" title="Extra Menu: Mixer">Decrease Playback Volume</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Each key press will decrease the playback volume by 0.1.
   </td></tr>
   <tr>
   <td><b>InputGain:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Mixer#adjust_recording_volume" title="Extra Menu: Mixer">Adjust Recording Volume...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays the Recording Volume dialog. You can type a new value for the recording volume (between 0 and 1), or press <span class="kbrd" style="background-color: #e0e0f0">Tab</span>, then use the left and right arrow keys to adjust the slider.
   </td></tr>
   <tr>
   <td><b>InputGainInc:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Mixer#increase_recording_volume" title="Extra Menu: Mixer">Increase Recording Volume</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Each key press will increase the recording volume by 0.1.
   </td></tr>
   <tr>
   <td><b>InputGainDec:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Mixer#decrease_recording_volume" title="Extra Menu: Mixer">Decrease Recording Volume</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Each key press will decrease the recording volume by 0.1.
   </td></tr></table>
   <div id="extra_edit_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Edit"><a href="/man/Extra_Menu:_Edit" title="Extra Menu: Edit">Extra: Edit</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=45" title="Edit section: Extra: Edit">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands related to editing </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>DeleteKey:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Edit#delete_key" title="Extra Menu: Edit">Delete Key</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Deletes the selection. When focus is in <a href="/man/Selection_Toolbar" title="Selection Toolbar">Selection Toolbar</a>, BACKSPACE is not a shortcut but navigates back to the previous digit and sets it to zero.
   </td></tr>
   <tr>
   <td><b>DeleteKey2:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Edit#delete_key2" title="Extra Menu: Edit">Delete Key2</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Deletes the selection.
   </td></tr></table>
   <div id="extra_playatspeed_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Play-at-Speed"><a href="/man/Extra_Menu:_Play-at-Speed" title="Extra Menu: Play-at-Speed">Extra: Play-at-Speed</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=46" title="Edit section: Extra: Play-at-Speed">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands related to play at speed </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>NormalPlayAtSpeed:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Play-at-Speed#normal_playatspeed" title="Extra Menu: Play-at-Speed">Normal Play-at-Speed</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Play audio at a faster or slower speed
   </td></tr>
   <tr>
   <td><b>PlayAtSpeedLooped:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Play-at-Speed#loop_playatspeed" title="Extra Menu: Play-at-Speed">Loop Play-at-Speed</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Combines looped play and play at speed
   </td></tr>
   <tr>
   <td><b>PlayAtSpeedCutPreview:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Play-at-Speed#play_cut_previewatspeed" title="Extra Menu: Play-at-Speed">Play Cut Preview-at-Speed</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Combines cut preview and play at speed
   </td></tr>
   <tr>
   <td><b>SetPlaySpeed:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Play-at-Speed#adjust_playback_speed" title="Extra Menu: Play-at-Speed">Adjust Playback Speed...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays the Playback Speed dialog. You can type a new value for the playback volume (between 0 and 1), or press <span class="kbrd" style="background-color: #e0e0f0">Tab</span>, then use the left and right arrow keys to adjust the slider.
   </td></tr>
   <tr>
   <td><b>PlaySpeedInc:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Play-at-Speed#increase_playback_speed" title="Extra Menu: Play-at-Speed">Increase Playback Speed</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Each key press will increase the playback speed by 0.1.
   </td></tr>
   <tr>
   <td><b>PlaySpeedDec:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Play-at-Speed#decrease_playback_speed" title="Extra Menu: Play-at-Speed">Decrease Playback Speed</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Each key press will decrease the playback speed by 0.1.
   </td></tr>
   <tr>
   <td><b>MoveToPrevLabel:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Play-at-Speed#move_to_previous_label" title="Extra Menu: Play-at-Speed">Move to Previous Label</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves selection to the previous label
   </td></tr>
   <tr>
   <td><b>MoveToNextLabel:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Play-at-Speed#move_to_next_label" title="Extra Menu: Play-at-Speed">Move to Next Label</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves selection to the next label
   </td></tr></table>
   <div id="extra_seek_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Seek"><a href="/man/Extra_Menu:_Seek" title="Extra Menu: Seek">Extra: Seek</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=47" title="Edit section: Extra: Seek">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands related to seeking </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SeekLeftShort:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Seek#short_seek_left_during_playback" title="Extra Menu: Seek">Short Seek Left During Playback</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Skips the playback cursor back one second by default.
   </td></tr>
   <tr>
   <td><b>SeekRightShort:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Seek#short_seek_right_during_playback" title="Extra Menu: Seek">Short Seek Right During Playback</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Skips the playback cursor forward one second by default.
   </td></tr>
   <tr>
   <td><b>SeekLeftLong:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Seek#long_seek_left_during_playback" title="Extra Menu: Seek">Long Seek Left During Playback</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Skips the playback cursor back 15 seconds by default.
   </td></tr>
   <tr>
   <td><b>SeekRightLong:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Seek#long_seek_right_during_playback" title="Extra Menu: Seek">Long Seek Right During Playback</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Skips the playback cursor forward 15 seconds by default.
   </td></tr></table>
   <div id="extra_device_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Device"><a href="/man/Extra_Menu:_Device" title="Extra Menu: Device">Extra: Device</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=48" title="Edit section: Extra: Device">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands related to selecting a device </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>InputDevice:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Device#change_recording_device" title="Extra Menu: Device">Change Recording Device...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays the Select recording Device dialog for choosing the recording device, but only if the "Recording Device" dropdown menu in Device Toolbar has entries for devices. Otherwise, an recording error message will be displayed.
   </td></tr>
   <tr>
   <td><b>OutputDevice:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Device#change_playback_device" title="Extra Menu: Device">Change Playback Device...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays the Select Playback Device dialog for choosing the playback device, but only if the "Playback Device" dropdown menu in Device Toolbar has entries for devices. Otherwise, an error message will be displayed.
   </td></tr>
   <tr>
   <td><b>AudioHost:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Device#change_audio_host" title="Extra Menu: Device">Change Audio Host...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays the Select Audio Host dialog for choosing the particular interface with which Audacity communicates with your chosen playback and recording devices.
   </td></tr>
   <tr>
   <td><b>InputChannels:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Device#change_recording_channels" title="Extra Menu: Device">Change Recording Channels...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Displays the Select Recording Channels dialog for choosing the number of channels to be recorded by the chosen recording device.
   </td></tr></table>
   <div id="extra_selection_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Selection"><a href="/man/Extra_Menu:_Selection" title="Extra Menu: Selection">Extra: Selection</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=49" title="Edit section: Extra: Selection">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands related to selecting. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SnapToOff:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#snapto_off" title="Extra Menu: Selection">Snap-To Off</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Equivalent to setting the Snap To control in Selection Toolbar to "Off".
   </td></tr>
   <tr>
   <td><b>SnapToNearest:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#snapto_nearest" title="Extra Menu: Selection">Snap-To Nearest</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Equivalent to setting the Snap To control in Selection Toolbar to "Nearest".
   </td></tr>
   <tr>
   <td><b>SnapToPrior:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#snapto_prior" title="Extra Menu: Selection">Snap-To Prior</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Equivalent to setting the Snap To control in Selection Toolbar to "Prior".
   </td></tr>
   <tr>
   <td><b>SelStart:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#selection_to_start" title="Extra Menu: Selection">Selection to Start</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Select from cursor to start of track
   </td></tr>
   <tr>
   <td><b>SelEnd:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#selection_to_end" title="Extra Menu: Selection">Selection to End</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Select from cursor to end of track
   </td></tr>
   <tr>
   <td><b>SelExtLeft:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#selection_extend_left" title="Extra Menu: Selection">Selection Extend Left</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Increases the size of the selection by extending it to the left. The amount of increase is dependent on the zoom level. If there is no selection one is created starting at the cursor position.
   </td></tr>
   <tr>
   <td><b>SelExtRight:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#selection_extend_right" title="Extra Menu: Selection">Selection Extend Right</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Increases the size of the selection by extending it to the right. The amount of increase is dependent on the zoom level. If there is no selection one is created starting at the cursor position.
   </td></tr>
   <tr>
   <td><b>SelSetExtLeft:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#set_or_extend_left_selection" title="Extra Menu: Selection">Set (or Extend) Left Selection</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Extend selection left a little (is this a duplicate?)
   </td></tr>
   <tr>
   <td><b>SelSetExtRight:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#set_or_extend_right_selection" title="Extra Menu: Selection">Set (or Extend) Right Selection</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Extend selection right a litlle (is this a duplicate?)
   </td></tr>
   <tr>
   <td><b>SelCntrLeft:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#selection_contract_left" title="Extra Menu: Selection">Selection Contract Left</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Decreases the size of the selection by contracting it from the right. The amount of decrease is dependent on the zoom level. If there is no selection no action is taken.
   </td></tr>
   <tr>
   <td><b>SelCntrRight:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Selection#selection_contract_right" title="Extra Menu: Selection">Selection Contract Right</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Decreases the size of the selection by contracting it from the left. The amount of decrease is dependent on the zoom level. If there is no selection no action is taken.
   </td></tr></table>
   <div id="extra_focus_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Focus"><a href="/man/Extra_Menu:_Focus" title="Extra Menu: Focus">Extra: Focus</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=50" title="Edit section: Extra: Focus">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands to set focus, usually focus on one track </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>PrevFrame:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#move_backward_from_toolbars_to_tracks" title="Extra Menu: Focus">Move Backward from Toolbars to Tracks</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Move backward through currently focused toolbar in <a href="/man/Toolbars_Overview#upper_tooldock" title="Toolbars Overview">Upper Toolbar dock area</a>, Track View and currently focused toolbar in <a href="/man/Toolbars_Overview#lower_tooldock" title="Toolbars Overview">Lower Toolbar dock area</a>.  Each use moves the keyboard focus as indicated.
   </td></tr>
   <tr>
   <td><b>NextFrame:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#move_forward_from_toolbars_to_tracks" title="Extra Menu: Focus">Move Forward from Toolbars to Tracks</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Move forward through currently focused toolbar in <a href="/man/Toolbars_Overview#upper_tooldock" title="Toolbars Overview">Upper Toolbar dock area</a>, Track View and currently focused toolbar in <a href="/man/Toolbars_Overview#lower_tooldock" title="Toolbars Overview">Lower Toolbar dock area</a>.  Each use moves the keyboard focus as indicated.
   </td></tr>
   <tr>
   <td><b>PrevTrack:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#move_focus_to_previous_track" title="Extra Menu: Focus">Move Focus to Previous Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Focus one track up
   </td></tr>
   <tr>
   <td><b>NextTrack:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#move_focus_to_next_track" title="Extra Menu: Focus">Move Focus to Next Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Focus one track down
   </td></tr>
   <tr>
   <td><b>FirstTrack:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#move_focus_to_first_track" title="Extra Menu: Focus">Move Focus to First Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Focus on first track
   </td></tr>
   <tr>
   <td><b>LastTrack:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#move_focus_to_last_track" title="Extra Menu: Focus">Move Focus to Last Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Focus on last track
   </td></tr>
   <tr>
   <td><b>ShiftUp:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#move_focus_to_previous_and_select" title="Extra Menu: Focus">Move Focus to Previous and Select</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Focus one track up and select it
   </td></tr>
   <tr>
   <td><b>ShiftDown:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#move_focus_to_next_and_select" title="Extra Menu: Focus">Move Focus to Next and Select</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Focus one track down and select it
   </td></tr>
   <tr>
   <td><b>Toggle:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#toggle_focused_track" title="Extra Menu: Focus">Toggle Focused Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Toggle focus on current track
   </td></tr>
   <tr>
   <td><b>ToggleAlt:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Focus#toggle_focused_track" title="Extra Menu: Focus">Toggle Focused Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Toggle focus on current track
   </td></tr></table>
   <div id="extra_cursor_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Cursor"><a href="/man/Extra_Menu:_Cursor" title="Extra Menu: Cursor">Extra: Cursor</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=51" title="Edit section: Extra: Cursor">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands to move the cursor </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>CursorLeft:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Cursor#cursor_left" title="Extra Menu: Cursor">Cursor Left</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When not playing audio, moves the editing cursor one screen pixel to left. When a <a href="/man/Selection_Toolbar#snap" title="Selection Toolbar">Snap To</a> option is chosen, moves the cursor to the preceding unit of time as determined by the current <a href="/man/Audacity_Selection#selection_formats" title="Audacity Selection">selection format</a>. If the key is held down, the cursor speed depends on the length of the tracks. When playing audio, moves the playback cursor as described at "Cursor Short Jump Left"
   </td></tr>
   <tr>
   <td><b>CursorRight:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Cursor#cursor_right" title="Extra Menu: Cursor">Cursor Right</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When not playing audio, moves the editing cursor one screen pixel to right. When a <a href="/man/Selection_Toolbar#snap" title="Selection Toolbar">Snap To</a> option is chosen, moves the cursor to the following unit of time as determined by the current <a href="/man/Audacity_Selection#selection_formats" title="Audacity Selection">selection format</a>. If the key is held down, the cursor speed depends on the length of the tracks. When playing audio, moves the playback cursor as described at "Cursor Short Jump Right"
   </td></tr>
   <tr>
   <td><b>CursorShortJumpLeft:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Cursor#cursor_short_jump_left" title="Extra Menu: Cursor">Cursor Short Jump Left</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When not playing audio, moves the editing cursor one second left by default. When playing audio, moves the playback cursor one second left by default. The default value can be changed by adjusting the "Short Period" under "Seek Time when playing" in <a href="/man/Playback_Preferences" title="Playback Preferences">Playback Preferences</a>.
   </td></tr>
   <tr>
   <td><b>CursorShortJumpRight:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Cursor#cursor_short_jump_right" title="Extra Menu: Cursor">Cursor Short Jump Right</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When not playing audio, moves the editing cursor one second right by default. When playing audio, moves the playback cursor one second right by default. The default value can be changed by adjusting the "Short Period" under "Seek Time when playing" in <a href="/man/Playback_Preferences" title="Playback Preferences">Playback Preferences</a>.
   </td></tr>
   <tr>
   <td><b>CursorLongJumpLeft:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Cursor#cursor_long_jump_left" title="Extra Menu: Cursor">Cursor Long Jump Left</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When not playing audio, moves the editing cursor 15 seconds left by default. When playing audio, moves the playback cursor 15 seconds left by default. The default value can be changed by adjusting the "Long Period" under "Seek Time when playing" in <a href="/man/Playback_Preferences" title="Playback Preferences">Playback Preferences</a>.
   </td></tr>
   <tr>
   <td><b>CursorLongJumpRight:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Cursor#cursor_long_jump_right" title="Extra Menu: Cursor">Cursor Long Jump Right</a>
   </td>
   <td><i>none</i>
   </td>
   <td>When not playing audio, moves the editing cursor 15 seconds right by default. When playing audio, moves the playback cursor 15 seconds right by default. The default value can be changed by adjusting the "Long Period" under "Seek Time when playing" in <a href="/man/Playback_Preferences" title="Playback Preferences">Playback Preferences</a>.
   </td></tr>
   <tr>
   <td><b>ClipLeft:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Cursor#clip_left" title="Extra Menu: Cursor">Clip Left</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the <a href="/man/Audio_Tracks#focus" title="Audio Tracks">currently focused</a> audio track (or a separate <a href="/man/Audacity_Tracks_and_Clips" title="Audacity Tracks and Clips">clip</a> in that track which contains the editing cursor or <a href="/man/Audacity_Selection" title="Audacity Selection">selection region</a>) one screen pixel to left.
   </td></tr>
   <tr>
   <td><b>ClipRight:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Cursor#clip_right" title="Extra Menu: Cursor">Clip Right</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the <a href="/man/Audio_Tracks#focus" title="Audio Tracks">currently focused</a> audio track (or a separate <a href="/man/Audacity_Tracks_and_Clips" title="Audacity Tracks and Clips">clip</a> in that track which contains the editing cursor or <a href="/man/Audacity_Selection" title="Audacity Selection">selection region</a>) one screen pixel to right.
   </td></tr></table>
   <div id="extra_track_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Track"><a href="/man/Extra_Menu:_Track" title="Extra Menu: Track">Extra: Track</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=52" title="Edit section: Extra: Track">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Extra commands to operate on a track that has focus </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>TrackPan:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#change_pan_on_focused_track" title="Extra Menu: Track">Change Pan on Focused Track...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Brings up the Pan dialog for the focused track where you can enter a pan value, or use the slider for finer control of panning than is available when using the track pan slider.
   </td></tr>
   <tr>
   <td><b>TrackPanLeft:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#pan_left_on_focused_track" title="Extra Menu: Track">Pan Left on Focused Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Controls the pan slider on the focused track. Each keypress changes the pan value by 10% left.
   </td></tr>
   <tr>
   <td><b>TrackPanRight:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#pan_right_on_focused_track" title="Extra Menu: Track">Pan Right on Focused Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Controls the pan slider on the focused track. Each keypress changes the pan value by 10% right.
   </td></tr>
   <tr>
   <td><b>TrackGain:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#change_gain_on_focused_track" title="Extra Menu: Track">Change Gain on Focused Track...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Brings up the Gain dialog for the focused track where you can enter a gain value, or use the slider for finer control of gain than is available when using the track pan slider.
   </td></tr>
   <tr>
   <td><b>TrackGainInc:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#increase_gain_on_focused_track" title="Extra Menu: Track">Increase Gain on Focused Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Controls the gain slider on the focused track. Each keypress increases the gain value by 1 dB.
   </td></tr>
   <tr>
   <td><b>TrackGainDec:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#decrease_gain_on_focused_track" title="Extra Menu: Track">Decrease Gain on Focused Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Controls the gain slider on the focused track. Each keypress decreases the gain value by 1 dB.
   </td></tr>
   <tr>
   <td><b>TrackMenu:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#open_menu_on_focused_track" title="Extra Menu: Track">Open Menu on Focused Track...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Opens the <a href="/man/Audio_Track_Dropdown_Menu" title="Audio Track Dropdown Menu">Audio Track Dropdown Menu</a> on the focused <a href="/man/Audio_Tracks" title="Audio Tracks">audio track</a> or <a href="/man/Tracks" title="Tracks">other track type</a>. In the audio track dropdown, use <span class="kbrd" style="background-color: #e0e0f0">Up</span>, and <span class="kbrd" style="background-color: #e0e0f0">Down</span>, arrow keys to navigate the menu and <span class="kbrd" style="background-color: #e0e0f0">Enter</span>, to select a menu item. Use <span class="kbrd" style="background-color: #e0e0f0">Right</span>, arrow to open the "Set Sample Format" and "Set Rate" choices or <span class="kbrd" style="background-color: #e0e0f0">Left</span>, arrow to leave those choices.
   </td></tr>
   <tr>
   <td><b>TrackMute:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#muteunmute_focused_track" title="Extra Menu: Track">Mute/Unmute Focused Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Toggles the Mute button on the focused track.
   </td></tr>
   <tr>
   <td><b>TrackSolo:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#solounsolo_focused_track" title="Extra Menu: Track">Solo/Unsolo Focused Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Toggles the Solo button on the focused track.
   </td></tr>
   <tr>
   <td><b>TrackClose:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#close_focused_track" title="Extra Menu: Track">Close Focused Track</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Close (remove) the focused track only.
   </td></tr>
   <tr>
   <td><b>TrackMoveUp:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#move_focused_track_up" title="Extra Menu: Track">Move Focused Track Up</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the focused track up by one track and moves the focus there.
   </td></tr>
   <tr>
   <td><b>TrackMoveDown:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#move_focused_track_down" title="Extra Menu: Track">Move Focused Track Down</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the focused track down by one track and moves the focus there.
   </td></tr>
   <tr>
   <td><b>TrackMoveTop:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#move_focused_track_to_top" title="Extra Menu: Track">Move Focused Track to Top</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the focused track up to the top of the track table and moves the focus there.
   </td></tr>
   <tr>
   <td><b>TrackMoveBottom:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Track#move_focused_track_to_bottom" title="Extra Menu: Track">Move Focused Track to Bottom</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Moves the focused track down to the bottom of the track table and moves the focus there.
   </td></tr></table>
   <div id="extra_scriptables_i_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Scriptables_I"><a href="/man/Extra_Menu:_Scriptables_I" title="Extra Menu: Scriptables I">Extra: Scriptables I</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=53" title="Edit section: Extra: Scriptables I">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">These commands were originally written for scripting Audacity, e.g via a Python script that use mod-script-pipe.  The commands though are also present in the menu, available from macros, and available from within Nyquist using (AUD-DO "command") </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>SelectTime:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#select_time" title="Extra Menu: Scriptables I">Select Time...</a>
   </td>
   <td><i>double <b>Start</b>, (default:unchanged)<br /></i>
   <p><i>double <b>End</b>, (default:unchanged)<br /></i>
   <i>enum <b>RelativeTo</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> ProjectStart</li>
   <li> Project</li>
   <li> ProjectEnd</li>
   <li> SelectionStart</li>
   <li> Selection</li>
   <li> SelectionEnd</li></ul>
   </td>
   <td>Selects audio.  Start and End are time.  First and Last are track numbers.  High and Low are for spectral selection.  FromEnd allows selection from the end, which is handy e.g. to fade in and fade out a track.  The Mode parameter allows complex selections, e.g adding or removing tracks from the current selection.
   </td></tr>
   <tr>
   <td><b>SelectFrequencies:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#select_frequencies" title="Extra Menu: Scriptables I">Select Frequencies...</a>
   </td>
   <td><i>double <b>High</b>, (default:unchanged)<br /></i>
   <p><i>double <b>Low</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Selects audio.  Start and End are time.  First and Last are track numbers.  High and Low are for spectral selection.  FromEnd allows selection from the end, which is handy e.g. to fade in and fade out a track.  The Mode parameter allows complex selections, e.g adding or removing tracks from the current selection.
   </td></tr>
   <tr>
   <td><b>SelectTracks:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#select_tracks" title="Extra Menu: Scriptables I">Select Tracks...</a>
   </td>
   <td><i>double <b>Track</b>, (default:unchanged)<br /></i>
   <p><i>double <b>TrackCount</b>, (default:unchanged)<br /></i>
   <i>enum <b>Mode</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Set</li>
   <li> Add</li>
   <li> Remove</li></ul>
   </td>
   <td>Selects audio.  Start and End are time.  First and Last are track numbers.  High and Low are for spectral selection.  FromEnd allows selection from the end, which is handy e.g. to fade in and fade out a track.  The Mode parameter allows complex selections, e.g adding or removing tracks from the current selection.
   </td></tr>
   <tr>
   <td><b>SetTrackStatus:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#set_track_status" title="Extra Menu: Scriptables I">Set Track Status...</a>
   </td>
   <td><i>string <b>Name</b>, (default:unchanged)<br /></i>
   <p><i>bool <b>Selected</b>, (default:unchanged)<br /></i>
   <i>bool <b>Focused</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Sets properties for a track or channel (or both).  Setting one channel of a stereo track can lead to interesting results.  That's most used when setting relative sizing of the two channels.  SpectralPrefs=1 sets the track to use general preferences, SpectralPrefs=1 per track prefs. When using general preferences, SetPreferences can be used ot change a preference and so affect display of the track.  Name is used to set the name.  It is not used in choosing the track.
   </td></tr>
   <tr>
   <td><b>SetTrackAudio:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#set_track_audio" title="Extra Menu: Scriptables I">Set Track Audio...</a>
   </td>
   <td><i>bool <b>Mute</b>, (default:unchanged)<br /></i>
   <p><i>bool <b>Solo</b>, (default:unchanged)<br /></i>
   <i>double <b>Gain</b>, (default:unchanged)<br /></i>
   <i>double <b>Pan</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Sets properties for a track or channel (or both).  Setting one channel of a stereo track can lead to interesting results.  That's most used when setting relative sizing of the two channels.  SpectralPrefs=1 sets the track to use general preferences, SpectralPrefs=1 per track prefs. When using general preferences, SetPreferences can be used ot change a preference and so affect display of the track.  Name is used to set the name.  It is not used in choosing the track.
   </td></tr>
   <tr>
   <td><b>SetTrackVisuals:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#set_track_visuals" title="Extra Menu: Scriptables I">Set Track Visuals...</a>
   </td>
   <td><i>int <b>Height</b>, (default:unchanged)<br /></i>
   <p><i>enum <b>Display</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Waveform</li>
   <li> Spectrogram</li></ul>
   <p><i>enum <b>Scale</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Linear</li>
   <li> dB</li></ul>
   <p><i>enum <b>Color</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Color0</li>
   <li> Color1</li>
   <li> Color2</li>
   <li> Color3</li></ul>
   <p><i>enum <b>VZoom</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Reset</li>
   <li> Times2</li>
   <li> HalfWave</li></ul>
   <p><i>bool <b>SpecPrefs</b>, (default:unchanged)<br /></i>
   <i>bool <b>SpectralSel</b>, (default:unchanged)<br /></i>
   <i>bool <b>GrayScale</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Sets properties for a track or channel (or both).  Setting one channel of a stereo track can lead to interesting results.  That's most used when setting relative sizing of the two channels.  SpectralPrefs=1 sets the track to use general preferences, SpectralPrefs=1 per track prefs. When using general preferences, SetPreferences can be used ot change a preference and so affect display of the track.  Name is used to set the name.  It is not used in choosing the track.
   </td></tr>
   <tr>
   <td><b>GetPreference:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#get_preference" title="Extra Menu: Scriptables I">Get Preference...</a>
   </td>
   <td><i>string <b>Name</b>, (default:)<br /></i>
   </td>
   <td>Gets a single preference setting.
   </td></tr>
   <tr>
   <td><b>SetPreference:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#set_preference" title="Extra Menu: Scriptables I">Set Preference...</a>
   </td>
   <td><i>string <b>Name</b>, (default:)<br /></i>
   <p><i>string <b>Value</b>, (default:)<br /></i>
   <i>bool <b>Reload</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Sets a single preference setting.  Some settings such as them changes require a reload (use Reload=1), but this takes time and slows down a script.
   </td></tr>
   <tr>
   <td><b>SetClip:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#set_clip" title="Extra Menu: Scriptables I">Set Clip...</a>
   </td>
   <td><i>double <b>At</b>, (default:unchanged)<br /></i>
   <p><i>enum <b>Color</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Color0</li>
   <li> Color1</li>
   <li> Color2</li>
   <li> Color3</li></ul>
   <p><i>double <b>Start</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Modify a clip by stating the track or channel a time within it. Color and start position can be set.  Try to avoid overlapping clips, as Audacity will allow it, but does not like them.
   </td></tr>
   <tr>
   <td><b>SetEnvelope:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#set_envelope" title="Extra Menu: Scriptables I">Set Envelope...</a>
   </td>
   <td><i>double <b>Time</b>, (default:unchanged)<br /></i>
   <p><i>double <b>Value</b>, (default:unchanged)<br /></i>
   <i>bool <b>Delete</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Modify an envelope by specifying a track or channel and a time within it.  You can't yet delete individual envelope points, but can delete the whole envelope using Delete=1.
   </td></tr>
   <tr>
   <td><b>SetLabel:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#set_label" title="Extra Menu: Scriptables I">Set Label...</a>
   </td>
   <td><i>int <b>Label</b>, (default:0)<br /></i>
   <p><i>string <b>Text</b>, (default:unchanged)<br /></i>
   <i>double <b>Start</b>, (default:unchanged)<br /></i>
   <i>double <b>End</b>, (default:unchanged)<br /></i>
   <i>bool <b>Selected</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Modifies an existing label.  You must give it the label number.
   </td></tr>
   <tr>
   <td><b>SetProject:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_I#set_project" title="Extra Menu: Scriptables I">Set Project...</a>
   </td>
   <td><i>string <b>Name</b>, (default:unchanged)<br /></i>
   <p><i>int <b>X</b>, (default:unchanged)<br /></i>
   <i>int <b>Y</b>, (default:unchanged)<br /></i>
   <i>int <b>Width</b>, (default:unchanged)<br /></i>
   <i>int <b>Height</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Sets the project window to a particular location and size.  Can also change the caption - but that is cosmetic and may be overwritten again  later by Audacity.
   </td></tr></table>
   <div id="extra_scriptables_ii_submenu"></div>
   <h3><span class="mw-headline" id="Extra:_Scriptables_II"><a href="/man/Extra_Menu:_Scriptables_II" title="Extra Menu: Scriptables II">Extra: Scriptables II</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=54" title="Edit section: Extra: Scriptables II">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">Like Scriptables I, but these ones are less commonly used from the menu. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>Select:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#select" title="Extra Menu: Scriptables II">Select...</a>
   </td>
   <td><i>double <b>Start</b>, (default:unchanged)<br /></i>
   <p><i>double <b>End</b>, (default:unchanged)<br /></i>
   <i>enum <b>RelativeTo</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> ProjectStart</li>
   <li> Project</li>
   <li> ProjectEnd</li>
   <li> SelectionStart</li>
   <li> Selection</li>
   <li> SelectionEnd</li></ul>
   <p><i>double <b>High</b>, (default:unchanged)<br /></i>
   <i>double <b>Low</b>, (default:unchanged)<br /></i>
   <i>double <b>Track</b>, (default:unchanged)<br /></i>
   <i>double <b>TrackCount</b>, (default:unchanged)<br /></i>
   <i>enum <b>Mode</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Set</li>
   <li> Add</li>
   <li> Remove</li></ul>
   </td>
   <td>Selects audio.  Start and End are time.  First and Last are track numbers.  High and Low are for spectral selection.  FromEnd allows selection from the end, which is handy e.g. to fade in and fade out a track.  The Mode parameter allows complex selections, e.g adding or removing tracks from the current selection.
   </td></tr>
   <tr>
   <td><b>SetTrack:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#set_track" title="Extra Menu: Scriptables II">Set Track...</a>
   </td>
   <td><i>string <b>Name</b>, (default:unchanged)<br /></i>
   <p><i>bool <b>Selected</b>, (default:unchanged)<br /></i>
   <i>bool <b>Focused</b>, (default:unchanged)<br /></i>
   <i>bool <b>Mute</b>, (default:unchanged)<br /></i>
   <i>bool <b>Solo</b>, (default:unchanged)<br /></i>
   <i>double <b>Gain</b>, (default:unchanged)<br /></i>
   <i>double <b>Pan</b>, (default:unchanged)<br /></i>
   <i>int <b>Height</b>, (default:unchanged)<br /></i>
   <i>enum <b>Display</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Waveform</li>
   <li> Spectrogram</li></ul>
   <p><i>enum <b>Scale</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Linear</li>
   <li> dB</li></ul>
   <p><i>enum <b>Color</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Color0</li>
   <li> Color1</li>
   <li> Color2</li>
   <li> Color3</li></ul>
   <p><i>enum <b>VZoom</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Reset</li>
   <li> Times2</li>
   <li> HalfWave</li></ul>
   <p><i>bool <b>SpecPrefs</b>, (default:unchanged)<br /></i>
   <i>bool <b>SpectralSel</b>, (default:unchanged)<br /></i>
   <i>bool <b>GrayScale</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Sets properties for a track or channel (or both).  Setting one channel of a stereo track can lead to interesting results.  That's most used when setting relative sizing of the two channels.  SpectralPrefs=1 sets the track to use general preferences, SpectralPrefs=1 per track prefs. When using general preferences, SetPreferences can be used to change a preference and so affect display of the track.  Name is used to set the name.  It is not used in choosing the track.
   </td></tr>
   <tr>
   <td><b>GetInfo:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#get_info" title="Extra Menu: Scriptables II">Get Info...</a>
   </td>
   <td><i>enum <b>Type</b>, (default:Commands)<br /></i>
   <ul><li> Commands</li>
   <li> Menus</li>
   <li> Preferences</li>
   <li> Tracks</li>
   <li> Clips</li>
   <li> Envelopes</li>
   <li> Labels</li>
   <li> Boxes</li></ul>
   <p><i>enum <b>Format</b>, (default:JSON)<br /></i>
   </p>
   <ul><li> JSON</li>
   <li> LISP</li>
   <li> Brief</li></ul>
   </td>
   <td>Gets information in a list in one of three formats.  Commands+ does not yet work, but is intended to include menu commands.
   </td></tr>
   <tr>
   <td><b>Message:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#message" title="Extra Menu: Scriptables II">Message...</a>
   </td>
   <td><i>string <b>Text</b>, (default:Some message)<br /></i>
   </td>
   <td>Used in testing.  Sends the Text string back to you.
   </td></tr>
   <tr>
   <td><b>Help:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#help" title="Extra Menu: Scriptables II">Help...</a>
   </td>
   <td><i>string <b>Command</b>, (default:Help)<br /></i>
   </td>
   <td>This is an extract from GetInfo Commands, with just one command.
   </td></tr>
   <tr>
   <td><b>Import2:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#import" title="Extra Menu: Scriptables II">Import...</a>
   </td>
   <td><i>string <b>Filename</b>, (default:)<br /></i>
   </td>
   <td>Imports from a file.  The automation command uses a text box to get the file name rather than a normal file-open dialog.
   </td></tr>
   <tr>
   <td><b>Export2:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#export" title="Extra Menu: Scriptables II">Export...</a>
   </td>
   <td><i>string <b>Filename</b>, (default:exported.wav)<br /></i>
   <p><i>int <b>NumChannels</b>, (default:1)<br /></i>
   </p>
   </td>
   <td>Exports to a file.  This version of export has the full set of export options.  However, a current limitation is that the detailed option settings are always stored to and taken from saved preferences.  The net effect is that for a given format, the most recently used options for that format will be used.
   </td></tr>
   <tr>
   <td><b>OpenProject2:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#open_project" title="Extra Menu: Scriptables II">Open Project...</a>
   </td>
   <td><i>string <b>Filename</b>, (default:test.aup)<br /></i>
   <p><i>bool <b>AddToHistory</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Opens a project.
   </td></tr>
   <tr>
   <td><b>SaveProject2:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#save_project" title="Extra Menu: Scriptables II">Save Project...</a>
   </td>
   <td><i>string <b>Filename</b>, (default:name.aup)<br /></i>
   <p><i>bool <b>AddToHistory</b>, (default:unchanged)<br /></i>
   <i>bool <b>Compress</b>, (default:unchanged)<br /></i>
   </p>
   </td>
   <td>Saves a project.
   </td></tr>
   <tr>
   <td><b>Drag:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#move_mouse" title="Extra Menu: Scriptables II">Move Mouse...</a>
   </td>
   <td><i>int <b>Id</b>, (default:unchanged)<br /></i>
   <p><i>string <b>Window</b>, (default:unchanged)<br /></i>
   <i>double <b>FromX</b>, (default:unchanged)<br /></i>
   <i>double <b>FromY</b>, (default:unchanged)<br /></i>
   <i>double <b>ToX</b>, (default:unchanged)<br /></i>
   <i>double <b>ToY</b>, (default:unchanged)<br /></i>
   <i>enum <b>RelativeTo</b>, (default:unchanged)<br /></i>
   </p>
   <ul><li> Panel</li>
   <li> App</li>
   <li> Track0</li>
   <li> Track1</li></ul>
   </td>
   <td>Experimental command (called Drag in scripting) that moves the mouse.  An Id can be used to move the mouse into a button to get the hover effect.  Window names can be used instead.  If To is specified, the command does a drag, otherwise just a hover.
   </td></tr>
   <tr>
   <td><b>CompareAudio:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#compare_audio" title="Extra Menu: Scriptables II">Compare Audio...</a>
   </td>
   <td><i>float <b>Threshold</b>, (default:0)<br /></i>
   </td>
   <td>Compares selected range on two tracks.  Reports on the differences and similarities.
   </td></tr>
   <tr>
   <td><b>Screenshot:</b>
   </td>
   <td><a href="/man/Extra_Menu:_Scriptables_II#screenshot_short_format" title="Extra Menu: Scriptables II">Screenshot (short format)...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>A version of Tools -&gt; Screenshot with a more minimal GUI. One of the most useful options is All_Tracks.  The _Plus suffix includes the timeline.
   </td></tr></table>
   <div id="help_menu"></div>
   <h2><span class="mw-headline" id="Help_Menu"><a href="/man/Help_Menu" title="Help Menu">Help Menu</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=55" title="Edit section: Help Menu">edit</a><span class="mw-editsection-bracket">]</span></span></h2>
   <div class="note">The Help Menu lets you find out more about the Audacity application and how to use it.  It also includes some diagnostic tools. </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>QuickHelp:</b>
   </td>
   <td><a href="/man/Help_Menu#quick_help" title="Help Menu">Quick Help...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>A brief version of help with some of the most essential information.
   </td></tr>
   <tr>
   <td><b>Manual:</b>
   </td>
   <td><a href="/man/Help_Menu#manual" title="Help Menu">Manual...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Opens the manual in the default browser.
   </td></tr>
   <tr>
   <td><b>Updates:</b>
   </td>
   <td><a href="/man/Help_Menu#check_for_updates" title="Help Menu">Check for Updates...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Checks online to see if this is the latest version of Audacity.
   </td></tr>
   <tr>
   <td><b>About:</b>
   </td>
   <td><a href="/man/Help_Menu#about_audacity" title="Help Menu">About Audacity...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Brings a dialog with information about Audacity, such as who wrote it, what features are enabled and the GNU GPL v2 license.
   </td></tr></table>
   <div id="help_diagnostics_submenu"></div>
   <h3><span class="mw-headline" id="Help:_Diagnostics"><a href="/man/Help_Menu:_Diagnostics" title="Help Menu: Diagnostics">Help: Diagnostics</a></span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/m/index.php?title=Scripting_Reference&amp;action=edit&amp;section=56" title="Edit section: Help: Diagnostics">edit</a><span class="mw-editsection-bracket">]</span></span></h3>
   <div class="note">A set of diagnostic tools </div>
   <table class="prettytablerows" rules="rows" border="2" width="100%">
   <tr>
   <th width="15%">Scripting Id
   </th>
   <th width="15%">Action
   </th>
   <th width="30%">Parameters
   </th>
   <th width="55%">Description
   </th></tr>
   <tr>
   <td><b>DeviceInfo:</b>
   </td>
   <td><a href="/man/Help_Menu:_Diagnostics#audio_device_info" title="Help Menu: Diagnostics">Audio Device Info...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Shows technical information about your detected audio device(s).
   </td></tr>
   <tr>
   <td><b>MidiDeviceInfo:</b>
   </td>
   <td><a href="/man/Help_Menu:_Diagnostics#midi_device_info" title="Help Menu: Diagnostics">MIDI Device Info...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Shows technical information about your detected MIDI device(s).
   </td></tr>
   <tr>
   <td><b>Log:</b>
   </td>
   <td><a href="/man/Help_Menu:_Diagnostics#show_log" title="Help Menu: Diagnostics">Show Log...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Launches the "Audacity Log" window, the log is largely a debugging aid, having timestamps for each entry
   </td></tr>
   <tr>
   <td><b>CrashReport:</b>
   </td>
   <td><a href="/man/Help_Menu:_Diagnostics#generate_support_data" title="Help Menu: Diagnostics">Generate Support Data...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Selecting this will generate a Debug report which could be useful in aiding the developers to identify bugs in Audacity or in third-party plug-ins
   </td></tr>
   <tr>
   <td><b>CheckDeps:</b>
   </td>
   <td><a href="/man/Help_Menu:_Diagnostics#check_dependencies" title="Help Menu: Diagnostics">Check Dependencies...</a>
   </td>
   <td><i>none</i>
   </td>
   <td>Lists any WAV or AIFF audio files that your project depends on, and allows you to copy these files into the project
   </td></tr></table>   HEREDOC*/

  var pieces;

  /*HEREDOC
   A second here doc...
   HEREDOC*/

  pieces = AllTables.toString().split( "HEREDOC" );

  return pieces;
};