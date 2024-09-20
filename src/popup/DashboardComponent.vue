<template>
  <div class="popup" :class="currentTheme">
    <div class="above-overlay">
      <div class="flex-column-start">
        <div class="banner-container grey-section">
          <div class="banner"><span class="banner-text">
            <div class="banner-content">
              <!-- <span style="font-weight: 600;">TabsCapsule</span>  -->
            </div>
          </span> </div>
          <img src="../assets/favicon-32x32.png" alt="TabsCapsule Logo" class="banner-logo">

          <transition name="fade">
            <div v-if="showModal" class="modal" @click.self="showModal = false">
             
              <div class="modal-content" @click.stop>

                <button class="close-modal-btn" @click="showModal = false">
                <svg width="24" height="24" viewBox="0 0 24 24" class="close-icon" style="fill: var(--accent-color);">
                  <path d="M19 13H5v-2h14v2z" />
                  <path d="M19 13H5v-2h14v2z" opacity=".3" />
                  <path d="M19 13H5v-2h14v2z" />
                </svg>
              </button>
                <h3>Save tabs</h3>
                <p>Give a name to the tabs you save</p>
                <input type="text" v-model="tabName" placeholder="Saved Tabs" class="modal-input">
                 <button @click="saveTabs()" class="radix-ui-button">Save Tab</button>
              </div>
            </div>
          </transition>
        </div>

        <div class="tabs">
          <button 
            class="tab" 
            :class="{ active: activeTab === 'Current tabs' }" 
            @click="setActiveTab('Current tabs')"
          >
            Current
          </button>
          <button 
            class="tab" 
            :class="{ active: activeTab === 'Saved' }" 
            @click="setActiveTab('Saved')"
          >
            Saved
          </button>
          <button 
            class="tab" 
            :class="{ active: activeTab === 'Favorite' }" 
            @click="setActiveTab('Favorite')"
          >
          Favorite
          </button>
        </div>
        <div v-if="activeTab === 'Current tabs'" class="current-tabs-header">
            Current Tabs ({{ tabs.length }})
            <button @click="toggleModal()" class="save-tabs-button">Save Tabs</button>
        </div>
    
      
        <div class="content">
      
          <div class="grey-section current-tabs-section" v-if="activeTab === 'Current tabs'"  data-aos="fade-right"    >
            <div class="tabs-container">
              <ul class="tab-list">
                <li v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: tab.url === currentTabUrl }" @click="tabSelected(tab)">
                  <div class="subtab-container">
                      <div class="tab-info">
                      <img :src="tab.icon || '../assets/icons/placeholder-icon.svg'" class="tab-icon">
                      <span class="tab-text">{{ tab.title.length > 12 ? tab.title.slice(0, 12) + '...' : tab.title }}</span>
                  
                    </div>
                    <div class="tooltip-container">
                      <span :style="{ color: 'var(--accent-color)' }">{{ tab.url.length > 25 ? tab.url.slice(0, 25) + '[...]' : tab.url }}</span>
                    </div>
                  </div>
                 </li>
              </ul>
            </div>
          </div>
          
          <template v-if="activeTab === 'Saved'"  >
            <div class="history-container" data-aos="fade-right" >
              <template v-for="(savedTab, savedIndex) in savedTabs" :key="savedIndex">
                <template v-if="getDateCategory(savedTab.date) !== previousDateCategory" >
                  <div class="date-category">
                    <h3 v-if="savedIndex === 0 || getDateCategory(savedTab.date) !== getDateCategory(savedTabs[savedIndex].date)">{{ getDateCategory(savedTab.date) }}</h3>
                  </div>
               </template>
                <div class="accordion">
                  <div class="accordion-item">
                    <div class="accordion-header sticky" @click="toggleAccordion('savedTabs' + savedIndex)">
                      <div class="accordion-header-content">
                        <div class="accordion-title">
                          <span class="accordion-name">{{ savedTab.name }}</span>
                          <span class="accordion-count">&nbsp;({{ savedTab.tabs.length }})</span>
                          <div class="date-label"> {{ new Date(savedTab.date).toLocaleDateString() }}</div>
                        </div>
                     
                        <svg class="favorite-icon" v-if="!savedTab.favorite" @click.stop="toggleFavorite(savedTab)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--text-color)"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
                          <svg class="favorite-icon-active" v-else @click.stop="toggleFavorite(savedTab)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-color)"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                        </div>
                    
                      <Popper hover placement="top">
                         <button class="play-btn"  @click="restoreTabs(tabs)"  @mouseover="showTooltip('play-btn-' + savedIndex)" @mouseleave="hideTooltip('play-btn-' + savedIndex)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14"  viewBox="0 0 24 24" fill="#FFFFFF"><path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z"/></svg>
                          
                        </button>
                        <template #content>
                          Open {{ savedTab.name }}
                        </template>
                      </Popper>
             
                    </div>
                    <div class="accordion-content" v-if="isAccordionOpen['savedTabs' + savedIndex]">
                      <ul class="tab-list">
                        <li v-for="(tab, index) in savedTab.tabs" :key="index" class="tab-item" @click="openTab(tab)">
                            <div  class="subtab-container">
                              <div class="tab-info-container">
                                <div class="tab-info">
                                  <img :src="tab.icon || '../assets/icons/placeholder-icon.svg'" class="tab-icon">
                                <span class="tab-text">{{ tab.title.length > 50 ? tab.title.slice(0, 50) + '...' : tab.title }}</span>
                               </div>
                              <svg class="link-icon" fill="var(--accent-color)" viewBox="0 0 24 24" @mouseover="showTooltip(savedIndex + '-' + index)" @mouseleave="hideTooltip(savedIndex + '-' + index)">
                                    <path  d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                                  </svg>
                                
                              </div>
                      
                        
                            </div>
                          </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </template>
              <p class="center-text" v-if="savedTabs.length === 0">No tabs in history</p>
            </div>
          </template>

          <template v-if="activeTab === 'Favorite'"  >
            <div class="history-container" data-aos="fade-right" >
              <template v-if="savedTabs.filter(tab => tab.favorite).length > 0">
                <template v-for="(savedTab, savedIndex) in savedTabs.filter(tab => tab.favorite)" :key="savedIndex">
                  <div class="accordion">
                    <div class="accordion-item">
                      <div class="accordion-header sticky" @click="toggleAccordion('savedTabs' + savedIndex)">
                        <div class="accordion-header-content">
                          <div class="accordion-title">
                            <span class="accordion-name">{{ savedTab.name }}</span>
                          <span class="accordion-count">&nbsp;({{ savedTab.tabs.length }})</span>
                          <div class="date-label"> {{ new Date(savedTab.date).toLocaleDateString() }}</div>
                          </div>
                          <svg class="favorite-icon" v-if="!savedTab.favorite" @click.stop="toggleFavorite(savedTab)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--text-color)"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
                          <svg class="favorite-icon-active" v-else @click.stop="toggleFavorite(savedTab)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-color)"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                        </div>
                        
                        <Popper hover placement="top">
                         <button class="play-btn"  @click="restoreTabs(tabs)"  @mouseover="showTooltip('play-btn-' + savedIndex)" @mouseleave="hideTooltip('play-btn-' + savedIndex)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14"  viewBox="0 0 24 24" fill="#FFFFFF"><path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z"/></svg>
                          
                        </button>
                        <template #content>
                          Open {{ savedTab.name }}
                        </template>
                      </Popper>
                      </div>
                      <div class="accordion-content" v-if="isAccordionOpen['savedTabs' + savedIndex]">
                        <ul class="tab-list">
                          <li v-for="(tab, index) in savedTab.tabs" :key="index" class="tab-item" @click="openTab(tab)">
                              <div  class="subtab-container">
                                <div class="tab-info-container">
                                  <div class="tab-info">
                                    <img :src="tab.icon || '../assets/icons/placeholder-icon.svg'" class="tab-icon">
                                    <span class="tab-text">{{ tab.title.length > 50 ? tab.title.slice(0, 50) + '...' : tab.title }}</span>
                                  </div>
                                 <div class="tooltip-container">
                                    <svg class="link-icon" fill="var(--accent-color)" viewBox="0 0 24 24" @mouseover="showTooltip(savedIndex + '-' + index)" @mouseleave="hideTooltip(savedIndex + '-' + index)">
                                      <path  d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                                    </svg>
                                    <a class="tooltip" :class="{ 'show': tooltips[savedIndex + '-' + index] }">{{ tab.url }}</a>
                                  </div>
                                </div>
                        
                          
                              </div>
                            </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
              <p class="center-text" v-else>No tabs in favorite</p>
              <p class="center-text" v-if="savedTabs.length === 0">No tabs in history</p>
            </div>
          </template>
        </div>
      </div>  
    </div>
  </div>
</template>
  <script>
    import Popper from "vue3-popper";
    import AOS from 'aos';
import 'aos/dist/aos.css';

  export default {
    name: "DashboardComponent",
    components: {
      Popper,
    },
    data() {
      return {
        tabs: [],
        savedTabs: [],
        currentTabUrl: null,
        currentTheme: "dark-theme",
        tabName: "Saved tabs",
        activeTab: 'Current tabs',
        showModal: false,
        tooltips: {},
        isAccordionOpen: {
          currentTabs: false
        }
      }
    },
    
    mounted() {
      AOS.init();
      this.getCurrentTabs();
      this.setupTabListeners(); // Set up listeners for tab changes
      this.savedTabs = JSON.parse(localStorage.getItem('savedTabs')) || [];
      this.savedTabs = this.savedTabs.reverse();
     
     },
    beforeUnmount() {
      // Clean up listeners if necessary (not always required in popup)
      chrome.tabs.onUpdated.removeListener(this.getCurrentTabUrl);
      chrome.tabs.onActivated.removeListener(this.getCurrentTabUrl);
    },
    methods: {
      changeTheme() {
        const themes = ['light-theme', 'dark-theme', 'ocean-theme', 'forest-theme'];
        let currentIndex = themes.indexOf(this.currentTheme);
        currentIndex = (currentIndex + 1) % themes.length; // Move to the next index, wrapping around to the start if necessary
        const newTheme = themes[currentIndex];

        // Remove current theme
        document.body.classList.remove(this.currentTheme);
        // Add new theme
        // Update current theme
        this.currentTheme = newTheme;

        // Save the theme preference to localStorage
        localStorage.setItem("theme", this.currentTheme);
        document.body.classList.add(newTheme);
        console.log(newTheme)

      },
      getDateCategory(date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const sixMonthsAgo = new Date(today);
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const inputDate = new Date(date);

        if (inputDate.toDateString() === today.toDateString()) {
          return 'Today';
        } else if (inputDate.toDateString() === yesterday.toDateString()) {
          return 'Yesterday';
        } else if (inputDate >= oneWeekAgo) {
          return 'Past Week';
        } else if (inputDate >= sixMonthsAgo) {
          return 'Past 6 Months';
        } else {
          return 'Older';
        }
      },
      setupTabListeners() {
        if (window.location.hostname !== "localhost") {
          chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.status === 'complete' && tab.active) {
              this.getCurrentTabUrl(); // Update current tab URL when tab is updated
            }
          });

          chrome.tabs.onActivated.addListener(() => {
            this.getCurrentTabUrl(); // Update current tab URL when tab is updated
          });
        }
      },
      getCurrentTabUrl() {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0]) {
              this.currentTabUrl = tabs[0].url; // Update currentTabUrl
            } else {
              this.currentTabUrl = null; // No active tab found
            }
          });
        } else {
          // Mock behavior for development environment
          this.currentTabUrl = 'https://example.com';
        }
      },
      getCurrentTabs() {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
          chrome.tabs.query({ currentWindow: true }, (tabs) => {
             this.tabs = tabs.map(tab => ({ title: tab.title, url: tab.url, icon: tab.favIconUrl, date: new Date(), favorite: tab.favorite }));
           });
        } else {
          // Mocking the chrome.tabs.query functionality with a randomized amount of tabs
          const numTabs = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 10
          const mockTabs = Array(numTabs).fill().map((_, index) => ({
            title: `Tab ${index + 1}`,
            url: `https://testtesttesttest.com/tab${index + 1}`,
            icon: `../assets/icons/placeholder-icon.svg`,
            date: new Date(),
            favorite: false
          }));
          this.tabs = mockTabs;
          }
      },
      setActiveTab(tab) {
      this.activeTab = tab;
    },
    openTab(tab){
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.create({ url: tab.url });
      } else {
        // Mock behavior for development environment
        console.log('Opening tab:', tab.url);
        alert('In a browser environment, this would open a new tab with URL:\n' + tab.url);
      }
    },
      restoreTabs(tabs) {
        if (typeof chrome !== 'undefined' && chrome.windows && chrome.tabs) {
          chrome.windows.create({ url: tabs[0].url }, (newWindow) => {
            for (let i = 1; i < tabs.length; i++) {
              chrome.tabs.create({ windowId: newWindow.id, url: tabs[i].url });
            }
          });
        } else {
          // Mock behavior for development environment
          console.log('Restoring tabs:', tabs.map(tab => tab.url));
          alert('In a browser environment, this would open a new window with the following tabs:\n' + tabs.map(tab => tab.url).join('\n'));
        }
      },
        tabSelected(tab) {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ url: tab.url }, (tabs) => {
        if (tabs.length > 0) {
          // If the tab exists, switch to it
          chrome.tabs.update(tabs[0].id, { active: true });
          chrome.windows.update(tabs[0].windowId, { focused: true });
        } else {
          // If the tab doesn't exist, create it
          chrome.tabs.create({ url: tab.url });
        }
      });
    } else {
      // Mock behavior for development environment
      console.log('Tab selected:', tab.url);
      console.log('In a browser environment, this would open or focus on the tab with URL:', tab.url);
    }
  },
      saveTabs() {
        let savedTabs = JSON.parse(localStorage.getItem('savedTabs')) || [];
        // const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        savedTabs.push({ 
          name: `${this.tabName}`,
          date: new Date().toISOString().split('T')[0],
          favorite: false,
          tabs: this.tabs});
        localStorage.setItem('savedTabs', JSON.stringify(savedTabs));
        this.savedTabs = savedTabs;
        this.setActiveTab('Saved')
        this.savedTabs = this.savedTabs.reverse()
        this.showModal = false
  
       },
      toggleFavorite(savedTab) {
        // Toggle the favorite status
        savedTab.favorite = !savedTab.favorite;

        // Find the index of the savedTab in the savedTabs array
        const index = this.savedTabs.findIndex(tab => tab.name === savedTab.name && tab.date === savedTab.date);

        if (index !== -1) {
          // Update the savedTabs array
          this.savedTabs[index] = { ...savedTab };

          // Update localStorage
          localStorage.setItem('savedTabs', JSON.stringify(this.savedTabs));
        }
      },

      toggleModal() {
        this.showModal = !this.showModal;
      },
      showTooltip(index) {
        this.tooltips = { ...this.tooltips, [index]: true };
      },
      hideTooltip(index) {
        this.tooltips = { ...this.tooltips, [index]: false };
      },
      toggleAccordion(key) {
        this.isAccordionOpen = {
          ...this.isAccordionOpen,
          [key]: !this.isAccordionOpen[key]
        };
      }, 
    },
  }
  </script>
   
  <style>
  @import "../style/themes.css";
  @import "./popup.css";

  .flex-column-start {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .banner-text {
    font-weight: 800;
  }

  .banner-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .banner-logo {
    width: 32px;
    border-radius: 8px;
  }

  .current-tabs-header {
    display: flex;
    color: var(--button-text);
    z-index: 10;
    background-color: var(--bg-color);
    position: sticky;
    top: 0;
    flex-direction: row;
    margin: 1.1rem;
    justify-content: space-between;
    align-items: center;
    font-family: 'DM Sans', sans-serif;
  }

  .current-tabs-section {
    position: relative;
  }

  .tabs-container {
    background-color: var(--tab-bg);
    margin: 0 1rem 1rem 1rem;
    border-radius: 8px;
  }

  .tab-list {
    list-style-type: none;
  }

  .tab-info {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
  }

  .tab-icon {
    width: 24px;
    height: 24px;
    color: black;
    max-height: 24px;
  }

  .date-category {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.2rem;
  }

  .accordion-header-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .accordion-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
  }

  .accordion-name {
    font-weight: 600;
    color: var(--button-text);
  }

  .favorite-icon, .favorite-icon-active {
    margin-right: 1rem;
  }

  .tab-info-container {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
  }

  .link-icon {
    width: 18px;
    height: 18px;
  }

  .center-text {
    text-align: center;
  }
 
  </style>