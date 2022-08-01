<template>
  <v-touch @swipedown="swipeBottomHandler" :swipe-options="{ threshold: 200 }">
    <div>
      <section
        class="section section section-shaped my-0 overflow-hidden"
        style="height: 100%!important;"
      >
        <div class="container py-0" style="height: 100%!important;">
          <div class="row row-grid align-items-center">
            <div
              class="col-12"
              style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important; padding-top: 1.3rem;"
            >
              <h2 class="display-4 text-white">Crop Wallpaper</h2>
              <div
                class="col-12"
                style="text-align: center!important; margin-top:0px!important;"
              >
                <card shadow class="card-bg shadow-lg--hover mt-2 tool-card">
                  <file-selector
                    accept-extensions=".jpg,.png"
                    :multiple="false"
                    @validated="setImage"
                    class="mb-3"
                  >
                    <base-button type="primary" class="btn-sm">
                      Upload Image</base-button
                    >
                  </file-selector>

                  <base-button
                    type="primary"
                    @click.prevent="deleteFakeScreen"
                    class="btn-sm"
                    :disabled="$store.state.fakeScreen == ''"
                    >Remove Wallpaper</base-button
                  >
                </card>
              </div>

              <!-- cropper -->
              <div
                class="col-12"
                style="text-align: center!important; margin-top:0px!important;"
              >
                <card shadow class="card-bg crop-card">
                  <div class="q-action">
                    <button
                      type="button"
                      @click.prevent="reset"
                      title="Rest Crop"
                    >
                      <i class="fa fa-minus fa-fw"></i>
                    </button>

                    <button
                      type="button"
                      @click.prevent="rotate(90)"
                      title="Rotate +90deg"
                    >
                      <i class="fa fa-undo fa-fw"></i>
                    </button>

                    <button
                      type="button"
                      ref="flipX"
                      @click.prevent="flipX"
                      title="Flip-X"
                    >
                      <i class="fa fa-arrows-h fa-fw"></i>
                    </button>

                    <button
                      type="button"
                      ref="flipY"
                      @click.prevent="flipY"
                      title="Flip-Y"
                    >
                      <i class="fa fa-arrows-v fa-fw"></i>
                    </button>

                    <button
                      type="button"
                      @click.prevent="saveFile"
                      title="Save Image"
                    >
                      <i class="fa fa-check fa-fw"></i>
                    </button>
                  </div>
                  <perfect-scrollbar style="height: 50vh">
                    <vue-cropper
                      ref="cropper"
                      :src="imgSrc || getDefaultWallpaper"
                      :view-mode="3"
                    />
                  </perfect-scrollbar>
                </card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </v-touch>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  name: "ScreenCrop",
  components: { VueCropper },
  data: function() {
    return {
      imgSrc: this.$store.state.fakeScreen,
      os: this.$store.state.mode,
      dimensions: {
        w: window.screen.width,
        h: window.screen.height,
      },
    };
  },
  methods: {
    swipeBottomHandler() {
      this.$router.go(-1);
    },

    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },

    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },

    deleteFakeScreen() {
      this.$refs.cropper.replace(this.getDefaultWallpaper);
      this.$store.commit("setFakeScreen", "");
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        icon: "success",
        title: "Image removed successfully!",
      });
    },

    saveFile() {
      let data = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$store.commit("setFakeScreen", data);
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        icon: "success",
        title: "Image saved successfully!",
      });
      this.$refs.cropper.replace(data);
    },

    setImage(result, files) {
      let file = files[0];

      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    gcd(a, b) {
      return b == 0 ? a : this.gcd(b, a % b);
    },
  },
  computed: {
    getDefaultWallpaper: function() {
      return this.os === "ios"
        ? this.$store.state.fakeScreenDefaultIOS
        : this.$store.state.fakeScreenDefaultAndroid;
    },
    getAspectRatio: function() {
      var w = window.screen.width;
      var h = window.screen.height;
      var r = this.gcd(w, h);
      return Math.floor(w / r) + "/" + Number(h / r);
    },
  },
};
</script>

<style lang="scss">
.tool-card .card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crop-card {
  position: relative;
  .q-action {
    position: absolute;
    top: 5%;
    left: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      background-color: rgba($color: #000000, $alpha: 0.4);
      color: #fff;
      border: 0;
      padding: 10px 12px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: #000000, $alpha: 1);
      }
      &:focus {
        outline: 0;
      }
    }
  }
}

.cropper {
  background: #000;
}
</style>
