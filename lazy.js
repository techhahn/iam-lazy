(function($) {
  $.fn.imlazy = function(className) {
    var $w = $(window),
            images = this,
            className = className || 'blur',
            loaded;

        this.one("reveal", function() {
          if (this.getAttribute("data-src")) {
            this.setAttribute("src", this.getAttribute("data-src"));
          }
          else if (this.getAttribute("data-bg-src")) {
            $(this).css('background-image', 'url("' + this.getAttribute("data-bg-src") + '")');
          }
          $(this).removeClass(className);
        });

        function reveal() {
          var inview = images.filter(function() {
            var $e = $(this);

            var windowTop = $w.scrollTop(),
                windowHeight = windowTop + $w.height(),
                elementTop = $e.offset().top,
                elementTopnHeight = elementTop + $e.height();
            console.log( windowTop + ' ' + windowHeight + ' ' +  elementTop );
            return elementTopnHeight >= windowTop && elementTop <= windowHeight;
          });
          loaded = inview.trigger("reveal");
          images = images.not(loaded);
          !images.length ? $w.off("scroll resize lookup", reveal) : '';
        }

        $w.on("scroll resize", reveal);

        reveal();

        return this;

  }
})(window.jQuery);
