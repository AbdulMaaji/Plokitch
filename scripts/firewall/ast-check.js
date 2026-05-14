const { Project } = require("ts-morph");
const path = require("path");

const project = new Project();
project.addSourceFilesAtPaths("apps/**/*.{ts,tsx,js,jsx}");

const webFiles = project.getSourceFiles("apps/web/**");
const dashboardFiles = project.getSourceFiles("apps/dashboard/**");

function checkCrossImports(files, forbiddenPath, errorMessage) {
  files.forEach(file => {
    file.getImportDeclarations().forEach(imp => {
      const value = imp.getModuleSpecifierValue();

      // Check if it's an absolute import or a relative one going outside the app
      if (value.includes(forbiddenPath)) {
        console.error("❌ ARCHITECTURE VIOLATION:");
        console.error(errorMessage);
        console.error("File:", file.getFilePath());
        process.exit(1);
      }
    });
  });
}

console.log("🚀 Starting AST Architecture Firewall Check...");

// Rule 1: Web App cannot import Dashboard modules
checkCrossImports(
  webFiles,
  "apps/dashboard",
  "Web App cannot import Dashboard modules. Keep concerns separated."
);

// Rule 2: Dashboard cannot import Web App modules
checkCrossImports(
  dashboardFiles,
  "apps/web",
  "Dashboard cannot import Web modules. Use shared packages or API client."
);

// Rule 3: Legacy Admin Page detection in Web App
webFiles.forEach(file => {
  const filePath = file.getFilePath();
  if (filePath.includes("pages/admin") || filePath.includes("app/admin")) {
    console.error("❌ ARCHITECTURE VIOLATION:");
    console.error("Legacy Admin routes detected in Web App. These must be moved to Dashboard.");
    console.error("File:", filePath);
    process.exit(1);
  }
});

// Rule 4: Direct Supabase Access detection
const allFiles = project.getSourceFiles();
allFiles.forEach(file => {
  const filePath = file.getFilePath();
  // We allow it in the designated client and api files only
  if (
    filePath.endsWith("supabase.ts") || 
    filePath.endsWith("auth-client.ts") ||
    filePath.includes("src/lib/api")
  ) return;

  const content = file.getFullText();
  if (content.includes("supabase.from(")) {
    console.error("❌ ARCHITECTURE VIOLATION:");
    console.error("Direct Supabase access detected. You must use the unified @plokitch/api-client.");
    console.error("File:", filePath);
    process.exit(1);
  }
});

console.log("✅ AST Architecture Check Passed Successfully");
