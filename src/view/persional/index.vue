<template>
    <div class="">

        <h2>基本信息</h2>
 
        <form action="javascript:void(0)" class="form-horizontal col-md-4">

            <div class="form-group">
                <label for="" class="form-label">账号</label>
                <div class="form-content">
                    <Input type="text" placeholder="请输入昵称" disabled/>
                </div>
            </div>

            <div class="form-group">
                <label for="" class="form-label confirm">昵称</label>
                <div class="form-content">
                    <Input type="text" placeholder="请输入昵称"/>
                </div>
            </div>

            <div class="form-group">
                <label for="" class="form-label">年龄</label>
                <div class="form-content">
                    <Input type="text" placeholder="请输入年龄"/>
                </div>
            </div>

            <div class="form-group">
                <label for="" class="form-label">手机号</label>
                <div class="form-content">
                    <Input type="text" placeholder="请输入手机号"/>
                </div>
            </div>

            <div class="form-group">
                <label for="" class="form-label">邮箱</label>
                <div class="form-content">
                    <Input type="text" placeholder="请输入邮箱"/>
                </div>
            </div>

            <div class="form-group">
                <label for="" class="form-label">性别</label>
                <div class="form-content">
                    <RadioGroup>
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                    </RadioGroup>
                </div>
            </div>

            <div>
                <Button type="primary">更新基本信息</Button>
            </div>

        </form>

        <form action="javascript:void(0)" class="form-horizontal col-md-4" style="margin-left: 40px;">

            <div class="form-group">
                <label for="" class="form-label confirm">头像</label>
                <div class="form-content">
                     <Upload width="120" height="120" v-model="upload"></Upload>
                </div>
            </div>
           

        </form>

    </div>
</template>
<script>
    import Upload from '../../components/upload/index.vue'
    export default {
        data() {
            return {
                upload: ['https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar']
            }
        },
        
        components: { Upload }
    }
</script>
<style scoped>

</style>
