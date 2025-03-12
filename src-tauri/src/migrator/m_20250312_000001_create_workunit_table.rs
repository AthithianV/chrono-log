use sea_orm_migration::prelude::*;

use super::m_20250312_000001_create_task_table::Task;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m_20250312_000001_create_workunit_table"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Workunit::Table)
                    .col(
                        ColumnDef::new(Workunit::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Workunit::TaskId).integer().not_null())
                    .col(ColumnDef::new(Workunit::Details).string())
                    .col(ColumnDef::new(Workunit::Description).string())
                    .col(ColumnDef::new(Workunit::Date).date().not_null())
                    .col(ColumnDef::new(Workunit::StartTime).date_time().not_null())
                    .col(ColumnDef::new(Workunit::EndTime).date_time())
                    .col(
                        ColumnDef::new(Workunit::SessionDuration)
                            .integer()
                            .not_null()
                            .default(0),
                    )
                    .col(
                        ColumnDef::new(Workunit::BreakDuration)
                            .integer()
                            .not_null()
                            .default(0),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-workuint-task_id")
                            .from(Workunit::Table, Workunit::TaskId)
                            .to(Task::Table, Task::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Workunit::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
pub enum Workunit {
    Table,
    Id,
    TaskId,
    Details,
    Description,
    Date,
    StartTime,
    EndTime,
    SessionDuration,
    BreakDuration,
}
