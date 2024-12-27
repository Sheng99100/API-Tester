<template>
    <div id="home">
        <div id="home_container">
            <div class="home_main">
                <div class="home_name">
                    <h1>
                    <span class="home_clip">
                    API Test Tool
                    </span>
                    </h1>
                </div>
                <p class="text">An API test tool for learning</p>
            </div>

            <el-button class="action" type="primary" plain>
                <RouterLink class="action_routerlink" to="/work_space">Get Start</RouterLink>
            </el-button>
        </div>
        <div class="pic_container">
            <div class="pic_main">
                <img class="pic" src="../../assets/bg.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted} from "vue";
import {gsap} from "gsap";

onMounted(() => {
    gsap.from("#home", {duration: .6,  ease: "power2", y: -90, opacity: 0});
})
</script>

<style scoped>
#home {
    padding: 107px 64px 64px 64px;
    
}
.home_clip {
    color: #3451b2;
    font-size: 48px;
}
.text {
    color: rgba(60, 60, 67, .78);
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.action {
    border-radius: 20px;
    padding: 0 20px;
    line-height: 38px;
    font-size: 14px;
    background-color: #5672cd;
    border-color: transparent;
}
.action_routerlink{
    color: #ffffff;
}
h1, h2, h3, h4, h5, h6, li, p {
    overflow-wrap: break-word;
}
.pic_container{
    width: 1300px;
    height: 810px;
    margin: auto;
    margin-top: 20px;
    border: 1px solid;
    border-color: rgba(197, 197, 211, 0.681);
}
.pic_main{
    width: 100%;
    height: 100%;
}
.pic{
    width: 100%;
    height: 100%;
}
</style>
<script setup>
</script>