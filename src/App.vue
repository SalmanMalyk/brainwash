<template>
    <div id="app">
        <Particles
                id="brainwash-bg"
                style="position: absolute; top:0px; bottom:0px; width: 100%; z-index: -1; background-color: #000;"
                :options="backgroundOptions"
        />
        <base-alert type="info" dismissible class="text-center" style="position: absolute; top:0px; width: 100%; z-index: 9;margin: 0px!important; border-radius: 0px!important;" v-if="updateExists" @click="refreshApp">
            <span class="alert-inner--text" style="margin-right: 1rem;"><strong>New version available!</strong></span>
            <base-button type="secondary" outline size="sm" @click="refreshApp">Update</base-button>
        </base-alert>
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view :style="{ height: this.windowHeight+'px' }"/>
            </fade-transition>
        </main>
        <router-view style="position: fixed; left: 0; bottom: 0; width: 100%; text-align: center;" name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

const bgOpts = {
    'fpsLimit': 40,
    'interactivity': {
        'events': {
            'onClick': {
                'enable': false,
                'mode': 'push'
            },
            'onDiv': {
                'selectors': '#repulse-div',
                'mode': 'repulse'
            },
            'onHover': {
                'enable': false,
                'mode': 'bubble',
                'parallax': {
                    'force': 60
                }
            }
        },
        'modes': {
            'bubble': {
                'distance': 400,
                'duration': 2,
                'opacity': 0.8,
                'size': 40
            },
            'grab': {
                'distance': 400
            }
        }
    },
    'particles': {
        'color': {
            'value': '#ffffff'
        },
        'links': {
            'color': {
                'value': '#000'
            },
            'distance': 150,
            'opacity': 0.4
        },
        'move': {
            'attract': {
                'rotate': {
                    'x': 600,
                    'y': 1200
                }
            },
            'enable': true,
            'outModes': {
                'bottom': 'out',
                'left': 'out',
                'right': 'out',
                'top': 'out'
            }
        },
        'number': {
            'density': {
                'enable': true
            },
            'value': 80
        },
        'opacity': {
            'random': {
                'enable': true
            },
            'animation': {
                'enable': true,
                'minimumValue': 0.2,
                'speed': 1
            }
        },
        'rotate': {
            'random': {
                'enable': true
            },
            'animation': {
                'enable': true,
                'speed': 5
            },
            'direction': 'random'
        },
        'shape': {
            'options': {
                'character': {
                    'fill': false,
                    'font': 'Verdana',
                    'style': '',
                    'value': '*',
                    'weight': '400'
                },
                'char': {
                    'fill': false,
                    'font': 'Verdana',
                    'style': '',
                    'value': '*',
                    'weight': '400'
                },
                'polygon': {
                    'sides': 5
                },
                'star': {
                    'sides': 5
                },
                'image': [
                    {
                        'src': 'img/background/hearts.png',
                        'width': 32,
                        'height': 32
                    },
                    {
                        'src': 'img/background/clubs.png',
                        'width': 32,
                        'height': 32
                    },
                    {
                        'src': 'img/background/diamonds.png',
                        'width': 32,
                        'height': 32
                    },
                    {
                        'src': 'img/background/spades.png',
                        'width': 32,
                        'height': 32
                    },
                ],
                'images': [
                    {
                        'src': 'img/background/hearts.png',
                        'width': 32,
                        'height': 32
                    },
                    {
                        'src': 'img/background/clubs.png',
                        'width': 32,
                        'height': 32
                    },
                    {
                        'src': 'img/background/diamonds.png',
                        'width': 32,
                        'height': 32
                    },
                    {
                        'src': 'img/background/spades.png',
                        'width': 32,
                        'height': 32
                    },
                ]
            },
            'type': 'image'
        },
        'size': {
            'value': 16,
            'animation': {
                'minimumValue': 0.1,
                'speed': 40
            }
        },
        'stroke': {
            'color': {
                'value': '#000000',
                'animation': {
                    'enable': false,
                    'speed': 1,
                    'sync': true
                }
            }
        }
    }
}

export default {
  components: {
    FadeTransition
  },
    data() {
        return {
            refreshing: false,
            windowHeight: window.innerHeight,
            registration: null,
            updateExists: false,
            backgroundOptions: bgOpts,
        };
    },
    created () {
        document.addEventListener(
            'swUpdated', this.showRefreshUI, { once: true }
        );
        if (navigator.serviceWorker) {
            navigator.serviceWorker.addEventListener(
                'controllerchange', () => {
                    if (this.refreshing) return;
                    this.refreshing = true;
                    window.location.reload();
                }
            );
        }
    },
    methods: {
        onResize() {
            this.windowHeight = window.innerHeight
        },
        showRefreshUI (e) {
            this.registration = e.detail;
            this.updateExists = true;
        },
        refreshApp () {
            this.updateExists = false;
            if (!this.registration || !this.registration.waiting) { return; }
            this.registration.waiting.postMessage('skipWaiting');
        },
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
};
</script>
<style>
    .close {
        margin: 10px 10px 0px 0px;
    }
</style>
