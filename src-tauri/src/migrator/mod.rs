use sea_orm_migration::prelude::*;

mod m_20250312_000001_create_personalization_table;
mod m_20250312_000001_create_pomodaro_table;
mod m_20250312_000001_create_tag_table;
mod m_20250312_000001_create_task_table;
mod m_20250312_000001_create_task_tag_table;
mod m_20250312_000001_create_workunit_table;
mod m_20250312_000001_create_workunit_tag_table;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m_20250312_000001_create_task_table::Migration),
            Box::new(m_20250312_000001_create_tag_table::Migration),
            Box::new(m_20250312_000001_create_workunit_table::Migration),
            Box::new(m_20250312_000001_create_workunit_tag_table::Migration),
            Box::new(m_20250312_000001_create_pomodaro_table::Migration),
            Box::new(m_20250312_000001_create_task_tag_table::Migration),
            Box::new(m_20250312_000001_create_personalization_table::Migration),
        ]
    }
}
