$(document).ready(function(){
  var total = 0;
  var checkReady = function() {
    console.log('checking if ready...')
    if (typeof $('.panel-body') === 'undefined' || $('.panel-body').length === 0) {
      console.log('not ready')
      return false;
    } else {
      console.log('ready')
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

        const currentTimeArr = document.getElementsByClassName('vjs-current-time-display')[0].textContent.split(' ');
        const currentTime = currentTimeArr[currentTimeArr.length - 1];
        const currentTimeSplit = currentTime.split(':')
        const currentTimeInMinutes = +currentTimeSplit[0] + (currentTimeSplit[1] / 60)

        total -= currentTimeInMinutes

        const playbackRate = parseFloat($('.vjs-playback-rate-value').html())
        const adjustedTotal = total / playbackRate

        var minutes = ((total % 60) + "").split('.')[0];
        var hours = ((total / 60) + "").split('.')[0];

        var adjustedMinutes = ((adjustedTotal % 60) + "").split('.')[0];
        var adjustedHours = ((adjustedTotal / 60) + "").split('.')[0];

        var string = `${hours} hours and ${minutes} minutes remaining`;
        var adjustedString = `${adjustedHours} hours and ${adjustedMinutes} minutes at this speed`;


        const timeScreenPanels = $('.course-info__section.time');
        if (timeScreenPanels.length > 0) {
          if (timeScreenPanels.length > 1) {
            timeScreenPanels[1].remove()
          }
          timeScreenPanels[0].remove()
        }

        $('.course-info__section').append(
          '<div class="course-info__section hidden-xxs hidden-xs time" style="clear:left;display: block;">' +
          string +
          '</div>' +
          '<div class="course-info__section hidden-xxs hidden-xs time" style="clear:left;display: block;">' +
          adjustedString +
          '</div>'
        )

        rawTime = timeArr = min = sec = total = minutes = hours = string = null
      }, 2000);

    }
  }, 2000);
});
