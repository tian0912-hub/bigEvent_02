$.ajaxPrefilter(function(options){
    // console.log(options);
    //将请求根路径粘贴在每次请求的URL之前
    options.url ='http://ajax.frontend.itheima.net'+options.url;
    //每次请求的时候都提交header文件
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
        Authorization:localStorage.getItem('token') || ''
    }
    }
})