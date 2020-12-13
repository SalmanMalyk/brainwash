<template>
    <section style="height: 100%!important;" class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 shape-default bg-gradient-success shape-skew">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center align-items-center" style="margin-top: -4rem; margin-bottom: 7rem;">
                <div class="col-lg-7 text-center pt-md">
                    <img src="img/brand/white.png" style="width: 200px;" class="img-fluid floating">
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                Sign in
                            </div>
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
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Name"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Access Code"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
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
                                    <base-button type="primary" class="my-4">Register device</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {};
</script>
<style>
    html {
        height: 100%;
    }
</style>
