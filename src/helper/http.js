import {base_url} from "../utils/config";
export var API = base_url;
export function post (param: Object) {
    return new Promise((resolve, reject) => {
        let full_url = API;
        if(!param.link){
            if(!param.custom_link){
                reject({ message: 'Ops: Something error' });
            }else{
                full_url = param.custom_link;
            }
        }else{
            full_url += param.link;
        }

        if(param.method == ''){
            reject({message: 'Ops: method not found'});
        }
        
        var header = {
            method: param.method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }
        var request = Object.assign({
            body: param.data != '' ? JSON.stringify(param.data) : '' 
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