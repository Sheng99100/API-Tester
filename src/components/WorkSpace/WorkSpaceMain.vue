<template>
    <div class="work-space-main-wrapper">
        <el-tabs
            v-model="d.state.active_test"
            type="card"
            editable
            @tab-remove="removeTab"
        >
            <!--    标签页      -->
            <el-tab-pane
                v-for="(active, full_test_name) in opened_tests"
                :key="full_test_name"
                :label="full_test_name"
                :name="full_test_name"
            >
                <div class="request-pane-wrapper">
<!--                    <el-row><el-col>-->
                    <request-pane :full_test_name="full_test_name"/>
<!--                    </el-row><el-row>-->
                </div>
                <div class="response-pane-wrapper">
                    <response-pane :full_test_name="full_test_name"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <!-- 关闭标签时的为保存提示对话框 -->
    <el-dialog
            v-model="dialogVisible"
            :title="d.template.unsaved_dialog_title"
            width="500"
    >
        <span>{{d.template.unsaved_dialog_prompt}}</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="closeTest(false)">
                    Don't Save
                </el-button>
                <div>
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="closeTest(true)">
                        Save
                    </el-button>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import {ref} from "vue";
import RequestPane from "./RequestPane/RequestPane.vue"
import ResponsePane from "./ResponsePane/ResponsePane.vue"
import d from "../../TestData.js";
import builder from "../../TestBuilder.js";

const opened_tests = d.value.opened_tests;
const dialogVisible = ref(false);
const onclose_full_test_name = ref('');

function removeTab(full_test_name) {
    // 更新正要关闭的 Test 全名（work_space_name/test_name）
    onclose_full_test_name.value = full_test_name;
    if (opened_tests[full_test_name] !== d.value.template.test_saved) {
        // 关闭时未保存，显示对话框提示保存
        dialogVisible.value = true;
    }else {
        // 否则直接关闭
        closeTest(false);
    }
}

// 关闭 Test 选项卡
function closeTest(save) {
    // 保存
    if(save) builder.saveTest(onclose_full_test_name.value);
    // 在已打开的 Test 中删除 full_test_name（关闭的Test名） 对应的 Test 对象
    delete opened_tests[onclose_full_test_name.value];
    dialogVisible.value = false;
}
</script>

<style scoped>
.work-space-main-wrapper {
    position: relative;
    height: var(--workspace-height);
}
.request-pane-wrapper {
    margin: 10px;
}
.response-pane-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ddd;
    min-height: var(--res-pane-header-height);
    width: 100%;
}
.dialog-footer {
    display: flex;
    justify-content: space-between;
}
::v-deep(.el-tabs__content) {
    position: static;
}
::v-deep(.el-tabs__header, .is-top) {
    margin: 0;
}
::v-deep(.el-row) {
    margin: 17px 10px;
}
::v-deep(.el-divider, .el-divider--horizontal) {
    margin: 0;
}
</style>