/*!
 * jQuery CustomMenu Plugin 0.0.2
 *
 * http://www.trunknetworks.com/
 *
 * Copyright 2013 Chris Weller
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($){

	//Validate Forms
	function CustomMenu(el, options) {

		//Defaults:
		this.defaults = {
			// Filter to allow menu to be linked to specific elements within the main item (ie cells within a table)
			filter: null,

			// Returns an array of options to display [{label: 'name'}, {label: 'name2', options:[]}]
			option_list_callback: function() {
				return []
			},
			item_selected: function(element, data) {
				
			}
		};

		//Extending options:
		this.opts = $.extend({}, this.defaults, options);

		//Privates:
		this.$el = $(el);
		// Store the menu holder for the page
		this.menu_holder = null;
	}

	// Separate functionality from object creation
	CustomMenu.prototype = {

		init: function() {
			var _this = this;

			if ($('#CustomMenuHolder', 'body').length == 0) {
				// Create the div which will hold the menu
				_this.menu_holder = $('<div style="display:none;position:absolute;z-index:5000;" id="CustomMenuHolder"></div>');
			}
			else {
				_this.menu_holder = $('#CustomMenuHolder', 'body');
			}

			// Add the menu holder to the body of the page
			$('body').prepend(_this.menu_holder);

			_this.init_events();
		},

		init_events: function() {
			var _this = this;

			$(document).on('click', function(){
				_this._hide_menu();
			});
			$(document).on('contextmenu', function() {
				_this._hide_menu();
			});

			_this.$el.on('contextmenu', _this.opts.filter, function(event) {
				var current_element = $(this);
				var options = _this.opts.option_list_callback(current_element);
				_this._show_menu(current_element, event, options);
				return false;
			});
		},

		/**
		 * Hide menu hides the menu and removes any content
		 */
		_hide_menu: function() {
			var _this = this;

			_this.menu_holder.hide();
			_this.menu_holder.empty();
		},

		/**
		 * Shows the requested menu
		 */
		_show_menu: function(element, event, options) {
			var _this = this;

			if (typeof _this.opts.pre_show !== 'undefined') {
				_this.opts.pre_show( element );
			}

			_this._hide_menu();

			// Position the menu holder
			_this.menu_holder.css('top', event.pageY).css('left', event.pageX);

			// Build the menu
			_this._build_menu(_this.menu_holder, options, "MyMenu");

			// Display the menu holder
			_this.menu_holder.show();

			// Make the menu display as a menu
			$('.MyMenu', _this.menu_holder).menu({
				select: function(event, ui) {
					if (typeof _this.opts.item_selected != 'undefined')
						_this.opts.item_selected(element, ui.item.data('data'), ui.item );
					return false;
				}
			});

			return false;
		},

		/**
		 * Builds the menu and appends it to the given container - allows for recursive building of sub menus
		 */
		_build_menu: function($container, options, specific_class) {
			var _this = this;

			// Create a new menu
			var $menu_ul = $('<ul class="' + specific_class + '"></ul>');

			// Iterate over the menu options
			$.each(options, function(index, element) {
				if (typeof element.seperator != 'undefined') {
					$menu_ul.append("<li><hr/></li>");
					return true;
				}
				var new_option = $('<li><a href="#">' + element.label + '</a></li>').data('data', element);

				// If the menu option has the disabled tag on it
				if (typeof element.disabled != 'undefined')
					if (element.disabled)	// If the menu option is actually to be disabled
						new_option.addClass('ui-state-disabled');	// Disable the menu option

				// If there are sub-menus...
				if (typeof element.options != 'undefined') {
					_this._build_menu(new_option, element.options, element.use_class);
				}

				// Append the menu item to the main ul
				$menu_ul.append(new_option);
			});

			// Append the actual menu into the holder
			$container.append($menu_ul);
		}
	};

	// The actual plugin
	$.fn.customMenu = function(param1, param2) {
		if(this.length) {
			this.each(function() {
				// If we have already been added to the element
				if ($(this).hasClass('hasCustomMenu')) {
					var CustomMenuClass = $(this).data('customMenu');
					CustomMenuClass[param1](param2);
				}
				else {
					// Create a new validator and add it to the element
					var rev = new CustomMenu(this, param1);
					rev.init();
					$(this).data('customMenu', rev);
					$(this).addClass('hasCustomMenu');
				}
			});
		}
	};
})(jQuery);
