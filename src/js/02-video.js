const iframe = document.querySelector('iframe');
const player = new Player(iframe);
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

let currentTime;

const storageKey = 'videoplayer-current-time';

function takeCurrentTime(event) {
  localStorage.setItem(storageKey, event.seconds);
}

currentTime = localStorage.getItem(storageKey);

player.on('timeupdate', throttle(takeCurrentTime, 1000));

player
  .setCurrentTime(currentTime || 0)
  .then(function () {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
