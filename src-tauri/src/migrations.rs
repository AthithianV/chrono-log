use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "Create Task Table",
            kind: MigrationKind::Up,
            sql: "
                        CREATE TABLE IF NOT EXISTS tasks (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT NOT NULL,
                            details TEXT,
                            lump_sum INTEGER,
                            hourly_rate INTEGER,
                            color TEXT
                        );
                    ",
        },
        Migration {
            version: 2,
            description: "Create Tags Table",
            kind: MigrationKind::Up,
            sql: "
                        CREATE TABLE IF NOT EXISTS tags (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT NOT NULL,
                            details TEXT,
                            color TEXT
                        );
                    ",
        },
        Migration {
            version: 3,
            description: "Create Work Unit Table",
            kind: MigrationKind::Up,
            sql: "
                        CREATE TABLE IF NOT EXISTS work_unit (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            task_id INTEGER,
                            details TEXT,
                            description TEXT NOT NULL,
                            date TEXT,
                            start_time TEXT NOT NULL,
                            end_time TEXT,
                            duration INTEGER NOT NULL,
                            FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
                        );
                    ",
        },
        Migration {
            version: 4,
            description: "Maps Work Unit with Tags",
            kind: MigrationKind::Up,
            sql: "
                    CREATE TABLE IF NOT EXISTS work_unit_tags (
                        work_unit_id INTEGER,
                        tag_id INTEGER,
                        PRIMARY KEY (work_unit_id, tag_id),
                        FOREIGN KEY (work_unit_id) REFERENCES work_unit(id) ON DELETE CASCADE,
                        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
                    );
                ",
        }
    ]
}