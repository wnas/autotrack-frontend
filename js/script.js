

var autotrack = (function(){
    "use strict";
    var conf = {

    },  init = function(){
        loadBanners();
        checkWidth();
    },  loadBanners = function(){
        // console.log('boe');
    },  checkWidth = function(){
        var b = document.getElementsByTagName('body')[0];
        var width = b.clientWidth;
        alert(width);
    };
    return {
        init:init
    };
}());


autotrack.init();
