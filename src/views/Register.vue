<template>
    <section style="height: 100%!important;" class="section section-shaped section-lg my-0">
        <div class="container pt-lg-md">
            <div class="row justify-content-center align-items-center" style="margin-top: -6.4rem; margin-bottom: 4rem;">
                <div class="col-lg-7 text-center pt-md">
                    <img src="img/brand/brainwash.png" style="width: 200px;" class="img-fluid floating">
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="darker" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <h6 class="text-muted text-center mb-3">
                                Device Registration
                            </h6>
<!--                            <div class="btn-wrapper text-center">-->
<!--                                <base-button type="neutral">-->
<!--                                    <img slot="icon" src="img/icons/common/github.svg">-->
<!--                                    Github-->
<!--                                </base-button>-->

<!--                                <base-button type="neutral">-->
<!--                                    <img slot="icon" src="img/icons/common/google.svg">-->
<!--                                    Google-->
<!--                                </base-button>-->
<!--                            </div>-->
                        </template>
                        <template>
<!--                            <div class="text-center text-muted mb-4">-->
<!--                                <small>Or sign up with credentials</small>-->
<!--                            </div>-->
                            <form role="form" @submit.prevent="submit">
                                <base-input alternative
                                            placeholder="Name"
                                            style="margin-bottom: 0px!important;"
                                            v-model.trim="name"
                                            @input="setName($event.target.value)"
                                            addon-left-icon="ni ni-hat-3"
                                            :valid="$v.name.minLength && $v.name.required">
                                </base-input>
                                <span class="text-warning" v-if="!$v.name.required && this.name !== null">Name is required</span>
                                <span class="text-warning" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</span>
                                <base-input alternative
                                            class="mt-3"
                                            placeholder="Email"
                                            v-model.trim="email"
                                            style="margin-bottom: 0px!important;"
                                            @input="setEmail($event.target.value)"
                                            addon-left-icon="ni ni-email-83"
                                            :valid="$v.email.email && $v.email.required">
                                </base-input>
                                <span class="text-warning" v-if="!$v.email.required && this.email !== null">Email is required</span>
                                <span class="text-warning" v-if="!$v.email.email">Please enter a valid email address.</span>
                                <base-input alternative
                                            type="password"
                                            class="mt-3"
                                            placeholder="Access Code"
                                            style="margin-bottom: 0px!important;"
                                            v-model.trim="accessCode"
                                            @input="setAccessCode($event.target.value)"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            :valid="$v.accessCode.minLength && $v.accessCode.required">
                                </base-input>
                                <span class="text-warning" v-if="!$v.accessCode.required && this.accessCode !== null">Access Code is required</span>
                                <span class="text-warning" v-if="!$v.accessCode.minLength">Access Code must have at least {{$v.name.$params.minLength.min}} letters.</span>
                                <div class="text-muted font-italic">
                                    <small>Access Code:
                                        <span class="text-warning font-weight-700">claimed</span>
                                    </small>
                                </div>
<!--                                <base-checkbox>-->
<!--                                    <span>I agree with the-->
<!--                                        <a href="#">Privacy Policy</a>-->
<!--                                    </span>-->
<!--                                </base-checkbox>-->
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" nativeType="submit">Register device</base-button>
                                </div>
                                <p class="typo__p text-center text-warning" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
    name: "set-up",
    data: function() {
        return {
            name: null,
            email: null,
            accessCode: null,
            submitStatus: null,
        };
    },
    computed: {
    },
    validations: {
        name: {
            required,
            minLength: minLength(3)
        },
        email: {
            required,
            email
        },
        accessCode: {
            required,
            minLength: minLength(4)
        }
    },
    methods: {
        setName(value) {
            this.name = value
            this.$v.name.$touch()
        },
        setEmail(value) {
            this.email = value
            this.$v.email.$touch()
        },
        setAccessCode(value) {
            this.accessCode = value
            this.$v.accessCode.$touch()
        },
        submit() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                this.submitStatus = 'PENDING'
                //
                // Check Access Code Here
                //
                this.$store.commit('setUser', {
                    name: this.name, email: this.email, accessCode: this.accessCode
                })
                let vm = this
                setTimeout(() => {
                    this.$router.push({
                        path: '/'
                    })
                }, 1500)

                this.submitStatus = 'OK'
            }
        },
    },
};
</script>
<style>
    html {
        height: 100%;
    }
</style>
