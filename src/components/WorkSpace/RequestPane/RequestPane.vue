<template>
    <el-row>
        <el-col :span="24">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item>{{full_test_name.split(d.template.test_name_separator)[0]}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{full_test_name.split(d.template.test_name_separator)[1]}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
    </el-row>
    <el-row justify="space-between">
        <el-col :span="15">
            <el-input
                v-model="temp_request.url"
                placeholder="Enter URL or paste text"
                class="input-with-select"
            >
                <template #prepend>
                    <el-select
                        v-model="temp_request.method"
                        :placeholder="temp_request.method"
                        style="width: 115px">
                        <el-option
                            v-for="method of d.template.methods"
                            :key='method'
                            :label="method"
                            :value="method" />
                    </el-select>
                </template>
            </el-input>
        </el-col>
        <el-col :span="9">
            <div style="display: flex; justify-content: center">
                <el-button
                    @click="send"
                >Send</el-button>
                <el-button
                    @click="builder.saveTest(full_test_name)"
                >Save</el-button>
                <el-button
                    @click="builder.exportTest(temp_test)"
                >Export</el-button>
                <el-button
                    @click="file_input.click()"
                >Import</el-button>
            </div>
        </el-col>
    </el-row>

    <input
        ref="file_input"
        @change="builder.importTest(file_input)"
        type="file"
        id="fileInput"
        v-show="false"/>

    <!--请求头编辑区-->
    <el-row>
        <el-col :span="24">
            <el-tabs model-value="Params">
                <el-tab-pane label="Params" name="Params">
                    <params-editor :temp_test="temp_test"/>
                </el-tab-pane>
                <el-tab-pane label="Headers" name="Headers">
                    <headers-editor :temp_test="temp_test"/>
                </el-tab-pane>
                <el-tab-pane label="Body" name="Body">
                    <body-editor :temp_test="temp_test"/>
                </el-tab-pane>
                <el-tab-pane label="Scripts" name="Scripts">

                </el-tab-pane>
                <el-tab-pane label="Settings" name="Settings">

                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script setup>
import {ref, watch} from "vue";
import ParamsEditor from "./ParamsEditor.vue";
import HeadersEditor from "./HeadersEditor.vue";
import BodyEditor from "./BodyEditor.vue";
import d from "../../../TestData.js";
import builder from "../../../TestBuilder.js";
import http_stater from "../../../HTTPStarter.js";

const props = defineProps(['full_test_name']);
const stored_test = builder.getTest(props.full_test_name);
const stored_request= builder.getRequest(props.full_test_name);

const temp_test = builder.copyRef(stored_test);
const temp_request= temp_test.value.request;
const file_input = ref();

// 如果 request 有更改过（request副本和原来的request是否不同）
// 使该 test 在 opened_tests 中的值为最后更改过的 temp_request
watch(temp_request,
    () => {
        d.value.opened_tests[props.full_test_name] =
            JSON.stringify(temp_request) !== JSON.stringify(stored_request) ?
                temp_request :
                d.value.template.test_saved
    },
    { deep: true })

function send() {
    stored_test.loading = true;
    http_stater
        .send(temp_test.value)
        .catch((error) => {
            console.log( "error" );
            if (error.response) {
                console.log("状态代码超出了 2xx 的范围");
                // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                builder.saveResponseToTest(stored_test, error.response);
            } else if (error.request) {
                // 请求已经成功发起，但没有收到响应
                // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
                console.log("请求已经成功发起，但没有收到响应", error.request);
                builder.saveErrorResponse(stored_test, error);
            } else {
                // 发送请求时出了问题
                console.log('发送请求时出了问题', error.message);
                builder.saveErrorResponse(stored_test, error)
            }
            stored_test.loading = false;
        }).then((response)=>{
            console.log("success", response);
            if(response) {
                // response 直接保存，不需要让用户手动保存
              builder.saveResponseToTest(stored_test, response);
              stored_test.loading = false;
            }
        })
}
</script>