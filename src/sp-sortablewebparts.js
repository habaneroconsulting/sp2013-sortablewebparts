/*!
 * Sortable Web Parts for SharePoint 2013
 * Christopher Parsons <cparsons@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */

(function($, window, document, undefined) {
	'use strict';

	var module = {},
		classes = {
			placeholder: '.ui-sortable-placeholder',
			webpart: '.ms-webpartzone-cell',
			zone: '.ms-SPZone'
		},
		elements = {
			body: $('body'),
			webpartZone: $(classes.zone),
			webparts: $(classes.webpart)
		},
		emptyWebpartId = 'MSOZone_EmptyZoneCell',
		nextCell = classes.placeholder + ' + ' + classes.webpart + ', ' + classes.placeholder + ' + #' + emptyWebpartId;

	/**
	 * Add these two functions to the HTMLDivElement prototype since non-IE browsers
	 * do not define them. We aren't actually recreating them like-for-like, just adding
	 * in code to make our script work.
	 */
	module.prototypeSetup = function () {
		// Updating this could break other uses of this call, but none were found
		HTMLDivElement.prototype.swapNode = function(original) {
			var $original = $(original);

			// Remove the custom styling added by the sortable plugin
			$original.attr('style', '');

			// Rather than swap and remove, we're just going to make this new
			// element equal to the old one
			this.outerHTML = original.outerHTML;
			$original.remove();
		};

		// Remove is done in the swap node function above this
		HTMLDivElement.prototype.removeNode = function() { return false; };
	};

	/**
	 * Initalises the jQuery UI plugin and handles the drop.
	 */
	module.setup = function () {
		module.prototypeSetup();

		// Initialise the jQuery UI Sortable plugin
		// Note that we are not using any of the callback functions
		// In fact we remove the node even before it is dropped
		elements.webpartZone.sortable({
			connectWith: classes.zone,
			handle: 'span.js-webpart-titleCell',
			items: classes.webpart
		});

		// On mouseup, we run the MoveWebPart function
		// We need to use mouseup since using beforeStop (jQuery UI event) happens
		// after the element is inserted in its new position. MoveWebPart requires
		// the moving web part to be in its original spot, first.
		elements.webparts.on('mouseup', function() {
			// Check to see if the empty web part is previous to the dropped item
			// This is needed since on empty web part zones, web parts that are moved into
			// the zone are put below both the "Add a Web Part" and empty web part divs.
			var placeholder = $(classes.placeholder)[0];

			if (placeholder && placeholder.previousElementSibling.id === emptyWebpartId) {
				placeholder.parentNode.insertBefore(placeholder, placeholder.previousElementSibling);
			}

			// Select the destination spot, which can be a web part, or an empty web part
			var destination = $(nextCell)[0];

			if (destination) {
				// These three global variables are set by the various drag and drop
				// functions on the elements. We mock the values for now.
				MSOLayout_zoneDragOver = elements.body[0];
				MSOLayout_currentDragMode = 'move';
				MSOLayout_iBar.setAttribute('goodDrop', true);

				// This SP function re-orders the web parts and saves their position
				MSOLayout_MoveWebPart(this, destination);				
			}
		});
	};

	/**
	 * Determine if the SharePoint page is in edit mode
	 * @return {bool} Whether or not the page is in edit mode
	 */
	module.isEditMode = function () {
		var inEditMode,
			inDesignMode,
			inWikiPageMode;

		inDesignMode = $('#MSOLayout_InDesignMode').val() === '1';
		inWikiPageMode = $('#_wikiPageMode').val() === 'Edit';

		// We are in edit mode if either design mode or wiki page mode are active
		inEditMode = (inDesignMode || inWikiPageMode);

		return inEditMode;
	};


	/**
	 * Initialise our custom code
	 */
	module.init = function () {
		// If the ActiveX function dragDrop is not found, set up our script
		if (HTMLDivElement.prototype.dragDrop === undefined && module.isEditMode()) {
			// Check to see if the jQuery UI sortable function is available
			if ($().sortable) {
				module.setup();
			}
		}
	};

	module.init();

})(jQuery, window, document);