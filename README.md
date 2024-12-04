# Financial/Accounting API

Financial API to setup your accounts and post transactions with entries

## Table of Contents

- [Installation](#installation)
- [Database](#database)
- [Config](#config)
- [SyncSchema](#syncSchema)
- [Routes&Body](#routesBody)

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

## Database

```
#create a database in pg_admin
CREATE DATABASE finance_transactions
```

## Config

```
PGUSER = username
PGPASSWORD = password
PGDATABASE = database name
PGHOST = host
PGPORT = database port
PORT = api port
```

## SyncSchema

```
npm run dev
```

## Routes&Body

Chart of Accounts

- Routes

```
POST: http://localhost:7100/accounts/addNewAccount
{
    "account_code":1234,
    "account_name":"test account",
    "description":"for testing purposes",
    "nature_account": "DR"
}
GET: http://localhost:7100/accounts/getAllAccounts
```

Subsidiary Accounts

- Routes

```
POST: http://localhost:7100/subsidiary/addNewSubsidiary
{
    "code": 4141,
    "subsidiary_name": "Nydloyd Babiera",
    "description": "test subsidiary"
}
GET: http://localhost:7100/subsidiary/getAllSubsidiary
```

Subsidiary and Chart of Accounts Matching

- Routes

```
POST: http://localhost:7100/subAccMatching/matchSubsAccount
{
    "account_id": 3,
    "subsidiary_id":1
}
GET: http://localhost:7100/subAccMatching/getAllSubAcctMatching
```

Posting GL entries

- Routes

```
POST: http://localhost:7100/generalLedger/postGlTransactions
{
    {
        "glEntries": [
            {
                "accno": "1242424",
                "accname": "Hocus Pocus",
                "docno": "S23162A",
                "date": "8/8/2030",
                "particulars": "usccus",
                "code": "20362",
                "name": "Systems Administrator III",
                "debit": 7.91,
                "credit": 0
            }
        ]
    }
}

GET: http://localhost:7100/generalLedger/getAllGLtransactions
```
