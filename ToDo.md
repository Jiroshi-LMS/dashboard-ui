# Feedback Page

- Add User Feedback Page
- View User Feedback Page

# API Docs

- API Docs Pages

# Fixes

- Fix document icon on video resource creation step
- Improve duration storing. int -> float for more precision
- Move some of services functions to repositories folder
- Test Platform under slow internet conditions and stress tests
- Improved Error Handling
- Improvements on the DRY part (make reusables)

# POST MVP

- Handle presigned url object key to get stored in localstorage + db to prevent loss. And implement a mechanism to regenerate a Upload URL via an object key to upload to that particular key. (helps reducing storage bottlenecks...)
- Move Instructor state management from redux to context api instead.