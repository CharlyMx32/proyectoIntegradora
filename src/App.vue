<template>
  <nav>
    <ul>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
nav {
  background-color: #333;
  color: white;
  padding: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: inline;
  margin-right: 1rem;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
