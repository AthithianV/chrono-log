use sea_orm_migration::prelude::*;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m_20250312_000001_create_tag_table"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Tag::Table)
                    .col(
                        ColumnDef::new(Tag::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Tag::Name).string().not_null())
                    .col(ColumnDef::new(Tag::Details).string())
                    .col(ColumnDef::new(Tag::Color).integer().not_null())
                    .to_owned(),
            )
            .await
    }

    // Define how to rollback this migration: Drop the Tag table.
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Tag::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
pub enum Tag {
    Table,
    Id,
    Name,
    Details,
    Color,
}
