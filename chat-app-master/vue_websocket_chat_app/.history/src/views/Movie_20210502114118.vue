<template>
    <div class="movie">
        <div class="movie-nav">
            <ul>
                <li v-for="(item,index) in this.movieNav" v-bind:key="index">
                    <img v-bind:src="item.icon" alt="">
                    <p>{{item.title}}</p>
                </li>
            </ul>
        </div>

        <!-- 豆瓣热门 -->
        <div class="hot-movie">
            <Title title="豆瓣热门" rightContent="全部 500" :arrow="true" >
            </Title>
            <TouchWipe height="200" :leftMax="movieListLeftMax">
                <ul class="movie-list">
                    <li class="movie-card" v-for="(item,index) in hotMovie" :key="item.id" :style="{left:index*106+'px'                       
                    }">
                        <MovieCard :data="item"></MovieCard>
                    </li>
                </ul>
            </TouchWipe>
        </div>

        <!-- 豆瓣榜单 -->
        <div class="movie-boards">
            <TouchWipe height="282" :leftMax="boardListLeftMax">
                <ul class="boards-list" :style="{width:$store.state.screenWidth*2+'px',maxWidth:'1100px'}">
                    <li class="boards-card"
                        :style="{backgroundImage:'url('+item.header_bg_image+'),url(/img/board-default.jpg)'}"
                        v-for="item in movieBoards.selected_collections" :key="item.id">
                        <div class="mask"
                            :style="{
                        backgroundImage: 'linear-gradient(to bottom,#'+item.background_color_scheme.secondary_color+',0%,#'+item.background_color_scheme.primary_color_light+',60%,#'+item.background_color_scheme.primary_color_dark+')'}">
                        </div>
                        <h2>{{item.name}}</h2>
                        <span>{{item.subtitle}}</span>
                        <ul class="movie-list">
                            <li class="movie-card" v-for="(childItem,childIndex) in item.items" :key="childItem.id">
                                <span>{{childIndex+1}}</span>
                                <MovieCard type="row" :data="childItem" :img="item.covers[childIndex]"></MovieCard>
                            </li>
                        </ul>
                    </li>
                    <li class="boards-more" :style="{left:2*260+'px'}"
                        @touchstart="(e)=>dealTouchStart(e,$el,showMore)">
                        <span>更多</span>
                        <span class="arrow"></span>
                    </li>
                </ul>
            </TouchWipe>

        </div>
        <!-- <div class="video" :style="{position: 'absolute'}">
            <video controls width="80%" height="400px"  src="https://vt1.doubanio.com/202005201222/3438ecb7be8d735433e53a59c3b81133/view/movie/M/302600682.mp4"></video>
        </div> -->



        <!-- 豆瓣电影|豆瓣片单 -->
        <van-popup v-model="moveMovieShow" position="right" :overlay="false">
            <MovieBoardPlay :playListData="playListData" :active="active" :clickBack="back"
                :clickPlayList="showPlayListItem"></MovieBoardPlay>
        </van-popup>

        <!-- 单个片单详情 -->
        <van-popup v-model="playListItemShow" position="right" :overlay="false">
            <MoviePlayDetail :playListItemData="playListItemData" :clickBack="back"></MoviePlayDetail>
        </van-popup>

        <!-- 单个电影详情 -->
        <van-popup v-model="$store.state.movieDetailShow" position="right" :overlay="false">
            <MovieDetail></MovieDetail>
        </van-popup>
    </div>
</template>

<script>
    import Title from '../../components/Title.vue';
    import TouchWipe from '../../components/TouchWipe.vue';
    import MovieCard from '../../components/MovieCard.vue';
    import MovieBoardPlay from './movie/MovieBoardPlay.vue';
    import MoviePlayDetail from './movie/MoviePlayDetail.vue';
    import MovieDetail from './movie/MovieDetail.vue';

    export default {
        components: { Title, MovieCard, TouchWipe, MovieBoardPlay, MoviePlayDetail, MovieDetail },
        // components: { Title },
      
        // 组件创建期
        created() {
            // 请求movie导航图片+文字部分
            fetch('/api/v2/movie/modules?for_mobile=1')
                //  fetch('/api/v2/tag/1/subject_collection_boards')
                .then(res => res.json())
                .then(res => {
                    // console.log(res)
                    this.movieNav = res.modules[0].data.subject_entraces;
                    this.movieBoards = res.modules[3].data;
                    // this.hotMovie=res.modules[2].data.subject_collection_boards[0].items
                    console.log(55555555, res.modules[2].data.subject_collection_boards[0].items)
                })


            // 请求movie导航图片+文字部分
            fetch('/api/v2/movie/33420285')
                //  fetch('/api/v2/tag/1/subject_collection_boards')
                .then(res => res.json())
                .then(res => {
                    console.log(66666666, res)
                })
            fetch('/j/search_subjects?type=movie&tag=热门&page_limit=10&page_start=0')
                .then(res => res.json())
                .then(res => {
                    this.hotMovie = res.subjects;
                    console.log(11111111111, res.subjects)
                })
            this.movieListLeftMax = -110 * 10 - 20 + this.$store.state.screenWidth;
            this.boardListLeftMax = this.$store.state.screenWidth > 550 ? (-1115 + this.$store.state.screenWidth) : (- 15 - this.$store.state.screenWidth);
            console.log('rrrrrrrrr', this)

            fetch('/api/v2/movie/suggestion?start=50&count=10&new_struct=1&with_review=1&for_mobile=1')
                .then(res => res.json())
                .then(res => {
                    console.log(444444444444443, res)
                })


        },

        data() {
            return {
                // data:{},
                movieNav: [],
                data: [],
                name: 'tt',
                hotMovie: [],
                movieBoards: [],
                movieListLeftMax: 0,
                boardListLeftMax: 0,
                moveMovieShow: false,
                playListItemShow: false,
                active: 1,
                actions: 1,
                playListData: {},
                playListItemData: {},
                showMoreTouchStart: ''
            }
        },
        
        watch: {
            playListData() {
                if (this.active === 1 && !this.playListData.data) {
                    this.getPlayListItem()
                }
            },
        },
        methods: {
            getPlayList() {
                fetch('/api/v2/skynet/playlists?from_rexxar=&start=0&count=20')
                    .then(res => res.json())
                    .then(res => {
                        this.playListData = res;
                        console.log(res)
                    })
            },
            showMore() {
              
                    this.moveMovieShow = true;
                    this.getPlayList()
                

            },
            showPlayListItem(id, img, bgImg, bg_color_light, bg_color_dark, count, title) {
                this.playListItemShow = true;
                this.playListItemData = { id, img, bgImg, bg_color_light, bg_color_dark, count, title }
                fetch('/api/v2/doulist/' + id + '/items')
                    .then(res => res.json())
                    .then(res => { this.$set(this.playListItemData, 'data', res.items) })

            },
            back(page) {
                this[page] = false;
            }
        },

    }
</script>

<style lang="scss" scoped>
    @import '../../base.scss';

    .movie {
       
        .movie-nav {
            width: 100%;
            font-size: 12px;

            ul {
                display: flex;
                justify-content: space-between;
                text-align: center;

                li {
                    width: 30%;

                    img {
                        width: 50%;
                        display: inline-block;
                        padding: 20px 0 5px;
                    }
                }
            }

        }

        .hot-movie {
            padding: 20px 0px 10px;

            ul.movie-list {
                display: flex;
                padding-top: 15px;
                padding-bottom: 15px;

                li.movie-card {
                    width: 100px;
                    height: 160px;
                    color: #333;
                    font-weight: bold;
                    margin-right: 10px;

                }
            }
        }

        .movie-boards {
            ul.boards-list {
                display: flex;
                padding-top: 15px;

                li.boards-card,
                li.boards-more {
                    width: 40%;
                    margin-right: 15px;
                    height: 220px;
                    border-radius: 6px;
                    z-index: 0;
                    overflow: hidden;
                }

                li.boards-more {
                    width: 20%;
                    background: rgb(243, 243, 243);
                    text-align: center;
                    line-height: 220px;
                    color: #333;

                    .arrow {
                        @include arrow(9px);
                        position: relative;
                        top: -1px;
                    }
                }

                li.boards-card {
                    background-size: 100% 100%;
                    color: #fff;
                    position: relative;

                    .mask {
                        z-index: -2;
                        width: 100%;
                        height: 100%;
                        opacity: 0.9;
                        position: absolute;
                        bottom: 0px;
                    }

                    h2 {
                        font-weight: 400;
                        padding: 15px 15px 10px;
                        font-size: 18px;
                        display: inline-block;
                    }

                    span {
                        font-size: 12px;
                        position: absolute;
                        right: 15px;
                        top: 21px;
                    }

                    ul.movie-list {
                        height: 200px;
                        padding: 0 15px;

                        li.movie-card {
                            width: 30px;
                            height: 50px;
                            padding: 3px 30px;
                            position: relative;

                            span {
                                position: absolute;
                                left: 5px;
                                top: 10px;
                                font-size: 14px;
                            }
                        }
                    }
                }

            }
        }





    }
</style>