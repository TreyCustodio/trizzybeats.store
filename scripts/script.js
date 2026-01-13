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
 * Webpage Elements/Triggers
 */
const track_count = 5;
const beats = document.getElementById('beats');
const search = document.getElementById('search');
const about = document.getElementById('about');



const audio_1 = new Audio("beats/Biotech.wav");
const frozen_core = new Audio("beats/Frozen_Core.wav");
const plants = new Audio("beats/Fake_Plants_Don't_Grow.wav");
const over = new Audio("beats/Overground.wav");
const pump = new Audio("beats/Pump_me_up.wav");


let audio = [audio_1, frozen_core, plants, over, pump]

// let audio = []
// for (let i = 0; i < 4; i++) {
//   audio.push(new Audio("beats/" + i.toString() + ".wav"))
// }

let play_buttons = []
for (let i = 0; i < track_count; i++) {
  play_buttons.push(document.getElementById("play_" + i.toString()))
}

// Fix this section to animate the track backgrounds
let sections = []
for (let i = 0; i < track_count; i++) {
  // sections.push(new Animated(document.getElementById(i.toString()), 64, 60))
  sections.push(document.getElementById(i.toString()))
}


/**
 * Event Listeners for play buttons ------------------
 * click, mouse enter, mouse leave
 */
for (let i = 0; i < track_count; i++) {
  // play_buttons[i].addEventListener("click", (event) => press_play(i));
  // play_buttons[i].addEventListener("mouseenter", (event) => play_hover(i));
  // play_buttons[i].addEventListener("mouseleave", (event) => play_leave(i));

  sections[i].addEventListener("click", (event) => press_play(i));
  sections[i].addEventListener("mouseenter", (event) => play_hover(i));
  sections[i].addEventListener("mouseleave", (event) => play_leave(i));
}



/**
 * Functions ---------------------------------------
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
 * @param {} i the index of the event taking place
 */
function press_play(i) {
  // Define necessary variables
  let audioElem = audio[i];
  let playButton = play_buttons[i];
  let section = sections[i];

  // Play the audio if paused
  if (audioElem.paused){
    // Pause all other audios playing
    for (let j = 0; j < track_count; j++) {
      if (audio[j].paused) {
        continue
      }

      else {
        audio[j].pause()
        play_buttons[j].src = "images/play.png"
        // sections[j].animate = false;
        // sections[j].set_background_color("rgb(0, 0, 0)");
        sections[j].style.backgroundColor = "rgb(0,0,0)"
      }
    }

    // Play the audio
    audioElem.play();
    audioElem.loop = true;
    playButton.src = "images/pause_hover.png";
    section.style.backgroundColor = "rgb(160,0,0)"

    // section.animate = true;
    // section.set_background_color("rgb(160, 0, 0)");

  }

  // Pause the audio if playing
  else {
    audioElem.pause();
    playButton.src = "images/play_hover.png"
    // section.animate = false;
    // section.set_background_color("rgb(0, 0, 0)");
      section.style.backgroundColor = "rgb(0,0,0)"

  }
}

/**
 * Function called when a play button is being hovered over
 * @param {*} i the index of the play button
 */
function play_hover(i) {
  if (audio[i].paused){
    play_buttons[i].src = "images/play_hover.png"
  }

  else {
    play_buttons[i].src = "images/pause_hover.png"
  }

  sections[i].style.backgroundColor = "rgb(160,0,0)"

}

/**
 * Function called when the mouse leaves the play button area
 * @param {*} i the index of the play button
 */
function play_leave(i) {
  if (audio[i].paused){
    play_buttons[i].src = "images/play.png"
  }
  
  else {
    play_buttons[i].src = "images/pause.png"
  }

  sections[i].style.backgroundColor = "rgb(0,0,0)"

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
    for (let i = 0; i < track_count; i++) {
      continue
      // sections[i].update(deltaSec);
    }
  }, 16);

  return
}

main()