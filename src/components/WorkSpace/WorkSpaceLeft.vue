<template>
    <el-card style="max-width: 480px; border: 0">
        <template #header>
            <div class="card-header">
                <span>My Workspace</span>
            </div>
        </template>
        <el-menu
            default-active="1-1"
        >
            <el-sub-menu v-for="(work_space, work_space_name, work_space_index) of work_spaces" :key="work_space_name" :index="work_space_index">
                <template #title>
                    <span>{{work_space_name}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item
                        v-for="(test, test_name, test_index) of work_space.tests"
                        :key="test_name"
                        :index="`${work_space_index}${d.template.test_name_separator}${test_index}`"
                        @click="addTag(work_space_name, test_name)"
                    >
                        <el-tag style="margin-right: 10px;">{{test.request.method}}</el-tag>
                        <el-text>{{test_name}}</el-text>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-card>
</template>

<script setup>
import d from "../../TestData.js";
const work_spaces = d.value.work_spaces;
const opened_tests = d.value.opened_tests;

function addTag(work_space_name, test_name) {
    // 测试全名格式：“工作区名/测试名”
    const full_test_name = `${work_space_name}${d.value.template.test_name_separator}${test_name}`;
    if( !(full_test_name in opened_tests) ) {
        opened_tests[full_test_name] = d.value.template.test_saved;
    }
    // 单机菜单项改变当前选中的 Test
    d.value.state.active_test = full_test_name;
}
</script>

<style scoped>
::v-deep(.el-card__body) {
    padding: 0;
}
::v-deep(.el-card__header) {
    padding: 10px;
}
::v-deep(.el-sub-menu .el-menu-item) {
    height: 35px;
}
::v-deep(.el-sub-menu__title) {
    height: 50px;
}
::v-deep(.el-menu-item-group__title) {
    display: none;
}
</style>
