<template>
  <!-- v-loading 是 ElementUI 组件属性  -->
  <el-main v-loading="stored_test.loading" class="response_body_editor">
      <textarea ref="textarea_dom"/>
  </el-main>
</template>

<script setup>
import {ref, watch, nextTick, onMounted} from "vue";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

const props = defineProps(["stored_test"]);
const stored_responses = props.stored_test.responses;

let latest_response = ref({});
latest_response.value = stored_responses.length !== 0 ?
    stored_responses[stored_responses.length-1] :
    "";

const textarea_dom = ref();
let codemirror_instance = null;

function detectCodeMode(content) {
    if (content.startsWith('<')) return 'htmlmixed';
    if (content.startsWith('{')) return 'javascript';
    return 'plaintext';
}

function refreshEditor() {
    latest_response.value = stored_responses.length !== 0 ?
        stored_responses[stored_responses.length-1] :
        "";
    console.log(stored_responses)
    // 重新渲染文本区域内容
    let format_body = typeof latest_response.value.body === 'string' ?
        latest_response.value.body :
        JSON.stringify(latest_response.value.body, null, 4);
    codemirror_instance.setValue(format_body);
    // 根据响应类型修改编辑器样式
    codemirror_instance.setOption('mode', detectCodeMode(format_body));
    codemirror_instance.refresh();
    // 设置光标位置
    const doc = codemirror_instance.getDoc();
    const lastChar = doc.getLine(0).length;
    codemirror_instance.setCursor({ line: 0, ch: lastChar });
}

watch(()=>stored_responses.length, refreshEditor)

onMounted(async ()=>{
    codemirror_instance = CodeMirror.fromTextArea(textarea_dom.value, {
        mode: { name: "javascript", json: true },
        lineNumbers: true, // 显示行号
        theme: "default", // 主题
        tabSize: 4, // 缩进大小
        viewportMargin: Infinity, // 强制渲染所有内容
    });

    await nextTick();

    refreshEditor();
})
</script>

<style scoped>
::v-deep(pre[class*="language-"]) {
    padding: 0;
    margin: 0;
}
.response_body_editor {
    max-height: 500px;
}
</style>