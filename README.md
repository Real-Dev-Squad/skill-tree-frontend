# Frontend for Skill-tree 
Display the skills a user has and the endorsements created for adding new skills to users profile

## Production URL
- [https://skills.realdevsquad.com/](https://skills.realdevsquad.com/)

## Staging URL
- [https://staging-skilltree.realdevsquad.com/](https://staging-skilltree.realdevsquad.com/)

## Tech Stack:
- [NextJs v14.24 (Reactjs)](https://nextjs.org/)
- [react-query](https://tanstack.com/query/v3/)
- [Vitest](https://vitest.dev/)
- [Msw](https://mswjs.io/)

## Setup and running locally

### Prerequisites
#### Volta
- [Why Volta?](https://docs.volta.sh/guide/#why-volta)
- To install Volta, please follow this [Guide](https://docs.volta.sh/guide/getting-started)

#### Node.js
- Version - 20.11.1
- Install Node.js using the following command:
    ```sh
      volta install node@20.11.1
    ``` 

### Setup

1. **Environment Setup**:
   - Create a file named `env.local` in the root directory.
   - Copy the contents of `env.sample` and paste them into `env.local`.

2. **Setup locally**:
   - Setup `dev.realdevsquad.com` for development using the instructions here - [Avoiding CORS during development](https://github.com/Real-Dev-Squad/website-code-docs/tree/main/docs/dev/https-dev-url-cors)

3. **Install Dependencies**:
    ```sh
    npm i
    ```

4. **Run the Development Server**:
    ```sh
    npm run dev
    ```
5. **Go to Website**:
   https://dev.realdevsquad.com      

### Testing

- To run tests run the following command:
  
    ```sh
    npm run test
    ```

