/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	var support = { animations : Modernizr.cssanimations },
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		onEndAnimation = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.animations ) {
					if( ev.currentTarget != this ) return;
					this.removeEventListener( animEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(); }
			};
			if( support.animations ) {
				el.addEventListener( animEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		};

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function MLMenu(el, options) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );
		
		// the menus (<ul>´s)
		this.menus = [].slice.call(this.el.querySelectorAll('.menu__level'));
		// index of current menu
		this.current = 0;

		this._init();
	}

	MLMenu.prototype.options = {
		// show breadcrumbs
		breadcrumbsCtrl : true,
		// initial breadcrumb text
		initialBreadcrumb : '',
		// show back button
		backCtrl : false,
		// delay between each menu item sliding animation
		itemsDelayInterval : 70,
		// direction 
		direction : 'r2l',
		// callback: item that doesn´t have a submenu gets clicked
		// onItemClick([event], [inner HTML of the clicked item])
		onItemClick : function(ev, itemName) { return false; }
	};

	MLMenu.prototype._init = function() {
		// iterate the existing menus and create an array of menus, more specifically an array of objects where each one holds the info of each menu element and its menu items
		this.menusArr = [];
		var self = this;
		this.menus.forEach(function(menuEl, pos) {
			var menu = {menuEl : menuEl, menuItems : [].slice.call(menuEl.querySelectorAll('.menu__item'))};
			self.menusArr.push(menu);

			// set current menu class
			if( pos === self.current ) {
				classie.add(menuEl, 'menu__level--current');
			}
		});

		// create back button
		if( this.options.backCtrl ) {
			this.backCtrl = document.createElement('button');
			this.backCtrl.className = 'menu__back menu__back--hidden';
			this.backCtrl.setAttribute('aria-label', 'Go back');
			this.backCtrl.innerHTML = 'للخلف <i class="fa fa-arrow-right"></i> ';
			this.el.insertBefore(this.backCtrl, this.el.firstChild);
		}
		
		
		// create breadcrumbs
		if( self.options.breadcrumbsCtrl ) {
			this.breadcrumbsCtrl = document.createElement('nav');
			this.breadcrumbsCtrl.className = 'menu__breadcrumbs';
			this.el.insertBefore(this.breadcrumbsCtrl, this.el.firstChild);
			// add initial breadcrumb
			this._addBreadcrumb(0);
		}
		
		// event binding
		this._initEvents();
	};

	MLMenu.prototype._initEvents = function() {
		var self = this;

		for(var i = 0, len = this.menusArr.length; i < len; ++i) {
			this.menusArr[i].menuItems.forEach(function(item, pos) {
				item.querySelector('a').addEventListener('click', function(ev) { 
					var submenu = ev.currentTarget.getAttribute('data-submenu'),
						itemName = ev.currentTarget.innerHTML,
						subMenuEl = self.el.querySelector('ul[data-menu="' + submenu + '"]');

					// check if there's a sub menu for this item
					if( submenu && subMenuEl ) {
						ev.preventDefault();
						// open it
						self._openSubMenu(subMenuEl, pos, itemName);
					}
					else {
						// add class current
						var currentlink = self.el.querySelector('.menu__link--current');
						if( currentlink ) {
							classie.remove(self.el.querySelector('.menu__link--current'), 'menu__link--current');
						}
						classie.add(ev.currentTarget, 'menu__link--current');
						
						// callback
						self.options.onItemClick(ev, itemName);
					}
				});
			});
		}
		
		// back navigation
		if( this.options.backCtrl ) {
			this.backCtrl.addEventListener('click', function() {
				self._back();
			});
		}
	};

	MLMenu.prototype._openSubMenu = function(subMenuEl, clickPosition, subMenuName) {
		if( this.isAnimating ) {
			return false;
		}
		this.isAnimating = true;
		
		// save "parent" menu index for back navigation
		this.menusArr[this.menus.indexOf(subMenuEl)].backIdx = this.current;
		// save "parent" menu´s name
		this.menusArr[this.menus.indexOf(subMenuEl)].name = subMenuName;
		// current menu slides out
		this._menuOut(clickPosition);
		// next menu (submenu) slides in
		this._menuIn(subMenuEl, clickPosition);
	};
			
	MLMenu.prototype._back = function() {
		if( this.isAnimating ) {
			return false;
		}
		this.isAnimating = true;

		// current menu slides out
		this._menuOut();
		// next menu (previous menu) slides in
		var backMenu = this.menusArr[this.menusArr[this.current].backIdx].menuEl;
		this._menuIn(backMenu);

		// remove last breadcrumb
		if( this.options.breadcrumbsCtrl ) {
			this.breadcrumbsCtrl.removeChild(this.breadcrumbsCtrl.lastElementChild);
		}
	};

	MLMenu.prototype._menuOut = function(clickPosition) {
		// the current menu
		
	    console.log('_menuOut '+clickPosition);
		
		var self = this,
			currentMenu = this.menusArr[this.current].menuEl,
			isBackNavigation = typeof clickPosition == 'undefined' ? true : false;

		// slide out current menu items - first, set the delays for the items
		this.menusArr[this.current].menuItems.forEach(function(item, pos) {
			item.style.WebkitAnimationDelay = item.style.animationDelay = isBackNavigation ? parseInt(pos * self.options.itemsDelayInterval) + 'ms' : parseInt(Math.abs(clickPosition - pos) * self.options.itemsDelayInterval) + 'ms';
		});
		// animation class
		if( this.options.direction === 'r2l' ) {
			classie.add(currentMenu, !isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
		}
		else {
			classie.add(currentMenu, isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');	
		}
		
	};

	MLMenu.prototype._menuIn = function(nextMenuEl, clickPosition) {
			    //console.log('_menuIn '+nextMenuEl);
		var self = this,
			// the current menu
			currentMenu = this.menusArr[this.current].menuEl,
			isBackNavigation = typeof clickPosition == 'undefined' ? true : false,
			// index of the nextMenuEl
			nextMenuIdx = this.menus.indexOf(nextMenuEl),

			nextMenuItems = this.menusArr[nextMenuIdx].menuItems,
			nextMenuItemsTotal = nextMenuItems.length;

		// slide in next menu items - first, set the delays for the items
		nextMenuItems.forEach(function(item, pos) {
			item.style.WebkitAnimationDelay = item.style.animationDelay = isBackNavigation ? parseInt(pos * self.options.itemsDelayInterval) + 'ms' : parseInt(Math.abs(clickPosition - pos) * self.options.itemsDelayInterval) + 'ms';

			// we need to reset the classes once the last item animates in
			// the "last item" is the farthest from the clicked item
			// let's calculate the index of the farthest item
			var farthestIdx = clickPosition <= nextMenuItemsTotal/2 || isBackNavigation ? nextMenuItemsTotal - 1 : 0;

			if( pos === farthestIdx ) {
				onEndAnimation(item, function() {
					// reset classes
					if( self.options.direction === 'r2l' ) {
						classie.remove(currentMenu, !isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
						classie.remove(nextMenuEl, !isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
					}
					else {
						classie.remove(currentMenu, isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
						classie.remove(nextMenuEl, isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
					}
					classie.remove(currentMenu, 'menu__level--current');
					classie.add(nextMenuEl, 'menu__level--current');

					//reset current
					self.current = nextMenuIdx;

					// control back button and breadcrumbs navigation elements
					if( !isBackNavigation ) {
						// show back button
						if( self.options.backCtrl ) {
							classie.remove(self.backCtrl, 'menu__back--hidden');
						}
						
						// add breadcrumb
						self._addBreadcrumb(nextMenuIdx);
					}
					else if( self.current === 0 && self.options.backCtrl ) {
						// hide back button
						classie.add(self.backCtrl, 'menu__back--hidden');
					}

					// we can navigate again..
					self.isAnimating = false;
				});
			}
		});	
		
		// animation class
		if( this.options.direction === 'r2l' ) {
			classie.add(nextMenuEl, !isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
		}
		else {
			classie.add(nextMenuEl, isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
		}
		/*console.log('x'+clickPosition);
		console.log($('.menu__breadcrumbs').children().length);
		if($('.menu__breadcrumbs').children().length==1){
			$('.menu__breadcrumbs').find('a:eq(0)').hide();
	    }*/

  if ( $('.menu__level[data-menu="main"]').hasClass('menu__level--current') ) {
    $('.menu__breadcrumbs').slideUp(300);
  }
  /*else {
  	$('.menu__breadcrumbs').show();
  }*/
	};

	MLMenu.prototype._addBreadcrumb = function(idx) {
		if( !this.options.breadcrumbsCtrl ) {
			return false;
		}

		var bc = document.createElement('a');
		console.log('test'+idx);
		bc.innerHTML = idx ? this.menusArr[idx].name : this.options.initialBreadcrumb;
		/*if(idx==0){
			bc.setAttribute("style","display: block");	
		}else{
			$('.menu__breadcrumbs').find('a:eq(0)').show();
			//bc.setAttribute("style","display: block");
		}*/
		
  if ( $('.menu__level[data-menu="main"]').hasClass('menu__level--current') ) {
    $('.menu__breadcrumbs').slideUp(300);
  }
  else {
  	$('.menu__breadcrumbs').slideDown(300);
  }
		
		this.breadcrumbsCtrl.appendChild(bc);
		var self = this;
		bc.addEventListener('click', function(ev) {
			ev.preventDefault();

			// do nothing if this breadcrumb is the last one in the list of breadcrumbs
			if( !bc.nextSibling || self.isAnimating ) {
				return false;
			}
			self.isAnimating = true;
			
			// current menu slides out
			self._menuOut();
			// next menu slides in
			var nextMenu = self.menusArr[idx].menuEl;
			self._menuIn(nextMenu);

			// remove breadcrumbs that are ahead
			var siblingNode;
			while (siblingNode = bc.nextSibling) {
				self.breadcrumbsCtrl.removeChild(siblingNode);
			}
		});
	};

	window.MLMenu = MLMenu;

$(function () {
  $('.menu__breadcrumbs a:first-child').tooltip({
	title:'القائمة الرئيسية  '
	  });
});
})(window);

