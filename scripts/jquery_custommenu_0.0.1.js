/*!
 * jQuery CustomMenu Plugin 0.0.1
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
			// Returns an array of options to display [{label: 'name'}, {label: 'name2', options:[]}]
			option_list_callback: function() {
				return []
			},
			item_selected: function() {
				
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
				_this.menu_holder = $('<div style="display:none;position:absolute;" id="CustomMenuHolder"></div>');
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

			_this.$el.on('contextmenu', function(event) {
				var options = _this.opts.option_list_callback();
				_this._show_menu(event, options);
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
		_show_menu: function(event, options) {
			var _this = this;

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
						_this.opts.item_selected(ui.item.data('data'));
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
				var new_option = $('<li><a href="#">' + element.label + '</a></li>').data('data', element);

				// If there are sub-menus...
				if (typeof element.options != 'undefined') {
					_this._build_menu(new_option, element.options);
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
