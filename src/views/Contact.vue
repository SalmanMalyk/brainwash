<template>
    <div>
        <section class="section section section-shaped my-0 overflow-hidden">
            <div class="container py-0" style="margin-bottom: 4.5rem!important;">
                <div class="row row-grid align-items-center">
                    <div class="col-12" style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important; padding-top: 1.3rem;">
                        <h2 class="display-3 text-white">Contact</h2>
                        <p class="lead text-white" style="padding: 0px 10px 10px 10px;">We are here to help you!</p>
                    </div>
                    <div class="col-12" style="text-align: center!important; margin-top:0px!important;">
                        <card shadow class="shadow-lg--hover mt-2">
                            <div class="d-flex px-3">
                                <div>
                                    <icon name="ni ni-email-83" gradient="primary" color="white" shadow rounded></icon>
                                </div>
                                <div class="pl-4" style="padding-top: 0.5rem;">
                                    <h5 class="title text-primary"><a href="mailto:abc@example.com" class="text-primary">abc@example.com</a></h5>
                                </div>
                            </div>
                        </card>
                        <card shadow class="shadow-lg--hover mt-3">
                            <div class="d-flex px-3">
                                <div>
                                    <div class="icon icon-shape bg-gradient-primary shadow rounded-circle text-white">
                                        <img src="img/icons/instagram.png" style="width: 30px; filter: invert(100%);"/>
                                    </div>
                                </div>
                                <div class="pl-4" style="padding-top: 0.5rem;">
                                    <h5 class="title text-primary"><a href="#" class="text-primary">@example</a></h5>
                                </div>
                            </div>
                        </card>
                        <card shadow class="shadow-lg--hover mt-3">
                            <div class="d-flex px-3">
                                <div>

                                    <div class="icon icon-shape bg-gradient-primary shadow rounded-circle text-white">
                                        <img src="img/icons/facebook.png" style="width: 34px; filter: invert(100%);"/>
                                    </div>
                                </div>
                                <div class="pl-4" style="padding-top: 0.5rem;">
                                    <h5 class="title text-primary"><a href="#" class="text-primary">Facebook Group</a></h5>
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
