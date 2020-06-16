import {base_url} from "../utils/config";
export var API = base_url;
export function post (param: Object) {
    return new Promise((resolve, reject) => {
        let full_url = API;
        if(!param.link){
            if(!param.custom_link){
                reject({ message: 'Ops: Somthing error' });
            }else{
                full_url = param.custom_link;
            }
        }else{
            full_url += param.link;
        }

        console.log('API URL >> ', full_url);
        var header = {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }
        var request = Object.assign({
            body: JSON.stringify(param.data)
        }, header);
        
        fetch(full_url, request)
        .then((response) => {
            if(response.status == 200){
                return response.json();
            }else{
                reject({message: 'Ops: Somthing error'});
            }
        })
        .then((res) => {
            resolve(res);
        }).catch((error) => {
            console.log('Error')
        });
    });
}