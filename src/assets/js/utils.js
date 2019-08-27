const utils = {
    
    getParentByClassName: (ele, className) => {
        if(ele.className === className) {
            return ele;
        }
        else {
            return getParentByClassName(ele.parentElement, className);
        }
    },

    /**
     * 递归重组数据
     */ 
    recursive: (list, selectId, store) => {
        const ary = [];
        let sid = [];

        for(let i = 0 ; i < list.length; i++) {

            // 取到被选中的菜单id
            if(list[i].slidebarId == selectId) {
                sid.push(list[i].slidebarId);
            }

            // 如果有下级菜单
            if(list[i].children && list[i].children.length) {
                const opt = utils.recursive(list[i].children, selectId, store);

                // 如果下级菜单被选中 拼接当前这级菜单id
                if(opt.sid && opt.sid.length) {
                    sid = opt.sid.concat([list[i].slidebarId]);
                }

                list[i].children = opt.ary;
            }
            
            // 在vuex中默认每层菜单都是收起状态
            if(store) store.commit('menuStateChange', {id: list[i].slidebarId, status: false});

            ary.push({
                name:       list[i].slidebarName,
                id:         list[i].slidebarId,
                icon:       list[i].slidebarIcon,
                url:        list[i].slidebarUrl,
                children:   list[i].children
            });
        }

        // 返回 
        //【数组】ary 重组后的菜单
        //【数组】sid 被选中菜单id集合(从子到父)
        return {ary, sid};
    }

}

export default utils;