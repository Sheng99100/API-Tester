import d from './TestData.js'
import axios from "axios";
import builder from "./TestBuilder.js";

const axios_config_builder = {
    buildConfig(test) {
        const axios_config = {};
        const t_request = test.request;

        axios_config["url"]     = t_request.url;
        axios_config["method"]  = t_request.method;
        axios_config['params']  = this.buildParamsConfig(test);
        axios_config['headers'] = this.buildHeadersConfig(test);
        axios_config['data']    = this.buildBodyConfig(test);

        return axios_config;
    },
    buildHeadersConfig(test) {
        const t_headers = test.request.headers;
        const config_headers = {};
        t_headers.forEach((header)=>{
            if(header.selected && header.editable)
                config_headers[header.k] = header.v;
        })
        return config_headers;
    },
    buildParamsConfig(test) {
        const t_params = test.request.params;
        const config_params = {};
        t_params.forEach((param)=>{
            if(param.selected) config_params[param.k] = param.v;
        })
        return config_params;
    },
    buildBodyConfig(test) {
        const test_req_body= test.request.body;
        let config_body = undefined;

        if(test.request.method === d.value.template.methods.Post) {
            if(test_req_body.type === "json"){
                try {
                    // axios 将对象转换为 json body
                    // 如果是字符串，content-type 会被改为 urlencode
                    config_body = JSON.parse(test_req_body.row);
                }catch (e) {
                    builder.open_msg("error", "JSON Parse Error!", "Please check the JSON Format");
                    return {};
                }
            }else if(test_req_body.type === "form_data") {
                console.log( "form_data" );
                config_body = new FormData();
                test_req_body.form_data.forEach((form_param) => {
                    if(form_param.selected)
                        config_body.append(form_param.k, form_param.v);
                })
                console.log( config_body )
            }
        }

        return config_body;
    }
}

const http_stater = {
    send(test) {
        const config = axios_config_builder.buildConfig(test);
        console.log(config)
        return axios(config);
    }
}

export default http_stater;
