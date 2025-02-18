use tauri_plugin_log::{Target, TargetKind, TimezoneStrategy};
use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
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
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                .target(Target::new(TargetKind::LogDir {
                    file_name: Some("logs".to_string()),
                }))
                .timezone_strategy(TimezoneStrategy::UseLocal)
                .build(),
        )
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:app.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
