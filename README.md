# 📄 Interactive Resume Builder

![Resume Builder](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> A modern, responsive, and accessible resume builder built with vanilla JavaScript, HTML5, and Tailwind CSS. Create professional resumes with live preview, drag-and-drop reordering, and export to PDF or JSON.

---

## 🌟 Features

### ✨ **Core Features**

- ✅ **Real-time Preview** - See changes instantly as you type
- ✅ **Auto-save** - Never lose your progress with localStorage
- ✅ **Drag & Drop Reordering** - Rearrange sections easily
- ✅ **Multiple Export Options** - Download as PDF or JSON
- ✅ **Import/Export** - Save and load your resume data
- ✅ **Professional Templates** - Clean, ATS-friendly design
- ✅ **Fully Responsive** - Works on mobile, tablet, and desktop
- ✅ **Keyboard Accessible** - Full keyboard navigation support

### 📝 **Sections Included**

- Personal Information (Name, Email, Phone, Location, LinkedIn, GitHub)
- Professional Summary
- Education
- Work Experience
- Projects (with technologies and links)
- Leadership & Community Involvement
- Skills & Certifications
- Languages
- Interests

---

## 🚀 Live Demo

**[View Live Demo](https://parikshitt05.github.io/Resume-Builder)**

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Styling with Tailwind CSS
- **Tailwind CSS (CLI)** - Utility-first CSS framework
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JS
- **LocalStorage API** - Client-side data persistence
- **HTML5 Drag and Drop API** - Reordering functionality
- **Web APIs** - FileReader, Blob, window.print

---

## 📦 Installation & Setup

### **Prerequisites**

- Node.js (v14 or higher)
- npm (comes with Node.js)

### **Quick Start**

1. **Clone the repository**

   ```bash
   git clone https://github.com/parikshitt05/Resume-Builder.git
   cd Resume-Builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development mode**

   ```bash
   npm run dev
   ```

   This watches your CSS files and auto-compiles Tailwind.

4. **Open in browser**

   **Option A: Using Python (Recommended)**

   ```bash
   # Python 3
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

   **Option B: Using VS Code Live Server**

   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

   **Option C: Using Node.js http-server**

   ```bash
   # Install globally
   npm install -g http-server

   # Run
   http-server
   # Visit http://localhost:8080
   ```

5. **Build for production**
   ```bash
   npm run build
   ```
   This creates a minified CSS file in `dist/output.css`

---

## 📂 Project Structure

```
resume-builder/
│
├── src/
│   ├── input.css          # Tailwind source CSS
│   └── app.js             # Main JavaScript file
│
├── dist/
│   └── output.css         # Generated Tailwind CSS (auto-created)
│
├── index.html             # Main HTML file
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Project dependencies
├── .gitignore             # Git ignore file
└── README.md              # This file
```

---

## 📖 Usage Guide

### **Creating Your Resume**

#### **1. Personal Information**

Fill in your basic details:

- Full Name
- Email Address
- Phone Number
- City, State
- LinkedIn URL (optional)
- GitHub URL (optional)

#### **2. Professional Summary**

Write a brief 2-3 sentence overview (max 500 characters) highlighting:

- Your role/expertise
- Years of experience
- Key strengths

#### **3. Adding Sections**

**Education:**

- Click **"+ Add"** button
- Fill in: University, Degree, Location, Date, GPA (optional)
- Add achievements (one per line)

**Work Experience:**

- Add company name, job title, location, dates
- Describe responsibilities (one bullet per line)

**Projects:**

- Project name and technologies used
- Add GitHub/live demo link
- Describe features (one per line)

**Leadership & Community:**

- Organization name and your role
- Dates and location
- Key achievements

**Skills, Languages & Interests:**

- Type and press **Enter** OR
- Type and click **"Add"** button

#### **4. Reordering Sections**

- Hover over any entry
- Click and drag the **"☰"** icon
- Drop in desired position

### **Exporting Your Resume**

#### **Export to PDF**

1. Click **"📄 Export PDF"**
2. In the print dialog:
   - Select "Save as PDF"
   - Set margins to "None" or "Minimum"
   - Enable "Background graphics"
3. Save your resume

#### **Save as JSON (Backup)**

1. Click **"💾 Save JSON"**
2. File downloads automatically
3. Store safely for future edits

#### **Import Previous Resume**

1. Click **"📂 Import JSON"**
2. Select your saved `.json` file
3. All data loads automatically

---

## ⌨️ Keyboard Shortcuts

| Shortcut       | Action                           |
| -------------- | -------------------------------- |
| `Ctrl/Cmd + S` | Save resume (shows confirmation) |
| `Ctrl/Cmd + P` | Open print/PDF dialog            |
| `Tab`          | Navigate between fields          |
| `Enter`        | Add skills/languages/interests   |
| `Escape`       | Cancel dialogs                   |

---

## 🎨 Customization

### **Changing Colors**

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        "brand-blue": "#3b82f6",
        "brand-dark": "#1e293b",
      },
    },
  },
};
```

Then rebuild:

```bash
npm run build
```

### **Modifying Resume Template**

Edit the `updatePreview()` function in `src/app.js` (around line 600) to customize:

- Font sizes
- Section order
- Formatting styles
- Spacing

### **Adding Custom Fonts**

In `src/input.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Your+Font&display=swap");

#resume-preview {
  font-family: "Your Font", serif;
}
```

---

## ♿ Accessibility Features

- ✅ **WCAG 2.1 AA Compliant**
- ✅ **Full keyboard navigation**
- ✅ **Screen reader compatible**
- ✅ **High contrast text** (4.5:1 minimum)
- ✅ **Focus indicators** on all interactive elements
- ✅ **Semantic HTML** structure
- ✅ **ARIA labels** where needed

### **Testing Accessibility**

1. **Keyboard Navigation:**

   - Use `Tab` to move through form fields
   - Use `Enter` to activate buttons
   - All features should work without a mouse

2. **Screen Reader:**

   - Windows: Use NVDA (free)
   - Mac: Use VoiceOver (built-in)
   - Test that all content is announced

3. **Color Contrast:**
   - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Ensure text meets 4.5:1 ratio

---

## 📱 Responsive Design

The resume builder works perfectly on:

- 📱 **Mobile** (320px - 767px)
- 📱 **Tablet** (768px - 1023px)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1920px+)

### **Breakpoints**

| Device  | Width          | Layout                     |
| ------- | -------------- | -------------------------- |
| Mobile  | < 768px        | Single column (stacked)    |
| Tablet  | 768px - 1023px | Single column              |
| Desktop | ≥ 1024px       | Two columns (side-by-side) |

---

## 🐛 Troubleshooting

### **Problem: Tailwind CSS not loading**

**Solution:**

```bash
# Make sure Tailwind is running
npm run dev

# Check if dist/output.css exists
ls dist/

# If not, rebuild
npm run build
```

### **Problem: JavaScript not working**

**Solution:**

1. Check browser console (F12) for errors
2. Ensure `src/app.js` exists
3. Hard refresh: `Ctrl + Shift + R`

### **Problem: Changes not showing**

**Solution:**

```bash
# Clear localStorage
# In browser console, run:
localStorage.clear()
location.reload()
```

### **Problem: Export PDF not working**

**Solution:**

- Use Chrome or Edge (best support)
- Check print settings: margins = minimum
- Enable background graphics

### **Problem: Data not saving**

**Solution:**

1. Check browser allows localStorage
2. Clear cookies/cache if needed
3. Try incognito/private mode

---

## 📊 Browser Support

| Browser | Version | Status             |
| ------- | ------- | ------------------ |
| Chrome  | 90+     | ✅ Fully Supported |
| Firefox | 88+     | ✅ Fully Supported |
| Safari  | 14+     | ✅ Fully Supported |
| Edge    | 90+     | ✅ Fully Supported |
| Opera   | 76+     | ✅ Fully Supported |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Contribution Guidelines**

- Follow existing code style
- Test thoroughly before submitting
- Update documentation if needed
- Add comments for complex logic

---

## 📝 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Your Name**

- GitHub: [@parikshitt05](https://github.com/parikshitt05)
- LinkedIn: [Parikshit Tamhane](https://www.linkedin.com/in/parikshit-tamhane-link/)

---

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Google Fonts](https://fonts.google.com/) - Crimson Text and Inter fonts
- [MDN Web Docs](https://developer.mozilla.org/) - Web API documentation
- Icons from emojis (no external dependencies)

---

## 📮 Support

If you found this project helpful:

- ⭐ Star the repository
- 🐛 Report bugs via [Issues](https://github.com/parikshitt05/Resume-Builder/issues)
- 💡 Suggest features via [Discussions](https://github.com/parikshitt05/Resume-Builder/discussions)

---

## 📚 Resources

### **Learning Resources**

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### **Tools Used**

- [VS Code](https://code.visualstudio.com/) - Code editor
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debugging
- [Git](https://git-scm.com/) - Version control

---

## ❓ FAQ

**Q: Is my data safe?**  
A: Yes! All data is stored locally in your browser. Nothing is sent to any server.

**Q: Can I use this offline?**  
A: Yes, after the first load, it works completely offline.

**Q: Can I customize the resume design?**  
A: Yes! Edit the CSS in `src/input.css` or modify the preview template in `app.js`.

**Q: Does it work on mobile?**  
A: Yes! Fully responsive and works on all devices.

**Q: Is it really free?**  
A: Absolutely! Open-source and free forever.

---

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/parikshitt05/resume-builder?style=social)
![GitHub forks](https://img.shields.io/github/forks/parikshitt05/resume-builder?style=social)
![GitHub issues](https://img.shields.io/github/issues/parikshitt05/resume-builder)
![GitHub pull requests](https://img.shields.io/github/issues-pr/parikshitt05/resume-builder)

---

<div align="center">

### Made with ❤️ by [Parikshit Tamhane]

</div>

---
