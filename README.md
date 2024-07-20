# Testing Next 14

## Getting Started
To test run:

```bash
npm test
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Files will be uploaded to public/file with uuid to prevent file collision (implement file acl in the future...).

Go to /form to upload a form and /forms to see the list of forms.

### Todo
 - Implement authentication

 - Improve form validation

 - Improve CSS styles

 - Add more guards in API and business logic

 - Fix loopholes in the UX

 - Improve error handling

 - Add more unit and integration tests

 - Implement internationalization (i18n)

 - Optimize performance

 - Add documentation for components and functions