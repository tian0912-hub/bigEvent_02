getUserInfo();

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
              }
            getImg(res.data)
        },
        //无论请求成功还是失败都会调用complete回调
        complete:function(res){
            // conso/le.log(res);
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！' ){
                localStorage.removeItem('token');
                location.href ='/login.html'
            }
        }
            
    })
}
//实现退出功能，退出跳转到登录界面，并且要删除本地缓存的请求头
$('#btnLogout').on('click',function(){
    layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
        //清空本地缓存
        localStorage.removeItem('token');
        //跳转到登录界面
        location.href='login.html'
        
        layer.close(index);
      });
    
})
//封装改变头像和名称的函数
function getImg(user){
    var name = user.nickname || user.username;
    //拼接欢迎字符串
    $('#huanying').html('欢迎&nbsp;&nbsp;'+name);

    //渲染头像
    if(user.user_pic !== null){
        $('.text-img').hide();
        $('.layui-nav-img').attr(
            'src',user.user_pic
        ).hide();
    }else {
        var first = name[0].toUpperCase();
        $('.text-img').text(first).show();
        $('.layui-nav-img').hide();
    }

}