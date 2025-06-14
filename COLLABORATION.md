# GitHub Collaboration Guide for Dasho

## 🤝 **Team Collaboration Workflow**

### **Setup for New Team Members**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mstfa13/dasho.git
   cd dasho
   npm install
   ```

2. **Run the Project:**
   ```bash
   npm run dev
   ```

### **Daily Workflow for Team Members**

#### **Before Starting Work:**
```bash
# 1. Switch to main branch
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Create a new branch for your feature
git checkout -b feature/your-feature-name
```

#### **While Working:**
```bash
# 1. Make your changes in VS Code

# 2. Stage your changes
git add .

# 3. Commit with descriptive message
git commit -m "Add: new dashboard feature for user analytics"

# 4. Push your branch to GitHub
git push origin feature/your-feature-name
```

#### **When Ready to Merge:**
1. Go to GitHub.com
2. Create a Pull Request (PR)
3. Request code review from team members
4. After approval, merge to main branch

### **Branch Naming Conventions**
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/component-name` - Code refactoring

### **Commit Message Format**
```
Type: Brief description

Examples:
- Add: user authentication system
- Fix: daily log save button not working
- Update: dashboard charts styling
- Remove: unused dependencies
```

## 🔧 **VS Code Git Integration**

### **Source Control Panel** (Ctrl+Shift+G)
- See all changed files
- Stage/unstage changes
- Write commit messages
- Push/pull changes

### **Git Commands in VS Code**
- **Ctrl+Shift+P** → Type "Git" to see all git commands
- **F1** → "Git: Clone" to clone repositories
- **Timeline** panel shows file history

### **Branch Management**
- Bottom left corner shows current branch
- Click branch name to switch branches
- Create new branches from VS Code

## ⚠️ **Important Rules for Team Collaboration**

### **DO:**
- ✅ Always pull before starting work
- ✅ Create feature branches for new work
- ✅ Write clear commit messages
- ✅ Test your code before committing
- ✅ Use Pull Requests for code review

### **DON'T:**
- ❌ Never commit directly to main branch
- ❌ Don't commit broken code
- ❌ Don't commit node_modules or .env files
- ❌ Don't force push to shared branches

## 🚨 **Handling Conflicts**

When two people edit the same file:

1. **Git will show conflict markers:**
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   ```

2. **Resolve in VS Code:**
   - VS Code highlights conflicts
   - Choose which changes to keep
   - Remove conflict markers
   - Commit the resolution

## 📋 **Team Member Checklist**

### **First Time Setup:**
- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Configure git with your name/email
- [ ] Test that app runs (`npm run dev`)

### **Before Each Work Session:**
- [ ] Pull latest changes (`git pull origin main`)
- [ ] Create new feature branch
- [ ] Start coding!

### **Before Committing:**
- [ ] Test your changes (`npm run build`)
- [ ] Review what you're committing
- [ ] Write clear commit message
- [ ] Push branch and create PR

## 🔄 **Continuous Integration**

The project automatically:
- ✅ Builds on every push
- ✅ Deploys to Vercel when merged to main
- ✅ Runs linting and type checking
- ✅ Shows build status in PRs
