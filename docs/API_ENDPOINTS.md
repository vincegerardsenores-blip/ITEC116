# Production Monitoring and Inventory Management System — API Reference

## 5. REST API Design


### 5.1 Conventions

- Base URL: http://localhost:3000/api — all bodies are JSON.
- Resource-oriented plural URIs; HTTP verbs express the action (GET read, POST create, PATCH update, DELETE remove).
- Protected routes require the header Authorization: Bearer <access_token>.
- Errors share one shape: {"statusCode": 400, "message": "...", "error": "Bad Request"}.


### 5.2 Endpoint Summary

| Method | Endpoint | JWT | Success | Purpose |
|---|---|---|---|---|
| POST | /api/auth/register | No | 201 | Register a user |
| POST | /api/auth/login | No | 200 | Log in, receive JWT |
| GET | /api/auth/me | Yes | 200 | Current user |
| GET | /api/materials | Yes | 200 | List Material |
| GET | /api/materials/count | Yes | 200 | Count Material |
| GET | /api/materials/:id | Yes | 200 | Get one Material |
| POST | /api/materials | Yes | 201 | Create Material |
| PATCH | /api/materials/:id | Yes | 200 | Update Material |
| DELETE | /api/materials/:id | Yes | 200 | Delete Material |
| GET | /api/work-orders | Yes | 200 | List WorkOrder |
| GET | /api/work-orders/count | Yes | 200 | Count WorkOrder |
| GET | /api/work-orders/:id | Yes | 200 | Get one WorkOrder |
| POST | /api/work-orders | Yes | 201 | Create WorkOrder |
| PATCH | /api/work-orders/:id | Yes | 200 | Update WorkOrder |
| DELETE | /api/work-orders/:id | Yes | 200 | Delete WorkOrder |
| GET | /api/machine-downtimes | Yes | 200 | List MachineDowntime |
| GET | /api/machine-downtimes/count | Yes | 200 | Count MachineDowntime |
| GET | /api/machine-downtimes/:id | Yes | 200 | Get one MachineDowntime |
| POST | /api/machine-downtimes | Yes | 201 | Create MachineDowntime |
| PATCH | /api/machine-downtimes/:id | Yes | 200 | Update MachineDowntime |
| DELETE | /api/machine-downtimes/:id | Yes | 200 | Delete MachineDowntime |
| GET | /api/production-logs | Yes | 200 | List ProductionLog |
| GET | /api/production-logs/count | Yes | 200 | Count ProductionLog |
| GET | /api/production-logs/:id | Yes | 200 | Get one ProductionLog |
| POST | /api/production-logs | Yes | 201 | Create ProductionLog |
| PATCH | /api/production-logs/:id | Yes | 200 | Update ProductionLog |
| DELETE | /api/production-logs/:id | Yes | 200 | Delete ProductionLog |

Total: 27 endpoints (methods used: GET, POST, PATCH, DELETE).


### 5.3 Status Codes

| Code | Meaning in this API |
|---|---|
| 200 OK | Successful read, update, delete, login. |
| 201 Created | Resource or user created. |
| 400 Bad Request | Validation failed, or a referenced foreign-key record does not exist. |
| 401 Unauthorized | Missing, invalid or expired token; wrong login credentials. |
| 404 Not Found | No record with the requested id. |
| 409 Conflict | Duplicate e-mail on register, or deleting a record that is still referenced. |


### 5.4 Authentication Endpoints


#### POST /api/auth/register  →  201 Created

```
Request
{
  "email": "demo@example.com",
  "fullName": "Demo User",
  "password": "Password123"
}

Response
{
  "id": 1,
  "email": "demo@example.com",
  "fullName": "Demo User",
  "role": "user"
}
```

Errors: 400 (invalid e-mail or password shorter than 8 characters), 409 (e-mail already registered).


#### POST /api/auth/login  →  200 OK

```
Request
{
  "email": "demo@example.com",
  "password": "Password123"
}

Response
{
  "access_token": "<JWT>",
  "token_type": "Bearer"
}
```

Errors: 400 (invalid input), 401 (wrong e-mail or password).


#### GET /api/auth/me  →  200 OK   (header: Authorization: Bearer <JWT>)

```
{
  "id": 1,
  "email": "demo@example.com",
  "fullName": "Demo User",
  "role": "user",
  "createdAt": "2026-12-01T09:00:00.000Z"
}
```

Errors: 401 (missing, invalid or expired token).


### 5.5 Resource Endpoints

All resource endpoints require the Bearer token. The examples below are the exact shapes returned by the implementation. Decimal columns are returned by MySQL as strings in read responses; relations are expanded one level in GET responses and shown as {"id": n} in create/update responses.


#### Material  —  /api/materials

| Field | Validation rules | DB column |
|---|---|---|
| materialname | required, string, not empty | MaterialName |
| unit | required, string, not empty | Unit |
| stockqty | required, number, max 2 decimals, min 0 | StockQty |
| reorderlevel | required, number, max 2 decimals, min 0 | ReorderLevel |

```
POST /api/materials   → 201
Request
{
  "materialname": "Sample MaterialName",
  "unit": "Sample Unit",
  "stockqty": 100.0,
  "reorderlevel": 100.0
}

Response
{
  "id": 1,
  "materialname": "Sample MaterialName",
  "unit": "Sample Unit",
  "stockqty": 100.0,
  "reorderlevel": 100.0,
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/materials   → 200  (array)
[
  {
    "id": 1,
    "materialname": "Sample MaterialName",
    "unit": "Sample Unit",
    "stockqty": "100.00",
    "reorderlevel": "100.00",
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/materials/1   → 200
Request
{
  "materialname": "Sample MaterialName (Updated)"
}
```

```
DELETE /api/materials/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/materials/count → 200 {"total": 1}; GET/PATCH/DELETE /api/materials/:id with an unknown id → 404 {"message": "Material not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.


#### WorkOrder  —  /api/work-orders

| Field | Validation rules | DB column |
|---|---|---|
| workordercode | required, string, not empty | WorkOrderCode |
| productname | required, string, not empty | ProductName |
| targetquantity | required, integer, min 0 | TargetQuantity |
| status | required, string, not empty | Status |

```
POST /api/work-orders   → 201
Request
{
  "workordercode": "Sample WorkOrderCode",
  "productname": "Sample ProductName",
  "targetquantity": 1,
  "status": "Sample Status"
}

Response
{
  "id": 1,
  "workordercode": "Sample WorkOrderCode",
  "productname": "Sample ProductName",
  "targetquantity": 1,
  "status": "Sample Status",
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/work-orders   → 200  (array)
[
  {
    "id": 1,
    "workordercode": "Sample WorkOrderCode",
    "productname": "Sample ProductName",
    "targetquantity": 1,
    "status": "Sample Status",
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/work-orders/1   → 200
Request
{
  "workordercode": "Sample WorkOrderCode (Updated)"
}
```

```
DELETE /api/work-orders/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/work-orders/count → 200 {"total": 1}; GET/PATCH/DELETE /api/work-orders/:id with an unknown id → 404 {"message": "WorkOrder not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.


#### MachineDowntime  —  /api/machine-downtimes

| Field | Validation rules | DB column |
|---|---|---|
| machinename | required, string, not empty | MachineName |
| reason | required, string, not empty | Reason |
| starttime | required, ISO-8601 date string | StartTime |
| endtime | optional, ISO-8601 date string | EndTime |
| workorderid (→ WorkOrder) | required, integer, min 1 | WorkOrderID |

```
POST /api/machine-downtimes   → 201
Request
{
  "machinename": "Sample MachineName",
  "reason": "Sample Reason",
  "starttime": "2026-12-01T09:00:00.000Z",
  "endtime": "2026-12-01T09:00:00.000Z",
  "workorderid": 1
}

Response
{
  "id": 1,
  "machinename": "Sample MachineName",
  "reason": "Sample Reason",
  "starttime": "2026-12-01T09:00:00.000Z",
  "endtime": "2026-12-01T09:00:00.000Z",
  "workorder": {
    "id": 1
  },
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/machine-downtimes   → 200  (array)
[
  {
    "id": 1,
    "machinename": "Sample MachineName",
    "reason": "Sample Reason",
    "starttime": "2026-12-01T09:00:00.000Z",
    "endtime": "2026-12-01T09:00:00.000Z",
    "workorder": {
      "id": 1,
      "workordercode": "Sample WorkOrderCode",
      "productname": "Sample ProductName",
      "targetquantity": 1,
      "status": "Sample Status",
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/machine-downtimes/1   → 200
Request
{
  "machinename": "Sample MachineName (Updated)"
}
```

```
DELETE /api/machine-downtimes/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/machine-downtimes/count → 200 {"total": 1}; GET/PATCH/DELETE /api/machine-downtimes/:id with an unknown id → 404 {"message": "MachineDowntime not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.


#### ProductionLog  —  /api/production-logs

| Field | Validation rules | DB column |
|---|---|---|
| quantityproduced | required, integer, min 0 | QuantityProduced |
| downtimeminutes | required, integer, min 0 | DowntimeMinutes |
| loggedat | optional, ISO-8601 date string | LoggedAt |
| workorderid (→ WorkOrder) | required, integer, min 1 | WorkOrderID |

```
POST /api/production-logs   → 201
Request
{
  "quantityproduced": 1,
  "downtimeminutes": 1,
  "loggedat": "2026-12-01T09:00:00.000Z",
  "workorderid": 1
}

Response
{
  "id": 1,
  "quantityproduced": 1,
  "downtimeminutes": 1,
  "loggedat": "2026-12-01T09:00:00.000Z",
  "workorder": {
    "id": 1
  },
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/production-logs   → 200  (array)
[
  {
    "id": 1,
    "quantityproduced": 1,
    "downtimeminutes": 1,
    "loggedat": "2026-12-01T09:00:00.000Z",
    "workorder": {
      "id": 1,
      "workordercode": "Sample WorkOrderCode",
      "productname": "Sample ProductName",
      "targetquantity": 1,
      "status": "Sample Status",
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/production-logs/1   → 200
Request
{
  "quantityproduced": 2
}
```

```
DELETE /api/production-logs/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/production-logs/count → 200 {"total": 1}; GET/PATCH/DELETE /api/production-logs/:id with an unknown id → 404 {"message": "ProductionLog not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.
