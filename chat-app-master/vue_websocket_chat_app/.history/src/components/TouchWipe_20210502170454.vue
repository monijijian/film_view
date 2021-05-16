<template>
    <!-- height 高度 必传 leftMax 最左边的坐标必传 -->
    <div class="touch-wipe" :style="{height:height+'px'}">
        <div class="container" :style="{left:left+'px'}" @touchend="touchEndEvent" @touchstart="touchStartEvent"
            @touchmove="touchMoveEvent">
            <slot></slot>

        </div>
    </div>

</template>
<script>
    export default {
        // 容器定位 容器宽度 容器高度
        props: ['height', 'leftMax'],
        data() {
            return {
                left: 0,
                touchStartX: 0,
                leftInit: 0
            }
        },

        methods: {
            touchEndEvent() {

           
                    // 延迟 有回弹
                    setTimeout(() => {

                        if (this.left <= this.leftMax) {
                            this.left = this.leftMax
                        }

                        if (this.left >= 0) {
                            this.left = 0
                        }

                    }, 200)







            },
            touchStartEvent(e) {
                this.touchStartX = e.changedTouches[0].clientX;
                this.touchStartY = e.changedTouches[0].clientY;
                this.leftInit = this.left;
            },
            touchMoveEvent(e) {
                if ((this.touchStartY - e.changedTouches[0].clientY > -50 && this.touchStartY - e.changedTouches[0].clientY < 50)) {
                let move = e.changedTouches[0].clientX - this.touchStartX;
                this.left = this.leftInit + move;
                console.log(9999999999)
                }
            },

        },
    }
</script>
<style scoped lang="scss">
    .touch-wipe {
        width: 100%;
        position: relative;
        overflow-x: hidden;

        .container {
            /* height: 100%; */
            position: absolute;
            transition: left 1s;
        }
    }
</style>