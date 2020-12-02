$(function () {
  var layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options);
  //上传图片
  // 添加一个文件上穿按钮，进行隐藏，当点击上传按钮时模拟点击选择文件
  $("#ava_file").hide();
  $("#upFile").on('click', function () {
    $("#ava_file").click();
  });
  //给文件选择框绑定change事件
  $("#ava_file").on('change', function (e) {
    var filelist = e.target.files;
    if (filelist.length === 0) {
      return layer.msg('请选择图片！');
    }
    //获取文件
    var file = filelist[0];
    //创建URL地址
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
    //为确定按钮绑定点击事件
    $('.layui-btn-danger').on('click', function () {
      var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

      //调用接口将得到的图片地址上传到服务器
      $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data: {
          avatar: dataURL
        },
        success: function (e) {
          if (e.status !== 0) {
            return layer.msg('更换头像失败！')
          }
          layer.msg('更换头像成功！')
          //调用个人信息方法，更新头像
          //此方法bug，当父页面的方法定义在$(function(){})时，由于方法是在一个局部作用域内，会出现getUserInfo() is not function错误
          window.parent.getUserInfo();

        }

      });
    });
  });

  //替换图片
})