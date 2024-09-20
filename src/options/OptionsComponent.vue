<template>
  <div class="options" :class="currentTheme">
    <div class="work-in-progress">
      <h1 class="main-banner">
        <img src="../assets/favicon-32x32.png">
      </h1>
      <div class="content-container">
        <h2 class="banner">Work in Progress</h2>
        <p class="disclaimer">
          TabsCapsule is currently under development. Our goal is to provide a powerful and intuitive tool for managing your browser tabs, helping you stay organized and boost your productivity.
        </p>
        <p class="features">
          With TabsCapsule, you'll be able to:
        </p>
        <ul>
          <li>Save and organize your tabs for later use</li>
          <li>Easily restore your browsing sessions</li>
          <li>Categorize and search through your saved tabs</li>
          <li>Sync your tabs across devices</li>
        </ul>
        <p class="coming-soon">
          Stay tuned for updates as we work to bring you these exciting features!
        </p>
      </div>
    </div>
    <footer class="footer">
      <button @click="toggleTheme" @keydown.space.prevent="toggleTheme" class="theme-button main-banner-color" tabindex="0" aria-label="Change Theme">Change Theme</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "OptionsComponent",
  data() {
    return {
      currentTheme: 'dark-theme'
    }
  },
  mounted() {
    this.loadTheme();
  },
  methods: {
    toggleTheme() {
      const themes = ['dark-theme', 'light-theme', 'ocean-theme', 'forest-theme'];
      const currentIndex = themes.indexOf(this.currentTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      this.currentTheme = themes[nextIndex];
      localStorage.setItem('theme', this.currentTheme);
      document.body.className = this.currentTheme;
    },
    loadTheme() {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme && ['dark-theme', 'light-theme', 'ocean-theme', 'forest-theme'].includes(storedTheme)) {
        this.currentTheme = storedTheme;
      } else {
        this.currentTheme = 'dark-theme';
      }
      document.body.className = this.currentTheme;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
@import '../style/themes.css';

.options {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-container {
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: rgba(255, 255, 255, 0.05);
}

.main-banner {
  margin-bottom: 0.5rem;
  text-align: left;
  font-weight: 700 !important;
  font-size: 2em;
}

.banner {
  margin-bottom: 1rem;
  text-align: left;
  font-size: 1.5em;
}

.disclaimer, .features, .coming-soon {
  margin-bottom: 1rem;
  font-family: 'Noto Sans', sans-serif;
}

ul {
  list-style-type: disc;
  padding-left: 2rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
  font-family: 'Noto Sans', sans-serif;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
  margin-top: auto;
}

.theme-button {
  text-decoration: none;
  font-family: 'Noto Sans', sans-serif;
  font-size: 0.9em;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--main-banner-color);
}

.theme-button:hover {
  text-decoration: underline;
}
</style>