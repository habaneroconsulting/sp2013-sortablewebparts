javascript:(function(){;function e(){r++,o===r&&t()}function t(){!function(e,t,o,r){"use strict";var i,n={},a={placeholder:".ui-sortable-placeholder",webpart:".ms-webpartzone-cell",zone:".ms-SPZone"},p="MSOZone_EmptyZoneCell",s=a.placeholder+" + "+a.webpart+", "+a.placeholder+" + #"+p;n.prototypeSetup=function(){HTMLDivElement.prototype.swapNode=function(e){if(null===e)return!1;var t=this.parentNode.insertBefore(o.createTextNode(""),this);return e.parentNode.insertBefore(this,e),t.parentNode.insertBefore(e,t),t.parentNode.removeChild(t),this},HTMLDivElement.prototype.removeNode=function(){this.parentNode.removeChild(this)}},n.setup=function(){n.prototypeSetup(),i={body:e("body"),webparts:e(a.webpart),webpartZone:e(a.zone)},i.webpartZone.sortable({connectWith:a.zone,handle:"span.js-webpart-titleCell",items:a.webpart}),i.body.on("mouseup",a.webpart,function(){var o,r=e(a.placeholder)[0];r&&(o=r.previousElementSibling,o&&o.id===p&&r.parentNode.insertBefore(r,o));var i=e(s)[0];i&&(t.MSOLayout_currentDragMode="move",t.MSOLayout_iBar.setAttribute("goodDrop",!0),t.MSOLayout_oDropLocation=i,t.MSOLayout_zoneDragOver=e(i).parents(".ms-SPZone")[0],t.MSOLayout_MoveWebPart(this,i)),this.setAttribute("style","")})},n.isEditMode=function(){var t,o,r;return o="1"===e("#MSOLayout_InDesignMode").val(),r="Edit"===e("#_wikiPageMode").val(),t=o||r},n.init=function(){HTMLDivElement.prototype.dragDrop===r&&n.isEditMode()&&e().sortable&&n.setup()},e(n.init)}(jQuery,window,document)}var o=0,r=0;o+=2;for(var i=["https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js","https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"],n=["jquery-min","jquery-ui-min"],a=0;a<i.length;a++){var p=i[a],s=document.createElement("script");s.src=p,s.id=n[a],s.type="text/javascript",s.onload=e,document.body.appendChild(s)}t();;})()