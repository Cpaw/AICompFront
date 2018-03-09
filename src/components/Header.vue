<template>
  <header>
    <nav>
      <a>
        <router-link tag="li" :to="{ path: '/'}">
          Home
        </router-link>
      </a>
      <a>
        <router-link tag="li" :to="{ path: '/problems'}">
          Problems
        </router-link>
      </a>
      <a>
        <router-link tag="li" :to="{ path: '/ranking'}">
          Ranking
        </router-link>
      </a>
      <a>
        <router-link tag="li" :to="{ path: '/signout'}">
          Signout
        </router-link>
      </a>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 0 10vw;
}
a {
  text-decoration: none;
  cursor: pointer;
}
a:hover {
  margin-top: 1px;
}
a:active {
  margin-top: 3px;
}
li {
  list-style-type: none;
  background-color: #fff;
  color: #000;
  width: 14vw;
  height: 42px;
  padding-top: 6px;
  border: solid 3px #6699cc;
  border-radius: 8%;
  font-size: 36px;
  font-family: "gooddog-new";
  color: #6699cc;
}
</style>
