use sea_orm_migration::prelude::*;

use super::m_20250312_000001_create_tag_table::Tag;
use super::m_20250312_000001_create_workunit_table::Workunit;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m_20250312_000001_create_workunit_tag_table"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(WorkunitTag::Table)
                    .col(ColumnDef::new(WorkunitTag::WorkunitId).integer().not_null())
                    .col(ColumnDef::new(WorkunitTag::TagId).integer().not_null())
                    .primary_key(
                        Index::create()
                            .col(WorkunitTag::WorkunitId)
                            .col(WorkunitTag::TagId),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-workunit_tag-workunit")
                            .from(WorkunitTag::Table, WorkunitTag::WorkunitId)
                            .to(Workunit::Table, Workunit::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-workunit_tag-tag")
                            .from(WorkunitTag::Table, WorkunitTag::TagId)
                            .to(Tag::Table, Tag::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    // Define how to rollback this migration: Drop the WorkunitTag table.
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(WorkunitTag::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
pub enum WorkunitTag {
    Table,
    WorkunitId,
    TagId,
}
