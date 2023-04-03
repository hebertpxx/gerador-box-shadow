class BoxShadowGenerator {

    constructor(
        horizontal,
        horizontalRef,
        vertical,
        verticalRef,
        blur,
        blurRef,
        spread,
        spreadRef,
        previewBox,
        rule,
        webkitRule,
        mozRule,
        color,
        opacity,
        opacityRef
        ) {
            this.horizontal = horizontal;
            this.horizontalRef = horizontalRef;
            this.vertical = vertical;
            this.verticalRef = verticalRef
            this.blur = blur;
            this.blurRef = blurRef
            this.spread = spread;
            this.spreadRef = spreadRef;
            this.previewBox = previewBox;
            this.rule = rule;
            this.webkitRule = webkitRule;
            this.mozRule = mozRule;
            this.color = color;
            this.opacity = opacity;
            this.opacityRef = opacityRef;
            this.inset = inset;
        };

        hexToRgb(hex) {

            hex = hex.replace(
                    /^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b
                ).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));

            return hex;

        };

        initialize() {

            let rgbColor = [];
            let opacityValue = (this.opacity.value)/100;
            rgbColor = boxShadow.hexToRgb(color.value);

            this.horizontalRef.value = this.horizontal.value;
            this.verticalRef.value = this.vertical.value;
            this.blurRef.value = this.blur.value;
            this.spreadRef.value = this.spread.value;
            this.opacityRef.value = opacityValue;
            
            this.applyRule(rgbColor);
            this.showRule();
            
        };

        applyRule(rgbColor) {

            rgbColor = boxShadow.hexToRgb(color.value);

            this.previewBox.style.boxShadow = `
                ${this.horizontalRef.value}px
                ${this.verticalRef.value}px
                ${this.blurRef.value}px
                ${this.spreadRef.value}px
                rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${opacityRef.value})
                ${this.inset.checked === true ? 'inset' : ''}
            `;
            
            this.currentRule = this.previewBox.style.boxShadow;

        };

        showRule() {

            this.rule.innerText = this.currentRule + ';';
            this.webkitRule.innerText = this.currentRule + ';';
            this.mozRule.innerText = this.currentRule + ';';

        };

        updateValue(type, value) {

            switch(type) {
                case 'horizontal':
                    this.horizontalRef.value = value;
                    break;
                case 'vertical':
                    this.verticalRef.value = value;
                    break;
                case 'blur':
                    this.blurRef.value = value;
                    break;
                case 'spread':
                    this.spreadRef.value = value;
                    break;
                case 'opacity':
                    this.opacityRef.value = value/100;
                    break;
            };

            this.applyRule();
            this.showRule();

        };

        updateColor(color) {

            this.color.value = color;
            this.applyRule(this.color.value);
            this.showRule();

        };

        updateInset(value) {

            this.inset.value = value;
            this.applyRule();
            this.showRule();

        };
        
};

const horizontal = document.querySelector('#horizontal');
const horizontalRef = document.querySelector('#horizontal-value');
const vertical = document.querySelector('#vertical');
const verticalRef = document.querySelector('#vertical-value');
const blur = document.querySelector('#blur');
const blurRef = document.querySelector('#blur-value');
const spread = document.querySelector('#spread');
const spreadRef = document.querySelector('#spread-value');
const previewBox = document.querySelector('#box');
const rule = document.querySelector('#rule span');
const webkitRule = document.querySelector('#webkit-rule span');
const mozRule = document.querySelector('#moz-rule span');

const color = document.querySelector('#color');

const opacity = document.querySelector('#opacity');
const opacityRef = document.querySelector('#opacity-value');

const inset = document.querySelector('#inset');

const boxShadow = new BoxShadowGenerator(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    previewBox,
    rule,
    webkitRule,
    mozRule,
    color,
    opacity,
    opacityRef,
    inset,
);

boxShadow.initialize();

horizontal.addEventListener('input', (e) => {

    const value = e.target.value;

    boxShadow.updateValue('horizontal', value);

});

vertical.addEventListener('input', (e) => {

    const value = e.target.value;

    boxShadow.updateValue('vertical', value);

});

blur.addEventListener('input', (e) => {

    const value = e.target.value;

    boxShadow.updateValue('blur', value);

});

spread.addEventListener('input', (e) => {

    const value = e.target.value;

    boxShadow.updateValue('spread', value);

});

color.addEventListener('input', (e) => {

    const color = e.target.value;

    boxShadow.updateColor(color);

});

opacity.addEventListener('input', (e) => {

    const value = e.target.value;

    boxShadow.updateValue('opacity', value);

});

inset.addEventListener('input', (e) => {

    const value = e.target.checked;

    boxShadow.updateInset(value);

});