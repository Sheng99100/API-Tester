<template>
  <div class="response-pane">
      <!--  response 状态行   -->
      <el-row>
          <el-col :span="24">
              <div class="status_line">
                  <el-tag v-show="latest_response.status && latest_response.status <= 200">
                      <el-text>
                          {{latest_response.status + " " + latest_response.statusText}}
                      </el-text>
                  </el-tag>
                  <el-tag type="danger" v-show="latest_response.status && latest_response.status > 200">
                      {{latest_response.status + " " + latest_response.statusText}}
                  </el-tag>
                  <el-tag v-show="!latest_response.status">
                      <el-text>
                          Status Line
                      </el-text>
                  </el-tag>
              </div>
          </el-col>
      </el-row>
      <el-divider/>
      <!-- Body Headers Cookies tabs 页 -->
      <el-row>
          <el-col :span="24">
              <el-tabs model-value="Body">
                  <el-tab-pane label="Body" name="Body">
                      <body-editor :stored_test="stored_test"/>
                  </el-tab-pane>
                  <el-tab-pane label="Headers" name="Headers">
                      <headers-editor :stored_test="stored_test"/>
                  </el-tab-pane>
                  <el-tab-pane label="Cookies" name="Cookies">
                      Cookies
                  </el-tab-pane>
              </el-tabs>
          </el-col>
      </el-row>
  </div>
</template>

<script setup>
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import BodyEditor from "./ResponseBodyEditor.vue";
import HeadersEditor from "./ResponseHeadersEditor.vue";
import builder from "../../../TestBuilder.js";

const props = defineProps(['full_test_name']);
const stored_test = builder.getTest(props.full_test_name);
const stored_responses = stored_test.responses;
let latest_response = ref({});
latest_response.value = stored_responses.length !== 0 ? stored_responses[stored_responses.length-1] : {};

watch(()=>stored_responses.length,
    ()=> {
        latest_response.value =
            stored_responses.length !== 0 ?
                stored_responses[stored_responses.length-1]:
                {};
    })
</script>

<style scoped>
::v-deep(.el-tabs__item:nth-child(2)) {
    padding-left: 10px;
}
.response-pane {
    height: 200px;
}
::v-deep(.el-row) {
    margin: 0 !important;
}
.status_line {
    height: 37px;
    display: flex;
    align-items: center;
}
</style>