<script setup>
import Left from "./WorkSpaceLeft.vue";
import WorkSpaceMain from "./WorkSpaceMain.vue";
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