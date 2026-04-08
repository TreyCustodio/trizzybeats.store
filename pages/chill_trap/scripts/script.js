/**
 * This is my first JavaScript file.
 * Author - Trey Custodio
 */

// import WaveSurfer from 'wavesurfer.js'

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
    this.animate = false


    //  RGB info
    this.r = 160;
    this.g = 222;
    this.b = 255;
    this.delta = 6;
    this.rgb_string = "rgb(0,0,0)";
    this.max = 160;
    this.min = 50;

    //  States
    this.brightening = false;
    this.background_set = true;
    this.update_r = true;
    this.update_g = false;
    this.update_b = false;

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
    
    if (not (this.animate)){
      return
    }

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
            this.set_background_color("rgb(0,0,0)");
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
 * ================ Webpage Elements/Triggers ===========================
 */

// Metadata
const track_count = 8;
const beats       = document.getElementById('beats');
const search      = document.getElementById('search');
const about       = document.getElementById('about');
const body        = document.getElementById('body');
let _animate      = false;

// Audio files
const audio       = new Audio("Chill-Trap.wav");


// Body Animation Variables
let body_increasing = true;
let body_red        = 0;
let body_max        = 120;
let body_min        = 0;
let body_fps        = 64;
let body_timer      = 0.0;

// Play Button
const play = document.getElementById("play")
play.addEventListener("click", (event) => press_play());
play.addEventListener("mouseenter", (event) => play_hover());
play.addEventListener("mouseleave", (event) => play_leave());





/**
 * ================ Functions ===========================================
 */

/**
 * Function that scrolls to the desired section of the document
 * @param element the element to scroll to
 */
function scroll_to(element){
  element.scrollIntoView({ behavior: 'smooth' });
}


/**
 * Function called when the play button is pressed
 */
function press_play() {
  // Get references to relevant elements in the document
  let audioElem = audio;

  // If paused: play the audio
  if (audioElem.paused){
    audioElem.play();
    audioElem.loop = true;
    _animate = true;
    play.src = "pause.png";
  }

  // If the audio is playing: pause it
  else {
    audioElem.pause();
    play.src = "play.png";
    _animate = false;
  }
}

/**
 * Function called when a play button is being hovered over
 * @param {*} i the index of the play button
 */
function play_hover(i) {
  if (audio.paused){
    play.src = "play_hover.png";
  }

  else {
    play.src = "pause_hover.png";
  }
}

/**
 * Function called when the mouse leaves the play button area
 * @param {*} i the index of the play button
 */
function play_leave(i) {
  if (audio.paused){
    play.src = "play.png";
  }

  else {
    play.src = "pause.png";
  }
}


function update_background(delta) {

  body_timer = body_timer + delta
  if (body_timer >= 1/body_fps) {
    // Reset timer
    body_timer = 0.0

    // Set the color
    body.style.backgroundColor = "rgb(" + body_red + ",0,0)";

    // Increase the brightness
    if (body_increasing) {
      body_red ++;
      if (body_red == body_max) {
        body_increasing = false
      }
    }

    // Decrease the brightness
    else {
      body_red --;
      if (body_red == body_min) {
        body_increasing = true
      }
    }
  }

  
  
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

    // Update elements inside for loop
    if (_animate) {
      update_background(deltaSec);
    }

  }, 16);

  // Play with background color
  

  return
}

main()