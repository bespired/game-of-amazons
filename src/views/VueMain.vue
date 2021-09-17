<template>
    <nav-bar />
    <play-field v-keydown="handleKeys" />
</template>
<script>
export default {

    created() {
        window.addEventListener('mousemove', this.mousemove);
    },

    beforeUnmount() {
        window.removeEventListener('mousemove', this.mousemove);
    },

    methods: {
        handleKeys(event) {
            this.$store.dispatch('main/keyDown', event)
        },

        mousemove(evt) {
            // This used to be a $refs thing...
            // But I need mouse coords on the App.

            const elem    = document.getElementById('board')
            const bounds  = elem.getBoundingClientRect()

            global.boardPosition.left = bounds.x
            global.boardPosition.top  = bounds.y
            global.boardPosition.x = evt.clientX - bounds.x
            global.boardPosition.y = evt.clientY - bounds.y

        }
    }

}
</script>