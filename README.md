# Orphex Support Queue Dashboard

A Vue 3 application for managing and visualizing support requests with real-time filtering, sorting, and data persistence.

![Light Mode](./public/screenshot/light-mode.png)
![Dark Mode](./public/screenshot/dark-mode.png)

## 🚀 Features

### Core Functionality
- ✅ **Requests List** - Paginated table with search, filter, and sort
- ✅ **Request Details Modal** - Edit status, priority, and add comments
- ✅ **Needs Attention Logic** - Smart flagging based on priority, age, and activity
- ✅ **Visual Summary** - Highcharts donut chart showing status distribution
- ✅ **CSV Export** - Export filtered/sorted data to CSV
- ✅ **Data Persistence** - Changes persist across page refresh via localStorage
- ✅ **Dark/Light Mode** - Theme toggle with system preference detection

### Technical Highlights
- **Vue 3 Composition API** - Modern, reactive component architecture
- **Pinia Store** - Centralized state management with persistence plugin
- **Highcharts** - Interactive data visualization
- **Tailwind CSS** - Utility-first responsive design
- **Immutable Data Operations** - No mutations to original dataset

---

## 📸 Screenshots

### Light Mode
![Dashboard Light](./screenshots/light-mode.png)

### Dark Mode
![Dashboard Dark](./screenshots/dark-mode.png)

### Request Details Modal
![Modal](./screenshots/modal.png)

---

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API)
- **State Management:** Pinia + pinia-plugin-persistedstate
- **Charts:** Highcharts + highcharts-vue
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Clone repository
git clone https://github.com/kardelen35/orphex-dashboard.git
cd orphex-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` in your browser.
## 🎯 Key Implementation Details

### 1. Needs Attention Logic

A request is flagged as "Needs Attention" if:
1. **Status** is not "Done"
2. **Priority** is High OR request is **older than 7 days**
3. **No activity** in the last 3 days (based on `updatedAt` or `lastCommentAt`)





## 👤 Author

**Kardelen**
- GitHub: [@kardelen35](https://github.com/kardelen35)



##  Acknowledgments

- Highcharts for the charting library
- Tailwind CSS for the styling framework
- Pinia Store
