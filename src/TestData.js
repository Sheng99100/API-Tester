import { ref } from 'vue'

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

// 如果 localStorage 没有保存的数据
// 则使用 example_data
// 否则在应用初启动时，会被 localStorage 的数据覆盖
const d = ref(example_data)
export default d;