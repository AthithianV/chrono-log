use crate::migrator::Migrator;
use dotenvy::dotenv;
use sea_orm::{ConnectionTrait, Database, DbBackend, DbErr, Statement};
use sea_orm_migration::prelude::*;
use std::{env, path::PathBuf};

pub async fn run(app_dir:PathBuf) -> Result<(), DbErr> {
    dotenv().ok();
    let database_url = app_dir.to_str().unwrap_or("").to_string() + "/" + "data.db?mode=rwc";
    let database_name = env::var("DATABASE_NAME").expect("DATABASE_NAME must be set in .env");

    println!("{database_url}");

    let db = Database::connect(format!("sqlite:{}",database_url)).await?;

    let db = &match db.get_database_backend() {
        DbBackend::MySql => {
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("CREATE DATABASE IF NOT EXISTS `{}`;", database_name),
            ))
            .await?;

            let url = format!("{}/{}", database_url, database_name);
            Database::connect(&url).await?
        }
        DbBackend::Postgres => {
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("DROP DATABASE IF EXISTS \"{}\";", database_name),
            ))
            .await?;
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("CREATE DATABASE \"{}\";", database_name),
            ))
            .await?;

            let url = format!("{}/{}", database_url, database_name);
            Database::connect(&url).await?
        }
        DbBackend::Sqlite => db,
    };

    let schema_manager = SchemaManager::new(db); // To investigate the schema

    Migrator::refresh(db).await?;
    assert!(schema_manager.has_table("personalization").await?);
    assert!(schema_manager.has_table("pomodaro").await?);
    assert!(schema_manager.has_table("tag").await?);
    assert!(schema_manager.has_table("task").await?);
    assert!(schema_manager.has_table("task_tag").await?);
    assert!(schema_manager.has_table("workunit").await?);
    assert!(schema_manager.has_table("workunit_tag").await?);

    Ok(())
}
