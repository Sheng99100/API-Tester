import d from './TestData.js'
import axios from "axios";

const axios_config_builder = {
    build(test) {
        const axios_config = {};
        const t_request = test.request;

        axios_config["url"]     = t_request.url;
        axios_config["method"]  = t_request.method;
        axios_config['headers'] = this.buildHeaders(test);
        axios_config['body']    = t_request.method === d.value.template.methods.Get ? undefined : t_request.body;
        return axios_config;
    },
    buildHeaders(test) {
        const t_headers = test.request.headers;
        const c_headers = {};
        t_headers.forEach((header)=>{
            if(header.selected && header.editable)
                c_headers[header.k] = header.v;
        })
        return c_headers;
    }
}

const http_stater = {
    send(test) {
        const config = axios_config_builder.build(test);
        console.log(config);
        return axios(config);
    }
}

export default http_stater;
