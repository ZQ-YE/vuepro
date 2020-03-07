'use strict'
import axios from 'axios'
import bus from './bus.js'

axios.interceptors.request.use(config => {  // 请求拦截
	return config;
},error => {
	return Promise.reject(error);
});

axios.interceptors.response.use(response => {  //响应拦截
	return response;
},error => {
   	return Promise.resolve(error.response);
});

function postData(val,url){  //处理请求数据
	if( url=="/login" ){
		console.log( JSON.stringify(val));
		return val;
	}else{
        // 判断登录用户信息/权限
		// var SysUserInfo = sessionStorage.SysUserInfo || '';
        // SysUserInfo = JSON.parse( SysUserInfo );
		// var Token = sessionStorage.Token || '';
		// if( SysUserInfo.Account && Token ){
		// 	val.Account = SysUserInfo.Account;
		// 	val.Token = Token;
		// 	console.log(JSON.stringify(val));
		// 	return val;
		// }else{
		// 	window.location.href = process.env.login;
		// }
	}
	// val.TenantNum=sessionStorage.tenantnum;
	console.log( JSON.stringify(val) );
	return JSON.stringify(val);
}

function getData(val,url){  //处理请求数据
	// var SysUserInfo = sessionStorage.SysUserInfo || '';
	// SysUserInfo = JSON.parse( SysUserInfo );
	// var Token = sessionStorage.Token || '';
	// if( SysUserInfo.Account && Token ){
	// 	val.Account = SysUserInfo.Account;
	// 	val.Token = Token;
	// }else{
	// 	window.location.href = process.env.login;
    // }
    if( typeof val == 'string' ){
        console.log( JSON.parse(val) );
        return JSON.parse(val);
    }else{
		console.log( JSON.stringify(val));
		return val;
	}
}

function putData(val,url){  //处理请求数据
	if( typeof val == 'string' ){
        console.log( JSON.parse(val) );
        return JSON.parse(val);
    }else{
		console.log( JSON.stringify(val));
		return val;
	}
}

function checkStatus(response){  //处理响应数据
	if( response && ( response.status === 200 ) ){  // loading,如果http状态码正常，则直接返回数据
		let res = response.data;
		console.log( res );
		if( !res ){
			bus.$message.error( "服务器开了个小差" );
			return false;
		}
		if( res.Ret!=200 && res.Ret !==100){
			bus.$message.error( res.Msg );
		}
		if( res.Ret==408 ){
			window.location.href=process.env.login;
			return false;
		}
		return res;
	}else{
		bus.$message.error( "网络异常" );
		return false;
	}
}

function checkCode(res){
	bus.$message.error( "网络异常" );
	console.log(res,19);
}

export default{
    post(url,data){  //post请求方式
    	return axios({
      		method:'post',
			url:url,
			baseURL:process.env.API_ROOT,
      		data:postData(data,url),
      		timeout:10000,
            headers:{ 'Content-Type':'application/json; charset=utf-8' }
	    }).then(
	    	(response) => { return checkStatus(response); }
	    ).catch(
	      	(res) => { return checkCode(res); }
	    )
	},
	get(url,data){  //get请求方式
    	return axios({
	      	method:'get',
	      	baseURL:process.env.API_ROOT,
	      	url:url,
	      	params:getData(data,url),
	      	timeout:10000
	    }).then(
	    	(response) => { return checkStatus(response); }
	    ).catch(
	    	(res) => { return checkCode(res); }
	    )
    },
	put(url,data){  //put请求方式
    	return axios({
	      	method:'put',
	      	baseURL:process.env.API_ROOT,
	      	url:url,
	      	params:putData(data,url),
            timeout:10000,
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
	    }).then(
	    	(response) => { return checkStatus(response); }
	    ).catch(
	    	(res) => { return checkCode(res); }
	    )
	},
	Base64,
    dateFormatter,
    getTotalMonth
}

function Base64() {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    }
    // private method for UTF-8 encoding
    this._utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }
    // private method for UTF-8 decoding
    this._utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                var c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
var b = new Base64();

function dateFormatter(str) { //默认返回yyyy-MM-dd HH-mm-ss
	var hasTime = arguments[1] != false ? true : false; //可传第二个参数false，返回yyyy-MM-dd
	var hasType = arguments[2]; //可传第三个参数，true 返回yyyy年MM月dd日
	var d = new Date(str);
	var year = d.getFullYear();
	var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
	var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
	var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
	var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
	var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
	if(hasTime) {
        if(hasType){
            return `${month}月${day}日 ${hour}时${minute}分${second}秒`; 
        }

        return [year, month, day].join('-') + " " + [hour, minute, second].join(':');
   
		
	} else {
        if(hasType){
            return `${month}月${day}日`; 
        }
		return [year, month, day].join('-');
	}
}

function getTotalMonth(date,hasTime=false){   //默认返回 [yyyy-MM-01,yyyy-MM-dd]   整月时间
    let newDate = new Date(date);
    let year= newDate.getFullYear();
    let month = newDate.getMonth()+1 < 10 ? '0' + (newDate.getMonth()+1) : newDate.getMonth()+1;
    var hour = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
	var minute = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
	var second = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
    let timestamp = new Date(`${year}/${newDate.getMonth()+2}/01`).getTime()-24*60*60*1000;
    
    if(hasTime){
        return [ `${year}-${month}-01 ${hour}:${minute}:${second}`, dateFormatter(timestamp,true)];
    }else{
        return [ `${year}-${month}-01`, dateFormatter(timestamp,false)];
    }
    
}
