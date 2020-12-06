$(function () {
    var layer = layui.layer;
    var form = layui.form;

    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 10, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
      }

    getArtList();
    // 获取文章列表
    function getArtList() {
        $.ajax({
            method: 'get',
            // dataType:'jsonp',
            url: '/my/article/list',
            data:q,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                layer.msg('获取文章列表成！');
                renderPage(res);
                
                

            }
        })
    }

    
        //定义时间过滤器
        template.defaults.imports.dataFormat = function (data){
            const dt = new Date(data);
    
            var y = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
    
            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getSeconds())
    
            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        }
        function padZero(n) {
            return n > 9 ? n : '0' + n
          }
        //定义渲染页面的方法
        function renderPage(jsp){
            var htmlstr = template('artList',jsp);
            $('tbody').html(htmlstr);
        }

        //渲染状态列表
        getState();
        function getState(){
            $.ajax({
                method:'get',
                url:'/my/article/cates',
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('获取文章分类列表失败！')
                    }
                    var htmlstr = template('art_state',res);
            $('[name=cate_id]').html(htmlstr);
            form.render();
                }
            })
            
        }

        //为筛选按钮绑定事件
        $('.layui-form').on('submit',function(e){
            e.preventDefault();
            var cate_id = $('[name=cate_id]').val();
            var state = $('[name=state]').val();
            console.log(cate_id);
            console.log(state);
            q.cate_id = cate_id;
            q.state = state;
    getArtList();

        })
        //实现分页功能


    
})