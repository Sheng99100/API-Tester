<template>
    <div style="display: flex; margin: 5px 0">
        <el-text class="hint mx-1">
            <el-tag type="primary" effect="light">Query Params</el-tag>
        </el-text>
    </div>
    <div class="params-editor">
                <el-table
                    ref="multipleTableRef"
                    :data="tableData"
                    style="width: 100%"
                    border
                    table-layout="auto"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" :selectable="selectable" width="55" />
                    <el-table-column property="Key" label="Key" width="120">
                        <template #default="scope">
                            <el-input v-model="input" style="width: 240px" placeholder="Key" />
                        </template>
                    </el-table-column>
                    <el-table-column property="Value" label="Value" width="120">
                        <template #default="scope">
                            <el-input v-model="input" style="width: 240px" placeholder="Value" />
                        </template>
                    </el-table-column>
                    <el-table-column property="address" label="Descriptor" />
                </el-table>
            </div>
</template>

<script setup>
const props = defineProps(['temp_request']);


</script>

<style scoped>
::v-deep(.el-text) {
    display: block;
    text-align: left;
}
</style>