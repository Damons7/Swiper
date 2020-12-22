# 叠层轮播图swiper

#### **起步**

在html页面的head标签内引入css样式和js

```html
	<!-- swiper样式 -->
	<link rel="stylesheet" href="./css/swiper.css">
  	<!-- 图标样式 -->
	<link rel="stylesheet" href="./css/icon.css">
  	<!-- swiperJs -->
  	<script src="js/swiper.js"></script>
```



#### **html页面**

```html
   <!-- 用户自定义的div，需要有宽高 -->
<div class="yourDiv">
    <!-- swiper主体 -->
        <div class="swiper-container">
            <!-- swiper放置图片部分 -->
            <div class="swiper-wrapper">
                <img src="image/01.jpg">
                <img src="image/02.jpg">
                <img src="image/03.jpg">
                <img src="image/04.jpg">
                <img src="image/05.jpg">
                <!-- ...... -->
            </div>
            <!-- 假如底部需要导航按钮，则在类swiper-wraer后面添加类swiper-bottom -->
            <div class="swiper-bottom"></div>

            <!-- 假如底部需要添加左右按钮 则在此添加i标签，类名如下-->
            <i class="swiper-button-prev iconfont icon-zuo1"></i>
            <i class="swiper-button-next iconfont icon-you1"></i>
        </div>
    </div>
```

**说明**

- **class="yourDiv"**：用户自定义的div，需要有宽高。如：

  ```css
  .yourDiv {
      width: 1200px;
  	height: 365px;
      margin: 200px auto 0;
  }
  ```

  

- **class="yourDiv"**：swiper主体。

- **class="swiper-wrapper"**:swiper放置图片部分。子标签添加img标签即可。

- **class="swiper-bottom"**：可选。假如底部需要导航按钮，则在类swiper-wraer后面添加类swiper-bottom 。

- **class="swiper-button-prev" **和 **class="swiper-button-next"**：可选。假如底部需要添加左右按钮 则在此添加此类至i标签。

- **class="iconfont icon-zuo1"**和**class="iconfont icon-you1"**:i标签默认图标，修改可自行修改，或配置修改（见下文）。



#### js

在html页面，body标签内最后添加

```html
    <script>
        let mySwiper = new Swiper('.swiper-container', {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            image:{
                location:'center',
                type:'',
                opacity:0.8,
            },
            //底部导航样式
            'bottom': {
                type: 'square'
            },
            //设置定时器
            swiperTime:3000
        });
    </script>
```

#### 相关api

- **image**：（主体图片样式配置）。如下：

  ```js
  image:{
  	location:'center',
  	type:'square',
  	opacity:0.8,
  },
  ```

  - **location（位置，默认为center居中，即不设置也可以）**，其他可设置:

    ```js
    location:'center',   //居中
    location:'top',		//顶部对齐
    location:'bottom',	//底部对齐
    location:'super-top',		//逐渐超出顶部
    location:'super-bottom',	//逐渐超出底部
    /*三四配置需要父div（yourdiv）设置margin-top到足够值才可显示，后期待改善。*/
        
    ```

  - **size(缩放比例，仅location为super时可用)**

    ```js
    size:1.3 //取值（1-2）为放大比例，供location:'super-top'使用，其他不建议使用
    size:1.3 //取值（0-1）为缩小比例，供location:'super-bottom',使用，其他不建议使用
    ```

    

  - **type(形状，默认为square方形，即不设置也可以)**，其他可设置

    ```js
    type:'square', //方形
    type:'oval'//椭圆
    ```

  - **opacity（透明度，默认有设置透明）**范围在（0-1）

    ```js
    opacity:0.8, //（0-1）
    ```

- **navigation**：（左右切换页按钮样式配置）。如下：

  ```js
   /*假如默认情况，是不需要写进navigation里面，在外层写nextEl和prevEl即可，如需更多配置则需要写进里面。*/
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
     color:'#cdcdcd'
     icon:1  //（范围1-10）
  },
  ```

  - **nextEl（下一页导航配置，传入所在标签的class或id）**.

  - **prevEl（上一页导航配置，传入所在标签的class或id）**.

  - **color(颜色，默认不需要加，如需要则按css标准传入)**

  - **icon（图标，这里提供10种图标，其他更多如需要用户可自行添加）**（所以取值为（1-10）正整数）

- **bottom**：（底部导航样式配置）。如下：

  ```js
  'bottom': {
       type: 'square',
       fontColor:'#333'
       color: '0085FF',
       noSpace:false,
       width:'60px',
       height:'30px',
       space:'50px'
  },
  ```

  - **type(样式类型，默认为square细长方形)**，其他可设置为：

    ```js
      type: 'square', //方形
      type: 'circle', //圆形
      type: 'number', //数字
    ```

  - **width和height（宽度和长度）**，用户也可以自定义底部按钮的宽高

    ```js
      width:'60px',
      height:'30px',
    ```

  - **fontColor（如type为number时）**，用户也可以自定义底部按钮的字体颜色

    ```js
    fontColor:'#333'
    ```

  - **color（定义背景颜色，按标准css传入）**

  - **noSpace（按钮之间是否设置不间隔，默认为false）**，可设置：

    ```js
    noSpace:false, //间隔
    noSpace:true //不间隔
    ```

  - **space（按钮之间如存在间隔，可设置间隔距离）**

    ```js
     space:'50px'
    ```


  - **swiperTime(设置定时器，单位是毫秒，默认为3000毫秒)**,假如传入非数字，则无效，默认显示3000秒。其他可设置：

    ```js
    swiperTime:2000 // 2秒定时器
    swiperTime:'2000' // 2秒定时器,自动转换
    swiperTime:'aaa' // 无效，默认为3秒
    swiperTime:false // 不设置定时器
    swiperTime:true // 设置定时器,默认为3秒
    ```

    