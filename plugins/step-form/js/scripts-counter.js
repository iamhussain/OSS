
function scroll_to_class(element_class, removed_height) {
	var scroll_to = $(element_class).offset().top - removed_height;
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 0);
	}
}

function bar_progress(progress_line_object, direction) {
	var number_of_steps = progress_line_object.data('number-of-steps');
	var now_value = progress_line_object.data('now-value');
	var new_value = 0;
	if(direction == 'right') {
		new_value = now_value + ( 100 / number_of_steps );
	}
	else if(direction == 'left') {
		new_value = now_value - ( 100 / number_of_steps );
	}
	progress_line_object.attr('style', 'height: ' + new_value + '%;').data('now-value', new_value);
}

jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
  //  $.backstretch("assets/img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /*
        Form
    */
    $('.f1 fieldset:first').fadeIn('slow');
    
    $('.f1 input[type="text"], .f1 select, .f1 textarea , .f2 input[type="text"], .f2 select, .f2 textarea , .f3 input[type="text"], .f3 select, .f3 textarea, .f4 input[type="text"], .f4 select, .f4 textarea ').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    // next step
    $('.f1 .btn-next, .f2 .btn-next, .f3 .btn-next, .f4 .btn-next, .f1-step-icon11').on('click', function() {
    	debugger;
    	var parent_fieldset = $(this).parents('fieldset');
        //alert(parent_fieldset.html());
        if(parent_fieldset.html() == undefined){            
            var stepCounter = $(this).attr('id').split('_')[1];
            parent_fieldset = $(this).parents('form').children('fieldset:nth-child('+stepCounter+')');            
        }
        //var parent_fieldset = $(this).parents('form').children('fieldset');
    	var next_step = true;
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1, .f2, .f3, .f4').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1, .f2 ,.f3, .f4').find('.f1-progress-line');
    	
    	
       	// fields validation 
    	parent_fieldset.find('select').each(function() {
    		if( $(this).val() == "" ) {
    			if(this.id == 'status'){
    				if($(this).val() == ""){
    					next_step = false;
    					$(this).parent().find('.select2-selection').addClass('input-error');
    				}else{
    					$(this).parent().find('.select2-selection').removeClass('input-error');
    				
    				}
    			}
    		
    		}else{
    			$(this).parent().find('.select2-selection').removeClass('input-error');
    		}
    		
    		
    	});
    	
    	
    	if(next_step){
    	// fields validation
    	//parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function() {
            parent_fieldset.find('.required input, .required textarea').each(function() {
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
                $(".validation-div").slideDown('300');
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
                $(".validation-div").hide();
                $(".btn-next").addClass("reveal");
    		}    		

    	});
    	// fields validation
    	}
    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
    			// change icons
    			current_active_step.removeClass('active').addClass('activated').next().addClass('active');
    			// progress bar
    			bar_progress(progress_line, 'right');
    			// show next step
	    		$(this).next().fadeIn();
	    		// scroll window to beginning of the form
    			scroll_to_class( $('.f1, .f2, .f3, .f4'), 20 );
	    	});
    	}
    	
    });
    
    // previous step
    $('.f1 .btn-previous, .f2 .btn-previous, .f3 .btn-previous , .f4 .btn-previous, .f1-step-icon111').on('click', function() {
    	// navigation steps / progress steps
    	debugger;
        //var stepCounter = $(this).attr('id').split('_')[1];
        //parent_fieldset = $(this).parents('form').children('fieldset:nth-child('+stepCounter+')');
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
        //alert(current_active_step.html());
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    	$(this).parent().find('span').removeClass('input-error');
    	$(this).parents('fieldset').fadeOut(400, function() {
    		// change icons
    		current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
    		// progress bar
    		bar_progress(progress_line, 'left');
    		// show previous step
    		$(this).prev().fadeIn();
    		// scroll window to beginning of the form
			scroll_to_class( $('.f1, .f2, .f3, .f4'), 20 );
    	});
    });
    
    // submit
    $('.f1, .f2, .f3, .f4').on('submit', function(e) {
    	
    	// fields validation
    	$(this).find('.required input, .required textarea').each(function() {
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	// fields validation
    	
    });
    
    
});
function testPrev(divData){
        var stepCounter = parseInt($(divData).attr('id').split('_')[1])+1;
         var currentStepCounter = $('.fl-step.active').attr('id').split('_')[1];
    
        alert(stepCounter+'_'+currentStepCounter);
        //alert($('.f1').children('fieldset:nth-child('+stepCounter+')').html());
        
        $('.f1').children('fieldset:nth-child('+stepCounter+')').find('.btn-previous').click();
        
    }