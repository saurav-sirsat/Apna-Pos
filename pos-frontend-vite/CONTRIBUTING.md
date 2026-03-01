# 🤝 Contributing to Apna POS

Thank you for your interest in contributing to Apna POS! This guide will help you get started with contributing to our modern Point of Sale system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of React, Redux, and modern JavaScript

### Setup Development Environment
```bash
# Fork the repository
git fork https://github.com/yourusername/apna-pos.git

# Clone your fork
git clone https://github.com/YOUR_USERNAME/apna-pos.git
cd apna-pos

# Add upstream remote
git remote add upstream https://github.com/yourusername/apna-pos.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Development Workflow

### 1. Create a Feature Branch
```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Follow the existing code style
- Write clean, readable code
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes
```bash
# Run tests
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check
```

### 4. Commit Your Changes
```bash
# Stage your changes
git add .

# Commit with conventional message
git commit -m "feat: add new payment method"
```

### 5. Push and Create Pull Request
```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
```

## 📝 Code Style Guidelines

### JavaScript/React
- Use ES6+ features
- Follow Airbnb style guide
- Use functional components with hooks
- Prefer arrow functions
- Use descriptive variable names

### Example Component
```jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const MyComponent = ({ title, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </div>
  );
};

export default MyComponent;
```

### CSS/Styling
- Use TailwindCSS classes
- Follow mobile-first approach
- Use semantic class names
- Avoid inline styles

### Redux/State Management
- Use Redux Toolkit
- Create feature-based slices
- Use async thunks for API calls
- Handle loading and error states

## 🧪 Testing Guidelines

### Unit Tests
- Test components in isolation
- Mock external dependencies
- Test happy path and edge cases
- Aim for high code coverage

### Example Test
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onSave when button is clicked', () => {
    const mockOnSave = jest.fn();
    render(<MyComponent title="Test" onSave={mockOnSave} />);
    
    fireEvent.click(screen.getByText('Save'));
    expect(mockOnSave).toHaveBeenCalled();
  });
});
```

## 📝 Commit Message Convention

We use conventional commits for better changelog generation:

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples
```bash
feat(cashier): add split payment functionality
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
test(products): add unit tests for product CRUD
```

## 🏗️ Project Structure

### Adding New Pages
1. Create component in appropriate `src/pages/` directory
2. Add route in corresponding `src/routes/` file
3. Update navigation if needed
4. Add tests and documentation

### Adding New Components
1. Create component in `src/components/` or `src/components/ui/`
2. Export from index file if needed
3. Add tests in `__tests__/` directory
4. Update component documentation

### Adding New Redux Features
1. Create slice in `src/Redux Toolkit/features/`
2. Export actions and selectors
3. Add thunks for async operations
4. Update store configuration

## 🐛 Bug Reports

### Before Creating an Issue
- Check existing issues for duplicates
- Ensure you're using the latest version
- Try to reproduce in a clean environment

### Issue Template
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10, macOS 12.0]
- Browser: [e.g., Chrome 91, Firefox 89]
- Version: [e.g., v1.2.0]

## Additional Context
Any other relevant information
```

## ✨ Feature Requests

### Request Template
```markdown
## Feature Description
Clear description of the feature you'd like to see

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How do you envision this feature working?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Any other relevant information
```

## 🎯 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests pass
- [ ] No linting errors

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review performed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 🏷️ Labels

We use these labels for issues and PRs:

### Issue Labels
- `bug`: Bug reports
- `enhancement`: Feature requests
- `documentation`: Documentation issues
- `good first issue`: Good for newcomers
- `help wanted`: Community help needed

### PR Labels
- `ready for review`: Ready for team review
- `work in progress`: Still being developed
- `needs changes`: Requires modifications
- `merged`: Successfully merged

## 🚀 Release Process

### Version Bumping
We follow semantic versioning:
- `MAJOR`: Breaking changes
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes (backward compatible)

### Release Steps
1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to production
5. Announce changes

## 📞 Getting Help

### Discord Community
Join our Discord server for real-time help and discussions.

### GitHub Discussions
Use GitHub Discussions for questions, ideas, and community support.

### Documentation
Check our comprehensive documentation for guides and API reference.

## 🙏 Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Annual contributor highlights
- Special contributor badges

Thank you for contributing to Apna POS! Your contributions help make modern retail management accessible to everyone. 🎉
