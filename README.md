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

2. **Hosts File Update**:
   - Open your hosts file. You can follow this [guide to open the hosts file](https://docs.rackspace.com/docs/modify-your-hosts-file).
   - Add the following line to the end of the file:
     ```plaintext
     127.0.0.1       dev.realdevsquad.com
     ```
   - Save the changes and exit.

3. **Install Dependencies**:
    ```sh
    npm i
    ```

4. **Run the Development Server**:
    ```sh
    npm run dev
    ```

5. **Run Tests**:
    ```sh
    npm run test
    ```

