$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新密码不能和旧密码一致';
            }
        },
        qpwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致';
            }
        }
    })
    // 重置操作
    // $('.layui-btn-primary').on('click',function(e){
    //    //阻止默认重置行为
    //     $('.layui-form')[0].reset();

    // })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新密码失败！');
                }
                layer.msg('更新密码成功！');

                $('.layui-form')[0].reset();

            }
        })
    })


})