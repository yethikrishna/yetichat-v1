#!/usr/bin/env node

/**
 * Repository Verification Script
 * 
 * This script verifies that the Yetichat repository is ready for GitHub publication.
 * It checks for required files, proper gitignore configuration, and documentation completeness.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class RepositoryVerifier {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = 0;
    this.total = 0;
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  check(condition, successMessage, errorMessage, isWarning = false) {
    this.total++;
    if (condition) {
      this.passed++;
      this.log(`✅ ${successMessage}`, 'green');
      return true;
    } else {
      if (isWarning) {
        this.warnings.push(errorMessage);
        this.log(`⚠️  ${errorMessage}`, 'yellow');
      } else {
        this.errors.push(errorMessage);
        this.log(`❌ ${errorMessage}`, 'red');
      }
      return false;
    }
  }

  fileExists(filePath) {
    return fs.existsSync(path.join(process.cwd(), filePath));
  }

  readFile(filePath) {
    try {
      return fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
    } catch (error) {
      return null;
    }
  }

  checkFileContent(filePath, searchString, description) {
    const content = this.readFile(filePath);
    if (!content) return false;
    return content.includes(searchString);
  }

  runCommand(command) {
    try {
      return execSync(command, { encoding: 'utf8', cwd: process.cwd() });
    } catch (error) {
      return '';
    }
  }

  verify() {
    this.log('\n🔍 Verifying Yetichat Repository...', 'bold');
    this.log('=====================================\n', 'blue');

    // Essential Files Check
    this.log('📁 Essential Files:', 'bold');
    this.check(this.fileExists('package.json'), 'package.json exists', 'Missing package.json');
    this.check(this.fileExists('README.md'), 'README.md exists', 'Missing README.md');
    this.check(this.fileExists('LICENSE'), 'LICENSE file exists', 'Missing LICENSE file');
    this.check(this.fileExists('.gitignore'), '.gitignore exists', 'Missing .gitignore');
    this.check(this.fileExists('.env.example'), '.env.example exists', 'Missing .env.example');

    // Security Check
    this.log('\n🔒 Security Check:', 'bold');
    
    // Check if .env is tracked by git (this is the real security concern)
    const gitStatus = this.runCommand('git ls-files .env').trim();
    this.check(gitStatus === '', '.env file is not tracked by Git', '.env file should not be committed to Git');
    
    const gitignoreContent = this.readFile('.gitignore');
    this.check(
      gitignoreContent && gitignoreContent.includes('.env'),
      '.env is in .gitignore',
      '.env file is not ignored in .gitignore'
    );

    // Documentation Check
    this.log('\n📚 Documentation:', 'bold');
    this.check(this.fileExists('docs/SETUP.md'), 'Setup guide exists', 'Missing docs/SETUP.md');
    this.check(this.fileExists('docs/DEPLOYMENT.md'), 'Deployment guide exists', 'Missing docs/DEPLOYMENT.md');
    this.check(this.fileExists('docs/GITHUB_SETUP.md'), 'GitHub setup guide exists', 'Missing docs/GITHUB_SETUP.md');

    // Screenshots Check
    this.log('\n📸 Screenshots:', 'bold');
    const screenshotDir = 'docs/screenshots';
    this.check(this.fileExists(screenshotDir), 'Screenshots directory exists', 'Missing screenshots directory');
    
    const requiredScreenshots = [
      'yetichat_login_screen.png',
      'yetichat_final_functional_app.png',
      'conversations_tab.png',
      'users_tab.png',
      'groups_tab.png',
      'settings_tab.png'
    ];

    requiredScreenshots.forEach(screenshot => {
      this.check(
        this.fileExists(`${screenshotDir}/${screenshot}`),
        `Screenshot ${screenshot} exists`,
        `Missing screenshot: ${screenshot}`,
        true
      );
    });

    // Package.json Verification
    this.log('\n📦 Package Configuration:', 'bold');
    const packageJson = this.readFile('package.json');
    if (packageJson) {
      const pkg = JSON.parse(packageJson);
      this.check(pkg.name === 'yetichat', 'Package name is "yetichat"', 'Package name should be "yetichat"');
      this.check(pkg.description && pkg.description.length > 20, 'Package has good description', 'Package description is missing or too short');
      this.check(pkg.keywords && pkg.keywords.includes('cometchat'), 'Package includes relevant keywords', 'Package should include CometChat in keywords');
      this.check(pkg.license === 'MIT', 'License is set to MIT', 'License should be MIT');
    }

    // README Content Check
    this.log('\n📄 README Content:', 'bold');
    const readmeContent = this.readFile('README.md');
    if (readmeContent) {
      this.check(
        readmeContent.includes('# 🐾 Yetichat'),
        'README has proper title',
        'README should start with "# 🐾 Yetichat"'
      );
      this.check(
        readmeContent.includes('Live Demo'),
        'README includes live demo section',
        'README should include live demo link'
      );
      this.check(
        readmeContent.includes('screenshots'),
        'README references screenshots',
        'README should include screenshots section'
      );
      this.check(
        readmeContent.includes('CometChat'),
        'README mentions CometChat',
        'README should mention CometChat integration'
      );
    }

    // Source Code Structure
    this.log('\n🏗️  Source Code Structure:', 'bold');
    this.check(this.fileExists('src/App.tsx'), 'Main App component exists', 'Missing src/App.tsx');
    this.check(this.fileExists('src/components'), 'Components directory exists', 'Missing src/components');
    this.check(this.fileExists('src/hooks'), 'Hooks directory exists', 'Missing src/hooks');
    this.check(this.fileExists('src/services'), 'Services directory exists', 'Missing src/services');
    this.check(this.fileExists('src/services/cometchat.ts'), 'CometChat service exists', 'Missing CometChat service file');

    // Build Configuration
    this.log('\n⚙️  Build Configuration:', 'bold');
    this.check(this.fileExists('vite.config.ts'), 'Vite config exists', 'Missing vite.config.ts');
    this.check(this.fileExists('tsconfig.json'), 'TypeScript config exists', 'Missing tsconfig.json');
    this.check(this.fileExists('tailwind.config.js'), 'Tailwind config exists', 'Missing tailwind.config.js');

    // Git Configuration
    this.log('\n🌳 Git Configuration:', 'bold');
    this.check(this.fileExists('.git'), 'Git repository initialized', 'Git repository not initialized');

    // Display Results
    this.displayResults();
  }

  displayResults() {
    this.log('\n' + '='.repeat(50), 'blue');
    this.log('📊 VERIFICATION SUMMARY', 'bold');
    this.log('='.repeat(50), 'blue');

    this.log(`\n✅ Passed: ${this.passed}/${this.total}`, this.passed === this.total ? 'green' : 'yellow');
    
    if (this.warnings.length > 0) {
      this.log(`⚠️  Warnings: ${this.warnings.length}`, 'yellow');
    }
    
    if (this.errors.length > 0) {
      this.log(`❌ Errors: ${this.errors.length}`, 'red');
    }

    if (this.errors.length > 0) {
      this.log('\n🚨 ERRORS TO FIX:', 'red');
      this.errors.forEach((error, index) => {
        this.log(`${index + 1}. ${error}`, 'red');
      });
    }

    if (this.warnings.length > 0) {
      this.log('\n⚠️  WARNINGS (Optional improvements):', 'yellow');
      this.warnings.forEach((warning, index) => {
        this.log(`${index + 1}. ${warning}`, 'yellow');
      });
    }

    // Final verdict
    if (this.errors.length === 0) {
      this.log('\n🎉 REPOSITORY IS READY FOR GITHUB!', 'green');
      this.log('You can now create your GitHub repository and push the code.', 'green');
      this.log('\nNext steps:', 'bold');
      this.log('1. Create GitHub repository: gh repo create yetichat --public', 'blue');
      this.log('2. Add remote: git remote add origin https://github.com/YOUR_USERNAME/yetichat.git', 'blue');
      this.log('3. Push code: git push -u origin main', 'blue');
    } else {
      this.log('\n❌ REPOSITORY NEEDS FIXES BEFORE GITHUB PUBLICATION', 'red');
      this.log('Please fix the errors listed above before proceeding.', 'red');
    }

    this.log('\n📖 For detailed setup instructions, see docs/GITHUB_SETUP.md\n', 'blue');
  }
}

// Run verification if this script is called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const verifier = new RepositoryVerifier();
  verifier.verify();
}

export default RepositoryVerifier;
