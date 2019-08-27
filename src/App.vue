<template>
<router-view/>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body{
  font-size: 14px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f5f5f5;

}
.clear-both{
  overflow: hidden;
  width: 100%;
  height: 0;
  clear: both;
}
.v-a-m {
  vertical-align: middle;
}
.pull-left{
  float: left;
}
.pull-right{
  float: right;
}
</style>
