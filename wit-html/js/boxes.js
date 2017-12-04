/**
 * Created by James Crook on 5/6/2017.
 */

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

