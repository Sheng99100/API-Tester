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
    <el-row>
        <el-col :span="17">
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
        <el-col :span="7">
            <el-button
                @click="send"
            >Send</el-button>
            <el-button
                @click="builder.saveTest(full_test_name)"
            >Save</el-button>
        </el-col>
    </el-row>
    <!--请求头编辑区-->
    <el-row>
        <el-col :span="24">
            <el-tabs model-value="Headers">
                <el-tab-pane label="Params" name="Params">
                    <params-editor :temp_test="temp_test"/>
                </el-tab-pane>
                <el-tab-pane label="Headers" name="Headers">
                    <headers-editor :temp_test="temp_test"/>
                </el-tab-pane>
                <el-tab-pane label="Body" name="Body">

                </el-tab-pane>
                <el-tab-pane label="Scripts" name="Scripts">

                </el-tab-pane>
                <el-tab-pane label="Settings" name="fifth">

                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script setup>
import {watch} from "vue";
import ParamsEditor from "./ParamsEditor.vue";
import HeadersEditor from "./HeadersEditor.vue";
import d from "../../../TestData.js";
import builder from "../../../TestBuilder.js";
import http_stater from "../../../HTTPStarter.js";

const props = defineProps(['full_test_name']);
const stored_test = builder.getTest(props.full_test_name);
const stored_request= builder.getRequest(props.full_test_name);

const temp_test = builder.copyRef(stored_test);
const temp_request= temp_test.value.request;

// 如果 request 是否有更改过（request副本和原来的request是否不同）
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
        .then((response)=>{
            // 得到 response 后直接保存即可，不需要让用户手动保存
            builder.addResponseToTest(stored_test, response);
        })
}
</script>