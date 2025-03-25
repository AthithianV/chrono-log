use tauri::Manager;
use tauri_plugin_log::{Target, TargetKind, TimezoneStrategy};
mod initiate_db;
mod migrator;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                .target(Target::new(TargetKind::LogDir {
                    file_name: Some("logs".to_string()),
                }))
                .timezone_strategy(TimezoneStrategy::UseLocal)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_dir = app.path().app_data_dir().unwrap();
            println!("I am App Set up");

            // Use the existing async runtime to spawn the database initialization
            let app_dir_clone = app_dir.clone();
            tauri::async_runtime::spawn(async move {
                match initiate_db::run(app_dir_clone).await {
                    Ok(_) => println!("Database initiated successfully"),
                    Err(e) => eprintln!("Failed to initiate database: {:?}", e),
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
