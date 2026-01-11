/**
 * This is my first JavaScript file.
 * Author - Trey Custodio
 */

/**
 * Animated Class that represents a glowing object.
 */
class Animated {
  constructor(element, nFrames, fps) {
    //  Animation data
    this.nFrames = nFrames;
    this.fps = fps;
    this.frame = 0;
    this.animation_timer = 0.0;
    this.element = element


    //  RGB info
    this.r = 210;
    this.g = 222;
    this.b = 255;
    this.delta = 6;
    this.rgb_string = "rgb(0,0,0)";
    this.max = 255;
    this.min = 50;

    //  States
    this.brightening = false;
    this.background_set = true;
    this.update_r = true;
    this.update_g = true;
    this.update_b = true;

  }

  set_rgb(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  set_background_color(rgb_string) {
    this.element.style.backgroundColor = rgb_string;
  }

  update(delta) {
    

    //  Increment animation timer
    this.animation_timer += delta;

    //  Update the animation once every 1/fps sezconds
    if (this.animation_timer >= 1/this.fps){
      

      //  Reset animation timer
      this.animation_timer = 0.0;
      
      if (!update_color) {
        if (!this.background_set) {
          //  Increment the frame
          this.frame++;
          this.frame %= this.nFrames;

          if (this.frame == 0){
            this.set_background_color("rgb(210, 222, 255)");
            this.background_set = true;
          }
        }
        return
      }

      //  Update the color
      if (this.brightening) {
        if (this.update_b) {
          this.b += this.delta;
          if (this.b >= this.max) {
            this.b = this.max;
            this.brightening = false;
          }
        }

        if (this.update_r) {
          this.r += this.delta;
          if (this.r >= this.max) {
            this.r = this.max;
            this.brightening = false;
          }
        }

        if (this.update_g) {
          this.g += this.delta;
          if (this.g >= this.max) {
            this.g = this.max;
            this.brightening = false;
          }
        }
      }

      else {
        if (this.update_b) {
          this.b -= this.delta;
          if (this.b <= this.min) {
            this.b = this.min;
            this.brightening = true;
          }
        }

        if (this.update_r) {
          this.r -= this.delta;
          if (this.r <= this.min) {
            this.r = this.min;
            this.brightening = true;
          }
        }

        if (this.update_g) {
          this.g -= this.delta;
          if (this.g <= this.min) {
            this.g = this.min;
            this.brightening = true;
          }
        }
      }
      
      //  Set the background color
      this.rgb_string = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
      this.set_background_color(this.rgb_string)
    }
  }
}



/**
 * Webpage Elements/Triggers
 */
const beats = document.getElementById('beats');
const search = document.getElementById('search');
const about = document.getElementById('about');

const audio_1 = new Audio("beats/Biotech.wav");
const frozen_core = new Audio("beats/Frozen_Core.wav");
const plants = new Audio("beats/Fake_Plants_Don't_Grow.wav");

let audio = [audio_1, frozen_core, plants]
let play_buttons = [
  document.getElementById("play_bio"),
  document.getElementById("play_frozen"),
  document.getElementById("play_plants")
  ]

let sections = []

for (let i = 0; i < 3; i++) {
  sections.push(document.getElementById(i.toString()))
}

/**
 * Scroll to the desired section
 */
function scroll_to(element){
  element.scrollIntoView({ behavior: 'smooth' });
}

function press_play(playButton, audioElem, section){
  // Play the audio if paused
  if (audioElem.paused){
    // Pause all other audios playing
    for (let i = 0; i < 3; i++) {

      if (audio[i].paused) {
        continue
      }

      else {
        audio[i].pause()
        play_buttons[i].src = "images/play.png"
        sections[i].style.backgroundColor = "rgb(0, 0, 0)";

      }
    }

    // Play the audio
    audioElem.play();
    playButton.src = "images/pause.png";
    audioElem.loop = true;
    section.style.backgroundColor = "rgb(160, 0, 0)";

  }

  // Pause the audio if playing
  else {
    audioElem.pause();
    playButton.src = "images/play.png"
    section.style.backgroundColor = "rgb(0,0,0)"
  }
}

/**
 * Event Listeners
 */
for (let i = 0; i <= 3; i++) {
  play_buttons[i].addEventListener("click", (event) => press_play(play_buttons[i], audio[i], sections[i]));
}


/**
 * Driver Code
 */
function main() {
  // Get the time in between the last frame and the current frame
  let last_time = performance.now();
  setInterval(() => {
    const now = performance.now();
    const deltaSec = (now - last_time) / 1000;
    last_time = now;
    color.update(deltaSec);
  }, 16);

  return
}

main()