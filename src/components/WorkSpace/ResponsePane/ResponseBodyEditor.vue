<template>
  <!-- v-loading 是 ElementUI 组件属性  -->
  <el-main v-loading="stored_test.loading" class="response_body_editor">
      <pre>
          <code class="language-json line-numbers">
              {{latest_response.body}}
          </code>
      </pre>
  </el-main>
</template>

<script setup>
import {ref, watch, nextTick, onMounted} from "vue";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-json.js';

const props = defineProps(["stored_test"]);
const stored_responses = props.stored_test.responses;

let latest_response = ref({});
latest_response.value = stored_responses.length !== 0 ? stored_responses[stored_responses.length-1] : {};

watch(()=>stored_responses.length,
    async ()=> {
        latest_response.value = stored_responses.length !== 0 ? stored_responses[stored_responses.length-1] : {};
        // 等待 Vue 更新 DOM 后s
        // 再让 Prism 高亮更新后的 DOM
        await nextTick();
        Prism.highlightAll();
        // 请求发送时 stored_test.loading = true (添加加载动画)
        // DOM 更新后改为 false
        props.stored_test.loading = false;
  })

// vue 把 DOM 渲染完成，<code></code> 更新为 latest_response.body 之后
// Prism.js 再去渲染才有内容可渲染
// setup() 执行时 dom 还不一定能渲染完成
// 所以 Prism.highlightAll() 不应该直接放在 setup() 内
onMounted(()=>{
    Prism.highlightAll();
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