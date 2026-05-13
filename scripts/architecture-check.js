const fs = require('fs');
const path = require('path');

function scan(dir, forbiddenPattern, message) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      if (file.name === 'node_modules' || file.name === '.next' || file.name === 'dist') continue;
      scan(fullPath, forbiddenPattern, message);
    } else {
      if (!/\.(js|ts|jsx|tsx)$/.test(file.name)) continue;
      
      const content = fs.readFileSync(fullPath, 'utf8');
      if (forbiddenPattern.test(content)) {
        console.error("❌ ARCHITECTURE VIOLATION:");
        console.error(message);
        console.error("File:", fullPath);
        process.exit(1);
      }
    }
  }
}

console.log("Running Plokitch Architecture Guard...");

// RULE 1: Web cannot import dashboard
scan(
  "apps/web",
  /from\s+['"]@\/apps\/dashboard['"]|from\s+['"]\.\.\/\.\.\/dashboard['"]/,
  "Web App cannot import Dashboard modules"
);

// RULE 2: Dashboard cannot import web
scan(
  "apps/dashboard",
  /from\s+['"]@\/apps\/web['"]|from\s+['"]\.\.\/\.\.\/web['"]/,
  "Dashboard cannot import Web modules"
);

// RULE 3: Legacy admin routes forbidden
scan(
  "apps/web/src",
  /pages\/admin/,
  "Legacy Admin routes must be removed from Web App"
);

// RULE 4: Direct Supabase usage forbidden (except in the designated lib file)
// We skip apps/web/src/lib/supabase.ts as it's the provider
const contentWebSupabase = fs.readFileSync("apps/web/src/lib/supabase.ts", "utf8");
scan(
  ".",
  /supabase\.from\(/,
  "Direct Supabase access is forbidden. Use @plokitch/api-client"
);

console.log("✅ Architecture validation passed");
