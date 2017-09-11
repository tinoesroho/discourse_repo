// ==UserScript==
// @name        bbs_community_mute
// @namespace   bbs_mute
// @include     https://bbs.boingboing.net/*
// @version     0.5a
// @resource   mute_css https://www.gitcdn.xyz/repo/tinoesroho/discourse_repo/master/scripts/mute.css
// @grant       none
// ==/UserScript==
$('head').append('<link rel="stylesheet" href="https://gitcdn.xyz/repo/tinoesroho/discourse_repo/master/scripts/mute.css" type="text/css" />');

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


$('body').ready(function(){
  doWork();
});

(function(){
    event = function(event){
        if (event.animationName == 'nodeInserted') {
            doWork();
        }
    }
        
document.addEventListener('animationstart', event, false);
document.addEventListener('MSAnimationStart', event, false);
document.addEventListener('webkitAnimationStart', event, false);
})();

	var GR_COOKIE_NAME = 'bbs_community_mute';
	var hide_ids = $.parseJSON(GM_getValue(GR_COOKIE_NAME, '{}'));
function doWork() {
	function handle_post_node(node){
		var tid = node.getAttribute('data-user-id');
		function mute_foo(){
			this.innerHTML = "Unmute";
			$(node).find('.contents').hide();
			$(this).unbind('click', mute_foo);
			$(this).click(umute_foo);
			hide_ids[tid] = 1;
			GM_setValue(GR_COOKIE_NAME, JSON.stringify(hide_ids));
			$('[data-user-id="'+tid+'"]').find('.mute_btn').remove();
			$('[data-user-id="'+tid+'"]').each(function(){ handle_post_node(this) });
		}
		function umute_foo(){
			this.innerHTML = "Mute";
			$(node).find('.contents').show();
			$(this).unbind('click', umute_foo);
			$(this).click(mute_foo);
			delete hide_ids[tid];
			GM_setValue(GR_COOKIE_NAME, JSON.stringify(hide_ids));
			$('[data-user-id="'+tid+'"]').find('.umute_btn').remove();
			$('[data-user-id="'+tid+'"]').each(function(){ $(this).find('.contents').show(); handle_post_node(this) });
		}
		if(hide_ids[tid]){			
			$(node).find('.contents').hide();
			if($(node).find('.umute_btn').length > 0) return;
			var btn = $('<button class="umute_btn" title="Unmute this user." style="background-color: Transparent; background-repeat:no-repeat; border: none; cursor:pointer; overflow: hidden; outline:none; margin-left: 3px; "><i class="fa fa-microphone"></i></button>');
			$(node).find('.post-info').first().prepend(btn);
			btn.click(umute_foo);
		}else {
			if($(node).find('.mute_btn').length > 0) return;
			var btn = $('<button title="Mute this user." style="background: none;" class="mute_btn"><i class="fa fa-microphone-slash"></i></button>');
			btn.insertBefore($(node).find('.create').last());
			btn.click(mute_foo);
		}
	}
	
	$('article').each(function(){handle_post_node(this)});
	var observer = new MutationObserver(function(mutations) {
		for(var i=0; i < mutations.length; ++i){
			var mutation = mutations[i];
			for(var j=0; j < mutation.addedNodes.length; ++j){
				if(mutation.addedNodes[j].nodeName == "#text") continue;
				var node = mutation.addedNodes[j];
				//console.log(node);
				if(node.className == 'container posts'){
					$(node).find('article').each(function(){handle_post_node(this)});
					continue;
				}
				// just to be sure (TODO: sometimes when jumping to a thread via notification the posts aren't handled.
				// This "hack" (should) ensure that all posts are handled )
				if(node.className == 'topic-link'){
					$(window.document).find('article').each(function(){handle_post_node(this)});
					continue;
				}
				if(node.className == 'ember-view post-cloak'){
					node = $(node).find('article').get(0);
				}
				if(node.nodeName == "ARTICLE" && node.getAttribute('data-user-id')){
					handle_post_node(node);	
				}
			}
		}
	});
	observer.observe(document, { subtree: true, childList: true});
}
