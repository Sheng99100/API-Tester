<template>
    <header id="navbar">
        <div id="navbar_wrapper">
            <div id="navbar_title">
                <a class="title" href="/">
                    <span>API Tester</span>
                </a>
            </div>
            <div id="navbar_content">

            </div>
        </div>
    </header>
    <el-divider id="nav_bottom"/>
</template>

<style scoped>
#navbar {
    position: relative;
    display: flex;
    justify-content: center;
    height: var(--nav-bar-height);
    width: 100%;
}
#navbar_wrapper {
    display: flex;
    width: 1440px;
    height: 100%;
    padding: 0 50px;
}
#navbar_title {
    height: 100%;
}
.title {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid transparent;
    font-size: 16px;
    font-weight: 600;
    transition: opacity 0.25s;
}
</style>