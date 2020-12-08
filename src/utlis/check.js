// 验证是否是手机号
function checkPhone(str){
    let reg = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
    return reg.test(str);
};
// 验证密码是否含有数字和字母，且长度要在8-16位之间
function checkPassword(str){
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    return reg.test(str);
}
export default {
    checkPhone,
    checkPassword,
}