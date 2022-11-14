# Nextjs InyerM - Shop

This is a Nextjs project that allows you to manage your finances

## Getting Started

### Run db

```bash
docker-compose up -d
```

### MongoDB connection string

```bash
mongodb://localhost:27017/finanzdb
```

### Generate random info in database

Use the following endpoint to generate random info in database

```bash
curl --location --request POST 'http://localhost:3000/api/seed'
```

### Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Run the production server

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
