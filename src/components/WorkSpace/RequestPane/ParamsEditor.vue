<template>
    <div style="display: flex; margin: 5px 0">
        <el-text class="hint mx-1">
            <el-tag type="primary" effect="light">Params</el-tag>
        </el-text>
    </div>
    <div class="params-editor">
        <el-table
            ref = "multiple_table_ref"
            :data="temp_params"
            @selection-change = "handleSelectionChange"
            style="width: 100%"
            border
            table-layout="auto"
            height="290"
        >
            <el-table-column
                type="selection" width="auto"
                :selectable="(param, row_index) => row_index !== temp_params.length-1"/>
            <el-table-column label="Key" width="auto">
                <template #default="scope">
                    <el-input
                        v-model="scope.row.k"
                        style="width: 100%"
                        placeholder="Key"/>
                </template>
            </el-table-column>
            <el-table-column label="Value" width="auto">
                <template #default="scope">
                    <el-input
                        v-model="scope.row.v"
                        style="width: 100%"
                        placeholder="Value"/>
                </template>
            </el-table-column>
            <el-table-column label="Descriptor" width="auto">
                <template #default="scope">
                    <el-input
                        v-model="scope.row.descriptor"
                        style="width: 100%"
                        placeholder="Descriptor"/>
                </template>
            </el-table-column>
            <el-table-column label="Operations" width="auto">
                <template #default="scope">
                    <el-button
                        size="small"
                        type="danger"
                        style="margin: auto"
                        @click="delete_param(scope.$index, scope.row)"
                        v-show="scope.row.k || scope.row.v"
                    >
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";

const props = defineProps(['temp_test']);
const temp_request = props.temp_test.request;
const multiple_table_ref = ref(null);
let temp_params= temp_request.params;
let mounted = 0;

// el-table 选中行改变时
const handleSelectionChange = (selected_params) => {
    if(mounted !== 0) {
        temp_params.forEach((param) => {
            param.selected = selected_params.includes(param);
        })
    }
}

onMounted(()=>{
    temp_params.forEach((param) => {
        multiple_table_ref.value.toggleRowSelection(param, param.selected);
    })
    let len = temp_params.length;
    if(len === 0 || temp_params[len-1].k || temp_params[len-1].v) {
        temp_params.push({
            k: null,
            v: null,
            selected: false,
            descriptor: null
        })
    }
    mounted = 1;
})

watch(temp_params,
    ()=>{
        temp_params.forEach((param) => {
            multiple_table_ref.value.toggleRowSelection(param, param.selected);
        })
        let len = temp_params.length;
        if(temp_params[len-1].k || temp_params[len-1].v) {
            temp_params[len-1].selected = true;
            temp_params.push({
                k: null,
                v: null,
                selected: false,
                descriptor: null
            })
        }
    },
    {deep: true})

function delete_param(row_index, param) {
    temp_params.splice(row_index, 1);
}
</script>

<style scoped>
::v-deep(.el-text) {
    display: block;
    text-align: left;
}
</style>