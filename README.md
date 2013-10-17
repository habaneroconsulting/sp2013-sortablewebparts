# Sortable Web Parts for SharePoint

While SharePoint 2013 officially supports non-Internet Explorer browsers, some of their legacy features still are using ActiveX. Unfortunately for non-Internet Explorer users, this means that these features aren't available. One particular feature that is unavailable is sortable (drag and drop) web parts while editing a page.

## How It Works

Adding sortable web parts requires reimplementing the [`dragdrop`](http://msdn.microsoft.com/en-us/library/4k1s9s90.aspx) ActiveX control which SharePoint uses for sorting web parts. However, rather than just implementing the one function in JavaScript, it is easier to replace the entire piece of funtionality using [jQuery UI's Sortable](http://jqueryui.com/sortable/) plugin.

## Getting Started

This functionality can be adding to your SharePoint 2013 solution in two ways: by adding the functionality to your browser via a [bookmarklet](http://en.wikipedia.org/wiki/Bookmarklet), or by adding the script into your solution.

### Using it as a bookmarklet

1. First, make the bookmark bar in your browser visible. See the links below for instructions on your browser:
	- [Apple Safari](http://support.apple.com/kb/HT4550)
	- [Google Chrome](http://support.google.com/chrome/bin/answer.py?hl=en&answer=95745)
	- [Mozilla Firefox](http://support.mozilla.org/en-US/kb/Bookmarks%20Toolbar)
	- [Opera](http://my.opera.com/desktopteam/blog/2010/09/15/hello-bookmarks-bar)
2. Drag the link below to your bookmark bar:
	- <a href="javascript:(function(c,h,k,d){var a={},e=c('body'),f=c('.ms-SPZone'),g=c('.ms-webpartzone-cell');a.prototypeSetup=function(){HTMLDivElement.prototype.swapNode=function(b){var a=c(b);a.attr('style','');this.outerHTML=b.outerHTML;a.remove()};HTMLDivElement.prototype.removeNode=function(){return!1}};a.setup=function(){a.prototypeSetup();f.sortable({connectWith:'.ms-SPZone',handle:'span.js-webpart-titleCell',items:'.ms-webpartzone-cell'});g.on('mouseup',function(){var b=c('.ui-sortable-placeholder')[0];b&&'MSOZone_EmptyZoneCell'===b.previousElementSibling.id&&b.parentNode.insertBefore(b,b.previousElementSibling);if(b=c('.ui-sortable-placeholder + .ms-webpartzone-cell, .ui-sortable-placeholder + #MSOZone_EmptyZoneCell')[0])MSOLayout_zoneDragOver=e[0],MSOLayout_currentDragMode='move',MSOLayout_iBar.setAttribute('goodDrop',!0),MSOLayout_MoveWebPart(this,b)})};a.isEditMode=function(){var b,a;b='1'===c('#MSOLayout_InDesignMode').val();a='Edit'===c('#_wikiPageMode').val();return b||a};a.init=function(){HTMLDivElement.prototype.dragDrop===d&&a.isEditMode()&&(c().sortable?a.setup():c.getScript('//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js',a.setup))};a.init()})(jQuery,window,document);)">Sortable Web Parts</a>
3. On a SharePoint 2013 page, edit the page.
4. Click on the *Sortable Webparts* bookmark in your bookmark bar.
5. Drag and drop web parts to verify the script is working.

### Installing it in your SharePoint 2013 solution

## Build Instructions

1. Install [NodeJS](http://nodejs.org/)
    - If you're on windows make sure you reboot afterwards so that the user PATH variables can be set properly. Otherwise node modules you install will not be command line executable
    - http://nodejs.org/

3. Install Grunt and Grunt CLI.

        npm -g install grunt grunt-cli

4. Run `npm install` from command line at root project folder

    This will read the *package.json* file and pull in all required node modules and put into a directory called *node_modules*. This directory is generated so it can be deleted and should not be checked into source control. If deleted running `npm install` will re-create it.
    
5. Use `grunt` to build:
    - `grunt plugin` will minify the source and copy the vendor files.
    - `grunt bookmark` will create the bookmarklet by using *grunt-bookmarklet-thingy* and minifying the source.
    - `grunt vsproject` will create a Visual Studio project to deploy to SharePoint.

## License

Copyright (c) 2013 Habanero Consulting Group

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
