import d from './TestData.js'
import {ref, toRaw} from "vue";
import { ElNotification } from 'element-plus'

const builder = {
    // 初始化
    // 将测试数据从 localStorage(位于磁盘) 读到 js 内存
    init() {
        const data = localStorage.getItem("api_tester_data");
        if (data) {
            d.value = JSON.parse(data);
        }
    },
    // 将测试数据从 js 内存写到磁盘
    store(api_tester_data) {
        localStorage.setItem(
            "api_tester_data",
            JSON.stringify(api_tester_data)
        )
    },
    open_msg(type, title, msg) {
        ElNotification({
            title: title,
            message: msg,
            type: type,
        })
    },
    saveTest(full_test_name) {

        // ---------------同步组件相关的 js 对象到全局对象---------------
        const stored_test_request = this.getRequest(full_test_name);
        const temp_request = d.value.opened_tests[full_test_name];
        for (const key in stored_test_request) {
            stored_test_request[key] = temp_request[key];
        }
        // 组件将 response 直接保存在全局对象，所以无需额外保存
        // -------------------------------------------------------

        // ---------------同步全局对象到 localStorage---------------
        builder.store(d.value);
        // -------------------------------------------------------

        // 在打开 Test 列表中设置该 Test 为 "已保存"
        d.value.opened_tests[full_test_name] = d.value.template.test_saved;

        // 弹出EL消息框
        this.open_msg('success', 'Saved','The test has been saved');
    },
    copyRef(ref_obj) {
        const deepCopy = JSON.parse(JSON.stringify(toRaw(ref_obj)));
        return ref(deepCopy);
    },
    getTest(full_test_name) {
        const work_spaces = d.value.work_spaces;
        const work_space_name = full_test_name.split(d.value.template.test_name_separator)[0];
        const test_name = full_test_name.split(d.value.template.test_name_separator)[1];
        return work_spaces[work_space_name]['tests'][test_name];
    },
    getRequest(full_test_name) {
        const work_spaces = d.value.work_spaces;
        const work_space_name = full_test_name.split(d.value.template.test_name_separator)[0];
        const test_name = full_test_name.split(d.value.template.test_name_separator)[1];
        const test = work_spaces[work_space_name]['tests'][test_name];
        return test.request;
    },
    getResponses(full_test_name) {
        const work_spaces = d.value.work_spaces;
        const work_space_name = full_test_name.split(d.value.template.test_name_separator)[0];
        const test_name = full_test_name.split(d.value.template.test_name_separator)[1];
        const test = work_spaces[work_space_name]['tests'][test_name];
        return test.responses;
    },
    newAutoGeneratedHeaders() {
        return [
            {
                k: 'Content-Length',
                v: '0',
                selected: true,
                usr_editable: false,
                descriptor: 'This header was automaticlly added.'
            },
            {
                k: 'User-Agent',
                v: 'ApiTester/0.1',
                selected: true,
                usr_editable: false,
                descriptor: 'This header was automaticlly added.'
            },
            {
                k: 'Accept',
                v: '*/*',
                selected: true,
                usr_editable: false,
                descriptor: 'This header was automaticlly added.'
            },
            {
                k: 'Accept-Encoding',
                v: 'gzip, deflate, br',
                selected: true,
                usr_editable: false,
                descriptor: 'This header was automaticlly added.'
            },
            {
                k: 'Connection',
                v: 'keep-alive',
                selected: true,
                usr_editable: false,
                descriptor: 'This header was automaticlly added.'
            }
        ]
    },
    newEmptyTest(test_name) {
        return {
            test_name: test_name,
            request: {
                method: 'Get',
                header: {},
                body: {}
            },
            responses: {
                status_line: {
                    status_code: 200,
                    status_msg: 'OK'
                },
                header: {},
                body: {}
            }
        }
    },
    addResponseToTest(test, axios_response) {
        const new_response = {};
        new_response.headers = [];
        new_response.body = axios_response.data;
        new_response.cookies = [];
        new_response.status = axios_response.status;
        new_response.statusText = axios_response.statusText;

        const headers_ = axios_response.headers.toJSON();
        for (let header_k in headers_) {
            new_response.headers.push({
                k: header_k,
                v: headers_[header_k]
            })
        }

        test.responses.push(new_response);
    },
    addTestToWorkSpace(wk_name, test) {

    }
}
export default builder;