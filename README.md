# Sortable Web Parts for SharePoint

While SharePoint 2013 officially supports non-Internet Explorer browsers, some of their legacy features still are using ActiveX. Unfortunately for non-Internet Explorer users, this means that these features aren't available. One particular feature that is unavailable is sortable (drag and drop) web parts while editing a page.

## How It Works

Adding sortable web parts requires reimplementing the [`dragdrop`](http://msdn.microsoft.com/en-us/library/4k1s9s90.aspx) ActiveX control which SharePoint uses for sorting web parts. However, rather than just implementing the one function in JavaScript, it is easier to replace the entire piece of funtionality using [jQuery UI's Sortable](http://jqueryui.com/sortable/) plugin.

## Getting Started

This functionality can be adding to your SharePoint 2013 solution in two ways: by adding the functionality to your browser via a [bookmarklet](http://en.wikipedia.org/wiki/Bookmarklet), or by adding the script into your solution.

### Using it as a bookmarklet

1. Create a bookmark in your browser with the name *Sortable Web Parts* and the following as the URL:

        javascript:(function(){;function e(){r++,o===r&&t()}function t(){!function(e,t,o,r){"use strict";var i,n={},a={placeholder:".ui-sortable-placeholder",webpart:".ms-webpartzone-cell",zone:".ms-SPZone"},p="MSOZone_EmptyZoneCell",s=a.placeholder+" + "+a.webpart+", "+a.placeholder+" + #"+p;n.prototypeSetup=function(){HTMLDivElement.prototype.swapNode=function(t){var o=e(t);o.attr("style",""),this.outerHTML=t.outerHTML,o.remove()},HTMLDivElement.prototype.removeNode=function(){return!1}},n.setup=function(){n.prototypeSetup(),i={body:e("body"),webpartZone:e(a.zone),webparts:e(a.webpart)},i.webpartZone.sortable({connectWith:a.zone,handle:"span.js-webpart-titleCell",items:a.webpart}),i.webparts.on("mouseup",function(){var o=e(a.placeholder)[0],r=o.previousElementSibling;o&&r.id===p&&o.parentNode.insertBefore(o,r);var n=e(s)[0];n&&(t.MSOLayout_zoneDragOver=i.body[0],t.MSOLayout_currentDragMode="move",t.MSOLayout_iBar.setAttribute("goodDrop",!0),t.MSOLayout_MoveWebPart(this,n))})},n.isEditMode=function(){var t,o,r;return o="1"===e("#MSOLayout_InDesignMode").val(),r="Edit"===e("#_wikiPageMode").val(),t=o||r},n.init=function(){HTMLDivElement.prototype.dragDrop===r&&n.isEditMode()&&e().sortable&&n.setup()},e(n.init)}(jQuery,window,document)}var o=0,r=0;o+=2;for(var i=["https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js","https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"],n=["jquery-min","jquery-ui-min"],a=0;a<i.length;a++){var p=i[a],s=document.createElement("script");s.src=p,s.id=n[a],s.type="text/javascript",s.onload=e,document.body.appendChild(s)}t();;})()
2. On a SharePoint 2013 page, edit the page.
3. Click on the *Sortable Web Pwearts* bookmark in your bookmark bar.
4. Try sorting web parts to verify that the script is working.

### Installing it in your SharePoint 2013 solution

#### Using the included sandbox solution

1. You will need the following developer tools:
    - Visual Studio Premium 2012
    - [Microsoft Office Developer Tools for Visual Studio 2012](http://msdn.microsoft.com/en-us/office/apps/fp123627.aspx)
    
2. Get the latest stable version of the included solution, found under
[`/bin/vs/SP.SortableWebParts.zip`](https://github.com/habaneroconsulting/sp-sortablewebparts/raw/master/bin/vs/SP.SortableWebParts.zip).
3. Open the solution file using Visual Studio.
4. Make sure you have both the Solution Explorer view and the Properties view open.
5. Click on the project *SP.SortableWebParts* in the Solution Explorer, and under Properties > Site URL,
enter your site collection URL.
6. Right-click on the project, and press Deploy.
7. Edit a page on your SharePoint 2013 site and try sorting web parts to verify that the script is working.

#### Tip

You may already include jQuery and/or jQuery UI in your solution. If you do, remove them to save bandwidth and
extra HTTP requests.

## Support

If you have a bug, or a feature request, please post in the [issue tracker](https://github.com/habaneroconsulting/sp-sortablewebparts/issues).

Otherwise, you can contact the author over Twitter at [@cwlparsons](https://twitter.com/cwlparsons).

## Build Instructions

1. Install [NodeJS](http://nodejs.org/)
    - If you're on windows make sure you reboot afterwards so that the user PATH variables can be set properly. Otherwise node modules you install will not be command line executable
    - http://nodejs.org/

2. Install Grunt and Grunt CLI.
        npm -g install grunt grunt-cli
3. Run `npm install` from command line at root project folder
    This will read the *package.json* file and pull in all required node modules and put into a directory called *node_modules*. This directory is generated so it can be deleted and should not be checked into source control. If deleted running `npm install` will re-create it.
4. Use `grunt` to build:
    - `grunt plugin` will minify the source and copy the vendor files.
    - `grunt bookmark` will create the bookmarklet by using *grunt-bookmarklet-thingy* and minifying the source.
    - `grunt vs` will create a Visual Studio project to deploy to SharePoint.
    - `grunt` will build all three

## License

Copyright (c) 2013 Habanero Consulting Group

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
