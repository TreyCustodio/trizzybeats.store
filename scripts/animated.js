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