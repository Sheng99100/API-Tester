import { ref } from 'vue';

const test_template = {
    loading: false,
    work_space_name: '',
    test_name: '',
    request: {
        url: "",
        method: 'Get',
        headers: [],
        body: {
            type: 'none',
            form_data: [],
            row: ""
        }
    },
    responses: []
}
const example_data = {
    state: {
        active_test: ''
    },
    template: {
        methods: {
            Get: 'Get',
            Post: 'Post',
            Delete: 'Delete'
        },
        test_saved: 'saved',
        test_name_separator: '/',
        unsaved_dialog_title: 'DO YOU WANT TO SAVE?',
        unsaved_dialog_prompt: 'This tab has unsaved changes which will be lost if you choose to close it. Save these changes to avoid losing your work.',
    },
    work_spaces: {
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
    },
    opened_tests: {

    }
}

// 应用初启动时，work_spaces 会被 localStorage 的数据覆盖
const d = ref({
    state: {
        active_test: ''
    },
    template: {
        methods: {
            Get: 'Get',
            Post: 'Post',
            Delete: 'Delete'
        },
        test_saved: 'saved',
        test_name_separator: '/',
        unsaved_dialog_title: 'DO YOU WANT TO SAVE?',
        unsaved_dialog_prompt: 'This tab has unsaved changes which will be lost if you choose to close it. Save these changes to avoid losing your work.',
        new_tag_dialog_prompt: 'Input the name test name and work space name witch includes it',
        new_tag_dialog_title:  'Create a new Test',
    },
    work_spaces: {},
    opened_tests: {}
})
export default d;