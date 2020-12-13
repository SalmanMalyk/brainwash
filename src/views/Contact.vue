<template>
    <div>
        <section class="section section section-shaped my-0 overflow-hidden">
            <div class="shape shape-style-1 bg-gradient-success shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container py-0" style="margin-bottom: 5rem!important;">
                <div class="row row-grid align-items-center">
                    <div class="col-sm-6" style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important;">
                        <h2 class="display-3 text-white">Contact</h2>
                        <p class="lead text-white" style="padding: 10px;">We are here to help you!</p>
                    </div>
                    <div class="col-sm-6" style="text-align: center!important;">
                        <card shadow class="shadow-lg--hover mt-2">
                            <div class="d-flex px-3">
                                <div>
                                    <icon name="ni ni-email-83" gradient="success" color="white" shadow rounded></icon>
                                </div>
                                <div class="pl-4" style="padding-top: 0.5rem;">
                                    <h5 class="title text-success"><a href="mailto:abc@example.com" class="text-success">abc@example.com</a></h5>
                                </div>
                            </div>
                        </card>
                        <card shadow class="shadow-lg--hover mt-3">
                            <div class="d-flex px-3">
                                <div>
                                    <div class="icon icon-shape bg-gradient-success shadow rounded-circle text-white">
                                        <img src="img/icons/instagram.png" style="width: 30px; filter: invert(100%);"/>
                                    </div>
                                </div>
                                <div class="pl-4" style="padding-top: 0.5rem;">
                                    <h5 class="title text-success"><a href="#" class="text-success">@example</a></h5>
                                </div>
                            </div>
                        </card>
                        <card shadow class="shadow-lg--hover mt-3">
                            <div class="d-flex px-3">
                                <div>

                                    <div class="icon icon-shape bg-gradient-success shadow rounded-circle text-white">
                                        <img src="img/icons/facebook.png" style="width: 34px; filter: invert(100%);"/>
                                    </div>
                                </div>
                                <div class="pl-4" style="padding-top: 0.5rem;">
                                    <h5 class="title text-success"><a href="#" class="text-success">Facebook Group</a></h5>
                                </div>
                            </div>
                        </card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "contact",
        components: {}
    };
</script>
