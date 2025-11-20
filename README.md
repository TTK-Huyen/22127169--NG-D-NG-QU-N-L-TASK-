# Hướng dẫn chạy website
## I. Backend (.NET API)
### 1.Cấu hình Database (MySQL)
a.Tạo database:
```mysql
CREATE DATABASE taskdb;
```

b.Sửa file `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "Default": "server=localhost;port=3306;database=taskdb;user=root;password=123456"
  }
}
```

### 2.Migration
Mở terminal trong dự án và chạy code sau
```
dotnet restore
dotnet ef migrations add Init3
dotnet ef database update
```

### Chạy backend
```
dotnet run
```

Backend chạy tại:  http://localhost:5289  


---

## II. Frontend (React + Vite)

### 1.File `.env.local`
```
VITE_API_BASE=http://localhost:5289
```

### 2.Cài đặt & chạy
```
npm install
npm run dev
```

Frontend chạy tại:  http://localhost:5173
