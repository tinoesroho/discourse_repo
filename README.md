# Server-side: Discourse Mute

Based on [SleepProgger's hide user userscript](https://github.com/SleepProgger/imgur_userscripts/blob/master/scripts/imgur_hide_user.user.js), this is easy for Discourse admins to add to their board.

## Installation

1. Copy and paste the code from here: https://github.com/tinoesroho/imgur_userscripts/blob/master/scripts/discourse_mute.js into all theme \</head> sections.
2. Change the cookie name (in variable)
3. Add CSS to theme for Overlay.
#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter:alpha(opacity=75);
    -moz-opacity:0.75;
    -khtml-opacity: 0.75;
    opacity: 0.75;
    z-index: 10000;
     background: #fff url(INSERT_GIF_HERE) no-repeat fixed center; 
}
