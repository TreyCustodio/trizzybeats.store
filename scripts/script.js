/**
 * This is my first JavaScript file.
 * Author - Trey Custodio
 */

/**
 * Animated Class that represents a glowing object.
 * Not used in this project.
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
const start = document.getElementById("start")
const module_1 = document.getElementById("module_1")
const titles = document.querySelectorAll("#title")
const quizSection = document.getElementById("quiz-section")

if (quizSection) {
  quizSection.style.pointerEvents = "none";
  const inputs = quizSection.querySelectorAll('input');
  inputs.forEach(i => i.disabled = true);

  const submitBtn = quizSection.querySelector('#quiz-submit');
  if (submitBtn) submitBtn.disabled = true;
}


// A dictionary of each quiz, the correct response, and the next progress bar value
const quizConfig = {
  1: { correctAnswer: 'd', nextProgress: 30 },
  2: { correctAnswer: 'b', nextProgress: 60 },
  3: { correctAnswer: 'a', nextProgress: 85 },
  4: { correctAnswer: 'c', nextProgress: 100 }
};

/**
 * Quiz initialization
 */
function initializeQuizzes() {
  for (let quizNum = 1; quizNum <= 4; quizNum++) {
    const quizSection = document.getElementById(`quiz-section-${quizNum}`);
    const submitBtn = document.getElementById(`quiz-submit-${quizNum}`);
    
    if (quizSection) {
      quizSection.style.pointerEvents = "none";
      const inputs = quizSection.querySelectorAll('input');
      inputs.forEach(i => i.disabled = true);
      if (submitBtn) submitBtn.disabled = true;
    }
    
    if (submitBtn) {
      submitBtn.addEventListener('click', () => handleQuizSubmit(quizNum));
    }
  }
}

/**
 * Handle the submit button
 */
function handleQuizSubmit(quizNum) {
  const selected = document.querySelector(`input[name="answer-${quizNum}"]:checked`);
  
  if (!selected) {
    alert('Wählen Sie eine Option');
    return;
  }
  
  const config = quizConfig[quizNum];
  const currentModule = document.getElementById(`module_${quizNum}`);
  const nextModule = document.getElementById(`module_${quizNum + 1}`);
  
  if (selected.value === config.correctAnswer) {
    alert('Genau!');
    progress_percentage = config.nextProgress;
    update_progress_bar();
    
    if (currentModule) {
      currentModule.classList.remove('visible');
      currentModule.style.pointerEvents = 'none';
    }
    
    setTimeout(() => {
      if (nextModule) {
        nextModule.classList.add('visible');

        // Enable next quiz
        enableQuiz(quizNum + 1);
      }
    }, 500);
    
    if (nextModule) {
      scroll_to(nextModule);
    }
  } else {
    alert('Falsch.');
  }
}

/**
 * Activate a quiz based on the number
 */
function enableQuiz(quizNum) {
  const quizSection = document.getElementById(`quiz-section-${quizNum}`);
  if (quizSection) {
    quizSection.style.pointerEvents = "auto";
    const inputs = quizSection.querySelectorAll('input');
    inputs.forEach(i => i.disabled = false);
    const submitBtn = quizSection.querySelector('.quiz-submit');
    if (submitBtn) submitBtn.disabled = false;
  }
}


initializeQuizzes();

if (start) {
  const handleStartClick = function(event){
    start.removeEventListener("click", handleStartClick);
    start.style.opacity = "0";
    start.style.pointerEvents = "none";
    progress_percentage = 10;
    update_progress_bar();
    
    // Fade out titles
    titles.forEach(title => {
      title.style.opacity = "0";
      title.style.pointerEvents = "none";
    });

    // Show module_1 after start button finishes fading; then enable first quiz
    setTimeout(() => {
      if (module_1) {
        module_1.classList.add("visible");
      }
      enableQuiz(1); // Enable first quiz
    }, 500);
  };
  start.addEventListener("click", handleStartClick);
}



/**
 * Scroll to the desired section
 */
function scroll_to(element){
  element.scrollIntoView({ behavior: 'smooth' });
}


/**
 * Progress Bar
 */
let progress_percentage = 0; // Variable to define progress bar percentage (0-100)

function update_progress_bar() {
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = progress_percentage + '%';
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
    color.update(deltaSec);
  }, 16);

  return
}

main()