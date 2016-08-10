(function($) {
  $.fn.imlazy = function(className) {
    var $w = $(window),
            images = this,
            className = className || 'blur',
            loaded;

        this.one("reveal", function() {
          var self = this;
          if (this.getAttribute("data-src")) {
            $('<img />', {
              src: this.getAttribute("data-src")
            }).load(function() {
              self.setAttribute("src", self.getAttribute("data-src"));
              $(self).removeClass(className);
            });
          }
          else if (this.getAttribute("data-bg-src")) {
            $('<img />', {
              src: this.getAttribute("data-bg-src")
            }).load(function() {
              $(self).css("background-image", 'url("' + self.getAttribute("data-bg-src") + '")');
              $(self).removeClass(className);
            });
          }
          
        });

        function reveal() {
          var inview = images.filter(function() {
            var $e = $(this);

            var windowTop = $w.scrollTop(),
                windowHeight = windowTop + $w.height(),
                elementTop = $e.offset().top,
                elementTopnHeight = elementTop + $e.height();
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
