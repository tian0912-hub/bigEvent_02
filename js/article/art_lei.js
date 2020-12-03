$(function () {
    var form = layui.form;
    var layer = layui.layer;
    getArtList();
    //获取文章列表方法
    function getArtList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (e) {
                if (e.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                var htmlstr = template('tpl_list', e);
                // console.log(htmlstr);
                $('tbody').html(htmlstr);
            }
        })
    };
    //添加类别按钮绑定点击事件
    var indexAdd = null;
    $('.layui-btn-sm').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $("#dialog_add").html()
        });
    });
    //通过代理方式为form添加提交事件
    $('body').on('submit', '#form-add', function (e) {
        //阻止默认的提交
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (e) {
                if (e.status !== 0) {
                    return layer.msg('新增文章分类失败！');
                }
                layer.msg('新增文章分类成功！');
                //重新渲染分类列表
                getArtList();
                layer.close(indexAdd);
            }
        })
    });
    //为编辑按钮绑定点击事件
    // 由于按钮是自动生成的，所以要通过事件委托绑定
    var indexEdit = null;
    $('.layui-table').on('click', '.btn-edit', function () {
        //通过为每个列表绑定的ID来确定点击的是哪一个列表的编辑按钮
        // console.log($(this).attr('data-id'));
        var ID = $(this).attr('data-id');
        //弹出层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $("#edit-lei").html()
        });
        //渲染弹出层中的内容
        //获取这个id的分类
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + ID,
            success: function (e) {
                //  if(e.status !== 0){
                //      return layer.msg('获取内容失败')
                //  }
                //通过form.val方法快速填充编辑表单的内容
                form.val('form-edit', e.data);

            }
        });
        //为修改表单绑定提交事件
        $('body').on('submit','#form-edit', function (e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('更新分类失败')
                    }
                    layer.msg('更新分类信息成功！');
                    //关闭弹出层
                    layer.close(indexEdit);
                    //重新获取分类列表
                    getArtList();


                }
            })
        })

    })
    //为删除按钮绑定点击事件
    $('.layui-table').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id');
        //弹出询问
        layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！');
                    //重新获取分类列表
                getArtList();

                }
            })
            
            layer.close(index);
          });
    })

})