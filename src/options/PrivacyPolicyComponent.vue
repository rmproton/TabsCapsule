<template>
  <div class="privacy-policy">
    <h1>Privacy Policy</h1>
    <p>
      At Aurelius, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and protection of your data.
    </p>
    <h2>Data Collection and Usage</h2>
    <p>
      We want to assure you that the Aurelius extension:
    </p>
    <ul>
      <li>Does not collect any personal data from its users.</li>
      <li>Does not upload or transmit any user data to external servers.</li>
      <li>Does not use cookies or any other tracking technologies.</li>
      <li>Operates entirely locally on your device.</li>
    </ul>
    <h2>Local Storage</h2>
    <p>
      The only data stored by Aurelius is your streak count, which is saved locally on your device using browser's local storage. This information never leaves your device and is used solely to display your progress within the extension.
    </p>
    <h2>Third-Party Services</h2>
    <p>
      Aurelius does not integrate with any third-party services or APIs that could potentially collect or process your data.
    </p>
    <h2>Changes to This Policy</h2>
    <p>
      We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
    </p>
    <h2>Contact</h2>
    <p>
      If you have any questions about this Privacy Policy, please contact romanjmerck@gmail.com
    </p>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy'
}
</script>

<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans', sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  border-radius: 8px;
}

h1, h2 {
  color: var(--accent-color);
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

p, li {
  line-height: 1.6;
}
</style>
