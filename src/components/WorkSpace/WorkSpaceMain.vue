<template>
    <div class="work-space-main-wrapper">
        <el-tabs
            v-model="d.state.active_test"
            type="card"
            editable
            @tab-remove="removeTab"
            @tab-add="new_tag_dialog_visible = true"
        >
            <!--    标签页      -->
            <el-tab-pane
                v-for="(active, full_test_name) in opened_tests"
                :key="full_test_name"
                :label="full_test_name"
                :name="full_test_name"
            >
                <div class="request-pane-wrapper">
                    <request-pane :full_test_name="full_test_name"/>
                </div>
                <div class="response-pane-wrapper">
                    <response-pane :full_test_name="full_test_name"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <!-- 关闭标签时的为保存提示对话框 -->
    <el-dialog
            v-model="close_dialog_visible"
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
                    <el-button @click="close_dialog_visible = false">Cancel</el-button>
                    <el-button type="primary" @click="closeTest(true)">
                        Save
                    </el-button>
                </div>
            </div>
        </template>
    </el-dialog>

    <!-- 点击新建 tag 标签时弹出的新建 Test 对话框 -->
    <el-dialog
        v-model="new_tag_dialog_visible"
        :title="d.template.new_tag_dialog_title"
        width="500"
    >
        <el-row>
            <el-col :span="24">
                <el-text>{{d.template.new_tag_dialog_prompt}}</el-text>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="7">
                <el-text>
                    WorkSpace name
                </el-text>
            </el-col>
            <el-col :span="17">
                <el-input
                    v-model="new_work_space_name"
                    placeholder="Please Input New WorkSpace Name"
                />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="7">
                <el-text>
                    New Test name
                </el-text>
            </el-col>
            <el-col :span="17">
                <el-input
                    v-model="new_test_name"
                    placeholder="Please Input New Test Name"
                />
            </el-col>
        </el-row>
        <template #footer>
            <div class="dialog-footer">
                <div>
                    <el-button @click="new_tag_dialog_visible = false">Cancel</el-button>
                    <el-button type="primary" @click="addTab">
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
const close_dialog_visible = ref(false);
const onclose_full_test_name = ref('');
const new_tag_dialog_visible = ref(false);
const new_test_name = ref('');
const new_work_space_name = ref('');


// el-tab 关闭标签页事件，参数为要关闭 tag 绑定的 name
function removeTab(full_test_name) {
    // 更新正要关闭的 Test 全名（work_space_name/test_name）
    onclose_full_test_name.value = full_test_name;
    if (opened_tests[full_test_name] !== d.value.template.test_saved) {
        // 关闭时未保存，显示对话框提示保存
        close_dialog_visible.value = true;
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
    close_dialog_visible.value = false;
}

function addTab() {
    const full_test_name = `${new_work_space_name.value}${d.value.template.test_name_separator}${new_test_name.value}`;
    builder.addEmptyTest(full_test_name);
    // Test 刚创建就将其打开，刚打开的 RequestPane 组件中，temp_test 是新从全局变量获取没修改过的，所以设置为 ”已保存“
    new_tag_dialog_visible.value = false;
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