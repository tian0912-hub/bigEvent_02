$(function(){
    // 点击去注册账号链接登录盒子隐藏，注册盒子显示
    $("#toReg").on('click',function(){
        $("#loginBox").hide();
        $("#regBox").show();
    });
    $("#toLogin").on('click',function(){
        $("#loginBox").show();
        $("#regBox").hide();
    });

     // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        var pwd = $('#regBox [name=password]').val()
        if (pwd !== value) {
            return '两次密码不一致！'
        }
        }
    });
    //   事件提交
    // 注册事件
    // 监听注册表单的提交事件
    $("#reg_form").on('submit',function(e){
        // 阻止默认的提交行为
        e.preventDefault();
        var data = {
            username:$('#reg_form [name=username]').val(),
            password:$('#reg_form [name=password]').val()
        };
        $.post('http://ajax.frontend.itheima.net/api/reguser',data,function(res){
            if(res.status !== 0) return layer.msg(res.message);
            layer.msg("注册成功，请登录");
            
            //模拟点击去登录链接的操作，实现注册成功后自动跳转到登录页面的操作
            $("#toLogin").click();
        })

    });
    //登录事件
    //监听登录表单的提交事件
    $("#login_form").on('submit',function(e){
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url:"http://ajax.frontend.itheima.net/api/login",
            method:"post",
            data:{
                username:$('#login_form [name=username]').val(),
                password:$('#login_form [name=password]').val()
            },
            success:function(res){
                if(res.status !== 0) return layer.msg("登录失败");
                layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'

            }
        })
    })
})