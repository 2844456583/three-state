import router from './router';
import { getToken } from "./utlis/auth";
import user from './api/user';

router.beforeEach((to, from, next) => {
    // console.log(to, 999);
    if (to.meta.ischeck == true) {
        let token = getToken();
        // console.log(token, 789);
        if(token){
            user.checkToken(token)
            .then(res => {
                // console.log(res,111);
                if(res.data.code){
                    next();
                }else{
                    router.push("/login");
                }
            })
        }else{
            router.push("/login");
        }
    } else {
        //不需要守卫
        next();
    }
});