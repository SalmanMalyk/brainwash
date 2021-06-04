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
                            <form role="form" @submit.prevent="submit">
                                <base-input alternative
                                            placeholder="First Name"
                                            style="margin-bottom: 0px!important;"
                                            v-model.trim="firstName"
                                            @input="setName($event.target.value)"
                                            addon-left-icon="ni ni-hat-3"
                                            :valid="$v.firstName.minLength && $v.firstName.required">
                                </base-input>
                                <span class="text-warning" v-if="!$v.firstName.required && this.firstName !== null">First Name is required</span>
                                <span class="text-warning" v-if="!$v.firstName.minLength">Name must have at least {{$v.firstName.$params.minLength.min}} letters.</span>
                                <base-input alternative
                                            class="mt-3"
                                            placeholder="Last Name"
                                            style="margin-bottom: 0px!important;"
                                            v-model.trim="lastName"
                                            @input="setName($event.target.value)"
                                            addon-left-icon="ni ni-hat-3"
                                            :valid="$v.lastName.minLength && $v.lastName.required">
                                </base-input>
                                <span class="text-warning" v-if="!$v.lastName.required && this.lastName !== null">Last Name is required</span>
                                <span class="text-warning" v-if="!$v.lastName.minLength">Name must have at least {{$v.lastName.$params.minLength.min}} letters.</span>
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
                                <div class="text-muted font-italic" v-if="accessError">
                                    <small>Access Code:
                                        <span class="text-warning font-weight-700">claimed/invalid</span>
                                    </small>
                                </div>
<!--                                <base-checkbox>-->
<!--                                    <span>I agree with the-->
<!--                                        <a href="#">Privacy Policy</a>-->
<!--                                    </span>-->
<!--                                </base-checkbox>-->
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" nativeType="submit" :disabled="loader">Register device&nbsp;<Spinner v-if="loader" style="margin-top: 5px"/></base-button>
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
import Bowser from "bowser";
import * as du from 'device-uuid'
import Spinner from 'vue-simple-spinner'
export default {
    name: "set-up",
    data: function() {
        return {
            loader: false,
            firstName: null,
            lastName: null,
            email: null,
            accessCode: null,
            submitStatus: null,
            accessError: false,
        };
    },
    components: {
      Spinner
    },
    validations: {
        lastName: {
            required,
            minLength: minLength(3)
        },
        firstName: {
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
        setFirstName(value) {
            this.firstName = value
            this.$v.firstName.$touch()
        },
        setLastName(value) {
            this.lastName = value
            this.$v.lastName.$touch()
        },
        setEmail(value) {
            this.email = value
            this.$v.email.$touch()
        },
        setAccessCode(value) {
            this.accessCode = value
            this.$v.accessCode.$touch()
        },
        resetForm () {
          this.firstName = null
          this.lastName = null
          this.email = null
          this.accessCode = null
        },
        submit () {
            const vm = this
            this.loader = true
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                vm.loader = false
            } else {
                const browser = Bowser.getParser(window.navigator.userAgent);
                let osName = browser.getOS().name.toLowerCase()
                if (osName !== 'android' && osName !== 'ios') {
                    if (osName === 'macos' || osName === 'ipados') {
                        osName = 'ios'
                    }
                    else {
                        osName = 'android'
                    }
                }
                this.submitStatus = 'PENDING'
                this.accessCode = this.accessCode.toString()
                this.$http.post('https://us-central1-brainwash-johannes.cloudfunctions.net/register-checkCode', {
                    "accessCode": this.accessCode,
                }, {
                    headers: {
                        'platform': osName
                    }
                }).then((response) => {
                    if (response.data.valid) {
                      this.registerUser()
                    } else {
                        vm.loader = false
                        this.$swal({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            icon: 'error',
                            title: 'Invalid Access Code!',
                        })
                    }
                }).catch((err) => {
                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'error',
                        title: 'Invalid Access Code!',
                    })
                    this.accessError = true
                    vm.loader = false
                    this.resetForm()
                })
            }
        },
        registerUser () {
            const browser = Bowser.getParser(window.navigator.userAgent);
            let osName = browser.getOS().name.toLowerCase()
            if (osName !== 'android' && osName !== 'ios') {
                if (osName === 'macos' || osName === 'ipados') {
                    osName = 'ios'
                }
                else {
                    osName = 'android'
                }
            }
            const vm = this
            const uuid = new du.DeviceUUID().get();
            const userData = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                accessCode: vm.accessCode,
                platform: osName,
                deviceId: uuid
            }
            this.$http.post('https://us-central1-brainwash-johannes.cloudfunctions.net/register-registerUser', {...userData}, {
                headers: {
                    'platform': osName
                }
            }).then((response) => {
                if (response.data.status === "User Registration Successful !!") {
                    vm.$store.commit('setUser', {
                        ...userData
                    })
                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        icon: 'success',
                        title: 'Registered!',
                    })
                    vm.loader = false
                    setTimeout(() => {
                        vm.$router.push({
                            path: '/'
                        })
                    }, 1500)

                    vm.submitStatus = 'OK'
                }
                else {
                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1400,
                        icon: 'error',
                        title: 'Registration Error!',
                    })
                    this.resetForm()
                    vm.loader = false
                }
            }).catch((err) => {
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1400,
                    icon: 'error',
                    title: 'Registration Error!',
                })
                this.accessError = true
                this.resetForm()
                vm.loader = false
            })
        }
    },
};
</script>
<style>
    html {
        height: 100%;
    }
</style>
