use sea_orm_migration::prelude::*;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m_20250312_000001_create_pomodaro_table"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Pomodaro::Table)
                    .col(
                        ColumnDef::new(Pomodaro::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::Conversion)
                            .integer()
                            .not_null()
                            .default(60),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::SessionDuration)
                            .integer()
                            .not_null()
                            .default(25),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::SessionCount)
                            .integer()
                            .not_null()
                            .default(4),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::BreakDuration)
                            .integer()
                            .not_null()
                            .default(5),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::MaxSessionDuration)
                            .integer()
                            .not_null()
                            .default(120),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::MinSessionDuration)
                            .integer()
                            .not_null()
                            .default(5),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::MaxBreakDuration)
                            .integer()
                            .not_null()
                            .default(30),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::MinBreakDuration)
                            .integer()
                            .not_null()
                            .default(1),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::MaxSessionCount)
                            .integer()
                            .not_null()
                            .default(10),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::MinSessionCount)
                            .integer()
                            .not_null()
                            .default(1),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::AutoStart)
                            .boolean()
                            .not_null()
                            .default(1),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::SyncWithTimeTracking)
                            .boolean()
                            .not_null()
                            .default(1),
                    )
                    .col(
                        ColumnDef::new(Pomodaro::NotificationSound)
                            .boolean()
                            .not_null()
                            .default(1),
                    )
                    .to_owned(),
            )
            .await?;

        manager
            .get_connection()
            .execute_unprepared("INSERT INTO pomodaro DEFAULT VALUES;")
            .await?;

        Ok(())
    }

    // Define how to rollback this migration: Drop the Pomodaro table.
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Pomodaro::Table).to_owned())
            .await
    }
}

// For ease of access
#[derive(Iden)]
pub enum Pomodaro {
    Table,
    Id,
    Conversion,
    SessionDuration,
    SessionCount,
    BreakDuration,
    MaxSessionDuration,
    MinSessionDuration,
    MaxBreakDuration,
    MinBreakDuration,
    MaxSessionCount,
    MinSessionCount,
    AutoStart,
    SyncWithTimeTracking,
    NotificationSound,
}
