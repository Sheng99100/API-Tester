<template>
        <div class="body_wrapper">
            <el-radio-group v-model="content_type">
                <el-radio value="none" size="large">
                    <el-text>none</el-text>
                </el-radio>
                <el-radio value="form_data" size="large">
                    <el-text>form_data</el-text>
                </el-radio>
                <el-radio value="json" size="large">
                    <el-text>json</el-text>
                </el-radio>
            </el-radio-group>

            <component :is="component_map[content_type]"
                       :temp_test="temp_test"/>
        </div>
</template>

<script setup>
import {ref, watch} from "vue";
import CodeEditor from "./CodeEditor.vue";
import FormDataEditor from "./FormDataEditor.vue";

const prop = defineProps(['temp_test']);
const component_map = ref({
    'json': CodeEditor,
    'form_data': FormDataEditor,
    'none': undefined
})
const content_type_map = {
    'json': "application/json",
    'form_data': "multipart/form-data",
    'none': '<calculated when request is sent>'
}

const content_type = ref("none");

// 如果用户还没有选择过请求 body 类型
// 默认选择 body 为 none
content_type.value =
    prop.temp_test.request.body.type ?
        prop.temp_test.request.body.type :
        "none";

watch(content_type, () => {
    prop.temp_test.request.body.type = content_type.value;
    prop.temp_test.request.headers.forEach((header)=>{
        if(header.k === 'Content-Type') {
            header.v = content_type_map[content_type.value];
            header.selected = content_type.value !== 'none';
        }
    })
})

</script>
