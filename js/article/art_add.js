$(function () {
    var layer = layui.layer;
    var form = layui.form;
    //初始化富文本编辑器
    initEditor();
    initCate()


    function initCate() {
        $.ajax({
          method: 'GET',
          url: '/my/article/cates',
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('初始化文章分类失败！')
            }
            // 调用模板引擎，渲染分类的下拉菜单
            var htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            // 一定要记得调用 form.render() 方法
            form.render()
          }
        })
      }


    // 1. 初始化图片裁剪器
    var $image = $('#image');

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    // 3. 初始化裁剪区域

    $image.cropper(options);

    $('#change-img').on('click', function () {
        $("#changeFile").click();
    })
    $("#changeFile").on('change', function (e) {
        if (e.target.files.length === 0) {
            return layer.msg('请选择图片！')
        }
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })


    // 文章的状态
    var art_state = '已发布';
    //当点击存为草稿按钮时将文章状态改为草稿
    $("#cao").on('click', function () {
        art_state = '草稿';
    })

    // 表单的提交事件
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { 
                      // 将 Canvas 画布上的内容，转化为文件对象
            fd.append('cover_img',blob);
                getAjaxPub(fd);
                    });

    });
   

//定义发布文章请求函数
function getAjaxPub(fd){
    $.ajax({
        method:'post',
        url:'/my/article/add',
        data:fd,
         // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
        success:function(res){
            if(res.status !== 0){
                return layer.msg('发布文章失败！')
            }
            layer.msg(res.message);
            location.href = '/article/art_list.html';
        }
    })
}
})