# Asana App Data Schema

## users


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| fullName | VARCHAR(55) | not null |
| email | VARCHAR(55) | not null |
| picUrl | VARCHAR |  |
| hashedPassword | VARCHAR | not null (binary) |
| tokenId | VARCHAR(36) |  |
| createdAt | timestamp | not null |
| updatedAt | timestamp | not null |

## teams

| attribute name | data type | details
| - | - | - |
| id | integer | not null, primary key |
| name | VARCHAR(55) | not null |
| creatorId | integer |  |

## projects


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| name | VARCHAR(55) | not null |
| description | TEXT | |
| creatorId | integer | not null, foreign key
| teamId | integer | not null, foreign key |
| createdAt | timestamp | not null |
| updatedAt | timestamp | not null |

## tasks

| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| name | VARCHAR(55) | not null |
| description | text | |
| deadline | DATE | |
| projectId | INTEGER | not null, foreign key |
| assigneeId | INTEGER | not null, foreign key |
| creatorId | INTEGER | not null, foreign key |
| completed | boolean | not null, default: false |
| createdAt | timestamp | not null |
| updatedAt | timestamp | not null |

## memberships

| attribute name | data type | details
| - | - | - |
| id | integer | not null, primary key |
| teamId | integer | not null (ref task) |
| userId | integer | not null (ref user) |

## comments

| attribute name | data type | details
| - | - | - |
| id | integer | not null, primary key |
| body | VARCHAR(255) | not null |
| userId | integer | not null, foreign key |
| taskId | integer | not null, foreign key |
| createdAt | timestamp | not null |
| updatedAt | timestamp | not null |
