<script>
import Left from "./WorkSpaceLeft.vue";
import {defineComponent} from "vue";
import WorkSpaceMain from "./WorkSpaceMain.vue";

export default defineComponent({
    components: {WorkSpaceMain, Left}
})
</script>

<template>
    <div id="work_space">
        <el-container>
            <el-aside width="300px" height="100%">
                <left/>
            </el-aside>
            <el-divider direction="vertical" border-style="solid" />
            <el-main>
                <work-space-main/>
            </el-main>
            <el-divider direction="vertical" border-style="solid" />
            <el-aside width="100px">

            </el-aside>
        </el-container>
    </div>
</template>

<style scoped>
::v-deep(.el-container) {
    height: 100%;
}::v-deep(.el-main) {
    padding: 0;
}::v-deep(.el-divider--vertical) {
    margin: 0;
    height: var(--workspace-height);
}
</style>