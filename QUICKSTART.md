# Quick Start Guide - SCF Comparison Calculator

## Deploying to Netlify (Recommended)

### Option 1: Netlify Drop (Fastest - No Git Required)

1. **Build the project locally:**
   ```bash
   cd scf-comparison
   npm install
   npm run build
   ```

2. **Go to Netlify Drop:**
   - Visit: https://app.netlify.com/drop
   - Drag and drop the `dist` folder
   - Your site will be live in seconds!

### Option 2: Netlify CLI

1. **Install Netlify CLI (one time only):**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   cd scf-comparison
   npm install
   netlify deploy --prod
   ```

3. **Follow the prompts:**
   - Login to Netlify if needed
   - Create a new site or link to existing
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: Connect to Git Repository

1. **Push to GitHub/GitLab/Bitbucket:**
   ```bash
   cd scf-comparison
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect on Netlify:**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose your repository
   - Build settings are pre-configured in `netlify.toml`
   - Click "Deploy site"

## Local Development

```bash
# Navigate to project
cd scf-comparison

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## Testing Before Deployment

```bash
# Build production version
npm run build

# Preview production build
npm run preview

# Open browser to http://localhost:4173
```

## Verifying the Deployment

After deployment, test these features:

1. ✅ Both panels (Inputs and Comparison) load correctly
2. ✅ Prima Trade logo displays
3. ✅ All sliders and inputs work
4. ✅ Values persist when you refresh the page
5. ✅ Calculations update in real-time
6. ✅ Print/PDF export works
7. ✅ Responsive design works on mobile

## Customization Tips

### Change Default Values
Edit `src/SCFComparison.jsx` and modify the second parameter in `loadSavedValue()` calls:
```javascript
const [totalProcurementSpend, setTotalProcurementSpend] = useState(() => 
  loadSavedValue('totalProcurementSpend', 1800)  // Change 1800 to your default
);
```

### Change Branding
- Replace `public/240417_PTS_red_logo.png` with your logo
- Update colors in the component (search for `#D64933` and `#F08070`)

### Adjust Calculations
All calculation logic is in the `SCFComparison.jsx` file under the `// ===== CALCULATIONS =====` section.

## Common Issues

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails
Check Node.js version (requires 18+):
```bash
node --version
npm run build
```

### Styles not loading
Ensure all config files are present:
- `tailwind.config.js`
- `postcss.config.js`
- `vite.config.js`

## Performance Tips

The app is already optimized with:
- Code splitting (React and icons in separate chunks)
- LocalStorage for instant load of saved values
- Efficient re-renders using React state management
- Production builds use esbuild minification

## Next Steps

1. Deploy the application
2. Share the URL with your team
3. Customize default values for your use case
4. Export PDFs for client presentations

## Support

For technical issues or questions:
- Email: tim.nicolle@prima.trade
- Check README.md for detailed documentation

---

**Pro Tip**: Use the Netlify CLI's `--open` flag to automatically open your deployed site:
```bash
netlify deploy --prod --open
```
