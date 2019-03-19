<template>
    <div>
        <h3>Hello!</h3>
        <div class="x-purple">div-1</div>
        <div class="x-blue">div-2</div>
        <m-button type="primary" plain>
            less button
        </m-button>
    </div>
</template>
<script>
    export default {
        name: "hello",
        data () {
            return {

            }
        }
    }
</script>
<style lang="less">
    .x {
        .m(red)                                    {color: red}
        .m(blue)                                   {color: blue}
        .m(purple)                                 {color: purple}
        .m(@x) when (iscolor(@x)) and (default())  {default-color: @x}
        .m('foo')                                  {case-1: I am 'foo'}
        .m('bar')                                  {case-2: I am 'bar'}
        .m(@x) when (isstring(@x)) and (default()) {default-string: and I am the default}

        &-blue  {.m(blue)}
        &-green {.m(green)}
        &-purple {.m(purple)}
        &-red   {.m(red)}
        &-foo   {.m('foo')}
        &-baz   {.m('baz')}
    }
</style>