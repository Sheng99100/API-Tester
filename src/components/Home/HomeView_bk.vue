<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "Home"
})
</script>

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

            <el-button type="primary" plain>
                <RouterLink to="/work_space">Get Start</RouterLink>
            </el-button>
        </div>
    </div>
</template>

<style scoped>
#home {
    padding: 114px 64px 64px 64px;
}
.home_clip {
    color: #3451b2;
}
h1, h2, h3, h4, h5, h6, li, p {
    overflow-wrap: break-word;
}
</style>