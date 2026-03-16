# MemoryBook 📸 ✨
A lightweight, interactive Web App powered by **Google Apps Script** that transforms a Google Sheet into a digital memory board. Guests can upload messages, photos, and audio clips directly from their smartphones during any event (weddings, graduations, parties, etc.).

## 🌟 Features
- **Multimedia Uploads:** Supports text messages, images, and audio files.
- **Serverless Architecture:** No external hosting required; runs entirely on Google’s infrastructure.
- **Transparent Database:** All entries are saved in a **Google Sheet** for easy management and export.
- **Cloud Storage:** Media files are securely stored in a designated **Google Drive** folder.
- **Fully Responsive:** Mobile-first design, perfect for access via QR codes at event venues.

## 🛠️ Requirements
- A Google Account.
- A Google Spreadsheet.
- A dedicated folder on Google Drive.

## 🚀 Quick Setup
1. **Prepare Files:**
   - Create a folder on **Google Drive** to store uploaded media.
   - Create a new **Google Sheet**.

2. **Setup Script:**
   - From your Google Sheet, go to `Extensions` > `Apps Script`.
   - Paste the content of `Code.gs` into the editor.
   - Create a new HTML file in the editor, name it `Index`, and paste the content of `Index.html`.

3. **Configure IDs:**
   - In `Code.gs`, replace `FOLDER_ID` and `SHEET_ID` with the unique IDs found in the URLs of your Drive folder and Spreadsheet.

## 📁 Project Structure
- `Code.gs`: Handles the backend logic (Google API communication, Base64 file parsing, and row insertion).
- `Index.html`: Contains the frontend UI, CSS styling, and client-side logic for dynamic message rendering.

## 📝 Privacy & Permissions
To ensure the media board displays images correctly, the destination Google Drive folder should be set to "Anyone with the link can view," or the script handles sharing permissions automatically as per the current code logic.
