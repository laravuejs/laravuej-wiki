import { usePage } from '@inertiajs/vue3';

export function validatePermission(permission){
    const user = usePage().props.session.user;
    let validate = false;

    if(!user){
        return validate;
    }

    if(user.roles.length > 0){
        let roles = user.roles;
        roles.forEach((role) => {
            let permissions = role.permissions;
            permissions.forEach((per) => {
                //validate type permission if is string or array
                if(typeof permission == 'string'){
                    if(per.name == permission){
                        validate = true;
                    }
                }else{
                    if(permission.includes(per.name)){
                        validate = true;
                    }
                }
            });
        });
    }else if(user.permissions.length > 0){
        user.permissions.forEach((per) => {
            //validate type permission if is string or array
            if(typeof permission == 'string'){
                if(per.name == permission){
                    validate = true;
                }
            }else{
                if(permission.includes(per.name)){
                    validate = true;
                }
            }
        });
    }

    return validate;
}
