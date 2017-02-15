// Language selector
/* var arabicPatt = /[\u0600-\u06ff]/;
    [].forEach.call(document.getElementsByTagName('div'), function(div) {
		debugger;
      var lang, dir;
      if (arabicPatt.test(div.textContent)) {
        lang = 'ar'; dir = 'rtl';
      }
      else {
        lang = 'en'; dir = 'ltr';
      }
      div.setAttribute('lang', lang);
      div.setAttribute('dir', dir);
    });
*/
// ---------------------- BS modal height auto --------------//
function setModalMaxHeight(element) {
  this.$element     = $(element);  
  this.$content     = this.$element.find('.modal-content');
  var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
  var dialogMargin  = $(window).width() < 768 ? 20 : 60;
  var contentHeight = $(window).height() - (dialogMargin + borderWidth);
  var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
  var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
  var maxHeight     = contentHeight - (headerHeight + footerHeight);

  this.$content.css({
      'overflow': 'hidden'
  });
  
  this.$element
    .find('.modal-body').css({
      'max-height': maxHeight,
      'overflow-y': 'auto'
  });
}

$('.modal').on('show.bs.modal', function() {
  $(this).show();
  setModalMaxHeight(this);
});

$(window).resize(function() {
  if ($('.modal.in').length != 0) {
    setModalMaxHeight($('.modal.in'));
  }
});



// ------------------------ resposnive JS ------------------------
$(document).ready(function(){
    responsive_resize();
});
// Change width value on user resize, after DOM
$(window).resize(function(){
     responsive_resize();
});
// Fullscreen
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

// switcher
$(function() {                      
  $(".switcher").click(function() {  
    $(".switch-button").toggleClass("switch");
  });
});

// Committee page confirm
$(function() {                      
  $("#confirm, #commentComplete").click(function() {  
    $(this).parent().parent().next(".status-confirm").addClass("active");
	$(this).parent().parent().next(".final-CommStatus").addClass("active");
	$('.comm-tabs').css('box-shadow', '1px 1px 5px 9999px rgba(0,0,0,.75)');
  });
});
$(function() {                      
  $("#back, #edit").click(function() {  
    $(".status-confirm").removeClass("active");
	$(".final-CommStatus").removeClass("active");
	$('.comm-tabs').css('box-shadow', '1px 1px 5px rgba(0,0,0,.22)');
  });
});

// menu opener
$(function() {                      
  $(".nav-opener").click(function() {  
    $("aside").toggleClass("open");
	$(".user-login-info").toggleClass("open");
	$(this).toggleClass("pull");
	$("#nav-icon1").toggleClass("open");
	$("body").toggleClass("nav-closed");
  });
});
// activity opener
$(function() {                      
  $(".act-opener").click(function() {  
	$(this).toggleClass("pull");
	$("body").toggleClass("activity");
  });
});
// notifications
/*$(function() {                      
  $(".notify-icon, .notify-count").click(function(event) {  
	$(".notifications").toggleClass("opened");
	$(".notifications-drop").toggle(200);
  event.stopPropagation();
    }); 
	$(document).on("click", function(event)
{
		$(".notifications").removeClass("opened");
	$(".notifications-drop").slideUp(200);
});
});*/

$('.theme-menu a').click(function(event){
        $('.theme-menu ul').toggleClass('open');
        $('.setting-menu ul').removeClass('open');
        event.stopPropagation();
    });
$('body').click(function(event) {
        if (!$(event.target).is('.theme-menu ul, .theme-menu ul *')) 
        {
            $('.theme-menu ul').removeClass('open');
        }
    });

$(document).ready(function(){
    $(".notify-icon, .notify-count").click(function(event){
        event.stopPropagation();
		 $(".notifications").toggleClass("opened");
	$(".notifications-drop").slideToggle(200);
	
    });
    $(".notifications-drop li a").on("click", function (event) {
        event.stopPropagation();
		$(this).tab('show');
    });
	$(".notify-ul").on("click", function (event) {
        event.stopPropagation();
		
    });
});

/*$('body').on("click", function () {
	$(".notifications").removeClass("opened");
	$(".notifications-drop").slideUp(200);
	
});*/
$('body').click(function(event) {
        if (!$(event.target).is('.notifications')) 
        {
            $(".notifications").removeClass("opened");
	$(".notifications-drop").slideUp(200);
        }
    });
// print certificate
/*$(function() {                      
  $(".print-cert").click(function() {  
	$("#cert-options").toggleClass("move-left");
	$(".cert-pdf").toggleClass("move-left");
	
	$(".back-tab").toggle(200);
	$(".close-tab").toggle(200);
  });
  
   $(".back-tab").click(function() {  
	$("#cert-options").toggleClass("move-left");
	$(".cert-pdf").toggleClass("move-left");
	$(this).toggle(200);
	$(".close-tab").toggle(200);
  });
});*/


// sample message open
$(function() {                      
  $(".sample-msg").click(function() {  
	$(".f1").addClass("move-left");
	$(".sample-message").addClass("move-left");
	$(".close-tab1").hide(200);
	$(".back-tab1").show(200);
  });
  
  $(".back-tab1, .continue").click(function() {  
	$(".f1").removeClass("move-left");
	$(".sample-message").removeClass("move-left");
	$(".close-tab1").show(200);
	$(".back-tab1").hide(200);
  });
});

// copy textarea content
function displayOut(){

var txtTop=document.getElementById("textarea-reply").value;

var inputTop=document.getElementById("input-reply").value;
var txtBottom=document.getElementById("textarea-sample").value;
var inputBottom=document.getElementById("input-sample").value;


if((txtBottom.length ===0) && (inputBottom.length ===0))
{
	alert("Please enter a valid input");
	return;
}else{
    document.getElementById("textarea-reply").value=txtBottom;
    document.getElementById("input-reply").value=inputBottom;
	$(".f1").removeClass("move-left");
	$(".sample-message").removeClass("move-left");
	$(".close-tab").show(200);
	$(this).hide(200);
    }
    }

 
var isAdvanceSearchOpen = false;
var isSearchOpen = true;
// search toggle
$(function() {      
              
  $(".search-opener").click(function() {  
	$("body").removeClass("advSearch-open");
	$(".adv-options").hide();
	
	//alert(isSearchOpen);
	if(isSearchOpen == true){
		
		$('.main-wrpr').css('padding-top', 0);
		$('.search-bar, .days-timeline').slideUp(200).css('top', -300);
		$("body").addClass("search-up");
		isSearchOpen =false;
		}else{
			isSearchOpen =true;
			$('.main-wrpr').css('padding-top', 154);
			$('.search-bar, .days-timeline').slideDown(200).css('top', 108);
			$("body").removeClass("search-up");
			}
  });
});

$(".doc-options .tab-icons").click(function() {  
	$(".doc-options").toggleClass("circle");
	$("body").toggleClass("footer")
});
// activity into circle
/*var isfooterOpen = true;
$(function() {                      
  $(".doc-options .tab-icons").click(function() {  
	$(".doc-options").toggleClass("circle");
	//$("body").toggleClass("footer");

	if(isfooterOpen == true){
		
		$('body').css('padding-bottom', 0);
		isfooterOpen = false;
		}else{
			isfooterOpen = true;
			$('body').css('padding-bottom', $('.doc-options').height());
			}
  });
});*/

// card height toggle
$(document).ready(function() {           
$(".extra").slideUp();          
  $(".show-more").click(function() {  
	//$(this).prev().find(".extra").fadeToggle().css("display" , "flex");
	$(this).prev().find(".extra").toggle(1000).css("display" , "flex");
	//$(".show-more label").html($("Show less").text()  );
  });
});
$(function() {                      
  $(".show-more").click(function() {  
    $(".extra").toggleClass("more");
  });
});

// Accordian plus and minus
function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('fa-plus-circle fa-minus-circle');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);

// content toggle
$(function() {                      
  $(".expand-table").click(function() {  
    $(this).closest(".card").find(".box-content, .tab-content").slideToggle(300);
	$(this).closest(".card").find(".show-more").slideToggle(300);
	$(this).toggleClass("expand");
  });
});

// advanced search
$(function() {                      
  $(".adv-search").click(function() {  
    $(".adv-options").toggle();
	$("body").toggleClass("advSearch-open");
	isAdvanceSearchOpen = true;
	
	if(isAdvanceSearchOpen){
		$('.main-wrpr').css('padding-top', $(".search-bar").height()+40);
		}
  });
});
$(document).ready(function() {
	$('.main-wrpr').css({"padding-top": $(".search-bar").height()+15});
	$('.appoint-wrpr').css({"padding-top": $(".days-timeline").height()+15});
	$('.gc-wrpr').css('padding-top', $(".comm-tabs .nav-tabs").height()+10);
	
	//$('.main-wrpr').css('padding-bottom', $(".doc-options").height()+20);
	
	
	//$('body').css({"padding-bottom": $(".doc-options").height()});
	/*$('.comm-tabs li').click(function() {  
	//debugger;
	setTimeout(function(){
	isAdvanceSearchOpen = true;
	if(isAdvanceSearchOpen){
		$('.main-wrpr').css('padding-top', $(".comm-tabs").height()+5);
		}
		},160);
  });*/
});



// Tooltip Init
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
// Conversation scrolling 


// container scroller
$(document).ready(function() {
	var k = 20;
	var height = $("header").height();
	var subHeader = $(".sub-header").height();
	//var searchBar = $(".search-bar").height();
	//var Advsearch = $(".adv-search").height();
	var conversationCompose = $(".conversation-compose").height();
	var actHeader = 140;
  function setHeight() {
    windowHeight = $(window).innerHeight();
    //$('.wrpr').css('height', windowHeight - (height+subHeader+k));
	$('.conversation-container').css('height', windowHeight - (height+subHeader+conversationCompose+actHeader));
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
});


//  analog and digital clock
$(document).ready(function(){
                $('#clock_uae').jClocksGMT(
                {
                    offset: '+4', 
                });
            });


// Datatables initialising
$(document).ready(function() {
    $('.dataTable_master').DataTable({
		"scrollX": true,
		//"pagingType": "full_numbers",
		sPaginationType: 'full_numbers',
		responsive: true,
		
	});
});
$(document).ready(function() {
    $('.case-table').DataTable({
		"scrollX": true,
		//"pagingType": "full_numbers",
		sPaginationType: 'full_numbers',
		responsive: true,
		searching: false
	});
});

function responsive_resize(){
	 var current_width = $(window).width();
    //do something with the width value here!

	  if(current_width < 1400){
		  $(document).ready(function() {
		  $('body').removeClass("activity").removeClass("footer").addClass("nav-closed");
		  $('.act-opener').addClass("pull");
		  $('.doc-options').addClass("circle");
		  $('aside, .user-login-info').addClass("open");
		  $('#nav-icon1').removeClass("open");
	  });
}  
    //else if(current_width < 739)
     // $('html').addClass("m768").removeClass("desktop").removeClass("m320").removeClass("tablet");
 
}

// TEXT AREA AUTGROW JS
;(function($){    
    //pass in just the context as a $(obj) or a settings JS object
    $.fn.autogrow = function(opts) {
        var that = $(this).css({overflow: 'hidden', resize: 'none'}) //prevent scrollies
            , selector = that.selector
            , defaults = {
                context: $(document) //what to wire events to
                , animate: true //if you want the size change to animate
                , speed: 200 //speed of animation
                , fixMinHeight: true //if you don't want the box to shrink below its initial size
                , cloneClass: 'autogrowclone' //helper CSS class for clone if you need to add special rules
                , onInitialize: false //resizes the textareas when the plugin is initialized
            }
        ;
        opts = $.isPlainObject(opts) ? opts : {context: opts ? opts : $(document)};
        opts = $.extend({}, defaults, opts);
        that.each(function(i, elem){
            var min, clone;
            elem = $(elem);
            //if the element is "invisible", we get an incorrect height value
            //to get correct value, clone and append to the body. 
            if (elem.is(':visible') || parseInt(elem.css('height'), 10) > 0) {
                min = parseInt(elem.css('height'), 10) || elem.innerHeight();
            } else {
                clone = elem.clone()
                    .addClass(opts.cloneClass)
                    .val(elem.val())
                    .css({
                        position: 'absolute'
                        , visibility: 'hidden'
                        , display: 'block'
                    })
                ;
                $('body').append(clone);
                min = clone.innerHeight();
                clone.remove();
            }
            if (opts.fixMinHeight) {
                elem.data('autogrow-start-height', min); //set min height                                
            }
            elem.css('height', min);
            
            if (opts.onInitialize && elem.length) {
                resize.call(elem[0]);
            }
        });
        opts.context
            .on('keyup paste', selector, resize)
        ;
    
        function resize (e){
            var box = $(this)
                , oldHeight = box.innerHeight()
                , newHeight = this.scrollHeight
                , minHeight = box.data('autogrow-start-height') || 0
                , clone
            ;
            if (oldHeight < newHeight) { //user is typing
                this.scrollTop = 0; //try to reduce the top of the content hiding for a second
                if(opts.animate) {
                    box.stop().animate({height: newHeight}, {duration: opts.speed, complete: notifyGrown});
                } else {
                    box.innerHeight(newHeight);
                    notifyGrown();
                }
                
            } else if (!e || e.which == 8 || e.which == 46 || (e.ctrlKey && e.which == 88)) { //user is deleting, backspacing, or cutting
                if (oldHeight > minHeight) { //shrink!
                    //this cloning part is not particularly necessary. however, it helps with animation
                    //since the only way to cleanly calculate where to shrink the box to is to incrementally
                    //reduce the height of the box until the $.innerHeight() and the scrollHeight differ.
                    //doing this on an exact clone to figure out the height first and then applying it to the
                    //actual box makes it look cleaner to the user
                    clone = box.clone()
                        //add clone class for extra css rules
                        .addClass(opts.cloneClass)
                        //make "invisible", remove height restriction potentially imposed by existing CSS
                        .css({position: 'absolute', zIndex:-10, height: ''}) 
                        //populate with content for consistent measuring
                        .val(box.val()) 
                    ;
                    box.after(clone); //append as close to the box as possible for best CSS matching for clone
                    do { //reduce height until they don't match
                        newHeight = clone[0].scrollHeight - 1;
                        clone.innerHeight(newHeight);
                    } while (newHeight === clone[0].scrollHeight);
                    newHeight++; //adding one back eliminates a wiggle on deletion 
                    clone.remove();
                    box.focus(); // Fix issue with Chrome losing focus from the textarea.
                    
                    //if user selects all and deletes or holds down delete til beginning
                    //user could get here and shrink whole box
                    newHeight < minHeight && (newHeight = minHeight);
                    if(oldHeight > newHeight) {
                        if(opts.animate) {
                            box.stop().animate({height: newHeight}, {duration: opts.speed, complete: notifyShrunk});
                        } else {
                            box.innerHeight(newHeight);
                            notifyShrunk();
                        }
                    }
                    
                } else { //just set to the minHeight
                    box.innerHeight(minHeight);
                }
            } 
        }

        // Trigger event to indicate a textarea has grown.
        function notifyGrown() {
            opts.context.trigger('autogrow:grow');
        }

        // Trigger event to indicate a textarea has shrunk.
        function notifyShrunk() {
            opts.context.trigger('autogrow:shrink');
        }
	$(".send").click(function() {
		 $('textarea').css('height' , '60px');
		 //$('.transactions').css({opacity: '0' , transform: 'scaleY(.6)' , position: 'relative', top: '-100px'}).delay(2000);
		 var delay = 0;
		$('.transactions').each(function() {
    var $li = $(this);
	setTimeout(function() {
      $li.addClass("fadeInDown go animated");
    }, delay+=150 );
  });	
		});
        return that;
    }
})(jQuery);
$('textarea1').autogrow();

// css change on load
(function($){
        
			$(window).on("load",function(){
		 var delay = 0;
		$('.transactions').each(function() {
    var $li = $(this);
	setTimeout(function() {
      $li.addClass("fadeInDown go animated");
    }, delay+=150 );
  });	
   });
   setTimeout(function() {
      $li.removeClass("fadeInDown go animated");
      $li.css("opacity","1");	  
    }, 2000 );
    })(jQuery);
// css load for details cards	
	(function($){
        $(window).on("load",function(){
		 var delay = 0;
		$('.card.md').each(function() {
    var $li = $(this);
	setTimeout(function() {
      $li.addClass("fadeInUp go animated");
    }, delay+=150 );	
  });	
    });
		setTimeout(function() {
      $('.card.md').removeClass("fadeInUp go animated");
      $('.card.md').css("opacity","1");	  
    }, 2000 );  
    })(jQuery);
			
// ColorBox Close

$("#open-policeStn").click(function() {
        $('.toPoliceStn').slideToggle(200);
   });
$("#PStn-confirm").click(function() {
        $('#open-policeStn , .toPoliceStn , #open-declineLog').slideUp(200);
		$('#trans-done').slideDown(200);
   });
$("#open-declineLog").click(function() {
        $('.declineLog').slideToggle(200);
   });  
$("#trans-decline").click(function() {
        $('#open-policeStn , .declineLog , #open-declineLog').slideUp(200);
		$('#trans-declined').slideDown(200);
   });    


//  Select dropdown
$(document).ready(function() {
  $("select").select2({width:'100%'});
});
		
//  GCC tags
$(".tags").click(function() {
		$(this).toggleClass("selected");
		$(".tags").removeClass("selected");
		$(this).addClass("selected");
		
		});


// chat section like whatsapp
/* Meme */

var memes = [
	'',
];

var random = document.querySelector('#random');

random.innerHTML = memes[Math.floor(Math.random() * memes.length)];

/* Time */

var deviceTime = document.querySelector('.status-bar .time');
var messageTime = document.querySelectorAll('.message .time');

deviceTime.innerHTML = moment().format('h:mm');

setInterval(function() {
	deviceTime.innerHTML = moment().format('h:mm');
}, 1000);

for (var i = 0; i < messageTime.length; i++) {
	messageTime[i].innerHTML = moment().format('h:mm A');
}

/* Message */

var form = document.querySelector('.conversation-compose');
var conversation = document.querySelector('.conversation-container');

form.addEventListener('submit', newMessage);

function newMessage(e) {
	var input = e.target.input;

var item ;
	if($("input[type='radio'].statusBtnClass").is(':checked')) {
    	    item = $("input[type='radio'].statusBtnClass:checked").val();
    	}
		/*if(item==null && item== undefined){
			alert("Please select status first");
			return false;
			}*/
	if (input.value) {
		var message = buildMessage(input.value,item);
		conversation.appendChild(message);
		animateMessage(message);
		
	}

	input.value = '';
	conversation.scrollTop = conversation.scrollHeight;
	e.preventDefault();
 
	("#td_id").attr('class', 'newClass');
}

function buildMessage(text,status) {
	var element = document.createElement('div');
var className;
if(status==1){
	className='<div class="status-icons cancel tick-animation">' 
}
if(status==2){
	className='<div class="status-icons pending tick-animation">' 
}

	element.classList.add('transactions', 'message', 'sent');

	element.innerHTML = className +
			'</div>' + '<div class="content-bubble">'+ '<div class="trans-text">'+ text + '</div>' +
		'<div class="lawyer">' + ' الوكيل ابراهيم سيد مصطفى سيد محمد سيد ابراهيم الهاشمي ' + '</div>' +
		'<div class="metadata trans-time">' +
			'<div class="date">' + '01/06/2016' + '</div>' +
			'<div class="time">' + moment().format('h:mm A') + '</div>' +
			'</div>' ;

	return element;
}

function animateMessage(message) {
	setTimeout(function() {
		var tick = message.querySelector('.tick');
		tick.classList.remove('tick-animation');
	}, 500);
}		
	