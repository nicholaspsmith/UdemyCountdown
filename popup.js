$(document).ready(function(){
  var total = 0;
  var checkReady = function() {
    if (typeof $('.sidebar--nav') === 'undefined' || $('.sidebar--nav').length === 0) {
      return false;
    } else {
      return true;
    }
  }

  var interval = setInterval(function(){
    if (checkReady()) {
      clearInterval(interval)
      setInterval(function(){
        $('.lecture__item').not('.completed').map(function(i,el){
          const rawTime = $(el).find('.lecture__item__link__time').html();
          var timeArr = rawTime.split(':');
          var min = +timeArr[0];
          var sec = +timeArr[1];
          sec = sec / 60;
          min += sec;
          total += min;
        });
        var minutes = ((total % 60) + "").split('.')[0];
        var hours = ((total / 60) + "").split('.')[0];
        var string = `${hours} hours and ${minutes} minutes remaining in this course`;
        console.log(string);

        $('.curriculum-navigation .panel-group .panel')[0].remove()

        $('.curriculum-navigation .panel-group').prepend(
          '<div class="panel curriculum-navigation__section">' +
          '<div class="panel-heading">' + 
          '<div class="curriculum-navigation__section__title">' + 
          string +
          '</div>' +
          '</div>' +
          '</div>'
        )

        rawTime = timeArr = min = sec = total = minutes = hours = string = null
      }, 5000);

    }
  });  
});
