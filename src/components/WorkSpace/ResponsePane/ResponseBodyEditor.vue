<template>
  <!-- v-loading 是 ElementUI 组件属性  -->
  <el-main v-loading="stored_test.loading" class="response_body_editor">
      <textarea ref="textarea_dom"/>
  </el-main>
</template>

<script setup>
import {ref, watch, nextTick, onMounted} from "vue";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

const props = defineProps(["stored_test"]);
const stored_responses = props.stored_test.responses;

let latest_response = ref({});
latest_response.value = stored_responses.length !== 0 ? stored_responses[stored_responses.length-1] : {};

const textarea_dom = ref();
let codemirror_instance = null;

watch(()=>stored_responses.length,
    ()=> {
        latest_response.value = stored_responses.length !== 0 ? stored_responses[stored_responses.length-1] : {};

        // 重新渲染文本区域内容
        codemirror_instance.setValue(JSON.stringify(latest_response.value.body, null, 4));            codemirror_instance.refresh();
        codemirror_instance.refresh();
        const doc = codemirror_instance.getDoc();
        const lastLine = doc.lastLine();
        const lastChar = doc.getLine(lastLine).length;
        codemirror_instance.setCursor({ line: lastLine, ch: lastChar });

        // 请求发送时 stored_test.loading = true (添加加载动画)
        // DOM 更新后改为 false
        props.stored_test.loading = false;
    })

onMounted(async ()=>{
    codemirror_instance = CodeMirror.fromTextArea(textarea_dom.value, {
        mode: { name: "javascript", json: true }, // 设置为 JSON 模式
        lineNumbers: true, // 显示行号
        theme: "default", // 主题
        tabSize: 4, // 缩进大小
        viewportMargin: Infinity, // 强制渲染所有内容
    });

    await nextTick();

    codemirror_instance.setValue(JSON.stringify(latest_response.value.body, null, 4));
    codemirror_instance.refresh();
    const doc = codemirror_instance.getDoc();
    const lastLine = doc.lastLine();
    const lastChar = doc.getLine(lastLine).length;
    codemirror_instance.setCursor({ line: lastLine, ch: lastChar });
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