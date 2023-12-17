// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn is_desktop() -> bool {
    #[cfg(any(target_os = "linux", target_os = "windows", target_os = "macos"))]
    {
        true
    }
    #[cfg(any(target_os = "android", target_os = "ios"))]
    {
        false
    }

}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![is_desktop])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
