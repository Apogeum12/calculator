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

use evalexpr::eval;
#[tauri::command]
fn processing_formula(formula: String) -> Option<String> {
    match eval(&formula) {
        Ok(equal) => {
            match equal.as_number() {
                Ok(cos) => Some(cos.to_string()),
                Err(_) => None
            }
        },
        Err(_) => None

    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![is_desktop, processing_formula])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
