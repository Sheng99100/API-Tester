<template>
    <div style="display: flex; margin: 5px 0">
        <el-text class="hint mx-1">
            <el-tag type="primary" effect="light">Headers</el-tag>
        </el-text>
    </div>
    <div class="headers-editor">
        <el-table
            ref = "multiple_table_ref"
            :data="temp_headers"
            @selection-change = "handleSelectionChange"
            style="width: 100%"
            border
            table-layout="auto"
            height="290"
        >
            <el-table-column
                type="selection" width="auto"
                :selectable="(header, row_index) => header.usr_editable && row_index !== temp_headers.length-1"/>
            <el-table-column label="Key" width="auto">
                <template #default="scope">
                    <el-input
                        :disabled="!scope.row.usr_editable"
                        v-model="scope.row.k"
                        style="width: 100%"
                        placeholder="Key"/>
                </template>
            </el-table-column>
            <el-table-column label="Value" width="auto">
                <template #default="scope">
                    <el-input
                        :disabled="!scope.row.usr_editable"
                        v-model="scope.row.v"
                        style="width: 100%"
                        placeholder="Value"/>
                </template>
            </el-table-column>
            <el-table-column label="Descriptor" width="auto">
                <template #default="scope">
                    <el-input
                        :disabled="!scope.row.usr_editable"
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
                        @click="delete_header(scope.$index, scope.row)"
                        v-show="scope.row.usr_editable && (scope.row.k || scope.row.v)"
                    >
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import builder from '../../../TestBuilder.js'
import {onMounted, ref, watch} from "vue";

const props = defineProps(['temp_test']);
const temp_request = props.temp_test.request;
const multiple_table_ref = ref(null);
let temp_headers = temp_request.headers;
let mounted = 0;

// el-table 选中行改变时
const handleSelectionChange = (selected_headers) => {
    if(mounted !== 0) {
        temp_headers.forEach((header) => {
            header.selected = selected_headers.includes(header);
        })
    }
}

onMounted(()=>{
    temp_headers.forEach((header) => {
        // multiple_table_ref 是 el-table 组件对象
        // 该组件的 toggleRowSelection 方法改变对象对应的行的选中状态
        multiple_table_ref.value.toggleRowSelection(header, header.selected);
    })
    let len = temp_headers.length;
    if(temp_headers[len-1].k || temp_headers[len-1].v) {
        temp_headers.push({
            k: null,
            v: null,
            selected: false,
            usr_editable: true,
            descriptor: null
        })
    }
    mounted = 1;
})

watch(temp_headers,
    ()=>{
        temp_headers.forEach((header) => {
            multiple_table_ref.value.toggleRowSelection(header, header.selected);
        })
        let len = temp_headers.length;
        if(temp_headers[len-1].k || temp_headers[len-1].v) {
            temp_headers[len-1].selected = true;
            temp_headers.push({
                k: null,
                v: null,
                selected: false,
                usr_editable: true,
                descriptor: null
            })
        }
    },
    {deep: true})

function delete_header(row_index, header) {
    temp_headers.splice(row_index, 1);
}
</script>

<style scoped>
::v-deep(.el-text) {
    display: block;
    text-align: left;
}
</style>