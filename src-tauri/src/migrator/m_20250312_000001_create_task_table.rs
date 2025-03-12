use sea_orm_migration::prelude::*;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m_20250312_000001_create_task_table"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Task::Table)
                    .col(
                        ColumnDef::new(Task::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Task::Name).string().not_null())
                    .col(ColumnDef::new(Task::Details).string())
                    .col(ColumnDef::new(Task::LumpSum).integer())
                    .col(ColumnDef::new(Task::HourlyRate).integer())
                    .col(ColumnDef::new(Task::Color).string())
                    .col(ColumnDef::new(Task::Hidden).boolean().not_null().default(0))
                    .col(ColumnDef::new(Task::Default).boolean().not_null().default(0))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Task::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
pub enum Task {
    Table,
    Id,
    Name,
    Details,
    LumpSum,
    HourlyRate,
    Color,
    Hidden,
    Default,
}
