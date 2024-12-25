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
const content_type = ref("FormDataEditor");

watch(content_type, () => {
    prop.temp_test.request.body.type = content_type.value;
})

content_type.value =
    prop.temp_test.request.body.type ?
    prop.temp_test.request.body.type :
    "FormDataEditor";

</script>
