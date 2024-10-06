# MERN Project

## Installation

```bash
git clone https://github.com/deJames-13/MERNApp-Project --depth=1 your_project_name
cd your_project_name 
```

**Install Dependencies**
_App Dependencies_
```bash
npm i
```
_Client Dependencies_
1. Go to `client` folder
2. Install packages
```bash
cd client
npm i
```
3. Copy .env.example file to .env
4. Fill up .env variables
```bash
cp .env.example .env
```


_Server Dependencies_
1. Go to `server` folder
2. Install packages
```bash
cd server
npm i
```
3. Copy .env.example file to .env
4. Fill up .env variables
```bash
cp .env.example .env
```

## Running APP
1. Run at the same time
_From project folder_
Run `npm run dev` to run both `client` and `server` at the same time.

2. Run separately
_From client folder_
Run `npm run dev` to run `client` only

_From server folder_
Run `npm run server` to run `server` only

## Troubleshooting
1. Legacy dependency errors

  _When encountering errors in dependencies,_ just run the command again with --force or --legacy-peer-deps
  Example: `npm i --force` or npm i `--legacy-peer-deps`
  ![image](https://github.com/user-attachments/assets/97f0ccac-1348-4386-b9f5-af20f881107f)

  Or set the global config to true for all legacy peer dependencies

  `npm -g config set legacy-peer-deps=true`

