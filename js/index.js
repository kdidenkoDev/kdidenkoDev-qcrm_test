const bgImgChanger = {
    bgArray: [],
    currentBgIndex: null,
    bgElement: null,
    interval: 10000,
    timer: 60000,
    storageKey: 'currentBgIndex',
    init: function () {
        this.preloadBgImg(7);
        this.bgElement = document.getElementById('bgElement');
        this.currentBgIndex = this.getFirstBgImgIndex();
        this.renderBgImg(this.currentBgIndex);
        this.changeBgImgInterval();
    },
    getRandomIndex: function () {
        return Math.floor(Math.random() * this.bgArray.length);
    },
    getFirstBgImgIndex: function () {
        return +localStorage.getItem(this.storageKey) || this.getRandomIndex();
    },
    getNextBgImgIndex: function () {
        return this.currentBgIndex + 1 >= this.bgArray.length ? 0 : this.currentBgIndex + 1;
    },
    preloadBgImg: function (quantityImg) {
        for (let i = 1; i <= quantityImg; i++) {
            let link = document.createElement('link');

            link.as = 'image';
            link.rel = 'preload';
            document.head.appendChild(link);
            link.href = './assets/images/page_bg_' + i + '.jpg';
            this.bgArray[i] = "url('./assets/images/page_bg_" + i + ".jpg')";
        }
    },
    renderBgImg: function (index) {
        localStorage.setItem(this.storageKey, index);
        this.bgElement.style.background = this.bgArray[index];
    },
    changeBgImgInterval: function () {
        const timerId = setInterval(() => {
            this.currentBgIndex = this.getNextBgImgIndex();
            this.renderBgImg(this.currentBgIndex);
        }, this.interval);

        setTimeout(() => { clearInterval(timerId) }, this.timer);
    }
};

bgImgChanger.init();