<template>
    <div class="movie-detail" :style="{minHeight:$store.state.screenHeight+'px'}">

        <!-- 返回箭头 -->
        <div class="back-title" @touchend="$store.commit('changePageShow',['movieDetailShow',false]);moviePlay=false"
            style="padding:15px;display: flex;">
            <van-icon name="arrow-left" size="20px" color="#fff"></van-icon>
            <h3>电影</h3>
        </div>

        <!-- 内容加载 -->
        <Loading :show="!movieData&&!notFound"></Loading>
        <div v-if="movieData" class="movie-content">
            <div class="movie-card">
                <div class="img">
                    <img v-if="movieData" :src="dealImg(movieData.images.small)" alt=""
                        onerror="this.src='/img/movie-default.jpg'">
                </div>
                <div class="content">
                    <h2 class="title">{{movieData.title}}</h2>
                    <h3 class="original_title">{{movieData.original_title+'('+movieData.year+')'}}</h3>
                    <p class="infor">
                        {{movieData.countries[0]}} |
                        <span v-for="(item,index) in movieData.genres" :key="index">{{item}} </span>
                        | {{movieData.pubdates[0]}} |
                        片长{{movieData.durations[0]}}
                    </p>
                    <div v-if="!movieData.saw" class="btns">
                        <button :class="movieData.like?'like':''" @touchend="$set(movieData,'like',true)">
                            {{movieData.like?'已想看':'想看'}}
                        </button>
                        <button @touchend="$set(movieData,'saw',true)">
                            看过
                        </button>
                    </div>
                    <p class="saw" v-if="movieData.saw">
                        已看过
                        <span>{{new Date().toLocaleDateString()}}</span>
                    </p>
                </div>
            </div>
            <div class="rating-card">
                <h3 class="rating-title"></h3>
                <div class="rating-content">
                    <div class="rating-start"></div>
                    <div class="rating-detail"></div>
                </div>

            </div>
            <div class="summary-card">
                <h3 class="summary-title">剧情简介</h3>
                <div class="summary-content">{{movieData.summary}}</div>
            </div>
            <div class="actors">
                <ul>
                    <li></li>
                </ul>
            </div>
            <div class="trailer">
                <h3 class="trailer-title">预告片/剧照</h3>

                <TouchWipe height="220" :leftMax="-3215+$store.state.screenWidth ">
                    <ul :style="{width:'3215px', display: 'flex'}">
                        <li class="video" @touchstart="(e)=>dealTouchStart(e,$el,()=>moviePlay=!moviePlay)">
                            <span
                                style="position: absolute;z-index: 2;background: orange;border-radius: 3px;font-size: 8px;left: 5px;top: 5px; padding: 2px 5px;">{{movieData.trailers[0].title}}</span>
                                <!-- <iframe allowFullScreen="allowfullscreen" frameBorder="0" height="500" scrolling="no" src="https://player.bilibili.com/player.html?bvid=BV12K411H7kE" width="620"></iframe> -->
                            <video ref="video" v-if="movieData" src="/video/default.mp4"
                                :poster="dealImg(movieData.trailers[0].medium)" width="350px" height="200px"
                                style="position: absolute; left: -25px;"></video>
                            <div>
                                <van-icon v-show="!moviePlay" class="play-icon" size="50px"
                                    :name="moviePlay?'pause-circle-o':'play-circle-o'" />
                                <van-icon v-show="moviePlay" class="play-icon" size="50px" name="pause-circle-o"
                                    color="rgba(250,250,250,0.3)" />
                            </div>


                        </li>
                        <!-- <ul style="display: flex;"> -->
                        <li v-for="item in movieData.photos" :key="item.id" style="width: 310px;
                        margin-right: 10px;
                        height: 200px;
                        border-radius: 6px;
                        z-index: 0;
                        overflow: hidden;">
                            <div class="img" :style="{background:'url('+dealImg(item.cover)+') no-repeat center',
                    width:'100%',height:'100%',backgroundSize:'cover'}"></div>
                            <!-- <img style="width: 100%;" :src="dealImg(item.cover)" alt=""> -->
                        </li>
                    </ul>
                </TouchWipe>


            </div>

            <!-- 短评 -->
            <div class="interest">
                <ul>
                    <li v-for="(item,index) in movieData.popular_comments" :key="index">
                        <div class="author">
                            <!-- 头像 -->
                            <div class=" head-icon"
                                :style="{background:'url('+dealImg(item.author.avatar)+') no-repeat'}"></div>
                            <div class="right">
                                <span class="author-name">{{item.author.name}}</span>
                                <van-rate v-model="item.rating.value" :size="12" />
                            </div>

                        </div>
                        <p class="author-content">{{item.content}}</p>
                    </li>
                </ul>
            </div>
        </div>


        <BScroll>
            <!-- 影评 -->
            <article class="recomond-card">
                <ul>
                    <li v-for="item in movieData.popular_reviews" :key='item.id'>
                        {{item.title}}
                    </li>
                </ul>
            </article>
        </BScroll>


    </div>
</template>
<script>
    import Loading from '@/components/Loading'
    import TouchWipe from '@/components/TouchWipe'
    import BScroll from '@/components/BScroll'

    export default {
        components: { Loading, TouchWipe, BScroll },
        data() {
            return {
                // 电影信息
                movieData: {},
                // 电影主创
                credits: {},
                // 评论
                interests: {},
                notFound: false,
                moviePlay: false,
            }
        },
        computed: {
            movieId() {
                return this.$store.state.movieId
            },
        },
        // 监听￥store中的数据 有改变则先清空再更新
        watch: {
            movieId() {
                this.movieData = '';
                this.getData()

            },
            moviePlay() {
                console.log(this.moviePlay)
                if (this.moviePlay) {
                    this.$refs.video.play();
                } else {
                    this.$refs.video.pause();
                }
            }
        },
        created() {
            this.getData()

        },

        methods: {

            getData() {
                fetch('/v2/movie/subject/' + this.$store.state.movieId + '?apikey=0df993c66c0c636e29ecbb5344252a4a')
                    .then(res => res.json())
                    .then(res => {
                        console.log('movie data', res)
                        this.movieData = res;
                        if (res.msg === 'movie_not_found') {
                            this.notFound = true
                        }
                    })
                // 评论
                fetch('/api/v2/movie/33420285/interests?count=4&order_by=hot&start=0&ck=&for_mobile=1')
                    .then(res => res.json())
                    .then(res => {
                        console.log('movie interests', res)
                        this.interests = res;
                    })
                // 电影主创
                fetch('/api/v2/movie/33420285/credits')
                    .then(res => res.json())
                    .then(res => {
                        console.log('movie credits', res)
                        this.interests = res;
                    })
            },
        },

    }
</script>
<style scoped lang="scss">
    .movie-detail {
        padding-bottom: 100px;
        background: #959185;
        color: #fff;

        .movie-content {
            padding: 0 15px;
        }

        .back-title {
            h3 {
                flex: 1;
                text-align: center;
            }
        }

        .movie-content {
            h3 {
                padding: 10px 0;
            }

            .movie-card {
                display: flex;

                .img {
                    width: 110px;
                    height: 130px;
                    margin-right: 16px;
                    border-radius: 4px;
                    overflow: hidden;
                    box-shadow: 0 0 10px 0px #555;

                    img {
                        width: 110px;
                        height: 130px;
                    }
                }

                .original_title {
                    padding: 10px 0;
                }

                .infor {
                    font-size: 12px;
                    color: #bbb;
                    line-height: 18px;
                }

                .btns {
                    padding: 10px 0;

                    button {
                        width: 100px;
                        height: 38px;
                        border: none;
                        border-radius: 5px;
                        background: #fff;
                        color: #000;

                        &:first-of-type {
                            margin-right: 20px;
                        }

                        &.like {
                            background: rgba(185, 184, 184, 0.644);
                            color: #fff;

                        }
                    }
                }

                .saw {
                    margin: 10px 0;
                    background: rgba(185, 184, 184, 0.644);
                    color: #fff;
                    height: 38px;
                    line-height: 38px;
                    border-radius: 5px;
                    text-indent: 1em;

                    /* 日期 */
                    span {
                        font-size: 12px;
                        color: #ddd;
                        float: right;
                        margin-right: 1em;
                    }

                }
            }

            .rating-card {}

            /* 剧情简介 */
            .summary-content,
            .author-content {
                font-size: 14px;
                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-line-clamp: 4;
                max-height: 115px;
                display: -webkit-box;
                word-break: break-all;
                -webkit-box-orient: vertical;
                /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                line-height: 2em;
            }

            .video {
                width: 310px;
                margin-right: 10px;
                height: 200px;
                border-radius: 6px;
                z-index: 0;
                overflow: hidden;
                position: relative;

                .play-icon {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -25px;
                    margin-top: -25px;
                }
            }
        }

        /* 短评 */
        .interest {
            background: #656259;
            border-radius: 5px;
            padding: 15px;

            .author {
                display: flex;
                align-items: center;

                .head-icon {
                    width: 45px;
                    height: 45px;
                    margin: 12px;
                    margin-left: 0;
                    border-radius: 50%;
                }

                .author-name {
                    margin-bottom: 7px;
                }
            }

        }

        .recomond-card {
            background: #fff;
            position: fixed;
            bottom: 100px;
            color: #000;
        }

    }
</style>