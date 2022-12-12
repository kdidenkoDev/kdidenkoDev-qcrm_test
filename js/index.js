const bgImgChanger = {
    bgArray: [1,2,3,4,5,6,7],
    currentBgIndex: null,
    bgElement: null,
    interval: 10000,
    timer: 60000,
    storageKey: 'currentBgIndex',
    init: function () {
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
    renderBgImg: function (index) {
        localStorage.setItem(this.storageKey, index);
        this.bgElement.style.background = "url('./assets/images/page_bg_" + this.bgArray[index] + ".jpg')";
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