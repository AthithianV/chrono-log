use sea_orm_migration::prelude::*;

use super::m_20250312_000001_create_tag_table::Tag;
use super::m_20250312_000001_create_task_table::Task;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m_20250312_000001_create_task_tag_table"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(TaskTag::Table)
                    .col(ColumnDef::new(TaskTag::TaskId).integer().not_null())
                    .col(ColumnDef::new(TaskTag::TagId).integer().not_null())
                    .primary_key(Index::create().col(TaskTag::TaskId).col(TaskTag::TagId))
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-workunit_tag-workunit")
                            .from(TaskTag::Table, TaskTag::TaskId)
                            .to(Task::Table, Task::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-workunit_tag-tag")
                            .from(TaskTag::Table, TaskTag::TagId)
                            .to(Tag::Table, Tag::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    // Define how to rollback this migration: Drop the TaskTag table.
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(TaskTag::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
pub enum TaskTag {
    Table,
    TaskId,
    TagId,
}
