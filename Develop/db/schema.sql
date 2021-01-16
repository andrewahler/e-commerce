-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;
SHOW {DATABASES | SCHEMAS}
    [LIKE 'pattern' | WHERE expr],

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;
CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
    [create_option] ...

create_option: [DEFAULT] {
    CHARACTER SET [=] charset_name
  | COLLATE [=] collation_name
}


