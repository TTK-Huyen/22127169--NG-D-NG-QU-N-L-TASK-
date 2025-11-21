# Task Management Application

Ứng dụng quản lý công việc (Task Management) được xây dựng với **ASP.NET Core 10 (Backend)** và **React/Vite (Frontend)**.

---

## Yêu cầu Hệ Thống

- **Runtime**: .NET 10.0 trở lên
- **Database**: MySQL Server 5.7+
- **Node.js**: 16+ (cho frontend)
- **IDE**: Visual Studio Code, Visual Studio

---

## I. CÀI ĐẶT BACKEND (TaskApi)

### 1. Cài đặt Dependencies

```bash
cd TaskApi
dotnet restore
```

### 2. Cấu hình Connection String

Sửa file `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "Default": "server=localhost;port=3306;database=taskdb;user=root;password=123456"
  }
}
```

**Lưu ý**: Thay đổi `password=123456` với password MySQL của bạn.

### 3. Thiết lập Database

```bash
# Tạo database và apply migrations
dotnet ef database update
```

**Nếu database bị lỗi, reset lại từ đầu:**

```bash
# Xóa database cũ
dotnet ef database drop --force

# Tạo lại database mới
dotnet ef database update
```

### 4. Chạy Backend

**Option 1: Chạy trực tiếp**
```bash
dotnet run
```

**Option 2: Build rồi chạy**
```bash
dotnet build
dotnet run --no-build
```

Backend sẽ chạy tại: **http://localhost:5289**
Xem các API tại: **http://localhost:5289/swagger/index.html**

---

## II. CÀI ĐẶT FRONTEND (task-client)

### 1. Cài đặt Dependencies

```bash
cd ../task-client
npm install
```

### 2. Cấu hình API URL

Kiểm tra file `.env.local` (tạo nếu chưa có):

```env
VITE_API_BASE=http://localhost:5289/api
```

### 3. Chạy Frontend

```bash
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

---

### Request/Response Model

**TaskItem:**
```json
{
  "id": 1,
  "title": "string (bắt buộc)",
  "dueDate": "datetime (nullable)",
  "status": "string (mặc định: 'Đang làm')"
}
```

**Status Values:**
- `"Đang làm"` - Công việc đang thực hiện
- `"Hoàn thành"` - Công việc đã hoàn thành

---
