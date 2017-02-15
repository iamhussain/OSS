(function($){
    //***********************
    //  toastee plugin v1.0
    //  super light weight toast notification plugin ( requires jQuery )
    //  author: Eric Rogers
    //  options: {
    //  type: 'info', 'error', 'success',
    //  header: 'your header text',
    //  message: 'your message',
    //  color: 'text and close button color',
    //  background: 'background color',
    //  width: takes an integer (default is 150),
    //  height: takes an integer (default is 150)
    //  }
    //**********************

    $.fn.toastee = function(options) {
        var settings = $.extend ({
            type: 'info',
            header: '',
            message: 'What a great Toast!',
            color: '#fff',
            background: '#3498db',
            width: 500,
            height: 150,
            fadeout: 2000
        }, options);

        
        var self = this;
        var dataId = Math.floor(Math.random() * 100000);
        var backgrounds = {'info': '#3498db', 'error': '#e74c3c', 'success': '#2ecc71'};
        var headers = {'info': 'Info', 'error': 'Error!', 'success': 'Success!'};

        if (options == undefined) {
            options = {'empty': 'empty'};
        }

        switch (settings.type) {
            case 'info':
                settings.background = options.background || backgrounds.info;
                settings.header = options.header || headers.info;
                break;
            case 'error':
                settings.background = options.background || backgrounds.error;
                settings.header = options.header || headers.error;
                break;
            case 'success':
                settings.background = options.background || backgrounds.success;
                settings.header = options.header || headers.success;
        };
        
        var toast = '<div class="toast-wrpr" data-id="' + dataId +'" style="max-width: '+ settings.width +'px; height: '+ settings.height +'px; background: '+ settings.background +';">';
        toast += '<a class="closeToastee"><i class="material-icons">close</i></a>';
        toast += '<div class="toast-heading">' + settings.header + '</div>';
        toast += '<p class="toast-msg">' + settings.message + '</p>';
        toast += '</div>';

        var timer ={};

        var startTimer = function(){
            timer.dataId =  setTimeout(function() {
            
            $('div[data-id="'+ dataId +'"]').fadeOut(settings.fadeout, function(){
                $(this).remove();
            });
            }, 3000);
        };

        var stopTimer = function () {
            clearTimeout(timer.dataId);
        };

        $(this).append(toast);

        $('div[data-id="'+ dataId +'"]').hide(0).fadeIn(500);
        startTimer();
        
        $('.closeToastee').on('click', function () {
           $(this).parent().hide().remove(); 
        });

        $('div[data-id="' + dataId + '"]').mouseover(function(){
            stopTimer();
            $(this).stop().fadeIn(0);
        }).mouseout(function(){
            startTimer();
        });

            
        return this;
    };
})(jQuery);
