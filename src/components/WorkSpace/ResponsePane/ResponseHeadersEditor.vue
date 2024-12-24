<template>
    <el-table v-loading="stored_test.loading"
              :data="latest_response.headers"
              border
              style="width: 100%; height: 100%">
        <el-table-column prop="k" label="Key" width="auto" />
        <el-table-column prop="v" label="Value" width="auto" />
    </el-table>
</template>

<script setup>
import {nextTick, ref, watch} from "vue";

const props = defineProps(["stored_test"]);
const stored_responses = props.stored_test.responses;
let latest_response = ref({});
latest_response.value = stored_responses.length !== 0 ? stored_responses[stored_responses.length-1] : {};

watch(()=>stored_responses.length,
    async ()=> {
        latest_response.value = stored_responses.length !== 0 ? stored_responses[stored_responses.length-1] : {};
        await nextTick();
        props.stored_test.loading = false;
    })
</script>

<style scoped>

</style>