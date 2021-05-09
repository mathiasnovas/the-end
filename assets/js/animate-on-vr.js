AFRAME.registerComponent('animate-on-vr', {
    schema: {
        property: {type: 'string', default: 'position'},
        to: {type: 'string', default: ''},
        dur: {type: 'number', default: 3000},
        delay: {type: 'number', default: 0}
    },

    init: function () {
        this.addAnimation = this.addAnimation.bind(this);

        window.addEventListener('enter-vr', this.addAnimation)
        window.addEventListener('vrdisplayactivate', this.addAnimation)
    },

    addAnimation: function () {
        const data = this.data;

        console.log('>>> DELAY', data.delay)

        setTimeout(() => {
            this.el.setAttribute('visible', 'true')
            this.el.setAttribute('animation', {property: data.property, to: data.to, dur: data.dur})
        }, data.delay)
    }
})
