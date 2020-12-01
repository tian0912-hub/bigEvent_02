$(function() {
    var form = layui.form
    var layer = layui.layer
  
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })
// 获取用户基本信息
function getUser(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        success:function(res){

            if(res.status !== 0) return layer.msg(res.message);
            // console.log(res);
            var form = layui.form;
            form.val('form-user_info',res.data)
        }
    })
};
getUser();
//实现重置
$('#reset').on('click',function(e){
    //阻止默认重置行为，因为会清空所有表单
    e.preventDefault();
    getUser();
});
//实现提交
$('.layui-form').on('submit',function(e){
    //阻止默认提交行为
    e.preventDefault();
    //发送提交请求
    $.ajax({
        method:'post',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0) return layer.msg('修改用户信息失败！');
            layer.msg(res.message);
            //访问父页面中的方法
            window.parent.getUserInfo();
        }
    })
})
})