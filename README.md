Scripts and Userscripts
=======

# Discourse "Plugin": Discourse Mute

Based on [SleepProgger's hide user userscript](https://github.com/SleepProgger/imgur_userscripts/blob/master/scripts/imgur_hide_user.user.js), this is easy for Discourse admins to add to their board.

## Installation

1. Copy and paste the code from here: https://github.com/tinoesroho/imgur_userscripts/blob/master/scripts/discourse_mute.js into all theme \</head> sections.
2. Change the cookie name (in variable)
3. Add CSS to theme for Overlay.
>>>>>>> origin/master
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
    background: #fff url("INSERT_GIF_HERE") no-repeat fixed center; 
}

=======

# Userscript: Auto Love User's Posts

https://github.com/tinoesroho/discourse-scripts/raw/master/autolove.user.js

Click the toggle icon to set up auto-like on a user. From then on, any posts from that user will automatically be liked. Requires Greasemonkey or Tampermonkey.
