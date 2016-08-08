
$(document).ready(function(){
    $('#message-button').click(function (){
        var data = {
            'name': $('#contact-name').val(),                                               //点击按钮之后 获取四个input的value 并赋值给四个变量
            'email': $('#contact-email').val(),
            'phone': $('#contact-phone').val(),
            'message': $('#contact-message').val(),
        };
        (function RegExp() {
            var nameTest = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){1,40}$/;                           //正则表达式  名字由中文 大小写字母和数字组成 1-40字
            var phoneTest = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;         // 手机号 各种格式要求
            var emailTest = /^([\w\.\-]+)@([\w\-]+)\.([a-zA-z]{2,4}){1,200}$/;                  //email格式要求
            var messageTest = /^.{1,1000}$/;                                                    //1-1000字留言

            if(nameTest.test(data.name) == 0){
               //报错 显示 请输出正确的名字
            }else if(phoneTest.test(data.phone) == 0){
               //报错 显示 请填写正确的手机号
            }else if(emailTest.test(data.email) == 0){
                //报错 显示 请填写正确的邮箱地址
            }else if(messageTest.test(data.message) == 0){
                //报错 显示 请勿超过1000字
            }else{
                $.ajax({
                    url: 'http://120.55.90.60/message/store',
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    data: data,
                    type: 'POST',
                    success: function (data) {
                        if (data.errcode == 0) {
                           //留言提交成功的情况
                            $('#contact-name').val('');         //提交成功以后 清空之前填写的四个input
                            $('#contact-phone').val('');
                            $('#contact-email').val('');
                            $('#contact-message').val('');
                        } else {
                            //留言提交失败的情况 一般不会有
                        }
                    },
                    error: function () {
                        //数据库连接失败的情况
                    },
                    dataType: 'json'
                });
            }
        })();
    });
});