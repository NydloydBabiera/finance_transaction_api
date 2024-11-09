# Financial/Accounting API

Financial API to setup your accounts and post transactions with entries

## Table of Contents

- [Installation](#installation)
- [Database](#database)
- [Config](#config)
- [Sync Schema](#syncSchema)


## Installation

Instructions on how to install and set up the project. For example:

```
# Clone the repository
git clone https://github.com/username/project-name.git

# Navigate to the project directory
cd project-name

# Install dependencies
npm install
```
## database
```
#create a database in pg_admin
CREATE DATABASE finance_transactions
```
## config env
```
PGUSER = username
PGPASSWORD = password
PGDATABASE = database name
PGHOST = host
PGPORT = database port
PORT = api port
```
## syncSchema
```
npm run dev
```




