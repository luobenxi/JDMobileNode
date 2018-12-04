<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
}

ol, ul {
	list-style: none;
}

a {
    text-decoration: none;
    color: inherit
}
#app {
    height: 100%;
}
</style>
