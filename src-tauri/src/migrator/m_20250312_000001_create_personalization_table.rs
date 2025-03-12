use sea_orm_migration::prelude::*;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m_20250312_000001_create_personalization_table"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Personalization::Table)
                    .col(
                        ColumnDef::new(Personalization::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(Personalization::Theme)
                            .enumeration(Theme::Table, [Theme::Light, Theme::Dark, Theme::System]),
                    )
                    .col(ColumnDef::new(Personalization::AccentColor).string())
                    .col(ColumnDef::new(Personalization::FirstDayOfWeek).enumeration(
                        FirstDayOfWeek::Table,
                        [
                            FirstDayOfWeek::Sunday,
                            FirstDayOfWeek::Monday,
                            FirstDayOfWeek::Tuesday,
                            FirstDayOfWeek::Wednesday,
                            FirstDayOfWeek::Thursday,
                            FirstDayOfWeek::Friday,
                            FirstDayOfWeek::Saturday,
                        ],
                    ))
                    .col(ColumnDef::new(Personalization::TimeSpanFormat).enumeration(
                        TimeFormat::Table,
                        [
                            TimeFormat::HoursMinutes,
                            TimeFormat::HoursMinutesSeconds,
                            TimeFormat::HHMM,
                            TimeFormat::HHMMSS,
                            TimeFormat::DecimalHours,
                            TimeFormat::TotalMinutes,
                        ],
                    ))
                    .col(
                        ColumnDef::new(Personalization::ShowStartAndStopTime)
                            .boolean()
                            .not_null()
                            .default(0),
                    )
                    .to_owned(),
            )
            .await?;

        manager
        .get_connection()
        .execute_unprepared(
            "INSERT INTO personalization (theme, accent_color, first_day_of_week, time_span_format, show_start_and_stop_time) 
            VALUES ('Light', 'blue', 'Monday', 'HHMM', 1);"
        )
        .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Personalization::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
pub enum Personalization {
    Table,
    Id,
    Theme,
    AccentColor,
    FirstDayOfWeek,
    TimeSpanFormat,
    ShowStartAndStopTime,
}

// Define Theme Enum
#[derive(Iden)]
pub enum Theme {
    Table,
    Light,
    Dark,
    System,
}

// Define FirstDayOfWeek Enum
#[derive(Iden)]
pub enum FirstDayOfWeek {
    Table,
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

#[derive(Iden)]
pub enum TimeFormat {
    Table,
    HoursMinutes,        // "10 h 33 min"
    HoursMinutesSeconds, // "10 h 33 min 5 sec"
    HHMM,                // "10:33"
    HHMMSS,              // "10:33:05"
    DecimalHours,        // "10.55"
    TotalMinutes,        // "633 min"
}
