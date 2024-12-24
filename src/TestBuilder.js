import d from './TestData.js'
import {ref, toRaw} from "vue";
import { ElNotification } from 'element-plus'

const test_template = {
    loading: false,
    work_space_name: '',
    test_name: '',
    request: {
        url: "",
        method: 'Get',
        headers: [],
        body: {}
    },
    responses: []
}
const example_work_spaces =  {
    wk_eg1: {
        work_space_name: 'wk_eg1',
        tests: {
            test_eg1: {
                loading: false,
                work_space_name: 'wk_eg1',
                test_name: 'test_eg1',
                request: {
                    url: "http://localhost/api/question/1",
                    method: 'Get',
                    headers: [],
                    body: {}
                },
                responses: []
            },
            test_eg2: {
                loading: false,
                test_name: 'test_eg2',
                request: {
                    url: "www.bing.com",
                    method: 'Get',
                    headers: [],
                    body: {}
                },
                responses: []
            }
        }
    },
    wk_eg2: {
        work_space_name: 'wk_eg2',
        tests: {
            test_eg1: {
                loading: false,
                work_space_name: 'wk_eg2',
                test_name: 'test_eg1',
                request: {
                    url: "www.baidu.com",
                    method: 'Get',
                    headers: [],
                    body: {}
                },
                responses: []
            },
            test_eg2: {
                loading: false,
                test_name: 'test_eg2',
                request: {
                    url: "www.bing.com",
                    method: 'POST',
                    headers: [],
                    body: {}
                },
                responses: []
            }
        }
    }
}

const builder = {
    // 初始化
    // 将测试数据从 localStorage(位于磁盘) 读到 js 内存
    init() {
        const local_work_spaces = localStorage.getItem("work_spaces_data");
        if (local_work_spaces) {
            d.value.work_spaces = JSON.parse(local_work_spaces);
        }else {
            // 如果 localStorage 没有 work_spaces 数据
            // 则使用样例 work_spaces

            // 添加自动生成的 Headers
            for (let wks_name in example_work_spaces) {
                for (let test_name in example_work_spaces[wks_name]['tests']) {
                    example_work_spaces[wks_name]['tests'][test_name].request.headers.push( ... this.newAutoGeneratedHeaders() );
                }
            }
            d.value.work_spaces = example_work_spaces;
        }
    },
    // 将测试数据从 js 内存写到磁盘（localStorage）
    store(work_spaces_data) {
        localStorage.setItem(
            "work_spaces_data",
            JSON.stringify(work_spaces_data)
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
        if (temp_request === d.value.template.test_saved) {
            this.open_msg('success', 'Saved','The test has been saved')
            return;
        }
        for (const key in stored_test_request) {
            stored_test_request[key] = temp_request[key];
        }
        // 组件将 response 直接保存在全局对象，所以无需额外保存
        // -------------------------------------------------------

        // ---------------同步全局对象到 localStorage---------------
        builder.store(d.value.work_spaces);
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
    addEmptyTest(full_test_name) {
        const work_space_name = full_test_name.split('/')[0];
        const test_name = full_test_name.split('/')[1];

        const new_test = {
            loading: false,
            work_space_name: work_space_name,
            test_name: test_name,
            request: {
                url: "",
                method: 'Get',
                headers: [],
                body: {}
            },
            responses: []
        }

        new_test.request.headers.push( ... builder.newAutoGeneratedHeaders() );
        if( !d.value.work_spaces[work_space_name] ) {
            d.value.work_spaces[work_space_name] = {
                work_space_name: work_space_name,
                tests: {}
            }
        }
        d.value.work_spaces[work_space_name]['tests'][test_name] = new_test;

        d.value.opened_tests[full_test_name] = d.value.template.test_saved
        d.value.state.active_test = full_test_name;
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
    }
}
export default builder;