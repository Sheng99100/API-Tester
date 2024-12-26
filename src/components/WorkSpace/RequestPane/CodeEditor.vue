<script setup>
import {onMounted, ref} from "vue";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

const prop = defineProps(['temp_test']);
const body_editor_dom = ref(null); // textarea 引用
let codemirror_instance = null; // Codemirror 实例


// 挂载后，TextArea的dom才会被创建并被 codemirror_instance 引用
onMounted(() => {
    // 初始化 Codemirror
    codemirror_instance = CodeMirror.fromTextArea(body_editor_dom.value, {
        mode: { name: "javascript", json: true }, // 设置为 JSON 模式
        lineNumbers: true, // 显示行号
        theme: "default", // 主题
        tabSize: 4, // 缩进大小
        viewportMargin: Infinity, // 强制渲染所有内容
    });

    codemirror_instance.setValue(prop.temp_test.request.body.row);
    codemirror_instance.refresh();
    const doc = codemirror_instance.getDoc();
    const lastLine = doc.lastLine();
    const lastChar = doc.getLine(lastLine).length;
    codemirror_instance.setCursor({ line: lastLine, ch: lastChar });

    // 设置内容修改事件的回调
    codemirror_instance.on('change', (instance, changeObj) => {
        prop.temp_test.request.body.row = instance.getValue();
    });
})
</script>

<template>
  <!--   编辑框    -->
    <textarea
            ref="body_editor_dom">
    </textarea>
</template>
