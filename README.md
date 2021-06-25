# Recoil + Deno POC

This is a POC using recoiljs and Deno with Server Sent Events showing how easy it is to manage list of users online status.

## Usage

### Backend

You just have to install Deno and run the server like

```
deno run --allow-net --allow-read --watch ./backend/index.ts
```

It will start the backend on port 8888. You can change the port in the `./backend/.env` file.

### Frontend

1. Install dependencies (first time only)
  ```
  yarn install
  ```
2. Run
  ```
  yarn start
  ```

It will start the development server onand serve the React app on `http://localhost:3000`.
