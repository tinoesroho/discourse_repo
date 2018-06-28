// ==UserScript==
// @name        BBS One Click Love-Script
// @namespace   bbs-autolove
// @include     https://bbs.boingboing.net/*
// @version     2018.06.27-EndSupport
// @resource   mute_css https://www.gitcdn.xyz/repo/tinoesroho/discourse_repo/master/scripts/mute.css
// @grant       none
// ==/UserScript==

/*
* Patch for GM_getValue and GM_SetValue support for chrome
* credits to: www.devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
*/
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


	var GR_COOKIE_NAME = 'bbs-autolove';
	var hide_ids = $.parseJSON(GM_getValue(GR_COOKIE_NAME, '{}'));

$('body').ready(function(){
	var notice = $('<div class="wequit"><div class="bootbox modal in" tabindex="-1" style="overflow: hidden; padding-right: 0px;"><div class="modal-body">All the love broke the BBS database. Please disable this script.</div><div class="modal-footer"><a data-handler="0" class="btn btn-primary" href="javascript:;">OK</a></div></div><div class="modal-backdrop in"></div></div>');
$(notice).appendTo("body");
setTimeout(function(){
  $('.wequit').remove();
}, 5000);
});
