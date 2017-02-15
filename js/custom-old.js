// switcher
$(function() {                      
  $(".switcher").click(function() {  
    $(".switch-button").toggleClass("switch");
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

// activity into circle
$(function() {                      
  $(".doc-options .tab-icons").click(function() {  
	$(".doc-options").toggleClass("circle");
  });
});

// search toggle
$(function() {                      
  $(".search-opener").click(function() {  
    $(".search-bar").slideToggle(200);
	$(this).toggleClass("magnify");
  });
});
// card height toggle
$(function() {                      
  $(".show-more").click(function() {  
    $(".applicant-details").toggleClass("more");
  });
});
// content toggle
$(function() {                      
  $(".expand-table").click(function() {  
    $(".tab-content, .box-content").slideToggle(300);
	$(this).toggleClass("expand");
  });
});
// container scroller
$(document).ready(function() {
	var k = 20;
	var height = $("header").height();
	var subHeader = $(".sub-header").height();
	var searchBar = $(".search-bar").height();
	var Advsearch = $(".adv-search").height();
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.wrpr').css('height', windowHeight - (height+subHeader+searchBar+k));
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
});

// advanced search
$(function() {                      
  $(".adv-search").click(function() {  
    $(".adv-options").slideToggle(200);
	function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.wrpr').css('height', windowHeight - (height+subHeader+searchBar+Advsearch));
  };
  });
});
//  analog and digital clock
$(document).ready(function(){
                $('#clock_uae').jClocksGMT(
                {
                    offset: '+4', 
                });
            });

// datepicker
$(document).ready(function(){
      $('.datepicker').Zebra_DatePicker({direction: 0,always_visible: 							$('#zebracontainer1')});
      	$('#datepickbox1').bind('click',function(){
      	$('.searchslide').addClass('active');
      	$('#zebracontainer1').addClass('active');	
      });
      $('.dp_daypicker, .dp_footer').bind('click',function(){
      $('.searchslide').removeClass('active');
      $('.zbc').removeClass('active');
});

$('.datepicker').Zebra_DatePicker({direction: 0,always_visible: 							$('#zebracontainer1')});
      	$('#datepickbox1').bind('click',function(){
      	$('.searchslide').addClass('active');
      	$('#zebracontainer1').addClass('active');	
      });
      $('.dp_daypicker, .dp_footer').bind('click',function(){
      $('.searchslide').removeClass('active');
      $('.zbc').removeClass('active');
});
});

// Main container scrolling to hide advance search 
var lastScrollTop = 0;
$(".dashboard .tab-pane").scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       // downscroll code
       $(".user-pic").addClass("scrollup");
	   $(this).addClass("scrolling");
   } else {
      // upscroll code
       $(".user-pic").removeClass("scrollup");
	   $(this).removeClass("scrolling");
   }
   lastScrollTop = st;
});

// Datatables initialising
$(document).ready(function() {
    $('#example').DataTable({
		"scrollX": true,
		responsive: true,
	});
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
		});
        return that;
    }
})(jQuery);
$('textarea').autogrow();
