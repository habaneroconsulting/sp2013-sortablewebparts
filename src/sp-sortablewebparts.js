/*!
 * Sortable Web Parts for SharePoint 2013
 * Christopher Parsons <cparsons@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */

(function ($, window, document, undefined) {
	'use strict';

	var module = {},
		classes = {
			placeholder: '.ui-sortable-placeholder',
			webpart: '.ms-webpartzone-cell',
			zone: '.ms-SPZone'
		},
		elements,
		emptyWebpartId = 'MSOZone_EmptyZoneCell',
		nextCell = classes.placeholder + ' + ' + classes.webpart + ', ' +
					classes.placeholder + ' + #' + emptyWebpartId;

	/**
	 * Add these two functions to the HTMLDivElement prototype since non-IE
	 * browsers do not define them. We aren't actually recreating them
	 * like-for-like, just adding in code to make our script work.
	 */
	module.prototypeSetup = function () {
		HTMLDivElement.prototype.swapNode = function (original) {
			if (original === null) {
				return false;
			}

			var tempNode = this.parentNode.insertBefore(document.createTextNode(''), this);

			original.parentNode.insertBefore(this, original);
			tempNode.parentNode.insertBefore(original, tempNode);
			tempNode.parentNode.removeChild(tempNode);

			return this;
		};

		// Remove is done in the swap node function above this
		HTMLDivElement.prototype.removeNode = function (bool) {
			this.parentNode.removeChild(this);
		};
	};

	/**
	 * Initalises the jQuery UI plugin and handles the drop.
	 */
	module.setup = function () {
		module.prototypeSetup();

		// Cache the various jQuery elements we need
		elements = {
			body: $('body'),
			webparts: $(classes.webpart),
			webpartZone: $(classes.zone)
		};

		// Initialise the jQuery UI Sortable plugin
		// Note that we are not using any of the callback functions
		// In fact we remove the node even before it is dropped
		elements.webpartZone.sortable({
			connectWith: classes.zone,
			handle: 'span.js-webpart-titleCell',
			items: classes.webpart
		});

		// On mouseup, we run the MoveWebPart function
		// We need to use mouseup since using beforeStop (jQuery UI event)
		// happens after the element is inserted in its new position.
		// MoveWebPart requires the moving web part to be in its original spot,
		// first.
		elements.body.on('mouseup', classes.webpart, function () {
			// Check to see if the empty web part is previous to the dropped
			// item. This is needed since on empty web part zones, web parts
			// that are moved into the zone are put below both the "Add a Web
			// Part" and empty web part divs.
			var placeholder = $(classes.placeholder)[0],
				previouSibling;

			if (placeholder) {
				previouSibling = placeholder.previousElementSibling;

				if (previouSibling && previouSibling.id === emptyWebpartId) {
					placeholder.parentNode.insertBefore(placeholder, previouSibling);
				}
			}

			// Select the destination spot, which can be a web part, or an empty
			// web part
			var destination = $(nextCell)[0];

			if (destination) {
				// These three global variables are set by the various drag and
				// drop functions on the elements. We mock the values for now.
				window.MSOLayout_currentDragMode = 'move';
				window.MSOLayout_iBar.setAttribute('goodDrop', true);
				window.MSOLayout_oDropLocation = destination;
				window.MSOLayout_zoneDragOver = $(destination).parents('.ms-SPZone')[0];

				// This function reorders the web parts and saves their position
				window.MSOLayout_MoveWebPart(this, destination);
			}

			this.setAttribute('style', '');
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

		// We are in edit mode if either design or wiki page mode are active
		inEditMode = (inDesignMode || inWikiPageMode);

		return inEditMode;
	};


	/**
	 * Initialise our custom code
	 */
	module.init = function () {
		// If the ActiveX function dragDrop is not found, set up our script
		if (HTMLDivElement.prototype.dragDrop === undefined &&
			module.isEditMode()) {
			// Check to see if the jQuery UI sortable function is available
			if ($().sortable) {
				module.setup();
			}
		}
	};


	// Wait until DOM ready since elements in isEditMode might not
	// be ready yet.
	$(module.init);

})(jQuery, window, document);