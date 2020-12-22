
class Swiper {
    constructor(container, config) {
        //自定义配置
        this.config = config;
        //初始配置
        this.init(container);
        //初始化底部按钮颜色，（并让第一个按钮显示）
        this.setColor(this.dataConfig.index);
        //监听事件
        this.eventLister();
        //初始化定时器名称
        this.timer = "";
        //初始化定时器
        this.setTimer();
    }

    init(container) {
        //获取自定义接口配置
        const { navigation, bottom, image } = this.config;

        const oBtnList = document.querySelector(".swiper-bottom");
        const wrapper = document.querySelector('.swiper-wrapper');
        const aImg = Array.from(wrapper.children);
        const aImgLength = aImg.length;

        //动态创建底部导航按钮 
        for (let i = 0; i < aImgLength; i++) {
            const a = document.createElement('a');
            oBtnList.appendChild(a);
        }

        //图片主配置
        const imgConfig = {
            cssClass: [],//图片样式
            swiper: document.querySelector(container), //主体dom
            wrapper: wrapper,
            aImg: aImg, //图片集合
            aImgLength: aImgLength  //图片集合长度
        };

        imgConfig.parentWidth = imgConfig.swiper.parentNode.offsetWidth; //获取父级元素宽度
        imgConfig.parentHeight = imgConfig.swiper.parentNode.offsetHeight; //获取父级元素高度
        imgConfig.swiperLiHeight = imgConfig.parentHeight * 0.8;//主图片高占比
        imgConfig.swiperLiWidth = imgConfig.parentWidth * 0.4;//主图片宽占比
        imgConfig.swiperSpaceWidth = (imgConfig.parentWidth - imgConfig.swiperLiWidth) * 0.5;//间隔比
        imgConfig.swiperSpaceHeight = (imgConfig.parentHeight - imgConfig.swiperLiHeight) * 0.5;//间隔比

        // 初始化底部配置（导航按钮）
        const bottomConfig = {
            oBtnList: oBtnList,  //底部swiper-bottom标签
            aBtn: Array.from(oBtnList.children),  //底部按钮集合
            color: "#0085FF"    //底部颜色
        };

        //配置相关数据
        const dataConfig = {
            index: 0   //初始值
        }

        //初始化左右按钮配置
        let prevEl = '', nextEl = '';

        if ('prevEl' in this.config || (navigation && 'prevEl' in this.config.navigation)) {
            prevEl = this.config.prevEl || this.config.navigation.prevEl;
        }
        if ('nextEl' in this.config || (navigation && 'nextEl' in this.config.navigation)) {
            nextEl = this.config.nextEl || this.config.navigation.nextEl;
        }

        const sidesConfig = {
            nextEl: document.querySelector(nextEl),
            prevEl: document.querySelector(prevEl)
        }

        //挂载
        this.imgConfig = imgConfig;
        this.bottomConfig = bottomConfig;
        this.dataConfig = dataConfig;
        this.sidesConfig = sidesConfig;

        //自定义左右导航按钮配置
        this.setNavigation(navigation);

        //自定义底部样式属性
        this.setBottom(bottom);

        //自定义图片样式属性
        this.setImg(image);
    }

    //初始化数组
    setImg(image) {
        let imgOpacity = 0.1; //默认透明度
        //image配置
        if (image) {
            let shrinkSize = 0.3, growSize = 1.3;//默认的缩小比例和放大比例
            const { location, type, opacity, size } = image;
            growSize = size || growSize;
            shrinkSize = size || shrinkSize;
            //图片位置配置
            if (location) {
                switch (location) {
                    case 'center':
                        this.imgConfig.swiperSpaceHeight = (this.imgConfig.parentHeight - this.imgConfig.swiperLiHeight) * 0.5;//间隔比
                        break;
                    case 'top':
                        this.imgConfig.swiperSpaceHeight = (this.imgConfig.parentHeight - this.imgConfig.swiperLiHeight);//间隔比
                        break;
                    case 'super-top':
                        this.imgConfig.swiperSpaceHeight = (this.imgConfig.parentHeight - this.imgConfig.swiperLiHeight) * growSize;//间隔比
                        break;
                    case 'bottom':
                        this.imgConfig.swiperSpaceHeight = 0//间隔比
                        break;
                    case 'super-bottom':
                        this.imgConfig.swiperSpaceHeight = (this.imgConfig.parentHeight - this.imgConfig.swiperLiHeight) * shrinkSize * -1;//间隔比
                        break;
                    default:
                        this.imgConfig.swiperSpaceHeight = (this.imgConfig.parentHeight - this.imgConfig.swiperLiHeight) * 0.5;//间隔比
                        break;
                }
            }
            //图片形状配置
            if (type) {
                switch (type) {
                    case 'square':
                        this.creatCSS('.swiper-wrapper>img', {
                            'border-radius': '0'
                        })
                        break;
                    case 'oval':
                        this.creatCSS('.swiper-wrapper>img', {
                            'border-radius': '50%',
                        })
                        break;
                    default:
                        this.creatCSS('.swiper-wrapper>img', {
                            'border-radius': '0'
                        });
                        break;
                }
            }

            //透明度配置
            if (opacity) {
                imgOpacity = (1 - opacity) * 0.5;
            }
        }

        const { parentHeight, swiperSpaceWidth, swiperSpaceHeight, swiperLiHeight, aImgLength, aImg, cssClass }
            = this.imgConfig;
        aImg.forEach((item, index) => {
            const max = Math.floor(aImgLength / 2);
            //动态创建类名
            const listName = '.swiper-list' + (index + 1);
            const heightRatio = swiperLiHeight / parentHeight; //高度比例

            if (index < max) {

                this.creatCSS(listName, {
                    transform: `translate(${swiperSpaceWidth / max * index}px,
                        ${-(swiperSpaceHeight * (max - index))}px) 
                    scale(0.8,${heightRatio - (1 - heightRatio) * (max - index - 1)})`,
                    opacity: (1 - imgOpacity) - imgOpacity * (max - index),

                    "z-index": index + 1,
                    "transform-origin": "0% 100%"
                });

            }
            if (index == max) {
                const maxOpacity = imgOpacity < 0.1 ? 1 : 0.96 - imgOpacity * 0.1
                this.creatCSS(listName, {
                    transform: `translateX(${swiperSpaceWidth / max * index}px)`,
                    "z-index": max + 1,
                    opacity: maxOpacity,
                    "transform-origin": "50% 100%"
                });
            }

            if (index > max) {
                // ${heightRatio - (1 - heightRatio) * (max - index - 1)}
                this.creatCSS(listName, {
                    transform: `translate(${swiperSpaceWidth / max * index}px,
                   ${-(swiperSpaceHeight * (index - max))}px)
                     scale(0.81,${heightRatio - (1 - heightRatio) * (index - max - 1)})`,

                    opacity: (1 - imgOpacity) - (index - max) * imgOpacity,
                    "z-index": max + 1 - Math.abs(max - index),
                    "transform-origin": "100% 100%"
                });
            }

            //css类class存入样式style
            cssClass.push(listName.slice(1));
            item.classList.add(listName.slice(1));
            item.dataset.index = index; //设标签自定义data
        });
    }

    //自定义左右导航按钮配置
    setNavigation(navigation) {
        if (navigation) {
            const { color, icon } = this.config.navigation;

            if (color) {
                //左右导航颜色
                this.creatCSS('.swiper-container i', {
                    color: color
                });
            }

            if (icon && this.sidesConfig) {
                //设置左按钮样式
                const newLeftsCss = Array.from(this.sidesConfig.prevEl.classList).filter(item => item.replace(/^icon-[\s\S]*/, '')).join(' ');
                this.sidesConfig.prevEl.setAttribute('class', newLeftsCss + ` icon-zuo${icon}`);
                //设置右按钮样式
                const newRightCss = Array.from(this.sidesConfig.nextEl.classList).filter(item => item.replace(/^icon-[\s\S]*/, '')).join(' ');
                this.sidesConfig.nextEl.setAttribute('class', newRightCss + ` icon-you${icon}`);
            }
        }

    }

    //自定义底部样式属性
    setBottom(data) {
        this.bottomConfig.aBtn.forEach((item, index) => {
            item.dataset.index = index;
        });

        if (data) {
            let cssConfig = {};
            const { type, color, noSpace, space, width, height, fontColor } = data;
            switch (type) {
                case 'circle':
                    cssConfig.height = height || '10px';
                    cssConfig.width = width || '10px';
                    cssConfig["border-radius"] = '50%';
                    break;
                case 'square':
                    cssConfig.height = height || '10px';
                    cssConfig.width = width || '10px';
                    break;
                case 'number':
                    cssConfig.height = height || '14px';
                    cssConfig.width = width || '30px';
                    cssConfig["border-radius"] = '8%';
                    cssConfig.color = fontColor || '#333'
                    this.bottomConfig.aBtn.map((item, index) => {
                        item.innerHTML = index + 1;
                    })
                    cssConfig['line-height'] = height || '14px';
                    break;
                default:
                    cssConfig.height = height || '3px';
                    cssConfig.width = width || '35px';
                    break;
            }
            cssConfig['margin-left'] = noSpace ? 0 : space || '8px';
            cssConfig['background-color'] = color ? color : "";
            this.bottomConfig.color = color ? color : this.bottomConfig.color;
            this.creatCSS(`.swiper-bottom > a`, cssConfig)
        }

    }

    //设置底部按钮颜色
    setColor(ind) {
        this.bottomConfig.aBtn.forEach((item) => {
            item.style.backgroundColor = "#ccc";
        });
        this.bottomConfig.aBtn[ind].style.backgroundColor = this.bottomConfig.color;
    }

    //上一页功能            
    prePic() {
        //将数组第一个移至最后一个
        this.imgConfig.cssClass.push(this.imgConfig.cssClass.shift());
        //重新设置属性
        this.imgConfig.aImg.forEach((item, index) => {
            item.setAttribute('class', this.imgConfig.cssClass[index]);
        });
        //重新设置底部颜色
        this.setColor(this.dataConfig.index = this.dataConfig.index < 1
            ? this.dataConfig.index = this.imgConfig.aImgLength - 1 : --this.dataConfig.index);
    }

    //下一页功能
    nextPic() {
        //将数组最后一个移至第一个
        this.imgConfig.cssClass.unshift(this.imgConfig.cssClass.pop());
        //重新设置属性
        this.imgConfig.aImg.forEach((item, index) => {
            item.setAttribute('class', this.imgConfig.cssClass[index]);
        });
        //重新设置底部颜色
        this.setColor(this.dataConfig.index = this.dataConfig.index > (this.imgConfig.aImgLength - 2)
            ? this.dataConfig.index = 0 : ++this.dataConfig.index);
    }

    //设置轮播图定时器
    setTimer() {
        let { swiperTime } = this.config;
        //false直接退出，不设置定时器
        if(swiperTime === false){
            return;
        }

        swiperTime = swiperTime === true ? 3000 : (Number(swiperTime) ? swiperTime : 3000);
        this.timer = setInterval(this.nextPic.bind(this), swiperTime);
    }

    //监听事件
    eventLister() {

        //右按钮下一页
        if (this.sidesConfig.nextEl) {
            this.sidesConfig.nextEl.addEventListener("click", () => {
                this.nextPic();
            })
        }

        //左按钮上一页
        if (this.sidesConfig.prevEl) {
            this.sidesConfig.prevEl.addEventListener("click", () => {
                this.prePic();
            })
        }

        //点击图片切换功能
        this.imgConfig.wrapper.addEventListener("click", (e) => {
            const imgIndex = e.target.dataset.index;
            const mid = Math.floor(this.imgConfig.aImgLength / 2);
            if (imgIndex) {
                let offset = imgIndex - this.dataConfig.index;
                if (offset - mid < 0) {
                    for (let i = 0; i < mid - offset; i++) {
                        this.prePic();
                    }
                } else {
                    for (let i = 0; i < offset - mid; i++) {
                        this.nextPic();
                    }
                }
            }
        })

        //鼠标移入图片清除定时器
        this.imgConfig.wrapper.addEventListener("mouseover", () => {
            clearInterval(this.timer);
        })

        //鼠标移出图片清除旧定时器并重新定时
        this.imgConfig.wrapper.addEventListener("mouseout", () => {
            clearInterval(this.timer);
            this.setTimer();
        })

        //底部按钮点击
        this.bottomConfig.oBtnList.addEventListener("click", (e) => {
            const btnIndex = e.target.dataset.index;

            if (btnIndex) {
                const offset = btnIndex - this.dataConfig.index;
                if (offset > 0) {
                    for (let i = 0; i < offset; i++) {
                        this.nextPic();
                    }
                } else {
                    for (let i = 0; i < Math.abs(offset); i++) {
                        this.prePic();
                    }
                }
            }
        })
    }

    //创建css样式类  (name为标签class类或者id选择,config为css样式)
    creatCSS(name, config) {
        //临时数组
        let arr = [];
        //传进的对象转换为字符串
        for (const [key, val] of Object.entries(config)) {
            arr.push(`${key}:${val}`);
        }
        const _config = `{${arr.join(';')}}`;
        const cssList = Array.from(document.styleSheets);

        let styleList = cssList.filter((item) => {
            return item.ownerNode.tagName == 'STYLE' && item.disabled == false;
        }); //过滤link，不考虑它，只考虑style

        const listlength = styleList.length;

        //如果styleList没有style样式，则手动创建一个
        styleList = listlength == 0 ? document.createElement('style') : styleList[listlength - 1];

        //往最后一位插入
        styleList.insertRule(name + _config, styleList.rules.length);
    }
}
