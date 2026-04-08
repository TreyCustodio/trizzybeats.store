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
 * ================ Beats ===========================
 */

const beatData = [
  {
    id: "1",
    title: "Ocarina Trap",
    bpm: 160,
    image: "pages/ocarina_trap/ocarina.jpg",
    page: "ocarina_trap"
  },

  {
    id: "1.1",
    title: "Chill Trap",
    bpm: 160,
    image: "pages/chill_trap/cover.jpg",
    page: "chill_trap"
  },

  {
    id: "2",
    title: "Frozen Core",
    bpm: 70,
    image: "pages/frozen_core/night.png",
    page: "frozen_core"
  },

  {
    id: "3",
    title: "Biotech Ruins",
    bpm: 140,
    image: "pages/biotech/cover.png",
    page: "biotech"
  },

  {
    id: "4",
    title: "Pump Me Up",
    bpm: 140,
    image: "pages/pump_full/cover.png",
    page: "pump_full"
  },

];



/**
 * ================ Rendering Beats ===========================
 */
function renderBeats(arr) {
  const featuredContainer = document.getElementById('featured');
  
  arr.forEach(beat => {
    const beatDiv = document.createElement('div');
    beatDiv.className = 'beat';
    beatDiv.id = beat.id;
    beatDiv.dataset.page = beat.page;
    
    beatDiv.innerHTML = `
      <img class="controls" src="${beat.image}">
      <text>${beat.title}</text>
      <text>${beat.bpm}</text>
    `;
    
    featuredContainer.appendChild(beatDiv);
  });
}

// Render the beats upon loading the page
document.addEventListener('DOMContentLoaded', () => {
  renderBeats(beatData);
});


/**
 * ================ Webpage Elements/Triggers ===========================
 */

// Metadata
const track_count = 8;
const beats       = document.getElementById('beats');
const search      = document.getElementById('search');
const about       = document.getElementById('about');
const body        = document.getElementById('body');
const overlay     = document.getElementById('over');

// Body Animation Variables
let body_increasing = true;
let body_red        = 15;
let body_max        = 45;
let body_min        = body_red;
let body_fps        = 16;
let body_timer      = 0.0;



/**
 * ================ Initialize the audio elements =======================
 */

/**
 * Initialize the play buttons
 */
// let play_buttons = []
// for (let i = 0; i < beatData.length; i++) {
//   play_buttons.push(document.getElementById("play_" + i.toString()))
// }


/**
 * Initialize the sections of the document
 */
// Fix this section to animate the track backgrounds
// let sections = []
// for (let i = 0; i < beatData.length; i++) {
//   alert(i);
//   sections.push(document.getElementById(i.toString()));
// }


/**
 * Event Listeners for each beat's section contained in sections
 */
// for (let i = 0; i < beatData.length; i++) {
//   sections[i].addEventListener("click", (event) => press_play(i));
//   sections[i].addEventListener("mouseenter", (event) => play_hover(i));
//   sections[i].addEventListener("mouseleave", (event) => play_leave(i));
// }



/**
 * ================ Functions ===========================================
 */
// Single event listener on the container
document.getElementById('featured').addEventListener('click', (event) => {
  const beatDiv = event.target.closest('.beat');
  if (beatDiv) {
    window.location.href = 'pages/' + beatDiv.dataset.page + '/index.html';
  }
});



/**
 * Scrolls to the desired section of the document
 * @param element the element to scroll to
 */
function scroll_to(element){
  element.scrollIntoView({ behavior: 'smooth' });
}




/**
 * Updates the background color once every 1/fps seconds
 * @param {*} delta 
 */
function update_background(delta) {
  body_timer = body_timer + delta;
  if (body_timer >= 1/body_fps) {
    // Reset timer
    body_timer = 0.0;

    // Set the color
    // body.style.backgroundColor = "rgb(" + body_red + ",0,0)";
    // overlay.style.backgroundColor = "rgb(" + body_red + ",0,0)";
    document.body.style.backgroundColor = "rgb(" + body_red + ",0,0)";

    // Update the color
    // for (let i = 0; i < track_count; i++) {
    //   sections[i].style.backgroundColor = "rgb(" + body_red + ",0,0)";
    // }

    // Increase the brightness
    if (body_increasing) {
      body_red ++;
      if (body_red == body_max) {
        body_increasing = false;
      }
    }

    // Decrease the brightness
    else {
      body_red --;
      if (body_red == body_min) {
        body_increasing = true;
      }
    }
  }
}





/**
 * ================ Pagnation ==========================================
 */

// Example: Load 50 beats at a time
// const beatsPerPage = 50;
// let currentPage = 0;

// function loadMoreBeats() {
//   const start = currentPage * beatsPerPage;
//   const end = start + beatsPerPage;
//   renderBeats(beatsData.slice(start, end));
//   currentPage++;
// }

// // Load initial batch
// loadMoreBeats();

// // Add infinite scroll listener
// window.addEventListener('scroll', () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     loadMoreBeats();
//   }
// });





/**
 * Main Driver Code
 */
function main() {
  // Get the time in between the last frame and the current frame
  let last_time = performance.now();

  setInterval(() => {
    const now = performance.now();
    const deltaSec = (now - last_time) / 1000;
    last_time = now;
    update_background(deltaSec);
  }, 16);

  return;
}

main()